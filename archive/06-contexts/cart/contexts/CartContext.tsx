import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  duration: number;
  domain: string;
  imageUrl?: string;
}

// Define cart context interface
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalDuration: number;
  itemCount: number;
}

// Create context
const CartContext = createContext<CartContextType | null>(null);

// Cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Add item to cart
  const addItem = (item: CartItem) => {
    // Check if item already exists in cart
    const existingItem = items.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // Item already in cart - could increment quantity if needed
      return;
    }
    
    setItems(prev => [...prev, item]);
  };
  
  // Remove item from cart
  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
  };
  
  // Calculate totals
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const totalDuration = items.reduce((sum, item) => sum + item.duration, 0);
  const itemCount = items.length;
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      totalPrice,
      totalDuration,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

