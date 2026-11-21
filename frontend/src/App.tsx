import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Product, CartItem } from './types/product';
import { getFeaturedProducts, products } from './services/productService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Categories } from './pages/Categories';
import { Compare } from './pages/Compare';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';

export const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Compare Handlers (Max 4 items)
  const handleToggleCompare = (product: Product) => {
    setCompareIds(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      }
      if (prev.length >= 4) {
        alert('สามารถเปรียบเทียบรถยนต์ได้สูงสุดพร้อมกัน 4 คันครับ');
        return prev;
      }
      return [...prev, product.id];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareIds(prev => prev.filter(item => item !== id));
  };

  const handleClearCompare = () => {
    setCompareIds([]);
  };

  const comparedProducts = products.filter(p => compareIds.includes(p.id));
  const featured = getFeaturedProducts();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-dark text-slate-100 relative overflow-x-hidden">
        
        {/* Navigation Bar */}
        <Navbar
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          compareCount={compareIds.length}
          onOpenCart={() => setIsCartOpen(true)}
        />

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

        {/* Cart Modal */}
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

export default App;
