
import { Scissors, Palette, Sparkles, Clock, Star, Users, Award } from 'lucide-react';

export interface UnifiedService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
  imageUrl: string;
  featured?: boolean;
  difficulty?: 'Easy' | 'Moderate' | 'Advanced';
  userJourneys?: string[];
  packageCompatible?: string[];
  details?: {
    specialist?: string;
    process?: string[];
    benefits?: string[];
    perfectFor?: string[];
    preparation?: string[];
    aftercare?: string[];
  };
  clientStory?: {
    name: string;
    quote: string;
    rating: number;
    transformation?: string;
  };
}

// Hair Salon Services
const hairSalonServices: UnifiedService[] = [
  {
    id: 'hair-precision-cut',
    name: 'Precision Cut',
    description: 'Expert haircuts tailored to your face shape and lifestyle. Our stylists create looks that enhance your natural features.',
    price: '$45',
    duration: '45 minutes',
    category: 'Cuts & Styling',
    domain: 'hair-salon',
    imageUrl: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
    featured: true,
    difficulty: 'Easy',
    userJourneys: ['fresh-start', 'special-occasion', 'maintenance'],
    packageCompatible: ['hair-color', 'hair-styling'],
    details: {
      specialist: 'Master Stylist Sarah',
      process: [
        'Consultation to understand your lifestyle and preferences',
        'Face shape analysis for the most flattering cut',
        'Precision cutting using professional techniques',
        'Styling to show you how to maintain your new look'
      ],
      benefits: [
        'Enhances your natural features',
        'Easy to style at home',
        'Grows out beautifully',
        'Boosts confidence'
      ],
      perfectFor: ['Busy professionals', 'Anyone wanting a fresh look', 'Special occasions'],
      preparation: ['Come with clean, dry hair', 'Bring inspiration photos', 'Be ready to discuss your routine'],
      aftercare: ['Use quality shampoo and conditioner', 'Regular trims every 6-8 weeks', 'Follow styling tips provided']
    },
    clientStory: {
      name: 'Jessica M.',
      quote: 'Sarah transformed my unruly hair into the most gorgeous, manageable cut. I get compliments every day!',
      rating: 5,
      transformation: 'From long, damaged hair to a chic bob'
    }
  },
  {
    id: 'hair-balayage',
    name: 'Balayage Highlights',
    description: 'Hand-painted highlights that create natural-looking dimension. Perfect for low-maintenance color that grows out beautifully.',
    price: '$120',
    duration: '3 hours',
    category: 'Color Services',
    domain: 'hair-salon',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=400&fit=crop',
    featured: true,
    difficulty: 'Advanced',
    userJourneys: ['transformation', 'maintenance', 'special-occasion'],
    packageCompatible: ['hair-cut', 'hair-treatment'],
    details: {
      specialist: 'Color Expert Maria',
      process: [
        'Color consultation and strand test',
        'Strategic sectioning for natural placement',
        'Hand-painting technique for seamless blending',
        'Custom toning for perfect shade',
        'Deep conditioning treatment'
      ],
      benefits: [
        'Natural-looking highlights',
        'Low maintenance grow-out',
        'Adds dimension and movement',
        'Customizable to your skin tone'
      ],
      perfectFor: ['First-time color clients', 'Busy schedules', 'Natural look enthusiasts'],
      preparation: ['Avoid washing hair day of service', 'Come with no product buildup', 'Wear old clothes'],
      aftercare: ['Use color-safe shampoo', 'Deep condition weekly', 'Protect from UV rays']
    },
    clientStory: {
      name: 'Amanda K.',
      quote: 'Maria created the most beautiful sun-kissed highlights. People think I spend my summers in California!',
      rating: 5,
      transformation: 'Natural blonde highlights on brown hair'
    }
  },
  {
    id: 'hair-full-color',
    name: 'Full Color Service',
    description: 'Complete hair color transformation or touch-up. From subtle changes to dramatic makeovers.',
    price: '$85',
    duration: '2.5 hours',
    category: 'Color Services', 
    domain: 'hair-salon',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    difficulty: 'Moderate',
    userJourneys: ['transformation', 'maintenance', 'confidence-boost'],
    packageCompatible: ['hair-cut', 'hair-treatment'],
    details: {
      specialist: 'Color Specialist Lisa',
      process: [
        'Detailed color consultation',
        'Patch test for allergies',
        'Professional color application',
        'Processing with regular monitoring',
        'Rinse, condition, and style'
      ],
      benefits: [
        'Complete color coverage',
        'Long-lasting results',
        'Professional formulation',
        'Even color distribution'
      ],
      perfectFor: ['Gray coverage', 'Dramatic color changes', 'Color corrections'],
      preparation: ['Avoid washing hair 24 hours prior', 'Remove all styling products', 'Eat a good meal beforehand'],
      aftercare: ['Wait 48 hours before washing', 'Use sulfate-free products', 'Schedule regular touch-ups']
    },
    clientStory: {
      name: 'Rachel S.',
      quote: 'Lisa helped me go from gray to gorgeous! The color is exactly what I dreamed of.',
      rating: 5,
      transformation: 'Gray coverage with rich chocolate brown'
    }
  },
  {
    id: 'hair-root-touchup',
    name: 'Root Touch-Up',
    description: 'Quick and convenient root color refresh between full color services. Perfect for maintenance.',
    price: '$65',
    duration: '1 hour',
    category: 'Color Services',
    domain: 'hair-salon',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=600&h=400&fit=crop',
    difficulty: 'Easy',
    userJourneys: ['maintenance', 'quick-fix'],
    packageCompatible: ['hair-gloss', 'hair-styling'],
    details: {
      specialist: 'Any Color Specialist',
      process: [
        'Root assessment and color matching',
        'Precise application to new growth only',
        'Quick processing time',
        'Rinse and basic styling'
      ],
      benefits: [
        'Quick maintenance solution',
        'Cost-effective between full colors',
        'Seamless color blending',
        'Convenient scheduling'
      ],
      perfectFor: ['Busy schedules', 'Color maintenance', 'Gray coverage'],
      preparation: ['Come with unwashed hair', 'No heavy styling products', 'Allow extra time for checkout'],
      aftercare: ['Follow standard color care', 'Book next appointment', 'Use recommended products']
    },
    clientStory: {
      name: 'Jennifer L.',
      quote: 'Perfect for keeping my color fresh between appointments. Quick and professional!',
      rating: 5,
      transformation: 'Seamless root coverage'
    }
  },
  {
    id: 'hair-extensions',
    name: 'Hair Extensions',
    description: 'Add instant length and volume with professional-grade extensions. Multiple application methods available.',
    price: '$150',
    duration: '2 hours',
    category: 'Extensions',
    domain: 'hair-salon',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    difficulty: 'Advanced',
    userJourneys: ['transformation', 'special-occasion'],
    packageCompatible: ['hair-cut', 'hair-styling'],
    details: {
      specialist: 'Extension Expert Nina',
      process: [
        'Hair assessment and color matching',
        'Selection of extension method',
        'Professional application',
        'Blending and styling',
        'Care instruction tutorial'
      ],
      benefits: [
        'Instant length and volume',
        'Natural-looking results',
        'Temporary or semi-permanent options',
        'Boost confidence immediately'
      ],
      perfectFor: ['Special events', 'Thin hair', 'Growing out a cut', 'Length goals'],
      preparation: ['Clean, dry hair required', 'Avoid oils and conditioners', 'Plan for longer appointment'],
      aftercare: ['Gentle brushing techniques', 'Specialized products', 'Regular maintenance appointments']
    },
    clientStory: {
      name: 'Sophia R.',
      quote: 'Nina gave me the long hair I\'ve always wanted! The extensions look so natural.',
      rating: 5,
      transformation: 'Short bob to long flowing hair'
    }
  },
  {
    id: 'hair-blowout',
    name: 'Professional Blowout',
    description: 'Smooth, voluminous styling that lasts for days. Perfect for special events or weekly maintenance.',
    price: '$35',
    duration: '30 minutes',
    category: 'Cuts & Styling',
    domain: 'hair-salon',
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
    difficulty: 'Easy',
    userJourneys: ['special-occasion', 'maintenance', 'confidence-boost'],
    packageCompatible: ['hair-cut', 'hair-treatment'],
    details: {
      specialist: 'Styling Team',
      process: [
        'Shampoo and condition',
        'Heat protectant application',
        'Section-by-section blow drying',
        'Finishing touches with styling tools',
        'Setting spray for longevity'
      ],
      benefits: [
        'Salon-perfect smoothness',
        'Long-lasting results',
        'Professional finish',
        'Saves time at home'
      ],
      perfectFor: ['Special events', 'Work presentations', 'Date nights', 'Weekly pampering'],
      preparation: ['No need to wash beforehand', 'Arrive with damp or dry hair', 'Communicate desired style'],
      aftercare: ['Sleep on silk pillowcase', 'Use dry shampoo for refresh', 'Avoid humidity when possible']
    },
    clientStory: {
      name: 'Michelle T.',
      quote: 'The blowout lasted four days! My hair has never looked so smooth and shiny.',
      rating: 5,
      transformation: 'Frizzy hair to salon-smooth finish'
    }
  }
];

// Makeup Studio Services  
const makeupStudioServices: UnifiedService[] = [
  {
    id: 'makeup-glam',
    name: 'Glam Makeup',
    description: 'Show-stopping makeup perfect for nights out, parties, and special events. Bold, beautiful, and photo-ready.',
    price: '$65',
    duration: '60 minutes',
    category: 'Event Makeup',
    domain: 'makeup-studio',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop',
    featured: true,
    difficulty: 'Moderate',
    userJourneys: ['special-occasion', 'confidence-boost', 'transformation'],
    packageCompatible: ['lash-extensions', 'brow-styling'],
    details: {
      specialist: 'Makeup Artist Zoe',
      process: [
        'Skin prep and primer application',
        'Full coverage foundation matching',
        'Dramatic eye makeup with lashes',
        'Contouring and highlighting',
        'Bold lip color application'
      ],
      benefits: [
        'Photo-ready finish',
        'Long-wearing formulas',
        'Professional techniques',
        'Instant confidence boost'
      ],
      perfectFor: ['Parties and events', 'Photo shoots', 'Date nights', 'Special celebrations'],
      preparation: ['Arrive with clean skin', 'Moisturize beforehand', 'Bring outfit photos for color coordination'],
      aftercare: ['Use setting spray provided', 'Blot lips instead of wiping', 'Remove gently with oil cleanser']
    },
    clientStory: {
      name: 'Isabella C.',
      quote: 'Zoe made me feel like a movie star! The makeup was flawless and lasted all night.',
      rating: 5,
      transformation: 'Natural everyday look to glamorous evening style'
    }
  },
  {
    id: 'makeup-bridal',
    name: 'Bridal Makeup',
    description: 'Your perfect wedding day look. Timeless, elegant makeup that photographs beautifully and lasts through tears of joy.',
    price: '$125',
    duration: '90 minutes',
    category: 'Bridal',
    domain: 'makeup-studio',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=600&h=400&fit=crop',
    featured: true,
    difficulty: 'Advanced',
    userJourneys: ['special-occasion', 'transformation'],
    packageCompatible: ['lash-extensions', 'brow-styling', 'trial-run'],
    details: {
      specialist: 'Bridal Specialist Emma',
      process: [
        'Detailed bridal consultation',
        'Long-wear base application',
        'Romantic eye makeup design',
        'Soft contouring and glow',
        'Classic bridal lip color',
        'Setting for all-day wear'
      ],
      benefits: [
        'Photograph beautifully',
        'Waterproof formulations',
        'Classic, timeless look',
        'Complements wedding dress'
      ],
      perfectFor: ['Wedding ceremonies', 'Engagement photos', 'Bridal showers', 'Anniversary celebrations'],
      preparation: ['Schedule trial makeup session', 'Exfoliate and moisturize skin', 'Bring dress photos and jewelry'],
      aftercare: ['Touch-up kit provided', 'Lipstick for reapplication', 'Gentle removal instructions']
    },
    clientStory: {
      name: 'Caroline M.',
      quote: 'Emma made me feel like the most beautiful bride. The makeup was perfect from ceremony to reception!',
      rating: 5,
      transformation: 'Radiant bridal glow that lasted 12+ hours'
    }
  },
  {
    id: 'makeup-natural',
    name: 'Natural Enhancement',
    description: 'Subtle, everyday makeup that enhances your natural beauty. Perfect for work, casual events, or learning new techniques.',
    price: '$45',
    duration: '45 minutes',
    category: 'Everyday Makeup',
    domain: 'makeup-studio',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop',
    difficulty: 'Easy',
    userJourneys: ['confidence-boost', 'fresh-start', 'learning'],
    packageCompatible: ['brow-styling', 'lash-lift'],
    details: {
      specialist: 'Makeup Artist Lily',
      process: [
        'Skin analysis and prep',
        'Light coverage foundation',
        'Natural eye enhancement',
        'Soft blush and highlight',
        'Natural lip color'
      ],
      benefits: [
        'Enhances natural features',
        'Comfortable, lightweight feel',
        'Easy to recreate at home',
        'Professional color matching'
      ],
      perfectFor: ['Everyday wear', 'Work environments', 'Makeup beginners', 'Natural beauty lovers'],
      preparation: ['Clean, moisturized skin', 'Remove any existing makeup', 'Think about daily routine'],
      aftercare: ['Product recommendations provided', 'Application tips included', 'Easy removal process']
    },
    clientStory: {
      name: 'Hannah D.',
      quote: 'Lily showed me how to enhance my features naturally. I finally understand how to do my own makeup!',
      rating: 5,
      transformation: 'No-makeup look to polished natural beauty'
    }
  },
  {
    id: 'lash-extensions',
    name: 'Lash Extensions',
    description: 'Individual lash extensions for fuller, longer lashes without mascara. Wake up beautiful every day.',
    price: '$85',
    duration: '90 minutes',
    category: 'Lash Services',
    domain: 'makeup-studio',
    imageUrl: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=600&h=400&fit=crop',
    difficulty: 'Advanced',
    userJourneys: ['transformation', 'maintenance', 'confidence-boost'],
    packageCompatible: ['brow-styling', 'makeup-application'],
    details: {
      specialist: 'Lash Technician Alex',
      process: [
        'Eye area cleaning and preparation',
        'Individual lash isolation',
        'Precise extension application',
        'Length and curl customization',
        'Final inspection and styling'
      ],
      benefits: [
        'Fuller, longer-looking lashes',
        'No daily mascara needed',
        'Waterproof and sweatproof',
        'Customizable length and volume'
      ],
      perfectFor: ['Busy lifestyles', 'Special events', 'Vacations', 'Daily glamour'],
      preparation: ['Remove all eye makeup', 'Avoid caffeine before appointment', 'Plan for relaxation time'],
      aftercare: ['Avoid water for 24 hours', 'Use oil-free products', 'Schedule fill appointments']
    },
    clientStory: {
      name: 'Megan P.',
      quote: 'Alex gave me the lashes I\'ve always dreamed of! I wake up feeling gorgeous every morning.',
      rating: 5,
      transformation: 'Short, sparse lashes to full, dramatic length'
    }
  },
  {
    id: 'brow-styling',
    name: 'Eyebrow Styling',
    description: 'Professional eyebrow shaping, tinting, and styling. Frame your face with perfectly sculpted brows.',
    price: '$35',
    duration: '30 minutes',
    category: 'Brow Services',
    domain: 'makeup-studio',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=600&h=400&fit=crop',
    difficulty: 'Moderate',
    userJourneys: ['maintenance', 'fresh-start', 'confidence-boost'],
    packageCompatible: ['makeup-application', 'lash-services'],
    details: {
      specialist: 'Brow Specialist Jordan',
      process: [
        'Brow consultation and mapping',
        'Professional shaping and trimming',
        'Tinting to desired shade',
        'Styling with professional products',
        'Aftercare instruction'
      ],
      benefits: [
        'Perfectly shaped brows',
        'Enhanced facial symmetry',
        'Long-lasting tint',
        'Professional expertise'
      ],
      perfectFor: ['Overgrown brows', 'Special events', 'Regular maintenance', 'Brow transformation'],
      preparation: ['Grow out brows for 2-3 weeks', 'Avoid retinoids around brow area', 'Communicate desired shape'],
      aftercare: ['Avoid water for 24 hours', 'No exfoliating products', 'Schedule regular touch-ups']
    },
    clientStory: {
      name: 'Taylor W.',
      quote: 'Jordan transformed my brows completely! They frame my face perfectly now.',
      rating: 5,
      transformation: 'Unruly, shapeless brows to perfectly sculpted arches'
    }
  },
  {
    id: 'makeup-lesson',
    name: 'Personal Makeup Lesson',
    description: 'One-on-one makeup instruction tailored to your skill level and goals. Learn professional techniques.',
    price: '$95',
    duration: '75 minutes',
    category: 'Education',
    domain: 'makeup-studio',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    difficulty: 'Easy',
    userJourneys: ['learning', 'confidence-boost', 'fresh-start'],
    packageCompatible: ['product-consultation', 'follow-up-session'],
    details: {
      specialist: 'Senior Artist Casey',
      process: [
        'Skill assessment and goal setting',
        'Product knowledge and selection',
        'Step-by-step technique instruction',
        'Practice with guidance',
        'Personalized routine creation'
      ],
      benefits: [
        'Personalized instruction',
        'Professional techniques',
        'Product recommendations',
        'Confidence building'
      ],
      perfectFor: ['Makeup beginners', 'Skill improvement', 'Product confusion', 'Technique refinement'],
      preparation: ['Bring current makeup collection', 'Think about makeup goals', 'Come with clean face'],
      aftercare: ['Practice routine provided', 'Product list included', 'Follow-up session available']
    },
    clientStory: {
      name: 'Sarah K.',
      quote: 'Casey taught me everything I needed to know! I finally feel confident doing my own makeup.',
      rating: 5,
      transformation: 'Makeup novice to confident self-application'
    }
  }
];

// Med Spa Services
const medSpaServices: UnifiedService[] = [
  {
    id: 'gold-facial',
    name: 'Gold Radiance Facial',
    description: 'Luxurious anti-aging facial with 24k gold infusion. Reduces fine lines and promotes radiant, youthful skin.',
    price: '$95',
    duration: '75 minutes',
    category: 'Facial Treatments',
    domain: 'med-spa',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
    featured: true,
    difficulty: 'Advanced',
    userJourneys: ['self-care', 'transformation', 'special-occasion'],
    packageCompatible: ['eyebrow-threading', 'dermaplaning'],
    details: {
      specialist: 'Esthetician Dr. Patel',
      process: [
        'Deep cleansing and skin analysis',
        'Gentle exfoliation treatment',
        '24k gold mask application',
        'Specialized anti-aging serums',
        'Moisturizing and sun protection'
      ],
      benefits: [
        'Reduces fine lines and wrinkles',
        'Improves skin elasticity',
        'Promotes collagen production',
        'Immediate radiant glow'
      ],
      perfectFor: ['Mature skin', 'Special occasions', 'Anti-aging goals', 'Luxury skincare'],
      preparation: ['Avoid retinoids 48 hours prior', 'Remove all makeup', 'Stay hydrated'],
      aftercare: ['Avoid sun exposure', 'Use gentle skincare', 'Apply SPF daily', 'Stay hydrated']
    },
    clientStory: {
      name: 'Patricia L.',
      quote: 'Dr. Patel\'s gold facial made my skin look 10 years younger! The glow lasted for weeks.',
      rating: 5,
      transformation: 'Dull, aged skin to radiant, youthful glow'
    }
  },
  {
    id: 'eyebrow-threading',
    name: 'Precision Eyebrow Threading',
    description: 'Ancient technique for precise hair removal. Creates clean, defined brow shapes without chemicals.',
    price: '$20',
    duration: '15 minutes',
    category: 'Hair Removal',
    domain: 'med-spa',
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop',
    difficulty: 'Moderate',
    userJourneys: ['maintenance', 'quick-fix', 'natural-beauty'],
    packageCompatible: ['facial-treatments', 'lip-threading'],
    details: {
      specialist: 'Threading Expert Priya',
      process: [
        'Brow consultation and mapping',
        'Sanitization of work area',
        'Precise threading technique',
        'Soothing aftercare application',
        'Styling and finishing touches'
      ],
      benefits: [
        'Precise hair removal',
        'No chemicals or heat',
        'Suitable for sensitive skin',
        'Long-lasting results'
      ],
      perfectFor: ['Sensitive skin', 'Precise shaping', 'Chemical-free hair removal', 'Regular maintenance'],
      preparation: ['Let brows grow for 2 weeks', 'Avoid retinoids in area', 'Come makeup-free'],
      aftercare: ['Avoid touching area', 'Apply soothing gel', 'No makeup for 2 hours', 'Avoid sun exposure']
    },
    clientStory: {
      name: 'Fatima A.',
      quote: 'Priya is a threading artist! My brows have never looked so perfect and symmetrical.',
      rating: 5,
      transformation: 'Overgrown brows to perfectly sculpted shape'
    }
  },
  {
    id: 'hydra-facial',
    name: 'HydraFacial Treatment',
    description: 'Three-step facial treatment that cleanses, extracts, and hydrates. Immediate results with no downtime.',
    price: '$120',
    duration: '60 minutes',
    category: 'Facial Treatments',
    domain: 'med-spa',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop',
    featured: true,
    difficulty: 'Moderate',
    userJourneys: ['self-care', 'quick-fix', 'transformation'],
    packageCompatible: ['led-therapy', 'dermaplaning'],
    details: {
      specialist: 'Advanced Esthetician Kim',
      process: [
        'Deep cleansing and exfoliation',
        'Painless extraction of impurities',
        'Hydrating serum infusion',
        'Antioxidant protection',
        'SPF application'
      ],
      benefits: [
        'Immediate visible results',
        'No downtime required',
        'Suitable for all skin types',
        'Improves skin texture'
      ],
      perfectFor: ['All skin types', 'Before events', 'Regular skincare maintenance', 'Busy schedules'],
      preparation: ['Avoid exfoliating 24 hours prior', 'Remove all makeup', 'Communicate skin concerns'],
      aftercare: ['Apply gentle moisturizer', 'Use SPF protection', 'Avoid harsh products', 'Stay hydrated']
    },
    clientStory: {
      name: 'Jennifer R.',
      quote: 'Kim\'s HydraFacial gave me glowing skin instantly! Perfect before my daughter\'s wedding.',
      rating: 5,
      transformation: 'Dull, congested skin to smooth, radiant complexion'
    }
  },
  {
    id: 'brazilian-wax',
    name: 'Brazilian Wax',
    description: 'Professional full bikini wax service. Comfortable, hygienic environment with experienced specialists.',
    price: '$65',
    duration: '30 minutes',
    category: 'Hair Removal',
    domain: 'med-spa',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
    difficulty: 'Advanced',
    userJourneys: ['self-care', 'special-occasion', 'maintenance'],
    packageCompatible: ['ingrown-hair-treatment', 'soothing-treatment'],
    details: {
      specialist: 'Licensed Esthetician Maria',
      process: [
        'Consultation and preparation',
        'Sanitization and positioning',
        'Professional wax application',
        'Quick, efficient removal',
        'Soothing aftercare treatment'
      ],
      benefits: [
        'Long-lasting smoothness',
        'Professional technique',
        'Hygienic environment',
        'Reduces hair growth over time'
      ],
      perfectFor: ['Vacation preparation', 'Special occasions', 'Regular maintenance', 'Professional results'],
      preparation: ['Hair should be 1/4 inch long', 'Exfoliate 24 hours before', 'Avoid caffeine', 'Take pain reliever if needed'],
      aftercare: ['Wear loose clothing', 'Avoid hot baths', 'Exfoliate after 48 hours', 'Moisturize regularly']
    },
    clientStory: {
      name: 'Lisa M.',
      quote: 'Maria made the experience so comfortable and professional. Results lasted much longer than expected!',
      rating: 5,
      transformation: 'Smooth, professional results lasting 4-6 weeks'
    }
  },
  {
    id: 'dermaplaning',
    name: 'Dermaplaning Facial',
    description: 'Gentle exfoliation that removes dead skin cells and peach fuzz. Reveals smooth, radiant skin instantly.',
    price: '$75',
    duration: '45 minutes',
    category: 'Facial Treatments',
    domain: 'med-spa',
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop',
    difficulty: 'Moderate',
    userJourneys: ['transformation', 'special-occasion', 'self-care'],
    packageCompatible: ['hydrating-mask', 'led-therapy'],
    details: {
      specialist: 'Master Esthetician Sarah',
      process: [
        'Thorough skin cleansing',
        'Precise dermaplaning technique',
        'Gentle exfoliation',
        'Nourishing serum application',
        'Moisturizing and protection'
      ],
      benefits: [
        'Immediate smooth texture',
        'Better product absorption',
        'Makeup applies flawlessly',
        'No downtime required'
      ],
      perfectFor: ['Special events', 'Makeup preparation', 'Texture concerns', 'Regular exfoliation'],
      preparation: ['Avoid retinoids for 48 hours', 'No facial hair removal', 'Come with clean skin'],
      aftercare: ['Use gentle products', 'Apply SPF religiously', 'Avoid exfoliating', 'Moisturize well']
    },
    clientStory: {
      name: 'Emily T.',
      quote: 'Sarah\'s dermaplaning made my skin so smooth! My makeup has never looked better.',
      rating: 5,
      transformation: 'Rough, textured skin to baby-smooth finish'
    }
  },
  {
    id: 'led-light-therapy',
    name: 'LED Light Therapy',
    description: 'Advanced light therapy for acne, anti-aging, and skin rejuvenation. Non-invasive with proven results.',
    price: '$55',
    duration: '30 minutes',
    category: 'Advanced Treatments',
    domain: 'med-spa',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    difficulty: 'Easy',
    userJourneys: ['transformation', 'self-care', 'healing'],
    packageCompatible: ['facial-treatments', 'serum-infusion'],
    details: {
      specialist: 'Technology Specialist David',
      process: [
        'Skin assessment and preparation',
        'Protective eyewear fitting',
        'Customized light therapy session',
        'Relaxation and treatment time',
        'Post-treatment evaluation'
      ],
      benefits: [
        'Reduces acne and inflammation',
        'Stimulates collagen production',
        'Improves skin tone',
        'Non-invasive and painless'
      ],
      perfectFor: ['Acne treatment', 'Anti-aging goals', 'Skin rejuvenation', 'Maintenance therapy'],
      preparation: ['Remove all makeup', 'Avoid sun exposure', 'Stay hydrated', 'Communicate skin concerns'],
      aftercare: ['Apply gentle moisturizer', 'Use SPF protection', 'Avoid harsh treatments', 'Schedule follow-ups']
    },
    clientStory: {
      name: 'Michael C.',
      quote: 'David\'s LED therapy cleared my acne completely! My skin looks better than it has in years.',
      rating: 5,
      transformation: 'Acne-prone skin to clear, healthy complexion'
    }
  }
];

// Combined services array
export const allUnifiedServices: UnifiedService[] = [
  ...hairSalonServices,
  ...makeupStudioServices, 
  ...medSpaServices
];

// Package deals
export const packageDeals = [
  {
    id: 'bridal-complete',
    name: 'Bridal Complete Package',
    description: 'Everything for your perfect wedding day',
    services: ['hair-precision-cut', 'hair-balayage', 'makeup-bridal', 'lash-extensions'],
    originalPrice: 395,
    packagePrice: 320,
    savings: 75,
    duration: '5 hours',
    perfectFor: 'Brides-to-be'
  },
  {
    id: 'glow-up-transformation',
    name: 'Complete Glow-Up',
    description: 'Total transformation package',
    services: ['hair-precision-cut', 'hair-full-color', 'makeup-lesson', 'gold-facial'],
    originalPrice: 350,
    packagePrice: 280,
    savings: 70,
    duration: '6 hours',
    perfectFor: 'Major life changes'
  },
  {
    id: 'maintenance-monthly',
    name: 'Monthly Maintenance',
    description: 'Keep yourself looking fresh',
    services: ['hair-root-touchup', 'eyebrow-threading', 'hydra-facial'],
    originalPrice: 200,
    packagePrice: 160,
    savings: 40,
    duration: '2.5 hours',
    perfectFor: 'Regular upkeep'
  }
];

// Helper functions
export const getServicesByDomain = (domain: string): UnifiedService[] => {
  return allUnifiedServices.filter(service => service.domain === domain);
};

export const getServiceCategories = (domain: string): string[] => {
  const services = getServicesByDomain(domain);
  return [...new Set(services.map(service => service.category))];
};

export const getServicesByCategory = (domain: string, category: string): UnifiedService[] => {
  return getServicesByDomain(domain).filter(service => service.category === category);
};

export const getServicesByUserJourney = (domain: string, journey: string): UnifiedService[] => {
  return getServicesByDomain(domain).filter(service => 
    service.userJourneys?.includes(journey)
  );
};

export const getFeaturedServices = (domain?: string): UnifiedService[] => {
  const services = domain ? getServicesByDomain(domain) : allUnifiedServices;
  return services.filter(service => service.featured);
};

// User journey definitions
export const userJourneys = {
  'hair-salon': [
    { id: 'fresh-start', title: 'Fresh Start', description: 'New look, new you' },
    { id: 'special-occasion', title: 'Special Occasion', description: 'Look amazing for your event' },
    { id: 'maintenance', title: 'Maintenance', description: 'Keep your look fresh' },
    { id: 'transformation', title: 'Transformation', description: 'Dramatic change' },
    { id: 'confidence-boost', title: 'Confidence Boost', description: 'Feel your best' }
  ],
  'makeup-studio': [
    { id: 'special-occasion', title: 'Special Event', description: 'Perfect for your big day' },
    { id: 'learning', title: 'Learn & Grow', description: 'Master new techniques' },
    { id: 'confidence-boost', title: 'Confidence Builder', description: 'Feel beautiful' },
    { id: 'transformation', title: 'Complete Makeover', description: 'Dramatic new look' },
    { id: 'maintenance', title: 'Regular Touch-ups', description: 'Keep looking fresh' }
  ],
  'med-spa': [
    { id: 'self-care', title: 'Self-Care Sunday', description: 'Pamper yourself' },
    { id: 'transformation', title: 'Skin Transformation', description: 'Radiant new you' },
    { id: 'healing', title: 'Healing & Recovery', description: 'Restore your skin' },
    { id: 'maintenance', title: 'Regular Wellness', description: 'Ongoing care' },
    { id: 'quick-fix', title: 'Quick Refresh', description: 'Fast results' }
  ]
};
