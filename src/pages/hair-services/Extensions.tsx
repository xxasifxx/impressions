
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Ruler, Palette } from 'lucide-react';

const Extensions = () => {
  const [selectedType, setSelectedType] = useState('tape-in');

  const extensionTypes = {
    'tape-in': {
      title: 'Tape-In Extensions',
      description: 'Semi-permanent extensions that last 6-8 weeks',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=400&fit=crop',
      duration: '2-3 hours',
      price: 'Starting at $250',
      benefits: ['Natural look', 'Reusable', 'Comfortable wear', 'Easy maintenance']
    },
    'clip-in': {
      title: 'Clip-In Extensions',
      description: 'Temporary extensions perfect for special occasions',
      image: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=600&h=400&fit=crop',
      duration: '30-45 minutes',
      price: 'Starting at $150',
      benefits: ['Instant length', 'Damage-free', 'DIY friendly', 'Cost effective']
    },
    'fusion': {
      title: 'Fusion Extensions',
      description: 'Long-lasting extensions bonded with keratin',
      image: 'https://images.unsplash.com/photo-1506085452766-f3d992529149?w=600&h=400&fit=crop',
      duration: '3-4 hours',
      price: 'Starting at $400',
      benefits: ['4-6 month wear', 'Natural movement', 'Heat styleable', 'Secure attachment']
    }
  };

  const transformations = [
    {
      before: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=400&fit=crop',
      type: 'Length & Volume',
      description: 'Bob to long layers transformation'
    },
    {
      before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=300&h=400&fit=crop',
      type: 'Color Enhancement',
      description: 'Added highlights with extensions'
    },
    {
      before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1506085452766-f3d992529149?w=300&h=400&fit=crop',
      type: 'Volume Boost',
      description: 'Fine hair to full, voluminous style'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Hair Assessment & Consultation',
      description: 'We evaluate your natural hair, discuss your goals, and recommend the best extension type',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '20 minutes'
    },
    {
      step: 2,
      title: 'Color Matching & Selection',
      description: 'Perfect color matching ensures seamless blending with your natural hair',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '15 minutes'
    },
    {
      step: 3,
      title: 'Professional Application',
      description: 'Expert application using techniques that protect your natural hair',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '1-4 hours'
    },
    {
      step: 4,
      title: 'Styling & Blending',
      description: 'Custom cutting and styling to create a natural, seamless look',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '30-45 minutes'
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
                Hair Extensions Studio
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Length • Volume • Transformation</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Extension Consultation
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Transform Your Hair Instantly
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Professional hair extensions for length, volume, and endless style possibilities
            </p>
          </div>

          {/* Extension Type Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {Object.entries(extensionTypes).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedType === key
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>

          {/* Selected Extension Type */}
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-light mb-4 text-stone-800">{extensionTypes[selectedType].title}</h2>
                <p className="text-lg text-stone-600 mb-6">{extensionTypes[selectedType].description}</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-stone-700">Application time: {extensionTypes[selectedType].duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span className="text-stone-700">{extensionTypes[selectedType].price}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {extensionTypes[selectedType].benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-stone-600 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={extensionTypes[selectedType].image} 
                  alt={extensionTypes[selectedType].title}
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Extension Transformations
            </h2>
            <p className="text-lg text-stone-600">See the dramatic difference extensions can make</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {transformations.map((transformation, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
                  <div className="grid grid-cols-2 h-80">
                    <div className="relative">
                      <img src={transformation.before} alt="Before extensions" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-stone-800/80 text-white px-2 py-1 rounded text-xs">Before</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img src={transformation.after} alt="After extensions" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-purple-600/80 text-white px-2 py-1 rounded text-xs">After</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-stone-800 mb-1">{transformation.type}</h3>
                  <p className="text-stone-600 text-sm">{transformation.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              The Extension Process
            </h2>
            <p className="text-lg text-stone-600">Professional application for beautiful, natural results</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
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

      {/* Extension Care */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Caring for Your Extensions
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <Palette className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Gentle Products</h4>
                <p className="text-stone-600">Use sulfate-free shampoos and avoid heavy conditioners at roots</p>
              </div>
              <div className="p-6">
                <Ruler className="w-8 h-8 text-pink-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Proper Brushing</h4>
                <p className="text-stone-600">Use extension-safe brushes and brush from bottom to top</p>
              </div>
              <div className="p-6">
                <Star className="w-8 h-8 text-stone-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Regular Maintenance</h4>
                <p className="text-stone-600">Schedule maintenance appointments for optimal longevity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready for Your Extension Journey?
          </h3>
          <p className="text-xl mb-8 text-purple-100">
            Transform your hair with professional extensions
          </p>
          <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 px-12 py-4 text-lg">
            Book Extension Consultation - $35
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Extensions;
