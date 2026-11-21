import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';

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

  const navLinks = [
    { name: 'หน้าแรก', path: '/' },
    { name: 'รายการรถยนต์ทั้งหมด', path: '/products' },
    { name: 'หมวดหมู่ & ส่งกำลัง', path: '/categories' },
    { name: 'เปรียบเทียบสเปก', path: '/compare' },
    { name: 'เกี่ยวกับเรา', path: '/about' },
    { name: 'คำถามที่พบบ่อย (FAQ)', path: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/40 transition-all">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Left: Porsche Style "≡ Menu" Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-white hover:text-rose-400 uppercase py-2 px-3 rounded-lg hover:bg-white/[0.08] transition-all"
              aria-label="Toggle Menu"
            >
              <Menu className="w-4 h-4 text-white" />
              <span>MENU</span>
            </button>
          </div>

          {/* Center: Iconic Wide Brand Wordmark (Porsche Aesthetic) */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group">
            <span className="text-lg sm:text-2xl font-black font-mono tracking-[0.35em] uppercase text-white group-hover:text-rose-400 transition-colors">
              APEX<span className="text-rose-500">DRIVE</span>
            </span>
          </Link>

          {/* Right: Flag, Telemetry, Cart, Co-Pilot */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Thailand Flag Icon (Matches Porsche TH Screenshot) */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] text-xs font-mono text-slate-300" title="Thailand Official Market">
              <span className="text-base leading-none">🇹🇭</span>
              <span className="text-[11px] font-bold text-slate-300">TH</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              title="ตะกร้ารถยนต์"
              className={`relative px-3 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                cartCount > 0
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'bg-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.1]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-rose-600 text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Menu Overlay (Porsche Style Drawer) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#0D1017] h-full p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 z-10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6">
                <span className="text-lg font-black font-mono tracking-[0.3em] uppercase text-white">
                  APEX<span className="text-rose-500">DRIVE</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 px-3 mb-2">
                  EXPLORE ARCHIVE
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono tracking-wider transition-all ${
                      isActive(link.path)
                        ? 'text-white bg-rose-600/25 text-rose-300 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <div className="flex items-center gap-2">
                      {link.path === '/compare' && compareCount > 0 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500 text-black">
                          {compareCount}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Drawer Footer */}
            <div className="pt-8 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>REGION // MARKET</span>
                <span className="text-white font-bold flex items-center gap-1.5">
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
