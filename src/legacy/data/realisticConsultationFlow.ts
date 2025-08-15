// Realistic Consultation Flow Based on Actual Services
// Maps real customer motivations to actual service offerings

export interface DecisionNode {
  id: string;
  question: string;
  options: DecisionOption[];
  isLeaf?: boolean;
}

export interface DecisionOption {
  id: string;
  label: string;
  weight: number;
  nextNodeId?: string;
  emoji?: string;
}

export interface ConsultationResult {
  customerType: string;
  motivation: string;
  timeline?: string;
  budget?: string;
  recommendedServices: string[];
  totalWeight: number;
}

// Realistic Decision Tree for Hair Salon
export const hairSalonDecisionTree: Record<string, DecisionNode> = {
  root: {
    id: 'root',
    question: 'What brings you in today?',
    options: [
      { id: 'special-event', label: 'Special event coming up', weight: 8, nextNodeId: 'event-type', emoji: '✨' },
      { id: 'regular-maintenance', label: 'Regular maintenance', weight: 6, nextNodeId: 'maintenance-type', emoji: '💅' },
      { id: 'new-look', label: 'Want a new look', weight: 7, nextNodeId: 'change-level', emoji: '🔄' },
      { id: 'hair-health', label: 'Hair health concerns', weight: 5, nextNodeId: 'health-concerns', emoji: '🌿' }
    ]
  },

  'event-type': {
    id: 'event-type',
    question: 'What\'s the occasion?',
    options: [
      { id: 'wedding', label: 'Wedding', weight: 10, nextNodeId: 'event-timeline', emoji: '💍' },
      { id: 'date', label: 'Date night', weight: 7, nextNodeId: 'event-timeline', emoji: '💕' },
      { id: 'work', label: 'Work event', weight: 8, nextNodeId: 'event-timeline', emoji: '💼' },
      { id: 'party', label: 'Party/celebration', weight: 6, nextNodeId: 'event-timeline', emoji: '🎉' }
    ]
  },

  'event-timeline': {
    id: 'event-timeline',
    question: 'When is your event?',
    options: [
      { id: 'this-week', label: 'This week', weight: 9, isLeaf: true, emoji: '⚡' },
      { id: 'next-week', label: 'Next week', weight: 8, isLeaf: true, emoji: '📅' },
      { id: 'this-month', label: 'This month', weight: 7, isLeaf: true, emoji: '🗓️' },
      { id: 'planning-ahead', label: 'Planning ahead', weight: 6, isLeaf: true, emoji: '🎯' }
    ]
  },

  'maintenance-type': {
    id: 'maintenance-type',
    question: 'What do you usually get?',
    options: [
      { id: 'cut-only', label: 'Just a cut', weight: 5, nextNodeId: 'maintenance-frequency', emoji: '✂️' },
      { id: 'cut-color', label: 'Cut and color', weight: 8, nextNodeId: 'maintenance-frequency', emoji: '🎨' },
      { id: 'color-only', label: 'Color touch-up', weight: 7, nextNodeId: 'maintenance-frequency', emoji: '🌈' },
      { id: 'full-service', label: 'Full service', weight: 9, nextNodeId: 'maintenance-frequency', emoji: '💫' }
    ]
  },

  'maintenance-frequency': {
    id: 'maintenance-frequency',
    question: 'How often do you come in?',
    options: [
      { id: 'monthly', label: 'Monthly', weight: 9, isLeaf: true, emoji: '📆' },
      { id: 'every-6-weeks', label: 'Every 6 weeks', weight: 8, isLeaf: true, emoji: '⏰' },
      { id: 'quarterly', label: 'Every few months', weight: 6, isLeaf: true, emoji: '🔄' },
      { id: 'as-needed', label: 'As needed', weight: 5, isLeaf: true, emoji: '🤷‍♀️' }
    ]
  },

  'change-level': {
    id: 'change-level',
    question: 'How big of a change?',
    options: [
      { id: 'subtle', label: 'Subtle refresh', weight: 6, nextNodeId: 'change-inspiration', emoji: '✨' },
      { id: 'noticeable', label: 'Noticeable change', weight: 8, nextNodeId: 'change-inspiration', emoji: '🔥' },
      { id: 'dramatic', label: 'Complete transformation', weight: 10, nextNodeId: 'change-inspiration', emoji: '💥' }
    ]
  },

  'change-inspiration': {
    id: 'change-inspiration',
    question: 'What\'s inspiring this change?',
    options: [
      { id: 'new-chapter', label: 'New chapter in life', weight: 8, isLeaf: true, emoji: '🌟' },
      { id: 'confidence', label: 'Want to feel confident', weight: 7, isLeaf: true, emoji: '💪' },
      { id: 'bored', label: 'Bored with current look', weight: 6, isLeaf: true, emoji: '😴' },
      { id: 'inspiration', label: 'Saw something I loved', weight: 7, isLeaf: true, emoji: '😍' }
    ]
  },

  'health-concerns': {
    id: 'health-concerns',
    question: 'What\'s your main concern?',
    options: [
      { id: 'damage', label: 'Damaged hair', weight: 8, isLeaf: true, emoji: '🆘' },
      { id: 'dryness', label: 'Dry/brittle hair', weight: 7, isLeaf: true, emoji: '🏜️' },
      { id: 'thinning', label: 'Thinning hair', weight: 6, isLeaf: true, emoji: '😟' },
      { id: 'scalp', label: 'Scalp issues', weight: 5, isLeaf: true, emoji: '🤕' }
    ]
  }
};

// Realistic Decision Tree for Makeup Studio
export const makeupStudioDecisionTree: Record<string, DecisionNode> = {
  root: {
    id: 'root',
    question: 'What brings you in today?',
    options: [
      { id: 'special-event', label: 'Special event makeup', weight: 8, nextNodeId: 'event-type', emoji: '✨' },
      { id: 'beauty-enhancement', label: 'Beauty enhancement', weight: 7, nextNodeId: 'enhancement-type', emoji: '💄' },
      { id: 'makeup-help', label: 'Need makeup help', weight: 6, nextNodeId: 'help-type', emoji: '🤔' }
    ]
  },

  'event-type': {
    id: 'event-type',
    question: 'What\'s the occasion?',
    options: [
      { id: 'wedding', label: 'Wedding (bride)', weight: 10, nextNodeId: 'event-timeline', emoji: '👰' },
      { id: 'wedding-party', label: 'Wedding (party)', weight: 9, nextNodeId: 'event-timeline', emoji: '💐' },
      { id: 'formal', label: 'Formal event', weight: 8, nextNodeId: 'event-timeline', emoji: '🎭' },
      { id: 'date', label: 'Date night', weight: 7, nextNodeId: 'event-timeline', emoji: '💕' }
    ]
  },

  'event-timeline': {
    id: 'event-timeline',
    question: 'When is your event?',
    options: [
      { id: 'today', label: 'Today', weight: 10, isLeaf: true, emoji: '🚨' },
      { id: 'this-week', label: 'This week', weight: 9, isLeaf: true, emoji: '⚡' },
      { id: 'next-week', label: 'Next week', weight: 8, isLeaf: true, emoji: '📅' },
      { id: 'this-month', label: 'This month', weight: 7, isLeaf: true, emoji: '🗓️' }
    ]
  },

  'enhancement-type': {
    id: 'enhancement-type',
    question: 'What are you interested in?',
    options: [
      { id: 'lashes', label: 'Lash extensions', weight: 8, nextNodeId: 'lash-experience', emoji: '👁️' },
      { id: 'brows', label: 'Eyebrow styling', weight: 7, isLeaf: true, emoji: '🤨' },
      { id: 'daily-makeup', label: 'Daily makeup look', weight: 6, isLeaf: true, emoji: '💅' }
    ]
  },

  'lash-experience': {
    id: 'lash-experience',
    question: 'Have you had lash extensions before?',
    options: [
      { id: 'first-time', label: 'First time', weight: 8, isLeaf: true, emoji: '🆕' },
      { id: 'experienced', label: 'Yes, need fills', weight: 9, isLeaf: true, emoji: '🔄' },
      { id: 'different-style', label: 'Want different style', weight: 7, isLeaf: true, emoji: '✨' }
    ]
  },

  'help-type': {
    id: 'help-type',
    question: 'What kind of help do you need?',
    options: [
      { id: 'lesson', label: 'Personal makeup lesson', weight: 8, isLeaf: true, emoji: '📚' },
      { id: 'application', label: 'Professional application', weight: 7, nextNodeId: 'event-type', emoji: '🎨' }
    ]
  }
};

// Realistic Decision Tree for Med Spa
export const medSpaDecisionTree: Record<string, DecisionNode> = {
  root: {
    id: 'root',
    question: 'What brings you in today?',
    options: [
      { id: 'skin-improvement', label: 'Want better skin', weight: 8, nextNodeId: 'skin-concerns', emoji: '✨' },
      { id: 'hair-removal', label: 'Hair removal', weight: 7, nextNodeId: 'removal-type', emoji: '🪒' },
      { id: 'maintenance', label: 'Regular maintenance', weight: 6, nextNodeId: 'maintenance-type', emoji: '💅' }
    ]
  },

  'skin-concerns': {
    id: 'skin-concerns',
    question: 'What\'s your main skin concern?',
    options: [
      { id: 'aging', label: 'Anti-aging', weight: 9, nextNodeId: 'skin-timeline', emoji: '⏰' },
      { id: 'acne', label: 'Acne/breakouts', weight: 8, nextNodeId: 'skin-timeline', emoji: '😤' },
      { id: 'texture', label: 'Skin texture', weight: 7, nextNodeId: 'skin-timeline', emoji: '🤚' },
      { id: 'dullness', label: 'Dull/tired skin', weight: 6, nextNodeId: 'skin-timeline', emoji: '😴' }
    ]
  },

  'skin-timeline': {
    id: 'skin-timeline',
    question: 'When do you need results?',
    options: [
      { id: 'immediate', label: 'Right away', weight: 9, isLeaf: true, emoji: '⚡' },
      { id: 'this-month', label: 'This month', weight: 8, isLeaf: true, emoji: '📅' },
      { id: 'gradual', label: 'Gradual improvement', weight: 7, isLeaf: true, emoji: '📈' },
      { id: 'maintenance', label: 'Long-term plan', weight: 6, isLeaf: true, emoji: '🎯' }
    ]
  },

  'removal-type': {
    id: 'removal-type',
    question: 'What area?',
    options: [
      { id: 'eyebrows', label: 'Eyebrows', weight: 7, nextNodeId: 'removal-frequency', emoji: '🤨' },
      { id: 'bikini', label: 'Bikini area', weight: 8, nextNodeId: 'removal-experience', emoji: '👙' },
      { id: 'other', label: 'Other areas', weight: 6, nextNodeId: 'removal-frequency', emoji: '🤷‍♀️' }
    ]
  },

  'removal-frequency': {
    id: 'removal-frequency',
    question: 'How often do you usually get this done?',
    options: [
      { id: 'regular', label: 'Regular appointments', weight: 8, isLeaf: true, emoji: '📆' },
      { id: 'occasional', label: 'Occasionally', weight: 6, isLeaf: true, emoji: '🔄' },
      { id: 'first-time', label: 'First time', weight: 7, isLeaf: true, emoji: '🆕' }
    ]
  },

  'removal-experience': {
    id: 'removal-experience',
    question: 'Have you had this service before?',
    options: [
      { id: 'experienced', label: 'Yes, regularly', weight: 9, isLeaf: true, emoji: '✅' },
      { id: 'some-experience', label: 'A few times', weight: 7, isLeaf: true, emoji: '🤔' },
      { id: 'first-time', label: 'First time', weight: 8, isLeaf: true, emoji: '🆕' }
    ]
  },

  'maintenance-type': {
    id: 'maintenance-type',
    question: 'What do you usually get?',
    options: [
      { id: 'facials', label: 'Regular facials', weight: 8, nextNodeId: 'maintenance-frequency', emoji: '✨' },
      { id: 'threading', label: 'Eyebrow threading', weight: 7, nextNodeId: 'maintenance-frequency', emoji: '🤨' },
      { id: 'combination', label: 'Multiple services', weight: 9, nextNodeId: 'maintenance-frequency', emoji: '💫' }
    ]
  },

  'maintenance-frequency': {
    id: 'maintenance-frequency',
    question: 'How often?',
    options: [
      { id: 'monthly', label: 'Monthly', weight: 9, isLeaf: true, emoji: '📆' },
      { id: 'every-6-weeks', label: 'Every 6 weeks', weight: 8, isLeaf: true, emoji: '⏰' },
      { id: 'quarterly', label: 'Every few months', weight: 6, isLeaf: true, emoji: '🔄' }
    ]
  }
};

// Service Recommendation Engine
export const getServiceRecommendations = (
  domain: string,
  responses: Record<string, { optionId: string; weight: number }>
): string[] => {
  const totalWeight = Object.values(responses).reduce((sum, r) => sum + r.weight, 0);
  const avgWeight = totalWeight / Object.keys(responses).length;

  // Map consultation responses to actual service IDs
  const serviceMap: Record<string, Record<string, string[]>> = {
    'hair-salon': {
      'special-event': ['hair-precision-cut', 'hair-balayage', 'blowout-styling'],
      'regular-maintenance': ['hair-precision-cut', 'hair-color', 'deep-conditioning'],
      'new-look': ['hair-balayage', 'hair-color', 'hair-extensions'],
      'hair-health': ['keratin-treatment', 'deep-conditioning', 'hair-precision-cut']
    },
    'makeup-studio': {
      'special-event': ['makeup-bridal', 'makeup-special-event'],
      'beauty-enhancement': ['lash-extensions', 'brow-styling', 'makeup-natural'],
      'makeup-help': ['makeup-lesson']
    },
    'med-spa': {
      'skin-improvement': ['gold-facial', 'hydra-facial', 'led-light-therapy'],
      'hair-removal': ['eyebrow-threading', 'brazilian-wax'],
      'maintenance': ['hydra-facial', 'eyebrow-threading', 'dermaplaning']
    }
  };

  // Get primary motivation from first response
  const firstResponse = Object.values(responses)[0];
  const primaryMotivation = firstResponse?.optionId || 'special-event';

  // Get base recommendations
  let recommendations = serviceMap[domain]?.[primaryMotivation] || [];

  // Enhance recommendations based on weight and specific responses
  if (avgWeight >= 8) {
    // High engagement - suggest premium services
    if (domain === 'hair-salon') {
      recommendations = [...recommendations, 'hair-extensions', 'keratin-treatment'];
    } else if (domain === 'makeup-studio') {
      recommendations = [...recommendations, 'lash-extensions'];
    } else if (domain === 'med-spa') {
      recommendations = [...recommendations, 'gold-facial'];
    }
  }

  return [...new Set(recommendations)]; // Remove duplicates
};

export const decisionTrees = {
  'hair-salon': hairSalonDecisionTree,
  'makeup-studio': makeupStudioDecisionTree,
  'med-spa': medSpaDecisionTree
};

