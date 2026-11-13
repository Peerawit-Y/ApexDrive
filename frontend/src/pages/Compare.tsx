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
      <div>
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest">
          <Scale className="w-4 h-4" />
          <span>Technical Head-to-Head</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-1">เปรียบเทียบสเปกและสมรรถนะ</h1>
        <p className="text-xs text-slate-400 mt-1">
          วิเคราะห์ความแตกต่างของเครื่องยนต์ พละกำลัง อัตราเร่ง และเทคโนโลยีของรถแต่ละรุ่นแบบเทียบเคียง
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
