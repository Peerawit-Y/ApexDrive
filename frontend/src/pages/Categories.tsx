import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../services/productService';
import { Gauge, Zap, Flame, Cpu } from 'lucide-react';

export const Categories: React.FC = () => {
  const rwdCars = products.filter(p => p.drivetrain === 'RWD');
  const awdCars = products.filter(p => p.drivetrain === 'AWD');
  const hybridCars = products.filter(p => p.fuel_type.includes('Hybrid'));
  const naCars = products.filter(p => p.engine.includes('Naturally Aspirated'));
  const turboCars = products.filter(p => p.engine.includes('Turbo'));

  return (
    <div className="space-y-12">
      
      <div>
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Classification & Taxonomy</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">หมวดหมู่และระบบขับเคลื่อน</h1>
        <p className="text-xs text-slate-400 mt-1">
          จำแนกตามปรัชญาวิศวกรรมเครื่องยนต์และระบบส่งกำลัง เพื่อการค้นหาที่ตรงกับสไตล์การขับขี่
        </p>
      </div>

      {/* Drivetrain Categories */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Gauge className="w-5 h-5 text-rose-500" />
          <span>จำแนกตามระบบขับเคลื่อน (Drivetrain)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* RWD Card */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-rose-600/20 text-rose-400 text-xs font-bold rounded-lg border border-rose-500/30">
                ขับเคลื่อนล้อหลัง (RWD)
              </span>
              <span className="text-xs text-slate-400 font-semibold">{rwdCars.length} รุ่น</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              เหมาะสำหรับผู้รักการขับขี่สายเพียว ล้อหน้าทำหน้าที่เลี้ยว ล้อหลังส่งกำลัง คล่องแคล่ว ท้ายปัดได้ (Oversteer) อารมณ์มอเตอร์สปอร์ตแท้
            </p>
            <div className="space-y-2 pt-2 border-t border-brand-border/60">
              {rwdCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-200 transition-colors"
                >
                  <span className="font-semibold">{c.brand} {c.model}</span>
                  <span className="text-amber-400">{c.horsepower} HP</span>
                </Link>
              ))}
            </div>
          </div>

          {/* AWD Card */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-amber-600/20 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30">
                ขับเคลื่อนสี่ล้อ (AWD)
              </span>
              <span className="text-xs text-slate-400 font-semibold">{awdCars.length} รุ่น</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ยึดเกาะถนนระดับสูงสุดด้วยระบบกระจายแรงบิดอิสระ 4 ล้อ ออกตัวเร็วระดับทำลายสถิติ มั่นใจในทุกสภาพผิวและทางโค้งความเร็วสูง
            </p>
            <div className="space-y-2 pt-2 border-t border-brand-border/60">
              {awdCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-200 transition-colors"
                >
                  <span className="font-semibold">{c.brand} {c.model}</span>
                  <span className="text-rose-400">{c.acceleration_0_100_sec}s (0-100)</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Engine Types Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>จำแนกตามประเภทเครื่องยนต์ (Engine Philosophy)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* NA Card */}
          <div className="bg-brand-card p-5 rounded-2xl border border-brand-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Naturally Aspirated (NA)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              เครื่องยนต์ไร้ระบบอัดอากาศ เสียงกระหึ่มเป็นเอกลักษณ์ ลากรอบได้เกิน 8,500 RPM ไร้อาการรอรอบ
            </p>
            <div className="pt-2 text-xs text-slate-300 font-semibold">
              {naCars.map(c => (
                <div key={c.id} className="py-1 flex justify-between">
                  <span>{c.model}</span>
                  <span className="text-amber-400">{c.horsepower} HP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Turbo Card */}
          <div className="bg-brand-card p-5 rounded-2xl border border-brand-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Twin-Turbocharged</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ขุมพลังอัดอากาศทวินเทอร์โบ แรงบิดมหาศาลตั้งแต่รอบต่ำ ตอบสนองอัตราเร่งฉับไวและท็อปสปีดสูง
            </p>
            <div className="pt-2 text-xs text-slate-300 font-semibold">
              <div className="text-[11px] text-slate-400">รวม {turboCars.length} รุ่นชั้นนำ เช่น 911 Carrera, GT-R Nismo, 720S</div>
            </div>
          </div>

          {/* Hybrid Card */}
          <div className="bg-brand-card p-5 rounded-2xl border border-brand-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Plug-in Hybrid (PHEV)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              การผสานเครื่องยนต์ V6 Turbo กับมอเตอร์ไฟฟ้า F1 ให้พละกำลังรวมสูงสุดถึง 830 แรงม้า วิ่งไฟฟ้าเงียบได้
            </p>
            <div className="pt-2 text-xs text-slate-300 font-semibold">
              {hybridCars.map(c => (
                <div key={c.id} className="py-1 flex justify-between">
                  <span>{c.brand} {c.model}</span>
                  <span className="text-emerald-400">{c.horsepower} HP</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
