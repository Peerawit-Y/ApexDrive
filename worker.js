/* ==================================================================
   Cloudflare Worker  ตัวกลางระหว่างหน้าเว็บกับ Google Gemini API

   หน้าที่
     1  รับคำขอจากหน้าเว็บบน GitHub Pages
     2  เติมกุญแจเข้าไป  แล้วส่งต่อให้ Gemini
     3  ส่งคำตอบกลับไปให้หน้าเว็บ

   ผลคือกุญแจอยู่บนเซิร์ฟเวอร์ของ Cloudflare เท่านั้น
   ไม่มีอยู่ในไฟล์ไหนบน GitHub จึงไม่ถูกเพิกถอน

   กุญแจเก็บเป็น Secret ชื่อ GEMINI_KEY  ไม่ได้เขียนไว้ในไฟล์นี้
   ================================================================== */

// โดเมนที่อนุญาตให้เรียก  กันคนอื่นเอา Worker เราไปใช้ฟรี
const ALLOWED = [
  "https://peerawit-y.github.io",   // <<< แก้ตรงนี้เป็นโดเมนจริงที่ deploy ApexDrive
  "http://localhost:5173",          // Vite dev server (พอร์ตเริ่มต้น)
  "http://localhost:5174",          // Vite dev server (พอร์ตสำรองเวลา 5173 ถูกใช้)
];

// เส้นทางที่ยอมให้ส่งต่อ  กันไม่ให้เรียก endpoint อื่นของ Gemini
// หน้าตาที่ยอม  เช่น  /v1beta/models/gemini-2.0-flash:generateContent
// เปิด embedContent/batchEmbedContents เพิ่ม  ใช้ตอนสร้าง vectors.json และตอนแปลงคำถามเป็นเวกเตอร์
const ALLOWED_PATH = /^\/v1beta\/models\/[a-zA-Z0-9.\-]+:(generateContent|embedContent|batchEmbedContents)$/;

const UPSTREAM = "https://generativelanguage.googleapis.com";

function corsHeaders(origin) {
  const ok = ALLOWED.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : ALLOWED[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    // เบราว์เซอร์ถามก่อนว่าเรียกได้ไหม
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // หน้าเช็กสุขภาพ  เปิดด้วยเบราว์เซอร์ได้
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      return Response.json(
        { status: "ok", hasKey: Boolean(env.GEMINI_KEY) },
        { headers: cors }
      );
    }

    if (request.method !== "POST") {
      return Response.json({ error: "รับเฉพาะ POST" }, { status: 405, headers: cors });
    }

    // ตรวจว่าเรียกมาจากเว็บที่อนุญาต (ต้องมี Origin และอยู่ใน allowlist เท่านั้น
    // กันสคริปต์/บอทภายนอกที่ไม่ส่ง Origin header มาเรียกตรงๆแล้วข้ามการตรวจสอบนี้ไปได้)
    if (!ALLOWED.includes(origin)) {
      return Response.json(
        { error: `โดเมน ${origin || "(ไม่ระบุ)"} ไม่ได้รับอนุญาต  แก้รายการ ALLOWED ในไฟล์ worker.js` },
        { status: 403, headers: cors }
      );
    }

    // ตรวจว่าเส้นทางที่ขอมาอยู่ในรูปแบบที่ยอม
    if (!ALLOWED_PATH.test(url.pathname)) {
      return Response.json(
        { error: `เส้นทาง ${url.pathname} ไม่ได้รับอนุญาต` },
        { status: 404, headers: cors }
      );
    }

    if (!env.GEMINI_KEY) {
      return Response.json(
        { error: "ยังไม่ได้ตั้ง Secret ชื่อ GEMINI_KEY ใน Cloudflare" },
        { status: 500, headers: cors }
      );
    }

    // ส่งต่อไปยัง Gemini พร้อมเติมกุญแจ
    try {
      const upstream = await fetch(UPSTREAM + url.pathname, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_KEY,
        },
        body: await request.text(),
      });

      const text = await upstream.text();
      return new Response(text, {
        status: upstream.status,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    } catch (e) {
      return Response.json(
        { error: "ส่งต่อไป Gemini ไม่สำเร็จ: " + e.message },
        { status: 502, headers: cors }
      );
    }
  },
};
