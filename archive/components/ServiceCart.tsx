
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Minus, Plus, X, Clock, Package } from 'lucide-react';
import { useServiceCart } from '@/contexts/ServiceCartContext';
import AppointmentBookingModal from './AppointmentBookingModal';
import { useDomainTheme } from '@/contexts/DomainThemeContext';

const ServiceCart = () => {
  const { currentTheme } = useDomainTheme();
  const {
    cartItems,
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
  } = useServiceCart();

  const [isOpen, setIsOpen] = useState(false);
  const itemCount = getItemCount();
  const totalDuration = getTotalDuration();
  const totalPrice = getTotalPrice();
  const originalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.service.price.replace(/[^0-9.]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  const applicablePackages = getApplicablePackages();

  if (itemCount === 0) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ 
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span className="mr-2">{itemCount}</span>
              <Badge 
                variant="secondary" 
                className="bg-white/20 text-white border-0"
              >
                ${totalPrice.toFixed(0)}
              </Badge>
            </Button>
          </SheetTrigger>

          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Your Services ({itemCount})
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.service.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.service.name}</h4>
                      <p className="text-sm text-gray-600">{item.service.domain.replace('-', ' ')}</p>
                      {item.notes && (
                        <p className="text-xs text-gray-500 italic mt-1">{item.notes}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.service.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{item.actualDuration * item.quantity}min</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">
                        ${(parseFloat(item.service.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Package Deals */}
            {applicablePackages.length > 0 && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-green-600" />
                  <h4 className="font-medium text-green-800">Available Package Deals</h4>
                </div>
                {applicablePackages.map((pkg) => (
                  <div key={pkg.id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-green-700">{pkg.name}</div>
                      <div className="text-xs text-green-600">{pkg.description}</div>
                      <div className="text-xs text-green-600">Code: {pkg.couponCode}</div>
                    </div>
                    {appliedDiscount?.id === pkg.id ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removePackageDiscount}
                        className="text-red-600 border-red-200"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyPackageDiscount(pkg)}
                        className="text-green-600 border-green-200"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Summary */}
            <div className="mt-6 pt-4 border-t space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Total Duration:
                </span>
                <span className="font-medium">{Math.ceil(totalDuration / 60)}h {totalDuration % 60}min</span>
              </div>
              
              {appliedDiscount && (
                <>
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Subtotal:</span>
                    <span className="line-through">${originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span>{appliedDiscount.name} Discount:</span>
                    <span>-${(originalPrice - totalPrice).toFixed(2)}</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span style={{ color: currentTheme.colors.primary }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <AppointmentBookingModal
                trigger={
                  <Button 
                    className="w-full"
                    size="lg"
                    style={{ 
                      backgroundColor: currentTheme.colors.primary,
                      color: 'white'
                    }}
                  >
                    Book All Services - ${totalPrice.toFixed(0)}
                  </Button>
                }
                cartItems={cartItems}
                totalDuration={totalDuration}
                totalPrice={totalPrice}
                appliedDiscount={appliedDiscount}
                sourcePage="unified-services-cart"
                onBookingComplete={clearCart}
              />
              
              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ServiceCart;
