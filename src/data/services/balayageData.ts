
import { Palette, Sparkles, Sun } from 'lucide-react';

export const balayageData = {
  meta: {
    backLink: '/hair-services',
    backText: 'Back to Hair Services',
    title: 'Balayage Services',
    subtitle: 'Hand-Painted Highlights • Natural Dimension',
    ctaText: 'Book Balayage - $110+',
    theme: 'amber' as const
  },
  hero: {
    title: 'Hand-Painted Balayage',
    description: 'Achieve natural-looking highlights with our expert balayage technique for beautiful, dimensional color',
    highlight: {
      title: 'Sun-Kissed Perfection',
      description: 'Our hand-painted technique creates natural-looking highlights that grow out beautifully with minimal maintenance'
    }
  },
  serviceOptions: [
    {
      title: 'Natural Balayage',
      description: 'Subtle highlights for a sun-kissed look',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$110',
      duration: '3-4 hours',
      details: ['Consultation included', 'Hand-painted technique', 'Toning service', 'Styling finish'],
      prefilledService: {
        name: 'Natural Balayage',
        price: '$110',
        duration: '3-4 hours'
      }
    },
    {
      title: 'Bold Balayage',
      description: 'Dramatic contrast for maximum impact',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$140',
      duration: '4-5 hours',
      details: ['Advanced technique', 'Multiple toning', 'Deep conditioning', 'Professional styling'],
      prefilledService: {
        name: 'Bold Balayage',
        price: '$140',
        duration: '4-5 hours'
      }
    },
    {
      title: 'Corrective Balayage',
      description: 'Fix previous color work with expert technique',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$160',
      duration: '5-6 hours',
      details: ['Color correction', 'Custom formulation', 'Hair treatment', 'Maintenance plan'],
      prefilledService: {
        name: 'Corrective Balayage',
        price: '$160',
        duration: '5-6 hours'
      }
    }
  ],
  processSteps: [
    {
      step: 1,
      title: 'Color Consultation',
      description: 'We discuss your desired look and assess your hair to create the perfect balayage plan',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '15-20 minutes'
    },
    {
      step: 2,
      title: 'Hand-Painting Technique',
      description: 'Carefully applied highlights using the traditional balayage method for natural placement',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '2-3 hours'
    },
    {
      step: 3,
      title: 'Processing & Toning',
      description: 'Gentle processing followed by custom toning to achieve your perfect shade',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '45-60 minutes'
    },
    {
      step: 4,
      title: 'Styling & Finish',
      description: 'Professional blow-dry and styling to showcase your beautiful new balayage',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '30-45 minutes'
    }
  ],
  transformations: [
    {
      before: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=400&fit=crop',
      type: 'Natural Balayage',
      weeks: 'Fresh highlights with natural grow-out'
    },
    {
      before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=400&fit=crop',
      type: 'Bold Contrast',
      weeks: 'Dramatic dimension and movement'
    },
    {
      before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop',
      type: 'Corrective Work',
      weeks: 'Professional correction and enhancement'
    }
  ]
};
