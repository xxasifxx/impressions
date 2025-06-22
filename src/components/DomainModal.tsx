
import React from 'react';
import { X, ArrowRight, Star, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UnifiedService } from '@/data/unifiedServicesData';
import { DomainTheme } from '@/utils/domainThemes';
import { useServiceCart } from '@/contexts/ServiceCartContext';
import AppointmentBookingModal from './AppointmentBookingModal';

interface DomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  services: UnifiedService[];
  theme: DomainTheme;
}

const DomainModal = ({ isOpen, onClose, domain, services, theme }: DomainModalProps) => {
  const { addToCart } = useServiceCart();

  const getDomainTitle = (domain: string) => {
    switch (domain) {
      case 'hair-salon': return 'Hair Salon Experience';
      case 'makeup-studio': return 'Makeup Studio Collection';
      case 'med-spa': return 'Med Spa Journey';
      default: return 'Services';
    }
  };

  const getDomainDescription = (domain: string) => {
    switch (domain) {
      case 'hair-salon': return 'Transform your look with our expert cuts, colors, and treatments';
      case 'makeup-studio': return 'Enhance your natural beauty with professional makeup artistry';
      case 'med-spa': return 'Rejuvenate and refresh with our holistic wellness treatments';
      default: return 'Premium beauty services';
    }
  };

  const featuredServices = services.filter(s => s.featured).slice(0, 3);
  const otherServices = services.filter(s => !s.featured);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <div 
          className="relative h-64 flex items-center justify-center text-center"
          style={{ 
            background: theme.backgroundImage,
            fontFamily: theme.fonts.body
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="max-w-2xl px-8">
            <h2 
              className="text-5xl font-light mb-4"
              style={{ 
                fontFamily: theme.fonts.heading,
                color: theme.colors.primary 
              }}
            >
              {getDomainTitle(domain)}
            </h2>
            <p 
              className="text-xl opacity-90"
              style={{ 
                color: theme.colors.text,
                fontFamily: theme.fonts.accent
              }}
            >
              {getDomainDescription(domain)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Featured Services - Portfolio Style */}
          {featuredServices.length > 0 && (
            <section className="mb-12">
              <h3 
                className="text-3xl font-light mb-8 text-center"
                style={{ 
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.primary
                }}
              >
                Featured Services
              </h3>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {featuredServices.map((service, index) => (
                  <div 
                    key={service.id}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-yellow-500 text-white border-0">
                          Featured
                        </Badge>
                        {service.difficulty && (
                          <Badge variant="outline" className="border-white/50 text-white">
                            {service.difficulty}
                          </Badge>
                        )}
                      </div>
                      
                      <h4 className="text-2xl font-semibold mb-2">{service.name}</h4>
                      <p className="text-sm opacity-90 mb-3 line-clamp-2">{service.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-bold text-lg">{service.price}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => addToCart(service)}
                            className="bg-white text-black hover:bg-gray-100"
                          >
                            Add to Cart
                          </Button>
                          <AppointmentBookingModal
                            trigger={
                              <Button 
                                size="sm"
                                style={{ 
                                  backgroundColor: theme.colors.primary,
                                  color: 'white'
                                }}
                              >
                                Book Now
                              </Button>
                            }
                            prefilledService={{
                              name: service.name,
                              price: service.price,
                              duration: service.duration
                            }}
                            sourcePage={`modal-${domain}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All Services - Elegant Grid */}
          <section>
            <h3 
              className="text-3xl font-light mb-8 text-center"
              style={{ 
                fontFamily: theme.fonts.heading,
                color: theme.colors.primary
              }}
            >
              Complete Service Menu
            </h3>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {otherServices.map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h4 
                        className="text-lg font-medium"
                        style={{ color: theme.colors.primary }}
                      >
                        {service.name}
                      </h4>
                      <div className="text-right">
                        <div className="font-bold text-lg" style={{ color: theme.colors.primary }}>
                          {service.price}
                        </div>
                        <div className="text-xs text-gray-500">{service.duration}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    {service.clientStory && (
                      <div 
                        className="rounded-lg p-3 mb-4 border"
                        style={{ 
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.primary + '20'
                        }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < service.clientStory!.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 italic">
                          "{service.clientStory.quote}"
                        </p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => addToCart(service)}
                        style={{ 
                          borderColor: theme.colors.primary,
                          color: theme.colors.primary
                        }}
                      >
                        Add to Cart
                      </Button>
                      <AppointmentBookingModal
                        trigger={
                          <Button 
                            size="sm"
                            className="flex-1"
                            style={{ 
                              backgroundColor: theme.colors.primary,
                              color: 'white'
                            }}
                          >
                            Book Now
                          </Button>
                        }
                        prefilledService={{
                          name: service.name,
                          price: service.price,
                          duration: service.duration
                        }}
                        sourcePage={`modal-${domain}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DomainModal;
