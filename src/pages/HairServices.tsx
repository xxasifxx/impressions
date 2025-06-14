
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Heart, Shield, Sparkles, Palette, Scissors, Clock, Star } from 'lucide-react';

const HairServices = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterCategories = [
    {
      id: 'all',
      title: 'All Services',
      subtitle: 'Everything we offer',
      icon: Star,
      description: 'Browse our complete range of hair services'
    },
    {
      id: 'transformation',
      title: 'Transform Me',
      subtitle: 'Bold new looks',
      icon: Palette,
      description: 'Ready for a dramatic change? From color corrections to complete makeovers'
    },
    {
      id: 'maintenance',
      title: 'Maintain My Look',
      subtitle: 'Keep it fresh',
      icon: Scissors,
      description: 'Touch-ups, trims, and treatments to keep your style perfect'
    },
    {
      id: 'special',
      title: 'Special Moments',
      subtitle: 'Important occasions',
      icon: Sparkles,
      description: 'Weddings, events, and celebrations deserve special attention'
    },
    {
      id: 'comfort',
      title: 'Comfort First',
      subtitle: 'Gentle & caring',
      icon: Heart,
      description: 'Services designed for children, seniors, and those seeking privacy'
    }
  ];

  const allServices = [
    {
      id: 'balayage',
      title: 'Balayage',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
      price: '$110+',
      description: 'Hand-painted highlights for natural dimension',
      categories: ['transformation', 'special'],
      link: '/hair-services/balayage'
    },
    {
      id: 'color-correction',
      title: 'Color Correction',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=350&h=250&fit=crop',
      price: '$85+',
      description: 'Fix previous color mishaps professionally',
      categories: ['transformation'],
      link: '/hair-services/color-correction'
    },
    {
      id: 'precision-cuts',
      title: 'Precision Cuts',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=350&h=250&fit=crop',
      price: '$45+',
      description: 'Expert cutting for your face shape',
      categories: ['maintenance', 'transformation'],
      link: '/hair-services/precision-cuts'
    },
    {
      id: 'root-touch',
      title: 'Root Touch-Up',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
      price: '$65+',
      description: 'Keep your color looking fresh',
      categories: ['maintenance'],
      link: '/hair-services/root-touch-up'
    },
    {
      id: 'extensions',
      title: 'Hair Extensions',
      image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=350&h=250&fit=crop',
      price: '$150+',
      description: 'Add length and volume instantly',
      categories: ['transformation', 'special'],
      link: '/hair-services/extensions'
    },
    {
      id: 'treatments',
      title: 'Hair Treatments',
      image: 'https://images.unsplash.com/photo-1616847220575-1b875cea11dd?w=350&h=250&fit=crop',
      price: '$35+',
      description: 'Deep conditioning and repair',
      categories: ['maintenance'],
      link: '/hair-services/hair-treatments'
    },
    {
      id: 'chemical',
      title: 'Chemical Services',
      image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=350&h=250&fit=crop',
      price: 'Consult',
      description: 'Perms, relaxers, and texture changes',
      categories: ['transformation'],
      link: '/hair-services/chemical-services'
    },
    {
      id: 'styling',
      title: 'Special Occasion Styling',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=350&h=250&fit=crop',
      price: '$55+',
      description: 'Elegant updos for your big day',
      categories: ['special'],
      link: '/hair-services/styling-services'
    },
    {
      id: 'children',
      title: 'Children\'s Services',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=350&h=250&fit=crop',
      price: '$25+',
      description: 'Gentle cuts for little ones',
      categories: ['comfort'],
      link: '/hair-services/childrens-services'
    },
    {
      id: 'senior',
      title: 'Senior Care',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=350&h=250&fit=crop',
      price: '$35+',
      description: 'Comfortable styling for seniors',
      categories: ['comfort'],
      link: '/hair-services/senior-care'
    },
    {
      id: 'privacy',
      title: 'Privacy Services',
      image: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=350&h=250&fit=crop',
      price: '$45+',
      description: 'Private suite for modesty',
      categories: ['comfort'],
      link: '/hair-services/privacy-services'
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
        <div className="w-1/3 bg-gradient-to-br from-red-50 to-stone-50 p-8 border-r border-stone-200">
          <div className="sticky top-8">
            <h2 className="text-3xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive' }}>
              What Are You Looking For?
            </h2>
            <p className="text-stone-600 mb-8">
              Choose what best describes your hair goals
            </p>

            <div className="space-y-4">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border-2 ${
                    activeFilter === category.id
                      ? 'bg-white border-red-200 shadow-lg'
                      : 'bg-white/50 border-transparent hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      activeFilter === category.id ? 'bg-red-100' : 'bg-stone-100'
                    }`}>
                      <category.icon className={`w-5 h-5 ${
                        activeFilter === category.id ? 'text-red-600' : 'text-stone-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-800 mb-1">{category.title}</h3>
                      <p className="text-sm text-stone-600 mb-2">{category.subtitle}</p>
                      <p className="text-xs text-stone-500">{category.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white">
              <h3 className="text-lg font-light mb-2" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Still Not Sure?
              </h3>
              <p className="text-sm text-red-100 mb-4">
                Book a consultation and let our experts guide you
              </p>
              <Button size="sm" className="bg-white text-red-700 hover:bg-red-50 w-full">
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
            <p className="text-stone-600">{activeFilterData?.description}</p>
            <p className="text-sm text-stone-500 mt-1">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <Link key={service.id} to={service.link} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-red-600">{service.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-2">{service.title}</h3>
                    <p className="text-stone-600 text-sm mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500">Starting at {service.price}</span>
                      <div className="text-red-600 group-hover:text-red-700">
                        <span className="text-sm font-medium">Learn More →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
