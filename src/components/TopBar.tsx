import React from 'react';
import { MessageSquare, Truck } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div
      id="top-utility-bar"
      className="bg-ink text-canvas text-xs py-2 px-4 border-b border-stone-800"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-medium tracking-wide">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-primary-soft shrink-0" />
          <span>Free delivery across Karachi on all catalog orders</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/923008294711?text=Hello%2C%20I%20have%20an%20inquiry%20regarding%20furniture%20from%20The%20Catalog%20Store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary-soft transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>WhatsApp us: <strong className="font-bold">+92 300 8294711</strong></span>
          </a>
          <span className="hidden sm:inline text-stone-600">|</span>
          <span className="hidden sm:inline text-stone-400">Karachi Flagship Showroom Open 11am – 9pm</span>
        </div>
      </div>
    </div>
  );
};
