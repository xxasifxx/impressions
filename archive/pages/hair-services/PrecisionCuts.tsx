
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Clock, Star, Users, Ruler } from 'lucide-react';

const PrecisionCuts = () => {
  const cutStyles = [
    {
      title: 'Classic Bob',
      description: 'Timeless precision cut that frames your face perfectly',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=400&h=500&fit=crop',
      price: '$45',
      duration: '45 minutes',
      bestFor: 'Professional settings, low maintenance'
    },
    {
      title: 'Layered Cut',
      description: 'Multi-dimensional layers that add movement and volume',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop',
      price: '$50',
      duration: '60 minutes',
      bestFor: 'Adding volume, face-framing'
    },
    {
      title: 'Pixie Cut',
      description: 'Bold, modern short cut that makes a statement',
      image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=500&fit=crop',
      price: '$55',
      duration: '50 minutes',
      bestFor: 'Low maintenance, edgy style'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Style Consultation',
      description: 'We discuss your lifestyle, hair type, and desired look to find your perfect cut',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '15 minutes'
    },
    {
      step: 2,
      title: 'Hair Analysis',
      description: 'Examination of your hair texture, growth patterns, and face shape',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '10 minutes'
    },
    {
      step: 3,
      title: 'Precision Cutting',
      description: 'Expert cutting techniques using professional tools for clean, sharp lines',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '30-45 minutes'
    },
    {
      step: 4,
      title: 'Styling & Finish',
      description: 'Professional blow-dry and styling to showcase your new cut',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '20 minutes'
    }
  ];

  const transformations = [
    {
      before: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=300&h=400&fit=crop',
      style: 'Long to Bob',
      description: 'Dramatic length change for a fresh look'
    },
    {
      before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=400&fit=crop',
      style: 'Layer Enhancement',
      description: 'Added movement and dimension'
    },
    {
      before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&h=400&fit=crop',
      style: 'Bold Pixie',
      description: 'Complete style transformation'
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
                Precision Cuts & Styling
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Expert Cuts • Professional Styling</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Cut - $45+
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Precision in Every Cut
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Expert cutting techniques that enhance your natural beauty and suit your lifestyle
            </p>
          </div>

          {/* Featured Cut Showcase */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&h=600&fit=crop" 
                alt="Precision hair cutting"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-light mb-4">Crafted with Precision</h2>
                <p className="text-lg text-white/90">Every angle, every line carefully considered for your perfect look</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cut Styles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Popular Cut Styles
            </h2>
            <p className="text-lg text-stone-600">Find the perfect cut for your face shape and lifestyle</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cutStyles.map((style, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img src={style.image} alt={style.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{style.title}</h3>
                    <span className="text-lg font-bold text-blue-600">{style.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{style.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span>{style.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Star className="w-4 h-4" />
                      <span>{style.bestFor}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Book This Cut
                  </Button>
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
              Our Cutting Process
            </h2>
            <p className="text-lg text-stone-600">From consultation to final style - your journey to the perfect cut</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
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

      {/* Transformation Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Cut Transformations
            </h2>
            <p className="text-lg text-stone-600">See the power of precision cutting</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {transformations.map((transformation, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
                  <div className="grid grid-cols-2 h-80">
                    <div className="relative">
                      <img src={transformation.before} alt="Before cut" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-stone-800/80 text-white px-2 py-1 rounded text-xs">Before</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img src={transformation.after} alt="After cut" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-blue-600/80 text-white px-2 py-1 rounded text-xs">After</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-stone-800 mb-1">{transformation.style}</h3>
                  <p className="text-stone-600 text-sm">{transformation.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Why Choose Our Precision Cuts?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <Scissors className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Expert Technique</h4>
                <p className="text-stone-600">Advanced cutting methods for precise, lasting results</p>
              </div>
              <div className="p-6">
                <Users className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Personal Consultation</h4>
                <p className="text-stone-600">Customized approach for your unique features and lifestyle</p>
              </div>
              <div className="p-6">
                <Ruler className="w-8 h-8 text-stone-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Perfect Proportions</h4>
                <p className="text-stone-600">Cuts designed to enhance your natural beauty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready for Your Perfect Cut?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Book your precision cut consultation today
          </p>
          <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-12 py-4 text-lg">
            Book Precision Cut - Starting at $45
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PrecisionCuts;
