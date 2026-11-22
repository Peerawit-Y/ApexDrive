# คู่มือ: redeploy Worker ให้ใช้โหมด Vector Search ได้

ส่งให้ Peerawit (เจ้าของ Worker `apexdrive-chatbot.ppeerawit789.workers.dev`)

## ทำไมต้องทำ

เราเพิ่งเพิ่ม **โหมด vector search** (ค้นเอกสารด้วยความหมายแทนการเทียบ
ตัวอักษร ตามที่คู่มืออาจารย์สอน) เข้าไปในระบบ — ต้องแก้ `worker.js` เพิ่ม
1 บรรทัด และ deploy ใหม่ ไม่งั้นเว็บจริงจะยังค้นด้วยวิธีเก่า (n-gram) อยู่
เหมือนเดิม (ไม่ error ให้เห็น แค่ไม่ฉลาดขึ้น)

## สิ่งที่เปลี่ยนใน `worker.js`

เปิด path ให้ยอมส่งต่อ request ไปขอ embedding จาก Gemini เพิ่ม (เดิมเปิด
ให้แค่ `generateContent`):

```js
// เดิม
const ALLOWED_PATH = /^\/v1beta\/models\/[a-zA-Z0-9.\-]+:generateContent$/;

// ใหม่
const ALLOWED_PATH =
  /^\/v1beta\/models\/[a-zA-Z0-9.\-]+:(generateContent|embedContent|batchEmbedContents)$/;
```

ไม่ต้องตั้ง Secret เพิ่ม ไม่ต้องแก้ `ALLOWED` (โดเมนเดิมใช้ได้เลย) — แก้
แค่บรรทัดนี้บรรทัดเดียว

## ขั้นตอน

1. `git pull` เอาโค้ดล่าสุดจาก `main` มาก่อน (จะได้ `worker.js` เวอร์ชันใหม่
   พร้อมอยู่แล้วที่ root ของ repo)
2. เปิด terminal ไปที่โฟลเดอร์ repo แล้วรัน:
   ```
   wrangler deploy worker.js --name apexdrive-chatbot
   ```
   (ถ้ายังไม่เคย login ให้รัน `wrangler login` ก่อน)
3. ทดสอบว่าเปิด path ใหม่สำเร็จ:
   ```
   curl -s -X POST "https://apexdrive-chatbot.ppeerawit789.workers.dev/v1beta/models/gemini-embedding-001:embedContent" \
     -H "Content-Type: application/json" \
     -H "Origin: https://peerawit-y.github.io" \
     -d '{"content":{"parts":[{"text":"test"}]}}'
   ```
   ถ้าได้ JSON ที่มี `"embedding": { "values": [...] }` กลับมา = สำเร็จ
   ถ้าได้ `404 เส้นทาง...ไม่ได้รับอนุญาต` = ยังไม่ได้ deploy โค้ดใหม่

## ของที่ต้อง pull มาด้วย (ไม่ต้องทำอะไรเพิ่ม แค่เช็คว่ามี)

- `frontend/public/vectors.json` — ไฟล์เวกเตอร์ของเอกสารทั้งหมด (สร้างไว้
  ล่วงหน้าแล้ว commit เข้า repo แล้ว ไม่ต้องสร้างเอง)
- `scripts/build-vectors.mjs` — สคริปต์สร้าง `vectors.json` ใหม่ **ใช้ก็
  ต่อเมื่อมีการแก้ไฟล์ใน `frontend/public/docs/` เท่านั้น** ถ้าไม่ได้แก้
  เอกสาร ไม่ต้องรันสคริปต์นี้เลย

### ถ้าในอนาคตมีการแก้เอกสารใน `docs/`

ใครก็ได้ในทีมที่แก้เอกสาร ต้องรันคำสั่งนี้แล้ว commit ไฟล์ที่ได้ด้วย:

```
node scripts/build-vectors.mjs https://apexdrive-chatbot.ppeerawit789.workers.dev
git add frontend/public/vectors.json
git commit -m "Rebuild vectors.json after doc changes"
```

(ใส่ Worker URL ของตัวเองต่อท้ายคำสั่ง เพราะสคริปต์ต้องยิงไปขอ embedding
ผ่าน Worker ที่เปิด path `batchEmbedContents` ไว้แล้ว)

## วิธีเช็คว่าทำงานจริงบนเว็บ

1. เปิดเว็บจริง (หรือ `localhost:5173` ถ้าตั้ง `.env` ชี้มาที่ Worker นี้)
2. เปิดกล่องแชต ถามว่า:
   ```
   แนะนำรถขับใช้งานทุกวัน งบไม่เกิน 3 ล้าน
   ```
3. ควรได้คำตอบว่า **APEX 86 Spirit ราคา 2,990,000 บาท** พร้อมการ์ดรถคลิก
   ได้ขึ้นมา 1 ใบ — ถ้าได้แบบนี้แปลว่า vector search ทำงานสมบูรณ์แล้ว

ถ้าติดปัญหาอะไร ดูรายละเอียดเชิงลึกเพิ่มได้ที่ `03-rag-chatbot-architecture.md`
