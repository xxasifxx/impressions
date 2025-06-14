
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Heart, Star, Gift, Camera, Shield } from 'lucide-react';

const FamilyCare = () => {
  const familyServices = [
    {
      title: 'Children\'s First Haircut Experience',
      price: '$25',
      description: 'A gentle, memorable introduction to salon care with special touches',
      features: ['Comfort-focused approach', 'First haircut certificate', 'Photo memories', 'Lock of hair keepsake'],
      image: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png'
    },
    {
      title: 'Father & Son/Daughter Bonding',
      price: '$65',
      description: 'Share the salon experience with matching or complementary styles',
      features: ['Simultaneous appointments', 'Memory-making experience', 'Photo session included', 'Special father-child pricing'],
      image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png'
    },
    {
      title: 'Mother & Daughter Styling',
      price: '$75+',
      description: 'Bonding time with coordinated or individual styling preferences',
      features: ['Quality time together', 'Style consultations for both', 'Special occasion preparation', 'Memory photos'],
      image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png'
    },
    {
      title: 'Multi-Generational Appointments',
      price: 'Custom pricing',
      description: 'Grandparents, parents, and children all together for family styling',
      features: ['Extended appointment times', 'Family discounts applied', 'Group photo session', 'Celebration of family traditions'],
      image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png'
    }
  ];

  const familyValues = [
    {
      icon: Heart,
      title: 'Inclusive Environment',
      description: 'A welcoming space where every family member feels comfortable and valued'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Child-safe products and gentle techniques for our youngest clients'
    },
    {
      icon: Camera,
      title: 'Memory Making',
      description: 'Capturing special moments with complimentary photos of milestone haircuts'
    },
    {
      icon: Gift,
      title: 'Special Touches',
      description: 'Certificates, keepsakes, and small surprises to make visits memorable'
    }
  ];

  const testimonials = [
    {
      quote: "Three generations of our family come here. My grandmother, my mother, and now my daughter all have their hair done at Impressions. It's become our tradition.",
      author: "Sarah M.",
      relationship: "Multi-generational client"
    },
    {
      quote: "My son's first haircut was such a special experience. They made him comfortable, took photos, and gave us a certificate. We'll treasure these memories forever.",
      author: "Jennifer K.",
      relationship: "Mother of first-time client"
    },
    {
      quote: "As a single dad, I wasn't sure how to handle my daughter's hair needs. The staff here has been so patient and helpful in teaching me how to care for her curls.",
      author: "Marcus T.",
      relationship: "Father and daughter duo"
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
                Family Hair Care
              </div>
              <div className="text-xs text-stone-500 tracking-wide">A Salon for the Whole Family Since 2010</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Family Time
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Generations of Beauty
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
              For over a decade, we've been more than a salon - we're part of your family's story • 
              Creating memories and traditions that span generations
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600" />
                <span>Family-Owned Business</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-600" />
                <span>Serving All Ages</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Creating Memories Since 2010</span>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png" 
                  alt="Family styling session"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-medium mb-2">Mother & Daughter Styling</h3>
                  <p className="text-white/80 text-sm">Bonding through beauty, creating lasting memories</p>
                </div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
                  alt="Multi-generational appointment"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-medium mb-2">Three Generations Together</h3>
                  <p className="text-white/80 text-sm">Grandmother, mother, and daughter - all in one visit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Special Family Experiences
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              More than just haircuts - we create experiences that bring families together and mark life's special moments
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {familyServices.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-stone-50 to-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium text-stone-800">{service.title}</h3>
                    <span className="text-xl font-bold text-red-600">{service.price}</span>
                  </div>
                  <p className="text-stone-600 mb-6">{service.description}</p>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-stone-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Book This Experience
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Values */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Our Family Values
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              What makes our salon special for families
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {familyValues.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <value.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-stone-800 mb-3">{value.title}</h3>
                <p className="text-stone-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Family Stories
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-lg">
                <blockquote className="text-stone-700 italic mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-right">
                  <div className="font-medium text-stone-800">{testimonial.author}</div>
                  <div className="text-stone-500 text-sm">{testimonial.relationship}</div>
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
            Become Part of Our Family
          </h3>
          <p className="text-xl mb-8 text-red-100">
            Start your family's beauty story with us - book your first family appointment today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 px-12 py-4 text-lg">
              Book Family Appointment
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
          </div>
          <p className="text-red-200 mt-6">Walk-ins welcome • Family discounts available • Creating memories since 2010</p>
        </div>
      </section>
    </div>
  );
};

export default FamilyCare;
