import React from 'react';
import { Product } from '../types/product';
import { X, Zap, Timer, Gauge, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompareTableProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const CompareTable: React.FC<CompareTableProps> = ({
  products,
  onRemove,
  onClear
}) => {
  if (products.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center max-w-xl mx-auto my-12 space-y-4">
        <Award className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-xl font-bold text-white">ยังไม่มีรถยนต์ในตารางเปรียบเทียบ</h3>
        <p className="text-xs text-slate-400 font-mono leading-relaxed">
          เลือกกดปุ่ม "เปรียบเทียบ" จากหน้ารายการสินค้าเพื่อนำรถยนต์รุ่นที่ท่านสนใจ (สูงสุด 4 คัน) มาเปรียบเทียบสเปกและสมรรถนะเคียงข้างกัน
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-rose-950/40 transition-colors"
        >
          <span>ไปเลือกดูรถยนต์ในโชว์รูม</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Find best values to highlight
  const maxHp = Math.max(...products.map(p => p.horsepower));
  const minAcc = Math.min(...products.map(p => p.acceleration_0_100_sec));
  const maxTopSpeed = Math.max(...products.map(p => p.top_speed_kmh));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs text-slate-400">
        <span>
          COMPARING <strong className="text-white font-bold">{products.length}</strong> / 4 CHASSIS
        </span>
        <button
          onClick={onClear}
          className="text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-4"
        >
          ล้างรายการเปรียบเทียบทั้งหมด
        </button>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-4 bg-transparent text-left text-xs font-mono font-bold text-slate-400 w-48 uppercase tracking-wider">
                SPECIFICATION / CHASSIS
              </th>
              {products.map(p => (
                <th key={p.id} className="p-4 min-w-[240px] text-left align-top">
                  <div className="relative bg-[#0E121B] p-4 rounded-2xl shadow-xl">
                    <button
                      onClick={() => onRemove(p.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-neutral-900/80 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                      title="นำออก"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img
                      src={p.image}
                      alt={p.model}
                      className="w-full h-32 object-cover rounded-xl mb-3"
                    />
                    <div className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-widest">{p.brand}</div>
                    <div className="text-sm font-bold text-white">{p.model}</div>
                    <div className="text-xs font-mono font-bold text-white mt-1">
                      ฿{p.price.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">THB</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs font-mono">
            
            {/* Horsepower */}
            <tr className="bg-white/[0.02]">
              <td className="p-4 font-medium text-slate-300 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>พละกำลัง (Horsepower)</span>
              </td>
              {products.map(p => (
                <td key={p.id} className={`p-4 font-bold ${p.horsepower === maxHp ? 'text-amber-400 bg-amber-500/10 rounded-lg' : 'text-slate-200'}`}>
                  {p.horsepower} HP {p.horsepower === maxHp && <span className="ml-1.5 text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">PEAK</span>}
                </td>
              ))}
            </tr>

            {/* Acceleration */}
            <tr>
              <td className="p-4 font-medium text-slate-300 flex items-center gap-2">
                <Timer className="w-3.5 h-3.5 text-rose-400" />
                <span>0-100 กม./ชม. (Accel)</span>
              </td>
              {products.map(p => (
                <td key={p.id} className={`p-4 font-bold ${p.acceleration_0_100_sec === minAcc ? 'text-emerald-400 bg-emerald-500/10 rounded-lg' : 'text-slate-200'}`}>
                  {p.acceleration_0_100_sec} วินาที {p.acceleration_0_100_sec === minAcc && <span className="ml-1.5 text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">FASTEST</span>}
                </td>
              ))}
            </tr>

            {/* Top Speed */}
            <tr className="bg-white/[0.02]">
              <td className="p-4 font-medium text-slate-300 flex items-center gap-2">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                <span>ความเร็วสูงสุด (Top Speed)</span>
              </td>
              {products.map(p => (
                <td key={p.id} className={`p-4 font-bold ${p.top_speed_kmh === maxTopSpeed ? 'text-cyan-400 bg-cyan-500/10 rounded-lg' : 'text-slate-200'}`}>
                  {p.top_speed_kmh} กม./ชม. {p.top_speed_kmh === maxTopSpeed && <span className="ml-1.5 text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">V-MAX</span>}
                </td>
              ))}
            </tr>

            {/* Torque */}
            <tr>
              <td className="p-4 font-medium text-slate-300">แรงบิดสูงสุด (Torque)</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-slate-200">
                  {p.torque_nm} Nm
                </td>
              ))}
            </tr>

            {/* Engine */}
            <tr className="bg-white/[0.02]">
              <td className="p-4 font-medium text-slate-300">สถาปัตยกรรมเครื่องยนต์</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-slate-300">
                  {p.engine}
                </td>
              ))}
            </tr>

            {/* Drivetrain */}
            <tr>
              <td className="p-4 font-medium text-slate-300">ระบบขับเคลื่อน</td>
              {products.map(p => (
                <td key={p.id} className="p-4 font-bold text-amber-300">
                  {p.drivetrain}
                </td>
              ))}
            </tr>

            {/* Transmission */}
            <tr className="bg-white/[0.02]">
              <td className="p-4 font-medium text-slate-300">ระบบส่งกำลัง (Gearbox)</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-slate-300">
                  {p.transmission}
                </td>
              ))}
            </tr>

            {/* Seats */}
            <tr>
              <td className="p-4 font-medium text-slate-300">ห้องโดยสาร (Cabin)</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-slate-300">
                  {p.seats} ที่นั่ง {p.seats > 2 ? '(2+2 GT)' : '(2 ที่นั่ง Pure Sport)'}
                </td>
              ))}
            </tr>

            {/* Detail Link Row */}
            <tr className="bg-white/[0.02]">
              <td className="p-4 font-medium text-slate-300">ข้อมูลจำเพาะเชิงลึก</td>
              {products.map(p => (
                <td key={p.id} className="p-4">
                  <Link
                    to={`/products/${p.id}`}
                    className="inline-block w-full py-2.5 px-3 text-center bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-mono font-bold uppercase tracking-wider transition-colors shadow-md hover:scale-105 active:scale-95"
                  >
                    ดูสเปกเต็ม
                  </Link>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};
