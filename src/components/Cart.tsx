import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';

interface CartProps {
  buttonVariant?: 'default' | 'outline' | 'ghost';
  buttonSize?: 'default' | 'sm' | 'lg';
  className?: string;
}

/**
 * Cart component with slide-out panel
 */
const Cart: React.FC<CartProps> = ({
  buttonVariant = 'outline',
  buttonSize = 'default',
  className = ''
}) => {
  const { items, removeItem, totalPrice, totalDuration, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    // Navigate to booking page
    navigate('/booking');
    // Close the cart panel
    setIsOpen(false);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant={buttonVariant as any}
          size={buttonSize as any}
          className={`cart-button relative ${className}`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Your Services</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="empty-cart flex flex-col items-center justify-center h-[50vh]">
            <ShoppingCart className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-6">Your cart is empty</p>
            <SheetClose asChild>
              <Button>Continue Shopping</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="cart-items py-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="cart-item flex border-b pb-4">
                  {item.imageUrl && (
                    <div className="item-image w-16 h-16 rounded overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="item-details flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="item-meta flex items-center text-xs text-gray-500 mt-1">
                      <DollarSign className="w-3 h-3 mr-1" />
                      <span className="mr-3">${item.price}</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{item.duration} min</span>
                    </div>
                  </div>
                  
                  <button 
                    className="remove-button text-gray-400 hover:text-gray-600"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary border-t py-4 space-y-2">
              <div className="summary-row flex justify-between text-sm">
                <span>Total Duration:</span>
                <span className="font-medium">{totalDuration} min</span>
              </div>
              <div className="summary-row total flex justify-between text-lg font-medium">
                <span>Total Price:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
            
            <div className="cart-actions pt-4">
              <Button 
                className="checkout-button w-full"
                onClick={handleCheckout}
              >
                Proceed to Booking
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

