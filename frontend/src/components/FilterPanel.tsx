import React from 'react';
import { FilterState } from '../types/product';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  brands: string[];
  categories: string[];
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  brands,
  categories,
  onChange,
  onReset,
}) => {
  return (
    <div className="bg-brand-card p-5 rounded-2xl border border-brand-border space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-rose-500" />
          <span>กรองและจัดเรียงข้อมูล</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>ล้างค่า</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          เรียงลำดับตาม
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
          className="w-full bg-slate-900 border border-brand-border rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
        >
          <option value="name-asc">ชื่อแบรนด์และรุ่น (A-Z)</option>
          <option value="price-asc">ราคา: น้อยไปมาก</option>
          <option value="price-desc">ราคา: มากไปน้อย</option>
          <option value="hp-desc">แรงม้าสูงสุด (HP)</option>
          <option value="acc-asc">อัตราเร่ง 0-100 เร็วที่สุด</option>
        </select>
      </div>

      {/* Brand Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          แบรนด์ (Brand)
        </label>
        <select
          value={filters.brand}
          onChange={(e) => onChange({ ...filters, brand: e.target.value })}
          className="w-full bg-slate-900 border border-brand-border rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
        >
          <option value="">ทุกแบรนด์</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Drivetrain Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          ระบบขับเคลื่อน (Drivetrain)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['', 'RWD', 'AWD'].map((dt) => (
            <button
              key={dt}
              type="button"
              onClick={() => onChange({ ...filters, drivetrain: dt })}
              className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                filters.drivetrain === dt
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-slate-900 text-slate-300 border-brand-border hover:bg-slate-800'
              }`}
            >
              {dt === '' ? 'ทั้งหมด' : dt}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          หมวดหมู่ตัวถัง/เครื่องยนต์
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="w-full bg-slate-900 border border-brand-border rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
        >
          <option value="">ทุกหมวดหมู่</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Min Horsepower Slider */}
      <div>
        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
          <span className="uppercase tracking-wider">แรงม้าขั้นต่ำ</span>
          <span className="text-amber-400 font-bold">{filters.minHorsepower > 0 ? `${filters.minHorsepower} HP` : 'ไม่จำกัด'}</span>
        </div>
        <input
          type="range"
          min="0"
          max="800"
          step="50"
          value={filters.minHorsepower}
          onChange={(e) => onChange({ ...filters, minHorsepower: Number(e.target.value) })}
          className="w-full accent-rose-600 bg-slate-800 rounded-lg h-2 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>0 HP</span>
          <span>400 HP</span>
          <span>800+ HP</span>
        </div>
      </div>

    </div>
  );
};
