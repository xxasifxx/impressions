
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Shield, Waves, Zap } from 'lucide-react';

const ChemicalServices = () => {
  const services = [
    {
      title: 'Digital Perms',
      description: 'Modern perming technique for natural-looking waves and curls',
      image: 'https://images.unsplash.com/photo-1616847220575-1b875cea11dd?w=400&h=300&fit=crop',
      price: '$120+',
      duration: '2-3 hours',
      lasting: '4-6 months',
      benefits: ['Natural wave patterns', 'Low maintenance', 'Heat activated curls']
    },
    {
      title: 'Keratin Treatments',
      description: 'Smoothing treatment that reduces frizz and adds shine',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$200+',
      duration: '3-4 hours',
      lasting: '3-4 months',
      benefits: ['Frizz reduction', 'Easier styling', 'Added shine', 'Smoother texture']
    },
    {
      title: 'Brazilian Blowout',
      description: 'Professional smoothing treatment for unmanageable hair',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=400&h=300&fit=crop',
      price: '$250+',
      duration: '2-3 hours',
      lasting: '3-4 months',
      benefits: ['Eliminates frizz', 'Cuts drying time', 'Weather resistant']
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Hair Analysis & Consultation',
      description: 'Thorough assessment of hair condition, texture, and previous chemical treatments',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '30 minutes'
    },
    {
      step: 2,
      title: 'Pre-Treatment Preparation',
      description: 'Clarifying shampoo and protective measures to prepare hair for chemical processing',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '20 minutes'
    },
    {
      step: 3,
      title: 'Chemical Application',
      description: 'Precise application of chemical treatment with careful monitoring',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '1-2 hours'
    },
    {
      step: 4,
      title: 'Processing & Neutralization',
      description: 'Careful processing time followed by neutralization and conditioning',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '45 minutes'
    }
  ];

  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Hair Health Priority',
      description: 'We never compromise hair integrity for results'
    },
    {
      icon: Zap,
      title: 'Patch Testing',
      description: 'Allergy testing before any chemical service'
    },
    {
      icon: Waves,
      title: 'Expert Application',
      description: 'Certified stylists with advanced chemical training'
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
                Chemical Services
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Perms • Relaxers • Smoothing Treatments</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Consultation
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Transform Your Hair's Texture
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Professional chemical services to create lasting changes in your hair's structure and manageability
            </p>
          </div>

          {/* Safety Notice */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-violet-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-violet-800 mb-2">Safety & Consultation First</h3>
                  <p className="text-violet-700 leading-relaxed">
                    All chemical services require a thorough consultation. We assess your hair's condition, 
                    previous treatments, and desired results to ensure the safest, most effective service possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chemical Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Our Chemical Services
            </h2>
            <p className="text-lg text-stone-600">Expert treatments for lasting hair transformation</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-violet-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{service.title}</h3>
                    <span className="text-lg font-bold text-violet-600">{service.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Waves className="w-4 h-4" />
                      <span>Lasts {service.lasting}</span>
                    </div>
                  </div>
                  <div className="space-y-1 mb-6">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 text-sm text-stone-600">
                        <div className="w-1.5 h-1.5 bg-violet-600 rounded-full"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-violet-600 hover:bg-violet-700">
                    Book Consultation
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
              Our Chemical Service Process
            </h2>
            <p className="text-lg text-stone-600">Careful, methodical approach to ensure optimal results</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
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

      {/* Safety Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Your Safety is Our Priority
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="p-6">
                  <feature.icon className="w-8 h-8 text-violet-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-stone-800 mb-3">{feature.title}</h4>
                  <p className="text-stone-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Aftercare Section */}
      <section className="py-16 bg-violet-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Post-Treatment Care
            </h3>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-stone-800 mb-4">First 48 Hours</h4>
                  <ul className="space-y-2 text-stone-600">
                    <li>• Avoid washing hair</li>
                    <li>• No ponytails or clips</li>
                    <li>• Sleep on silk pillowcase</li>
                    <li>• Avoid getting hair wet</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-stone-800 mb-4">Long-term Care</h4>
                  <ul className="space-y-2 text-stone-600">
                    <li>• Use sulfate-free products</li>
                    <li>• Deep condition weekly</li>
                    <li>• Protect from heat styling</li>
                    <li>• Schedule regular touch-ups</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready to Transform Your Hair?
          </h3>
          <p className="text-xl mb-8 text-violet-100">
            Book a consultation to discuss your hair transformation goals
          </p>
          <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 px-12 py-4 text-lg">
            Schedule Chemical Service Consultation - $25
          </Button>
          <p className="text-violet-200 mt-4 text-sm">
            * Consultation fee applied to service cost
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChemicalServices;
