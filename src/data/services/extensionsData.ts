
import { Zap, Heart, Clock } from 'lucide-react';

export const extensionsData = {
  meta: {
    backLink: '/hair-services',
    backText: 'Back to Hair Services',
    title: 'Hair Extensions',
    subtitle: 'Length & Volume • Instant Transformation',
    ctaText: 'Book Extensions - $75+',
    theme: 'purple' as const
  },
  hero: {
    title: 'Hair Extensions',
    description: 'Add instant length and volume with our professional hair extension services',
    highlight: {
      title: 'Instant Transformation',
      description: 'From clip-ins for special occasions to semi-permanent tape-ins for everyday glamour'
    }
  },
  serviceOptions: [
    {
      title: 'Tape-In Extensions',
      description: 'Semi-permanent extensions that last 6-8 weeks',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$150',
      duration: '2-3 hours',
      details: ['Professional application', '6-8 weeks wear', 'Reusable with maintenance', 'Natural movement'],
      prefilledService: {
        name: 'Tape-In Extensions',
        price: '$150',
        duration: '2-3 hours'
      }
    },
    {
      title: 'Clip-In Extensions',
      description: 'Temporary extensions for special occasions',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$75',
      duration: '1 hour',
      details: ['Same day application', 'Perfect for events', 'No commitment', 'Instant volume'],
      prefilledService: {
        name: 'Clip-In Extensions',
        price: '$75',
        duration: '1 hour'
      }
    },
    {
      title: 'Sew-In Extensions',
      description: 'Long-lasting extensions with natural movement',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$200',
      duration: '3-4 hours',
      details: ['Secure attachment', '2-3 months wear', 'Natural hair protection', 'Professional styling'],
      prefilledService: {
        name: 'Sew-In Extensions',
        price: '$200',
        duration: '3-4 hours'
      }
    }
  ],
  processSteps: [
    {
      step: 1,
      title: 'Extension Consultation',
      description: 'We assess your hair and discuss your goals to choose the best extension method',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      duration: '15 minutes'
    },
    {
      step: 2,
      title: 'Color Matching',
      description: 'Perfect color matching to ensure seamless blending with your natural hair',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      duration: '10 minutes'
    },
    {
      step: 3,
      title: 'Professional Application',
      description: 'Careful placement and attachment using professional techniques for natural results',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop',
      duration: '1-3 hours'
    },
    {
      step: 4,
      title: 'Styling & Care Instructions',
      description: 'Professional styling and detailed care instructions for maintaining your extensions',
      image: 'https://images.unsplash.com/photo-1562004760-acb5603d5ba0?w=600&h=400&fit=crop',
      duration: '20 minutes'
    }
  ],
  transformations: [
    {
      before: 'https://images.unsplash.com/photo-1494790108755-2616c667b1c7?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=400&fit=crop',
      type: 'Length Addition',
      weeks: 'From shoulder to long length'
    },
    {
      before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=400&fit=crop',
      type: 'Volume Enhancement',
      weeks: 'Added fullness and body'
    },
    {
      before: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop',
      type: 'Complete Transformation',
      weeks: 'Length, volume, and style change'
    }
  ]
};
