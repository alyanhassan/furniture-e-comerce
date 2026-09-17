import React from 'react';
import { Truck, RotateCcw, MessageSquare, ShieldCheck } from 'lucide-react';

export const ValueStrip: React.FC = () => {
  const values = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Zero shipping fee across all Karachi districts with doorstep assembly',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: 'Inspect upon arrival with 30-day structural satisfaction guarantee',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Support',
      description: 'Direct communication with dedicated showroom consultants in real-time',
    },
    {
      icon: ShieldCheck,
      title: '10-Year Warranty',
      description: 'Solid seasoned hardwood joinery and certified framework coverage',
    },
  ];

  return (
    <section id="value-strip" className="bg-surface border-y border-border py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-2"
              >
                <div className="p-2.5 rounded-lg bg-canvas border border-border text-primary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wide text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
