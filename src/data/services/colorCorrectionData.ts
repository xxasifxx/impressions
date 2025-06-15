
import { AlertTriangle, Shield, Palette } from 'lucide-react';

export const colorCorrectionData = {
  meta: {
    backLink: '/hair-services',
    backText: 'Back to Hair Services',
    title: 'Color Correction Experts',
    subtitle: 'Professional Color Repair • Hair Restoration',
    ctaText: 'Book Consultation',
    theme: 'rose' as const
  },
  hero: {
    title: 'Color Correction Specialists',
    description: 'When color goes wrong, we make it right. Expert correction for all hair color mishaps.',
    highlight: {
      title: 'Professional Color Repair',
      description: 'Complex process requiring expertise - we prioritize hair health while achieving your color goals'
    }
  },
  serviceOptions: [
    {
      title: 'Consultation & Assessment',
      description: 'Thorough analysis and correction planning',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$35',
      duration: '45 minutes',
      details: ['Hair damage assessment', 'Color analysis', 'Correction plan', 'Treatment timeline'],
      prefilledService: {
        name: 'Color Correction Consultation',
        price: '$35',
        duration: '45 minutes'
      }
    },
    {
      title: 'Basic Color Correction',
      description: 'Fix minor color issues and toning problems',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$125',
      duration: '2-3 hours',
      details: ['Single session correction', 'Toning service', 'Deep conditioning', 'Styling finish'],
      prefilledService: {
        name: 'Basic Color Correction',
        price: '$125',
        duration: '2-3 hours'
      }
    },
    {
      title: 'Complex Correction',
      description: 'Multiple session correction for severely damaged hair',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$200+',
      duration: '4+ hours',
      details: ['Multi-session process', 'Hair restoration treatments', 'Custom formulation', 'Ongoing care plan'],
      prefilledService: {
        name: 'Complex Color Correction',
        price: '$200+',
        duration: '4+ hours'
      }
    }
  ],
  processSteps: [
    {
      step: 1,
      title: 'Damage Assessment',
      description: 'Thorough analysis of current color, hair condition, and previous chemical treatments',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '20-30 minutes'
    },
    {
      step: 2,
      title: 'Correction Planning',
      description: 'Custom strategy developed based on your hair\'s needs and desired outcome',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '15 minutes'
    },
    {
      step: 3,
      title: 'Gentle Correction Process',
      description: 'Careful application using professional techniques to minimize further damage',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '2-4 hours'
    },
    {
      step: 4,
      title: 'Conditioning Treatment',
      description: 'Deep conditioning and protein treatments to restore hair health',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '30 minutes'
    }
  ],
  transformations: [
    {
      before: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=300&h=400&fit=crop',
      type: 'Brassy Blonde Fix',
      weeks: 'Orange tones corrected to beautiful blonde'
    },
    {
      before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=400&fit=crop',
      type: 'Uneven Color Repair',
      weeks: 'Patchy color transformed to even tone'
    },
    {
      before: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1506085452766-f3d992529149?w=300&h=400&fit=crop',
      type: 'Damaged Hair Recovery',
      weeks: 'Over-processed hair restored to health'
    }
  ]
};
