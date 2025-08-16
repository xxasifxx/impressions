
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UnifiedService } from '@/data/unifiedServicesData';

interface CartItem {
  service: UnifiedService;
  quantity: number;
  actualDuration: number; // in minutes
  notes?: string;
}

interface ServiceCartContextType {
  cartItems: CartItem[];
  addToCart: (service: UnifiedService, notes?: string) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalDuration: () => number;
  getTotalPrice: () => number;
  getItemCount: () => number;
  getApplicablePackages: () => ServicePackage[];
  appliedDiscount?: ServicePackage;
  applyPackageDiscount: (packageDiscount: ServicePackage) => void;
  removePackageDiscount: () => void;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  requiredServices: string[]; // service IDs
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  couponCode: string;
}

const servicePackages: ServicePackage[] = [
  {
    id: 'brow-perfect',
    name: 'Perfect Brows Package',
    description: 'Eyebrow threading + face threading for complete facial grooming',
    requiredServices: ['eyebrow-threading', 'full-face-threading'],
    discountType: 'fixed',
    discountValue: 8,
    couponCode: 'BROWPERFECT'
  },
  {
    id: 'bridal-glow',
    name: 'Bridal Glow Package',
    description: 'Complete bridal preparation with makeup and facial',
    requiredServices: ['bridal-makeup', 'gold-facial'],
    discountType: 'percentage',
    discountValue: 15,
    couponCode: 'BRIDALGLOW'
  },
  {
    id: 'transformation',
    name: 'Complete Transformation',
    description: 'Cut, color, and styling for a complete new look',
    requiredServices: ['precision-cuts', 'balayage'],
    discountType: 'percentage',
    discountValue: 10,
    couponCode: 'TRANSFORM'
  },
  {
    id: 'event-ready',
    name: 'Event Ready Package',
    description: 'Hair styling and makeup for special occasions',
    requiredServices: ['precision-cuts', 'special-occasion-makeup'],
    discountType: 'fixed',
    discountValue: 20,
    couponCode: 'EVENTREADY'
  }
];

// Realistic service durations based on actual salon operations
const getActualServiceDuration = (service: UnifiedService, isStandalone: boolean = true): number => {
  const baseTimes: Record<string, number> = {
    'eyebrow-threading': isStandalone ? 15 : 10, // includes check-in/out if standalone
    'full-face-threading': isStandalone ? 35 : 30,
    'brazilian-wax': isStandalone ? 35 : 30,
    'gold-facial': 60,
    'eyelash-extensions': 120,
    'precision-cuts': 50,
    'balayage': 180,
    'root-touch-up': 75,
    'hair-extensions': 240,
    'special-occasion-makeup': 60,
    'bridal-makeup': 105,
    'makeup-lessons': 90
  };

  return baseTimes[service.id] || parseInt(service.duration.split('-')[0]) || 60;
};

const ServiceCartContext = createContext<ServiceCartContextType | undefined>(undefined);

export const ServiceCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<ServicePackage>();

  const addToCart = (service: UnifiedService, notes?: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.service.id === service.id);
      const isStandalone = prev.length === 0;
      const actualDuration = getActualServiceDuration(service, isStandalone);

      if (existingItem) {
        return prev.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, {
        service,
        quantity: 1,
        actualDuration,
        notes
      }];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems(prev => prev.filter(item => item.service.id !== serviceId));
    // Remove discount if required services are no longer in cart
    if (appliedDiscount) {
      const remainingServiceIds = cartItems
        .filter(item => item.service.id !== serviceId)
        .map(item => item.service.id);
      
      const hasAllRequiredServices = appliedDiscount.requiredServices.every(
        reqService => remainingServiceIds.includes(reqService)
      );
      
      if (!hasAllRequiredServices) {
        setAppliedDiscount(undefined);
      }
    }
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.service.id === serviceId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedDiscount(undefined);
  };

  const getTotalDuration = () => {
    const baseDuration = cartItems.reduce((total, item) => {
      return total + (item.actualDuration * item.quantity);
    }, 0);

    // Add buffer time for multiple services
    const bufferTime = cartItems.length > 1 ? (cartItems.length - 1) * 5 : 0;
    return baseDuration + bufferTime;
  };

  const getTotalPrice = () => {
    const basePrice = cartItems.reduce((total, item) => {
      const price = parseFloat(item.service.price.replace(/[^0-9.]/g, ''));
      return total + (price * item.quantity);
    }, 0);

    if (!appliedDiscount) return basePrice;

    if (appliedDiscount.discountType === 'percentage') {
      return basePrice * (1 - appliedDiscount.discountValue / 100);
    } else {
      return Math.max(0, basePrice - appliedDiscount.discountValue);
    }
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getApplicablePackages = () => {
    const serviceIds = cartItems.map(item => item.service.id);
    return servicePackages.filter(pkg =>
      pkg.requiredServices.every(reqService => serviceIds.includes(reqService))
    );
  };

  const applyPackageDiscount = (packageDiscount: ServicePackage) => {
    setAppliedDiscount(packageDiscount);
  };

  const removePackageDiscount = () => {
    setAppliedDiscount(undefined);
  };

  return (
    <ServiceCartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalDuration,
      getTotalPrice,
      getItemCount,
      getApplicablePackages,
      appliedDiscount,
      applyPackageDiscount,
      removePackageDiscount
    }}>
      {children}
    </ServiceCartContext.Provider>
  );
};

export const useServiceCart = () => {
  const context = useContext(ServiceCartContext);
  if (!context) {
    throw new Error('useServiceCart must be used within a ServiceCartProvider');
  }
  return context;
};
