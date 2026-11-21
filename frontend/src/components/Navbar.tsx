import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  cartCount: number;
  compareCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  compareCount,
  onOpenCart
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { name: t('หน้าแรก', 'Home'), subtitle: 'SHOWROOM', path: '/' },
    { name: t('คอลเลกชันยนตรกรรม', 'Models & Collection'), subtitle: 'MODELS', path: '/products' },
    { name: t('หมวดหมู่และระบบขับเคลื่อน', 'Categories & Drivetrain'), subtitle: 'DRIVETRAIN', path: '/categories' },
    { name: t('เปรียบเทียบสเปก', 'Compare Specifications'), subtitle: 'COMPARE', path: '/compare' },
    { name: t('เกี่ยวกับเรา', 'About ApexDrive'), subtitle: 'ABOUT', path: '/about' },
    { name: t('คำถามที่พบบ่อย', 'Frequently Asked Questions'), subtitle: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/50 border-b border-white/[0.06] transition-all">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          
          {/* Left: Porsche-Inspired Minimal "≡ Menu" */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 text-xs tracking-[0.22em] text-neutral-200 hover:text-white uppercase py-2 px-2 -ml-2 transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="w-4 h-4 stroke-[1.5]" />
              <span className="font-light">{t('เมนู', 'Menu')}</span>
            </button>
          </div>

          {/* Center: Iconic Wide-Tracked Monochrome Wordmark */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group">
            <span className="text-base sm:text-xl font-light tracking-[0.42em] uppercase text-white group-hover:opacity-80 transition-opacity">
              APEXDRIVE
            </span>
          </Link>

          {/* Right: Interactive TH / EN Switcher & Reservation Bag */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Luxury TH / EN Language Toggle */}
            <div
              className="inline-flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-[10px] tracking-[0.18em] uppercase"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => setLang('th')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'th'
                    ? 'bg-white text-black font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                TH
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'en'
                    ? 'bg-white text-black font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Minimal Cart Button */}
            <button
              onClick={onOpenCart}
              title={t('รายการจองรถยนต์', 'Vehicle Reservation')}
              className={`relative px-3.5 py-2 rounded-full text-xs flex items-center gap-2 transition-all border ${
                cartCount > 0
                  ? 'bg-white text-black border-white font-medium'
                  : 'bg-transparent text-neutral-300 border-white/15 hover:border-white/40 hover:text-white'
              }`}
              aria-label="Open vehicle reservation"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="text-[11px] leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Luxury Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#08090C] border-r border-white/[0.08] h-full p-8 sm:p-10 flex flex-col justify-between overflow-y-auto z-10">
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-white/[0.08]">
                <span className="text-sm font-light tracking-[0.4em] uppercase text-white">
                  APEXDRIVE
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-white/[0.12] text-neutral-400 hover:text-white hover:border-white/40 flex items-center justify-center transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              <nav className="mt-8 divide-y divide-white/[0.06]">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className="py-5 flex items-center justify-between group transition-colors"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 block">
                          {link.subtitle}
                        </span>
                        <span
                          className={`text-lg font-light tracking-tight transition-colors ${
                            active
                              ? 'text-white'
                              : 'text-neutral-400 group-hover:text-white'
                          }`}
                        >
                          {link.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {link.path === '/compare' && compareCount > 0 && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white text-black">
                            {compareCount}
                          </span>
                        )}
                        <ArrowRight
                          className={`w-4 h-4 transition-all ${
                            active
                              ? 'text-white translate-x-0.5'
                              : 'text-neutral-600 group-hover:text-white group-hover:translate-x-1'
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Drawer Footer with Language Selector */}
            <div className="pt-8 border-t border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-neutral-500">
                <span>{t('ภาษา / LANGUAGE', 'LANGUAGE')}</span>
                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLang('th')}
                    className={`transition-colors ${lang === 'th' ? 'text-white font-medium' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    ไทย (TH)
                  </button>
                  <span className="text-neutral-700">/</span>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`transition-colors ${lang === 'en' ? 'text-white font-medium' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    English (EN)
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-neutral-500">
                <span>MARKET</span>
                <span className="text-neutral-300 font-light flex items-center gap-2">
                  <span>🇹🇭</span> Thailand Official
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
