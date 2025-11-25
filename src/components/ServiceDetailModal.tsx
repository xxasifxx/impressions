import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// Removed aesthetic evolution import - using simple styling
import { Clock, DollarSign, X, Check } from 'lucide-react';
import { ServiceCardBase } from './ServiceCard';

interface ServiceDetailModalProps {
  service: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  // Removed aesthetic prop - using simple styling
}

/**
 * Modal component for displaying detailed service information
 * Integrates with aesthetic evolution system
 */
const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ 
  service, 
  isOpen, 
  onClose, 
  onAddToCart,
  // Removed aesthetic prop - using simple styling
}) => {
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  useEffect(() => {
    // Reset state when service changes
    setIsAddedToCart(false);
    
    // Get related services
    if (service && service.relatedServices) {
      // In a real implementation, this would fetch related services
      // For now, we'll just mock it with empty array
      setRelatedServices([]);
    }
  }, [service]);
  
  const handleAddToCart = () => {
    onAddToCart();
    setIsAddedToCart(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };
  
  if (!isOpen || !service) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="service-detail-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-semibold">{service.name}</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        
        <div className="modal-content grid md:grid-cols-2 gap-6 py-6">
          <div className="service-image aspect-video overflow-hidden rounded-md">
            {service.imageUrl ? (
              <img 
                src={service.imageUrl} 
                alt={service.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Image not available</span>
              </div>
            )}
          </div>
          
          <div className="service-details">
            <div className="service-meta flex items-center gap-6 mb-4 text-lg">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-1 text-gray-500" />
                <span className="service-price font-medium">${service.price || '0'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-1 text-gray-500" />
                <span className="service-duration">{service.duration || '0'} min</span>
              </div>
            </div>
            
            <div className="service-description mb-6">
              <p className="text-gray-700">
                {service.fullDescription || service.shortDescription || 'No description available'}
              </p>
            </div>
            
            {service.benefits && service.benefits.length > 0 && (
              <div className="service-benefits mb-6">
                <h3 className="text-lg font-medium mb-2">Benefits</h3>
                <ul className="space-y-2">
                  {service.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button 
              className="add-to-cart-button w-full md:w-auto"
              onClick={handleAddToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </Button>
          </div>
        </div>
        
        {relatedServices.length > 0 && (
          <div className="related-services border-t pt-6">
            <h3 className="text-xl font-medium mb-4">Frequently Booked Together</h3>
            <div className="related-services-grid grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedServices.map((relatedService: any) => (
                <ServiceCardBase 
                  key={relatedService.id}
                  service={relatedService}
                  onClick={() => {
                    // Replace current service with related service
                    onClose();
                    // In a real implementation, this would open a new modal
                  }}
                  onAddToCart={() => {
                    // Add related service to cart
                    // In a real implementation, this would call addToCart
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Export simple version without aesthetic evolution
export default ServiceDetailModal;
export { ServiceDetailModal as ServiceDetailModalBase };
