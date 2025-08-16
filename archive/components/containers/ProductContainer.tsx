import React, { useCallback, useState } from 'react';
import { ShoppingCart, Eye, Star, Package, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UnifiedProduct, InventoryStatus } from '@/data/models/UnifiedProduct';
import { useContainerStyling } from '@/hooks/useDynamicStyling';
import { useUnifiedCart } from '@/hooks/useUnifiedCart';
import { ArtEvolutionState, CartActionHandlers, BundleContext } from '@/data/models';

export type ProductDisplayMode = 'card' | 'list' | 'detailed' | 'consultation';

export interface ProductContainerProps {
  product: UnifiedProduct;
  displayMode: ProductDisplayMode;
  artEvolution: ArtEvolutionState;
  onInteraction: (action: string, payload: any) => void;
  cartActions?: CartActionHandlers;
  bundleContext?: BundleContext;
  inventoryStatus: InventoryStatus;
  className?: string;
  showAddToCart?: boolean;
  showDetails?: boolean;
}

export const ProductContainer: React.FC<ProductContainerProps> = ({
  product,
  displayMode,
  artEvolution,
  onInteraction,
  cartActions,
  bundleContext,
  inventoryStatus,
  className = '',
  showAddToCart = true,
  showDetails = true
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useUnifiedCart();
  const { className: dynamicClassName, inlineStyles, cssVariables } = useContainerStyling(
    artEvolution,
    'product',
    displayMode
  );

  // Handle product interactions
  const handleAddToCart = useCallback(() => {
    const options = {
      quantity,
      selectedVariant: selectedVariant || undefined
    };

    if (cartActions?.addToCart) {
      cartActions.addToCart(product, options);
    } else {
      addToCart(product, options);
    }
    
    onInteraction('ADD_TO_CART', { 
      product, 
      options, 
      source: 'ProductContainer' 
    });
  }, [product, quantity, selectedVariant, cartActions, addToCart, onInteraction]);

  const handleViewDetails = useCallback(() => {
    onInteraction('VIEW_DETAILS', { product, source: 'ProductContainer' });
  }, [product, onInteraction]);

  const handleConsultationSelect = useCallback(() => {
    onInteraction('CONSULTATION_SELECT', { product, source: 'ProductContainer' });
  }, [product, onInteraction]);

  // Get domain-specific styling
  const getDomainStyling = useCallback((domain: string) => {
    switch (domain) {
      case 'makeup-studio':
        return 'border-pink-200 hover:border-pink-300';
      case 'perfume-boutique':
        return 'border-purple-200 hover:border-purple-300';
      case 'vitamin-wellness':
        return 'border-green-200 hover:border-green-300';
      default:
        return 'border-gray-200 hover:border-gray-300';
    }
  }, []);

  // Get stock status badge
  const getStockBadge = useCallback(() => {
    if (!inventoryStatus.inStock) {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Out of Stock
        </Badge>
      );
    }
    
    if (inventoryStatus.stockLevel <= inventoryStatus.lowStockThreshold) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Low Stock
        </Badge>
      );
    }

    return (
      <Badge className="bg-green-100 text-green-700 border-green-200">
        <Check className="w-3 h-3 mr-1" />
        In Stock
      </Badge>
    );
  }, [inventoryStatus]);

  // Get current price (considering variants)
  const getCurrentPrice = useCallback(() => {
    if (selectedVariant && product.variants) {
      const variant = product.variants.find(v => v.id === selectedVariant);
      return variant?.price || product.price;
    }
    return product.price;
  }, [product, selectedVariant]);

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
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-yellow-500 text-white border-0">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {getStockBadge()}
        </div>

        {/* Bundle indicator */}
        {bundleContext?.recommendedBundles.some(bundle => 
          bundle.itemIds.includes(product.id)
        ) && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-blue-500 text-white">Bundle Available</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            {product.brand && (
              <p className="text-sm text-gray-500">{product.brand}</p>
            )}
          </div>
          <span className="text-xl font-bold text-gray-900">{getCurrentPrice()}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Product details */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Package className="w-4 h-4" />
            <span>{product.category}</span>
          </div>
          {product.reviews && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{product.reviews.averageRating} ({product.reviews.totalReviews})</span>
            </div>
          )}
        </div>

        {/* Variant selection */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-4">
            <Select value={selectedVariant} onValueChange={setSelectedVariant}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {variant.name} - {variant.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {showAddToCart && (
            <Button 
              onClick={handleAddToCart}
              disabled={!inventoryStatus.inStock}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {inventoryStatus.inStock ? 'Add to Cart' : 'Out of Stock'}
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
        src={product.imageUrl} 
        alt={product.name}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-gray-900">{getCurrentPrice()}</span>
            {getStockBadge()}
          </div>
        </div>
      </div>
      {showAddToCart && inventoryStatus.inStock && (
        <Button size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  const renderDetailedMode = () => (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-64 rounded-lg object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
          {product.brand && (
            <p className="text-lg text-gray-600 mb-2">{product.brand}</p>
          )}
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Price:</span>
              <span className="font-semibold">{getCurrentPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Category:</span>
              <span className="font-semibold">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Stock:</span>
              {getStockBadge()}
            </div>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Variant:
              </label>
              <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose variant" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.name} - {variant.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {product.details && (
            <div className="space-y-3 mb-4">
              {product.details.benefits && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Benefits:</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {product.details.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              {product.details.ingredients && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Key Ingredients:</h4>
                  <p className="text-sm text-gray-600">
                    {product.details.ingredients.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {showAddToCart && (
            <Button 
              onClick={handleAddToCart} 
              disabled={!inventoryStatus.inStock}
              className="w-full"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {inventoryStatus.inStock ? 'Add to Cart' : 'Out of Stock'}
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
          src={product.imageUrl} 
          alt={product.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.brand} • {getCurrentPrice()}</p>
        </div>
        <div className="text-right">
          {getStockBadge()}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`${dynamicClassName} ${getDomainStyling(product.domain)} ${className}`}
      style={{ ...inlineStyles, ...cssVariables }}
    >
      {renderContent()}
    </div>
  );
};

export default ProductContainer;

