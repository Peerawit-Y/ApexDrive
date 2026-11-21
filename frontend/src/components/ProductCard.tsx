import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { ShoppingBag, Scale, Check, ArrowRight } from 'lucide-react';

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
  return (
    <div className="group relative rounded-3xl bg-[#0B0D13] hover:bg-[#10131B] transition-all duration-500 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-black/90 hover:-translate-y-1.5 w-full">
      
      {/* Clickable Card Overlay */}
      <Link
        to={`/products/${product.id}`}
        className="absolute inset-0 z-0"
        aria-label={`ดูรายละเอียด ${product.brand} ${product.model}`}
      />

      {/* 1. Cinematic Car Image (Minimal, Uncluttered) */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#07090E]">
        <img
          src={product.image}
          alt={`${product.brand} ${product.model}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-transparent to-black/30 pointer-events-none" />

        {/* Top-Right: Discreet Luxury Quick Actions (Z-Index above link) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          
          {/* Compare Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare(product);
            }}
            title={isCompared ? 'นำออกจากการเปรียบเทียบ' : 'เลือกเพื่อเปรียบเทียบสเปก'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
              isCompared
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/40 scale-105'
                : 'bg-black/50 text-slate-300 hover:text-white hover:bg-white/20'
            }`}
            aria-label="Toggle comparison"
          >
            {isCompared ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Scale className="w-4 h-4" />}
          </button>

          {/* Cart / Bookmark Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            title={isInCart ? 'อยู่ในรายการที่เลือกแล้ว' : 'เพิ่มในรายการจองจำลอง'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
              isInCart
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 scale-105'
                : 'bg-black/50 text-slate-300 hover:text-white hover:bg-white/20'
            }`}
            aria-label="Add to simulated cart"
          >
            {isInCart ? <Check className="w-4 h-4 text-white stroke-[2.5]" /> : <ShoppingBag className="w-4 h-4" />}
          </button>

        </div>
      </div>

      {/* 2. Car Information Body (Minimalist Luxury Typography) */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 relative pointer-events-none">
        
        {/* Brand & Model Headline */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400">
            {product.brand} · {product.drivetrain}
          </div>

          <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-rose-400 transition-colors line-clamp-1">
            {product.model}
          </h3>

          {/* Minimalist 1-Line Key Spec */}
          <p className="text-xs sm:text-sm text-slate-400 font-light pt-1">
            {product.horsepower} แรงม้า · 0-100 กม./ชม. ใน {product.acceleration_0_100_sec} วินาที
          </p>
        </div>

        {/* 3. Understated Price & Clean Discover Link */}
        <div className="pt-2 flex items-end justify-between border-t border-white/[0.06]">
          <div>
            <span className="text-[11px] text-slate-400 font-light block">
              เริ่มต้น
            </span>
            <span className="text-xl sm:text-2xl font-light tracking-tight text-white">
              ฿{product.price.toLocaleString()}
            </span>
          </div>

          {/* Sleek Minimalist CTA */}
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
            <span>สำรวจรุ่นนี้</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

    </div>
  );
};
