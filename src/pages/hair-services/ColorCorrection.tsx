
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, AlertTriangle, Palette, Shield } from 'lucide-react';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

const ColorCorrection = () => {
  const correctionScenarios = [
    {
      title: 'Brassy Blonde Fix',
      before: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=300&h=400&fit=crop',
      issue: 'Orange/yellow tones from previous bleaching',
      solution: 'Professional toning and color balancing'
    },
    {
      title: 'Uneven Color Repair',
      before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=400&fit=crop',
      issue: 'Patchy, uneven color from DIY attempts',
      solution: 'Strategic color placement and blending'
    },
    {
      title: 'Damaged Hair Recovery',
      before: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1506085452766-f3d992529149?w=300&h=400&fit=crop',
      issue: 'Over-processed, brittle hair from multiple treatments',
      solution: 'Gentle correction with intensive conditioning'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Damage Assessment',
      description: 'Thorough analysis of current color, hair condition, and previous chemical treatments',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '20-30 minutes'
    },
    {
      step: 2,
      title: 'Correction Planning',
      description: 'Custom strategy developed based on your hair\'s needs and desired outcome',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '15 minutes'
    },
    {
      step: 3,
      title: 'Gentle Correction Process',
      description: 'Careful application using professional techniques to minimize further damage',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '2-4 hours'
    },
    {
      step: 4,
      title: 'Conditioning Treatment',
      description: 'Deep conditioning and protein treatments to restore hair health',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '30 minutes'
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
                Color Correction Experts
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Professional Color Repair • Hair Restoration</div>
            </div>
            
            <AppointmentBookingModal
              trigger={
                <Button size="sm" className="bg-red-700 hover:bg-red-800">
                  Book Consultation
                </Button>
              }
              prefilledService={{
                name: "Color Correction Consultation",
                price: "$35",
                duration: "45 minutes"
              }}
              sourcePage="color-correction-header"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Color Correction Specialists
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              When color goes wrong, we make it right. Expert correction for all hair color mishaps.
            </p>
          </div>

          {/* Warning Notice */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-amber-800 mb-2">Important Color Correction Notice</h3>
                  <p className="text-amber-700 leading-relaxed">
                    Color correction is a complex process that may require multiple sessions. Severely damaged hair may need 
                    time to recover between treatments. We prioritize hair health above all else and will create a plan 
                    that protects your hair's integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Correction Scenarios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Common Correction Scenarios
            </h2>
            <p className="text-lg text-stone-600">We've seen it all and can fix it all</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {correctionScenarios.map((scenario, index) => (
              <div key={index} className="bg-stone-50 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative">
                  <div className="grid grid-cols-2 h-64">
                    <div className="relative">
                      <img src={scenario.before} alt="Before correction" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-red-600/80 text-white px-2 py-1 rounded text-xs">Problem</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img src={scenario.after} alt="After correction" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-green-600/80 text-white px-2 py-1 rounded text-xs">Fixed</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-stone-800 mb-3">{scenario.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-red-600">Issue:</span>
                      <p className="text-stone-600 text-sm">{scenario.issue}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-green-600">Solution:</span>
                      <p className="text-stone-600 text-sm">{scenario.solution}</p>
                    </div>
                  </div>
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
              Our Correction Process
            </h2>
            <p className="text-lg text-stone-600">Methodical approach to safe, effective color correction</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
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

      {/* What We Can Fix */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-12 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              What We Can Correct
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <Palette className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-medium text-stone-800 mb-2">Brassy Tones</h4>
                <p className="text-stone-600 text-sm">Yellow, orange undertones</p>
              </div>
              <div className="text-center p-4">
                <Shield className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-medium text-stone-800 mb-2">Uneven Color</h4>
                <p className="text-stone-600 text-sm">Patchy, streaky results</p>
              </div>
              <div className="text-center p-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <h4 className="font-medium text-stone-800 mb-2">Over-Processing</h4>
                <p className="text-stone-600 text-sm">Damaged, brittle hair</p>
              </div>
              <div className="text-center p-4">
                <Clock className="w-8 h-8 text-stone-600 mx-auto mb-3" />
                <h4 className="font-medium text-stone-800 mb-2">Faded Color</h4>
                <p className="text-stone-600 text-sm">Dull, lifeless results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Need Color Correction?
          </h3>
          <p className="text-xl mb-8 text-orange-100">
            Don't let a color mishap ruin your confidence. We're here to help.
          </p>
          <AppointmentBookingModal
            trigger={
              <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-50 px-12 py-4 text-lg">
                Schedule Correction Consultation - $35
              </Button>
            }
            prefilledService={{
              name: "Color Correction Consultation",
              price: "$35",
              duration: "45 minutes"
            }}
            sourcePage="color-correction-cta"
          />
          <p className="text-orange-200 mt-4 text-sm">
            * Consultation fee applied to service cost
          </p>
        </div>
      </section>
    </div>
  );
};

export default ColorCorrection;
