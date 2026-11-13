import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { ShieldCheck, Cpu, ArrowRight, Gauge, Sparkles } from 'lucide-react';

interface HomeProps {
  featuredProducts: Product[];
  compareIds: string[];
  cartIds: string[];
  onToggleCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenChat: () => void;
}

export const Home: React.FC<HomeProps> = ({
  featuredProducts,
  compareIds,
  cartIds,
  onToggleCompare,
  onAddToCart,
  onOpenChat
}) => {
  return (
    <div className="space-y-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-dark to-slate-950 border border-brand-border p-8 sm:p-14 lg:p-20 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ขับเคลื่อนด้วย Google Gemini API & File Search RAG</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            สัมผัสสุดยอดพละกำลังแห่ง <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400">ยนตรกรรมสปอร์ต</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            แพลตฟอร์มจำลอง Niche E-commerce รวมรถสปอร์ตและซูเปอร์คาร์ชั้นนำ พร้อมระบบค้นหา เปรียบเทียบสเปกเชิงลึก และปรึกษาผู้เชี่ยวชาญ AI Chatbot อัจฉริยะแบบเรียลไทม์
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-950/50 flex items-center gap-2 transition-all hover:gap-3"
            >
              <span>สำรวจรายการรถยนต์ทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onOpenChat}
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <Cpu className="w-4 h-4 text-rose-400" />
              <span>ถาม AI สเปกรถยนต์</span>
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-brand-border/60">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">830 HP</div>
              <div className="text-xs text-slate-400 mt-1">แรงม้าสูงสุดในคลังสินค้า</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400">2.6s</div>
              <div className="text-xs text-slate-400 mt-1">0-100 กม./ชม. เร็วที่สุด</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">สเปกผ่านการตรวจสอบ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sports Cars */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Featured Collection</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              รถสปอร์ตและซูเปอร์คาร์แนะนำ
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 group"
          >
            <span>ดูทั้งหมด (8 รุ่น)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((car) => (
            <ProductCard
              key={car.id}
              product={car}
              isCompared={compareIds.includes(car.id)}
              isInCart={cartIds.includes(car.id)}
              onToggleCompare={onToggleCompare}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-brand-card p-8 rounded-2xl border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-xl bg-rose-600/10 border border-rose-500/20 text-rose-500 flex items-center justify-center">
            <Gauge className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">สเปกแม่นยำ พร้อมแหล่งอ้างอิง</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            รวบรวมข้อมูลจำเพาะทางวิศวกรรมทั้งพละกำลัง แรงบิด อัตราเร่ง ระบบเกียร์ และระบบขับเคลื่อนอย่างถูกต้องตามปีรุ่นและตลาด
          </p>
        </div>

        <div className="bg-brand-card p-8 rounded-2xl border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">RAG Chatbot อัจฉริยะ</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            ผสานเทคโนโลยี Gemini File Search ค้นหาข้อมูลตรงจากคู่มือและเอกสารความรู้ ไม่มโนสเปก พร้อมบอกที่มาของข้อมูลอย่างโปร่งใส
          </p>
        </div>

        <div className="bg-brand-card p-8 rounded-2xl border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">เปรียบเทียบสเปกได้ทันที</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            เลือกรถยนต์ที่คุณสนใจได้สูงสุด 4 คันเพื่อนำมาเปรียบเทียบตารางแบบเคียงข้าง ไฮไลต์จุดเด่นแรงม้า อัตราเร่ง และความเร็วสูงสุด
          </p>
        </div>
      </section>

    </div>
  );
};
