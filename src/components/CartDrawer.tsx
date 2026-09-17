import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, ArrowLeft, ShoppingBag, CheckCircle2, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { CheckoutFormData } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
    checkoutStep,
    setCheckoutStep,
    generateWhatsAppLink,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    address: '',
    area: 'DHA / Clifton, Karachi',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const KARACHI_AREAS = [
    'DHA (Phase 1–8), Karachi',
    'Clifton (Block 1–9), Karachi',
    'PECHS / Bahadurabad, Karachi',
    'Gulshan-e-Iqbal, Karachi',
    'Gulistan-e-Jauhar, Karachi',
    'North Nazimabad, Karachi',
    'Malir Cantt / Model Colony, Karachi',
    'KDA Scheme 1 / Tipu Sultan, Karachi',
    'Bahria Town Karachi',
    'Other Karachi District',
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errors.phone = 'Please enter a valid Pakistani phone/WhatsApp number';
    }
    if (!formData.address.trim()) errors.address = 'Please enter your delivery street address';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const waLink = generateWhatsAppLink(formData);
    // Mark as confirmed in UI
    setOrderConfirmed(true);
    // Open WhatsApp in new tab
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  const handleResetAfterOrder = () => {
    clearCart();
    setOrderConfirmed(false);
    setCheckoutStep('cart');
    closeCart();
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-ink/50 backdrop-blur-xs"
            aria-hidden="true"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            {/* Drawer Container (Full-screen on mobile, max-w-md on desktop) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-screen sm:max-w-md bg-canvas border-l border-border flex flex-col shadow-2xl h-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-drawer-title"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-surface">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h2
                    id="cart-drawer-title"
                    className="font-black text-lg uppercase tracking-tight text-ink"
                  >
                    {checkoutStep === 'checkout'
                      ? 'Order Summary & Checkout'
                      : `Your Shopping Cart (${totalItems})`}
                  </h2>
                </div>
                <button
                  type="button"
                  id="close-cart-btn"
                  onClick={closeCart}
                  className="p-1.5 text-ink-soft hover:text-ink rounded-lg hover:bg-canvas transition-colors"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                {orderConfirmed ? (
                  /* Post-Order WhatsApp Confirmation View */
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-16 h-16 bg-primary-soft rounded-full flex items-center justify-center mb-4 text-primary">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-black text-2xl uppercase tracking-tight text-ink mb-2">
                      WhatsApp Inquiry Sent!
                    </h3>
                    <p className="text-sm text-ink-soft mb-6 max-w-xs leading-relaxed">
                      Your order summary has been prepared for WhatsApp dispatch. Our Karachi showroom concierge will confirm dimensions, delivery timeslot, and inspection upon delivery.
                    </p>

                    <div className="w-full bg-surface border border-border rounded-xl p-4 mb-6 text-left text-xs space-y-1.5">
                      <div className="flex justify-between font-semibold">
                        <span className="text-ink-soft">Customer:</span>
                        <span className="text-ink">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-ink-soft">WhatsApp:</span>
                        <span className="text-ink">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-ink-soft">Area:</span>
                        <span className="text-ink">{formData.area}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-border text-sm">
                        <span className="text-ink">Total Payable:</span>
                        <span className="text-primary">{formatPrice(subtotal)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetAfterOrder}
                      className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold text-sm uppercase tracking-wide rounded-lg transition-colors"
                    >
                      Done & Clear Cart
                    </button>
                  </div>
                ) : items.length === 0 ? (
                  /* Empty State */
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 text-ink-soft border border-border">
                      <ShoppingBag className="w-8 h-8 opacity-40" />
                    </div>
                    <h3 className="font-bold text-lg uppercase text-ink mb-1">
                      Your cart is currently empty
                    </h3>
                    <p className="text-xs text-ink-soft max-w-xs mb-6">
                      Explore our handcrafted master suites, wardrobes, solid wood dining sets, and boucle sofas.
                    </p>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="py-2.5 px-6 bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : checkoutStep === 'cart' ? (
                  /* Step 1: Cart Items List */
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        id={`cart-item-${item.product.id}`}
                        className="flex gap-3.5 p-3 bg-surface border border-border rounded-xl"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-canvas rounded-lg overflow-hidden shrink-0 border border-border">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-ink line-clamp-2 leading-snug">
                              {item.product.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-ink-soft hover:text-accent p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-border rounded-md bg-canvas">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-surface text-ink transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-ink min-w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-surface text-ink transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Item Total Price */}
                            <span className="font-bold text-primary text-sm sm:text-base">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="bg-primary-soft/60 border border-primary/20 rounded-lg p-3 text-xs text-ink-soft">
                      <span className="font-bold text-primary block mb-0.5">Karachi White-Glove Service</span>
                      Free assembly and room-of-choice placement included on all bedroom sets and wardrobes.
                    </div>
                  </div>
                ) : (
                  /* Step 2: Checkout Form */
                  <form id="checkout-form" onSubmit={handleProceedToWhatsApp} className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft hover:text-ink transition-colors mb-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Cart Items
                    </button>

                    {/* Notice for Pitch Demo */}
                    <div className="bg-surface border border-border rounded-lg p-3 text-xs text-ink-soft">
                      <span className="font-bold text-ink block mb-0.5">Karachi Direct Checkout Flow:</span>
                      Confirming generates an order summary sent directly to our WhatsApp operations team. Pay upon inspection via cash or instant bank transfer.
                    </div>

                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Tariq Mansoor"
                        className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-ink"
                      />
                      {formErrors.fullName && (
                        <p className="text-xs text-accent mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0300 1234567"
                        className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-ink"
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-accent mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="area" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                        Karachi Delivery Area *
                      </label>
                      <select
                        id="area"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-ink"
                      >
                        {KARACHI_AREAS.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                        Street Address & Building / House No. *
                      </label>
                      <textarea
                        id="address"
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="House / Apartment #, Street #, Phase / Block..."
                        className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-ink"
                      />
                      {formErrors.address && (
                        <p className="text-xs text-accent mt-1">{formErrors.address}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                        Delivery Notes (Optional)
                      </label>
                      <input
                        type="text"
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. 2nd floor elevator available, call before dispatch"
                        className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-ink"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Drawer Footer / Checkout CTA */}
              {!orderConfirmed && items.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-border bg-surface">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-ink-soft">
                      Subtotal
                    </span>
                    <span id="cart-subtotal" className="text-xl sm:text-2xl font-bold text-primary">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-ink-soft mb-4">
                    <span>Delivery Charges:</span>
                    <span className="font-semibold text-primary">FREE (Karachi-wide)</span>
                  </div>

                  {checkoutStep === 'cart' ? (
                    <button
                      type="button"
                      id="proceed-to-checkout-btn"
                      onClick={() => setCheckoutStep('checkout')}
                      className="w-full py-3 px-4 bg-primary hover:bg-primary-hover active:bg-primary-hover text-white font-bold text-sm uppercase tracking-wide rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      id="confirm-whatsapp-order-btn"
                      onClick={handleProceedToWhatsApp}
                      className="w-full py-3 px-4 bg-primary hover:bg-primary-hover active:bg-primary-hover text-white font-bold text-sm uppercase tracking-wide rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirm Order via WhatsApp</span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
