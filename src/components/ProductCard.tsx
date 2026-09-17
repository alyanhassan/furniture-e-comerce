import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  const isSale = product.badge === 'Sale';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.175, 0.885, 0.32, 1.275], // back.out(1.4)
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      id={`product-card-${product.id}`}
      className="product-card bg-surface border border-border rounded-xl overflow-hidden flex flex-col justify-between group cursor-pointer transition-shadow"
    >
      <Link to={`/product/${product.id}`} className="block flex-1">
        {/* Product Image Container */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-canvas">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge === 'Sale' && (
              <span
                id={`badge-sale-${product.id}`}
                className="bg-accent text-white font-bold text-xs uppercase px-2.5 py-1 rounded shadow-sm tracking-wider"
              >
                Sale
              </span>
            )}
            {product.badge === 'New' && (
              <span
                id={`badge-new-${product.id}`}
                className="bg-primary text-white font-bold text-xs uppercase px-2.5 py-1 rounded shadow-sm tracking-wider"
              >
                New
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="bg-canvas/90 backdrop-blur-xs text-ink-soft text-[11px] font-semibold uppercase px-2 py-0.5 rounded border border-border">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Meta Details */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <h3
            id={`product-title-${product.id}`}
            className="font-bold text-ink text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-11"
          >
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-ink-soft line-clamp-2">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="mt-4 pt-3 border-t border-border flex items-baseline gap-2">
            {isSale && product.originalPrice ? (
              <>
                <span
                  id={`product-price-${product.id}`}
                  className="font-bold text-accent text-xl"
                >
                  {formatPrice(product.price)}
                </span>
                <span className="text-ink-soft line-through text-sm font-medium">
                  {formatPrice(product.originalPrice)}
                </span>
              </>
            ) : (
              <span
                id={`product-price-${product.id}`}
                className="font-bold text-primary text-xl"
              >
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Card Action Button */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
        <motion.button
          type="button"
          id={`add-to-cart-btn-${product.id}`}
          onClick={handleAddToCart}
          animate={isAdding ? { scale: [1, 0.95, 1] } : { scale: 1 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover active:bg-primary-hover text-white font-bold text-sm uppercase tracking-wide rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
          aria-label={`Add ${product.name} to cart`}
        >
          {isAdding ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Add to Cart</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
