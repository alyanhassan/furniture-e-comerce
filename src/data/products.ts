import { Category, Product } from '../types';

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1683181181112-6ba857b1d2a9?fm=jpg&q=80&w=2400&auto=format&fit=crop';

export const CATEGORY_IMAGES = {
  bedroom: 'https://images.unsplash.com/photo-1683181181112-6ba857b1d2a9?fm=jpg&q=80&w=1200&auto=format&fit=crop',
  wardrobes: 'https://images.unsplash.com/photo-1718939045285-b67f9e9f9f8b?fm=jpg&q=80&w=1200&auto=format&fit=crop',
  dining: 'https://images.unsplash.com/photo-1568842361248-f22be693dc03?fm=jpg&q=80&w=1200&auto=format&fit=crop',
  living: 'https://images.unsplash.com/photo-1684165610413-2401399e0e59?fm=jpg&q=80&w=1200&auto=format&fit=crop',
};

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Bedroom Sets',
    slug: 'bedroom-sets',
    image: CATEGORY_IMAGES.bedroom,
    itemCount: 2,
    description: 'Master suites, platform beds, nightstands, and matching dressers crafted for restful living.',
  },
  {
    id: 'cat-2',
    name: 'Wardrobes',
    slug: 'wardrobes',
    image: CATEGORY_IMAGES.wardrobes,
    itemCount: 2,
    description: 'Engineered modular sliding and hinged wardrobes offering optimized vertical storage and durable German tracks.',
  },
  {
    id: 'cat-3',
    name: 'Dining',
    slug: 'dining',
    image: CATEGORY_IMAGES.dining,
    itemCount: 2,
    description: 'Solid Sheesham and ashwood dining tables paired with ergonomic chairs built for family gatherings.',
  },
  {
    id: 'cat-4',
    name: 'Living',
    slug: 'living',
    image: CATEGORY_IMAGES.living,
    itemCount: 2,
    description: 'Deep-cushioned textured boucle sofas and accent armchairs tailored for contemporary living rooms.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Walnut Bedroom Set (bed + 2 nightstands + dresser)',
    price: 185000,
    category: 'Bedroom Sets',
    categorySlug: 'bedroom-sets',
    badge: null,
    image: CATEGORY_IMAGES.bedroom,
    description: 'Complete master suite ensemble crafted in select natural walnut timber with soft-close hardware. Includes a king platform bed, twin dual-drawer nightstands, and a 6-drawer matching dresser. Sealed with durable water-resistant matte polyurethane for lifetime durability.',
    dimensions: 'King Bed: 78"W x 84"L x 48"H | Dresser: 56"W x 20"D x 34"H | Nightstand: 22"W x 18"D x 20"H',
    materials: 'Grade-A American Walnut Veneer, Solid Pine Slats, Heavy-duty Steel Brackets',
    finish: 'Natural Matte Walnut Lacquer',
    warranty: '10-Year Structural Frame Warranty',
    inStock: true,
  },
  {
    id: '2',
    name: 'Sliding-Door Wardrobe, 3-panel',
    price: 92000,
    originalPrice: 105000,
    category: 'Wardrobes',
    categorySlug: 'wardrobes',
    badge: 'Sale',
    image: CATEGORY_IMAGES.wardrobes,
    description: 'Architectural 3-panel sliding wardrobe equipped with whisper-quiet German-engineered suspension rails. Internal layout features integrated dual hanging bays, adjustable shelving, and lockable private security drawers for personal accessories.',
    dimensions: '84"W x 24"D x 84"H (7ft x 7ft)',
    materials: 'High-Density Moisture-Resistant MDF with Textured Melamine Laminate',
    finish: 'Nordic Light Oak & Warm Stone Matte Panel',
    warranty: '5-Year Runner & Mechanism Warranty',
    inStock: true,
  },
  {
    id: '3',
    name: 'Solid Sheesham 6-Seater Dining Set',
    price: 145000,
    category: 'Dining',
    categorySlug: 'dining',
    badge: null,
    image: CATEGORY_IMAGES.dining,
    description: 'Handcrafted seasoned Pakistani Sheesham hardwood table accompanied by six contoured dining chairs with stain-resistant padded seats. Showcases distinctive natural grain patterns with chamfered edge profiles and reinforced mortise-and-tenon joints.',
    dimensions: 'Table: 72"L x 38"W x 30"H | Chairs: 19"W x 20"D x 36"H',
    materials: '100% Seasoned Kiln-Dried Sheesham Hardwood, High-Resilience Foam Cushioning',
    finish: 'Hand-Polished Satin Sheesham Wax Polish',
    warranty: '10-Year Termite & Structural Wood Warranty',
    inStock: true,
  },
  {
    id: '4',
    name: 'Boucle 3-Seater Sofa',
    price: 78000,
    category: 'Living',
    categorySlug: 'living',
    badge: 'New',
    image: CATEGORY_IMAGES.living,
    description: 'Plush three-seater sofa wrapped in tactile ivory boucle fabric with deep lounge cushioning. Constructed on a solid kiln-dried eucalyptus internal framework with high-density memory-pocket spring seating for cloud-like comfort and enduring resilience.',
    dimensions: '88"W x 36"D x 31"H (Seat Depth: 24")',
    materials: 'High-Density Foam (32D), Pocket Spring Core, Premium Textured Polyester Boucle Fabric',
    finish: 'Ivory Textured Boucle with Concealed Matte Black Low-Profile Feet',
    warranty: '5-Year Frame & Spring Suspension Warranty',
    inStock: true,
  },
  {
    id: '5',
    name: 'Queen Platform Bed Frame',
    price: 64000,
    category: 'Bedroom Sets',
    categorySlug: 'bedroom-sets',
    badge: null,
    image: CATEGORY_IMAGES.bedroom,
    description: 'Minimalist low-profile platform bed engineered with solid birch support slats that eliminate the need for a box spring. Features a gently angled floating headboard tailored for comfortable bedtime reading with zero creak or movement.',
    dimensions: '64"W x 84"L x 40"H (Mattress Clearance: 8")',
    materials: 'Solid Seasoned Rubberwood Core with Oak Veneer Exterior, Heavy-Duty Center Support Spine',
    finish: 'Scandi Natural Oak Protective Sealant',
    warranty: '10-Year Slats & Framework Warranty',
    inStock: true,
  },
  {
    id: '6',
    name: 'Compact 2-Door Wardrobe',
    price: 48000,
    originalPrice: 56000,
    category: 'Wardrobes',
    categorySlug: 'wardrobes',
    badge: 'Sale',
    image: CATEGORY_IMAGES.wardrobes,
    description: 'Space-conscious two-door wardrobe specifically proportioned for guest bedrooms or urban apartments. Incorporates a full-length wardrobe hanging rod alongside four modular side shelves and an integrated bottom footwear tray.',
    dimensions: '38"W x 22"D x 76"H',
    materials: 'Reinforced Engineered Wood with Scratch-Resistant Edge Banding',
    finish: 'Clean Warm Alabaster Finish with Brushed Anodized Handles',
    warranty: '5-Year Hardware Warranty',
    inStock: true,
  },
  {
    id: '7',
    name: '4-Seater Round Dining Table',
    price: 89000,
    category: 'Dining',
    categorySlug: 'dining',
    badge: null,
    image: CATEGORY_IMAGES.dining,
    description: 'Sculptural circular dining table with an architectural central pedestal base designed to maximize legroom. Solid ash veneer table top with bevelled edge detailing comfortably accommodates up to four dinner settings for intimate meal times.',
    dimensions: '48" Diameter x 30"H (Seats 4 Comfortably)',
    materials: 'Solid Cast Foundation, American Ash Veneer Top, Heavy Fluted Pedestal Column',
    finish: 'Warm Hazelnut Stain with Spill-Resistant Top Coat',
    warranty: '7-Year Stability Warranty',
    inStock: true,
  },
  {
    id: '8',
    name: 'Single-Seat Accent Armchair',
    price: 32000,
    category: 'Living',
    categorySlug: 'living',
    badge: null,
    image: CATEGORY_IMAGES.living,
    description: 'Compact mid-century inspired accent armchair designed for reading nooks or supplemental living room seating. Features ergonomic lumbar support with dense cold-cured foam and splayed solid walnut tapered legs.',
    dimensions: '30"W x 31"D x 33"H (Seat Height: 18")',
    materials: 'Kiln-Dried Hardwood Frame, Breathable Linen-Blend Upholstery, Solid Timber Legs',
    finish: 'Charcoal Textured Weave with Tapered Walnut Legs',
    warranty: '5-Year Framework Warranty',
    inStock: true,
  },
];

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString('en-US')}`;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const current = getProductById(productId);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter(
    (p) => p.id !== productId && p.categorySlug === current.categorySlug
  ).slice(0, limit);
}
