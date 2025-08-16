import React from 'react';
import { Sparkles, User, Zap, Award } from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BeautyBenefitsSection: React.FC = () => {
  const benefits: Benefit[] = [
    {
      id: 'confidence',
      title: 'Renewed Confidence',
      description: 'Discover services that enhance your natural beauty and boost your confidence.',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: 'personalized',
      title: 'Personalized Experience',
      description: 'Receive recommendations tailored specifically to your unique needs and preferences.',
      icon: <User className="w-6 h-6" />
    },
    {
      id: 'transformation',
      title: 'Complete Transformation',
      description: 'Experience a holistic approach to beauty that considers all aspects of your appearance.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'expertise',
      title: 'Expert Guidance',
      description: 'Benefit from professional recommendations across hair, makeup, and skincare.',
      icon: <Award className="w-6 h-6" />
    }
  ];
  
  return (
    <section className="benefits-section py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-4 text-stone-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          Your Beauty Journey Begins Here
        </h2>
        
        <p className="text-center text-stone-600 max-w-2xl mx-auto mb-12 font-light">
          Our consultation will guide you to the perfect combination of services across all our specialties.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(benefit => (
            <div 
              key={benefit.id}
              className="benefit-card bg-gradient-to-br from-stone-50 to-stone-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200/50"
            >
              <div className="icon-container mb-4 text-red-500 bg-red-50 w-12 h-12 rounded-full flex items-center justify-center">
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-medium mb-2 text-stone-800">
                {benefit.title}
              </h3>
              
              <p className="text-stone-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyBenefitsSection;

