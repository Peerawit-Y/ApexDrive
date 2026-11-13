import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { Zap, Timer, Disc, ShoppingBag, Scale, Check } from 'lucide-react';

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
    <div className="group bg-brand-card rounded-2xl border border-brand-border overflow-hidden flex flex-col hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300">
      
      {/* Image Container with Badges */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={`${product.brand} ${product.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-black/40"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
            {product.brand}
          </span>
          <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-rose-600/90 text-white backdrop-blur-md">
            {product.year}
          </span>
        </div>

        {/* Drivetrain Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            {product.drivetrain}
          </span>
        </div>

        {/* Quick Specs Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
          <div className="flex items-center gap-1 font-semibold bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{product.horsepower} HP</span>
          </div>
          <div className="flex items-center gap-1 font-semibold bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
            <Timer className="w-3.5 h-3.5 text-rose-400" />
            <span>0-100: {product.acceleration_0_100_sec}s</span>
          </div>
          <div className="flex items-center gap-1 font-semibold bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
            <Disc className="w-3.5 h-3.5 text-cyan-400" />
            <span>{product.top_speed_kmh} km/h</span>
          </div>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-rose-400 font-medium tracking-wide uppercase mb-1">
            {product.category}
          </div>
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
              {product.brand} {product.model}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            {product.engine}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-5 pt-4 border-t border-brand-border/60">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">ราคาจำลอง</span>
            <div className="text-right">
              <span className="text-base font-extrabold text-white">
                ฿{product.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 ml-1 font-medium">{product.currency}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            
            {/* Compare Toggle */}
            <button
              onClick={() => onToggleCompare(product)}
              title={isCompared ? 'นำออกจากการเปรียบเทียบ' : 'เพิ่มเพื่อเปรียบเทียบสเปก'}
              className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                isCompared
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700/60'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="text-[11px]">{isCompared ? 'เทียบแล้ว' : 'เทียบ'}</span>
            </button>

            {/* Simulation Cart Add */}
            <button
              onClick={() => onAddToCart(product)}
              title="เพิ่มใส่ตะกร้าจำลอง"
              className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                isInCart
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700/60'
              }`}
            >
              {isInCart ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShoppingBag className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isInCart ? 'ในตะกร้า' : 'ใส่ตะกร้า'}</span>
            </button>

            {/* View Detail Link */}
            <Link
              to={`/products/${product.id}`}
              className="flex items-center justify-center py-2 px-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950/40 transition-colors text-center"
            >
              ดูรายละเอียด
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
