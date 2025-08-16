/**
 * Comprehensive Service Database
 * 
 * All services identified from metadata tag analysis.
 * Services are organized by category with unique IDs.
 * No tag assignments yet - just the complete service inventory.
 */

export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'threading' | 'waxing' | 'eyebrow_lash' | 'facial' | 'makeup';
  description?: string;
  estimatedDuration?: string;
  priceRange?: string;
}

export const SERVICES: Service[] = [
  // ===================
  // HAIR SERVICES
  // ===================
  {
    id: 'hair_001',
    name: 'Haircut - Women',
    category: 'hair',
    description: 'Professional women\'s haircut with consultation',
    estimatedDuration: '45-60 min',
    priceRange: '$50-80'
  },
  {
    id: 'hair_002', 
    name: 'Haircut - Men',
    category: 'hair',
    description: 'Professional men\'s haircut',
    estimatedDuration: '20-30 min',
    priceRange: '$25-40'
  },
  {
    id: 'hair_003',
    name: 'Haircut - Kids (under 10)',
    category: 'hair', 
    description: 'Gentle haircut for children under 10',
    estimatedDuration: '15-25 min',
    priceRange: '$20-35'
  },
  {
    id: 'hair_004',
    name: 'Bundle (Cut, Wash, Blow Out)',
    category: 'hair',
    description: 'Complete hair service package',
    estimatedDuration: '90-120 min',
    priceRange: '$75-95'
  },
  {
    id: 'hair_005',
    name: 'Blow Out',
    category: 'hair',
    description: 'Professional blow dry styling',
    estimatedDuration: '30-45 min',
    priceRange: '$30-40'
  },
  {
    id: 'hair_006',
    name: 'Blow Out with Flat Iron',
    category: 'hair',
    description: 'Blow dry with straightening',
    estimatedDuration: '45-60 min',
    priceRange: '$45-55'
  },
  {
    id: 'hair_007',
    name: 'Hairstyle',
    category: 'hair',
    description: 'Custom styling service',
    estimatedDuration: '45-75 min',
    priceRange: '$40-70'
  },
  {
    id: 'hair_008',
    name: 'Roller Set',
    category: 'hair',
    description: 'Traditional roller setting',
    estimatedDuration: '90-120 min',
    priceRange: '$55-75'
  },
  {
    id: 'hair_009',
    name: 'Deep Conditioning',
    category: 'hair',
    description: 'Intensive hair treatment',
    estimatedDuration: '45-60 min',
    priceRange: '$35-50'
  },
  {
    id: 'hair_010',
    name: 'Perm',
    category: 'hair',
    description: 'Chemical curl treatment',
    estimatedDuration: '2-3 hours',
    priceRange: '$80-150'
  },
  {
    id: 'hair_011',
    name: 'Keratin Treatment',
    category: 'hair',
    description: 'Hair smoothing treatment',
    estimatedDuration: '2-3 hours',
    priceRange: '$150-300'
  },
  {
    id: 'hair_012',
    name: 'Color',
    category: 'hair',
    description: 'Full hair color service',
    estimatedDuration: '2-2.5 hours',
    priceRange: '$120-180'
  },
  {
    id: 'hair_013',
    name: 'Organic Color (w/o Ammonia)',
    category: 'hair',
    description: 'Ammonia-free hair color',
    estimatedDuration: '2-2.5 hours',
    priceRange: '$130-190'
  },
  {
    id: 'hair_014',
    name: 'Toner',
    category: 'hair',
    description: 'Hair tone adjustment',
    estimatedDuration: '45-60 min',
    priceRange: '$40-50'
  },
  {
    id: 'hair_015',
    name: 'Partial Highlights',
    category: 'hair',
    description: 'Selective highlighting',
    estimatedDuration: '2-3 hours',
    priceRange: '$100-150'
  },
  {
    id: 'hair_016',
    name: 'Full Highlights',
    category: 'hair',
    description: 'Complete highlighting service',
    estimatedDuration: '3-4 hours',
    priceRange: '$150-250'
  },

  // Additional Hair Services (from tag analysis)
  {
    id: 'hair_017',
    name: 'Balayage',
    category: 'hair',
    description: 'Hand-painted highlights technique',
    estimatedDuration: '3-4 hours',
    priceRange: '$180-300'
  },
  {
    id: 'hair_018',
    name: 'Ombre',
    category: 'hair',
    description: 'Gradient color technique',
    estimatedDuration: '3-4 hours',
    priceRange: '$150-250'
  },
  {
    id: 'hair_019',
    name: 'Color Correction',
    category: 'hair',
    description: 'Fixing previous color mistakes',
    estimatedDuration: '3-5 hours',
    priceRange: '$200-400'
  },
  {
    id: 'hair_020',
    name: 'Hair Extensions',
    category: 'hair',
    description: 'Length and volume enhancement',
    estimatedDuration: '2-4 hours',
    priceRange: '$200-500'
  },
  {
    id: 'hair_021',
    name: 'Chemical Straightening',
    category: 'hair',
    description: 'Permanent hair straightening',
    estimatedDuration: '3-4 hours',
    priceRange: '$200-350'
  },
  {
    id: 'hair_022',
    name: 'Hair Gloss',
    category: 'hair',
    description: 'Shine and tone enhancement',
    estimatedDuration: '20-30 min',
    priceRange: '$30-45'
  },
  {
    id: 'hair_023',
    name: 'Root Touch-Up',
    category: 'hair',
    description: 'Maintenance color service',
    estimatedDuration: '25-30 min',
    priceRange: '$40-60'
  },
  {
    id: 'hair_024',
    name: 'Scalp Treatment',
    category: 'hair',
    description: 'Scalp health and massage',
    estimatedDuration: '20-25 min',
    priceRange: '$25-40'
  },
  {
    id: 'hair_025',
    name: 'Hair Consultation',
    category: 'hair',
    description: 'Style and color planning',
    estimatedDuration: '30-45 min',
    priceRange: '$25-50'
  },
  {
    id: 'hair_026',
    name: 'Bridal Hair Styling',
    category: 'hair',
    description: 'Special occasion updos',
    estimatedDuration: '90-120 min',
    priceRange: '$100-200'
  },
  {
    id: 'hair_027',
    name: 'Express Blowout',
    category: 'hair',
    description: 'Quick styling service',
    estimatedDuration: '20-30 min',
    priceRange: '$25-35'
  },
  {
    id: 'hair_028',
    name: 'Beard Trim',
    category: 'hair',
    description: 'Men\'s facial hair grooming',
    estimatedDuration: '15-25 min',
    priceRange: '$15-25'
  },

  // ===================
  // THREADING SERVICES
  // ===================
  {
    id: 'thread_001',
    name: 'Threading - Eyebrow',
    category: 'threading',
    description: 'Precise eyebrow shaping',
    estimatedDuration: '15-20 min',
    priceRange: '$15-25'
  },
  {
    id: 'thread_002',
    name: 'Threading - Upper Lip',
    category: 'threading',
    description: 'Upper lip hair removal',
    estimatedDuration: '10-15 min',
    priceRange: '$10-15'
  },
  {
    id: 'thread_003',
    name: 'Threading - Chin',
    category: 'threading',
    description: 'Chin hair removal',
    estimatedDuration: '10-15 min',
    priceRange: '$10-15'
  },
  {
    id: 'thread_004',
    name: 'Threading - Sideburns',
    category: 'threading',
    description: 'Sideburn shaping',
    estimatedDuration: '10-15 min',
    priceRange: '$12-18'
  },
  {
    id: 'thread_005',
    name: 'Threading - Neck (chin not included)',
    category: 'threading',
    description: 'Neck area hair removal',
    estimatedDuration: '15-20 min',
    priceRange: '$20-30'
  },
  {
    id: 'thread_006',
    name: 'Threading - Full Face',
    category: 'threading',
    description: 'Complete facial threading',
    estimatedDuration: '45-60 min',
    priceRange: '$50-70'
  },

  // ===================
  // WAXING SERVICES
  // ===================
  {
    id: 'wax_001',
    name: 'Waxing - Underarms',
    category: 'waxing',
    description: 'Underarm hair removal',
    estimatedDuration: '15-20 min',
    priceRange: '$20-30'
  },
  {
    id: 'wax_002',
    name: 'Waxing - Bikini',
    category: 'waxing',
    description: 'Bikini area hair removal',
    estimatedDuration: '20-25 min',
    priceRange: '$35-45'
  },
  {
    id: 'wax_003',
    name: 'Waxing - Arms (Half)',
    category: 'waxing',
    description: 'Lower or upper arm waxing',
    estimatedDuration: '20-25 min',
    priceRange: '$25-35'
  },
  {
    id: 'wax_004',
    name: 'Waxing - Arms (Full)',
    category: 'waxing',
    description: 'Complete arm waxing',
    estimatedDuration: '30-45 min',
    priceRange: '$45-65'
  },
  {
    id: 'wax_005',
    name: 'Waxing - Legs (Half)',
    category: 'waxing',
    description: 'Lower or upper leg waxing',
    estimatedDuration: '30-45 min',
    priceRange: '$40-60'
  },
  {
    id: 'wax_006',
    name: 'Waxing - Legs (Full)',
    category: 'waxing',
    description: 'Complete leg waxing',
    estimatedDuration: '60-90 min',
    priceRange: '$70-90'
  },
  {
    id: 'wax_007',
    name: 'Waxing - Chest',
    category: 'waxing',
    description: 'Chest hair removal',
    estimatedDuration: '45-60 min',
    priceRange: '$50-70'
  },
  {
    id: 'wax_008',
    name: 'Waxing - Back',
    category: 'waxing',
    description: 'Back hair removal',
    estimatedDuration: '60-90 min',
    priceRange: '$60-80'
  },
  {
    id: 'wax_009',
    name: 'Waxing - Brazilian',
    category: 'waxing',
    description: 'Complete intimate area waxing',
    estimatedDuration: '60-90 min',
    priceRange: '$80-120'
  },

  // Additional Waxing Services
  {
    id: 'wax_010',
    name: 'Full Body Wax',
    category: 'waxing',
    description: 'Complete body hair removal',
    estimatedDuration: '2-3 hours',
    priceRange: '$200-300'
  },

  // ===================
  // EYEBROW & LASH SERVICES
  // ===================
  {
    id: 'brow_001',
    name: 'Eyebrow Tinting',
    category: 'eyebrow_lash',
    description: 'Eyebrow color enhancement',
    estimatedDuration: '20-25 min',
    priceRange: '$20-30'
  },
  {
    id: 'brow_002',
    name: 'Eyebrow Laminating',
    category: 'eyebrow_lash',
    description: 'Brow setting and shaping',
    estimatedDuration: '60-75 min',
    priceRange: '$60-80'
  },
  {
    id: 'lash_001',
    name: 'Eyelash Tinting',
    category: 'eyebrow_lash',
    description: 'Lash color enhancement',
    estimatedDuration: '15-20 min',
    priceRange: '$25-35'
  },
  {
    id: 'lash_002',
    name: 'Eyelash Extension',
    category: 'eyebrow_lash',
    description: 'Individual lash extensions',
    estimatedDuration: '2-3 hours',
    priceRange: '$120-200'
  },
  {
    id: 'combo_001',
    name: 'Bundle (Tinting & Laminating)',
    category: 'eyebrow_lash',
    description: 'Combined brow services',
    estimatedDuration: '90-120 min',
    priceRange: '$85-125'
  },

  // Additional Eyebrow & Lash Services
  {
    id: 'brow_003',
    name: 'Eyebrow Shaping',
    category: 'eyebrow_lash',
    description: 'Professional brow shaping',
    estimatedDuration: '30-45 min',
    priceRange: '$25-40'
  },
  {
    id: 'brow_004',
    name: 'Brow Mapping',
    category: 'eyebrow_lash',
    description: 'Professional measurement and design',
    estimatedDuration: '15-20 min',
    priceRange: '$20-30'
  },
  {
    id: 'brow_005',
    name: 'Brow Design Consultation',
    category: 'eyebrow_lash',
    description: 'Shape planning and analysis',
    estimatedDuration: '30-45 min',
    priceRange: '$30-50'
  },
  {
    id: 'brow_006',
    name: 'Microblading',
    category: 'eyebrow_lash',
    description: 'Semi-permanent brow enhancement',
    estimatedDuration: '2-3 hours',
    priceRange: '$300-500'
  },
  {
    id: 'lash_003',
    name: 'Lash Lift',
    category: 'eyebrow_lash',
    description: 'Natural curl enhancement',
    estimatedDuration: '45-60 min',
    priceRange: '$60-80'
  },
  {
    id: 'lash_004',
    name: 'Lash Volume Extensions',
    category: 'eyebrow_lash',
    description: 'Dramatic lash enhancement',
    estimatedDuration: '3-4 hours',
    priceRange: '$180-300'
  },
  {
    id: 'lash_005',
    name: 'Lash Curl',
    category: 'eyebrow_lash',
    description: 'Mechanical lash curling',
    estimatedDuration: '15-20 min',
    priceRange: '$15-25'
  },
  {
    id: 'lash_006',
    name: 'Lash Consultation',
    category: 'eyebrow_lash',
    description: 'Extension planning and care',
    estimatedDuration: '20-30 min',
    priceRange: '$25-40'
  },
  {
    id: 'lash_007',
    name: 'Lash Removal',
    category: 'eyebrow_lash',
    description: 'Safe extension removal',
    estimatedDuration: '30-45 min',
    priceRange: '$30-50'
  },

  // ===================
  // FACIAL SERVICES
  // ===================
  {
    id: 'facial_001',
    name: 'Gold Facial (for sensitive skin)',
    category: 'facial',
    description: 'Gentle facial for sensitive skin',
    estimatedDuration: '50 min',
    priceRange: '$70-90'
  },
  {
    id: 'facial_002',
    name: 'Diamond Glow Facial',
    category: 'facial',
    description: 'Exfoliating diamond facial',
    estimatedDuration: '50 min',
    priceRange: '$80-100'
  },
  {
    id: 'facial_003',
    name: 'K-reine Fruit Facial',
    category: 'facial',
    description: 'Fruit enzyme facial treatment',
    estimatedDuration: '50 min',
    priceRange: '$75-95'
  },
  {
    id: 'facial_004',
    name: 'Purex Anti-Aging',
    category: 'facial',
    description: 'Anti-aging facial treatment',
    estimatedDuration: '50 min',
    priceRange: '$90-120'
  },
  {
    id: 'facial_005',
    name: 'DermaCos for all skin type',
    category: 'facial',
    description: 'Universal skin treatment',
    estimatedDuration: '1 hr',
    priceRange: '$85-110'
  },
  {
    id: 'facial_006',
    name: 'M.A.D. Anti-Aging Skin',
    category: 'facial',
    description: 'Advanced anti-aging treatment',
    estimatedDuration: '1 hr',
    priceRange: '$100-130'
  },
  {
    id: 'facial_007',
    name: 'Janssen for all skin type',
    category: 'facial',
    description: 'Professional skin treatment',
    estimatedDuration: '1 hr 30 min',
    priceRange: '$120-150'
  },

  // Additional Facial Services
  {
    id: 'facial_008',
    name: 'Express Facial',
    category: 'facial',
    description: 'Quick refreshing facial',
    estimatedDuration: '25-30 min',
    priceRange: '$50-70'
  },
  {
    id: 'facial_009',
    name: 'Acne Facial',
    category: 'facial',
    description: 'Acne-focused treatment',
    estimatedDuration: '60-75 min',
    priceRange: '$80-110'
  },
  {
    id: 'facial_010',
    name: 'Hydrating Facial',
    category: 'facial',
    description: 'Deep moisture treatment',
    estimatedDuration: '60-75 min',
    priceRange: '$85-115'
  },
  {
    id: 'facial_011',
    name: 'Chemical Peel',
    category: 'facial',
    description: 'Advanced exfoliation treatment',
    estimatedDuration: '45-60 min',
    priceRange: '$100-150'
  },
  {
    id: 'facial_012',
    name: 'Microdermabrasion',
    category: 'facial',
    description: 'Skin resurfacing treatment',
    estimatedDuration: '45-60 min',
    priceRange: '$90-130'
  },
  {
    id: 'facial_013',
    name: 'LED Light Therapy',
    category: 'facial',
    description: 'Light-based skin treatment',
    estimatedDuration: '30-45 min',
    priceRange: '$60-90'
  },
  {
    id: 'facial_014',
    name: 'Oxygen Facial',
    category: 'facial',
    description: 'Oxygen infusion treatment',
    estimatedDuration: '60-75 min',
    priceRange: '$100-140'
  },
  {
    id: 'facial_015',
    name: 'Men\'s Facial',
    category: 'facial',
    description: 'Facial treatment for men',
    estimatedDuration: '45-60 min',
    priceRange: '$70-100'
  },
  {
    id: 'facial_016',
    name: 'Sensitive Skin Treatment',
    category: 'facial',
    description: 'Gentle treatment for sensitive skin',
    estimatedDuration: '50-60 min',
    priceRange: '$75-105'
  },

  // ===================
  // MAKEUP SERVICES
  // ===================
  {
    id: 'makeup_001',
    name: 'Dinner Party Makeup',
    category: 'makeup',
    description: 'Elegant evening makeup',
    estimatedDuration: '45-60 min',
    priceRange: '$60-80'
  },
  {
    id: 'makeup_002',
    name: 'Formal Party Makeup',
    category: 'makeup',
    description: 'Sophisticated event makeup',
    estimatedDuration: '60-75 min',
    priceRange: '$80-100'
  },
  {
    id: 'makeup_003',
    name: 'Bridal Silver',
    category: 'makeup',
    description: 'Bridal makeup package - Silver',
    estimatedDuration: '90-120 min',
    priceRange: '$150-200'
  },
  {
    id: 'makeup_004',
    name: 'Bridal Gold',
    category: 'makeup',
    description: 'Bridal makeup package - Gold',
    estimatedDuration: '2-3 hours',
    priceRange: '$200-250'
  },
  {
    id: 'makeup_005',
    name: 'Bridal Platinum',
    category: 'makeup',
    description: 'Bridal makeup package - Platinum',
    estimatedDuration: '3-4 hours',
    priceRange: '$250-350'
  },

  // Additional Makeup Services
  {
    id: 'makeup_006',
    name: 'Natural Makeup',
    category: 'makeup',
    description: 'Everyday natural look',
    estimatedDuration: '30-45 min',
    priceRange: '$40-60'
  },
  {
    id: 'makeup_007',
    name: 'Airbrush Makeup',
    category: 'makeup',
    description: 'Professional airbrush application',
    estimatedDuration: '60-90 min',
    priceRange: '$100-150'
  },
  {
    id: 'makeup_008',
    name: 'Photography Makeup',
    category: 'makeup',
    description: 'Camera-ready makeup',
    estimatedDuration: '75-90 min',
    priceRange: '$90-130'
  },
  {
    id: 'makeup_009',
    name: 'Makeup Lesson',
    category: 'makeup',
    description: 'Personal makeup instruction',
    estimatedDuration: '60-75 min',
    priceRange: '$80-120'
  },
  {
    id: 'makeup_010',
    name: 'Makeup Consultation',
    category: 'makeup',
    description: 'Color matching and advice',
    estimatedDuration: '30-45 min',
    priceRange: '$40-60'
  },
  {
    id: 'makeup_011',
    name: 'Makeup Touch-Up',
    category: 'makeup',
    description: 'Event refresh service',
    estimatedDuration: '15-20 min',
    priceRange: '$25-40'
  },
  {
    id: 'makeup_012',
    name: 'Contouring Makeup',
    category: 'makeup',
    description: 'Advanced contouring techniques',
    estimatedDuration: '60-75 min',
    priceRange: '$70-100'
  }
];

// Service lookup helpers
export const getServiceById = (id: string): Service | undefined => {
  return SERVICES.find(service => service.id === id);
};

export const getServicesByCategory = (category: Service['category']): Service[] => {
  return SERVICES.filter(service => service.category === category);
};

export const getAllServiceNames = (): string[] => {
  return SERVICES.map(service => service.name);
};

export const getTotalServiceCount = (): number => {
  return SERVICES.length;
};

// Category counts
export const getServiceCountByCategory = () => {
  return SERVICES.reduce((counts, service) => {
    counts[service.category] = (counts[service.category] || 0) + 1;
    return counts;
  }, {} as Record<Service['category'], number>);
};

/**
 * Service Database Summary:
 * 
 * Hair Services: 28 services
 * Threading Services: 6 services  
 * Waxing Services: 10 services
 * Eyebrow & Lash Services: 13 services
 * Facial Services: 16 services
 * Makeup Services: 12 services
 * 
 * Total: 85 comprehensive beauty services
 * 
 * Next Step: Apply metadata tags to each service across all 13 tag categories
 */

