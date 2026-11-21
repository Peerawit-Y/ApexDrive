import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { products } from '../services/productService';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProduct } from '../data/productsEn';
import { 
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  ArrowUpRight
} from 'lucide-react';

interface HomeProps {
  featuredProducts: Product[];
  compareIds: string[];
  cartIds: string[];
  onToggleCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({
  featuredProducts,
  compareIds,
  cartIds,
  onToggleCompare,
  onAddToCart
}) => {
  const { lang, t } = useLanguage();
  // Hero Carousel Slides using high-resolution images from Photo folder
  const heroSlides = [
    {
      id: 'apex-x-hyper',
      title: 'APEX X Hyper.',
      subtitle: 'The 980 HP Hand-Built Twin-Turbo V12 Flagship',
      image: './Photo/apex-x-hyper.png',
      targetUrl: '/products/apex-x-hyper',
      specs: { hp: '980 HP', acc: '0-100: 2.5s', type: 'Twin-Turbo V12 AWD' }
    },
    {
      id: 'apex-10-evo',
      title: 'APEX 10 Evo.',
      subtitle: 'Pure 8,700 RPM Mid-Engine Naturally Aspirated V10',
      image: './Photo/apex-10-evo.jpg',
      targetUrl: '/products/apex-10-evo',
      specs: { hp: '670 HP', acc: '0-100: 2.9s', type: '5.2L V10 NA RWD' }
    },
    {
      id: 'apex-gt3-track',
      title: 'APEX GT3 Track.',
      subtitle: '9,000 RPM Flat-6 Street-Legal Circuit Weapon',
      image: './Photo/apex-gt3-track.jpg',
      targetUrl: '/products/apex-gt3-track',
      specs: { hp: '540 HP', acc: '0-100: 3.1s', type: '4.0L Flat-6 DRS' }
    },
    {
      id: 'apex-35-gt',
      title: 'APEX 35 GT.',
      subtitle: 'Hand-Built Twin-Turbo V6 with Torque Vectoring AWD',
      image: './Photo/apex-35-gt.png',
      targetUrl: '/products/apex-35-gt',
      specs: { hp: '620 HP', acc: '0-100: 2.8s', type: '3.8L V6 Twin-Turbo' }
    },
    {
      id: 'apex-4-coupe',
      title: 'APEX 4 Coupe.',
      subtitle: 'Lightweight 2-Seat Carbon-Fiber Motorsport Coupe',
      image: './Photo/apex-4-coupe.jpg',
      targetUrl: '/products/apex-4-coupe',
      specs: { hp: '560 HP', acc: '0-100: 3.5s', type: 'Inline-6 RWD' }
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play interval (cycles every 6 seconds if playing)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, heroSlides.length]);

  const currentSlide = heroSlides[activeSlide];

  // Full-width Showcase Gallery Slideshow State
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryPlaying, setIsGalleryPlaying] = useState(true);

  useEffect(() => {
    if (!isGalleryPlaying || products.length === 0) return;
    const timer = setInterval(() => {
      setGalleryIndex(prev => (prev + 1) % products.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isGalleryPlaying, products.length]);


  const handlePrevGallery = () => {
    setGalleryIndex(prev => (prev - 1 + products.length) % products.length);
  };

  const handleNextGallery = () => {
    setGalleryIndex(prev => (prev + 1) % products.length);
  };

  return (
    <div className="w-full">
      
      {/* =========================================================================
          PORSCHE-STYLE HERO SECTION (Full-Screen 100vh, Cinematic & Expanded)
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[750px] lg:min-h-[900px] -mt-20 pt-20 overflow-hidden bg-black select-none flex flex-col justify-between">
        
        {/* Background Image Carousel */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center sm:object-[center_35%]"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Cinematic Vignette Overlays matching the Porsche aesthetic */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none z-20" />

        {/* Content Overlay */}
        <div className="relative z-30 w-full h-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 flex flex-col justify-between pt-10 pb-16 sm:pb-20 lg:pb-24">
          
          {/* Top subtle category tag */}
          <div className="pt-4">
            <span className="text-xs font-mono tracking-[0.35em] uppercase text-slate-300 drop-shadow-md">
              EXCLUSIVE SHOWCASE // {activeSlide + 1} OF {heroSlides.length}
            </span>
          </div>

          {/* Bottom Row: Headline & Discover Button (Left) + Player Controls (Right) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            
            {/* Left: Expanded Porsche-style Title & Large Discover Button */}
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light tracking-tight text-white drop-shadow-2xl font-sans leading-none">
                {currentSlide.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* Minimalist Frosted Glass Discover Button (Expanded Size) */}
                <Link
                  to={currentSlide.targetUrl}
                  className="inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl bg-white/20 hover:bg-white/35 backdrop-blur-md text-white text-sm sm:text-base font-medium border border-white/30 transition-all shadow-2xl hover:scale-105 active:scale-95"
                >
                  Discover more
                </Link>
              </div>
            </div>

            {/* Right: Slide Selector Indicators & Pause/Play Button (Expanded) */}
            <div className="flex items-center gap-5 self-end sm:self-auto">
              
              {/* Slide dots / progress indicators */}
              <div className="flex items-center gap-2.5">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all rounded-full ${
                      activeSlide === idx
                        ? 'w-10 sm:w-14 h-2 bg-white shadow-lg'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              {/* Pause / Play Frosted Circular Button (Expanded Size) */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-90"
                title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
                aria-label={isPlaying ? 'Pause Carousel' : 'Play Carousel'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
                )}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BELOW HERO CONTENT (Expanded Widescreen Layout for Showroom & Features)
          ========================================================================= */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-20 space-y-28">
        
        {/* Curated Collection Showcase */}
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="space-y-1.5">
              <div className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
                FEATURED COLLECTION
              </div>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                {t('ยนตรกรรมระดับพรีเมียม', 'Featured Automobiles')}
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs tracking-[0.2em] uppercase text-neutral-400 hover:text-white flex items-center gap-2 group transition-colors"
            >
              <span>{t(`ดูรถทั้งหมด (${products.length})`, `View All Models (${products.length})`)}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4-Column Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((car) => (
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

      </div>

      {/* =========================================================================
          FULL-WIDTH EDGE-TO-EDGE LUXURY PANORAMA SHOWCASE
          ========================================================================= */}
      <section className="w-full relative bg-[#060709] border-t border-white/[0.08] overflow-hidden py-16 sm:py-24">
        
        {/* Section Header */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-[11px] tracking-[0.3em] uppercase text-neutral-500">
              PANORAMA GALLERY
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              {t('คลังภาพและยนตรกรรมระดับซูเปอร์คาร์', 'The Supercar Gallery')}
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
              {t(
                'สัมผัสความประณีต เส้นสาย และสมรรถนะระดับโลกของรถยนต์ในโชว์รูม ApexDrive ในมุมมองแบบพาโนรามาเต็มขอบจอ',
                'Experience the sculpted lines, craftsmanship, and world-class performance of the ApexDrive collection in widescreen panorama.'
              )}
            </p>
          </div>

          {/* Minimalist Monochrome Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto text-xs">
            <span className="text-neutral-400 font-light tracking-[0.2em] pr-2">
              {String(galleryIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>

            <button
              onClick={() => setIsGalleryPlaying(!isGalleryPlaying)}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 text-neutral-300 hover:text-white flex items-center justify-center transition-all"
              title={isGalleryPlaying ? 'หยุดการเล่นชั่วคราว' : 'เล่นสไลด์อัตโนมัติ'}
              aria-label="Toggle Auto Play"
            >
              {isGalleryPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <button
              onClick={handlePrevGallery}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 text-neutral-300 hover:text-white flex items-center justify-center transition-all"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextGallery}
              className="w-10 h-10 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-all"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full-Bleed Slideshow Stage (Edge-to-Edge) */}
        <div className="relative w-full h-[520px] sm:h-[640px] lg:h-[760px] bg-black overflow-hidden select-none">
          {products.map((rawCar, idx) => {
            const car = getLocalizedProduct(rawCar, lang);
            return (
            <div
              key={car.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                galleryIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Full-width Image */}
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover object-center transition-transform duration-7000 ease-out"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Subtle Editorial Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent hidden sm:block" />

              {/* Editorial Luxury Car Info Overlay */}
              <div className="absolute bottom-8 sm:bottom-14 left-6 sm:left-12 lg:left-20 right-6 max-w-xl z-20 space-y-6">
                
                {/* Subtle Eyebrow & Model Title */}
                <div className="space-y-2">
                  <div className="text-[11px] tracking-[0.28em] uppercase text-neutral-300">
                    {car.brand} &nbsp;·&nbsp; {car.drivetrain} &nbsp;·&nbsp; {car.category}
                  </div>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none">
                    {car.model}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light pt-1 line-clamp-2 leading-relaxed">
                    {car.description}
                  </p>
                </div>

                {/* Crisp Hairline Telemetry Strip */}
                <div className="grid grid-cols-3 divide-x divide-white/20 border-y border-white/15 py-4 max-w-md">
                  <div className="pr-4">
                    <div className="text-xl sm:text-2xl font-light text-white">
                      {car.horsepower} <span className="text-[11px] text-neutral-400">HP</span>
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-0.5">
                      {t('พละกำลัง', 'Power')}
                    </div>
                  </div>

                  <div className="px-4">
                    <div className="text-xl sm:text-2xl font-light text-white">
                      {car.acceleration_0_100_sec} <span className="text-[11px] text-neutral-400">s</span>
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-0.5">
                      {t('0–100 กม./ชม.', '0–100 km/h')}
                    </div>
                  </div>

                  <div className="pl-4">
                    <div className="text-xl sm:text-2xl font-light text-white">
                      {car.top_speed_kmh} <span className="text-[11px] text-neutral-400">km/h</span>
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-0.5">
                      {t('ความเร็วสูงสุด', 'Top Speed')}
                    </div>
                  </div>
                </div>

                {/* Understated Price & Pure White CTA */}
                <div className="flex flex-wrap items-center gap-6 pt-1">
                  <Link
                    to={`/products/${car.id}`}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-[0.15em] uppercase transition-all"
                  >
                    <span>{t('สำรวจรุ่นนี้', 'Discover Model')}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block">
                      {t('เริ่มต้น', 'Starting From')}
                    </span>
                    <span className="text-xl font-light text-white tracking-tight">
                      ฿{car.price.toLocaleString()} <span className="text-xs text-neutral-400">{car.currency}</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
            );
          })}

          {/* Left / Right Minimal Floating Navigation Arrows */}
          <button
            onClick={handlePrevGallery}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/15 flex items-center justify-center transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNextGallery}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/15 flex items-center justify-center transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Minimalist Thumbnail Selector Strip */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mt-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {products.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => setGalleryIndex(idx)}
                className={`relative shrink-0 w-28 sm:w-36 h-16 sm:h-20 rounded-xl overflow-hidden transition-all border ${
                  galleryIndex === idx
                    ? 'border-white opacity-100'
                    : 'border-white/10 opacity-45 hover:opacity-90 hover:border-white/30'
                }`}
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] font-light tracking-wide text-white truncate w-full text-left">
                    {car.model}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};
