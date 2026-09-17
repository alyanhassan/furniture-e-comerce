import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-canvas border border-border rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Header Input */}
          <div className="p-4 border-b border-border flex items-center gap-3 bg-surface">
            <Search className="w-5 h-5 text-ink-soft shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search catalog by name, category, or furniture type..."
              className="w-full bg-transparent text-ink placeholder-ink-soft text-base focus:outline-hidden font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-ink-soft hover:text-ink p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-canvas hover:bg-border rounded text-ink transition-colors"
            >
              Esc
            </button>
          </div>

          {/* Search Results List */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            <div className="text-xs uppercase font-bold tracking-wider text-ink-soft px-2 mb-2">
              {query.trim()
                ? `Results (${filteredProducts.length})`
                : 'Popular Catalog Items'}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-sm text-ink-soft">
                No furniture found matching "{query}". Try searching "sofa", "bed", "wardrobe", or "dining".
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface border border-transparent hover:border-border cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-surface border border-border shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-ink group-hover:text-primary transition-colors truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-ink-soft">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-sm text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                        onClose();
                      }}
                      className="p-2 bg-primary-soft text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
