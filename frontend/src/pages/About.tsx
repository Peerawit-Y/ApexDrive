import React from 'react';
import { Users, Code, Database, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const members = [
    {
      role: 'คนที่ 1 — Frontend & System Integration',
      duty: 'พัฒนาเว็บแอปพลิเคชัน สถาปัตยกรรม UI/UX ระบบค้นหา/กรอง/เปรียบเทียบ ตะกร้าสินค้าจำลอง และเชื่อมต่อ RAG Chatbot กับ Gemini API',
      tech: 'React 18, Vite, TypeScript, Tailwind CSS, Gemini API',
      icon: Code,
      badge: 'Core Developer'
    },
    {
      role: 'คนที่ 2 — Product Research & Product Data',
      duty: 'ค้นคว้าและตรวจสอบความถูกต้องของสเปกรถยนต์ระดับสมรรถนะสูง 10 รุ่น จัดทำโครงสร้าง products.json พร้อมแหล่งอ้างอิงและรูปภาพความละเอียดสูง',
      tech: 'JSON Data Modeling, Automotive Research',
      icon: Database,
      badge: 'Data Specialist'
    },
    {
      role: 'คนที่ 3 — RAG Knowledge Base Preparation',
      duty: 'จัดทำเอกสารความรู้เชิงลึก Markdown/PDF เช่น คู่มือเครื่องยนต์ ตารางเปรียบเทียบ คู่มือเลือกรถ และ FAQ สำหรับให้ Gemini File Search ค้นหา',
      tech: 'Markdown, RAG Retrieval Knowledge Base',
      icon: BookOpen,
      badge: 'Knowledge Architect'
    },
    {
      role: 'คนที่ 4 — QA, Testing & Documentation',
      duty: 'ออกแบบ Use Case & Architecture Diagram, จัดทำ Test Cases สำหรับหน้าเว็บและชุดคำถามทดสอบความถูกต้องของคำตอบ Chatbot',
      tech: 'System Architecture, Quality Assurance, Test Automation',
      icon: CheckCircle,
      badge: 'QA & Architecture'
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* Overview */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-rose-400 text-xs font-mono">
          <span>PROJECT OVERVIEW // APEXDRIVE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          เกี่ยวกับโครงการ ApexDrive
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          ApexDrive เป็นโครงการพัฒนาเว็บไซต์ Niche E-commerce จำลองสำหรับรถยนต์ประเภท Sports Car และ Supercars จัดทำขึ้นเพื่อการศึกษาและการเรียนรู้การผสานเทคโนโลยี Generative AI ด้วย RAG (Retrieval-Augmented Generation) จาก Google Gemini
        </p>
      </div>

      {/* Scope Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0E121B]/90 p-7 rounded-3xl space-y-3 font-mono shadow-xl">
          <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
            <CheckCircle className="w-4 h-4" />
            <span>ขอบเขตที่ระบบรองรับ (IN SCOPE)</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2.5 list-disc list-inside font-sans font-normal">
            <li>หน้า Home Stage, Catalog, Product Detail, Categories, About, FAQ</li>
            <li>ระบบค้นหา (Search) และตัวกรองตามระบบส่งกำลังและแรงม้า</li>
            <li>ตารางเปรียบเทียบสเปกด้านเทคนิค (Telemetry Compare Table)</li>
            <li>ตะกร้าสินค้าจำลอง (Cart Simulation) สำหรับทดสอบ Workflow การจอง</li>
            <li>RAG Telemetry Co-Pilot อ้างอิงเอกสารความรู้จริงจาก Google Gemini</li>
          </ul>
        </div>

        <div className="bg-[#0E121B]/90 p-7 rounded-3xl space-y-3 font-mono shadow-xl">
          <h3 className="text-xs font-bold text-rose-400 flex items-center gap-2 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>ข้อจำกัดและขอบเขตนอกระบบ (OUT OF SCOPE)</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2.5 list-disc list-inside font-sans font-normal">
            <li>ไม่มีระบบสมาชิกและการล็อกอิน (Authentication)</li>
            <li>ไม่มีการเชื่อมต่อ Payment Gateway หรือการตัดเงินจริง</li>
            <li>ไม่มีการสั่งซื้อหรือจัดส่งรถยนต์จริง (เป็นระบบจำลองเพื่อการศึกษา)</li>
            <li>API Key ของ Gemini ต้องไม่ถูกเปิดเผยในฝั่ง Frontend Bundle</li>
          </ul>
        </div>
      </div>

      {/* Team Breakdown */}
      <div className="space-y-6 pt-4">
        <div className="text-center font-mono">
          <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2 uppercase tracking-wider">
            <Users className="w-5 h-5 text-rose-500" />
            <span>TEAM MEMBERS & RESPONSIBILITIES</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">บทบาทหน้าที่และความรับผิดชอบของสมาชิกทั้ง 4 คน</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="bg-[#0E121B]/90 p-7 rounded-3xl space-y-4 flex flex-col justify-between shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] text-rose-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{m.role}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{m.duty}</p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-slate-400">
                  <strong className="text-slate-200">STACK:</strong> {m.tech}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
