import React from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  imageUrl: string;
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa' | 'cross-domain';
}

const UnifiedTestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'Sarah J.',
      quote: 'The consultation completely changed my approach to beauty. Instead of focusing on just my hair, I discovered how a complete look could transform my appearance.',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      domain: 'cross-domain'
    },
    {
      id: 'testimonial-2',
      name: 'Michael T.',
      quote: 'I was hesitant at first, but the personalized recommendations were spot on. My hair has never looked better, and the styling tips were exactly what I needed.',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      domain: 'hair-salon'
    },
    {
      id: 'testimonial-3',
      name: 'Emily R.',
      quote: 'The makeup artist understood exactly what I wanted for my wedding day. The consultation helped me articulate my vision, and the results were beyond my expectations.',
      imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      domain: 'makeup-studio'
    }
  ];
  
  return (
    <section className="testimonials-section py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-4 text-stone-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          Transformation Stories
        </h2>
        
        <p className="text-center text-stone-600 max-w-2xl mx-auto mb-12 font-light">
          See how our personalized approach has helped clients discover their most beautiful selves.
        </p>
        
        <div className="testimonial-carousel relative">
          {/* Navigation buttons */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow hidden md:block">
            <ChevronLeft className="h-6 w-6 text-stone-600" />
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow hidden md:block">
            <ChevronRight className="h-6 w-6 text-stone-600" />
          </button>
          
          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {testimonials.map(testimonial => (
              <div 
                key={testimonial.id}
                className="testimonial-card bg-gradient-to-br from-stone-50 to-stone-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200/50"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white shadow-sm">
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-stone-800">{testimonial.name}</h3>
                    <div className="text-sm text-red-500">
                      {testimonial.domain === 'cross-domain' 
                        ? 'Complete Transformation' 
                        : testimonial.domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-red-200 opacity-50" />
                  <blockquote className="text-stone-600 italic pl-4">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 gap-2">
            <button className="w-2 h-2 rounded-full bg-red-500"></button>
            <button className="w-2 h-2 rounded-full bg-stone-300"></button>
            <button className="w-2 h-2 rounded-full bg-stone-300"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedTestimonialsSection;

