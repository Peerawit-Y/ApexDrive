import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, products as allProducts } from '../services/productService';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProduct } from '../data/productsEn';
import {
  ArrowLeft,
  Scale,
  ShoppingBag,
  ArrowUpRight,
  Check
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
  const { lang, t } = useLanguage();
  const rawProduct = id ? getProductById(id) : undefined;
  const product = rawProduct ? getLocalizedProduct(rawProduct, lang) : undefined;

  // Financial Services Estimator State
  const [downPaymentPct, setDownPaymentPct] = useState<number>(30);
  const [termMonths, setTermMonths] = useState<number>(60);
  const annualRate = 2.49;

  // Related / Similar Vehicles (3 models prioritizing same drivetrain & closest horsepower)
  const relatedProducts = useMemo(() => {
    if (!rawProduct) return [];
    return allProducts
      .filter(p => p.id !== rawProduct.id)
      .sort((a, b) => {
        const aSameDt = a.drivetrain === rawProduct.drivetrain ? 0 : 1;
        const bSameDt = b.drivetrain === rawProduct.drivetrain ? 0 : 1;
        if (aSameDt !== bSameDt) return aSameDt - bSameDt;
        return Math.abs(a.horsepower - rawProduct.horsepower) - Math.abs(b.horsepower - rawProduct.horsepower);
      })
      .slice(0, 3);
  }, [rawProduct]);

  if (!product || !rawProduct) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto space-y-6">
        <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500">404 — NOT FOUND</p>
        <h3 className="text-3xl font-light text-white tracking-tight">
          {t('ไม่พบข้อมูลรถยนต์รุ่นนี้', 'Vehicle Not Found')}
        </h3>
        <p className="text-sm text-neutral-400 font-light">
          {t(
            'กรุณาตรวจสอบรุ่นรถยนต์ หรือกลับไปยังโชว์รูมเพื่อเลือกชมยนตรกรรมทั้งหมด',
            'Please verify the model URL or return to the showroom to browse the full collection.'
          )}
        </p>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-wider uppercase transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('กลับสู่โชว์รูม', 'Back to Showroom')}</span>
          </Link>
        </div>
      </div>
    );
  }

  const isCompared = compareIds.includes(product.id);
  const isInCart = cartIds.includes(product.id);

  // Monthly Financing Calculation (Flat Rate)
  const downPaymentAmount = Math.round((product.price * downPaymentPct) / 100);
  const financedAmount = product.price - downPaymentAmount;
  const totalInterest = Math.round(financedAmount * (annualRate / 100) * (termMonths / 12));
  const monthlyPayment = Math.round((financedAmount + totalInterest) / termMonths);

  const specRows = [
    { label: t('เครื่องยนต์ (Engine)', 'Engine'), value: product.engine },
    { label: t('พละกำลังสูงสุด (Horsepower)', 'Horsepower'), value: `${product.horsepower.toLocaleString()} HP` },
    { label: t('แรงบิดสูงสุด (Max Torque)', 'Max Torque'), value: `${product.torque_nm.toLocaleString()} Nm` },
    { label: t('อัตราเร่ง 0–100 กม./ชม.', '0–100 km/h Acceleration'), value: t(`${product.acceleration_0_100_sec} วินาที`, `${product.acceleration_0_100_sec} seconds`) },
    { label: t('ความเร็วสูงสุด (Top Speed)', 'Top Speed'), value: t(`${product.top_speed_kmh} กม./ชม.`, `${product.top_speed_kmh} km/h`) },
    { label: t('ระบบส่งกำลัง (Transmission)', 'Transmission'), value: product.transmission },
    { label: t('ระบบขับเคลื่อน (Drivetrain)', 'Drivetrain'), value: product.drivetrain },
    { label: t('ห้องโดยสาร (Seating)', 'Seating Capacity'), value: t(`${product.seats} ที่นั่ง`, `${product.seats} Seats`) },
    { label: t('พลังงาน (Fuel Type)', 'Powertrain / Fuel'), value: product.fuel_type },
    { label: t('ตลาดจำหน่าย (Market)', 'Market'), value: product.market }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* Top Minimal Breadcrumb */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
        <Link
          to="/products"
          className="inline-flex items-center gap-2.5 text-xs tracking-wider uppercase text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t('กลับสู่คลังรถยนต์', 'Back to Collection')}</span>
        </Link>
        <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 hidden sm:inline">
          {product.brand} · MY{product.year}
        </span>
      </div>

      {/* HERO EDITORIAL SHOWCASE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
        
        {/* Left: Clean Unobstructed Automotive Photography */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl bg-[#07080B] aspect-[16/10]">
            <img
              src={product.image}
              alt={`${product.brand} ${product.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right: Luxury Editorial Identity, Price & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
          
          {/* Title & Narrative */}
          <div className="space-y-4">
            <div className="text-[11px] tracking-[0.28em] uppercase text-neutral-400">
              {product.brand} &nbsp;·&nbsp; {product.category}
            </div>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-light tracking-tight text-white leading-[1.1]">
              {product.model}
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Minimalist Key Telemetry Strip */}
          <div className="grid grid-cols-3 divide-x divide-white/[0.1] border-y border-white/[0.1] py-6">
            <div className="pr-4">
              <div className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                {product.horsepower}
                <span className="text-xs text-neutral-500 ml-1">HP</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-1.5">
                {t('พละกำลัง', 'Power')}
              </div>
            </div>

            <div className="px-4 sm:px-6">
              <div className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                {product.acceleration_0_100_sec}
                <span className="text-xs text-neutral-500 ml-1">s</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-1.5">
                {t('0–100 กม./ชม.', '0–100 km/h')}
              </div>
            </div>

            <div className="pl-4 sm:pl-6">
              <div className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                {product.top_speed_kmh}
                <span className="text-xs text-neutral-500 ml-1">km/h</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-1.5">
                {t('ความเร็วสูงสุด', 'Top Speed')}
              </div>
            </div>
          </div>

          {/* Understated Luxury Pricing */}
          <div className="space-y-1.5">
            <span className="text-[11px] tracking-[0.22em] uppercase text-neutral-500 block">
              {t(`ราคาจำหน่ายอย่างเป็นทางการ (${product.market})`, `Official MSRP (${product.market})`)}
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                ฿{product.price.toLocaleString()}
              </span>
              <span className="text-xs tracking-widest uppercase text-neutral-500">
                {product.currency}
              </span>
            </div>
          </div>

          {/* Crisp Luxury CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
            <button
              onClick={() => onAddToCart(rawProduct)}
              className={`flex-1 py-4 px-6 rounded-full text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2.5 transition-all duration-300 ${
                isInCart
                  ? 'bg-white/15 text-white border border-white/25'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {isInCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{isInCart ? t('อยู่ในรายการแล้ว', 'Reserved') : t('เพิ่มลงตะกร้าจอง', 'Reserve Vehicle')}</span>
            </button>

            <button
              onClick={() => onToggleCompare(rawProduct)}
              className={`py-4 px-6 rounded-full text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2.5 transition-all duration-300 border ${
                isCompared
                  ? 'bg-white/15 text-white border-white/40'
                  : 'bg-transparent text-neutral-300 border-white/15 hover:border-white/40 hover:text-white'
              }`}
            >
              {isCompared ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
              <span>{isCompared ? t('เลือกเทียบแล้ว', 'Comparing') : t('เปรียบเทียบ', 'Compare')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* EDITORIAL ENGINEERING & TECHNICAL SPECIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 xl:gap-20 pt-12 border-t border-white/[0.08]">
        
        {/* Left: Engineering Craftsmanship & Highlights */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
              CRAFTSMANSHIP & ENGINEERING
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              {t('จุดเด่นทางวิศวกรรม', 'Engineering Highlights')}
            </h2>
          </div>

          <ul className="divide-y divide-white/[0.06]">
            {product.highlights.map((h, idx) => (
              <li key={idx} className="py-5 flex items-baseline gap-5">
                <span className="text-xs font-light tracking-widest text-neutral-500 shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-sm text-neutral-300 font-light leading-relaxed">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Clean Hairline Technical Specifications */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
              TECHNICAL DATA
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              {t('ข้อมูลจำเพาะทางเทคนิค', 'Technical Specifications')}
            </h2>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {specRows.map((row, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-6"
              >
                <span className="text-xs tracking-wider text-neutral-500 uppercase">
                  {row.label}
                </span>
                <span className="text-sm text-white font-light sm:text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* =====================================================================
          APEXDRIVE FINANCIAL SERVICES — LUXURY PAYMENT ESTIMATOR
          ===================================================================== */}
      <section className="p-8 sm:p-12 rounded-2xl bg-[#0B0C10] border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
              APEXDRIVE FINANCIAL SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              {t('คำนวณค่างวดโดยประมาณ', 'Financial Estimator')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              {t(
                `ประเมินแผนการผ่อนชำระเบื้องต้นด้วยอัตราดอกเบี้ยพิเศษ ${annualRate}% ต่อปี`,
                `Estimate your tailored monthly plan at an indicative ${annualRate}% p.a. flat rate.`
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Down Payment Selector */}
            <div className="space-y-3">
              <label className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                {t('เงินดาวน์ (Down Payment)', 'Down Payment')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[20, 30, 40, 50].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPct(pct)}
                    className={`py-2.5 rounded-xl text-xs tracking-wider transition-all border ${
                      downPaymentPct === pct
                        ? 'bg-white text-black border-white font-medium'
                        : 'bg-transparent text-neutral-400 border-white/[0.1] hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Term Selector */}
            <div className="space-y-3">
              <label className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                {t('ระยะเวลาผ่อนชำระ (เดือน)', 'Financing Term (Months)')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[36, 48, 60, 72].map(months => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTermMonths(months)}
                    className={`py-2.5 rounded-xl text-xs tracking-wider transition-all border ${
                      termMonths === months
                        ? 'bg-white text-black border-white font-medium'
                        : 'bg-transparent text-neutral-400 border-white/[0.1] hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {months}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Estimated Output Summary */}
        <div className="lg:col-span-5 lg:border-l lg:border-white/[0.08] lg:pl-10 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.24em] uppercase text-neutral-500 block">
              {t('ค่างวดโดยประมาณต่อเดือน', 'Estimated Monthly Payment')}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                ฿{monthlyPayment.toLocaleString()}
              </span>
              <span className="text-xs text-neutral-500">
                {t('THB / เดือน', 'THB / mo')}
              </span>
            </div>
          </div>

          <div className="divide-y divide-white/[0.06] border-t border-white/[0.08] text-xs font-light">
            <div className="py-3 flex justify-between">
              <span className="text-neutral-500">{t(`เงินดาวน์ (${downPaymentPct}%)`, `Down Payment (${downPaymentPct}%)`)}</span>
              <span className="text-neutral-200">฿{downPaymentAmount.toLocaleString()}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-neutral-500">{t('ยอดจัดไฟแนนซ์', 'Financed Principal')}</span>
              <span className="text-neutral-200">฿{financedAmount.toLocaleString()}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-neutral-500">{t('อัตราดอกเบี้ยอ้างอิง', 'Indicative Rate')}</span>
              <span className="text-neutral-200">{annualRate}% p.a.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          YOU MAY ALSO CONSIDER (Related Vehicles)
          ===================================================================== */}
      {relatedProducts.length > 0 && (
        <section className="space-y-10 pt-10 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
                YOU MAY ALSO CONSIDER
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                {t('ยนตรกรรมใกล้เคียงที่แนะนำ', 'Similar Automobiles')}
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors"
            >
              {t('ดูทั้งหมด →', 'View All →')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(car => (
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
      )}

      {/* UNDERSTATED OFFICIAL SOURCES */}
      {product.sources.length > 0 && (
        <div className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 block">
              OFFICIAL REFERENCES
            </span>
            <p className="text-xs text-neutral-400 font-light">
              {t('แหล่งข้อมูลอ้างอิงอย่างเป็นทางการ', 'Verified manufacturer documentation')}
            </p>
          </div>
          <ul className="space-y-2 sm:text-right">
            {product.sources.map((src, idx) => (
              <li key={idx} className="text-xs text-neutral-400 font-light">
                {src.startsWith('http') ? (
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
                  >
                    <span className="truncate max-w-xs sm:max-w-md">{src}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                ) : (
                  <span>{src}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
