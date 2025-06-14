
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, Clock, Star, ChevronRight, Play } from 'lucide-react';

const ColorJourney = () => {
  const [selectedColorType, setSelectedColorType] = useState('highlights');

  const colorProcessSteps = [
    {
      step: 1,
      title: 'Consultation & Color Analysis',
      description: 'We analyze your skin tone, lifestyle, and vision to create your perfect color palette',
      image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      duration: '15-20 minutes'
    },
    {
      step: 2,
      title: 'Color Formulation',
      description: 'Custom mixing professional color formulas specific to your hair and desired outcome',
      image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      duration: '10 minutes'
    },
    {
      step: 3,
      title: 'Application & Processing',
      description: 'Precise application techniques ensuring even coverage and beautiful results',
      image: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      duration: '45-90 minutes'
    },
    {
      step: 4,
      title: 'The Reveal & Style',
      description: 'Professional finishing touches that bring your new color to life',
      image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      duration: '30 minutes'
    }
  ];

  const colorTypes = {
    highlights: {
      title: 'Highlights & Dimension',
      description: 'Add brightness and depth with strategically placed highlights',
      beforeAfter: [
        { before: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png', after: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png' },
        { before: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png', after: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png' }
      ],
      price: 'Starting at $95',
      techniques: ['Foil Highlights', 'Balayage', 'Baby Lights', 'Color Melting']
    },
    fullcolor: {
      title: 'Complete Color Transformation',
      description: 'Dramatic changes that redefine your entire look',
      beforeAfter: [
        { before: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png', after: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png' },
        { before: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png', after: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png' }
      ],
      price: 'Starting at $85',
      techniques: ['All-Over Color', 'Color Correction', 'Fashion Colors', 'Root Touch-ups']
    }
  };

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
                The Color Journey
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Professional Hair Coloring Experience</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Consultation
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Your Color Story
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              From consultation to final reveal, experience the artistry of professional hair coloring
            </p>
          </div>

          {/* Color Type Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {Object.entries(colorTypes).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setSelectedColorType(key)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedColorType === key
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>

          {/* Selected Color Type Showcase */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light mb-4 text-stone-800">{colorTypes[selectedColorType].title}</h2>
              <p className="text-lg text-stone-600 mb-6">{colorTypes[selectedColorType].description}</p>
              <div className="text-2xl font-light text-red-600">{colorTypes[selectedColorType].price}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {colorTypes[selectedColorType].beforeAfter.map((transformation, index) => (
                <div key={index} className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                  <div className="flex h-64">
                    <div className="w-1/2 relative">
                      <img src={transformation.before} alt="Before" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-stone-800/80 text-white px-2 py-1 rounded text-xs">Before</span>
                      </div>
                    </div>
                    <div className="w-1/2 relative">
                      <img src={transformation.after} alt="After" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-red-600/80 text-white px-2 py-1 rounded text-xs">After</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-4 text-center">
              {colorTypes[selectedColorType].techniques.map((technique, index) => (
                <div key={index} className="p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                  <Palette className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <span className="text-sm text-stone-700">{technique}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              The Professional Process
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Every color transformation follows our proven process for consistent, beautiful results
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {colorProcessSteps.map((step, index) => (
              <div key={index} className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-stone-800">{step.title}</h3>
                      <div className="flex items-center gap-2 text-stone-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-stone-600 text-lg leading-relaxed">{step.description}</p>
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src={step.image} alt={step.title} className="w-full h-80 object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Start Your Color Journey
          </h3>
          <p className="text-xl mb-8 text-red-100">
            Book a color consultation and discover your perfect shade
          </p>
          <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 px-12 py-4 text-lg">
            Schedule Color Consultation - $25
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ColorJourney;
