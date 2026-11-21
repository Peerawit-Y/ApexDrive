import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Product, CartItem } from './types/product';
import { getFeaturedProducts, products } from './services/productService';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { FloatingCompareBar } from './components/FloatingCompareBar';
import { Toast, ToastMessage } from './components/Toast';
import { ChatConcierge } from './components/ChatConcierge';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Categories } from './pages/Categories';
import { Compare } from './pages/Compare';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';

const CART_STORAGE_KEY = 'apexdrive-cart-v1';
const COMPARE_STORAGE_KEY = 'apexdrive-compare-v1';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

const loadStoredCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: Array<{ id: string; quantity: number }> = JSON.parse(raw);
    return parsed
      .map(entry => {
        const product = products.find(p => p.id === entry.id);
        return product ? { product, quantity: Math.max(1, entry.quantity || 1) } : null;
      })
      .filter((item): item is CartItem => item !== null);
  } catch {
    return [];
  }
};

const loadStoredCompare = (): string[] => {
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const parsed: string[] = JSON.parse(raw);
    return parsed.filter(id => products.some(p => p.id === id)).slice(0, 4);
  } catch {
    return [];
  }
};

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState<CartItem[]>(loadStoredCart);
  const [compareIds, setCompareIds] = useState<string[]>(loadStoredCompare);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Persist cartItems & compareIds to localStorage
  useEffect(() => {
    try {
      const compact = cartItems.map(item => ({ id: item.product.id, quantity: item.quantity }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareIds));
    } catch {
      // ignore storage errors
    }
  }, [compareIds]);

  // Auto-dismiss Toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((text: string) => {
    setToast({ id: Date.now(), text });
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Compare Handlers (Max 4 items with Luxury Toast instead of alert)
  const handleToggleCompare = (product: Product) => {
    if (compareIds.includes(product.id)) {
      setCompareIds(prev => prev.filter(id => id !== product.id));
      showToast(
        t(`นำ ${product.model} ออกจากการเปรียบเทียบแล้ว`, `Removed ${product.model} from comparison`)
      );
      return;
    }

    if (compareIds.length >= 4) {
      showToast(
        t('สามารถเปรียบเทียบรถยนต์ได้สูงสุดพร้อมกัน 4 คัน', 'You can compare up to 4 vehicles at once')
      );
      return;
    }

    setCompareIds(prev => [...prev, product.id]);
    showToast(
      t(`เพิ่ม ${product.model} ลงตารางเปรียบเทียบแล้ว`, `Added ${product.model} to comparison`)
    );
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareIds(prev => prev.filter(item => item !== id));
  };

  const handleClearCompare = () => {
    setCompareIds([]);
  };

  const comparedProducts = compareIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));
  const featured = getFeaturedProducts();

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#060709] text-neutral-100 relative overflow-x-hidden">
        
        {/* Navigation Bar */}
        <Navbar
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          compareCount={compareIds.length}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Luxury Toast Notification */}
        <Toast toast={toast} onDismiss={() => setToast(null)} />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  featuredProducts={featured}
                  compareIds={compareIds}
                  cartIds={cartItems.map(i => i.product.id)}
                  onToggleCompare={handleToggleCompare}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/products"
              element={
                <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
                  <Products
                    compareIds={compareIds}
                    cartIds={cartItems.map(i => i.product.id)}
                    onToggleCompare={handleToggleCompare}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              }
            />
            <Route
              path="/products/:id"
              element={
                <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
                  <ProductDetail
                    compareIds={compareIds}
                    cartIds={cartItems.map(i => i.product.id)}
                    onToggleCompare={handleToggleCompare}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              }
            />
            <Route
              path="/categories"
              element={
                <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
                  <Categories />
                </div>
              }
            />
            <Route
              path="/compare"
              element={
                <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
                  <Compare
                    compareProducts={comparedProducts}
                    onRemove={handleRemoveFromCompare}
                    onClear={handleClearCompare}
                  />
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
                  <About />
                </div>
              }
            />
            <Route
              path="/faq"
              element={
                <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
                  <FAQ />
                </div>
              }
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Quick Compare Bar */}
        <FloatingCompareBar
          products={comparedProducts}
          onRemove={handleRemoveFromCompare}
          onClear={handleClearCompare}
        />

        {/* Private AI Concierge Chatbot */}
        <ChatConcierge />

        {/* Cart & Private Viewing Reservation Modal */}
        <CartModal
          isOpen={isCartOpen}
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
        />

      </div>
    </Router>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
