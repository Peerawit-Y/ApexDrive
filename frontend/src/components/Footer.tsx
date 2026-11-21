import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, ShieldCheck, Code2, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070B] mt-24 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1 font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-widest">
                APEX<span className="text-rose-500">DRIVE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-normal">
              โชว์รูมและคลังข้อมูลเปรียบเทียบซูเปอร์คาร์เชิงสมรรถนะ ผสานวิศวกรรมข้อมูลยานยนต์และ AI Telemetry Specialist เพื่อการวิเคราะห์ข้อมูลความเร็วแบบเจาะลึก
            </p>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VERIFIED CHASSIS TELEMETRY</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="font-mono text-xs space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">
              SHOWROOM NAV
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-rose-400 transition-colors">โชว์รูมหลัก (Home Stage)</Link></li>
              <li><Link to="/products" className="hover:text-rose-400 transition-colors">คลังรถยนต์ทั้งหมด (Inventory)</Link></li>
              <li><Link to="/categories" className="hover:text-rose-400 transition-colors">หมวดหมู่และระบบขับเคลื่อน (Drivetrain)</Link></li>
              <li><Link to="/compare" className="hover:text-rose-400 transition-colors">เปรียบเทียบเชิงวิศวกรรม (Compare)</Link></li>
              <li><Link to="/faq" className="hover:text-rose-400 transition-colors">คำถามที่พบบ่อย (FAQ)</Link></li>
            </ul>
          </div>

          {/* Technology & Architecture */}
          <div className="font-mono text-xs space-y-3">
            <h4 className="text-white font-bold tracking-widest uppercase">
              ENGINEERING STACK
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>React 18 + Vite + TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Tailwind CSS Architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Official Engineering Telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>GitHub Pages Cloud Deployment</span>
              </li>
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <div className="glass-panel p-5 rounded-2xl space-y-2 font-mono bg-black/40">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>DISCLAIMER (ข้อจำกัดความรับผิดชอบ)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal font-sans font-normal">
              เว็บไซต์นี้เป็นโครงงานจำลองเพื่อการศึกษา (Educational Simulation Only) ไม่มีการทำธุรกรรมทางการเงินจริง และไม่มีการรับจองหรือจำหน่ายรถยนต์จริง
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>© 2026 ApexDrive Collective. All rights reserved.</p>
          <p>ENGINEERED BY TEAM MEMBERS 1–4</p>
        </div>
      </div>
    </footer>
  );
};
