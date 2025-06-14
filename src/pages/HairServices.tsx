
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Star, Clock, Phone, Palette, Users, ArrowRight, Play, Heart, Shield, Sparkles } from 'lucide-react';

const HairServices = () => {
  const customerJourneys = [
    {
      title: 'Your Color Story',
      subtitle: 'From vision to reality',
      persona: 'Color Enthusiasts',
      image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      description: 'Whether you\'re going bold for the first time or maintaining your signature look',
      link: '/hair-services/color-journey'
    },
    {
      title: 'Perfect Cuts for You',
      subtitle: 'Style that fits your life',
      persona: 'Every Personality',
      image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      description: 'From busy professionals to style adventurers - your perfect cut awaits',
      link: '/hair-services/precision-cuts'
    },
    {
      title: 'Family Care',
      subtitle: 'Gentle moments together',
      persona: 'Multi-Generational Families',
      image: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      description: 'Creating special bonding experiences for seniors and their loved ones',
      link: '/hair-services/senior-care'
    }
  ];

  const personalizedServices = [
    {
      icon: Heart,
      title: 'Children\'s First Cuts',
      subtitle: 'Gentle care for little ones',
      description: 'Making haircuts fun and stress-free for kids and parents',
      price: 'Starting at $25',
      link: '/hair-services/childrens-services'
    },
    {
      icon: Shield,
      title: 'Privacy & Modesty',
      subtitle: 'Respectful care with discretion',
      description: 'Private booth with secondary entrance for cultural comfort',
      price: 'Starting at $45',
      link: '/hair-services/privacy-services'
    },
    {
      icon: Sparkles,
      title: 'Styling & Finishing',
      subtitle: 'Complete your transformation',
      description: 'From everyday blowouts to special occasion elegance',
      price: 'Starting at $25',
      link: '/hair-services/styling-services'
    }
  ];

  const expertiseAreas = [
    {
      title: 'Balayage Artistry',
      expertise: 'Hand-painted dimension',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: 'Starting at $110',
      link: '/hair-services/balayage'
    },
    {
      title: 'Color Correction',
      expertise: 'Expert problem-solving',
      image: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=400&h=300&fit=crop',
      price: 'Consultation $35',
      link: '/hair-services/color-correction'
    },
    {
      title: 'Hair Extensions',
      expertise: 'Length & volume solutions',
      image: 'https://images.unsplash.com/photo-1506085452766-f3d992529149?w=400&h=300&fit=crop',
      price: 'Starting at $150',
      link: '/hair-services/extensions'
    },
    {
      title: 'Hair Treatments',
      expertise: 'Restoration & health',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: 'Starting at $35',
      link: '/hair-services/hair-treatments'
    },
    {
      title: 'Chemical Services',
      expertise: 'Texture transformation',
      image: 'https://images.unsplash.com/photo-1616847220575-1b875cea11dd?w=400&h=300&fit=crop',
      price: 'Consultation Required',
      link: '/hair-services/chemical-services'
    },
    {
      title: 'Root Touch-Ups',
      expertise: 'Seamless maintenance',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: 'Starting at $65',
      link: '/hair-services/root-touch-up'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <div className="text-center">
              <div className="text-3xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Your Hair Journey
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Personalized Care • Expert Artistry • Family Salon Since 2010</div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-red-700 hover:bg-red-800">
                <Phone className="w-4 h-4 mr-2" />
                (732) 613-1942
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-7xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
              This Is About You
            </h1>
            <p className="text-2xl text-stone-600 max-w-4xl mx-auto mb-8">
              Your story • Your style • Your comfort • Your needs
            </p>
            <p className="text-lg text-stone-500 max-w-3xl mx-auto">
              Whether you're 5 or 95, seeking privacy or celebration, wanting subtle change or dramatic transformation - 
              we craft experiences that honor who you are and where you're going.
            </p>
          </div>

          {/* Personal Journey Categories */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {customerJourneys.map((journey, index) => (
              <Link key={index} to={journey.link} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={journey.image} 
                      alt={journey.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        For {journey.persona}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-medium mb-1">{journey.title}</h3>
                      <p className="text-white/80 text-sm">{journey.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-stone-600 mb-4">{journey.description}</p>
                    <div className="flex items-center text-red-600 font-medium group-hover:text-red-700">
                      <span>Start your journey</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Care Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              We See You
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Every person who walks through our doors has unique needs, comfort levels, and dreams. 
              We've designed specialized services to honor exactly who you are.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {personalizedServices.map((service, index) => (
              <Link key={index} to={service.link} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-red-50 rounded-xl">
                      <service.icon className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-stone-800">{service.title}</h3>
                      <p className="text-stone-500 text-sm">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-stone-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-medium">{service.price}</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Our Areas of Expertise
            </h2>
            <p className="text-lg text-stone-600">Specialized techniques and advanced training in every service</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {expertiseAreas.map((service, index) => (
              <Link key={index} to={service.link} className="group">
                <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-stone-700 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {service.expertise}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-2">{service.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 font-medium">{service.price}</span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-12 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              What Makes Your Experience Special
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <Users className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Family Salon Heritage</h4>
                <p className="text-stone-600 text-sm">Serving three generations with care, respect, and understanding since 2010</p>
              </div>
              
              <div className="text-center p-6">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Personal Attention</h4>
                <p className="text-stone-600 text-sm">Every service begins with listening - understanding your lifestyle, preferences, and goals</p>
              </div>
              
              <div className="text-center p-6">
                <Shield className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Comfort & Privacy</h4>
                <p className="text-stone-600 text-sm">From private entrances to gentle techniques - your comfort is our foundation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Your Journey Starts Here
          </h3>
          <p className="text-xl mb-8 text-red-100">
            Book a consultation and let's discover what's perfect for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 px-12 py-4 text-lg">
              Book Your Personal Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
          </div>
          <p className="text-red-200 mt-6">
            Walk-ins welcome • All ages • All hair types • All comfort levels respected
          </p>
        </div>
      </section>
    </div>
  );
};

export default HairServices;
