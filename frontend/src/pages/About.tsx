import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const members = [
    {
      index: '01',
      badge: 'Core Developer',
      role: 'Frontend & System Integration',
      duty: t(
        'พัฒนาเว็บแอปพลิเคชัน สถาปัตยกรรม UI/UX ระบบค้นหา กรอง เปรียบเทียบ ตะกร้าจองจำลอง และเชื่อมต่อระบบ RAG',
        'Developed the web application, luxury UI/UX architecture, search, filtering, comparison matrix, reservation simulation, and RAG integration.'
      ),
      tech: 'React 18 · Vite · TypeScript · Tailwind CSS · Gemini API'
    },
    {
      index: '02',
      badge: 'Data Specialist',
      role: 'Product Research & Product Data',
      duty: t(
        'ค้นคว้าและตรวจสอบความถูกต้องของสเปกรถยนต์ระดับสมรรถนะสูง จัดทำโครงสร้างข้อมูลพร้อมแหล่งอ้างอิงและภาพถ่าย',
        'Researched and verified official technical specifications for high-performance vehicles, structuring the catalog dataset with imagery and citations.'
      ),
      tech: 'JSON Data Modeling · Automotive Research'
    },
    {
      index: '03',
      badge: 'Knowledge Architect',
      role: 'RAG Knowledge Base Preparation',
      duty: t(
        'จัดทำเอกสารความรู้เชิงลึก คู่มือเครื่องยนต์ ตารางเปรียบเทียบ และข้อมูลประกอบการตัดสินใจสำหรับระบบสืบค้น',
        'Authored comprehensive automotive knowledge documents, engine guides, and benchmark references for retrieval-augmented workflows.'
      ),
      tech: 'Markdown · RAG Retrieval Knowledge Base'
    },
    {
      index: '04',
      badge: 'QA & Architecture',
      role: 'QA, Testing & Documentation',
      duty: t(
        'ออกแบบ Use Case และสถาปัตยกรรมระบบ จัดทำชุดทดสอบการทำงานและตรวจสอบความแม่นยำของข้อมูล',
        'Designed system architecture diagrams, use cases, and end-to-end QA test suites to validate data accuracy and user experience.'
      ),
      tech: 'System Architecture · Quality Assurance'
    }
  ];

  const inScopeItems = [
    t(
      'หน้าโชว์รูมหลัก คลังรถยนต์ ข้อมูลจำเพาะเชิงลึก หมวดหมู่ และคำถามที่พบบ่อย',
      'Main Showroom, Vehicle Collection, Technical Detail View, Categories, About, and FAQ'
    ),
    t(
      'ระบบค้นหาและคัดกรองตามระบบขับเคลื่อน สถาปัตยกรรมเครื่องยนต์ และพละกำลัง',
      'Real-time search and filtering by marque, drivetrain, architecture, and horsepower'
    ),
    t(
      'ตารางเปรียบเทียบสเปกด้านเทคนิคเคียงข้างกันสูงสุด 4 รุ่น',
      'Side-by-side technical specification comparison matrix for up to 4 models'
    ),
    t(
      'ระบบตะกร้าจองจำลองสำหรับทดสอบขั้นตอนการเลือกยนตรกรรม',
      'Simulated vehicle reservation workflow for interactive user journey testing'
    )
  ];

  const outScopeItems = [
    t(
      'ไม่มีระบบสมาชิกและการเข้าสู่ระบบ (Authentication)',
      'No user accounts or authentication system'
    ),
    t(
      'ไม่มีการเชื่อมต่อ Payment Gateway หรือการชำระเงินจริง',
      'No payment gateway integration or real financial processing'
    ),
    t(
      'ไม่มีการสั่งซื้อหรือจัดส่งรถยนต์จริง (จัดทำเพื่อการศึกษา)',
      'No real vehicle purchases or deliveries (educational simulation only)'
    ),
    t(
      'ไม่มีการบันทึกหรือเปิดเผย API Key ในฝั่ง Frontend',
      'No private API keys stored or exposed in the client-side bundle'
    )
  ];

  return (
    <div className="space-y-20 max-w-5xl mx-auto pb-16">
      
      {/* Editorial Overview */}
      <div className="space-y-4 pb-10 border-b border-white/[0.08]">
        <div className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
          ABOUT APEXDRIVE
        </div>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
          {t('เกี่ยวกับโครงการ ApexDrive', 'About ApexDrive')}
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-3xl pt-1">
          {t(
            'ApexDrive คือแพลตฟอร์มโชว์รูมและคลังข้อมูลยนตรกรรมสมรรถนะสูง (Sports Car & Supercars) ที่ออกแบบขึ้นด้วยมาตรฐานงานวิศวกรรมและสุนทรียศาสตร์ระดับลักชูรี เพื่อการศึกษาการออกแบบระบบและการผสานข้อมูลเชิงลึก',
            'ApexDrive is a luxury sports car and hypercar showroom simulation crafted with editorial aesthetics and verified engineering data to demonstrate modern web architecture and domain-focused product discovery.'
          )}
        </p>
      </div>

      {/* Scope Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
              IN SCOPE
            </span>
            <h2 className="text-xl font-light text-white tracking-tight">
              {t('ขอบเขตที่ระบบรองรับ', 'Supported Capabilities')}
            </h2>
          </div>
          <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
            {inScopeItems.map((item, idx) => (
              <li key={idx} className="py-4 text-sm text-neutral-300 font-light leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
              OUT OF SCOPE
            </span>
            <h2 className="text-xl font-light text-white tracking-tight">
              {t('ข้อจำกัดและขอบเขตนอกระบบ', 'Project Boundaries')}
            </h2>
          </div>
          <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
            {outScopeItems.map((item, idx) => (
              <li key={idx} className="py-4 text-sm text-neutral-400 font-light leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Team Breakdown */}
      <div className="space-y-10 pt-10 border-t border-white/[0.08]">
        <div className="space-y-1.5">
          <span className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
            THE TEAM
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            {t('บทบาทและความรับผิดชอบของทีมพัฒนา', 'Team Roles & Responsibilities')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {members.map((m) => (
            <div
              key={m.index}
              className="p-8 rounded-2xl bg-[#0B0C10] border border-white/[0.08] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-neutral-500">
                  <span>{m.badge}</span>
                  <span>{m.index}</span>
                </div>
                <h3 className="text-xl font-light text-white tracking-tight">
                  {m.role}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {m.duty}
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] text-xs text-neutral-500 font-light tracking-wide">
                {m.tech}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
