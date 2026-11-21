import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { ShoppingBag, Scale, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  isCompared: boolean;
  isInCart: boolean;
  onToggleCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isCompared,
  isInCart,
  onToggleCompare,
  onAddToCart,
}) => {
  const { t } = useLanguage();

  return (
    <div className="group relative rounded-2xl bg-[#0B0C10] border border-white/[0.07] hover:border-white/[0.2] transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-1 w-full">
      
      {/* Clickable Card Overlay */}
      <Link
        to={`/products/${product.id}`}
        className="absolute inset-0 z-0"
        aria-label={t(`ดูรายละเอียด ${product.brand} ${product.model}`, `Discover ${product.brand} ${product.model}`)}
      />

      {/* 1. Cinematic Car Image (Uncluttered Studio Presentation) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#07080B]">
        <img
          src={product.image}
          alt={`${product.brand} ${product.model}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-black/25 pointer-events-none" />

        {/* Top-Right: Discreet Monochrome Luxury Actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare(product);
            }}
            title={isCompared ? t('นำออกจากการเปรียบเทียบ', 'Remove from comparison') : t('เลือกเพื่อเปรียบเทียบสเปก', 'Add to comparison')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
              isCompared
                ? 'bg-white text-black border-white'
                : 'bg-black/50 text-neutral-300 border-white/15 hover:text-white hover:bg-black/80 hover:border-white/40'
            }`}
            aria-label="Toggle comparison"
          >
            {isCompared ? <Check className="w-4 h-4 stroke-[2]" /> : <Scale className="w-4 h-4 stroke-[1.5]" />}
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            title={isInCart ? t('อยู่ในรายการจองแล้ว', 'Added to reservation') : t('เพิ่มลงรายการจอง', 'Add to reservation')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
              isInCart
                ? 'bg-white text-black border-white'
                : 'bg-black/50 text-neutral-300 border-white/15 hover:text-white hover:bg-black/80 hover:border-white/40'
            }`}
            aria-label="Add to simulated cart"
          >
            {isInCart ? <Check className="w-4 h-4 stroke-[2]" /> : <ShoppingBag className="w-4 h-4 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* 2. Car Information Body (Minimalist Luxury Typography) */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6 relative pointer-events-none">
        
        {/* Brand & Model Headline */}
        <div className="space-y-1.5">
          <div className="text-[10px] tracking-[0.25em] uppercase text-neutral-500">
            {product.brand} &nbsp;·&nbsp; {product.drivetrain}
          </div>

          <h3 className="text-2xl sm:text-[1.75rem] font-light tracking-tight text-white group-hover:text-neutral-200 transition-colors line-clamp-1">
            {product.model}
          </h3>

          {/* Minimalist 1-Line Key Spec */}
          <p className="text-xs sm:text-sm text-neutral-400 font-light pt-1">
            {t(
              `${product.horsepower.toLocaleString()} แรงม้า · 0–100 กม./ชม. ใน ${product.acceleration_0_100_sec} วินาที`,
              `${product.horsepower.toLocaleString()} HP · 0–100 km/h in ${product.acceleration_0_100_sec} s`
            )}
          </p>
        </div>

        {/* 3. Understated Price & Clean Discover Link */}
        <div className="pt-4 flex items-end justify-between border-t border-white/[0.08]">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block">
              {t('เริ่มต้น', 'FROM')}
            </span>
            <span className="text-xl sm:text-2xl font-light tracking-tight text-white">
              ฿{product.price.toLocaleString()}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs tracking-wider text-neutral-400 group-hover:text-white transition-colors">
            <span>{t('สำรวจรุ่นนี้', 'Discover')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

    </div>
  );
};
