// UNIFIED CONSULTATION FLOW - MOTIVATION-FIRST APPROACH
// Starts with customer motivation, recommends across all domains

export interface UnifiedDecisionNode {
  id: string;
  question: string;
  options: UnifiedDecisionOption[];
  isLeaf?: boolean;
}

export interface UnifiedDecisionOption {
  id: string;
  label: string;
  weight: number;
  nextNodeId?: string;
  emoji?: string;
  domains?: string[]; // Which domains this might lead to
}

export interface UnifiedConsultationResult {
  customerMotivation: string;
  timeline?: string;
  budget?: string;
  recommendedServices: {
    'hair-salon': string[];
    'makeup-studio': string[];
    'med-spa': string[];
  };
  crossDomainPackages: string[];
  totalWeight: number;
}

// UNIFIED DECISION TREE - MOTIVATION FIRST
export const unifiedDecisionTree: Record<string, UnifiedDecisionNode> = {
  root: {
    id: 'root',
    question: 'What brings you here today?',
    options: [
      { 
        id: 'special-event', 
        label: 'I have a special event coming up', 
        weight: 8, 
        nextNodeId: 'event-type', 
        emoji: '✨',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      },
      { 
        id: 'regular-maintenance', 
        label: 'I need regular maintenance', 
        weight: 6, 
        nextNodeId: 'maintenance-areas', 
        emoji: '💅',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      },
      { 
        id: 'appearance-enhancement', 
        label: 'I want to enhance my appearance', 
        weight: 7, 
        nextNodeId: 'enhancement-goals', 
        emoji: '🌟',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      },
      { 
        id: 'skin-concerns', 
        label: 'I have skin concerns', 
        weight: 7, 
        nextNodeId: 'skin-issues', 
        emoji: '✨',
        domains: ['med-spa']
      }
    ]
  },

  'event-type': {
    id: 'event-type',
    question: 'What\'s the occasion?',
    options: [
      { 
        id: 'wedding', 
        label: 'Wedding (bride or party)', 
        weight: 10, 
        nextNodeId: 'event-timeline', 
        emoji: '💍',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      },
      { 
        id: 'professional', 
        label: 'Work/professional event', 
        weight: 8, 
        nextNodeId: 'event-timeline', 
        emoji: '💼',
        domains: ['hair-salon', 'makeup-studio']
      },
      { 
        id: 'date-night', 
        label: 'Date night', 
        weight: 7, 
        nextNodeId: 'event-timeline', 
        emoji: '💕',
        domains: ['hair-salon', 'makeup-studio']
      },
      { 
        id: 'party-celebration', 
        label: 'Party/celebration', 
        weight: 6, 
        nextNodeId: 'event-timeline', 
        emoji: '🎉',
        domains: ['hair-salon', 'makeup-studio']
      }
    ]
  },

  'event-timeline': {
    id: 'event-timeline',
    question: 'When is your event?',
    options: [
      { id: 'this-week', label: 'This week', weight: 9, nextNodeId: 'service-preferences', emoji: '⚡' },
      { id: 'next-week', label: 'Next week', weight: 8, nextNodeId: 'service-preferences', emoji: '📅' },
      { id: 'this-month', label: 'This month', weight: 7, nextNodeId: 'service-preferences', emoji: '🗓️' },
      { id: 'planning-ahead', label: 'Planning ahead (2+ months)', weight: 6, nextNodeId: 'service-preferences', emoji: '🎯' }
    ]
  },

  'service-preferences': {
    id: 'service-preferences',
    question: 'What services are you most interested in?',
    options: [
      { 
        id: 'full-package', 
        label: 'Full package (hair + makeup + skin)', 
        weight: 10, 
        isLeaf: true, 
        emoji: '💫',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      },
      { 
        id: 'hair-makeup', 
        label: 'Hair and makeup', 
        weight: 9, 
        isLeaf: true, 
        emoji: '💄',
        domains: ['hair-salon', 'makeup-studio']
      },
      { 
        id: 'hair-only', 
        label: 'Just hair services', 
        weight: 7, 
        isLeaf: true, 
        emoji: '✂️',
        domains: ['hair-salon']
      },
      { 
        id: 'makeup-only', 
        label: 'Just makeup services', 
        weight: 7, 
        isLeaf: true, 
        emoji: '💋',
        domains: ['makeup-studio']
      }
    ]
  },

  'maintenance-areas': {
    id: 'maintenance-areas',
    question: 'What areas do you maintain regularly?',
    options: [
      { 
        id: 'hair-maintenance', 
        label: 'Hair (cuts, color, treatments)', 
        weight: 7, 
        nextNodeId: 'maintenance-frequency', 
        emoji: '💇‍♀️',
        domains: ['hair-salon']
      },
      { 
        id: 'beauty-maintenance', 
        label: 'Beauty (lashes, brows, makeup)', 
        weight: 6, 
        nextNodeId: 'maintenance-frequency', 
        emoji: '👁️',
        domains: ['makeup-studio']
      },
      { 
        id: 'skin-maintenance', 
        label: 'Skin (facials, treatments)', 
        weight: 7, 
        nextNodeId: 'maintenance-frequency', 
        emoji: '✨',
        domains: ['med-spa']
      },
      { 
        id: 'multiple-areas', 
        label: 'Multiple areas', 
        weight: 9, 
        nextNodeId: 'maintenance-frequency', 
        emoji: '🌟',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      }
    ]
  },

  'maintenance-frequency': {
    id: 'maintenance-frequency',
    question: 'How often do you like to come in?',
    options: [
      { id: 'monthly', label: 'Monthly', weight: 9, isLeaf: true, emoji: '📆' },
      { id: 'every-6-weeks', label: 'Every 6 weeks', weight: 8, isLeaf: true, emoji: '⏰' },
      { id: 'quarterly', label: 'Every few months', weight: 6, isLeaf: true, emoji: '🔄' },
      { id: 'as-needed', label: 'As needed', weight: 5, isLeaf: true, emoji: '🤷‍♀️' }
    ]
  },

  'enhancement-goals': {
    id: 'enhancement-goals',
    question: 'What kind of enhancement are you looking for?',
    options: [
      { 
        id: 'dramatic-change', 
        label: 'Dramatic transformation', 
        weight: 9, 
        nextNodeId: 'enhancement-areas', 
        emoji: '💥',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      },
      { 
        id: 'subtle-improvement', 
        label: 'Subtle improvements', 
        weight: 7, 
        nextNodeId: 'enhancement-areas', 
        emoji: '✨',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      },
      { 
        id: 'confidence-boost', 
        label: 'Confidence boost', 
        weight: 8, 
        nextNodeId: 'enhancement-areas', 
        emoji: '💪',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      },
      { 
        id: 'professional-look', 
        label: 'More professional look', 
        weight: 7, 
        nextNodeId: 'enhancement-areas', 
        emoji: '💼',
        domains: ['hair-salon', 'makeup-studio']
      }
    ]
  },

  'enhancement-areas': {
    id: 'enhancement-areas',
    question: 'Which areas would you like to focus on?',
    options: [
      { 
        id: 'hair-focus', 
        label: 'Hair (new cut, color, style)', 
        weight: 8, 
        isLeaf: true, 
        emoji: '💇‍♀️',
        domains: ['hair-salon']
      },
      { 
        id: 'beauty-focus', 
        label: 'Beauty features (lashes, brows)', 
        weight: 7, 
        isLeaf: true, 
        emoji: '👁️',
        domains: ['makeup-studio']
      },
      { 
        id: 'skin-focus', 
        label: 'Skin improvement', 
        weight: 8, 
        isLeaf: true, 
        emoji: '✨',
        domains: ['med-spa']
      },
      { 
        id: 'overall-enhancement', 
        label: 'Overall enhancement', 
        weight: 10, 
        isLeaf: true, 
        emoji: '🌟',
        domains: ['hair-salon', 'makeup-studio', 'med-spa']
      }
    ]
  },

  'skin-issues': {
    id: 'skin-issues',
    question: 'What\'s your main skin concern?',
    options: [
      { 
        id: 'anti-aging', 
        label: 'Anti-aging/fine lines', 
        weight: 9, 
        nextNodeId: 'skin-timeline', 
        emoji: '⏰',
        domains: ['med-spa']
      },
      { 
        id: 'acne-breakouts', 
        label: 'Acne/breakouts', 
        weight: 8, 
        nextNodeId: 'skin-timeline', 
        emoji: '😤',
        domains: ['med-spa']
      },
      { 
        id: 'skin-texture', 
        label: 'Skin texture/smoothness', 
        weight: 7, 
        nextNodeId: 'skin-timeline', 
        emoji: '🤚',
        domains: ['med-spa']
      },
      { 
        id: 'dull-skin', 
        label: 'Dull/tired-looking skin', 
        weight: 6, 
        nextNodeId: 'skin-timeline', 
        emoji: '😴',
        domains: ['med-spa']
      }
    ]
  },

  'skin-timeline': {
    id: 'skin-timeline',
    question: 'When do you want to see results?',
    options: [
      { id: 'immediate-results', label: 'Right away', weight: 9, isLeaf: true, emoji: '⚡' },
      { id: 'this-month', label: 'Within a month', weight: 8, isLeaf: true, emoji: '📅' },
      { id: 'gradual-improvement', label: 'Gradual improvement', weight: 7, isLeaf: true, emoji: '📈' },
      { id: 'long-term-plan', label: 'Long-term plan', weight: 6, isLeaf: true, emoji: '🎯' }
    ]
  }
};

// UNIFIED SERVICE RECOMMENDATION ENGINE
export const getUnifiedServiceRecommendations = (
  responses: Record<string, { optionId: string; weight: number; domains?: string[] }>
): UnifiedConsultationResult => {
  const totalWeight = Object.values(responses).reduce((sum, r) => sum + r.weight, 0);
  const avgWeight = totalWeight / Object.keys(responses).length;

  // Determine which domains are relevant based on responses
  const relevantDomains = new Set<string>();
  Object.values(responses).forEach(response => {
    if (response.domains) {
      response.domains.forEach(domain => relevantDomains.add(domain));
    }
  });

  // Get primary motivation from first response
  const firstResponse = Object.values(responses)[0];
  const primaryMotivation = firstResponse?.optionId || 'special-event';

  // Service mapping based on unified motivations
  const unifiedServiceMap: Record<string, Record<string, string[]>> = {
    // Special Events - Cross-domain packages
    'special-event': {
      'hair-salon': ['hair-precision-cut', 'hair-balayage', 'blowout-styling'],
      'makeup-studio': ['makeup-bridal', 'makeup-special-event'],
      'med-spa': ['gold-facial', 'dermaplaning']
    },
    'wedding': {
      'hair-salon': ['hair-balayage', 'blowout-styling', 'hair-extensions'],
      'makeup-studio': ['makeup-bridal', 'lash-extensions'],
      'med-spa': ['gold-facial', 'hydra-facial', 'dermaplaning']
    },
    'professional': {
      'hair-salon': ['hair-precision-cut', 'hair-color'],
      'makeup-studio': ['makeup-natural', 'brow-styling'],
      'med-spa': ['hydra-facial']
    },
    
    // Maintenance - Regular services
    'regular-maintenance': {
      'hair-salon': ['hair-precision-cut', 'hair-color', 'deep-conditioning'],
      'makeup-studio': ['brow-styling', 'lash-extensions'],
      'med-spa': ['eyebrow-threading', 'hydra-facial']
    },
    
    // Enhancement - Transformation services
    'appearance-enhancement': {
      'hair-salon': ['hair-balayage', 'hair-extensions', 'keratin-treatment'],
      'makeup-studio': ['lash-extensions', 'brow-styling'],
      'med-spa': ['gold-facial', 'led-light-therapy']
    },
    
    // Skin-specific
    'skin-concerns': {
      'med-spa': ['gold-facial', 'hydra-facial', 'led-light-therapy', 'dermaplaning']
    }
  };

  // Build recommendations based on relevant domains
  const recommendations: UnifiedConsultationResult['recommendedServices'] = {
    'hair-salon': [],
    'makeup-studio': [],
    'med-spa': []
  };

  // Get base recommendations
  const baseServices = unifiedServiceMap[primaryMotivation] || unifiedServiceMap['special-event'];
  
  Object.keys(baseServices).forEach(domain => {
    if (relevantDomains.has(domain) || relevantDomains.size === 0) {
      recommendations[domain as keyof typeof recommendations] = baseServices[domain] || [];
    }
  });

  // Enhance recommendations based on weight and specific responses
  if (avgWeight >= 8) {
    // High engagement - suggest premium services
    if (relevantDomains.has('hair-salon') || relevantDomains.size === 0) {
      recommendations['hair-salon'] = [...new Set([...recommendations['hair-salon'], 'hair-extensions', 'keratin-treatment'])];
    }
    if (relevantDomains.has('makeup-studio') || relevantDomains.size === 0) {
      recommendations['makeup-studio'] = [...new Set([...recommendations['makeup-studio'], 'lash-extensions'])];
    }
    if (relevantDomains.has('med-spa') || relevantDomains.size === 0) {
      recommendations['med-spa'] = [...new Set([...recommendations['med-spa'], 'gold-facial'])];
    }
  }

  // Generate cross-domain packages
  const crossDomainPackages: string[] = [];
  if (primaryMotivation === 'wedding' || avgWeight >= 9) {
    crossDomainPackages.push('bridal-complete');
  }
  if (primaryMotivation === 'professional' || primaryMotivation === 'appearance-enhancement') {
    crossDomainPackages.push('professional-polish');
  }
  if (primaryMotivation === 'regular-maintenance' && avgWeight >= 7) {
    crossDomainPackages.push('maintenance-package');
  }

  return {
    customerMotivation: primaryMotivation,
    recommendedServices: recommendations,
    crossDomainPackages,
    totalWeight
  };
};

