import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from './UnifiedProduct';

export interface UnifiedCartItem {
  id: string;
  type: 'service' | 'product';
  item: UnifiedService | UnifiedProduct;
  quantity: number;
  selectedVariant?: string; // For products with variants
  customizations?: Record<string, any>;
  notes?: string;
  addedAt: number;
  bundleContext?: {
    bundleId: string;
    bundleDiscount: number;
    bundleReason: string;
  };
}

export interface CartBundle {
  id: string;
  name: string;
  description: string;
  itemIds: string[];
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  conditions: BundleCondition[];
  cosmetologistReasoning: string;
  validUntil?: number;
}

export interface BundleCondition {
  type: 'minimum_items' | 'required_categories' | 'price_threshold' | 'specific_items';
  value: any;
  description: string;
}

export interface PriceBreakdown {
  subtotal: number;
  bundleDiscounts: BundleDiscount[];
  taxes: number;
  total: number;
  savings: number;
}

export interface BundleDiscount {
  bundleId: string;
  bundleName: string;
  discountAmount: number;
  appliedToItems: string[];
}

export interface CartActionHandlers {
  addToCart: (item: UnifiedService | UnifiedProduct, options?: AddToCartOptions) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  applyBundle: (bundle: CartBundle) => void;
  removeBundle: (bundleId: string) => void;
  clearCart: () => void;
}

export interface AddToCartOptions {
  quantity?: number;
  selectedVariant?: string;
  customizations?: Record<string, any>;
  notes?: string;
  bundleContext?: {
    bundleId: string;
    bundleDiscount: number;
    bundleReason: string;
  };
}

export interface UnifiedCartContextType {
  cartItems: UnifiedCartItem[];
  appliedBundles: CartBundle[];
  priceBreakdown: PriceBreakdown;
  
  // Cart actions
  addToCart: (item: UnifiedService | UnifiedProduct, options?: AddToCartOptions) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Bundle actions
  applyBundle: (bundle: CartBundle) => void;
  removeBundle: (bundleId: string) => void;
  getAvailableBundles: () => CartBundle[];
  
  // Calculations
  getTotalDuration: () => number; // For services
  getTotalPrice: () => number;
  getItemCount: () => number;
  getSavings: () => number;
  
  // Bundle intelligence preparation (for Agent D)
  getBundleRecommendations: () => CartBundle[];
  validateBundleCompatibility: (items: UnifiedCartItem[]) => BundleCompatibility[];
}

export interface BundleCompatibility {
  bundleId: string;
  compatible: boolean;
  missingItems?: string[];
  conflictingItems?: string[];
  reason: string;
}

// Context for bundle intelligence (Agent D will extend this)
export interface BundleContext {
  availableBundles: CartBundle[];
  recommendedBundles: CartBundle[];
  appliedBundles: CartBundle[];
  bundleCompatibility: BundleCompatibility[];
}

