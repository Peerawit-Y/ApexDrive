import React from 'react';
import { Product } from '../types/product';
import { X, Zap, Timer, Disc, Award } from 'lucide-react';
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
      <div className="bg-brand-card p-12 rounded-2xl border border-brand-border text-center max-w-xl mx-auto my-12">
        <Award className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">ยังไม่มีรถยนต์ในตารางเปรียบเทียบ</h3>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          เลือกกดปุ่ม "เทียบ" จากหน้ารายการสินค้าเพื่อนำรถยนต์รุ่นที่สนใจ (สูงสุด 4 คัน) มาเปรียบเทียบสเปกและสมรรถนะเคียงข้างกัน
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-950/40 transition-colors"
        >
          ไปเลือกดูรถยนต์ใน Catalog
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
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          กำลังเปรียบเทียบ <strong className="text-white font-bold">{products.length}</strong> คัน (สูงสุด 4 คัน)
        </span>
        <button
          onClick={onClear}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline"
        >
          ล้างรายการเปรียบเทียบทั้งหมด
        </button>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-brand-card border border-brand-border text-left text-xs font-semibold text-slate-400 w-44">
                คุณสมบัติ / รุ่นรถ
              </th>
              {products.map(p => (
                <th key={p.id} className="p-4 bg-brand-card border border-brand-border min-w-[240px] text-left align-top">
                  <div className="relative">
                    <button
                      onClick={() => onRemove(p.id)}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                      title="ลบออก"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img
                      src={p.image}
                      alt={p.model}
                      className="w-full h-32 object-cover rounded-xl mb-3"
                    />
                    <div className="text-[11px] text-rose-400 font-semibold uppercase">{p.brand}</div>
                    <div className="text-sm font-bold text-white">{p.model} ({p.year})</div>
                    <div className="text-xs font-bold text-rose-400 mt-1">฿{p.price.toLocaleString()} {p.currency}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-brand-border">
            
            {/* Horsepower */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 flex items-center gap-1.5 border border-brand-border">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>พละกำลัง (Horsepower)</span>
              </td>
              {products.map(p => (
                <td key={p.id} className={`p-3.5 border border-brand-border font-bold ${p.horsepower === maxHp ? 'text-amber-400 bg-amber-500/10' : 'text-slate-200'}`}>
                  {p.horsepower} HP {p.horsepower === maxHp && <span className="ml-1 text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">สูงสุด</span>}
                </td>
              ))}
            </tr>

            {/* Acceleration */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 flex items-center gap-1.5 border border-brand-border">
                <Timer className="w-3.5 h-3.5 text-rose-400" />
                <span>อัตราเร่ง 0-100 กม./ชม.</span>
              </td>
              {products.map(p => (
                <td key={p.id} className={`p-3.5 border border-brand-border font-bold ${p.acceleration_0_100_sec === minAcc ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-200'}`}>
                  {p.acceleration_0_100_sec} วินาที {p.acceleration_0_100_sec === minAcc && <span className="ml-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">เร็วที่สุด</span>}
                </td>
              ))}
            </tr>

            {/* Top Speed */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 flex items-center gap-1.5 border border-brand-border">
                <Disc className="w-3.5 h-3.5 text-cyan-400" />
                <span>ความเร็วสูงสุด (Top Speed)</span>
              </td>
              {products.map(p => (
                <td key={p.id} className={`p-3.5 border border-brand-border font-bold ${p.top_speed_kmh === maxTopSpeed ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-200'}`}>
                  {p.top_speed_kmh} กม./ชม. {p.top_speed_kmh === maxTopSpeed && <span className="ml-1 text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">สูงสุด</span>}
                </td>
              ))}
            </tr>

            {/* Torque */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 border border-brand-border">แรงบิด (Torque)</td>
              {products.map(p => (
                <td key={p.id} className="p-3.5 border border-brand-border text-slate-200">
                  {p.torque_nm} Nm
                </td>
              ))}
            </tr>

            {/* Engine */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 border border-brand-border">ประเภทเครื่องยนต์</td>
              {products.map(p => (
                <td key={p.id} className="p-3.5 border border-brand-border text-slate-200">
                  {p.engine}
                </td>
              ))}
            </tr>

            {/* Drivetrain */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 border border-brand-border">ระบบขับเคลื่อน</td>
              {products.map(p => (
                <td key={p.id} className="p-3.5 border border-brand-border font-semibold text-amber-300">
                  {p.drivetrain}
                </td>
              ))}
            </tr>

            {/* Transmission */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 border border-brand-border">ระบบเกียร์</td>
              {products.map(p => (
                <td key={p.id} className="p-3.5 border border-brand-border text-slate-300">
                  {p.transmission}
                </td>
              ))}
            </tr>

            {/* Seats */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 border border-brand-border">จำนวนที่นั่ง</td>
              {products.map(p => (
                <td key={p.id} className="p-3.5 border border-brand-border text-slate-300">
                  {p.seats} ที่นั่ง {p.seats > 2 ? '(2+2)' : '(2 ที่นั่งแท้)'}
                </td>
              ))}
            </tr>

            {/* Detail Link Row */}
            <tr>
              <td className="p-3.5 bg-slate-900/60 font-medium text-slate-300 border border-brand-border">ไปยังหน้ารถยนต์</td>
              {products.map(p => (
                <td key={p.id} className="p-3.5 border border-brand-border">
                  <Link
                    to={`/products/${p.id}`}
                    className="inline-block w-full py-2 px-3 text-center bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold transition-colors"
                  >
                    ดูรายละเอียด
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
