// ENHANCED CONSULTATION FLOW WITH IMAGES
// Extends the unified consultation flow with visual elements

import { UnifiedDecisionNode, UnifiedDecisionOption, unifiedDecisionTree, getUnifiedServiceRecommendations } from './unifiedConsultationFlow';

// Extended interfaces with image support
export interface EnhancedDecisionOption extends UnifiedDecisionOption {
  imageUrl?: string;
  description?: string;
}

export interface EnhancedDecisionNode extends UnifiedDecisionNode {
  options: EnhancedDecisionOption[];
  backgroundImage?: string;
}

// Enhanced decision tree with images
export const enhancedDecisionTree: Record<string, EnhancedDecisionNode> = {
  root: {
    id: 'root',
    question: 'What brings you here today?',
    backgroundImage: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'special-event', 
        label: 'I have a special event coming up', 
        weight: 8, 
        nextNodeId: 'event-type', 
        emoji: '✨',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
        description: 'Look your best for weddings, parties, and other special occasions'
      },
      { 
        id: 'regular-maintenance', 
        label: 'I need regular maintenance', 
        weight: 6, 
        nextNodeId: 'maintenance-areas', 
        emoji: '💅',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&q=80&w=800',
        description: 'Keep up your routine beauty and wellness services'
      },
      { 
        id: 'appearance-enhancement', 
        label: 'I want to enhance my appearance', 
        weight: 7, 
        nextNodeId: 'enhancement-goals', 
        emoji: '🌟',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1596178060810-72660ee8d2ad?auto=format&fit=crop&q=80&w=800',
        description: 'Transform your look with our enhancement services'
      },
      { 
        id: 'skin-concerns', 
        label: 'I have skin concerns', 
        weight: 7, 
        nextNodeId: 'skin-issues', 
        emoji: '✨',
        domains: ['med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Address specific skin issues with targeted treatments'
      }
    ]
  },

  'event-type': {
    id: 'event-type',
    question: 'What\'s the occasion?',
    backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'wedding', 
        label: 'Wedding (bride or party)', 
        weight: 10, 
        nextNodeId: 'event-timeline', 
        emoji: '💍',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
        description: 'Complete bridal packages for your special day'
      },
      { 
        id: 'professional', 
        label: 'Work/professional event', 
        weight: 8, 
        nextNodeId: 'event-timeline', 
        emoji: '💼',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
        description: 'Polished, professional looks for work events'
      },
      { 
        id: 'date-night', 
        label: 'Date night', 
        weight: 7, 
        nextNodeId: 'event-timeline', 
        emoji: '💕',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800',
        description: 'Romantic, stunning looks for your special evening'
      },
      { 
        id: 'party-celebration', 
        label: 'Party/celebration', 
        weight: 6, 
        nextNodeId: 'event-timeline', 
        emoji: '🎉',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&q=80&w=800',
        description: 'Fun, festive styles for parties and celebrations'
      }
    ]
  },

  // New node with 2 options
  'beauty-style': {
    id: 'beauty-style',
    question: 'What beauty style do you prefer?',
    backgroundImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'natural-look', 
        label: 'Natural, subtle look', 
        weight: 7, 
        nextNodeId: 'service-preferences', 
        emoji: '🍃',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1588946322855-e31b17d2fdf6?auto=format&fit=crop&q=80&w=800',
        description: 'Enhance your natural beauty with subtle techniques'
      },
      { 
        id: 'glamorous-look', 
        label: 'Bold, glamorous look', 
        weight: 8, 
        nextNodeId: 'service-preferences', 
        emoji: '✨',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=800',
        description: 'Make a statement with dramatic, eye-catching styles'
      }
    ]
  },

  // New node with 3 options
  'color-preference': {
    id: 'color-preference',
    question: 'What color palette do you prefer?',
    backgroundImage: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'warm-tones', 
        label: 'Warm tones', 
        weight: 6, 
        nextNodeId: 'service-preferences', 
        emoji: '🔥',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1581182800629-7d90925ad072?auto=format&fit=crop&q=80&w=800',
        description: 'Rich, warm colors that enhance your natural glow'
      },
      { 
        id: 'cool-tones', 
        label: 'Cool tones', 
        weight: 6, 
        nextNodeId: 'service-preferences', 
        emoji: '❄️',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
        description: 'Sophisticated cool tones for an elegant look'
      },
      { 
        id: 'vibrant-colors', 
        label: 'Vibrant, bold colors', 
        weight: 7, 
        nextNodeId: 'service-preferences', 
        emoji: '🌈',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=800',
        description: 'Stand out with bold, vibrant color choices'
      }
    ]
  },

  'event-timeline': {
    id: 'event-timeline',
    question: 'When is your event?',
    backgroundImage: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'this-week', 
        label: 'This week', 
        weight: 9, 
        nextNodeId: 'beauty-style', 
        emoji: '⚡',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Quick turnaround services for immediate needs'
      },
      { 
        id: 'next-week', 
        label: 'Next week', 
        weight: 8, 
        nextNodeId: 'beauty-style', 
        emoji: '📅',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Perfect timing for most beauty services'
      },
      { 
        id: 'this-month', 
        label: 'This month', 
        weight: 7, 
        nextNodeId: 'color-preference', 
        emoji: '📓️',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Time for comprehensive beauty preparation'
      },
      { 
        id: 'planning-ahead', 
        label: 'Planning ahead (2+ months)', 
        weight: 6, 
        nextNodeId: 'color-preference', 
        emoji: '🎯',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Ideal for transformative services and treatments'
      }
    ]
  },

  'service-preferences': {
    id: 'service-preferences',
    question: 'What services are you most interested in?',
    backgroundImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'full-package', 
        label: 'Full package (hair + makeup + skin)', 
        weight: 10, 
        isLeaf: true, 
        emoji: '💫',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=800',
        description: 'Complete transformation across all beauty domains'
      },
      { 
        id: 'hair-makeup', 
        label: 'Hair and makeup', 
        weight: 9, 
        isLeaf: true, 
        emoji: '💄',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
        description: 'Perfect combination for a complete look'
      },
      { 
        id: 'hair-only', 
        label: 'Just hair services', 
        weight: 7, 
        isLeaf: true, 
        emoji: '✂️',
        domains: ['hair-salon'],
        imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
        description: 'Focus on your hair for maximum impact'
      },
      { 
        id: 'makeup-only', 
        label: 'Just makeup services', 
        weight: 7, 
        isLeaf: true, 
        emoji: '💋',
        domains: ['makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=800',
        description: 'Enhance your features with professional makeup'
      }
    ]
  },

  'maintenance-areas': {
    id: 'maintenance-areas',
    question: 'What areas do you maintain regularly?',
    backgroundImage: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'hair-maintenance', 
        label: 'Hair (cuts, color, treatments)', 
        weight: 7, 
        nextNodeId: 'maintenance-frequency', 
        emoji: '💇‍♀️',
        domains: ['hair-salon'],
        imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
        description: 'Keep your hair looking its best'
      },
      { 
        id: 'beauty-maintenance', 
        label: 'Beauty (lashes, brows, makeup)', 
        weight: 6, 
        nextNodeId: 'maintenance-frequency', 
        emoji: '👁️',
        domains: ['makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&q=80&w=800',
        description: 'Maintain your beauty features'
      },
      { 
        id: 'skin-maintenance', 
        label: 'Skin (facials, treatments)', 
        weight: 7, 
        nextNodeId: 'maintenance-frequency', 
        emoji: '✨',
        domains: ['med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Regular skin care for lasting results'
      },
      { 
        id: 'multiple-areas', 
        label: 'Multiple areas', 
        weight: 9, 
        nextNodeId: 'maintenance-frequency', 
        emoji: '🌟',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&q=80&w=800',
        description: 'Comprehensive beauty maintenance'
      }
    ]
  },

  'maintenance-frequency': {
    id: 'maintenance-frequency',
    question: 'How often do you like to come in?',
    backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'monthly', 
        label: 'Monthly', 
        weight: 9, 
        isLeaf: true, 
        emoji: '📆',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Regular monthly appointments'
      },
      { 
        id: 'every-6-weeks', 
        label: 'Every 6 weeks', 
        weight: 8, 
        isLeaf: true, 
        emoji: '⏰',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Maintenance every 6 weeks'
      },
      { 
        id: 'quarterly', 
        label: 'Every few months', 
        weight: 6, 
        isLeaf: true, 
        emoji: '🔄',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Seasonal beauty refresh'
      },
      { 
        id: 'as-needed', 
        label: 'As needed', 
        weight: 5, 
        isLeaf: true, 
        emoji: '🤷‍♀️',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Flexible scheduling based on your needs'
      }
    ]
  },

  'enhancement-goals': {
    id: 'enhancement-goals',
    question: 'What kind of enhancement are you looking for?',
    backgroundImage: 'https://images.unsplash.com/photo-1596178060810-72660ee8d2ad?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'dramatic-change', 
        label: 'Dramatic transformation', 
        weight: 9, 
        nextNodeId: 'enhancement-areas', 
        emoji: '💥',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1596178060810-72660ee8d2ad?auto=format&fit=crop&q=80&w=800',
        description: 'Bold, noticeable changes to your appearance'
      },
      { 
        id: 'subtle-improvement', 
        label: 'Subtle improvements', 
        weight: 7, 
        nextNodeId: 'enhancement-areas', 
        emoji: '✨',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1596178060810-72660ee8d2ad?auto=format&fit=crop&q=80&w=800',
        description: 'Refined enhancements that look natural'
      },
      { 
        id: 'confidence-boost', 
        label: 'Confidence boost', 
        weight: 8, 
        nextNodeId: 'enhancement-areas', 
        emoji: '💪',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1596178060810-72660ee8d2ad?auto=format&fit=crop&q=80&w=800',
        description: 'Services that help you feel your best'
      },
      { 
        id: 'professional-look', 
        label: 'More professional look', 
        weight: 7, 
        nextNodeId: 'enhancement-areas', 
        emoji: '💼',
        domains: ['hair-salon', 'makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
        description: 'Polished appearance for work and career'
      }
    ]
  },

  'enhancement-areas': {
    id: 'enhancement-areas',
    question: 'Which areas would you like to focus on?',
    backgroundImage: 'https://images.unsplash.com/photo-1596178060810-72660ee8d2ad?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'hair-focus', 
        label: 'Hair (new cut, color, style)', 
        weight: 8, 
        isLeaf: true, 
        emoji: '💇‍♀️',
        domains: ['hair-salon'],
        imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
        description: 'Transform your look with a new hairstyle'
      },
      { 
        id: 'beauty-focus', 
        label: 'Beauty features (lashes, brows)', 
        weight: 7, 
        isLeaf: true, 
        emoji: '👁️',
        domains: ['makeup-studio'],
        imageUrl: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&q=80&w=800',
        description: 'Enhance your natural beauty features'
      },
      { 
        id: 'skin-focus', 
        label: 'Skin improvement', 
        weight: 8, 
        isLeaf: true, 
        emoji: '✨',
        domains: ['med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Revitalize your skin for a radiant glow'
      },
      { 
        id: 'overall-enhancement', 
        label: 'Overall enhancement', 
        weight: 10, 
        isLeaf: true, 
        emoji: '🌟',
        domains: ['hair-salon', 'makeup-studio', 'med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1596178060810-72660ee8d2ad?auto=format&fit=crop&q=80&w=800',
        description: 'Complete transformation across all areas'
      }
    ]
  },

  'skin-issues': {
    id: 'skin-issues',
    question: 'What\'s your main skin concern?',
    backgroundImage: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'anti-aging', 
        label: 'Anti-aging/fine lines', 
        weight: 9, 
        nextNodeId: 'skin-timeline', 
        emoji: '⏰',
        domains: ['med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Reduce signs of aging and fine lines'
      },
      { 
        id: 'acne-breakouts', 
        label: 'Acne/breakouts', 
        weight: 8, 
        nextNodeId: 'skin-timeline', 
        emoji: '😤',
        domains: ['med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Clear skin treatments for acne and breakouts'
      },
      { 
        id: 'skin-texture', 
        label: 'Skin texture/smoothness', 
        weight: 7, 
        nextNodeId: 'skin-timeline', 
        emoji: '🤚',
        domains: ['med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Improve skin texture and smoothness'
      },
      { 
        id: 'dull-skin', 
        label: 'Dull/tired-looking skin', 
        weight: 6, 
        nextNodeId: 'skin-timeline', 
        emoji: '😴',
        domains: ['med-spa'],
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Revitalize dull skin for a healthy glow'
      }
    ]
  },

  'skin-timeline': {
    id: 'skin-timeline',
    question: 'When do you want to see results?',
    backgroundImage: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=1000',
    options: [
      { 
        id: 'immediate-results', 
        label: 'Right away', 
        weight: 9, 
        isLeaf: true, 
        emoji: '⚡',
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Treatments with immediate visible results'
      },
      { 
        id: 'this-month', 
        label: 'Within a month', 
        weight: 8, 
        isLeaf: true, 
        emoji: '📅',
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'See results within a few weeks'
      },
      { 
        id: 'gradual-improvement', 
        label: 'Gradual improvement', 
        weight: 7, 
        isLeaf: true, 
        emoji: '📈',
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Progressive improvement over time'
      },
      { 
        id: 'long-term-plan', 
        label: 'Long-term plan', 
        weight: 6, 
        isLeaf: true, 
        emoji: '🎯',
        imageUrl: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
        description: 'Comprehensive treatment plan for lasting results'
      }
    ]
  }
};

// Export the enhanced service recommendation function (uses the same logic)
export { getUnifiedServiceRecommendations };

