import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import { CATEGORIES, getProductsByCategory } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ValueStrip } from '../components/ValueStrip';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const currentCategory = CATEGORIES.find((c) => c.slug === slug);
  const rawProducts = slug ? getProductsByCategory(slug) : [];

  const sortedProducts = useMemo(() => {
    const list = [...rawProducts];
    if (sortOption === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [rawProducts, sortOption]);

  if (!currentCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-black text-3xl uppercase text-ink mb-4">Category Not Found</h2>
        <p className="text-sm text-ink-soft mb-8">
          The requested furniture category does not exist in our catalog.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold text-sm uppercase tracking-wide rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      {/* Category Header Banner */}
      <section className="relative w-full h-64 sm:h-80 bg-stone-900 overflow-hidden">
        <img
          src={currentCategory.image}
          alt={currentCategory.name}
          className="w-full h-full object-cover object-center"
        />
        {/* 30% overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-12 z-10">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Categories</span>
            <span>/</span>
            <span className="text-primary-soft">{currentCategory.name}</span>
          </nav>

          <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
            {currentCategory.name}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-stone-200 max-w-2xl">
            {currentCategory.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Filter/Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border bg-surface/40 p-4 rounded-xl">
          <div className="text-xs sm:text-sm text-ink-soft">
            Showing <strong className="text-ink font-bold">{sortedProducts.length}</strong> items in{' '}
            <strong className="text-ink font-bold">{currentCategory.name}</strong>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-ink-soft">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort By:</span>
            </div>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="px-3 py-1.5 text-xs sm:text-sm font-semibold bg-canvas border border-border rounded-lg text-ink focus:outline-hidden focus:border-primary cursor-pointer"
            >
              <option value="default">Featured Selection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-16 text-center bg-surface border border-border rounded-xl">
            <p className="text-sm text-ink-soft">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>

      <ValueStrip />
    </div>
  );
};
