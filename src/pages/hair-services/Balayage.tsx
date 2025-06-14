
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Palette, Heart } from 'lucide-react';

const Balayage = () => {
  const processSteps = [
    {
      step: 1,
      title: 'Hair Analysis & Consultation',
      description: 'We assess your natural color, hair texture, and desired look to create a custom balayage plan',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '15 minutes'
    },
    {
      step: 2,
      title: 'Sectioning & Placement',
      description: 'Strategic sectioning ensures natural-looking highlights that complement your face shape',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '20 minutes'
    },
    {
      step: 3,
      title: 'Hand-Painted Application',
      description: 'Freehand painting technique creates seamless color transitions and natural dimension',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '45-60 minutes'
    },
    {
      step: 4,
      title: 'Processing & Toning',
      description: 'Careful monitoring and custom toning achieve your perfect shade',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '30-45 minutes'
    }
  ];

  const transformations = [
    {
      before: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=400&fit=crop',
      description: 'Brunette to Honey Balayage'
    },
    {
      before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=300&h=400&fit=crop',
      description: 'Dark to Caramel Highlights'
    },
    {
      before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1506085452766-f3d992529149?w=300&h=400&fit=crop',
      description: 'Blonde Dimension Enhancement'
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
                Balayage Artistry
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Hand-Painted Highlights • Natural Dimension</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Balayage - $110+
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              The Art of Balayage
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              French for "to sweep," balayage creates natural-looking highlights through hand-painted precision
            </p>
          </div>

          {/* Featured Transformation */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=600&fit=crop" 
                alt="Balayage transformation"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-light mb-4">Seamless Color Transitions</h2>
                <p className="text-lg text-white/90">Each stroke is carefully placed to mimic natural sun-kissed highlights</p>
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
              Balayage Transformations
            </h2>
            <p className="text-lg text-stone-600">See how hand-painted highlights can transform your look</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {transformations.map((transformation, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <div className="grid grid-cols-2 h-80">
                    <div className="relative">
                      <img src={transformation.before} alt="Before" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-stone-800/80 text-white px-2 py-1 rounded text-xs">Before</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img src={transformation.after} alt="After" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-amber-600/80 text-white px-2 py-1 rounded text-xs">After</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-medium text-stone-800">{transformation.description}</h3>
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
              The Balayage Process
            </h2>
            <p className="text-lg text-stone-600">Every balayage is custom-crafted for your unique hair and style</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
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

      {/* Why Choose Balayage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Why Choose Balayage?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Natural Looking</h4>
                <p className="text-stone-600">No harsh lines or obvious regrowth - grows out beautifully</p>
              </div>
              <div className="p-6">
                <Palette className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Customizable</h4>
                <p className="text-stone-600">Tailored placement and intensity for your unique style</p>
              </div>
              <div className="p-6">
                <Star className="w-8 h-8 text-stone-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Low Maintenance</h4>
                <p className="text-stone-600">Touch-ups needed every 3-4 months instead of 6-8 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready for Your Balayage Journey?
          </h3>
          <p className="text-xl mb-8 text-amber-100">
            Experience the artistry of hand-painted highlights
          </p>
          <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 px-12 py-4 text-lg">
            Book Balayage Consultation - $25
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Balayage;
