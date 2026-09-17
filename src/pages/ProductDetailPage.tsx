import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Minus, ShoppingBag, Check, Shield, Truck, RotateCcw, ArrowLeft } from 'lucide-react';
import { getProductById, getRelatedProducts, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { ValueStrip } from '../components/ValueStrip';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const relatedProducts = id ? getRelatedProducts(id, 4) : [];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-black text-3xl uppercase text-ink mb-4">Product Not Found</h2>
        <p className="text-sm text-ink-soft mb-8">
          The requested furniture item is not present in our catalog.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold text-sm uppercase tracking-wide rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store Catalog
        </Link>
      </div>
    );
  }

  const isSale = product.badge === 'Sale';

  const handleAddToCart = () => {
    setIsAddedFeedback(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      {/* Breadcrumb Bar */}
      <div className="border-b border-border bg-surface/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Catalog</Link>
          <span>/</span>
          <Link to={`/category/${product.categorySlug}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ink truncate max-w-xs sm:max-w-md">{product.name}</span>
        </div>
      </div>

      {/* Main Product Details Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Large Product Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-surface border border-border shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.badge === 'Sale' && (
                  <span className="bg-accent text-white font-bold text-xs uppercase px-3 py-1.5 rounded shadow-sm tracking-wider">
                    Sale Offer
                  </span>
                )}
                {product.badge === 'New' && (
                  <span className="bg-primary text-white font-bold text-xs uppercase px-3 py-1.5 rounded shadow-sm tracking-wider">
                    New Arrival
                  </span>
                )}
              </div>

              {/* In-Stock Indicator */}
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary-soft/95 backdrop-blur-xs text-primary font-bold text-xs uppercase px-3 py-1.5 rounded-md border border-primary/20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  In Stock · Ready for Immediate Karachi Dispatch
                </span>
              </div>
            </div>

            {/* Quick Spec Tags */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-surface border border-border rounded-xl">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                  Category
                </span>
                <span className="block text-xs sm:text-sm font-bold text-ink mt-0.5">
                  {product.category}
                </span>
              </div>
              <div className="p-3 bg-surface border border-border rounded-xl">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                  Warranty
                </span>
                <span className="block text-xs sm:text-sm font-bold text-ink mt-0.5">
                  {product.warranty.split(' ')[0]} Coverage
                </span>
              </div>
              <div className="p-3 bg-surface border border-border rounded-xl">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                  Karachi Delivery
                </span>
                <span className="block text-xs sm:text-sm font-bold text-primary mt-0.5">
                  Free Assembly
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-soft mb-1">
              Direct Karachi Catalog Store
            </span>

            <h1
              id="product-detail-name"
              className="font-black text-2xl sm:text-3xl lg:text-4xl text-ink uppercase tracking-tight leading-tight"
            >
              {product.name}
            </h1>

            {/* Pricing block */}
            <div className="mt-4 pb-5 border-b border-border flex items-baseline gap-3">
              {isSale && product.originalPrice ? (
                <>
                  <span
                    id="product-detail-price"
                    className="font-bold text-accent text-3xl tracking-tight"
                  >
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-ink-soft line-through text-lg font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold uppercase px-2 py-0.5 bg-accent/10 text-accent rounded">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              ) : (
                <span
                  id="product-detail-price"
                  className="font-bold text-primary text-3xl tracking-tight"
                >
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Realistic Copy & Description */}
            <div className="mt-5 space-y-3 text-ink-soft text-sm sm:text-base leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Structured Specifications */}
            <div className="mt-6 bg-surface border border-border rounded-xl p-4 sm:p-5 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="font-bold text-ink uppercase text-xs tracking-wider">Dimensions</span>
                <span className="text-ink-soft text-right font-medium">{product.dimensions}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="font-bold text-ink uppercase text-xs tracking-wider">Primary Materials</span>
                <span className="text-ink-soft text-right font-medium">{product.materials}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="font-bold text-ink uppercase text-xs tracking-wider">Finish / Coating</span>
                <span className="text-ink-soft text-right font-medium">{product.finish}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-bold text-ink uppercase text-xs tracking-wider">Guarantee</span>
                <span className="text-primary font-bold text-right">{product.warranty}</span>
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                    Quantity
                  </span>
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-border rounded-lg bg-surface h-12">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 h-full hover:bg-canvas text-ink transition-colors flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-base text-ink">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 h-full hover:bg-canvas text-ink transition-colors flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Primary Add to Cart Button with micro-feedback */}
                <div className="flex-1 flex flex-col justify-end">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-transparent mb-1 select-none">
                    Action
                  </span>
                  <motion.button
                    type="button"
                    id="product-detail-add-to-cart-btn"
                    onClick={handleAddToCart}
                    animate={isAddedFeedback ? { scale: [1, 0.95, 1] } : { scale: 1 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="w-full h-12 px-6 bg-primary hover:bg-primary-hover active:bg-primary-hover text-white font-bold text-sm uppercase tracking-wide rounded-lg flex items-center justify-center gap-2.5 transition-colors shadow-md shadow-primary/20"
                  >
                    {isAddedFeedback ? (
                      <>
                        <Check className="w-5 h-5 text-white" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 text-white" />
                        <span>Add to Cart ({formatPrice(product.price * quantity)})</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Service Trust Badges */}
              <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-soft">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary shrink-0" />
                  <span>Free doorstep assembly in Karachi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary shrink-0" />
                  <span>Inspect on delivery before payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Same Department
                </span>
                <h2 className="font-black text-2xl uppercase tracking-tight text-ink">
                  YOU MIGHT ALSO LIKE
                </h2>
              </div>
              <Link
                to={`/category/${product.categorySlug}`}
                className="text-xs font-bold uppercase tracking-wider text-ink hover:text-primary transition-colors"
              >
                View Full Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky "Add to Cart" Bar on Mobile */}
      <div
        id="mobile-sticky-cta-bar"
        className="lg:hidden sticky bottom-0 z-30 bg-canvas/95 backdrop-blur-md border-t border-border p-3 px-4 flex items-center justify-between gap-3 shadow-lg"
      >
        <div className="min-w-0">
          <p className="text-xs font-bold text-ink truncate">{product.name}</p>
          <p className="text-sm font-bold text-primary">{formatPrice(product.price * quantity)}</p>
        </div>
        <motion.button
          type="button"
          onClick={handleAddToCart}
          animate={isAddedFeedback ? { scale: [1, 0.95, 1] } : { scale: 1 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wide rounded-lg flex items-center gap-2 shrink-0 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </motion.button>
      </div>

      <ValueStrip />
    </div>
  );
};
