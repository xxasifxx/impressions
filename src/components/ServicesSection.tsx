
import React from 'react';
import { Button } from '@/components/ui/button';
import { Scissors, Palette, Sparkles, Crown } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: "Hair Cuts & Styling",
      description: "Professional cuts for all ages, from children's first haircuts to trendy adult styles. Blowouts, updos, and special occasion styling.",
      icon: Scissors,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Kids & Adult Cuts", "Blowouts", "Special Occasion Styling", "Beard Trims"]
    },
    {
      title: "Hair Coloring",
      description: "From subtle highlights to bold transformations. Root touch-ups, full color, balayage, and color corrections by experienced colorists.",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Highlights & Lowlights", "Full Color", "Balayage", "Color Correction"]
    },
    {
      title: "Makeup Services",
      description: "Professional makeup for weddings, special events, and everyday looks. Bridal packages available with trial sessions.",
      icon: Crown,
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Bridal Makeup", "Special Events", "Makeup Lessons", "Lash Application"]
    },
    {
      title: "Skincare & Facials",
      description: "Rejuvenating facial treatments, deep cleansing, anti-aging treatments, and skincare consultations for healthy, glowing skin.",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Deep Cleansing Facials", "Anti-Aging Treatments", "Skincare Consultation", "Eyebrow Shaping"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Services</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From everyday maintenance to special occasions, we offer comprehensive beauty services 
            for the whole family in a welcoming, multicultural environment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-4">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50">
                  Learn More & Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
