
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Scissors, Palette, Sparkles, Droplets, Heart } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import ServiceCategoryCard from '@/components/ServiceCategoryCard';

const HairServices = () => {
  const serviceCategories = [
    {
      id: 'cutting',
      title: 'Cutting & Styling',
      description: 'Expert cuts, blowouts, and elegant styling for any occasion.',
      icon: Scissors,
      link: '/hair-services/precision-cuts',
    },
    {
      id: 'coloring',
      title: 'Color & Highlights',
      description: 'From root touch-ups to balayage and bold transformations.',
      icon: Palette,
      link: '/hair-services/balayage',
    },
    {
      id: 'treatments',
      title: 'Hair Treatments',
      description: 'Nourish and revitalize your hair with our professional treatments.',
      icon: Droplets,
      link: '/hair-services/hair-treatments',
    },
    {
      id: 'extensions',
      title: 'Hair Extensions',
      description: 'Add instant length and volume with our premium extensions.',
      icon: Heart,
      link: '/hair-services/extensions',
    },
    {
      id: 'special',
      title: 'Special Occasions',
      description: 'Stunning updos and styling for weddings, proms, and events.',
      icon: Sparkles,
      link: '/hair-services/styling-services',
    },
     {
      id: 'chemical',
      title: 'Chemical Services',
      description: 'Perms, relaxers, and other texture-altering services.',
      icon: Sparkles, // Using sparkles as a placeholder
      link: '/hair-services/chemical-services',
    },
  ];

  const allServices = [
    {
      id: 'balayage',
      title: 'Balayage',
      price: '$110+',
      description: 'Hand-painted highlights for natural dimension',
      categories: ['transformation', 'special'],
      link: '/hair-services/balayage',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          title: 'Natural Blonde Balayage',
          timeframe: '4-5 hours'
        },
        {
          before: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=350&h=250&fit=crop',
          title: 'Brunette Balayage',
          timeframe: '3-4 hours'
        }
      ],
      difficulty: 'Moderate' as const,
      duration: '3-5 hours',
      clientStory: {
        name: 'Sarah M.',
        quote: 'The balayage looked so natural, people thought I was born with highlights!',
        rating: 5
      },
      specialist: 'Maria'
    },
    {
      id: 'color-correction',
      title: 'Color Correction',
      price: '$85+',
      description: 'Fix previous color mishaps professionally',
      categories: ['transformation'],
      link: '/hair-services/color-correction',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'From Orange to Blonde',
          timeframe: '6-8 hours'
        }
      ],
      difficulty: 'Complex' as const,
      duration: '4-8 hours',
      clientStory: {
        name: 'Jessica L.',
        quote: 'They saved my hair from a DIY disaster. I will never go anywhere else!',
        rating: 5
      },
      specialist: 'David'
    },
    {
      id: 'precision-cuts',
      title: 'Precision Cuts',
      price: '$45+',
      description: 'Expert cutting for your face shape',
      categories: ['maintenance', 'transformation'],
      link: '/hair-services/precision-cuts',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=350&h=250&fit=crop',
          title: 'Modern Bob Cut',
          timeframe: '1 hour'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '45-60 minutes',
      clientStory: {
        name: 'Amanda K.',
        quote: 'Perfect cut that grows out beautifully. Worth every penny!',
        rating: 5
      },
      specialist: 'Lisa'
    },
    {
      id: 'root-touch',
      title: 'Root Touch-Up',
      price: '$65+',
      description: 'Keep your color looking fresh',
      categories: ['maintenance'],
      link: '/hair-services/root-touch-up',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'Root Refresh',
          timeframe: '2 hours'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '1.5-2 hours',
      specialist: 'Maria'
    },
    {
      id: 'extensions',
      title: 'Hair Extensions',
      price: '$150+',
      description: 'Add length and volume instantly',
      categories: ['transformation', 'special'],
      link: '/hair-services/extensions',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          title: 'Length & Volume',
          timeframe: '2-3 hours'
        }
      ],
      difficulty: 'Moderate' as const,
      duration: '2-3 hours',
      clientStory: {
        name: 'Rachel T.',
        quote: 'The extensions blend perfectly! No one can tell they are not my real hair.',
        rating: 5
      },
      specialist: 'Sofia'
    },
    {
      id: 'treatments',
      title: 'Hair Treatments',
      price: '$35+',
      description: 'Deep conditioning and repair',
      categories: ['maintenance'],
      link: '/hair-services/hair-treatments',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1616847220575-1b875cea11dd?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'Damage Repair',
          timeframe: '1 hour'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '30-60 minutes',
      specialist: 'Multiple'
    },
    {
      id: 'chemical',
      title: 'Chemical Services',
      price: 'Consult',
      description: 'Perms, relaxers, and texture changes',
      categories: ['transformation'],
      link: '/hair-services/chemical-services',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'Texture Transformation',
          timeframe: '3-4 hours'
        }
      ],
      difficulty: 'Complex' as const,
      duration: '3-5 hours',
      specialist: 'David'
    },
    {
      id: 'styling',
      title: 'Special Occasion Styling',
      price: '$55+',
      description: 'Elegant updos for your big day',
      categories: ['special'],
      link: '/hair-services/styling-services',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          title: 'Wedding Updo',
          timeframe: '2 hours'
        }
      ],
      difficulty: 'Moderate' as const,
      duration: '1.5-2 hours',
      specialist: 'Lisa'
    },
    {
      id: 'children',
      title: 'Children\'s Services',
      price: '$25+',
      description: 'Gentle cuts for little ones',
      categories: ['comfort'],
      link: '/hair-services/childrens-services',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=350&h=250&fit=crop',
          title: 'First Haircut',
          timeframe: '30 minutes'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '30-45 minutes',
      specialist: 'Sofia'
    },
    {
      id: 'senior',
      title: 'Senior Care',
      price: '$35+',
      description: 'Comfortable styling for seniors',
      categories: ['comfort'],
      link: '/hair-services/senior-care',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=350&h=250&fit=crop',
          title: 'Gentle Style',
          timeframe: '1 hour'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '45-60 minutes',
      specialist: 'Maria'
    },
    {
      id: 'privacy',
      title: 'Privacy Services',
      price: '$45+',
      description: 'Private suite for modesty',
      categories: ['comfort'],
      link: '/hair-services/privacy-services',
      transformations: [
        {
          before: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=350&h=250&fit=crop',
          after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=350&h=250&fit=crop',
          title: 'Private Consultation',
          timeframe: '1-2 hours'
        }
      ],
      difficulty: 'Easy' as const,
      duration: '1-2 hours',
      specialist: 'All'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-800">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-3xl font-light text-red-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Hair Services
              </h1>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              <Phone className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-stone-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-light text-stone-800 mb-4" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Your Best Hair Awaits
          </h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-8">
            Welcome to Impressions Hair Salon. We are a family-owned salon dedicated to providing exceptional hair care for everyone. Explore our services below to find your perfect look.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-stone-800 hover:bg-stone-900">
              Book a Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-stone-400 text-stone-700 hover:bg-stone-100">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Our Hair Services
            </h3>
            <p className="text-lg text-stone-600">
              Find the service that's right for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviceCategories.map((category) => (
              <ServiceCategoryCard
                key={category.id}
                icon={category.icon}
                title={category.title}
                description={category.description}
                link={category.link}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* All Services Showcase */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Explore All Services
            </h3>
            <p className="text-lg text-stone-600">
              A complete list of our professional hair services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                price={service.price}
                link={service.link}
                transformations={service.transformations}
                difficulty={service.difficulty}
                duration={service.duration}
                clientStory={service.clientStory}
                specialist={service.specialist}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HairServices;
