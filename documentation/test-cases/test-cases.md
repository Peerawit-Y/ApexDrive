# Test Cases & Verification Plan (คนที่ 4 - QA & Testing)

## 1. Web Application Functional Test Cases

| Test Case ID | Feature / Module | Test Scenario | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-WEB-01** | Navigation & Home | เปิดหน้าแรก (Home) ของเว็บไซต์ | โหลดข้อมูลรถเด่น 4 คัน และสถิติสำคัญถูกต้อง | PASS |
| **TC-WEB-02** | Product Catalog | ดูรายการสินค้าทั้งหมดในหน้า Products | แสดงรายการรถยนต์ครบ 8 รุ่น พร้อมข้อมูลราคาและสเปก | PASS |
| **TC-WEB-03** | Keyword Search | ค้นหาด้วยคำว่า "V8" หรือ "Porsche" | แสดงเฉพาะรถยนต์ที่มีคำค้นหาในชื่อ เครื่องยนต์ หรือหมวดหมู่ | PASS |
| **TC-WEB-04** | Drivetrain Filter | กรองเฉพาะระบบขับเคลื่อน "AWD" | แสดงเฉพาะ Nissan GT-R Nismo และ BMW M4 Competition | PASS |
| **TC-WEB-05** | Horsepower Slider | เลื่อนตัวกรองแรงม้าขั้นต่ำไปที่ 700 HP | แสดงเฉพาะ Ferrari 296 GTB และ McLaren 720S | PASS |
| **TC-WEB-06** | Product Detail View | คลิกเพื่อดูรายละเอียดของ Ferrari 296 GTB | แสดงข้อมูลจำเพาะทางเทคนิค 830 HP ครบถ้วนพร้อมแหล่งอ้างอิง | PASS |
| **TC-WEB-07** | Compare Feature | กดเลือกเปรียบเทียบรถ 2 คัน | ตาราง Compare แสดงข้อมูลเคียงข้าง ไฮไลต์ค่าสูงสุดถูกต้อง | PASS |
| **TC-WEB-08** | Cart Simulation | เพิ่มรถยนต์ลงในตะกร้าและกดจำลองสั่งซื้อ | แสดง Dialog แจ้งว่าเป็นระบบจำลอง และบันทึกคำสั่งซื้อจำลองได้ | PASS |

---

## 2. RAG Chatbot Question & Grounding Test Cases

| Test Case ID | Test Question (คำถามทดสอบ) | Expected Answer Criteria | Source Grounding |
| :--- | :--- | :--- | :--- |
| **TC-RAG-01** | รถรุ่นไหนมีแรงม้ามากที่สุด? | ต้องตอบ **Ferrari 296 GTB (830 แรงม้า)** | `sports-car-comparison.md` |
| **TC-RAG-02** | รถรุ่นไหน 0-100 เร็วที่สุด? | ต้องตอบ **Corvette Z06 (2.6s)** หรือ **GT-R Nismo (2.7s)** | `sports-car-comparison.md` |
| **TC-RAG-03** | เปรียบเทียบ Porsche 911 กับ Nissan GT-R | แยกจุดเด่น 911 (ขับหลัง วางท้าย ใช้งานทุกวัน) vs GT-R (ขับสี่ แรงม้า 600 HP แข่งขัน) | `sports-car-comparison.md` |
| **TC-RAG-04** | AWD กับ RWD ต่างกันยังไง? | อธิบายลักษณะการส่งกำลัง ฟีลลิ่งการขับขี่ และความปลอดภัย | `engine-and-drivetrain.md` |
| **TC-RAG-05** | มีรถรุ่นไหนใช้เครื่องยนต์ NA บ้าง? | ต้องตอบ **Lamborghini Huracán Tecnica** และ **Corvette Z06** | `engine-and-drivetrain.md` |
| **TC-RAG-06** | มีคำถามนอกขอบเขต เช่น สอนทำอาหาร | ต้องตอบสุภาพว่าไม่พบข้อมูลในเอกสาร และไม่แต่งข้อมูลขึ้นเอง | Out-of-bounds Handling |
