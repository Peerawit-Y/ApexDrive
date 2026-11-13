# คู่มือการทำงาน --- คนที่ 1

## Frontend Development & System Integration

เอกสารนี้กำหนดขอบเขตงานของผู้รับผิดชอบคนที่ 1 ซึ่งดูแลการพัฒนาเว็บไซต์ Sports Car
E-commerce และเชื่อมต่อ RAG Chatbot กับ Google Gemini API

------------------------------------------------------------------------

## 1. บทบาทและเป้าหมาย

**บทบาท:** Frontend Developer & System Integrator

**เป้าหมายหลัก:** พัฒนาเว็บไซต์จำลองร้านค้าออนไลน์รถยนต์ Sport Car ให้ผู้ใช้สามารถดู
ค้นหา กรอง เปรียบเทียบสินค้า และสอบถามข้อมูลผ่าน RAG Chatbot ได้

คุณรับผิดชอบการพัฒนาเว็บไซต์และการเชื่อมต่อระบบ ส่วนข้อมูลสินค้าเป็นหน้าที่ของคนที่ 2
และเอกสาร Knowledge Base เป็นหน้าที่ของคนที่ 3

------------------------------------------------------------------------

## 2. ขอบเขตงานที่รับผิดชอบ

### 2.1 Frontend Website

พัฒนาหน้าต่อไปนี้:

  หน้า              รายละเอียด
  ---------------- --------------------------------
  Home             หน้าแรก แนะนำเว็บไซต์และรถยนต์เด่น
  Products         แสดงรายการรถยนต์ทั้งหมด
  Product Detail   รายละเอียดและข้อมูลจำเพาะของรถยนต์
  Categories       แบ่งหมวดหมู่รถยนต์
  About            ข้อมูลเกี่ยวกับเว็บไซต์
  FAQ              คำถามที่พบบ่อย
  Chatbot          หน้าต่างสนทนากับ AI

### 2.2 ฟีเจอร์หลัก

-   Responsive Design สำหรับ Desktop, Tablet และ Mobile
-   Search รถยนต์ตามชื่อหรือแบรนด์
-   Filter ตามแบรนด์ ประเภท และช่วงราคา
-   Sort ตามราคา หรือข้อมูลสมรรถนะ
-   Product Detail แสดงข้อมูลจำเพาะ
-   Compare เปรียบเทียบรถยนต์
-   Cart Simulation ตะกร้าสินค้าจำลอง
-   Chatbot สำหรับถามข้อมูลเกี่ยวกับรถยนต์
-   Loading, Error และ Empty States

**ข้อจำกัด:** ไม่มีระบบสมาชิก ไม่มีการชำระเงิน และไม่มีการสั่งซื้อจริง

------------------------------------------------------------------------

## 3. เทคโนโลยี

  เทคโนโลยี             หน้าที่
  -------------------- ------------------------------
  React                สร้าง UI และ Components
  Vite                 Development Server และ Build
  TypeScript           กำหนดชนิดข้อมูล
  Tailwind CSS         จัดการ Styling
  Framer Motion        Animation (ถ้าจำเป็น)
  Google Gemini API    สร้างคำตอบจากบริบทที่ค้นพบ
  Gemini File Search   ค้นหาเนื้อหาจาก Knowledge Base
  Git / GitHub         Version Control
  GitHub Pages         เผยแพร่ Frontend

------------------------------------------------------------------------

## 4. การเชื่อมต่อ RAG Chatbot

### 4.1 หน้าที่ของระบบ

Chatbot ต้องสามารถ: 1. รับคำถามจากผู้ใช้ 2. ส่งคำถามไปยัง API ที่ทีมพัฒนาไว้ 3. ใช้
Gemini File Search ค้นหาข้อมูลจากเอกสาร 4. ให้ Gemini สร้างคำตอบจากข้อมูลที่ค้นพบ
5. แสดงคำตอบและแหล่งอ้างอิงในหน้า Chatbot

ตัวอย่างคำถาม: - Porsche 911 กับ Toyota GR Supra รุ่นไหนมีแรงม้ามากกว่า? -
รถรุ่นใดมีระบบขับเคลื่อน AWD? - อธิบายความแตกต่างระหว่าง Turbocharger กับ
Naturally Aspirated - รถรุ่นไหนเหมาะกับการใช้งานในชีวิตประจำวัน?

### 4.2 Flow การทำงาน

``` text
User
  |
  v
Chatbot UI (React)
  |
  v
Secure API Endpoint
  |
  v
Gemini API
  |
  v
Gemini File Search
  |
  v
Retrieve Relevant Documents
  |
  v
Gemini Generates Answer
  |
  v
Return Answer + Sources
  |
  v
Chatbot UI
```

### 4.3 ข้อกำหนดด้านความปลอดภัย

**ห้ามเรียก Gemini API โดยฝัง API Key ไว้ใน Frontend**

เนื่องจากโค้ด JavaScript ที่ส่งไปยัง Browser สามารถถูกตรวจสอบได้ ผู้ใช้จึงอาจดึง API
Key ไปใช้ได้

แนวทางที่แนะนำ:

``` text
React Frontend
      |
      | POST /api/chat
      v
Cloud Function / Cloud Run
      |
      | API Key stored as secret
      v
Gemini API + File Search
```

Frontend สามารถเผยแพร่บน GitHub Pages ได้ แต่ API Endpoint ต้องอยู่บนบริการฝั่ง
Server หรือ Serverless แยกต่างหาก

> หากอาจารย์กำหนดให้ใช้เฉพาะ GitHub Repository และห้ามมีบริการฝั่ง Server
> ต้องตกลงแนวทางการสาธิตกับอาจารย์ก่อน เพราะการเรียก Gemini API จาก Browser
> โดยตรงไม่ปลอดภัย

------------------------------------------------------------------------

## 5. โครงสร้างโฟลเดอร์ Frontend

``` text
frontend/
├── public/
│   ├── images/
│   │   ├── porsche/
│   │   ├── ferrari/
│   │   └── nissan/
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── CompareTable.tsx
│   │   └── Chatbot/
│   │       ├── ChatWindow.tsx
│   │       ├── ChatMessage.tsx
│   │       └── ChatInput.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Categories.tsx
│   │   ├── About.tsx
│   │   └── FAQ.tsx
│   │
│   ├── services/
│   │   ├── productService.ts
│   │   └── chatbotService.ts
│   │
│   ├── types/
│   │   └── product.ts
│   │
│   ├── data/
│   │   └── products.json
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
└── README.md
```

โครงสร้างนี้สามารถปรับได้ตามความเหมาะสม ไม่จำเป็นต้องสร้างทุกไฟล์ตั้งแต่วันแรก

------------------------------------------------------------------------

## 6. การรับข้อมูลจากสมาชิกคนอื่น

### 6.1 ข้อมูลจากคนที่ 2 --- Product Data

ขอให้คนที่ 2 ส่งข้อมูลรถยนต์ในรูปแบบ JSON โดยใช้ Schema เดียวกันทุกคัน

ตัวอย่าง Schema:

``` json
{
  "id": "porsche-911-carrera",
  "brand": "Porsche",
  "model": "911 Carrera",
  "year": 2025,
  "market": "Thailand",
  "price": 0,
  "currency": "THB",
  "category": "Sports Car",
  "engine": "3.0L Twin-Turbo Flat-Six",
  "horsepower": 388,
  "torque_nm": 450,
  "transmission": "8-speed PDK",
  "drivetrain": "RWD",
  "top_speed_kmh": 295,
  "acceleration_0_100_sec": 4.1,
  "seats": 2,
  "fuel_type": "Gasoline",
  "description": "Product description",
  "highlights": [
    "Twin-turbo engine",
    "Rear-wheel drive"
  ],
  "image": "/images/porsche/911-carrera.jpg",
  "sources": [
    "https://example.com/source"
  ]
}
```

**หมายเหตุ:** ตัวเลขในตัวอย่างเป็นเพียงรูปแบบข้อมูลสำหรับพัฒนา ไม่ใช่สเปกที่ยืนยันแล้ว
ต้องใช้ข้อมูลจริงที่คนที่ 2 ตรวจสอบและส่งมอบ

สิ่งที่ต้องตรวจสอบ: - ทุกคันมี `id` ไม่ซ้ำกัน - ชื่อฟิลด์ตรงกันทุกสินค้า -
หน่วยของตัวเลขเป็นมาตรฐานเดียวกัน - ระบุปีรุ่นและตลาด - มีแหล่งอ้างอิง -
ภาพอยู่ในตำแหน่งที่เว็บไซต์เรียกใช้งานได้

### 6.2 ข้อมูลจากคนที่ 3 --- RAG Knowledge Base

ขอให้คนที่ 3 ส่งเอกสารในรูปแบบ Markdown, TXT หรือ PDF โดยจัดหมวดหมู่ เช่น:

``` text
knowledge-base/
├── products/
├── specifications/
├── comparisons/
├── buying-guide/
└── faq/
```

หน้าที่ของคุณ: - ตรวจสอบว่าไฟล์เปิดอ่านได้ - นำไฟล์เข้าสู่ Gemini File Search - ตั้งค่า
Store และการค้นหาให้ตรงกับเอกสาร - เชื่อมการค้นหาเข้ากับ Chatbot -
ทดสอบคำตอบกับเอกสารจริง

คนที่ 3 ไม่ต้องเขียนโค้ด RAG หรือเชื่อมต่อ API

------------------------------------------------------------------------

## 7. การออกแบบ Chatbot

### 7.1 ส่วนประกอบ UI

-   ปุ่มเปิด/ปิด Chatbot
-   พื้นที่แสดงข้อความสนทนา
-   ข้อความจาก User และ AI แยกกันชัดเจน
-   ช่องกรอกข้อความ
-   ปุ่มส่งข้อความ
-   Loading Indicator
-   Error Message
-   แหล่งอ้างอิงของคำตอบ
-   ปุ่มเริ่มบทสนทนาใหม่ (ถ้ามีเวลา)

### 7.2 พฤติกรรมที่ต้องรองรับ

  สถานการณ์         พฤติกรรม
  ---------------- --------------------------------
  กำลังค้นหาคำตอบ    แสดง Loading
  พบข้อมูล           แสดงคำตอบพร้อมแหล่งอ้างอิง
  ไม่พบข้อมูล         แจ้งว่าไม่มีข้อมูลเพียงพอ
  API Error        แจ้งข้อผิดพลาดและให้ลองใหม่
  ผู้ใช้ส่งข้อความว่าง   ไม่อนุญาตให้ส่ง
  คำถามนอกหัวข้อ     แจ้งขอบเขตความสามารถของ Chatbot

### 7.3 แนวทาง Prompt

กำหนด System Instruction ให้ Gemini: - ตอบคำถามเกี่ยวกับรถยนต์ Sport Car
และเนื้อหาในเว็บไซต์ - ใช้ข้อมูลจาก File Search เป็นหลัก - ไม่สร้างราคา สเปก
หรือข้อเท็จจริงที่ไม่มีในเอกสาร - แจ้งเมื่อไม่พบข้อมูลที่เพียงพอ -
แยกข้อเท็จจริงและคำแนะนำออกจากกัน - ตอบภาษาเดียวกับผู้ใช้ -
แสดงแหล่งอ้างอิงเมื่อมีข้อมูลแหล่งที่มา

------------------------------------------------------------------------

## 8. ลำดับการพัฒนา

### Phase 1 --- Project Setup

-   [ ] สร้าง Repository หรือโฟลเดอร์ `frontend`
-   [ ] สร้างโปรเจกต์ React + Vite + TypeScript
-   [ ] ติดตั้ง Tailwind CSS
-   [ ] ตั้งค่า Git และ GitHub
-   [ ] กำหนดโครงสร้าง Components และ Pages

### Phase 2 --- UI Development

-   [ ] พัฒนา Navbar และ Footer
-   [ ] พัฒนา Home
-   [ ] พัฒนา Product Catalog
-   [ ] พัฒนา Product Detail
-   [ ] พัฒนา Categories และ FAQ
-   [ ] ทำ Responsive Design

### Phase 3 --- Product Features

-   [ ] เชื่อม `products.json`
-   [ ] ทำ Search
-   [ ] ทำ Filter
-   [ ] ทำ Sort
-   [ ] ทำ Compare
-   [ ] ทำ Cart Simulation

### Phase 4 --- RAG Chatbot Integration

-   [ ] รับ Knowledge Base จากคนที่ 3
-   [ ] สร้าง Gemini File Search Store และนำเข้าเอกสาร
-   [ ] ตั้งค่า Gemini API
-   [ ] เตรียม Secure API Endpoint
-   [ ] พัฒนา Chatbot UI
-   [ ] เชื่อม Frontend กับ API Endpoint
-   [ ] แสดง Sources
-   [ ] ทดสอบกรณีค้นพบและไม่พบข้อมูล

### Phase 5 --- Testing & Deployment

-   [ ] ทดสอบทุกหน้า
-   [ ] ทดสอบ Responsive
-   [ ] ทดสอบ Search และ Filter
-   [ ] ทดสอบ Chatbot ด้วยคำถามหลายรูปแบบ
-   [ ] ตรวจสอบ API Key และ Secrets
-   [ ] Build โปรเจกต์
-   [ ] Deploy Frontend ไปยัง GitHub Pages
-   [ ] ตรวจสอบเว็บไซต์หลัง Deploy

------------------------------------------------------------------------

## 9. คำสั่งเริ่มต้นโปรเจกต์

``` bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install react-router-dom
npm install lucide-react
npm install framer-motion
```

ติดตั้งและตั้งค่า Tailwind CSS ตามเอกสารทางการของเวอร์ชันที่เลือกใช้:

https://tailwindcss.com/docs/installation/using-vite

เริ่ม Development Server:

``` bash
npm run dev
```

ตรวจสอบ Production Build:

``` bash
npm run build
```

------------------------------------------------------------------------

## 10. Git Workflow

แนะนำให้ใช้ Branch แยกตามงาน:

``` text
main
├── feature/home-page
├── feature/product-catalog
├── feature/product-detail
├── feature/chatbot-ui
└── feature/gemini-integration
```

ตัวอย่าง Commit:

``` bash
git add .
git commit -m "feat: create product catalog"
git push origin feature/product-catalog
```

ก่อน Merge เข้า `main` ควรตรวจสอบ Build และทดสอบฟีเจอร์ที่เกี่ยวข้อง

------------------------------------------------------------------------

## 11. เกณฑ์ตรวจรับงานของคนที่ 1

### Website

-   [ ] หน้าเว็บไซต์ครบตามขอบเขต
-   [ ] แสดงข้อมูลสินค้าจาก JSON ได้
-   [ ] Search และ Filter ทำงานได้
-   [ ] Product Detail แสดงข้อมูลถูกต้อง
-   [ ] Compare ทำงานได้
-   [ ] Cart เป็นระบบจำลอง
-   [ ] Responsive บนอุปกรณ์หลัก

### RAG Chatbot

-   [ ] ส่งคำถามจากหน้าเว็บได้
-   [ ] เรียก Secure API Endpoint ได้
-   [ ] Gemini ค้นข้อมูลจาก File Search ได้
-   [ ] คำตอบสอดคล้องกับเอกสาร
-   [ ] แสดงแหล่งอ้างอิงเมื่อมี
-   [ ] ไม่แต่งข้อมูลเมื่อค้นไม่พบ
-   [ ] มี Loading และ Error State

### Deployment & Security

-   [ ] Build ผ่าน
-   [ ] เว็บไซต์เปิดได้บน GitHub Pages
-   [ ] ไม่มี API Key อยู่ใน Frontend Bundle หรือ Repository
-   [ ] API Endpoint ใช้งานได้จากเว็บไซต์ที่ Deploy แล้ว

------------------------------------------------------------------------

## 12. เอกสารอ้างอิง

-   React: https://react.dev/
-   Vite: https://vite.dev/
-   TypeScript: https://www.typescriptlang.org/docs/
-   Tailwind CSS: https://tailwindcss.com/docs
-   Gemini API: https://ai.google.dev/gemini-api/docs
-   Gemini File Search:
    https://ai.google.dev/gemini-api/docs/file-search
-   GitHub Pages: https://docs.github.com/en/pages

------------------------------------------------------------------------

## 13. สิ่งที่ต้องตกลงกับทีมก่อนเริ่มเชื่อมต่อ

1.  รายการรถยนต์และ Product JSON ใช้ Schema เดียวกันหรือไม่
2.  เอกสาร Knowledge Base จากคนที่ 3 พร้อมนำเข้า File Search หรือยัง
3.  จะใช้ Cloud Functions, Cloud Run หรือบริการ Serverless ใดเป็น Secure API
    Endpoint
4.  ใครเป็นผู้ดูแล API Key และค่าใช้จ่ายของ Gemini API
5.  ขอบเขตการตอบของ Chatbot จะจำกัดเฉพาะข้อมูลใน Knowledge Base หรือไม่
6.  วิธีเผยแพร่และสาธิต API Endpoint ในวันนำเสนอ

**ข้อสรุป:** คุณรับผิดชอบ Frontend และ Integration เป็นหลัก
ไม่จำเป็นต้องทำหน้าที่ค้นคว้าข้อมูลรถยนต์หรือเขียนเอกสาร Knowledge Base แทนสมาชิกคนอื่น
แต่ต้องกำหนดรูปแบบข้อมูลและวิธีเชื่อมต่อให้ชัดเจนตั้งแต่ต้น
