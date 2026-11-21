import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../services/productService';
import { Gauge, Zap, Flame, Cpu, BatteryCharging, ChevronRight } from 'lucide-react';

export const Categories: React.FC = () => {
  const rwdCars = products.filter(p => p.drivetrain === 'RWD');
  const awdCars = products.filter(p => p.drivetrain === 'AWD');
  const hybridCars = products.filter(p => p.fuel_type.includes('Hybrid'));
  const electricCars = products.filter(p => p.fuel_type.includes('Electric') || p.fuel_type.includes('BEV'));
  const naCars = products.filter(p => p.engine.includes('Naturally Aspirated'));
  const turboCars = products.filter(p => p.engine.includes('Turbo'));

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="pb-2">
        <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-widest">
          <Gauge className="w-4 h-4" />
          <span>CLASSIFICATION & ENGINEERING TAXONOMY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">หมวดหมู่และระบบขับเคลื่อน</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-normal">
          จำแนกตามปรัชญาวิศวกรรมเครื่องยนต์และระบบส่งกำลัง เพื่อการค้นหาที่ตรงกับบุคลิกและการควบคุมที่คุณต้องการ
        </p>
      </div>

      {/* Drivetrain Categories */}
      <section className="space-y-6">
        <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 uppercase tracking-wider">
          <Gauge className="w-4 h-4 text-rose-500" />
          <span>DRIVETRAIN DYNAMICS (ระบบขับเคลื่อน)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* RWD Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-[#0E121B]/90 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-rose-600/20 text-rose-300 text-xs font-mono font-bold rounded-lg">
                REAR-WHEEL DRIVE (RWD)
              </span>
              <span className="text-xs font-mono text-slate-400">{rwdCars.length} CHASSIS</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              เหมาะสำหรับผู้รักการขับขี่สายเพียว ล้อหน้าทำหน้าที่เลี้ยว ล้อหลังส่งกำลัง คล่องแคล่ว ท้ายปัดได้ (Oversteer) มอบสัมผัสมอเตอร์สปอร์ตดั้งเดิม
            </p>
            <div className="space-y-2 pt-2 font-mono text-xs">
              {rwdCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 transition-colors"
                >
                  <span className="font-semibold">{c.brand} {c.model}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">{c.horsepower} HP</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* AWD Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-[#0E121B]/90 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-mono font-bold rounded-lg">
                ALL-WHEEL DRIVE (AWD)
              </span>
              <span className="text-xs font-mono text-slate-400">{awdCars.length} CHASSIS</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              ยึดเกาะถนนระดับสูงสุดด้วยระบบกระจายแรงบิดอิสระ 4 ล้อ ออกตัวเร็วระดับทำลายสถิติ มั่นใจในทุกสภาพผิวและทางโค้งความเร็วสูง
            </p>
            <div className="space-y-2 pt-2 font-mono text-xs">
              {awdCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 transition-colors"
                >
                  <span className="font-semibold">{c.brand} {c.model}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">{c.acceleration_0_100_sec}s (0-100)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Engine Types Section */}
      <section className="space-y-6">
        <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>ENGINE ARCHITECTURE (ปรัชญาเครื่องยนต์)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* NA Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-[#0E121B]/90 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-mono font-bold text-white uppercase">Naturally Aspirated (NA)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              เครื่องยนต์ไร้ระบบอัดอากาศ เสียงคำรามเป็นเอกลักษณ์ ลากรอบได้สูงและตอบสนองคันเร่งเป็นเส้นตรงไร้อาการรอรอบ
            </p>
            <div className="pt-2 text-xs font-mono text-slate-300 space-y-1.5">
              {naCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="py-2 px-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] flex justify-between transition-colors"
                >
                  <span>{c.brand} {c.model}</span>
                  <span className="text-amber-400 font-bold">{c.horsepower} HP</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Turbo Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-[#0E121B]/90 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-mono font-bold text-white uppercase">Twin & Quad-Turbocharged</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ขุมพลังอัดอากาศเทอร์โบคู่และเทอร์โบ 4 ลูก แรงบิดมหาศาลตั้งแต่รอบต่ำ ตอบสนองอัตราเร่งฉับไวและท็อปสปีดระดับไฮเปอร์คาร์
            </p>
            <div className="pt-2 text-xs font-mono text-slate-300 space-y-1.5">
              {turboCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="py-2 px-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] flex justify-between transition-colors"
                >
                  <span>{c.brand} {c.model}</span>
                  <span className="text-rose-400 font-bold">{c.horsepower} HP</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Hybrid Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-[#0E121B]/90 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-mono font-bold text-white uppercase">Plug-in Hybrid (PHEV)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              การผสานเครื่องยนต์สันดาปสมรรถนะสูงเข้ากับมอเตอร์ไฟฟ้าเทคโนโลยีสนามแข่ง ให้พละกำลังรวมสูงสุดถึง 1,015 แรงม้า พร้อมโหมดขับเคลื่อนไฟฟ้า
            </p>
            <div className="pt-2 text-xs font-mono text-slate-300 space-y-1.5">
              {hybridCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="py-2 px-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] flex justify-between transition-colors"
                >
                  <span>{c.brand} {c.model}</span>
                  <span className="text-emerald-400 font-bold">{c.horsepower} HP</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Pure Electric (BEV) Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-[#0E121B]/90 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-mono font-bold text-white uppercase">Pure Electric (BEV)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ยนตรกรรมพลังงานไฟฟ้า 100% ปล่อยมลพิษเป็นศูนย์ แรงบิดมาเต็มตั้งแต่วินาทีแรกที่กดคันเร่ง พร้อมเทคโนโลยีแบตเตอรี่และห้องโดยสารล้ำยุค
            </p>
            <div className="pt-2 text-xs font-mono text-slate-300 space-y-1.5">
              {electricCars.map(c => (
                <Link
                  key={c.id}
                  to={`/products/${c.id}`}
                  className="py-2 px-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] flex justify-between transition-colors"
                >
                  <span>{c.brand} {c.model}</span>
                  <span className="text-cyan-400 font-bold">{c.horsepower} HP</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
