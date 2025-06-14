
import React from 'react';
import { Button } from '@/components/ui/button';
import { Scissors, Palette, Sparkles, Crown } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: "Hair Cuts & Styling",
      description: "Professional cuts for all ages, from children's first haircuts to trendy adult styles. Blowouts, updos, and special occasion styling.",
      icon: Scissors,
      image: "/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png",
      features: ["Kids & Adult Cuts", "Blowouts & Styling", "Special Occasion Updos", "Curls & Texture"]
    },
    {
      title: "Hair Coloring",
      description: "From subtle highlights to bold transformations. Root touch-ups, full color, balayage, and color corrections by experienced colorists.",
      icon: Palette,
      image: "/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png",
      features: ["Highlights & Lowlights", "Full Color", "Balayage", "Color Correction"]
    },
    {
      title: "Makeup & Lashes",
      description: "Professional makeup for weddings, special events, and everyday looks. Expert lash extensions and eyebrow threading services.",
      icon: Crown,
      image: "/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png",
      features: ["Bridal Makeup", "Lash Extensions", "Eyebrow Threading", "Special Events"]
    },
    {
      title: "Specialty Services",
      description: "Unique cultural beauty services including henna tattoo artistry and specialized treatments for diverse beauty traditions.",
      icon: Sparkles,
      image: "/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png",
      features: ["Henna Tattoo Artistry", "Cultural Beauty Services", "Eyebrow Shaping", "Special Occasion Packages"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stone-900 mb-6 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Our Services</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            From everyday maintenance to special occasions, we offer comprehensive beauty services 
            for the whole family in a welcoming, multicultural environment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
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
                  <h3 className="text-xl font-semibold text-white tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-stone-600 mb-4">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                      <span className="text-sm text-stone-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800">
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
