import React, { useCallback } from 'react';
import { Star, Clock, Users, ArrowRight, Play, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DomainMarketingContent, MarketingService, MarketingProduct } from '@/data/marketingContent';

export interface DomainMarketingContainerProps {
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa' | 'perfume-boutique' | 'vitamin-wellness';
  marketingContent: DomainMarketingContent;
  onConsultationStart: () => void;
  onServiceExplore: (serviceId: string) => void;
  onProductExplore?: (productId: string) => void;
  className?: string;
}

export const DomainMarketingContainer: React.FC<DomainMarketingContainerProps> = ({
  domain,
  marketingContent,
  onConsultationStart,
  onServiceExplore,
  onProductExplore,
  className = ''
}) => {
  // Get domain-specific styling
  const getDomainTheme = useCallback(() => {
    switch (domain) {
      case 'hair-salon':
        return {
          primary: 'from-red-500 to-pink-600',
          secondary: 'bg-red-50 border-red-200',
          accent: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'makeup-studio':
        return {
          primary: 'from-pink-500 to-purple-600',
          secondary: 'bg-pink-50 border-pink-200',
          accent: 'text-pink-600',
          button: 'bg-pink-600 hover:bg-pink-700'
        };
      case 'med-spa':
        return {
          primary: 'from-emerald-500 to-teal-600',
          secondary: 'bg-emerald-50 border-emerald-200',
          accent: 'text-emerald-600',
          button: 'bg-emerald-600 hover:bg-emerald-700'
        };
      case 'perfume-boutique':
        return {
          primary: 'from-purple-500 to-indigo-600',
          secondary: 'bg-purple-50 border-purple-200',
          accent: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      case 'vitamin-wellness':
        return {
          primary: 'from-green-500 to-emerald-600',
          secondary: 'bg-green-50 border-green-200',
          accent: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700'
        };
      default:
        return {
          primary: 'from-gray-500 to-gray-600',
          secondary: 'bg-gray-50 border-gray-200',
          accent: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  }, [domain]);

  const theme = getDomainTheme();

  const renderHeroSection = () => (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${marketingContent.hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {marketingContent.hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {marketingContent.hero.subtitle}
        </p>
        <Button
          size="lg"
          onClick={onConsultationStart}
          className={`${theme.button} text-white px-8 py-4 text-lg font-semibold rounded-full hover:scale-105 transition-all duration-300`}
        >
          <Play className="w-5 h-5 mr-2" />
          {marketingContent.hero.ctaText}
        </Button>
      </div>
    </section>
  );

  const renderFeaturesSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {marketingContent.features.map((feature) => (
            <div
              key={feature.id}
              className={`
                p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-lg
                ${feature.highlight ? theme.secondary : 'bg-gray-50 border border-gray-200'}
              `}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`text-xl font-bold mb-4 ${feature.highlight ? theme.accent : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderServicesSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600">
            Professional treatments tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketingContent.services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              theme={theme}
              onExplore={() => onServiceExplore(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );

  const renderProductsSection = () => {
    if (!marketingContent.products || marketingContent.products.length === 0) {
      return null;
    }

    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Premium products for your beauty routine
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingContent.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                theme={theme}
                onExplore={() => onProductExplore?.(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderTestimonialsSection = () => (
    <section className={`py-20 bg-gradient-to-r ${theme.primary}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketingContent.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-white"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{testimonial.name}</span>
                {testimonial.service && (
                  <Badge variant="secondary" className="bg-white bg-opacity-20">
                    {testimonial.service}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderGallerySection = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Our Work
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingContent.gallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderCTASection = () => (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Start with a personalized consultation to discover what's perfect for you
        </p>
        <Button
          size="lg"
          onClick={onConsultationStart}
          className={`${theme.button} text-white px-8 py-4 text-lg font-semibold rounded-full hover:scale-105 transition-all duration-300`}
        >
          <Play className="w-5 h-5 mr-2" />
          Start Your Consultation
        </Button>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen ${className}`}>
      {renderHeroSection()}
      {renderFeaturesSection()}
      {renderServicesSection()}
      {renderProductsSection()}
      {renderTestimonialsSection()}
      {renderGallerySection()}
      {renderCTASection()}
    </div>
  );
};

// Service Card Component
const ServiceCard: React.FC<{
  service: MarketingService;
  theme: any;
  onExplore: () => void;
}> = ({ service, theme, onExplore }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
    <div className="relative h-48 overflow-hidden">
      <img
        src={service.imageUrl}
        alt={service.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {service.popular && (
        <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
          Popular
        </Badge>
      )}
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
        <span className="text-2xl font-bold text-gray-900">{service.price}</span>
      </div>
      <p className="text-gray-600 mb-4">{service.description}</p>
      {service.duration && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>{service.duration}</span>
        </div>
      )}
      <Button
        onClick={onExplore}
        className={`w-full ${theme.button} text-white`}
      >
        <Eye className="w-4 h-4 mr-2" />
        Learn More
      </Button>
    </div>
  </div>
);

// Product Card Component
const ProductCard: React.FC<{
  product: MarketingProduct;
  theme: any;
  onExplore?: () => void;
}> = ({ product, theme, onExplore }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
    <div className="relative h-48 overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {product.featured && (
        <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
          Featured
        </Badge>
      )}
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
        </div>
        <span className="text-2xl font-bold text-gray-900">{product.price}</span>
      </div>
      <p className="text-gray-600 mb-4">{product.description}</p>
      {onExplore && (
        <Button
          onClick={onExplore}
          className={`w-full ${theme.button} text-white`}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          View Product
        </Button>
      )}
    </div>
  </div>
);

export default DomainMarketingContainer;

