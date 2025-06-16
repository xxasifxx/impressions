
export interface UnifiedService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
  category: string;
  featured?: boolean;
  difficulty?: 'Easy' | 'Moderate' | 'Advanced';
  imageUrl: string;
  beforeAfter?: {
    before: string;
    after: string;
    title: string;
    timeframe?: string;
  }[];
  details?: {
    process?: string[];
    benefits?: string[];
    specialist?: string;
    aftercare?: string[];
    preparation?: string[];
    perfectFor?: string[];
  };
  clientStory?: {
    name: string;
    quote: string;
    rating: number;
    transformation?: string;
  };
}

export const allUnifiedServices: UnifiedService[] = [
  // Hair Salon Services
  {
    id: 'precision-cuts',
    name: 'Precision Cuts',
    description: 'Expert cuts tailored to your face shape, lifestyle, and personal style. Our master stylists analyze your bone structure and hair texture to create the perfect cut.',
    price: 'Starting at $45',
    duration: '45-60 minutes',
    domain: 'hair-salon',
    category: 'Cuts & Styling',
    featured: true,
    difficulty: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1594824819646-0ccafb5dfcb9?auto=format&fit=crop&w=400&q=80',
        after: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80',
        title: 'Complete Hair Transformation',
        timeframe: '1 hour'
      }
    ],
    details: {
      process: [
        'In-depth consultation to understand your lifestyle and preferences',
        'Professional hair analysis including texture, density, and growth patterns',
        'Precision cutting with advanced techniques',
        'Personalized styling instruction and product recommendations'
      ],
      benefits: [
        'Face-flattering shape that enhances your natural features',
        'Easy daily maintenance with professional styling tips',
        'Boost in confidence with a fresh, modern look',
        'Customized cut that works with your hair\'s natural tendencies'
      ],
      specialist: 'Master Stylists with 10+ years experience',
      aftercare: [
        'Schedule touch-ups every 6-8 weeks',
        'Use recommended sulfate-free shampoo and conditioner',
        'Apply heat protectant before styling',
        'Deep condition weekly for optimal hair health'
      ],
      perfectFor: [
        'Anyone wanting a fresh new look',
        'Busy professionals needing low-maintenance styles',
        'Special occasions requiring a polished appearance',
        'Those ready for a confidence-boosting transformation'
      ]
    },
    clientStory: {
      name: 'Sarah M.',
      quote: 'I finally found a stylist who truly understands my hair! The cut is absolutely perfect and so easy to maintain.',
      rating: 5,
      transformation: 'Went from long, damaged hair to a chic, healthy bob'
    }
  },
  {
    id: 'balayage',
    name: 'Balayage & Highlights',
    description: 'Hand-painted highlights that create natural-looking dimension and sun-kissed color. Our colorists use premium products for lasting, vibrant results.',
    price: 'Starting at $150',
    duration: '2-3 hours',
    domain: 'hair-salon',
    category: 'Color Services',
    featured: true,
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1594824819646-0ccafb5dfcb9?auto=format&fit=crop&w=400&q=80',
        after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
        title: 'Natural Balayage Transformation',
        timeframe: '3 months maintenance'
      }
    ],
    details: {
      process: [
        'Color consultation and strand testing',
        'Strategic sectioning for optimal placement',
        'Hand-painting technique for natural variation',
        'Processing with gentle, ammonia-free formulas',
        'Toning for perfect color harmony',
        'Professional styling and finishing'
      ],
      benefits: [
        'Natural-looking highlights that grow out beautifully',
        'Low maintenance with 3-4 month touch-up intervals',
        'Adds depth and dimension to any hair color',
        'Customizable intensity from subtle to dramatic'
      ],
      specialist: 'Certified Color Specialists',
      preparation: [
        'Avoid washing hair 24-48 hours before appointment',
        'Come with clean, product-free hair',
        'Discuss color goals and lifestyle during consultation'
      ],
      aftercare: [
        'Wait 48-72 hours before first wash',
        'Use color-safe, sulfate-free products',
        'Deep condition weekly',
        'Schedule color refresh every 12-16 weeks'
      ]
    }
  },
  {
    id: 'root-touch-up',
    name: 'Root Touch-Up',
    description: 'Quick and precise root coverage to maintain your perfect color between full services. Perfect for busy schedules.',
    price: 'Starting at $75',
    duration: '60-90 minutes',
    domain: 'hair-salon',
    category: 'Color Services',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-extensions',
    name: 'Hair Extensions',
    description: 'Premium human hair extensions for instant length and volume. Multiple application methods available for every lifestyle.',
    price: 'Starting at $200',
    duration: '2-4 hours',
    domain: 'hair-salon',
    category: 'Extensions & Treatments',
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1559599189-fe84dea4eb79?auto=format&fit=crop&w=600&q=80'
  },

  // Makeup Studio Services
  {
    id: 'special-occasion-makeup',
    name: 'Special Occasion Makeup',
    description: 'Glamorous makeup artistry for parties, dates, proms, and special events. We create stunning looks that photograph beautifully and last all night.',
    price: 'Starting at $65',
    duration: '45-75 minutes',
    domain: 'makeup-studio',
    category: 'Occasion Glam',
    featured: true,
    difficulty: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    details: {
      process: [
        'Skin analysis and primer application',
        'Color-matched foundation for flawless base',
        'Contouring and highlighting for dimension',
        'Eye makeup tailored to your eye shape',
        'Long-wearing lip color application',
        'Setting spray for all-day wear'
      ],
      benefits: [
        'Professional techniques for photo-ready results',
        'Long-lasting wear for extended events',
        'Customized to complement your outfit and style',
        'Confidence boost for your special occasion'
      ],
      specialist: 'Professional Makeup Artists',
      perfectFor: [
        'Prom and formal events',
        'Date nights and anniversaries',
        'Holiday parties and celebrations',
        'Professional photoshoots'
      ]
    },
    clientStory: {
      name: 'Emma L.',
      quote: 'My prom makeup was absolutely stunning! I felt like a princess and it lasted through the entire night of dancing.',
      rating: 5
    }
  },
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    description: 'Complete bridal beauty services including trial runs, wedding day application, and touch-up kits. Creating your perfect bridal look.',
    price: 'Starting at $125',
    duration: '90-120 minutes',
    domain: 'makeup-studio',
    category: 'Bridal Packages',
    featured: true,
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1583900985737-6d0495555783?auto=format&fit=crop&w=600&q=80',
    details: {
      process: [
        'Comprehensive bridal consultation',
        'Trial makeup session 1-2 months before wedding',
        'Wedding day timeline coordination',
        'Long-wear, tear-proof application',
        'Photography lighting considerations',
        'Touch-up kit for the day'
      ],
      benefits: [
        'All-day wear through tears and celebration',
        'Stunning in both natural and camera light',
        'Stress-free wedding day beauty',
        'Professional documentation of your special day'
      ],
      specialist: 'Certified Bridal Makeup Artists'
    }
  },
  {
    id: 'makeup-lessons',
    name: 'Personal Makeup Lessons',
    description: 'One-on-one instruction to master makeup techniques using your own products. Learn professional tips for everyday beauty.',
    price: 'Starting at $85',
    duration: '90 minutes',
    domain: 'makeup-studio',
    category: 'Lessons & Tutorials',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80'
  },

  // Med Spa Services
  {
    id: 'eyebrow-threading',
    name: 'Eyebrow Threading',
    description: 'Ancient art of hair removal using pure cotton thread. Precise, gentle, and perfect for sensitive skin. Creates beautifully shaped brows.',
    price: '$12',
    duration: '15 minutes',
    domain: 'med-spa',
    category: 'Threading',
    featured: true,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    details: {
      process: [
        'Skin analysis and consultation',
        'Brow mapping for perfect symmetry',
        'Gentle threading technique',
        'Soothing aloe application',
        'Brow styling and finishing'
      ],
      benefits: [
        'Precise hair removal without chemicals',
        'Gentle on sensitive skin',
        'Creates perfectly defined brow shape',
        'No risk of burns or allergic reactions'
      ],
      specialist: 'Licensed Threading Specialists',
      aftercare: [
        'Avoid touching the area for 24 hours',
        'Apply aloe vera gel if needed',
        'Avoid makeup on the area for 4-6 hours',
        'Schedule maintenance every 3-4 weeks'
      ]
    },
    clientStory: {
      name: 'Priya K.',
      quote: 'Finally found someone who can shape my brows perfectly! The threading is so precise and gentle.',
      rating: 5
    }
  },
  {
    id: 'full-face-threading',
    name: 'Full Face Threading',
    description: 'Complete facial hair removal including upper lip, chin, cheeks, and forehead. Leaves skin smooth and radiant.',
    price: '$35',
    duration: '30 minutes',
    domain: 'med-spa',
    category: 'Threading',
    difficulty: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'brazilian-wax',
    name: 'Brazilian Wax',
    description: 'Complete bikini waxing service in private, comfortable rooms. Our experienced estheticians ensure your comfort and privacy.',
    price: '$50',
    duration: '30 minutes',
    domain: 'med-spa',
    category: 'Waxing',
    difficulty: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
    details: {
      process: [
        'Private consultation in comfortable room',
        'Skin preparation and cleansing',
        'Professional waxing technique',
        'Soothing post-wax treatment',
        'Aftercare instructions'
      ],
      benefits: [
        'Long-lasting smoothness (3-6 weeks)',
        'Private, comfortable environment',
        'Professional, experienced estheticians',
        'Hygienic, single-use products'
      ],
      specialist: 'Licensed Estheticians'
    }
  },
  {
    id: 'gold-facial',
    name: 'Gold Facial Treatment',
    description: 'Luxurious 24k gold facial that reduces inflammation, brightens skin, and provides anti-aging benefits. Perfect for sensitive skin.',
    price: '$75',
    duration: '50 minutes',
    domain: 'med-spa',
    category: 'Facials',
    featured: true,
    difficulty: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    details: {
      process: [
        'Thorough skin analysis and consultation',
        'Gentle cleansing and exfoliation',
        '24k gold mask application',
        'Relaxing facial massage',
        'Hydrating serum and moisturizer',
        'SPF protection application'
      ],
      benefits: [
        'Reduces appearance of fine lines',
        'Brightens and evens skin tone',
        'Improves skin texture and elasticity',
        'Calming for sensitive or irritated skin'
      ],
      specialist: 'Licensed Estheticians',
      perfectFor: [
        'Special events and celebrations',
        'Mature skin needing rejuvenation',
        'Sensitive skin requiring gentle treatment',
        'Anyone wanting a luxurious spa experience'
      ]
    }
  },
  {
    id: 'eyelash-extensions',
    name: 'Eyelash Extensions',
    description: 'Individual lash extensions applied by certified technicians. Choose from classic, volume, or mega volume styles.',
    price: '$120+',
    duration: '90-120 minutes',
    domain: 'med-spa',
    category: 'Brows & Lashes',
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?auto=format&fit=crop&w=600&q=80'
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

export const getServicesByUserJourney = (domain: 'hair-salon' | 'makeup-studio' | 'med-spa', journey: string) => {
  const services = getServicesByDomain(domain);
  
  // Define user journey mappings
  const journeyMappings = {
    'hair-salon': {
      'complete-transformation': ['precision-cuts', 'balayage', 'hair-extensions'],
      'color-refresh': ['root-touch-up', 'balayage'],
      'maintenance': ['precision-cuts', 'root-touch-up'],
      'special-event': ['precision-cuts', 'balayage', 'hair-extensions']
    },
    'makeup-studio': {
      'special-event': ['special-occasion-makeup', 'bridal-makeup'],
      'learning': ['makeup-lessons'],
      'wedding': ['bridal-makeup']
    },
    'med-spa': {
      'brow-perfection': ['eyebrow-threading', 'full-face-threading'],
      'smooth-skin': ['brazilian-wax', 'full-face-threading'],
      'facial-glow': ['gold-facial'],
      'lash-enhancement': ['eyelash-extensions']
    }
  };

  const serviceIds = journeyMappings[domain]?.[journey] || [];
  return services.filter(service => serviceIds.includes(service.id));
};
