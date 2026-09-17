import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, MapPin, Mail, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-canvas border-t border-border pt-16 pb-12 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-black text-2xl tracking-tight uppercase text-ink">
                THE CATALOG STORE
              </span>
              <span className="block text-[11px] font-bold tracking-widest uppercase text-ink-soft">
                Direct Karachi Furniture Store
              </span>
            </Link>
            <p className="text-sm text-ink-soft max-w-sm leading-relaxed">
              Standard furniture e-commerce: browse by category, review transparent factory prices, add to cart, and confirm orders directly via WhatsApp with zero middlemen markup.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/923008294711"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-soft text-primary font-bold text-xs uppercase tracking-wide hover:bg-primary hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
              <div className="flex items-center gap-2 text-ink-soft">
                <a
                  href="#instagram"
                  className="p-2 hover:text-primary hover:bg-surface rounded-lg transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  className="p-2 hover:text-primary hover:bg-surface rounded-lg transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-ink mb-4">
              Catalog Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-ink-soft hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-ink mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <span className="block font-medium text-ink">Free Assembly</span>
                <span className="text-xs">Provided across Karachi</span>
              </li>
              <li>
                <span className="block font-medium text-ink">Payment Options</span>
                <span className="text-xs">Cash on Delivery / Bank Transfer</span>
              </li>
              <li>
                <span className="block font-medium text-ink">Inspection Guarantee</span>
                <span className="text-xs">Inspect upon delivery before payment</span>
              </li>
            </ul>
          </div>

          {/* Contact & Showroom */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-ink mb-4">
              Showroom & Contact
            </h4>
            <ul className="space-y-3 text-xs text-ink-soft">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Plot 42-C, Main Bukhari Commercial Area, Phase VI, DHA, Karachi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="font-bold text-ink">+92 (021) 3584-1190</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>orders@thecatalogstore.pk</span>
              </li>
              <li className="pt-1 text-stone-400">
                <span>Timings: Daily 11:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
          <p>© {new Date().getFullYear()} The Catalog Store. All rights reserved. Built for functional excellence.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-ink cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-ink cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-ink cursor-pointer">Karachi Dispatch Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
