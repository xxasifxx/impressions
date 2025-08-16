
import React from 'react';
import { X, ArrowRight, Star, Clock, Scissors, Palette, Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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

const HairSalonModal = ({ services, onClose }: { services: UnifiedService[], onClose: () => void }) => {
  const { addToCart } = useServiceCart();

  return (
    <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white min-h-[80vh]">
      {/* Dramatic Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="h-80 bg-cover bg-center relative"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")' }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-800/50 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-3 mb-4">
              <Scissors className="w-8 h-8 text-white" />
              <span className="text-white/80 text-lg font-light">HAIR SALON</span>
            </div>
            <h1 className="text-6xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Transform Your Look
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Master craftsmanship meets modern artistry. Where every cut tells a story.
            </p>
          </div>
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className="bg-yellow-500 text-black py-4 text-center">
        <div className="container mx-auto px-4">
          <span className="font-bold text-lg">NEW CLIENT SPECIAL: </span>
          <span className="text-lg">Cut + Style $45 (Save $15)</span>
        </div>
      </div>

      {/* Services in Elegant Layout */}
      <div className="container mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={service.id} className="group">
              <div className="flex gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                  <img 
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-light" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {service.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">{service.price}</div>
                      <div className="text-sm text-white/70">{service.duration}</div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToCart(service)}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Add to Cart
                    </Button>
                    <AppointmentBookingModal
                      trigger={
                        <Button 
                          size="sm"
                          className="bg-yellow-500 text-black hover:bg-yellow-400"
                        >
                          Book Now
                        </Button>
                      }
                      prefilledService={{
                        name: service.name,
                        price: service.price,
                        duration: service.duration
                      }}
                      sourcePage="hair-salon-modal"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MakeupStudioModal = ({ services, onClose }: { services: UnifiedService[], onClose: () => void }) => {
  const { addToCart } = useServiceCart();

  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 min-h-[80vh]">
      {/* Artistic Header */}
      <div className="relative">
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")' }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
          >
            <X className="w-6 h-6 text-pink-600" />
          </button>
          
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 via-purple-500/60 to-pink-400/80" />
          
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div>
              <Palette className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-7xl font-light mb-6" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Makeup Artistry
              </h1>
              <p className="text-2xl font-light max-w-2xl">
                Where beauty meets art, and every face becomes a canvas of dreams
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dreamy Services Grid */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-pink-800 mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Our Signature Collections
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-pink-400 to-purple-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-medium text-pink-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    {service.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-3xl font-light text-pink-600">{service.price}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {service.clientStory && (
                  <div className="bg-pink-50 rounded-2xl p-4 mb-6 border border-pink-100">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < service.clientStory!.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "{service.clientStory.quote}"
                    </p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => addToCart(service)}
                    className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50"
                  >
                    Add to Cart
                  </Button>
                  <AppointmentBookingModal
                    trigger={
                      <Button 
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                      >
                        Book Session
                      </Button>
                    }
                    prefilledService={{
                      name: service.name,
                      price: service.price,
                      duration: service.duration
                    }}
                    sourcePage="makeup-studio-modal"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MedSpaModal = ({ services, onClose }: { services: UnifiedService[], onClose: () => void }) => {
  const { addToCart } = useServiceCart();

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-[80vh]">
      {/* Zen Header */}
      <div className="relative">
        <div 
          className="h-80 bg-cover bg-center relative"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
          >
            <X className="w-6 h-6 text-emerald-600" />
          </button>
          
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-600/40 to-emerald-400/30" />
          
          <div className="absolute bottom-12 left-12 right-12 text-center text-white">
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-6xl font-light mb-4" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Holistic Wellness
            </h1>
            <p className="text-xl font-light max-w-3xl mx-auto">
              Ancient wisdom meets modern innovation in our sanctuary of natural beauty and healing
            </p>
          </div>
        </div>
      </div>

      {/* Wellness Philosophy */}
      <div className="bg-white/60 backdrop-blur-sm border-y border-emerald-100">
        <div className="container mx-auto px-8 py-8 text-center">
          <p className="text-lg text-emerald-800 font-light max-w-4xl mx-auto">
            "True beauty radiates from within. Our treatments harmonize mind, body, and spirit to unveil your natural luminescence."
          </p>
        </div>
      </div>

      {/* Organic Services */}
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div key={service.id} className={`flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className="w-1/3">
                <div className="aspect-square rounded-full overflow-hidden shadow-2xl">
                  <img 
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              <div className="w-2/3">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-emerald-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-light text-emerald-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                      {service.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-3xl font-light text-emerald-600">{service.price}</div>
                      <div className="text-sm text-gray-500">{service.duration}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => addToCart(service)}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      Add to Journey
                    </Button>
                    <AppointmentBookingModal
                      trigger={
                        <Button 
                          className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          Begin Treatment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      }
                      prefilledService={{
                        name: service.name,
                        price: service.price,
                        duration: service.duration
                      }}
                      sourcePage="med-spa-modal"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DomainModal = ({ isOpen, onClose, domain, services, theme }: DomainModalProps) => {
  const renderDomainContent = () => {
    switch (domain) {
      case 'hair-salon':
        return <HairSalonModal services={services} onClose={onClose} />;
      case 'makeup-studio':
        return <MakeupStudioModal services={services} onClose={onClose} />;
      case 'med-spa':
        return <MedSpaModal services={services} onClose={onClose} />;
      default:
        return <div>Domain not found</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0 bg-transparent border-0">
        <div className="overflow-y-auto max-h-[95vh] rounded-2xl overflow-hidden shadow-2xl">
          {renderDomainContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DomainModal;
