
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Star, Users, ChevronRight } from 'lucide-react';

const CutsStyling = () => {
  const [selectedCategory, setSelectedCategory] = useState('women');

  const categories = {
    women: {
      title: "Women's Cuts & Styling",
      services: [
        {
          name: 'Precision Cut & Style',
          price: '$45-65',
          description: 'Consultation, wash, cut, and professional styling',
          image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
          styles: ['Layered cuts', 'Bobs', 'Pixie cuts', 'Long layers']
        },
        {
          name: 'Blowout & Style',
          price: '$35',
          description: 'Professional wash, blow-dry, and styling',
          image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
          styles: ['Smooth & sleek', 'Voluminous', 'Beachy waves', 'Curly definition']
        },
        {
          name: 'Special Occasion Styling',
          price: '$75-95',
          description: 'Elegant updos and formal styling',
          image: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
          styles: ['Wedding updos', 'Prom styles', 'Formal events', 'Party looks']
        }
      ]
    },
    men: {
      title: "Men's Grooming",
      services: [
        {
          name: 'Classic Men\'s Cut',
          price: '$35-45',
          description: 'Professional cut with styling and finish',
          image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
          styles: ['Business professional', 'Modern fade', 'Classic cuts', 'Beard trimming']
        },
        {
          name: 'Father & Son Package',
          price: '$65',
          description: 'Bonding haircut experience for dads and sons',
          image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
          styles: ['Matching styles', 'Individual preferences', 'Family photos', 'Memory making']
        }
      ]
    },
    kids: {
      title: "Children's Hair Care",
      services: [
        {
          name: 'Kids First Haircut',
          price: '$25',
          description: 'Gentle introduction to salon experience',
          image: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
          styles: ['Comfort-focused', 'Photo memories', 'Certificate included', 'Parent participation']
        },
        {
          name: 'Children\'s Cut & Style',
          price: '$25-30',
          description: 'Age-appropriate cuts and fun styling',
          image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
          styles: ['School-appropriate', 'Easy maintenance', 'Fun accessories', 'Character styles']
        }
      ]
    }
  };

  const transformationStories = [
    {
      title: 'The Bold Chop',
      description: 'From long to liberation - dramatic length changes that transform confidence',
      before: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      after: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      testimonial: '"I never thought I could pull off short hair until Maria showed me the possibilities."'
    },
    {
      title: 'Professional Polish',
      description: 'Refining your look for career advancement and personal confidence',
      before: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      after: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      testimonial: '"The perfect cut for my new job - professional yet still uniquely me."'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/hair-services" className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Hair Services</span>
            </Link>
            
            <div className="text-center">
              <div className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Cuts & Styling
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Precision Cuts for Every Style</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Your Cut
            </Button>
          </div>
        </div>
      </header>

      {/* Hero with Transformation Stories */}
      <section className="py-20 bg-gradient-to-br from-stone-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              The Art of the Cut
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-12">
              Every cut tells a story • From subtle trims to dramatic transformations • 
              Discover how the right cut can change everything
            </p>
          </div>

          {/* Transformation Stories */}
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            {transformationStories.map((story, index) => (
              <div key={index} className="group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
                  <div className="flex h-80">
                    <div className="w-1/2 relative">
                      <img src={story.before} alt="Before cut" className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-stone-800/80 text-white px-3 py-1 rounded-full text-sm">Before</span>
                      </div>
                    </div>
                    <div className="w-1/2 relative">
                      <img src={story.after} alt="After cut" className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-red-600/80 text-white px-3 py-1 rounded-full text-sm">After</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-medium text-stone-800 mb-3">{story.title}</h3>
                <p className="text-stone-600 mb-4">{story.description}</p>
                <blockquote className="text-stone-500 italic border-l-4 border-red-600 pl-4">
                  {story.testimonial}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Services for Every Style
            </h2>
            <div className="flex justify-center gap-4">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-6 py-3 rounded-full transition-all ${
                    selectedCategory === key
                      ? 'bg-red-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-12 text-stone-800">
              {categories[selectedCategory].title}
            </h3>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {categories[selectedCategory].services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-medium text-stone-800">{service.name}</h4>
                      <span className="text-lg font-bold text-red-600">{service.price}</span>
                    </div>
                    <p className="text-stone-600 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.styles.map((style, styleIndex) => (
                        <div key={styleIndex} className="flex items-center gap-2 text-sm text-stone-500">
                          <Scissors className="w-3 h-3" />
                          <span>{style}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-6 bg-red-600 hover:bg-red-700">
                      Book This Service
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Family Experience */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              A Salon for the Whole Family
            </h3>
            <p className="text-lg text-stone-600 mb-8">
              From children's first haircuts to grandparents' styling, we've been serving families for over a decade
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Family Packages</h4>
                <p className="text-stone-600 text-sm">Special pricing for family appointments</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-12 h-12 text-amber-500 mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Memory Making</h4>
                <p className="text-stone-600 text-sm">First haircut certificates and photos</p>
              </div>
              <div className="flex flex-col items-center">
                <Scissors className="w-12 h-12 text-stone-600 mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">All Ages Welcome</h4>
                <p className="text-stone-600 text-sm">Toddlers to seniors, everyone's comfortable</p>
              </div>
            </div>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 px-12 py-4 text-lg">
              Book Family Appointment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CutsStyling;
