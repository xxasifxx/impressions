import { ConsultationNode } from '@/data/models/ConsultationTypes';

/**
 * Pre-defined consultation nodes following the strategic guidelines
 * These nodes implement the professional cosmetologist consultation pattern
 */

// ENTRY NODES - Always start with motivation/occasion detection
export const entryNodes: ConsultationNode[] = [
  {
    id: 'entry_motivation',
    type: 'entry',
    title: 'Tell me about your beauty goals',
    description: 'Understanding what brings you here today helps me recommend the perfect services for you.',
    question: 'What\'s inspiring your visit today?',
    options: [
      {
        id: 'motivation_wedding',
        text: 'I have a wedding coming up',
        value: 'wedding',
        metadata: {
          weight: 10,
          category: 'motivation',
          triggers: ['bridal_package', 'timeline_urgent']
        }
      },
      {
        id: 'motivation_professional',
        text: 'I want to look more professional/polished',
        value: 'professional',
        metadata: {
          weight: 8,
          category: 'motivation',
          triggers: ['business_look', 'confidence_building']
        }
      },
      {
        id: 'motivation_event',
        text: 'I have a special event or date',
        value: 'special_event',
        metadata: {
          weight: 7,
          category: 'motivation',
          triggers: ['occasion_styling', 'timeline_soon']
        }
      },
      {
        id: 'motivation_selfcare',
        text: 'I want to treat myself and feel better',
        value: 'self_care',
        metadata: {
          weight: 6,
          category: 'motivation',
          triggers: ['transformation', 'confidence']
        }
      },
      {
        id: 'motivation_maintenance',
        text: 'I need regular maintenance/touch-ups',
        value: 'maintenance',
        metadata: {
          weight: 5,
          category: 'motivation',
          triggers: ['routine_services', 'existing_client']
        }
      },
      {
        id: 'motivation_explore',
        text: 'I\'m exploring what you offer',
        value: 'exploration',
        metadata: {
          weight: 3,
          category: 'motivation',
          triggers: ['discovery', 'education']
        }
      }
    ],
    metadata: {
      category: 'motivation_detection',
      priority: 10,
      tags: ['entry', 'required', 'motivation']
    }
  },

  {
    id: 'entry_experience',
    type: 'entry',
    title: 'Your beauty service experience',
    description: 'This helps me tailor my recommendations to your comfort level and preferences.',
    question: 'How often do you get professional beauty services?',
    options: [
      {
        id: 'experience_first_time',
        text: 'This is my first time',
        value: 'first_time',
        metadata: {
          weight: 10,
          category: 'experience',
          triggers: ['beginner_friendly', 'education', 'gentle_intro']
        }
      },
      {
        id: 'experience_occasional',
        text: 'Occasionally for special occasions',
        value: 'occasional',
        metadata: {
          weight: 7,
          category: 'experience',
          triggers: ['intermediate', 'occasion_based']
        }
      },
      {
        id: 'experience_regular',
        text: 'Regularly (monthly or more)',
        value: 'regular',
        metadata: {
          weight: 9,
          category: 'experience',
          triggers: ['expert', 'advanced_services', 'maintenance']
        }
      },
      {
        id: 'experience_professional',
        text: 'I work in beauty/fashion industry',
        value: 'professional',
        metadata: {
          weight: 10,
          category: 'experience',
          triggers: ['expert', 'industry_knowledge', 'advanced']
        }
      }
    ],
    metadata: {
      category: 'experience_assessment',
      priority: 9,
      tags: ['entry', 'experience', 'adaptation']
    }
  },

  {
    id: 'entry_timeline',
    type: 'entry',
    title: 'When do you need this?',
    description: 'Timeline helps me prioritize services and suggest the best scheduling options.',
    question: 'What\'s your timeline for these services?',
    options: [
      {
        id: 'timeline_today',
        text: 'Today or this week',
        value: 'immediate',
        metadata: {
          weight: 10,
          category: 'timeline',
          triggers: ['urgent', 'same_day', 'express_services']
        }
      },
      {
        id: 'timeline_soon',
        text: 'Within the next 2-3 weeks',
        value: 'soon',
        metadata: {
          weight: 8,
          category: 'timeline',
          triggers: ['planned', 'standard_booking']
        }
      },
      {
        id: 'timeline_month',
        text: 'Within the next month',
        value: 'month',
        metadata: {
          weight: 6,
          category: 'timeline',
          triggers: ['planned', 'flexible']
        }
      },
      {
        id: 'timeline_flexible',
        text: 'I\'m flexible with timing',
        value: 'flexible',
        metadata: {
          weight: 4,
          category: 'timeline',
          triggers: ['flexible', 'discovery', 'non_urgent']
        }
      }
    ],
    metadata: {
      category: 'timeline_assessment',
      priority: 8,
      tags: ['entry', 'timeline', 'scheduling']
    }
  }
];

// REFINEMENT NODES - Filter and personalize based on responses
export const refinementNodes: ConsultationNode[] = [
  {
    id: 'refinement_domain_focus',
    type: 'refinement',
    title: 'What areas interest you most?',
    description: 'I can focus on the services that matter most to you.',
    question: 'Which beauty areas are you most interested in today?',
    options: [
      {
        id: 'domain_hair',
        text: 'Hair services (cut, color, styling)',
        value: 'hair-salon',
        metadata: {
          weight: 8,
          category: 'domain',
          triggers: ['hair_services', 'salon_focus']
        }
      },
      {
        id: 'domain_makeup',
        text: 'Makeup services and products',
        value: 'makeup-studio',
        metadata: {
          weight: 8,
          category: 'domain',
          triggers: ['makeup_services', 'cosmetics']
        }
      },
      {
        id: 'domain_skincare',
        text: 'Skincare and facial treatments',
        value: 'med-spa',
        metadata: {
          weight: 8,
          category: 'domain',
          triggers: ['skincare', 'facial_treatments']
        }
      },
      {
        id: 'domain_complete',
        text: 'Complete transformation (hair + makeup + skincare)',
        value: 'complete',
        metadata: {
          weight: 10,
          category: 'domain',
          triggers: ['full_service', 'transformation', 'comprehensive']
        }
      },
      {
        id: 'domain_unsure',
        text: 'I\'m not sure, show me options',
        value: 'exploration',
        metadata: {
          weight: 5,
          category: 'domain',
          triggers: ['discovery', 'guidance_needed']
        }
      }
    ],
    metadata: {
      category: 'domain_filtering',
      priority: 7,
      tags: ['refinement', 'filtering', 'domain']
    }
  },

  {
    id: 'refinement_style_preference',
    type: 'refinement',
    title: 'What style speaks to you?',
    description: 'Your style preference helps me recommend services that match your aesthetic.',
    question: 'Which style best describes what you\'re looking for?',
    options: [
      {
        id: 'style_natural',
        text: 'Natural, effortless beauty',
        value: 'natural',
        metadata: {
          weight: 7,
          category: 'style',
          triggers: ['natural_look', 'minimal_makeup', 'organic']
        }
      },
      {
        id: 'style_polished',
        text: 'Polished and professional',
        value: 'polished',
        metadata: {
          weight: 8,
          category: 'style',
          triggers: ['professional', 'clean', 'structured']
        }
      },
      {
        id: 'style_glamorous',
        text: 'Glamorous and dramatic',
        value: 'glamorous',
        metadata: {
          weight: 9,
          category: 'style',
          triggers: ['dramatic', 'bold', 'statement']
        }
      },
      {
        id: 'style_romantic',
        text: 'Soft and romantic',
        value: 'romantic',
        metadata: {
          weight: 8,
          category: 'style',
          triggers: ['soft', 'feminine', 'romantic']
        }
      },
      {
        id: 'style_edgy',
        text: 'Modern and edgy',
        value: 'edgy',
        metadata: {
          weight: 7,
          category: 'style',
          triggers: ['modern', 'edgy', 'contemporary']
        }
      }
    ],
    metadata: {
      category: 'style_filtering',
      priority: 6,
      tags: ['refinement', 'aesthetic', 'style']
    }
  },

  {
    id: 'refinement_complexity_comfort',
    type: 'refinement',
    title: 'Service complexity preference',
    description: 'This helps me match services to your comfort level and lifestyle.',
    question: 'What level of service complexity are you comfortable with?',
    options: [
      {
        id: 'complexity_simple',
        text: 'Simple, low-maintenance services',
        value: 'simple',
        metadata: {
          weight: 6,
          category: 'complexity',
          triggers: ['low_maintenance', 'simple', 'quick']
        }
      },
      {
        id: 'complexity_moderate',
        text: 'Moderate complexity, some maintenance',
        value: 'moderate',
        metadata: {
          weight: 7,
          category: 'complexity',
          triggers: ['moderate', 'balanced', 'manageable']
        }
      },
      {
        id: 'complexity_high',
        text: 'Complex services, I enjoy the maintenance',
        value: 'complex',
        metadata: {
          weight: 8,
          category: 'complexity',
          triggers: ['complex', 'high_maintenance', 'detailed']
        }
      },
      {
        id: 'complexity_unsure',
        text: 'I\'m not sure, recommend based on my goals',
        value: 'guided',
        metadata: {
          weight: 5,
          category: 'complexity',
          triggers: ['guidance', 'professional_choice']
        }
      }
    ],
    metadata: {
      category: 'complexity_assessment',
      priority: 5,
      tags: ['refinement', 'complexity', 'lifestyle']
    }
  }
];

// BUNDLING NODES - Introduce complementary services/products
export const bundlingNodes: ConsultationNode[] = [
  {
    id: 'bundling_bridal_complete',
    type: 'bundling',
    title: 'Complete bridal experience',
    description: 'For your special day, I recommend a coordinated approach that ensures everything works perfectly together.',
    question: 'Would you like to add complementary services to create your complete bridal look?',
    options: [
      {
        id: 'bridal_add_trial',
        text: 'Yes, add makeup trial (highly recommended)',
        value: 'add_trial',
        nextNodeId: 'bundling_bridal_products',
        metadata: {
          weight: 10,
          category: 'bundling',
          triggers: ['trial_booking', 'confidence_building']
        }
      },
      {
        id: 'bridal_add_hair',
        text: 'Yes, add coordinated hair styling',
        value: 'add_hair',
        nextNodeId: 'bundling_bridal_products',
        metadata: {
          weight: 9,
          category: 'bundling',
          triggers: ['hair_coordination', 'complete_look']
        }
      },
      {
        id: 'bridal_just_makeup',
        text: 'Just makeup for now, I have hair covered',
        value: 'makeup_only',
        nextNodeId: 'bundling_bridal_products',
        metadata: {
          weight: 6,
          category: 'bundling',
          triggers: ['makeup_focus', 'partial_service']
        }
      },
      {
        id: 'bridal_see_options',
        text: 'Show me all options and let me decide',
        value: 'show_all',
        metadata: {
          weight: 7,
          category: 'bundling',
          triggers: ['full_catalog', 'self_selection']
        }
      }
    ],
    metadata: {
      category: 'bridal_bundling',
      priority: 10,
      tags: ['bundling', 'bridal', 'coordination']
    }
  },

  {
    id: 'bundling_color_protection',
    type: 'bundling',
    title: 'Protect your color investment',
    description: 'Since you\'re getting color services, I want to make sure your investment lasts as long as possible.',
    question: 'Would you like to add color-protecting products to maintain your new color?',
    options: [
      {
        id: 'color_full_kit',
        text: 'Yes, give me the complete color care kit',
        value: 'full_kit',
        metadata: {
          weight: 10,
          category: 'bundling',
          triggers: ['complete_care', 'maximum_protection']
        }
      },
      {
        id: 'color_essentials',
        text: 'Just the essentials (shampoo & conditioner)',
        value: 'essentials',
        metadata: {
          weight: 8,
          category: 'bundling',
          triggers: ['basic_care', 'budget_conscious']
        }
      },
      {
        id: 'color_learn_more',
        text: 'Tell me more about why I need these',
        value: 'education',
        nextNodeId: 'education_color_care',
        metadata: {
          weight: 6,
          category: 'bundling',
          triggers: ['education_needed', 'decision_support']
        }
      },
      {
        id: 'color_skip',
        text: 'No thanks, just the color service',
        value: 'skip',
        metadata: {
          weight: 3,
          category: 'bundling',
          triggers: ['service_only', 'minimal_purchase']
        }
      }
    ],
    metadata: {
      category: 'color_care_bundling',
      priority: 8,
      tags: ['bundling', 'color_care', 'product_education']
    }
  },

  {
    id: 'bundling_skincare_routine',
    type: 'bundling',
    title: 'Maintain your facial results',
    description: 'Your facial will give you amazing results. The right home care routine will help maintain and extend those benefits.',
    question: 'Would you like to add products to maintain your facial results at home?',
    options: [
      {
        id: 'skincare_custom_routine',
        text: 'Yes, create a custom routine for my skin',
        value: 'custom_routine',
        metadata: {
          weight: 10,
          category: 'bundling',
          triggers: ['personalized_care', 'skin_analysis']
        }
      },
      {
        id: 'skincare_basic_routine',
        text: 'Just the basics (cleanser, moisturizer, SPF)',
        value: 'basic_routine',
        metadata: {
          weight: 8,
          category: 'bundling',
          triggers: ['essential_care', 'simple_routine']
        }
      },
      {
        id: 'skincare_consultation',
        text: 'I\'d like a consultation about my skin first',
        value: 'consultation',
        nextNodeId: 'education_skincare_analysis',
        metadata: {
          weight: 7,
          category: 'bundling',
          triggers: ['skin_consultation', 'professional_guidance']
        }
      },
      {
        id: 'skincare_skip',
        text: 'Just the facial service for now',
        value: 'skip',
        metadata: {
          weight: 4,
          category: 'bundling',
          triggers: ['service_only', 'minimal_purchase']
        }
      }
    ],
    metadata: {
      category: 'skincare_bundling',
      priority: 7,
      tags: ['bundling', 'skincare', 'routine_building']
    }
  }
];

// EXIT NODES - Finalize recommendations and complete consultation
export const exitNodes: ConsultationNode[] = [
  {
    id: 'exit_single_service',
    type: 'exit',
    title: 'Perfect choice!',
    description: 'You\'ve selected a great service. Let\'s get you booked!',
    question: 'Ready to book your service?',
    options: [
      {
        id: 'book_now',
        text: 'Yes, book this service now',
        value: 'book_now',
        metadata: {
          weight: 10,
          category: 'booking',
          triggers: ['immediate_booking', 'conversion']
        }
      },
      {
        id: 'add_more',
        text: 'Actually, let me see what else you recommend',
        value: 'continue_shopping',
        nextNodeId: 'bundling_additional_services',
        metadata: {
          weight: 7,
          category: 'booking',
          triggers: ['upsell_opportunity', 'continue_consultation']
        }
      },
      {
        id: 'think_about_it',
        text: 'Let me think about it',
        value: 'consider',
        metadata: {
          weight: 5,
          category: 'booking',
          triggers: ['consideration', 'follow_up_needed']
        }
      }
    ],
    metadata: {
      category: 'single_service_exit',
      priority: 6,
      tags: ['exit', 'single_item', 'booking']
    }
  },

  {
    id: 'exit_package_complete',
    type: 'exit',
    title: 'Your complete beauty package',
    description: 'I\'ve put together a comprehensive package that will give you amazing results. Everything works together perfectly.',
    question: 'Ready to book your complete beauty experience?',
    options: [
      {
        id: 'book_package',
        text: 'Yes, book the complete package',
        value: 'book_package',
        metadata: {
          weight: 10,
          category: 'booking',
          triggers: ['package_booking', 'high_value_conversion']
        }
      },
      {
        id: 'modify_package',
        text: 'I\'d like to modify something first',
        value: 'modify',
        nextNodeId: 'refinement_package_adjustment',
        metadata: {
          weight: 7,
          category: 'booking',
          triggers: ['package_modification', 'customization']
        }
      },
      {
        id: 'start_smaller',
        text: 'This feels like a lot, can we start smaller?',
        value: 'reduce',
        nextNodeId: 'bundling_essential_services',
        metadata: {
          weight: 6,
          category: 'booking',
          triggers: ['package_reduction', 'comfort_level']
        }
      },
      {
        id: 'get_pricing',
        text: 'What would this cost?',
        value: 'pricing',
        metadata: {
          weight: 8,
          category: 'booking',
          triggers: ['pricing_inquiry', 'value_assessment']
        }
      }
    ],
    metadata: {
      category: 'package_exit',
      priority: 9,
      tags: ['exit', 'package', 'high_value']
    }
  },

  {
    id: 'exit_exploration_complete',
    type: 'exit',
    title: 'Thanks for exploring with me!',
    description: 'I hope I\'ve given you some great ideas. I\'m here whenever you\'re ready to book.',
    question: 'What would you like to do next?',
    options: [
      {
        id: 'book_something',
        text: 'Actually, let\'s book one of these services',
        value: 'convert',
        nextNodeId: 'bundling_decision_support',
        metadata: {
          weight: 8,
          category: 'booking',
          triggers: ['exploration_conversion', 'decision_made']
        }
      },
      {
        id: 'save_favorites',
        text: 'Save my favorites for later',
        value: 'save',
        metadata: {
          weight: 6,
          category: 'booking',
          triggers: ['save_for_later', 'future_booking']
        }
      },
      {
        id: 'get_info',
        text: 'Send me information about these services',
        value: 'information',
        metadata: {
          weight: 5,
          category: 'booking',
          triggers: ['information_request', 'nurture_lead']
        }
      },
      {
        id: 'browse_more',
        text: 'Let me browse more options',
        value: 'browse',
        metadata: {
          weight: 4,
          category: 'booking',
          triggers: ['continue_browsing', 'extended_exploration']
        }
      }
    ],
    metadata: {
      category: 'exploration_exit',
      priority: 4,
      tags: ['exit', 'exploration', 'nurture']
    }
  }
];

// EDUCATION NODES - Provide information when users need more details
export const educationNodes: ConsultationNode[] = [
  {
    id: 'education_color_care',
    type: 'refinement',
    title: 'Why color care matters',
    description: 'Let me explain how the right products protect your color investment.',
    question: 'Color-treated hair needs special care because regular shampoos can strip color. Color-safe products maintain vibrancy and extend your color\'s life. Ready to add protection?',
    options: [
      {
        id: 'convinced_full_kit',
        text: 'Yes, I want the complete protection kit',
        value: 'full_kit',
        nextNodeId: 'bundling_color_protection',
        metadata: {
          weight: 10,
          category: 'education_conversion',
          triggers: ['educated_purchase', 'full_protection']
        }
      },
      {
        id: 'convinced_essentials',
        text: 'Just the essential products please',
        value: 'essentials',
        nextNodeId: 'bundling_color_protection',
        metadata: {
          weight: 8,
          category: 'education_conversion',
          triggers: ['educated_purchase', 'basic_protection']
        }
      },
      {
        id: 'still_unsure',
        text: 'I\'m still not sure I need these',
        value: 'unsure',
        metadata: {
          weight: 3,
          category: 'education_conversion',
          triggers: ['education_resistance', 'price_sensitivity']
        }
      }
    ],
    metadata: {
      category: 'color_care_education',
      priority: 6,
      tags: ['education', 'color_care', 'value_building']
    }
  }
];

// Export all node collections
export const allNodes: ConsultationNode[] = [
  ...entryNodes,
  ...refinementNodes,
  ...bundlingNodes,
  ...exitNodes,
  ...educationNodes
];

// Helper functions for node management
export function getNodesByType(type: ConsultationNode['type']): ConsultationNode[] {
  return allNodes.filter(node => node.type === type);
}

export function getNodesByCategory(category: string): ConsultationNode[] {
  return allNodes.filter(node => node.metadata?.category === category);
}

export function getNodesByTag(tag: string): ConsultationNode[] {
  return allNodes.filter(node => node.metadata?.tags?.includes(tag));
}

export function findNodeById(nodeId: string): ConsultationNode | undefined {
  return allNodes.find(node => node.id === nodeId);
}

// Node transition helpers
export function getEntryNodes(): ConsultationNode[] {
  return entryNodes;
}

export function getExitNodes(): ConsultationNode[] {
  return exitNodes;
}

export function getBundlingNodes(): ConsultationNode[] {
  return bundlingNodes;
}

export function getRefinementNodes(): ConsultationNode[] {
  return refinementNodes;
}

