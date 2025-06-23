import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { UnifiedService } from '@/data/unifiedServicesData';
import {
  UnifiedProduct,
  UnifiedCartItem,
  CartBundle,
  PriceBreakdown,
  BundleDiscount,
  AddToCartOptions,
  UnifiedCartContextType,
  BundleCompatibility
} from '@/data/models';

interface UnifiedCartProviderProps {
  children: ReactNode;
}

const UnifiedCartContext = createContext<UnifiedCartContextType | undefined>(undefined);

// Default bundles - Agent D will enhance this with intelligent bundling
const defaultBundles: CartBundle[] = [
  {
    id: 'hair-complete',
    name: 'Complete Hair Transformation',
    description: 'Cut, color, and styling for a complete new look',
    itemIds: ['hair-precision-cut', 'hair-color', 'hair-styling'],
    discountType: 'percentage',
    discountValue: 15,
    conditions: [
      {
        type: 'specific_items',
        value: ['hair-precision-cut', 'hair-color'],
        description: 'Must include cut and color services'
      }
    ],
    cosmetologistReasoning: 'Combining cut and color ensures optimal results and saves time'
  },
  {
    id: 'bridal-package',
    name: 'Bridal Beauty Package',
    description: 'Complete bridal preparation with makeup and hair',
    itemIds: ['bridal-makeup', 'bridal-hair', 'makeup-trial'],
    discountType: 'fixed',
    discountValue: 50,
    conditions: [
      {
        type: 'minimum_items',
        value: 2,
        description: 'Must include at least 2 bridal services'
      }
    ],
    cosmetologistReasoning: 'Bridal packages ensure coordinated look and peace of mind'
  }
];

export const UnifiedCartProvider: React.FC<UnifiedCartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<UnifiedCartItem[]>([]);
  const [appliedBundles, setAppliedBundles] = useState<CartBundle[]>([]);

  // Calculate price breakdown
  const calculatePriceBreakdown = useCallback((): PriceBreakdown => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);

    const bundleDiscounts: BundleDiscount[] = appliedBundles.map(bundle => {
      const bundleItems = cartItems.filter(item => bundle.itemIds.includes(item.item.id));
      const bundleSubtotal = bundleItems.reduce((total, item) => {
        const price = parseFloat(item.item.price.replace('$', ''));
        return total + (price * item.quantity);
      }, 0);

      const discountAmount = bundle.discountType === 'percentage' 
        ? bundleSubtotal * (bundle.discountValue / 100)
        : bundle.discountValue;

      return {
        bundleId: bundle.id,
        bundleName: bundle.name,
        discountAmount,
        appliedToItems: bundle.itemIds
      };
    });

    const totalBundleDiscount = bundleDiscounts.reduce((total, discount) => total + discount.discountAmount, 0);
    const taxes = (subtotal - totalBundleDiscount) * 0.08; // 8% tax rate
    const total = subtotal - totalBundleDiscount + taxes;
    const savings = totalBundleDiscount;

    return {
      subtotal,
      bundleDiscounts,
      taxes,
      total,
      savings
    };
  }, [cartItems, appliedBundles]);

  // Add item to cart
  const addToCart = useCallback((item: UnifiedService | UnifiedProduct, options?: AddToCartOptions) => {
    const cartItemId = `${item.id}-${options?.selectedVariant || 'default'}`;
    
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === cartItemId);
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === cartItemId
            ? { ...cartItem, quantity: cartItem.quantity + (options?.quantity || 1) }
            : cartItem
        );
      }

      const newItem: UnifiedCartItem = {
        id: cartItemId,
        type: 'domain' in item ? 'service' : 'product',
        item,
        quantity: options?.quantity || 1,
        selectedVariant: options?.selectedVariant,
        customizations: options?.customizations,
        notes: options?.notes,
        addedAt: Date.now(),
        bundleContext: options?.bundleContext
      };

      return [...prev, newItem];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedBundles([]);
  }, []);

  // Apply bundle
  const applyBundle = useCallback((bundle: CartBundle) => {
    setAppliedBundles(prev => {
      if (prev.find(b => b.id === bundle.id)) {
        return prev; // Bundle already applied
      }
      return [...prev, bundle];
    });
  }, []);

  // Remove bundle
  const removeBundle = useCallback((bundleId: string) => {
    setAppliedBundles(prev => prev.filter(bundle => bundle.id !== bundleId));
  }, []);

  // Get available bundles based on cart contents
  const getAvailableBundles = useCallback((): CartBundle[] => {
    return defaultBundles.filter(bundle => {
      return bundle.conditions.every(condition => {
        switch (condition.type) {
          case 'minimum_items':
            return cartItems.length >= condition.value;
          case 'specific_items':
            return condition.value.every((itemId: string) =>
              cartItems.some(cartItem => cartItem.item.id === itemId)
            );
          case 'required_categories':
            return condition.value.every((category: string) =>
              cartItems.some(cartItem => cartItem.item.category === category)
            );
          case 'price_threshold':
            const total = getTotalPrice();
            return total >= condition.value;
          default:
            return true;
        }
      });
    });
  }, [cartItems]);

  // Get total duration (for services)
  const getTotalDuration = useCallback((): number => {
    return cartItems.reduce((total, item) => {
      if (item.type === 'service') {
        const service = item.item as UnifiedService;
        const duration = parseInt(service.duration.split(' ')[0]) || 0;
        return total + (duration * item.quantity);
      }
      return total;
    }, 0);
  }, [cartItems]);

  // Get total price
  const getTotalPrice = useCallback((): number => {
    return calculatePriceBreakdown().total;
  }, [calculatePriceBreakdown]);

  // Get item count
  const getItemCount = useCallback((): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Get savings
  const getSavings = useCallback((): number => {
    return calculatePriceBreakdown().savings;
  }, [calculatePriceBreakdown]);

  // Get bundle recommendations (placeholder for Agent D)
  const getBundleRecommendations = useCallback((): CartBundle[] => {
    // This will be enhanced by Agent D with intelligent bundling logic
    return getAvailableBundles().slice(0, 3); // Return top 3 available bundles for now
  }, [getAvailableBundles]);

  // Validate bundle compatibility
  const validateBundleCompatibility = useCallback((items: UnifiedCartItem[]): BundleCompatibility[] => {
    return defaultBundles.map(bundle => {
      const itemIds = items.map(item => item.item.id);
      const requiredItems = bundle.itemIds;
      const missingItems = requiredItems.filter(id => !itemIds.includes(id));
      
      return {
        bundleId: bundle.id,
        compatible: missingItems.length === 0,
        missingItems: missingItems.length > 0 ? missingItems : undefined,
        reason: missingItems.length === 0 
          ? 'All required items present'
          : `Missing items: ${missingItems.join(', ')}`
      };
    });
  }, []);

  // Auto-apply eligible bundles when cart changes
  useEffect(() => {
    const availableBundles = getAvailableBundles();
    const newBundles = availableBundles.filter(bundle => 
      !appliedBundles.find(applied => applied.id === bundle.id)
    );
    
    // Auto-apply the first eligible bundle (Agent D will make this smarter)
    if (newBundles.length > 0) {
      applyBundle(newBundles[0]);
    }
  }, [cartItems, appliedBundles, getAvailableBundles, applyBundle]);

  const contextValue: UnifiedCartContextType = {
    cartItems,
    appliedBundles,
    priceBreakdown: calculatePriceBreakdown(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyBundle,
    removeBundle,
    getAvailableBundles,
    getTotalDuration,
    getTotalPrice,
    getItemCount,
    getSavings,
    getBundleRecommendations,
    validateBundleCompatibility
  };

  return (
    <UnifiedCartContext.Provider value={contextValue}>
      {children}
    </UnifiedCartContext.Provider>
  );
};

export const useUnifiedCart = (): UnifiedCartContextType => {
  const context = useContext(UnifiedCartContext);
  if (!context) {
    throw new Error('useUnifiedCart must be used within a UnifiedCartProvider');
  }
  return context;
};

