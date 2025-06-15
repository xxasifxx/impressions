import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, Palette, RefreshCw } from 'lucide-react';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

const RootTouchUp = () => {
  const touchUpOptions = [
    {
      title: 'Quick Root Touch-Up',
      description: 'Perfect for maintaining your color between full appointments',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$65',
      duration: '45 minutes',
      coverage: '1-2 inch regrowth'
    },
    {
      title: 'Root & Refresh',
      description: 'Root touch-up plus gloss to refresh your overall color',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$85',
      duration: '75 minutes',
      coverage: 'Roots + color refresh'
    },
    {
      title: 'Gray Coverage',
      description: 'Specialized root coverage for stubborn gray hair',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=400&h=300&fit=crop',
      price: '$75',
      duration: '60 minutes',
      coverage: 'Complete gray coverage'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Root Assessment',
      description: 'We evaluate your regrowth and match your existing color perfectly',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '10 minutes'
    },
    {
      step: 2,
      title: 'Color Mixing',
      description: 'Custom color formula mixed to match your current shade exactly',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '10 minutes'
    },
    {
      step: 3,
      title: 'Precise Application',
      description: 'Careful application only to new growth for seamless blending',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '20 minutes'
    },
    {
      step: 4,
      title: 'Processing & Finish',
      description: 'Processing time followed by professional rinse and style',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '30 minutes'
    }
  ];

  const beforeAfters = [
    {
      before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=400&fit=crop',
      type: 'Blonde Maintenance',
      weeks: '6 weeks regrowth'
    },
    {
      before: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=300&h=400&fit=crop',
      type: 'Gray Coverage',
      weeks: '4 weeks regrowth'
    },
    {
      before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=300&h=400&fit=crop',
      type: 'Brunette Touch-Up',
      weeks: '5 weeks regrowth'
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
                Root Touch-Up Services
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Quick Color Refresh • Perfect Maintenance</div>
            </div>
            
            <AppointmentBookingModal
              trigger={
                <Button size="sm" className="bg-red-700 hover:bg-red-800">
                  Book Touch-Up - $65+
                </Button>
              }
              prefilledService={{
                name: "Root Touch-Up Service",
                price: "$65+",
                duration: "45-75 minutes"
              }}
              sourcePage="root-touch-up-header"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Perfect Root Maintenance
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Keep your color looking fresh with professional root touch-up services between full color appointments
            </p>
          </div>

          {/* Quick Service Highlight */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Zap className="w-8 h-8 text-emerald-600" />
                <h2 className="text-2xl font-light text-stone-800">Quick & Convenient</h2>
              </div>
              <p className="text-center text-stone-600 text-lg">
                Most root touch-ups completed in under an hour - perfect for busy schedules
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Touch-Up Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Root Touch-Up Options
            </h2>
            <p className="text-lg text-stone-600">Choose the perfect maintenance service for your needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {touchUpOptions.map((option, index) => (
              <div key={index} className="bg-emerald-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={option.image} alt={option.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{option.title}</h3>
                    <span className="text-lg font-bold text-emerald-600">{option.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{option.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span>{option.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <RefreshCw className="w-4 h-4" />
                      <span>{option.coverage}</span>
                    </div>
                  </div>
                  <AppointmentBookingModal
                    trigger={
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Book This Service
                      </Button>
                    }
                    prefilledService={{
                      name: option.title,
                      price: option.price,
                      duration: option.duration
                    }}
                    sourcePage={`root-touch-up-${option.title.toLowerCase().replace(/\s+/g, '-')}`}
                  />
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
              The Touch-Up Process
            </h2>
            <p className="text-lg text-stone-600">Efficient service without compromising quality</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
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

      {/* Before & After Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Touch-Up Transformations
            </h2>
            <p className="text-lg text-stone-600">See the difference a professional touch-up makes</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {beforeAfters.map((transformation, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
                  <div className="grid grid-cols-2 h-80">
                    <div className="relative">
                      <img src={transformation.before} alt="Before touch-up" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-stone-800/80 text-white px-2 py-1 rounded text-xs">Before</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img src={transformation.after} alt="After touch-up" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-emerald-600/80 text-white px-2 py-1 rounded text-xs">After</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-stone-800 mb-1">{transformation.type}</h3>
                  <p className="text-stone-600 text-sm">{transformation.weeks}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Between Touch-Ups
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Palette className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Color-Safe Products</h4>
                <p className="text-stone-600">Use sulfate-free shampoos to extend your color</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <RefreshCw className="w-8 h-8 text-teal-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Regular Schedule</h4>
                <p className="text-stone-600">Book touch-ups every 4-6 weeks for best results</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Zap className="w-8 h-8 text-stone-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Heat Protection</h4>
                <p className="text-stone-600">Always use heat protectant when styling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Updated to be more strategic */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready for Your Touch-Up?
          </h3>
          <p className="text-xl mb-8 text-emerald-100">
            Choose from our specialized root maintenance services above, or call for a consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
            <Link to="/hair-services">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 px-12 py-4 text-lg">
                Explore All Services
              </Button>
            </Link>
          </div>
          <p className="text-emerald-200 mt-6">Professional color maintenance • Quick 45-75 minute appointments</p>
        </div>
      </section>
    </div>
  );
};

export default RootTouchUp;
