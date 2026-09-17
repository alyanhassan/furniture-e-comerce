import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

// Component to scroll window to top upon route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-canvas text-ink font-sans selection:bg-primary-soft selection:text-primary">
          <TopBar />
          <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>

          <Footer />

          {/* Global Cart Drawer (slides in from right on any add to cart or cart button click) */}
          <CartDrawer />

          {/* Quick Search Modal */}
          <QuickSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
