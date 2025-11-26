import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { getProductionConfig } from '@/config/production';

const ServicesGrid = () => {
  const whatsappNumber = getProductionConfig().contact.whatsapp;
  
  const services = [
    {
      icon: "💇‍♀️",
      title: "Hair Styling",
      description: "Professional cuts, colors, and styling for every occasion",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      whatsappMessage: "Hi! I'm interested in hair styling services from Impressions."
    },
    {
      icon: "💄",
      title: "Makeup Artistry",
      description: "Expert makeup application for events, photoshoots, and special occasions",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      whatsappMessage: "Hi! I'm interested in makeup artistry services from Impressions."
    },
    {
      icon: "✨",
      title: "Skincare",
      description: "Personalized skincare treatments and consultations",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      whatsappMessage: "Hi! I'm interested in skincare services from Impressions."
    },
    {
      icon: "👰",
      title: "Bridal Beauty",
      description: "Complete bridal packages for your special day",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      whatsappMessage: "Hi! I'm interested in bridal beauty services from Impressions."
    },
    {
      icon: "🌟",
      title: "Makeover",
      description: "Complete transformation and style consultation",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      whatsappMessage: "Hi! I'm interested in makeover services from Impressions."
    },
    {
      icon: "💅",
      title: "Nail Care",
      description: "Professional manicures, pedicures, and nail art",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      whatsappMessage: "Hi! I'm interested in nail care services from Impressions."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-rose-50 to-pink-100">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Beauty Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional beauty services tailored to enhance your natural beauty and boost your confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-rose-200 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-3xl">{service.icon}</span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white group"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Book on WhatsApp
                  </Button>
                </a>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-rose-500/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <span className="text-4xl mb-2 block">{service.icon}</span>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm opacity-90">Click to book on WhatsApp</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
