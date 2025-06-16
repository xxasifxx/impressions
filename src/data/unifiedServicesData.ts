
export interface UnifiedService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
  category: string;
  featured?: boolean;
  beforeAfter?: {
    before: string;
    after: string;
    title: string;
  }[];
  details?: {
    process?: string[];
    benefits?: string[];
    specialist?: string;
    aftercare?: string[];
  };
}

export const allUnifiedServices: UnifiedService[] = [
  // Hair Salon Services
  {
    id: 'precision-cuts',
    name: 'Precision Cuts',
    description: 'Expert cuts tailored to your face shape and lifestyle',
    price: 'Starting at $45',
    duration: '45-60 minutes',
    domain: 'hair-salon',
    category: 'Cuts & Styling',
    featured: true,
    details: {
      process: ['Consultation', 'Wash & condition', 'Precision cutting', 'Style finish'],
      benefits: ['Face-flattering shape', 'Easy maintenance', 'Professional styling tips'],
      specialist: 'Senior Stylists'
    }
  },
  {
    id: 'balayage',
    name: 'Balayage',
    description: 'Hand-painted highlights for natural, sun-kissed color',
    price: 'Starting at $150',
    duration: '2-3 hours',
    domain: 'hair-salon',
    category: 'Color Services',
    featured: true,
    details: {
      process: ['Color consultation', 'Sectioning', 'Hand-painting technique', 'Processing', 'Toning', 'Style'],
      benefits: ['Natural-looking highlights', 'Low maintenance', 'Customized placement'],
      specialist: 'Color Specialists'
    }
  },
  {
    id: 'root-touch-up',
    name: 'Root Touch-Up',
    description: 'Quick color refresh for grown-out roots',
    price: 'Starting at $75',
    duration: '60-90 minutes',
    domain: 'hair-salon',
    category: 'Color Services'
  },
  {
    id: 'extensions',
    name: 'Hair Extensions',
    description: 'Add length and volume with premium extensions',
    price: 'Starting at $200',
    duration: '2-4 hours',
    domain: 'hair-salon',
    category: 'Extensions & Treatments'
  },

  // Makeup Studio Services
  {
    id: 'special-occasion-makeup',
    name: 'Special Occasion Makeup',
    description: 'Glamorous looks for parties, dates, and events',
    price: 'Starting at $65',
    duration: '45-75 minutes',
    domain: 'makeup-studio',
    category: 'Occasion Glam',
    featured: true,
    details: {
      process: ['Skin prep', 'Foundation application', 'Eye makeup', 'Lip color', 'Final touches'],
      benefits: ['Long-lasting wear', 'Photo-ready finish', 'Customized to your style'],
      specialist: 'Makeup Artists'
    }
  },
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    description: 'Complete bridal beauty for your special day',
    price: 'Starting at $125',
    duration: '90-120 minutes',
    domain: 'makeup-studio',
    category: 'Bridal Packages',
    featured: true,
    details: {
      process: ['Bridal consultation', 'Skin preparation', 'Long-wear application', 'Photography consideration'],
      benefits: ['All-day wear', 'Tear-proof', 'Camera-ready'],
      specialist: 'Bridal Specialists'
    }
  },
  {
    id: 'makeup-lessons',
    name: 'Makeup Lessons',
    description: 'Learn professional techniques for everyday beauty',
    price: 'Starting at $85',
    duration: '90 minutes',
    domain: 'makeup-studio',
    category: 'Lessons & Tutorials'
  },

  // Med Spa Services
  {
    id: 'eyebrow-threading',
    name: 'Eyebrow Threading',
    description: 'Precise, gentle hair removal for perfect brows',
    price: '$12',
    duration: '15 minutes',
    domain: 'med-spa',
    category: 'Threading',
    featured: true,
    details: {
      process: ['Consultation', 'Marking shape', 'Threading technique', 'Soothing application'],
      benefits: ['Precise shaping', 'No chemicals', 'Gentle on skin'],
      specialist: 'Threading Specialists'
    }
  },
  {
    id: 'facial-threading',
    name: 'Full Face Threading',
    description: 'Complete facial hair removal with expert precision',
    price: '$35',
    duration: '30 minutes',
    domain: 'med-spa',
    category: 'Threading'
  },
  {
    id: 'brazilian-wax',
    name: 'Brazilian Wax',
    description: 'Complete bikini waxing in private, comfortable setting',
    price: '$50',
    duration: '30 minutes',
    domain: 'med-spa',
    category: 'Waxing',
    details: {
      process: ['Consultation', 'Preparation', 'Waxing application', 'Soothing treatment'],
      benefits: ['Long-lasting results', 'Private rooms', 'Experienced estheticians'],
      specialist: 'Licensed Estheticians'
    }
  },
  {
    id: 'legs-wax-full',
    name: 'Full Legs Wax',
    description: 'Smooth, hair-free legs with premium wax',
    price: '$55',
    duration: '45 minutes',
    domain: 'med-spa',
    category: 'Waxing'
  },
  {
    id: 'gold-facial',
    name: 'Gold Facial',
    description: 'Luxurious treatment for sensitive skin',
    price: '$75',
    duration: '50 minutes',
    domain: 'med-spa',
    category: 'Facials',
    featured: true,
    details: {
      process: ['Skin analysis', 'Cleansing', 'Gold treatment', 'Moisturizing', 'Sun protection'],
      benefits: ['Reduces tired appearance', 'Brightens skin', 'Improves circulation'],
      specialist: 'Licensed Estheticians'
    }
  },
  {
    id: 'diamond-glow-facial',
    name: 'Diamond Glow Facial',
    description: 'Exfoliating treatment for radiant skin',
    price: '$85',
    duration: '50 minutes',
    domain: 'med-spa',
    category: 'Facials'
  },
  {
    id: 'eyebrow-tinting',
    name: 'Eyebrow Tinting',
    description: 'Natural color enhancement for fuller-looking brows',
    price: '$20',
    duration: '20 minutes',
    domain: 'med-spa',
    category: 'Brows & Lashes'
  },
  {
    id: 'eyelash-extensions',
    name: 'Eyelash Extensions',
    description: 'Individual lash extensions for dramatic length',
    price: '$120+',
    duration: '90-120 minutes',
    domain: 'med-spa',
    category: 'Brows & Lashes'
  }
];

export const getServicesByDomain = (domain: 'hair-salon' | 'makeup-studio' | 'med-spa') => {
  return allUnifiedServices.filter(service => service.domain === domain);
};

export const getFeaturedServices = (domain?: 'hair-salon' | 'makeup-studio' | 'med-spa') => {
  const services = domain ? getServicesByDomain(domain) : allUnifiedServices;
  return services.filter(service => service.featured);
};

export const getServiceCategories = (domain: 'hair-salon' | 'makeup-studio' | 'med-spa') => {
  const services = getServicesByDomain(domain);
  const categories = [...new Set(services.map(service => service.category))];
  return categories;
};
