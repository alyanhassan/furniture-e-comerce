import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { CATEGORIES, PRODUCTS, HERO_IMAGE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ValueStrip } from '../components/ValueStrip';

export const HomePage: React.FC = () => {
  const scrollToCategories = () => {
    const el = document.getElementById('categories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      {/* Hero Banner */}
      <section
        id="hero-banner"
        className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-stone-900 overflow-hidden"
      >
        {/* Background Image with 30% --ink overlay */}
        <img
          src={HERO_IMAGE}
          alt="Modern furniture interior showcase"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
        />

        {/* 30% --ink gradient overlay for text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/20"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-black text-4xl sm:text-5xl lg:text-6xl text-canvas uppercase tracking-tight leading-[1.08]"
          >
            FURNITURE THAT FITS YOUR HOME
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
            className="mt-4 text-base sm:text-lg text-stone-200 font-normal max-w-2xl mx-auto"
          >
            Architectural bedroom suites, modular wardrobes, solid Sheesham dining sets, and boucle living lounges — delivered direct across Karachi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              id="hero-shop-now-btn"
              onClick={scrollToCategories}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover active:bg-primary-hover text-white font-bold text-sm uppercase tracking-wide rounded-lg flex items-center justify-center gap-2.5 transition-colors shadow-lg shadow-primary/20"
            >
              <span>SHOP NOW</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section id="categories-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-border">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
              Browse by Department
            </span>
            <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-ink">
              SHOP BY CATEGORY
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-ink-soft">
            Explore curated collections designed for urban residences
          </p>
        </div>

        {/* 4 Category Tiles with Standard Hover Tween */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{
                y: -4,
                scale: 1.02,
                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className="group relative rounded-xl overflow-hidden bg-surface border border-border"
            >
              <Link
                to={`/category/${category.slug}`}
                id={`category-tile-${category.slug}`}
                className="block"
              >
                <div className="aspect-4/3 overflow-hidden bg-surface">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="p-4 sm:p-5 bg-surface flex items-center justify-between border-t border-border">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider text-ink group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-xs text-ink-soft">
                      {category.itemCount} Designs Available
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-canvas border border-border flex items-center justify-center text-ink group-hover:text-primary group-hover:border-primary transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section id="featured-catalog-section" className="py-16 sm:py-20 bg-surface/50 border-t border-border w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-border">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                Direct Transparent Pricing
              </span>
              <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-ink">
                FEATURED CATALOG
              </h2>
            </div>
            <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-ink-soft">
              All 8 core designs available for immediate Karachi delivery
            </p>
          </div>

          {/* 4-column desktop / 2-column tablet / 1-column mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Strip */}
      <ValueStrip />
    </div>
  );
};
