import React from 'react';
import { Clock, DollarSign, ShoppingCart } from 'lucide-react';
import { useAestheticContext } from '@/components/ConsultationModal/AestheticProvider';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
  };
  isPrimary?: boolean;
  onAddToCart: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  isPrimary = false,
  onAddToCart
}) => {
  const aesthetic = useAestheticContext();
  
  // Get animation class based on emotional state
  const getAnimationClass = () => {
    const state = aesthetic.currentState.emotionalState;
    if (state === 'celebratory') return 'animate-pulse';
    if (state === 'confident') return 'hover:scale-105 transition-transform';
    return '';
  };
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
        isPrimary ? 'border-red-200 bg-gradient-to-br from-red-50 to-white' : 'border-gray-200 hover:border-gray-300'
      } ${getAnimationClass()}`}
    >
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 ${isPrimary ? 'text-red-800' : 'text-gray-800'}`}>
          {service.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium text-gray-700">{service.price}</span>
          </div>
        </div>
        
        <button
          onClick={() => {
            onAddToCart();
            // Trigger celebratory state when adding to cart
            aesthetic.triggerCelebratoryState('Added to cart');
          }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
            isPrimary 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'border-2 border-red-200 text-red-700 hover:bg-red-50'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

