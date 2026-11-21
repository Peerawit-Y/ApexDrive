import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { products } from '../services/productService';
import { 
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Zap,
  Timer,
  Gauge,
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
  // Hero Carousel Slides using high-resolution images from Photo folder
  const heroSlides = [
    {
      id: 'bugatti-chiron',
      title: 'Chiron.',
      subtitle: 'The 1,500 HP Quad-Turbo W16 Masterpiece',
      image: './Photo/bugatti-chiron.jpg',
      targetUrl: '/products/bugatti-chiron',
      specs: { hp: '1,500 HP', acc: '0-100: 2.4s', type: 'Quad-Turbo W16' }
    },
    {
      id: 'lamborghini-revuelto',
      title: 'Revuelto.',
      subtitle: 'The V12 Naturally Aspirated Hybrid HPEV',
      image: './Photo/lamborghini-revuelto.jpeg',
      targetUrl: '/products/lamborghini-revuelto',
      specs: { hp: '1,015 HP', acc: '0-100: 2.5s', type: 'V12 PHEV e-4WD' }
    },
    {
      id: 'mercedes-amg-gt',
      title: 'AMG GT 63 S.',
      subtitle: 'Formula 1 Hybrid E PERFORMANCE Architecture',
      image: './Photo/mercedes-amg-gt-63-s.png',
      targetUrl: '/products/mercedes-amg-gt-63-s-e',
      specs: { hp: '843 HP', acc: '0-100: 2.9s', type: 'V8 Biturbo Hybrid' }
    },
    {
      id: 'bmw-m8',
      title: 'M8 Competition.',
      subtitle: 'Pure M TwinPower Turbo Grand Tourer',
      image: './Photo/bmw-m8-competition-coupe.jpg',
      targetUrl: '/products/bmw-m8-competition',
      specs: { hp: '625 HP', acc: '0-100: 3.2s', type: 'M xDrive / 2WD' }
    },
    {
      id: 'apex-35-gt',
      title: 'Apex 35 GT.',
      subtitle: 'Twin-Turbocharged Precision Track Weapon',
      image: './Photo/apex-35-gt.png',
      targetUrl: '/products/apex-35-gt',
      specs: { hp: '600 HP', acc: '0-100: 2.7s', type: 'VR38 Twin-Turbo' }
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
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
            <div>
              <div className="text-xs font-mono tracking-[0.25em] uppercase text-slate-400">
                MODELS // SHOWROOM
              </div>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mt-1">
                ยนตรกรรมระดับพรีเมียม
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-mono tracking-wider uppercase text-slate-300 hover:text-white flex items-center gap-2 group transition-colors"
            >
              <span>ดูรถทั้งหมด ({featuredProducts.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4-Column Product Cards (Expanded Gap & Size) */}
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
          FULL-WIDTH EDGE-TO-EDGE CAR SLIDESHOW SHOWCASE (ภาพรถสไลด์โชว์แบบเต็มขอบ)
          ========================================================================= */}
      <section className="w-full relative bg-[#07090E] border-t border-b border-white/[0.08] overflow-hidden py-12 sm:py-16">
        
        {/* Section Header */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-rose-500">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>FULL-WIDTH VEHICLE SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
              คลังภาพและยนตรกรรมระดับซูเปอร์คาร์
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
              สัมผัสความประณีต เส้นสาย และสมรรถนะระดับโลกของรถยนต์ในโชว์รูม ApexDrive ในมุมมองแบบพาโนรามาเต็มขอบจอ
            </p>
          </div>

          {/* Controls: Prev, Next, Play/Pause, Slide Counter */}
          <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
            <span className="text-slate-400 font-bold px-3 py-1.5 rounded-lg bg-white/[0.05]">
              {String(galleryIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>

            <button
              onClick={() => setIsGalleryPlaying(!isGalleryPlaying)}
              className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors"
              title={isGalleryPlaying ? 'หยุดการเล่นชั่วคราว' : 'เล่นสไลด์อัตโนมัติ'}
              aria-label="Toggle Auto Play"
            >
              {isGalleryPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={handlePrevGallery}
              className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] text-white transition-all hover:scale-105 active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextGallery}
              className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-lg shadow-rose-950/40 hover:scale-105 active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Full-Bleed Slideshow Stage (Edge-to-Edge) */}
        <div className="relative w-full h-[500px] sm:h-[620px] lg:h-[720px] bg-black overflow-hidden select-none">
          {products.map((car, idx) => (
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
                className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-7000 ease-out"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Cinematic Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60 hidden sm:block" />

              {/* Car Info Floating Glass Card */}
              <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 lg:left-20 max-w-xl z-20 space-y-4">
                
                {/* Category & Drivetrain Badge */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-rose-600 text-white">
                    {car.brand}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {car.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300">
                    {car.drivetrain}
                  </span>
                </div>

                {/* Car Title */}
                <div>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none drop-shadow-lg">
                    {car.model}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed drop-shadow font-normal">
                    {car.description}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 font-mono">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                    <div className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold">
                      <Zap className="w-3 h-3" />
                      <span>POWER</span>
                    </div>
                    <div className="text-base sm:text-xl font-bold text-white mt-0.5">
                      {car.horsepower} <span className="text-[10px] text-slate-400 font-normal">HP</span>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                    <div className="flex items-center gap-1 text-[10px] text-rose-400 font-semibold">
                      <Timer className="w-3 h-3" />
                      <span>0-100 KM/H</span>
                    </div>
                    <div className="text-base sm:text-xl font-bold text-white mt-0.5">
                      {car.acceleration_0_100_sec} <span className="text-[10px] text-slate-400 font-normal">s</span>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                    <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-semibold">
                      <Gauge className="w-3 h-3" />
                      <span>TOP SPEED</span>
                    </div>
                    <div className="text-base sm:text-xl font-bold text-white mt-0.5">
                      {car.top_speed_kmh} <span className="text-[10px] text-slate-400 font-normal">km/h</span>
                    </div>
                  </div>
                </div>

                {/* Price and CTA Button */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={`/products/${car.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xl shadow-rose-950/60 hover:scale-105 active:scale-95"
                  >
                    <span>ดูรายละเอียดสเปก</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <div className="font-mono text-xs">
                    <span className="text-[10px] text-slate-400 block uppercase">Official MSRP</span>
                    <span className="text-lg font-black text-white">
                      ฿{car.price.toLocaleString()} {car.currency}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Left / Right Big Navigation Arrows (Hover Floating on Edges) */}
          <button
            onClick={handlePrevGallery}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/75 text-white/70 hover:text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={handleNextGallery}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/75 text-white/70 hover:text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* Thumbnail Selector Strip (Full Width Scrollable) */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mt-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {products.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => setGalleryIndex(idx)}
                className={`relative shrink-0 w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden transition-all border-2 ${
                  galleryIndex === idx
                    ? 'border-rose-500 scale-105 shadow-lg shadow-rose-950/50'
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                  <span className="text-[9px] font-mono font-bold text-white truncate w-full text-left">
                    {car.brand} {car.model}
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
