import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Heart, Shield, Sparkles, Palette, Scissors, Clock, Star } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const HairServices = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterCategories = [
    {
      id: 'all',
      title: 'All Services',
      subtitle: 'Everything we offer',
      icon: Star
    },
    {
      id: 'transformation',
      title: 'Transform Me',
      subtitle: 'Bold new looks',
      icon: Palette
    },
    {
      id: 'maintenance',
      title: 'Maintain My Look',
      subtitle: 'Keep it fresh',
      icon: Scissors
    },
    {
      id: 'special',
      title: 'Special Moments',
      subtitle: 'Important occasions',
      icon: Sparkles
    },
    {
      id: 'comfort',
      title: 'Comfort First',
      subtitle: 'Gentle & caring',
      icon: Heart
    }
  ];

  const allServices = [
    {
      id: 'balayage',
      title: 'Balayage',
      price: '$110+',
      description: 'Hand-painted highlights for natural dimension',
      categories: ['transformation', 'special'],
      link: '/hair-services/balayage',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          title: 'Natural Blonde Balayage',
          timeframe: '4-5 hours'
        },
        {
          before: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=350&h=250&fit=crop',
          title: 'Brunette Balayage',
          timeframe: '3-4 hours'
        }
      ],
      difficulty: 'Moderate' as const,
      duration: '3-5 hours',
      clientStory: {
        name: 'Sarah M.',
        quote: 'The balayage looked so natural, people thought I was born with highlights!',
        rating: 5
      },
      specialist: 'Maria'
    },
    {
      id: 'color-correction',
      title: 'Color Correction',
      price: '$85+',
      description: 'Fix previous color mishaps professionally',
      categories: ['transformation'],
      link: '/hair-services/color-correction',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'From Orange to Blonde',
          timeframe: '6-8 hours'
        }
      ],
      difficulty: 'Complex' as const,
      duration: '4-8 hours',
      clientStory: {
        name: 'Jessica L.',
        quote: 'They saved my hair from a DIY disaster. I will never go anywhere else!',
        rating: 5
      },
      specialist: 'David'
    },
    {
      id: 'precision-cuts',
      title: 'Precision Cuts',
      price: '$45+',
      description: 'Expert cutting for your face shape',
      categories: ['maintenance', 'transformation'],
      link: '/hair-services/precision-cuts',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=350&h=250&fit=crop',
          title: 'Modern Bob Cut',
          timeframe: '1 hour'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '45-60 minutes',
      clientStory: {
        name: 'Amanda K.',
        quote: 'Perfect cut that grows out beautifully. Worth every penny!',
        rating: 5
      },
      specialist: 'Lisa'
    },
    {
      id: 'root-touch',
      title: 'Root Touch-Up',
      price: '$65+',
      description: 'Keep your color looking fresh',
      categories: ['maintenance'],
      link: '/hair-services/root-touch-up',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'Root Refresh',
          timeframe: '2 hours'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '1.5-2 hours',
      specialist: 'Maria'
    },
    {
      id: 'extensions',
      title: 'Hair Extensions',
      price: '$150+',
      description: 'Add length and volume instantly',
      categories: ['transformation', 'special'],
      link: '/hair-services/extensions',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          title: 'Length & Volume',
          timeframe: '2-3 hours'
        }
      ],
      difficulty: 'Moderate' as const,
      duration: '2-3 hours',
      clientStory: {
        name: 'Rachel T.',
        quote: 'The extensions blend perfectly! No one can tell they are not my real hair.',
        rating: 5
      },
      specialist: 'Sofia'
    },
    {
      id: 'treatments',
      title: 'Hair Treatments',
      price: '$35+',
      description: 'Deep conditioning and repair',
      categories: ['maintenance'],
      link: '/hair-services/hair-treatments',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1616847220575-1b875cea11dd?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'Damage Repair',
          timeframe: '1 hour'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '30-60 minutes',
      specialist: 'Multiple'
    },
    {
      id: 'chemical',
      title: 'Chemical Services',
      price: 'Consult',
      description: 'Perms, relaxers, and texture changes',
      categories: ['transformation'],
      link: '/hair-services/chemical-services',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'Texture Transformation',
          timeframe: '3-4 hours'
        }
      ],
      difficulty: 'Complex' as const,
      duration: '3-5 hours',
      specialist: 'David'
    },
    {
      id: 'styling',
      title: 'Special Occasion Styling',
      price: '$55+',
      description: 'Elegant updos for your big day',
      categories: ['special'],
      link: '/hair-services/styling-services',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          title: 'Wedding Updo',
          timeframe: '2 hours'
        }
      ],
      difficulty: 'Moderate' as const,
      duration: '1.5-2 hours',
      specialist: 'Lisa'
    },
    {
      id: 'children',
      title: 'Children\'s Services',
      price: '$25+',
      description: 'Gentle cuts for little ones',
      categories: ['comfort'],
      link: '/hair-services/childrens-services',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=350&h=250&fit=crop',
          title: 'First Haircut',
          timeframe: '30 minutes'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '30-45 minutes',
      specialist: 'Sofia'
    },
    {
      id: 'senior',
      title: 'Senior Care',
      price: '$35+',
      description: 'Comfortable styling for seniors',
      categories: ['comfort'],
      link: '/hair-services/senior-care',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          title: 'Gentle Style',
          timeframe: '1 hour'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '45-60 minutes',
      specialist: 'Maria'
    },
    {
      id: 'privacy',
      title: 'Privacy Services',
      price: '$45+',
      description: 'Private suite for modesty',
      categories: ['comfort'],
      link: '/hair-services/privacy-services',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'Private Consultation',
          timeframe: '1-2 hours'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '1-2 hours',
      specialist: 'All'
    }
  ];

  const filteredServices = activeFilter === 'all' 
    ? allServices 
    : allServices.filter(service => service.categories.includes(activeFilter));

  const activeFilterData = filterCategories.find(cat => cat.id === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-800">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Hair Services
              </h1>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              <Phone className="w-4 h-4 mr-1" />
              Call Now
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Filter Navigation */}
        <div className="w-1/4 bg-gradient-to-br from-red-50 to-stone-50 p-6 border-r border-stone-200">
          <div className="sticky top-8">
            <h2 className="text-2xl font-light text-stone-800 mb-2" style={{ fontFamily: 'Imperial Script, cursive' }}>
              What Are You Looking For?
            </h2>
            <p className="text-stone-600 text-sm mb-6">
              Choose your hair goal
            </p>

            <div className="space-y-3">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 border ${
                    activeFilter === category.id
                      ? 'bg-white border-red-200 shadow-md'
                      : 'bg-white/50 border-transparent hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${
                      activeFilter === category.id ? 'bg-red-100' : 'bg-stone-100'
                    }`}>
                      <category.icon className={`w-4 h-4 ${
                        activeFilter === category.id ? 'text-red-600' : 'text-stone-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-800">{category.title}</h3>
                      <p className="text-xs text-stone-500">{category.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-8 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white">
              <h3 className="text-lg font-light mb-1" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Still Not Sure?
              </h3>
              <p className="text-xs text-red-100 mb-3">
                Book a consultation
              </p>
              <Button size="sm" className="bg-white text-red-700 hover:bg-red-50 w-full text-sm">
                Free Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Service Gallery */}
        <div className="flex-1 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-light text-stone-800 mb-2" style={{ fontFamily: 'Imperial Script, cursive' }}>
              {activeFilterData?.title}
            </h2>
            <p className="text-stone-600">{activeFilterData?.subtitle}</p>
            <p className="text-sm text-stone-500 mt-1">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                price={service.price}
                link={service.link}
                transformations={service.transformations}
                difficulty={service.difficulty}
                duration={service.duration}
                clientStory={service.clientStory}
                specialist={service.specialist}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500">No services match your current selection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HairServices;
