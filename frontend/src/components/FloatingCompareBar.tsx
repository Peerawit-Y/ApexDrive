import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../types/product';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingCompareBarProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const FloatingCompareBar: React.FC<FloatingCompareBarProps> = ({
  products,
  onRemove,
  onClear
}) => {
  const { t } = useLanguage();
  const location = useLocation();

  // Hide when empty or already viewing the Compare page
  if (products.length === 0 || location.pathname === '/compare') {
    return null;
  }

  return (
    <div className="fixed bottom-5 inset-x-4 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl bg-[#0B0C10]/90 backdrop-blur-xl border border-white/[0.15] rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 shadow-2xl shadow-black/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5">
        
        {/* Left: Selected Vehicle Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto max-w-full no-scrollbar">
          <span className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 shrink-0 hidden md:inline">
            {t('เปรียบเทียบ', 'COMPARE')} ({products.length}/4)
          </span>

          <div className="flex items-center gap-2">
            {products.map(car => (
              <div
                key={car.id}
                className="relative group flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] shrink-0"
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-light text-white max-w-[90px] truncate">
                  {car.model}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(car.id)}
                  className="text-neutral-500 hover:text-white transition-colors"
                  aria-label={t('นำออก', 'Remove')}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Clear & Compare CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] tracking-wider uppercase text-neutral-500 hover:text-white transition-colors"
          >
            {t('ล้างค่า', 'Clear')}
          </button>

          <Link
            to="/compare"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-[0.14em] uppercase transition-all"
          >
            <span>{t(`เทียบสเปก (${products.length})`, `Compare (${products.length})`)}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};
