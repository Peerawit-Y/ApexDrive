import React from 'react';
import { FilterState } from '../types/product';
import { SlidersHorizontal, RotateCcw, Zap } from 'lucide-react';

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
    <div className="glass-panel p-6 rounded-2xl space-y-6 bg-[#0E121B]/90 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2 text-white font-mono font-bold text-xs uppercase tracking-wider">
          <SlidersHorizontal className="w-4 h-4 text-rose-500" />
          <span>CHASSIS FILTER</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-rose-400 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
          SORT TELEMETRY
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
          className="w-full bg-black/40 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
        >
          <option value="name-asc">ชื่อรุ่น (A-Z)</option>
          <option value="hp-desc">แรงม้าสูงสุด (HP Highest)</option>
          <option value="acc-asc">อัตราเร่ง 0-100 เร็วที่สุด</option>
          <option value="price-asc">ราคา: น้อยไปมาก</option>
          <option value="price-desc">ราคา: มากไปน้อย</option>
        </select>
      </div>

      {/* Brand Selection */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
          MARQUE / BRAND
        </label>
        <select
          value={filters.brand}
          onChange={(e) => onChange({ ...filters, brand: e.target.value })}
          className="w-full bg-black/40 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
        >
          <option value="">ทุกแบรนด์ (ALL MARQUES)</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Drivetrain Selection */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
          DRIVETRAIN DYNAMICS
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['', 'RWD', 'AWD'].map((dt) => (
            <button
              key={dt}
              type="button"
              onClick={() => onChange({ ...filters, drivetrain: dt })}
              className={`py-2 text-xs font-mono font-bold rounded-xl transition-all ${
                filters.drivetrain === dt
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                  : 'bg-black/40 text-slate-300 hover:bg-white/[0.08]'
              }`}
            >
              {dt === '' ? 'ALL' : dt}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
          POWERTRAIN & CLASSIFICATION
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="w-full bg-black/40 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
        >
          <option value="">ทุกสถาปัตยกรรม (ALL)</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Min Horsepower Slider */}
      <div className="pt-2 space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>MIN OUTPUT</span>
          </span>
          <span className="text-amber-400 font-bold">
            {filters.minHorsepower > 0 ? `${filters.minHorsepower} HP` : 'ANY'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1500"
          step="50"
          value={filters.minHorsepower}
          onChange={(e) => onChange({ ...filters, minHorsepower: Number(e.target.value) })}
          className="w-full accent-rose-600 bg-white/10 rounded-lg h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>0 HP</span>
          <span>750 HP</span>
          <span>1,500 HP</span>
        </div>
      </div>

    </div>
  );
};
