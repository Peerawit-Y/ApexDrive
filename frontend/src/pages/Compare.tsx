import React from 'react';
import { Product } from '../types/product';
import { CompareTable } from '../components/CompareTable';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="space-y-12 pb-16">
      <div className="space-y-3 pb-8 border-b border-white/[0.08]">
        <div className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
          HEAD-TO-HEAD SPECIFICATION
        </div>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
          {t('เปรียบเทียบสเปกและสมรรถนะ', 'Compare Specifications')}
        </h1>
        <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
          {t(
            'วิเคราะห์ความแตกต่างของเครื่องยนต์ พละกำลัง อัตราเร่ง และระบบส่งกำลังของยนตรกรรมแต่ละรุ่นเคียงข้างกันได้สูงสุด 4 คัน',
            'Analyze engine architecture, horsepower, acceleration, and drivetrain dynamics side by side for up to 4 vehicles.'
          )}
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
