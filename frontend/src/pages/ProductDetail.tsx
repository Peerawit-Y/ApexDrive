import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { Product } from '../types/product';
import {
  Zap,
  Timer,
  Gauge,
  ArrowLeft,
  Scale,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Check,
  Info
} from 'lucide-react';

interface ProductDetailProps {
  compareIds: string[];
  cartIds: string[];
  onToggleCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  compareIds,
  cartIds,
  onToggleCompare,
  onAddToCart
}) => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center max-w-lg mx-auto my-12 space-y-4">
        <h3 className="text-xl font-bold text-white">ไม่พบข้อมูลรถยนต์รุ่นนี้</h3>
        <p className="text-xs text-slate-400 font-mono">กรุณาตรวจสอบรหัสรถยนต์ หรือกลับไปยังหน้ารายการสินค้า</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 text-white text-xs font-mono font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับสู่โชว์รูม</span>
        </Link>
      </div>
    );
  }

  const isCompared = compareIds.includes(product.id);
  const isInCart = cartIds.includes(product.id);

  return (
    <div className="space-y-12">
      
      {/* Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับสู่คลังรถยนต์ทั้งหมด</span>
      </Link>

      {/* Main Grid: Gallery + Core Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left: Car Media */}
        <div className="space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#0A0D14] shadow-2xl h-[380px] sm:h-[460px]">
            <img
              src={product.image}
              alt={`${product.brand} ${product.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-black/70 backdrop-blur-md text-white uppercase">
                {product.brand}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-rose-600 text-white">
                MY{product.year}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-between text-xs font-mono text-slate-300">
              <span>MARKET: {product.market.toUpperCase()}</span>
              <span className="font-bold text-amber-300">{product.drivetrain} DRIVETRAIN</span>
            </div>
          </div>
        </div>

        {/* Right: Pricing, Specs, and Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">
              {product.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
              {product.brand} {product.model}
            </h1>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#0E121B] rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-[10px] font-mono font-semibold uppercase mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>HORSEPOWER</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white">{product.horsepower} <span className="text-xs text-slate-400">HP</span></div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-rose-400 text-[10px] font-mono font-semibold uppercase mb-1">
                <Timer className="w-3.5 h-3.5" />
                <span>0-100 KM/H</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white">{product.acceleration_0_100_sec} <span className="text-xs text-slate-400">s</span></div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-cyan-400 text-[10px] font-mono font-semibold uppercase mb-1">
                <Gauge className="w-3.5 h-3.5" />
                <span>TOP SPEED</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white">{product.top_speed_kmh} <span className="text-xs text-slate-400">km/h</span></div>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-5 bg-gradient-to-r from-rose-950/40 via-[#12151E] to-[#0A0D14] rounded-2xl shadow-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-widest">
                ราคาจำหน่ายอย่างเป็นทางการ (OFFICIAL MSRP)
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-black text-white mt-0.5">
                ฿{product.price.toLocaleString()} <span className="text-xs font-normal text-slate-400">{product.currency}</span>
              </div>
            </div>
            <div className="text-right text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-lg">
              THAILAND OFFICIAL
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onAddToCart(product)}
                className={`py-3.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                  isInCart
                    ? 'bg-emerald-600/25 text-emerald-300'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 hover:scale-105 active:scale-95'
                }`}
              >
                {isInCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{isInCart ? 'อยู่ในตะกร้าแล้ว' : 'เพิ่มลงตะกร้า'}</span>
              </button>

              <button
                onClick={() => onToggleCompare(product)}
                className={`py-3.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                  isCompared
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{isCompared ? 'นำออกจากการเทียบ' : 'เพิ่มในตารางเทียบ'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Highlights & Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        
        {/* Key Highlights */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 bg-[#0E121B]/90 shadow-xl">
          <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            <span>จุดเด่นทางวิศวกรรม (Engineering Highlights)</span>
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {product.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Specs Table */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 bg-[#0E121B]/90 shadow-xl">
          <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2 uppercase tracking-wider">
            <Info className="w-4 h-4 text-amber-400" />
            <span>ข้อมูลจำเพาะทางเทคนิค (Technical Specifications)</span>
          </h3>
          <div className="text-xs font-mono space-y-2">
            <div className="py-2 px-3 rounded-lg bg-white/[0.02] flex justify-between">
              <span className="text-slate-400">ENGINE</span>
              <span className="text-white font-semibold text-right">{product.engine}</span>
            </div>
            <div className="py-2 px-3 rounded-lg flex justify-between">
              <span className="text-slate-400">MAX TORQUE</span>
              <span className="text-white font-semibold">{product.torque_nm} Nm</span>
            </div>
            <div className="py-2 px-3 rounded-lg bg-white/[0.02] flex justify-between">
              <span className="text-slate-400">TRANSMISSION</span>
              <span className="text-white font-semibold">{product.transmission}</span>
            </div>
            <div className="py-2 px-3 rounded-lg flex justify-between">
              <span className="text-slate-400">DRIVETRAIN</span>
              <span className="text-amber-300 font-semibold">{product.drivetrain}</span>
            </div>
            <div className="py-2 px-3 rounded-lg bg-white/[0.02] flex justify-between">
              <span className="text-slate-400">CABIN SEATING</span>
              <span className="text-white font-semibold">{product.seats} ที่นั่ง</span>
            </div>
            <div className="py-2 px-3 rounded-lg flex justify-between">
              <span className="text-slate-400">FUEL TYPE</span>
              <span className="text-white font-semibold">{product.fuel_type}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Sources & Citations */}
      <div className="bg-[#0A0D14] p-6 rounded-2xl text-xs font-mono space-y-2 shadow-lg">
        <span className="text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
          <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
          <span>แหล่งข้อมูลอ้างอิงอย่างเป็นทางการ (Official Sources):</span>
        </span>
        <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-400">
          {product.sources.map((src, idx) => (
            <li key={idx} className="truncate">
              {src.startsWith('http') ? (
                <a href={src} target="_blank" rel="noreferrer" className="text-rose-400 hover:underline">
                  {src}
                </a>
              ) : (
                <span>{src}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
