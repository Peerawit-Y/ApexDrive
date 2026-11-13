import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gauge, ShoppingBag, Scale, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  compareCount,
  onOpenCart,
  onOpenChat
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'หน้าแรก', path: '/' },
    { name: 'รายการรถยนต์', path: '/products' },
    { name: 'หมวดหมู่', path: '/categories' },
    { name: 'เปรียบเทียบ', path: '/compare' },
    { name: 'เกี่ยวกับเรา', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-brand-dark/80 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
            <Gauge className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              APEX<span className="text-rose-500">DRIVE</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-semibold text-rose-400/80 -mt-1">
              Sports Car Collective
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-white bg-slate-800/80 border border-slate-700/60 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Compare Badge */}
          <Link
            to="/compare"
            title="เปรียบเทียบรถยนต์"
            className="relative p-2.5 rounded-xl text-slate-300 hover:text-white bg-brand-card hover:bg-slate-800 border border-brand-border transition-colors"
          >
            <Scale className="w-5 h-5" />
            {compareCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {compareCount}
              </span>
            )}
          </Link>

          {/* Cart Simulation */}
          <button
            onClick={onOpenCart}
            title="ตะกร้ารถยนต์จำลอง"
            className="relative p-2.5 rounded-xl text-slate-300 hover:text-white bg-brand-card hover:bg-slate-800 border border-brand-border transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* AI Chatbot Trigger Button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-sm font-semibold shadow-lg shadow-rose-900/30 transition-all hover:shadow-rose-700/40"
          >
            <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
            <span className="hidden sm:inline">ถาม AI สเปกรถ</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white bg-brand-card border border-brand-border"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-card/95 border-b border-brand-border px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-white bg-rose-600/20 text-rose-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
