import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CheckoutFormData } from '../types';
import { formatPrice } from '../data/products';

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  checkoutStep: 'cart' | 'checkout' | 'success';
  lastAddedProductId: string | null;
  totalItems: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCheckoutStep: (step: 'cart' | 'checkout' | 'success') => void;
  generateWhatsAppLink: (formData: CheckoutFormData) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const WHATSAPP_STORE_NUMBER = '923008294711';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = sessionStorage.getItem('catalog_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [lastAddedProductId, setLastAddedProductId] = useState<string | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('catalog_cart_items', JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const openCart = () => {
    setIsDrawerOpen(true);
  };

  const closeCart = () => {
    setIsDrawerOpen(false);
  };

  const toggleCart = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setLastAddedProductId(product.id);
    setTimeout(() => {
      setLastAddedProductId(null);
    }, 400);

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });

    // Automatically slide in cart drawer on add to cart as required by specs
    setCheckoutStep('cart');
    setIsDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const generateWhatsAppLink = (formData: CheckoutFormData) => {
    const lines = [
      '🛒 *NEW ORDER — THE CATALOG STORE*',
      '--------------------------------',
      `👤 *Customer:* ${formData.fullName}`,
      `📞 *Phone:* ${formData.phone}`,
      `📍 *Delivery Area:* ${formData.area}`,
      `🏠 *Address:* ${formData.address}`,
      formData.notes ? `📝 *Notes:* ${formData.notes}` : '',
      '--------------------------------',
      '*ORDER ITEMS:*',
      ...items.map(
        (item, index) =>
          `${index + 1}. ${item.product.name}\n   Qty: ${item.quantity} × ${formatPrice(
            item.product.price
          )} = ${formatPrice(item.product.price * item.quantity)}`
      ),
      '--------------------------------',
      `💰 *SUBTOTAL:* ${formatPrice(subtotal)}`,
      '🚚 *Delivery:* Free across Karachi',
      '✨ *Payment Terms:* Cash / Bank Transfer on Delivery inspection',
      '--------------------------------',
      'Please confirm availability and dispatch schedule.',
    ].filter(Boolean);

    const message = lines.join('\n');
    return `https://wa.me/${WHATSAPP_STORE_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        checkoutStep,
        lastAddedProductId,
        totalItems,
        subtotal,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCheckoutStep,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
