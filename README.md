# ApexDrive — Sports Car Niche E-commerce & AI Concierge

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020.svg)](https://workers.cloudflare.com/)
[![Gemini API](https://img.shields.io/badge/Google_Gemini-Hybrid_RAG-orange.svg)](https://ai.google.dev/)

เว็บโชว์รูมและร้านค้าออนไลน์จำลอง (**Niche E-commerce Simulation**) สำหรับรถยนต์สปอร์ตและซูเปอร์คาร์ของค่าย **APEX Sports** ทั้งหมด 10 รุ่น รองรับ **2 ภาษา (ไทย / อังกฤษ)** พร้อมผู้ช่วย **ApexDrive Private Concierge (RAG Chatbot)** ที่สืบค้นข้อมูลจากเอกสารโชว์รูมจริงด้วย Hybrid Vector Search และเชื่อมต่อ **Google Gemini API** ผ่าน **Cloudflare Worker Proxy**

---

## ฟีเจอร์หลัก (Key Features)

1. **โชว์รูมและหน้าเว็บครบ 7 เส้นทาง (`/`, `/products`, `/products/:id`, `/categories`, `/compare`, `/about`, `/faq`)**
   - หน้าแรกมี Hero Carousel 5 รุ่นเรือธง, รุ่นแนะนำ 4 คัน และแกลเลอรีพาโนรามาเต็มจอพร้อมแถบ Thumbnail ครบทั้ง 10 รุ่น
2. **ระบบค้นหา กรอง และเรียงลำดับ (`Products.tsx`, `productService.ts`)**
   - ค้นหาจากชื่อรุ่น เครื่องยนต์ หรือประเภทตัวถัง
   - กรองตามแบรนด์, ระบบขับเคลื่อน (`ALL` / `RWD` / `AWD`), หมวดหมู่ตัวถัง และแรงม้าขั้นต่ำ (`0–1,500 HP`)
   - เรียงตามชื่อรุ่น (A–Z), แรงม้าสูงสุด, อัตราเร่ง 0–100 เร็วสุด และราคาน้อยไปมาก/มากไปน้อย
3. **ตารางเปรียบเทียบสเปกสูงสุด 4 คัน (`CompareTable.tsx`, `FloatingCompareBar.tsx`)**
   - เลือกเทียบได้จากทุกหน้า มีแถบลอยด้านล่างและแจ้งเตือน Toast บันทึกสถานะไว้ใน `localStorage`
   - ไฮไลต์ค่าที่ดีที่สุดอัตโนมัติ (แรงม้าสูงสุด, อัตราเร่ง 0–100 เร็วที่สุด, ความเร็วสูงสุด)
4. **เครื่องคำนวณค่างวดผ่อนชำระ (`ProductDetail.tsx`)**
   - ปรับเงินดาวน์ (`20%`, `30%`, `40%`, `50%`) และระยะเวลาผ่อน (`36`, `48`, `60`, `72` เดือน) คำนวณค่างวดและยอดจัดไฟแนนซ์ทันที
5. **ตะกร้าจองและนัดหมายเข้าชมโชว์รูมจำลอง (`CartModal.tsx`)**
   - บันทึกรายการรถที่เลือกใน `localStorage` กรอกชื่อ เบอร์ติดต่อ และวันที่สะดวกเข้าชม เพื่อออกรหัสอ้างอิงจำลอง (`APX-2026-XXXX`)
6. **รองรับ 2 ภาษา ไทย / อังกฤษ (`LanguageContext.tsx`, `productsEn.ts`)**
   - สลับภาษาได้ทันทีทั้งเมนู หน้าเว็บ และข้อมูลสเปกรถทั้ง 10 คัน
7. **ผู้ช่วย AI RAG Chatbot (`ChatConcierge.tsx`, `conciergeService.ts`, `ragService.ts`)**
   - ตรวจจับภาษาไทย/อังกฤษจากคำถามอัตโนมัติ และจำบริบทบทสนทนา 4 ข้อความล่าสุด (ดึงชื่อรุ่นจากบทสนทนาก่อนหน้าเมื่อถามสั้น)
   - ค้นหาเอกสารโชว์รูม 15 ไฟล์ด้วย **Hybrid Search** (Vector Cosine Similarity 768 มิติจาก `gemini-embedding-001` + Keyword Boost เฉพาะรุ่น) คัด Top 6 ชิ้นส่งให้ `gemini-flash-lite-latest`
   - แสดงแหล่งอ้างอิง (Citations สูงสุด 3 ไฟล์พร้อมเปอร์เซ็นต์ความใกล้เคียง) และสแกนชื่อรุ่นในคำตอบจริงเพื่อสร้างการ์ดรถคลิกได้
   - มีกลไก **Fallback 4 ชั้น**: `RAG Vector Search` → `RAG Local Trigram Search` → `Rule-based Catalog` (`products.json`) → `ข้อความต้อนรับเริ่มต้น`

---

## คลังรถยนต์ในโชว์รูม (10 รุ่น)

| รุ่น | ประเภท | ขับเคลื่อน | เครื่องยนต์ | แรงม้า | 0–100 | ราคา (บาท) |
| :--- | :--- | :---: | :--- | :---: | :---: | :---: |
| **APEX X Hyper** | Flagship V12 Twin-Turbo Hypercar | AWD | 6.5L V12 Twin-Turbo | 980 HP | 2.5 วิ | 45,900,000 |
| **APEX 10 Evo** | Mid-Engine NA V10 Supercar | RWD | 5.2L V10 NA | 670 HP | 2.9 วิ | 19,800,000 |
| **APEX GT3 Track** | Track-Focused Street-Legal Racer | RWD | 4.0L Flat-6 NA | 540 HP | 3.1 วิ | 17,500,000 |
| **APEX 8 Vantage** | Front-Mid Engine V8 Grand Tourer | RWD | 4.0L V8 Twin-Turbo | 665 HP | 3.4 วิ | 15,900,000 |
| **APEX SUV RS** | Super Sports SUV (5 ที่นั่ง) | AWD | 4.0L V8 Twin-Turbo | 680 HP | 3.3 วิ | 14,900,000 |
| **APEX 5 Touring** | High-Performance Sports Wagon (5 ที่นั่ง) | AWD | 4.0L V8 Twin-Turbo | 650 HP | 3.2 วิ | 12,800,000 |
| **APEX 35 GT** | AWD Performance Coupe | AWD | 3.8L V6 Twin-Turbo | 620 HP | 2.8 วิ | 11,900,000 |
| **APEX 4 Coupe** | Lightweight Sports Coupe | RWD | 3.0L Inline-6 Twin-Turbo | 560 HP | 3.5 วิ | 7,450,000 |
| **APEX 2 Clubsport** | Compact RWD Sports Coupe | RWD | 3.0L Inline-6 Twin-Turbo | 480 HP | 3.9 วิ | 5,690,000 |
| **APEX 86 Spirit** | Lightweight Boxer Sports Coupe | RWD | 2.4L Flat-4 Boxer NA | 255 HP | 5.8 วิ | 2,990,000 |

---

## โครงสร้างโปรเจกต์ (Project Structure)

```text
ApexDrive/
├── frontend/
│   ├── public/
│   │   ├── Photo/                  # รูปภาพรถยนต์ทั้ง 10 รุ่น
│   │   ├── docs/                   # เอกสารฐานความรู้ภาษาไทย 15 ไฟล์ (.txt)
│   │   ├── docs-en/                # เอกสารฐานความรู้ภาษาอังกฤษ 15 ไฟล์ (.txt)
│   │   ├── vectors.json            # เวกเตอร์ เอกสารภาษาไทย 
│   │   └── vectors-en.json         # เวกเตอร์ เอกสารภาษาอังกฤษ 
│   ├── src/
│   │   ├── components/             # Navbar, Footer, ProductCard, CompareTable, CartModal, ChatConcierge ฯลฯ
│   │   ├── context/                # LanguageContext.tsx (ระบบสลับภาษา TH/EN)
│   │   ├── data/                   # products.json และ productsEn.ts
│   │   ├── pages/                  # Home, Products, ProductDetail, Categories, Compare, About, FAQ
│   │   ├── services/               # productService.ts, conciergeService.ts, ragService.ts
│   │   └── types/                  # product.ts
│   └── .env.example                # ตัวอย่างตั้งค่า VITE_WORKER_URL, VITE_AI_MODEL, VITE_DOCS_BASE
├── scripts/
│   └── build-vectors.mjs           # สคริปต์หั่นเอกสารและสร้าง vectors.json / vectors-en.json
├── worker.js                       # Cloudflare Worker Proxy ซ่อน GEMINI_KEY และตรวจ Origin
├── wrangler.jsonc                  # ค่าตั้ง Cloudflare Worker
├── 03-rag-chatbot-architecture.md  # เอกสารอธิบายสถาปัตยกรรม RAG Chatbot เชิงลึก
├── 04-teammate-worker-setup.md     # คู่มือการ Deploy Cloudflare Worker สำหรับสมาชิกทีม
└── ApexDrive-Summary-and-RAG-Chatbot.pdf # เอกสารสรุปภาพรวมเว็บไซต์และขั้นตอนการทำงานของ RAG (PDF)
```

---

## มาตรการความปลอดภัย (Security Note)

- **ไม่มี API Key ในฝั่ง Frontend หรือ Git Repository:** รหัส `GEMINI_KEY` ถูกเก็บเป็น Secret บน Cloudflare Worker เท่านั้น (`wrangler secret put GEMINI_KEY`)
- **Strict Origin Allowlist & Path Whitelist:** ไฟล์ `worker.js` ตรวจสอบ `Origin` header ให้ตรงกับโดเมนที่อนุญาตเท่านั้น และเปิดผ่านเฉพาะเส้นทาง `generateContent`, `embedContent` และ `batchEmbedContents`
