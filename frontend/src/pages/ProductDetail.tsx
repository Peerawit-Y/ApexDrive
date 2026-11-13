import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { Product } from '../types/product';
import {
  Zap,
  Timer,
  Disc,
  ArrowLeft,
  Scale,
  ShoppingBag,
  Sparkles,
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
  onAskCarAI: (carName: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  compareIds,
  cartIds,
  onToggleCompare,
  onAddToCart,
  onAskCarAI
}) => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="bg-brand-card p-12 rounded-2xl border border-brand-border text-center max-w-lg mx-auto my-12 space-y-4">
        <h3 className="text-xl font-bold text-white">ไม่พบข้อมูลรถยนต์รุ่นนี้</h3>
        <p className="text-xs text-slate-400">กรุณาตรวจสอบรหัสรถยนต์ หรือกลับไปยังหน้ารายการสินค้า</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปยัง Catalog</span>
        </Link>
      </div>
    );
  }

  const isCompared = compareIds.includes(product.id);
  const isInCart = cartIds.includes(product.id);

  return (
    <div className="space-y-10">
      
      {/* Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับไปยังรายการรถยนต์ทั้งหมด</span>
      </Link>

      {/* Main Grid: Gallery + Core Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left: Car Media */}
        <div className="space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-brand-border bg-slate-900 shadow-2xl h-[380px] sm:h-[460px]">
            <img
              src={product.image}
              alt={`${product.brand} ${product.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-black/80 backdrop-blur-md text-white border border-white/10 uppercase">
                {product.brand}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 text-white">
                {product.year}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>ตลาด: {product.market}</span>
              <span className="font-semibold text-amber-300">ระบบขับเคลื่อน {product.drivetrain}</span>
            </div>
          </div>
        </div>

        {/* Right: Pricing, Specs, and Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              {product.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
              {product.brand} {product.model}
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-brand-card rounded-2xl border border-brand-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold mb-1">
                <Zap className="w-4 h-4" />
                <span>พละกำลัง</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">{product.horsepower} HP</div>
            </div>
            <div className="text-center border-x border-brand-border">
              <div className="flex items-center justify-center gap-1 text-rose-400 text-xs font-semibold mb-1">
                <Timer className="w-4 h-4" />
                <span>0-100 กม./ชม.</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">{product.acceleration_0_100_sec}s</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-cyan-400 text-xs font-semibold mb-1">
                <Disc className="w-4 h-4" />
                <span>Top Speed</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">{product.top_speed_kmh} km/h</div>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-5 bg-gradient-to-r from-rose-950/30 to-brand-card rounded-2xl border border-rose-900/40 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider">ราคาจำหน่ายโดยประมาณ (จำลอง)</span>
              <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                ฿{product.price.toLocaleString()} <span className="text-xs font-medium text-slate-400">{product.currency}</span>
              </div>
            </div>
            <div className="text-right text-[11px] text-amber-400 bg-amber-950/40 border border-amber-900/60 px-3 py-1 rounded-lg">
              Education Simulation
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onAddToCart(product)}
                className={`py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  isInCart
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                    : 'bg-rose-600 hover:bg-rose-500 text-white border-transparent shadow-lg shadow-rose-950/40'
                }`}
              >
                {isInCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{isInCart ? 'อยู่ในตะกร้าจำลองแล้ว' : 'ใส่ตะกร้าสินค้าจำลอง'}</span>
              </button>

              <button
                onClick={() => onToggleCompare(product)}
                className={`py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  isCompared
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700/60'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{isCompared ? 'นำออกจากการเปรียบเทียบ' : 'เพิ่มเพื่อเปรียบเทียบ'}</span>
              </button>
            </div>

            {/* AI Assistant Quick Inquiry */}
            <button
              onClick={() => onAskCarAI(`${product.brand} ${product.model}`)}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-brand-border text-xs font-semibold text-rose-300 hover:text-rose-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ถาม RAG AI Specialist เกี่ยวกับ {product.brand} {product.model} คันนี้</span>
            </button>
          </div>
        </div>

      </div>

      {/* Highlights & Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        
        {/* Key Highlights */}
        <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-border space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-500" />
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
        <div className="bg-brand-card p-6 sm:p-8 rounded-3xl border border-brand-border space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-400" />
            <span>ข้อมูลจำเพาะทางเทคนิค (Technical Specifications)</span>
          </h3>
          <div className="divide-y divide-brand-border text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">เครื่องยนต์ (Engine)</span>
              <span className="text-white font-semibold text-right">{product.engine}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">แรงบิดสูงสุด (Torque)</span>
              <span className="text-white font-semibold">{product.torque_nm} Nm</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">ระบบส่งกำลัง (Transmission)</span>
              <span className="text-white font-semibold">{product.transmission}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">ระบบขับเคลื่อน (Drivetrain)</span>
              <span className="text-amber-300 font-semibold">{product.drivetrain}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">จำนวนที่นั่ง (Seats)</span>
              <span className="text-white font-semibold">{product.seats} ที่นั่ง</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">ประเภทเชื้อเพลิง (Fuel Type)</span>
              <span className="text-white font-semibold">{product.fuel_type}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Sources & Citations */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-brand-border text-xs space-y-2">
        <span className="text-slate-400 font-semibold flex items-center gap-1.5">
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
