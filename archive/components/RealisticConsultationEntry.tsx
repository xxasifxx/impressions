import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, ArrowRight, Clock, Target } from 'lucide-react';

interface RealisticConsultationEntryProps {
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
}

const RealisticConsultationEntry: React.FC<RealisticConsultationEntryProps> = ({ domain }) => {
  const domainConfig = {
    'hair-salon': {
      title: 'Hair Consultation',
      description: 'Find the perfect hair services for your needs',
      benefits: [
        'Personalized service recommendations',
        'Based on your specific goals',
        'Quick 2-minute conversation',
        'Direct booking integration'
      ],
      examples: [
        'Special events (weddings, dates)',
        'Regular maintenance needs', 
        'Hair transformations',
        'Hair health concerns'
      ]
    },
    'makeup-studio': {
      title: 'Makeup Consultation', 
      description: 'Discover the right makeup services for you',
      benefits: [
        'Tailored makeup recommendations',
        'Event-specific suggestions',
        'Beauty enhancement options',
        'Professional guidance'
      ],
      examples: [
        'Bridal & special events',
        'Lash extensions & brows',
        'Daily makeup looks',
        'Personal makeup lessons'
      ]
    },
    'med-spa': {
      title: 'Skin Consultation',
      description: 'Get personalized aesthetic treatment recommendations', 
      benefits: [
        'Skin-specific treatment plans',
        'Professional assessment',
        'Results-focused approach',
        'Maintenance scheduling'
      ],
      examples: [
        'Anti-aging treatments',
        'Acne & skin texture',
        'Hair removal services',
        'Regular skin maintenance'
      ]
    }
  };

  const config = domainConfig[domain];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <MessageCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              {config.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {config.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Benefits */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Why Take the Consultation?
                </h3>
              </div>
              <ul className="space-y-3">
                {config.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Examples */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Perfect For:
                </h3>
              </div>
              <ul className="space-y-3">
                {config.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{example}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Our quick consultation will help us recommend the perfect services for your specific needs and goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={`/${domain}/consultation`}>
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                
                <Link to={`/services?domain=${domain}`}>
                  <Button variant="outline" className="px-8 py-3">
                    Browse All Services
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Takes about 2 minutes • No commitment required
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealisticConsultationEntry;

