import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, ShieldCheck, Cpu, Code2, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-card border-t border-brand-border mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wider">
                APEX<span className="text-rose-500">DRIVE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              แพลตฟอร์มจำลอง Niche E-commerce สำหรับคนรักความเร็ว รวบรวมสเปกรถสปอร์ตระดับตำนาน พร้อมผู้ช่วย RAG Chatbot อัจฉริยะจาก Google Gemini
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Technical Specs</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">หน้าสำคัญ</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-rose-400 transition-colors">หน้าแรก (Home)</Link></li>
              <li><Link to="/products" className="hover:text-rose-400 transition-colors">รายการรถยนต์ทั้งหมด (Catalog)</Link></li>
              <li><Link to="/categories" className="hover:text-rose-400 transition-colors">หมวดหมู่และระบบขับเคลื่อน</Link></li>
              <li><Link to="/compare" className="hover:text-rose-400 transition-colors">ตารางเปรียบเทียบสเปก (Compare)</Link></li>
            </ul>
          </div>

          {/* Technology & Architecture */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">สถาปัตยกรรม & เทคโนโลยี</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>React 18 + Vite + TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-rose-400" />
                <span>Google Gemini API + File Search RAG</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>GitHub Pages Deployment</span>
              </li>
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>ข้อจำกัดความรับผิดชอบ (Disclaimer)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              เว็บไซต์นี้เป็นโครงงานจำลองเพื่อการศึกษา (Educational Simulation Only) ไม่มีการทำธุรกรรมทางการเงินจริง และไม่มีการรับจองหรือจำหน่ายรถยนต์จริง ข้อมูลสเปกและราคาอ้างอิงเพื่อการเรียนรู้
            </p>
          </div>
        </div>

        <div className="border-t border-brand-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 ApexDrive Collective. All rights reserved.</p>
          <p>Designed and Built by Team Members 1–4</p>
        </div>
      </div>
    </footer>
  );
};
