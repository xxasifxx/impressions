
import React from 'react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [
    {
      title: "Hair Styling & Cuts",
      description: "Professional haircuts, styling, and creative color treatments",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Makeup Services",
      description: "Special occasion makeup, bridal packages, and makeup lessons",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Facial Treatments",
      description: "Rejuvenating facials, anti-aging treatments, and skincare consultations",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Spa Packages",
      description: "Complete wellness experiences combining multiple services",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">What We Offer</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our comprehensive range of beauty and wellness services designed to help you look and feel your best.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 mb-4">{service.description}</p>
              <Button variant="outline" className="w-full">Learn More</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
