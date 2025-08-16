import React, { useCallback } from 'react';
import { Clock, Star, Users, Award, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UnifiedService } from '@/data/unifiedServicesData';
import { useContainerStyling } from '@/hooks/useDynamicStyling';
import { useUnifiedCart } from '@/hooks/useUnifiedCart';
import { ArtEvolutionState, CartActionHandlers, BundleContext } from '@/data/models';

export type ServiceDisplayMode = 'card' | 'list' | 'detailed' | 'consultation';

export interface ServiceContainerProps {
  service: UnifiedService;
  displayMode: ServiceDisplayMode;
  artEvolution: ArtEvolutionState;
  onInteraction: (action: string, payload: any) => void;
  cartActions?: CartActionHandlers;
  bundleContext?: BundleContext;
  consultationState?: any;
  className?: string;
  showAddToCart?: boolean;
  showDetails?: boolean;
}

export const ServiceContainer: React.FC<ServiceContainerProps> = ({
  service,
  displayMode,
  artEvolution,
  onInteraction,
  cartActions,
  bundleContext,
  consultationState,
  className = '',
  showAddToCart = true,
  showDetails = true
}) => {
  const { addToCart } = useUnifiedCart();
  const { className: dynamicClassName, inlineStyles, cssVariables } = useContainerStyling(
    artEvolution,
    'service',
    displayMode
  );

  // Handle service interactions
  const handleAddToCart = useCallback(() => {
    if (cartActions?.addToCart) {
      cartActions.addToCart(service);
    } else {
      addToCart(service);
    }
    onInteraction('ADD_TO_CART', { service, source: 'ServiceContainer' });
  }, [service, cartActions, addToCart, onInteraction]);

  const handleViewDetails = useCallback(() => {
    onInteraction('VIEW_DETAILS', { service, source: 'ServiceContainer' });
  }, [service, onInteraction]);

  const handleConsultationSelect = useCallback(() => {
    onInteraction('CONSULTATION_SELECT', { service, source: 'ServiceContainer' });
  }, [service, onInteraction]);

  // Get domain-specific styling
  const getDomainStyling = useCallback((domain: string) => {
    switch (domain) {
      case 'hair-salon':
        return 'border-red-200 hover:border-red-300';
      case 'makeup-studio':
        return 'border-pink-200 hover:border-pink-300';
      case 'med-spa':
        return 'border-emerald-200 hover:border-emerald-300';
      default:
        return 'border-gray-200 hover:border-gray-300';
    }
  }, []);

  // Get difficulty styling
  const getDifficultyBadge = useCallback((difficulty?: string) => {
    if (!difficulty) return null;

    const styles = {
      Easy: 'bg-green-100 text-green-700 border-green-200',
      Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Advanced: 'bg-red-100 text-red-700 border-red-200'
    };

    return (
      <Badge className={styles[difficulty as keyof typeof styles] || styles.Easy}>
        {difficulty}
      </Badge>
    );
  }, []);

  // Render based on display mode
  const renderContent = () => {
    switch (displayMode) {
      case 'list':
        return renderListMode();
      case 'detailed':
        return renderDetailedMode();
      case 'consultation':
        return renderConsultationMode();
      default:
        return renderCardMode();
    }
  };

  const renderCardMode = () => (
    <div className="group overflow-hidden">
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={service.imageUrl} 
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {service.featured && (
            <Badge className="bg-yellow-500 text-white border-0">
              <Award className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {getDifficultyBadge(service.difficulty)}
        </div>

        {/* Bundle indicator */}
        {bundleContext?.recommendedBundles.some(bundle => 
          bundle.itemIds.includes(service.id)
        ) && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-blue-500 text-white">Bundle Available</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {service.name}
          </h3>
          <span className="text-xl font-bold text-gray-900">{service.price}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Service details */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{service.category}</span>
          </div>
          {service.clientStory && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{service.clientStory.rating}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {showAddToCart && (
            <Button 
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add to Cart
            </Button>
          )}
          {showDetails && (
            <Button 
              variant="outline" 
              onClick={handleViewDetails}
              className="flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderListMode = () => (
    <div className="flex items-center gap-4 p-4">
      <img 
        src={service.imageUrl} 
        alt={service.name}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.category}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-gray-900">{service.price}</span>
            <p className="text-sm text-gray-500">{service.duration}</p>
          </div>
        </div>
      </div>
      {showAddToCart && (
        <Button size="sm" onClick={handleAddToCart}>
          <Plus className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  const renderDetailedMode = () => (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img 
            src={service.imageUrl} 
            alt={service.name}
            className="w-full h-64 rounded-lg object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h2>
          <p className="text-gray-600 mb-4">{service.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Price:</span>
              <span className="font-semibold">{service.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Duration:</span>
              <span className="font-semibold">{service.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Category:</span>
              <span className="font-semibold">{service.category}</span>
            </div>
          </div>

          {service.details && (
            <div className="space-y-3">
              {service.details.benefits && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Benefits:</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {service.details.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {showAddToCart && (
            <Button onClick={handleAddToCart} className="w-full mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderConsultationMode = () => (
    <div 
      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleConsultationSelect}
    >
      <div className="flex items-center gap-4">
        <img 
          src={service.imageUrl} 
          alt={service.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{service.name}</h3>
          <p className="text-sm text-gray-600">{service.price} • {service.duration}</p>
        </div>
        <div className="text-right">
          {getDifficultyBadge(service.difficulty)}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`${dynamicClassName} ${getDomainStyling(service.domain)} ${className}`}
      style={{ ...inlineStyles, ...cssVariables }}
    >
      {renderContent()}
    </div>
  );
};

export default ServiceContainer;

