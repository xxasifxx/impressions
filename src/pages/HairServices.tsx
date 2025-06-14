
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Star, Clock, Phone, Palette, Users, ArrowRight, Play } from 'lucide-react';

const HairServices = () => {
  const heroTransformations = [
    {
      before: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      after: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      story: 'From Conservative to Bold'
    },
    {
      before: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      after: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      story: 'Dramatic Length Change'
    }
  ];

  const serviceStories = [
    {
      title: 'The Color Journey',
      subtitle: 'From first consultation to final reveal',
      image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      description: 'Every color transformation begins with understanding your vision and lifestyle',
      link: '/hair-services/color-journey'
    },
    {
      title: 'Cut & Style Evolution',
      subtitle: 'Precision cuts that define your personality',
      image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      description: 'From classic cuts to modern trends, discover your perfect style',
      link: '/hair-services/cuts-styling'
    },
    {
      title: 'Senior Care Services',
      subtitle: 'Gentle care and mother-daughter moments',
      image: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      description: 'Comfort, respect, and special bonding experiences for all generations',
      link: '/hair-services/senior-care'
    }
  ];

  const specializedServices = [
    {
      title: 'Balayage Artistry',
      subtitle: 'Hand-painted highlights for natural dimension',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: 'Starting at $110',
      link: '/hair-services/balayage'
    },
    {
      title: 'Color Correction',
      subtitle: 'Expert repair for color mishaps',
      image: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=400&h=300&fit=crop',
      price: 'Consultation $35',
      link: '/hair-services/color-correction'
    },
    {
      title: 'Hair Extensions',
      subtitle: 'Length, volume, and transformation',
      image: 'https://images.unsplash.com/photo-1506085452766-f3d992529149?w=400&h=300&fit=crop',
      price: 'Starting at $150',
      link: '/hair-services/extensions'
    },
    {
      title: 'Precision Cuts',
      subtitle: 'Expert cutting for every style',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=400&h=300&fit=crop',
      price: 'Starting at $45',
      link: '/hair-services/precision-cuts'
    },
    {
      title: 'Privacy Services',
      subtitle: 'Respectful care with complete discretion',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: 'Starting at $45',
      link: '/hair-services/privacy-services'
    },
    {
      title: 'Children\'s Services',
      subtitle: 'Gentle care for little ones',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
      price: 'Starting at $25',
      link: '/hair-services/childrens-services'
    },
    {
      title: 'Styling & Finishing',
      subtitle: 'Professional blowouts and updos',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: 'Starting at $25',
      link: '/hair-services/styling-services'
    },
    {
      title: 'Hair Treatments',
      subtitle: 'Deep conditioning and restoration',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: 'Starting at $35',
      link: '/hair-services/hair-treatments'
    },
    {
      title: 'Chemical Services',
      subtitle: 'Perms, relaxers & smoothing treatments',
      image: 'https://images.unsplash.com/photo-1616847220575-1b875cea11dd?w=400&h=300&fit=crop',
      price: 'Consultation Required',
      link: '/hair-services/chemical-services'
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
              <span className="font-medium">Back to Portals</span>
            </Link>
            
            <div className="text-center">
              <div className="text-3xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Impressions Hair Salon
              </div>
              <div className="text-xs text-stone-500 tracking-wide">A Salon for the Whole Family • Since 2010</div>
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

      {/* Hero Section with Transformation Story */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-7xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
              Your Hair Story Begins Here
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-12">
              Every transformation tells a story • Professional artistry meets personal vision • 
              Discover what's possible when experience meets creativity
            </p>
          </div>

          {/* Hero Transformations */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            {heroTransformations.map((transformation, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="flex h-80">
                    <div className="w-1/2 relative overflow-hidden">
                      <img 
                        src={transformation.before} 
                        alt="Before transformation"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-stone-800/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">Before</span>
                      </div>
                    </div>
                    <div className="w-1/2 relative overflow-hidden">
                      <img 
                        src={transformation.after} 
                        alt="After transformation"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-red-600/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">After</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl font-medium mb-2">{transformation.story}</h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <Play className="w-4 h-4 mr-2" />
                      <span>View transformation story</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Stories Navigation */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Explore Your Possibilities
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Dive deep into each service area and discover the artistry behind every transformation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviceStories.map((story, index) => (
              <Link key={index} to={story.link} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-medium mb-1">{story.title}</h3>
                      <p className="text-white/80 text-sm">{story.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-stone-600 mb-4">{story.description}</p>
                    <div className="flex items-center text-red-600 font-medium group-hover:text-red-700">
                      <span>Explore this journey</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Complete Service Journeys
            </h2>
            <p className="text-lg text-stone-600">Expert techniques and specialized care for every need</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {specializedServices.map((service, index) => (
              <Link key={index} to={service.link} className="group">
                <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-2">{service.title}</h3>
                    <p className="text-stone-600 mb-3">{service.subtitle}</p>
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

      {/* Quick Services Overview */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-12 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Our Signature Services
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-red-50 rounded-xl">
                <Scissors className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Precision Cuts</h4>
                <p className="text-stone-600 text-sm mb-3">Kids $25 • Adults $45+</p>
                <p className="text-xs text-stone-500">Consultation • Cut • Style</p>
              </div>
              
              <div className="text-center p-6 bg-stone-50 rounded-xl border border-stone-200">
                <Palette className="w-8 h-8 text-stone-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Color Artistry</h4>
                <p className="text-stone-600 text-sm mb-3">Full Color $85+ • Highlights $95+</p>
                <p className="text-xs text-stone-500">Color consultation included</p>
              </div>
              
              <div className="text-center p-6 bg-amber-50 rounded-xl">
                <Star className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Special Styling</h4>
                <p className="text-stone-600 text-sm mb-3">Updos $75+ • Extensions $150+</p>
                <p className="text-xs text-stone-500">Perfect for special occasions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready to Begin Your Story?
          </h3>
          <p className="text-xl mb-8 text-red-100">
            Book a consultation and let's create something beautiful together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 px-12 py-4 text-lg">
              Book Your Transformation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
          </div>
          <p className="text-red-200 mt-6">Walk-ins welcome • A salon for the whole family since 2010</p>
        </div>
      </section>
    </div>
  );
};

export default HairServices;
