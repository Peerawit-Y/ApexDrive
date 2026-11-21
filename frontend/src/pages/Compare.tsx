import React from 'react';
import { Product } from '../types/product';
import { CompareTable } from '../components/CompareTable';
import { Scale } from 'lucide-react';

interface CompareProps {
  compareProducts: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const Compare: React.FC<CompareProps> = ({
  compareProducts,
  onRemove,
  onClear
}) => {
  return (
    <div className="space-y-8">
      <div className="pb-2">
        <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-widest">
          <Scale className="w-4 h-4" />
          <span>TECHNICAL HEAD-TO-HEAD BENCHMARK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">เปรียบเทียบสเปกและสมรรถนะ</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-normal">
          วิเคราะห์ความแตกต่างของเครื่องยนต์ พละกำลัง อัตราเร่ง และระบบส่งกำลังของซูเปอร์คาร์แต่ละรุ่นแบบเคียงข้างกัน (เทียบได้สูงสุด 4 คันพร้อมกัน)
        </p>
      </div>

      <CompareTable
        products={compareProducts}
        onRemove={onRemove}
        onClear={onClear}
      />
    </div>
  );
};
