# ApexDrive — Sports Car Niche E-commerce & AI Specialist

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Google_Gemini-File_Search_RAG-orange.svg)](https://ai.google.dev/)

แพลตฟอร์มจำลองร้านค้าออนไลน์ประเภท **Niche E-commerce** สำหรับรถยนต์ระดับสมรรถนะสูง (Sports Car & Supercars) พร้อมผู้ช่วย **RAG Chatbot** ขับเคลื่อนด้วย **Google Gemini API** และ **Gemini File Search** 

---

## 🏎️ ฟีเจอร์หลักของระบบ (Key Features)

1. **Product Catalog & Filters:** ค้นหา กรองตามแบรนด์ ระบบขับเคลื่อน (RWD / AWD) ช่วงพละกำลังแรงม้า (Horsepower) และเรียงลำดับราคา
2. **Product Detail View:** เจาะลึกข้อมูลจำเพาะทางวิศวกรรม (เครื่องยนต์, แรงบิด, อัตราเร่ง 0-100 กม./ชม., ท็อปสปีด) พร้อมภาพและแหล่งข้อมูลอ้างอิง
3. **Head-to-Head Compare:** ตารางเปรียบเทียบสเปกรถยนต์เคียงข้างกันสูงสุด 4 คัน พร้อมไฮไลต์ค่าสมรรถนะสูงสุด
4. **Cart Simulation:** ตะกร้าสินค้าจำลองพร้อมกระบวนการสั่งซื้อจำลองและป้ายแจ้งเตือนความปลอดภัย
5. **RAG Chatbot with Citations:** หน้าต่างสนทนา AI อัจฉริยะ ตอบคำถามและแนะนำการเลือกรถโดยค้นหาจาก Knowledge Base จริง พร้อมแสดงแหล่งอ้างอิงและไม่มโนข้อมูล

---

## 👥 โครงสร้างการแบ่งงานของสมาชิก 4 คน

| สมาชิก | บทบาทหน้าที่ | โฟลเดอร์งานหลัก |
| :--- | :--- | :--- |
| **คนที่ 1** | Frontend Development & System Integration | `frontend/` |
| **คนที่ 2** | Product Research & Product Data | `product-data/products.json` |
| **คนที่ 3** | RAG Knowledge Base Preparation | `knowledge-base/` |
| **คนที่ 4** | QA, Testing & Architecture Documentation | `documentation/` |

---

## 🛠️ วิธีการติดตั้งและรันในเครื่อง (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
cd frontend
npm install
```

### 2. รัน Development Server
```bash
npm run dev
```
เปิดบราวเซอร์ที่ `http://localhost:5173`

### 3. ตรวจสอบ Production Build
```bash
npm run build
```

---

## 🔒 ข้อกำหนดความปลอดภัย (Security Note)
โปรเจกต์นี้ปฏิบัติตามมาตรฐานความปลอดภัย โดย**ไม่มีการบันทึก API Key หรือ Secret ใดๆ ลงในโค้ดฝั่ง Client-side หรือ Git Repository** การเรียกใช้งาน Gemini File Search ในการใช้งานจริงจะต้องผ่านจุดเชื่อมต่อที่ปลอดภัย (Secure Serverless Proxy) ตามสถาปัตยกรรมที่กำหนดใน `documentation/diagrams/`
