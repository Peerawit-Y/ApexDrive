import rawProducts from '../data/products.json';

// Simulated Knowledge Base facts for offline/demo RAG mode
const KNOWLEDGE_BASE_FACTS = [
  {
    topic: "most horsepower",
    keywords: ["มากที่สุด", "แรงม้ามาก", "แรงสุด", "horsepower", "hp", "แรงม้าสูงสุด"],
    answer: "ในรายการสินค้าของเรา **Ferrari 296 GTB** มีแรงม้ามากที่สุด โดยมีกำลังรวมสูงถึง **830 แรงม้า (HP)** จากเครื่องยนต์ 3.0L V6 Twin-Turbo ร่วมกับมอเตอร์ไฟฟ้า PHEV",
    source: "knowledge-base/comparisons/sports-car-comparison.md (ตารางเปรียบเทียบสเปก)"
  },
  {
    topic: "fastest acceleration",
    keywords: ["เร็วที่สุด", "0-100", "อัตราเร่ง", "ออกตัว", "acceleration", "fastest"],
    answer: "**Chevrolet Corvette Z06 (C8)** ทำอัตราเร่ง 0-100 กม./ชม. ได้เร็วที่สุดที่ **2.6 วินาที** ตามมาด้วย **Nissan GT-R Nismo** ที่ทำได้ใน **2.7 วินาที** ด้วยความได้เปรียบของระบบขับ 4 ล้อ AWD",
    source: "knowledge-base/comparisons/sports-car-comparison.md"
  },
  {
    topic: "top speed",
    keywords: ["ความเร็วสูงสุด", "top speed", "ท็อปสปีด", "วิ่งได้เร็วสุด"],
    answer: "**McLaren 720S Coupe** มีความเร็วสูงสุดมากที่สุดในรายการที่ **341 กิโลเมตรต่อชั่วโมง** ด้วยตัวถังคาร์บอนไฟเบอร์น้ำหนักเบาเพียง 1,283 กิโลกรัม",
    source: "knowledge-base/comparisons/sports-car-comparison.md"
  },
  {
    topic: "compare 911 gtr",
    keywords: ["911", "porsche", "gt-r", "gtr", "nissan", "ต่างกัน"],
    answer: "**Porsche 911 Carrera vs Nissan GT-R Nismo:**\n• **911 Carrera:** 394 แรงม้า, เครื่องยนต์ 3.0L Boxer วางท้าย, ขับหลัง RWD, อัตราเร่ง 4.1 วินาที เน้นความประณีต สมดุล และขับใช้งานได้ทุกวัน\n• **GT-R Nismo:** 600 แรงม้า, เครื่องยนต์ 3.8L V6 Twin-Turbo วางหน้า, ขับเคลื่อน 4 ล้อ AWD (ATTESA E-TS), อัตราเร่ง 2.7 วินาที เน้นความแรงดิบและการยึดเกาะในสนามแข่ง",
    source: "knowledge-base/comparisons/sports-car-comparison.md"
  },
  {
    topic: "drivetrain awd rwd",
    keywords: ["awd", "rwd", "ขับหลัง", "ขับสี่", "ขับ4", "ระบบขับเคลื่อน"],
    answer: "• **RWD (Rear-Wheel Drive):** ล้อหน้าเลี้ยว ล้อหลังส่งกำลัง ให้ฟีลลิ่งสปอร์ตแท้ คล่องตัว ท้ายปัดได้ (Oversteer) นิยมในรถสปอร์ตระดับตำนาน เช่น Porsche 911, Ferrari 296 GTB\n• **AWD (All-Wheel Drive):** ส่งกำลัง 4 ล้อพร้อมกัน ยึดเกาะถนนสูงมาก ออกตัวไม่ปัด ปลอดภัยบนถนนเปียกลื่น เช่น Nissan GT-R Nismo, BMW M4 M xDrive",
    source: "knowledge-base/specifications/engine-and-drivetrain.md"
  },
  {
    topic: "beginner daily",
    keywords: ["มือใหม่", "beginner", "ชีวิตประจำวัน", "daily", "ขับทุกวัน", "ใช้งานทั่วไป"],
    answer: "สำหรับผู้เริ่มต้นและขับใช้งานทุกวัน แนะนำ **Porsche 911 Carrera** (ทัศนวิสัยดี เบาะนั่งสบาย มีระบบยกหน้าข้ามลูกระนาด) และ **BMW M4 Competition Coupé** (ขับเคลื่อน 4 ล้อปลอดภัย ห้องโดยสารพรีเมียมกว้างขวาง)",
    source: "knowledge-base/buying-guide/beginners-and-daily-guide.md"
  },
  {
    topic: "engine na turbo",
    keywords: ["na", "turbo", "turbocharger", "naturally aspirated", "เครื่องยนต์", "เทอร์โบ"],
    answer: "• **NA (Naturally Aspirated):** ดูดอากาศธรรมชาติ ไร้เทอร์โบล้าช้า เสียงหวานกังวาน ลากรอบได้สูง เช่น Lamborghini Huracán Tecnica (V10) และ Corvette Z06 (V8)\n• **Turbocharged:** ใช้ไอเสียปั่นอัดอากาศ ให้แรงบิดมหาศาลในรอบต่ำ เช่น Porsche 911, Nissan GT-R, McLaren 720S",
    source: "knowledge-base/specifications/engine-and-drivetrain.md"
  },
  {
    topic: "ecommerce buy real",
    keywords: ["ซื้อจริง", "สั่งซื้อ", "ชำระเงิน", "จ่ายเงิน", "จอง", "ราคา"],
    answer: "เว็บไซต์ ApexDrive นี้เป็น **เว็บไซต์จำลองสำหรับการศึกษา (Simulation Niche E-commerce)** ระบบตะกร้าสินค้าและการจำลองการสั่งซื้อจัดทำขึ้นเพื่อการสาธิต ไม่สามารถทำธุรกรรมทางการเงินหรือซื้อรถยนต์จริงได้ครับ",
    source: "01-project-overview.md & FAQ"
  }
];

export async function askChatbot(
  query: string,
  apiEndpoint?: string
): Promise<{ text: string; sources: string[] }> {
  // If user provided a custom backend / Cloud Function URL
  if (apiEndpoint && apiEndpoint.trim() !== '') {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });
      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }
      const data = await response.json();
      return {
        text: data.answer || data.text,
        sources: data.sources || ['Gemini File Search Store']
      };
    } catch (err) {
      console.warn("Direct API call failed, falling back to local RAG match:", err);
    }
  }

  // Simulate network latency for authentic feel
  await new Promise(resolve => setTimeout(resolve, 600));

  const lower = query.toLowerCase();

  // Check specific product query
  for (const car of rawProducts) {
    if (lower.includes(car.model.toLowerCase()) || (lower.includes(car.brand.toLowerCase()) && lower.includes(car.model.split(' ')[0].toLowerCase()))) {
      return {
        text: `**${car.brand} ${car.model} (${car.year})**\n` +
              `• **ราคาจำลอง:** ${car.price.toLocaleString()} ${car.currency} (${car.market})\n` +
              `• **เครื่องยนต์:** ${car.engine}\n` +
              `• **พละกำลัง:** ${car.horsepower} แรงม้า | แรงบิด ${car.torque_nm} Nm\n` +
              `• **ระบบขับเคลื่อน:** ${car.drivetrain} | เกียร์ ${car.transmission}\n` +
              `• **สมรรถนะ:** 0-100 กม./ชม. ใน ${car.acceleration_0_100_sec} วินาที | Top Speed ${car.top_speed_kmh} กม./ชม.\n` +
              `• **คำอธิบาย:** ${car.description}`,
        sources: car.sources
      };
    }
  }

  // Match against RAG Knowledge Base facts
  for (const fact of KNOWLEDGE_BASE_FACTS) {
    const matched = fact.keywords.some(k => lower.includes(k.toLowerCase()));
    if (matched) {
      return {
        text: fact.answer,
        sources: [fact.source]
      };
    }
  }

  // If completely outside knowledge base
  return {
    text: "ขออภัยครับ ระบบ RAG Chatbot ค้นหาแล้วไม่พบข้อมูลดังกล่าวในเอกสาร Knowledge Base ของ ApexDrive (ระบบยึดหลักไม่คาดเดาหรือสร้างสเปกขึ้นเองเมื่อไม่มีข้อมูลอ้างอิง) กรุณาลองสอบถามเกี่ยวกับสเปกรถยนต์, ระบบเครื่องยนต์, เปรียบเทียบรุ่นรถ, หรือคู่มือการขับขี่ในรายการสินค้าของเราครับ",
    sources: ["knowledge-base/"]
  };
}
