
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
      features: ["Kids & Adult Cuts", "Blowouts & Styling", "Special Occasion Updos", "Curls & Texture"],
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Hair Coloring",
      description: "From subtle highlights to bold transformations. Root touch-ups, full color, balayage, and color corrections by experienced colorists.",
      icon: Palette,
      image: "/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png",
      features: ["Highlights & Lowlights", "Full Color", "Balayage", "Color Correction"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Makeup & Lashes",
      description: "Professional makeup for weddings, special events, and everyday looks. Expert lash extensions and eyebrow threading services.",
      icon: Crown,
      image: "/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png",
      features: ["Bridal Makeup", "Lash Extensions", "Eyebrow Threading", "Special Events"],
      gradient: "from-rose-500 to-orange-500"
    },
    {
      title: "Specialty Services",
      description: "Unique cultural beauty services including henna tattoo artistry and specialized treatments for diverse beauty traditions.",
      icon: Sparkles,
      image: "/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png",
      features: ["Henna Tattoo Artistry", "Cultural Beauty Services", "Eyebrow Shaping", "Special Occasion Packages"],
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-white via-stone-50 to-amber-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4 md:mb-8 tracking-wide animate-fade-in" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Our Services</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-400 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed px-4">
            From everyday maintenance to special occasions, we offer comprehensive beauty services 
            for the whole family in a welcoming, multicultural environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-stone-100">
              <div className="relative overflow-hidden h-48 md:h-56">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500`}></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex items-center space-x-3">
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white tracking-wide drop-shadow-lg" style={{ fontFamily: 'Fleur De Leah, cursive' }}>{service.title}</h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-stone-600 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">{service.description}</p>
                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3 group/feature hover:bg-stone-50 p-2 rounded-lg transition-colors duration-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full group-hover/feature:scale-125 transition-transform duration-300`}></div>
                      <span className="text-sm md:text-base text-stone-600 group-hover/feature:text-stone-800 transition-colors duration-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-xl text-white py-3 text-base md:text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105`}
                >
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
