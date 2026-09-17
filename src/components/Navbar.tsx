import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { totalItems, toggleCart, lastAddedProductId } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-sm border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            id="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-ink hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Logo (Outfit 900, uppercase) */}
        <div className="flex items-center">
          <Link
            to="/"
            id="brand-logo"
            className="group flex flex-col items-start leading-none"
          >
            <span className="font-black text-2xl sm:text-3xl tracking-tight text-ink group-hover:text-primary transition-colors uppercase">
              THE CATALOG STORE
            </span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-ink-soft">
              Direct Furniture Co.
            </span>
          </Link>
        </div>

        {/* Center Links (Outfit 700, uppercase, tracking-wide, text-sm) */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          {CATEGORIES.map((cat) => {
            const isActive = location.pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                id={`nav-link-${cat.slug}`}
                className={`font-bold text-sm tracking-wide uppercase transition-colors relative py-1 ${
                  isActive
                    ? 'text-primary'
                    : 'text-ink hover:text-primary'
                }`}
              >
                {cat.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search + Cart Icon */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <button
            type="button"
            id="search-trigger-btn"
            onClick={onOpenSearch}
            className="p-2 text-ink hover:text-primary rounded-lg hover:bg-surface transition-colors"
            title="Search furniture catalog"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            id="cart-trigger-btn"
            onClick={toggleCart}
            className="relative p-2 text-ink hover:text-primary rounded-lg hover:bg-surface transition-colors group"
            title="Open cart drawer"
            aria-label="Open cart drawer"
          >
            {/* Cart Icon with micro bounce when product added */}
            <motion.div
              animate={
                lastAddedProductId
                  ? { y: [0, -3, 0], transition: { duration: 0.2, ease: 'easeOut' } }
                  : { y: 0 }
              }
            >
              <ShoppingBag className="w-5 h-5 text-ink group-hover:text-primary transition-colors" />
            </motion.div>

            {/* Accent count bubble */}
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="cart-bubble"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  id="cart-badge-count"
                  className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-accent text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-border bg-canvas overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-bold text-sm uppercase tracking-wide text-ink hover:bg-surface hover:text-primary"
              >
                All Products (Catalog)
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md font-bold text-sm uppercase tracking-wide text-ink hover:bg-surface hover:text-primary"
                >
                  {cat.name} ({cat.itemCount} items)
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border px-3">
                <p className="text-xs text-ink-soft">
                  Karachi Delivery Line: <span className="font-bold text-ink">+92 300 8294711</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
