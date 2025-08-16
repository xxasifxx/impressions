export interface DomainMarketingContent {
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa' | 'perfume-boutique' | 'vitamin-wellness';
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
  };
  features: MarketingFeature[];
  services: MarketingService[];
  products?: MarketingProduct[];
  testimonials: MarketingTestimonial[];
  gallery: MarketingGalleryItem[];
}

export interface MarketingFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

export interface MarketingService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
  imageUrl: string;
  popular?: boolean;
}

export interface MarketingProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  brand: string;
  imageUrl: string;
  featured?: boolean;
}

export interface MarketingTestimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  service?: string;
  imageUrl?: string;
}

export interface MarketingGalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

// Hair Salon Marketing Content
export const hairSalonContent: DomainMarketingContent = {
  domain: 'hair-salon',
  hero: {
    title: 'Transform Your Hair, Transform Your Life',
    subtitle: 'Expert cuts, colors, and styling that bring out your natural beauty',
    backgroundImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop',
    ctaText: 'Start Your Hair Journey'
  },
  features: [
    {
      id: 'expert-stylists',
      title: 'Expert Stylists',
      description: 'Our certified stylists have years of experience creating stunning looks',
      icon: '✂️',
      highlight: true
    },
    {
      id: 'premium-products',
      title: 'Premium Products',
      description: 'We use only the finest hair care products for lasting results',
      icon: '💎'
    },
    {
      id: 'personalized-consultation',
      title: 'Personalized Consultation',
      description: 'Every service begins with understanding your unique style and needs',
      icon: '💬'
    }
  ],
  services: [
    {
      id: 'precision-cut',
      name: 'Precision Cut',
      description: 'Expert haircuts tailored to your face shape and lifestyle',
      price: '$45',
      duration: '45 minutes',
      imageUrl: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=400&h=300&fit=crop',
      popular: true
    },
    {
      id: 'color-transformation',
      name: 'Color Transformation',
      description: 'From subtle highlights to bold color changes',
      price: '$85',
      duration: '2 hours',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'
    }
  ],
  testimonials: [
    {
      id: 'sarah-testimonial',
      name: 'Sarah M.',
      quote: 'The best haircut I\'ve ever had! The stylist really understood what I wanted.',
      rating: 5,
      service: 'Precision Cut'
    }
  ],
  gallery: [
    {
      id: 'transformation-1',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
      title: 'Blonde Transformation',
      category: 'Color'
    }
  ]
};

// Makeup Studio Marketing Content
export const makeupStudioContent: DomainMarketingContent = {
  domain: 'makeup-studio',
  hero: {
    title: 'Unleash Your Inner Beauty',
    subtitle: 'Professional makeup artistry for every occasion',
    backgroundImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&h=1080&fit=crop',
    ctaText: 'Book Your Makeup Session'
  },
  features: [
    {
      id: 'professional-artists',
      title: 'Professional Artists',
      description: 'Trained makeup artists with expertise in all styles and techniques',
      icon: '🎨',
      highlight: true
    },
    {
      id: 'high-end-products',
      title: 'High-End Products',
      description: 'Premium makeup brands for flawless, long-lasting results',
      icon: '💄'
    },
    {
      id: 'custom-looks',
      title: 'Custom Looks',
      description: 'Personalized makeup designed for your features and occasion',
      icon: '✨'
    }
  ],
  services: [
    {
      id: 'bridal-makeup',
      name: 'Bridal Makeup',
      description: 'Picture-perfect makeup for your special day',
      price: '$150',
      duration: '2 hours',
      imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
      popular: true
    }
  ],
  products: [
    {
      id: 'foundation-set',
      name: 'Professional Foundation Set',
      description: 'Complete foundation collection for all skin tones',
      price: '$89',
      brand: 'Beauty Pro',
      imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      featured: true
    }
  ],
  testimonials: [
    {
      id: 'emma-testimonial',
      name: 'Emma L.',
      quote: 'My wedding makeup was absolutely perfect! I felt like a princess.',
      rating: 5,
      service: 'Bridal Makeup'
    }
  ],
  gallery: [
    {
      id: 'bridal-look-1',
      imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop',
      title: 'Classic Bridal Look',
      category: 'Bridal'
    }
  ]
};

// Med Spa Marketing Content
export const medSpaContent: DomainMarketingContent = {
  domain: 'med-spa',
  hero: {
    title: 'Rejuvenate Your Skin, Restore Your Confidence',
    subtitle: 'Advanced skincare treatments for radiant, healthy skin',
    backgroundImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&h=1080&fit=crop',
    ctaText: 'Start Your Skincare Journey'
  },
  features: [
    {
      id: 'medical-grade',
      title: 'Medical-Grade Treatments',
      description: 'Advanced procedures performed by licensed professionals',
      icon: '🏥',
      highlight: true
    },
    {
      id: 'personalized-care',
      title: 'Personalized Care',
      description: 'Customized treatment plans based on your skin analysis',
      icon: '🔬'
    },
    {
      id: 'proven-results',
      title: 'Proven Results',
      description: 'Evidence-based treatments with visible, lasting results',
      icon: '📈'
    }
  ],
  services: [
    {
      id: 'hydrafacial',
      name: 'HydraFacial',
      description: 'Deep cleansing and hydrating facial treatment',
      price: '$120',
      duration: '60 minutes',
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
      popular: true
    }
  ],
  testimonials: [
    {
      id: 'maria-testimonial',
      name: 'Maria R.',
      quote: 'My skin has never looked better! The HydraFacial is amazing.',
      rating: 5,
      service: 'HydraFacial'
    }
  ],
  gallery: [
    {
      id: 'facial-treatment-1',
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
      title: 'Facial Treatment',
      category: 'Skincare'
    }
  ]
};

// Perfume Boutique Marketing Content
export const perfumeBoutiqueContent: DomainMarketingContent = {
  domain: 'perfume-boutique',
  hero: {
    title: 'Discover Your Signature Scent',
    subtitle: 'Curated collection of luxury fragrances from around the world',
    backgroundImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&h=1080&fit=crop',
    ctaText: 'Explore Fragrances'
  },
  features: [
    {
      id: 'luxury-collection',
      title: 'Luxury Collection',
      description: 'Exclusive fragrances from renowned perfume houses',
      icon: '🌹',
      highlight: true
    },
    {
      id: 'fragrance-consultation',
      title: 'Fragrance Consultation',
      description: 'Expert guidance to find your perfect scent match',
      icon: '👃'
    },
    {
      id: 'custom-blending',
      title: 'Custom Blending',
      description: 'Create your own unique fragrance blend',
      icon: '⚗️'
    }
  ],
  services: [
    {
      id: 'scent-consultation',
      name: 'Scent Consultation',
      description: 'Personalized fragrance matching session',
      price: '$25',
      duration: '30 minutes',
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
      popular: true
    }
  ],
  products: [
    {
      id: 'signature-perfume',
      name: 'Signature Eau de Parfum',
      description: 'Our exclusive signature fragrance blend',
      price: '$125',
      brand: 'Impressions',
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
      featured: true
    }
  ],
  testimonials: [
    {
      id: 'anna-testimonial',
      name: 'Anna K.',
      quote: 'Found my perfect signature scent! The consultation was so helpful.',
      rating: 5,
      service: 'Scent Consultation'
    }
  ],
  gallery: [
    {
      id: 'perfume-collection-1',
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
      title: 'Luxury Collection',
      category: 'Fragrances'
    }
  ]
};

// Vitamin Wellness Marketing Content
export const vitaminWellnessContent: DomainMarketingContent = {
  domain: 'vitamin-wellness',
  hero: {
    title: 'Beauty From Within',
    subtitle: 'Premium vitamins and supplements for radiant health and beauty',
    backgroundImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&h=1080&fit=crop',
    ctaText: 'Start Your Wellness Journey'
  },
  features: [
    {
      id: 'science-backed',
      title: 'Science-Backed Formulas',
      description: 'Clinically proven ingredients for optimal results',
      icon: '🧬',
      highlight: true
    },
    {
      id: 'premium-quality',
      title: 'Premium Quality',
      description: 'Third-party tested for purity and potency',
      icon: '✅'
    },
    {
      id: 'personalized-plans',
      title: 'Personalized Plans',
      description: 'Custom vitamin regimens based on your needs',
      icon: '📋'
    }
  ],
  services: [
    {
      id: 'wellness-consultation',
      name: 'Wellness Consultation',
      description: 'Personalized vitamin and supplement recommendations',
      price: '$35',
      duration: '45 minutes',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      popular: true
    }
  ],
  products: [
    {
      id: 'beauty-multivitamin',
      name: 'Beauty Multivitamin',
      description: 'Complete daily nutrition for healthy hair, skin, and nails',
      price: '$45',
      brand: 'Wellness Pro',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      featured: true
    }
  ],
  testimonials: [
    {
      id: 'lisa-testimonial',
      name: 'Lisa T.',
      quote: 'My hair and nails have never been stronger! These vitamins really work.',
      rating: 5
    }
  ],
  gallery: [
    {
      id: 'wellness-products-1',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      title: 'Wellness Collection',
      category: 'Supplements'
    }
  ]
};

// Export all marketing content
export const marketingContent = {
  'hair-salon': hairSalonContent,
  'makeup-studio': makeupStudioContent,
  'med-spa': medSpaContent,
  'perfume-boutique': perfumeBoutiqueContent,
  'vitamin-wellness': vitaminWellnessContent
};

