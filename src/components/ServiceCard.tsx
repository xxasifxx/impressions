import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
// Removed aesthetic evolution import - using simple styling
import { Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: any;
  onClick: () => void;
  onAddToCart: () => void;
  isPrimary?: boolean;
  // Removed aesthetic prop - using simple styling
}

/**
 * Card component for displaying service information
 * Integrates with aesthetic evolution system
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onClick, 
  onAddToCart, 
  isPrimary = false,
  // Removed aesthetic prop - using simple styling
}) => {
  // Handle click on the card
  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger onClick if the click wasn't on a button
    if (!(e.target as HTMLElement).closest('button')) {
      onClick();
    }
  };
  
  return (
    <Card 
      className={`service-card ${isPrimary ? 'primary' : ''} cursor-pointer hover:shadow-md transition-shadow`}
      onClick={handleCardClick}
    >
      <div className="service-image aspect-video overflow-hidden">
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
      
      <CardContent className="service-content p-4">
        <h3 className="service-name text-lg font-semibold mb-2">{service.name}</h3>
        <p className="service-description text-sm text-gray-600 mb-3">
          {service.shortDescription || 'No description available'}
        </p>
        
        <div className="service-meta flex items-center justify-between text-sm">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
            <span className="service-price font-medium">${service.price || '0'}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-gray-500" />
            <span className="service-duration">{service.duration || '0'} min</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="service-actions p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="details-button flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details
        </Button>
        
        <Button 
          className="add-to-cart-button flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

// Export simple version without aesthetic evolution
export default ServiceCard;
export { ServiceCard as ServiceCardBase };
