export type CategorySlug = 'bedroom-sets' | 'wardrobes' | 'dining' | 'living';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  image: string;
  itemCount: number;
  description: string;
}

export type ProductBadge = 'Sale' | 'New' | null;

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Bedroom Sets' | 'Wardrobes' | 'Dining' | 'Living';
  categorySlug: CategorySlug;
  badge: ProductBadge;
  image: string;
  description: string;
  dimensions: string;
  materials: string;
  finish: string;
  warranty: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  address: string;
  area: string;
  notes?: string;
}
