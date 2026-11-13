import React from 'react';
import { Users, Code, Database, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const members = [
    {
      role: 'คนที่ 1 — Frontend & System Integration',
      duty: 'พัฒนาเว็บแอปพลิเคชัน โครงสร้างหน้าเว็บ ระบบกรอง/ค้นหา/เปรียบเทียบ ตะกร้าสินค้าจำลอง และเชื่อมต่อ RAG Chatbot กับ Gemini API',
      tech: 'React, Vite, TypeScript, Tailwind CSS, Gemini API',
      icon: Code,
      badge: 'Core Developer'
    },
    {
      role: 'คนที่ 2 — Product Research & Product Data',
      duty: 'รวบรวมและตรวจสอบความถูกต้องของสเปกรถสปอร์ต 8 รุ่น จัดทำโครงสร้าง products.json พร้อมแหล่งอ้างอิงและรูปภาพประกอบ',
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
      tech: 'System Diagram, Quality Assurance, Test Automation',
      icon: CheckCircle,
      badge: 'QA & Architecture'
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* Overview */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">About The Project</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          เกี่ยวกับโครงการ ApexDrive
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          ApexDrive เป็นโครงการพัฒนาเว็บไซต์ Niche E-commerce จำลองสำหรับรถยนต์ประเภท Sports Car และ Supercars จัดทำขึ้นเพื่อการศึกษาและการเรียนรู้การผสานเทคโนโลยี Generative AI ด้วย RAG (Retrieval-Augmented Generation) จาก Google Gemini
        </p>
      </div>

      {/* Scope Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>ขอบเขตที่ระบบรองรับ (In Scope)</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>หน้า Home, Catalog, Product Detail, Categories, About, FAQ</li>
            <li>ระบบค้นหา (Search) และตัวกรองตามระบบขับเคลื่อนและแรงม้า</li>
            <li>ตารางเปรียบเทียบสเปกด้านเทคนิค (Compare Table)</li>
            <li>ตะกร้าสินค้าจำลอง (Cart Simulation) สำหรับทดสอบ Workflow</li>
            <li>RAG Chatbot อ้างอิงเอกสารความรู้จริงจาก Google Gemini</li>
          </ul>
        </div>

        <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-3">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>ข้อจำกัดและขอบเขตนอกระบบ (Out of Scope)</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>ไม่มีระบบสมาชิกและการล็อกอิน (Authentication)</li>
            <li>ไม่มีการเชื่อมต่อ Payment Gateway หรือการตัดเงินจริง</li>
            <li>ไม่มีการสั่งซื้อหรือจัดส่งรถยนต์จริง (เป็นระบบจำลองเพื่อการศึกษา)</li>
            <li>API Key ของ Gemini ต้องไม่ถูกเปิดเผยในฝั่ง Frontend Bundle</li>
          </ul>
        </div>
      </div>

      {/* Team Breakdown */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-rose-500" />
            <span>บทบาทและความรับผิดชอบของสมาชิกทั้ง 4 คน</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">แบ่งหน้าที่ตามแนวคิดการทำงานร่วมกันผ่าน Git & GitHub</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-rose-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{m.role}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.duty}</p>
                </div>
                <div className="pt-3 border-t border-brand-border/60 text-[11px] text-slate-400">
                  <strong className="text-slate-200">เครื่องมือ:</strong> {m.tech}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
