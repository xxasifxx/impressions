export interface UnifiedProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  domain: 'makeup-studio' | 'perfume-boutique' | 'vitamin-wellness';
  imageUrl: string;
  featured?: boolean;
  inStock: boolean;
  stockLevel?: number;
  brand?: string;
  userJourneys?: string[];
  bundleCompatible?: string[];
  details?: {
    ingredients?: string[];
    benefits?: string[];
    usage?: string[];
    suitableFor?: string[];
    warnings?: string[];
    specifications?: Record<string, string>;
  };
  reviews?: {
    averageRating: number;
    totalReviews: number;
    highlights?: string[];
  };
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  inStock: boolean;
  attributes: Record<string, string>; // e.g., { color: 'Rose Gold', size: '30ml' }
}

export interface InventoryStatus {
  inStock: boolean;
  stockLevel: number;
  lowStockThreshold: number;
  estimatedRestockDate?: string;
  backorderAvailable: boolean;
}

// Product categories for each domain
export type MakeupCategory = 
  | 'Foundation & Concealer'
  | 'Eyes'
  | 'Lips'
  | 'Cheeks'
  | 'Tools & Brushes'
  | 'Sets & Palettes';

export type PerfumeCategory = 
  | 'Eau de Parfum'
  | 'Eau de Toilette'
  | 'Cologne'
  | 'Body Mist'
  | 'Gift Sets'
  | 'Travel Size';

export type VitaminCategory = 
  | 'Hair Health'
  | 'Skin Health'
  | 'Nail Health'
  | 'Beauty Multivitamins'
  | 'Supplements'
  | 'Wellness Bundles';

