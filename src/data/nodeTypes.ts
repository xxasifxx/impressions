import { ConsultationNode } from '@/data/models/ConsultationTypes';

/**
 * Pre-defined consultation nodes following the strategic guidelines
 * These nodes implement the professional cosmetologist consultation pattern
 */

// ENTRY NODES - Start with natural discovery, not leading questions
export const entryNodes: ConsultationNode[] = [
  {
    id: 'entry_consultation_type',
    type: 'entry',
    title: 'How can I help you today?',
    description: 'I\'m here to help you find exactly what you\'re looking for.',
    question: 'What brings you here today?',
    options: [
      {
        id: 'quick_service',
        text: 'I know what I want - show me options and pricing',
        value: 'quick_service',
        nextNodeId: 'quick_service_filter',
        metadata: {
          weight: 8,
          category: 'consultation_type',
          triggers: ['fast_track', 'minimal_questions', 'pricing_focus']
        }
      },
      {
        id: 'help_me_decide',
        text: 'Help me figure out what would be best for me',
        value: 'guided_consultation',
        nextNodeId: 'guided_current_situation',
        metadata: {
          weight: 9,
          category: 'consultation_type',
          triggers: ['detailed_consultation', 'education', 'guidance']
        }
      },
      {
        id: 'browse_services',
        text: 'I\'m just browsing to see what you offer',
        value: 'exploration',
        nextNodeId: 'exploration_interests',
        metadata: {
          weight: 5,
          category: 'consultation_type',
          triggers: ['discovery', 'low_commitment', 'education']
        }
      },
      {
        id: 'specific_concern',
        text: 'I have a specific concern or problem to address',
        value: 'problem_solving',
        nextNodeId: 'concern_assessment',
        metadata: {
          weight: 8,
          category: 'consultation_type',
          triggers: ['solution_focused', 'expert_guidance', 'targeted']
        }
      }
    ],
    metadata: {
      category: 'consultation_segmentation',
      priority: 10,
      tags: ['entry', 'required', 'segmentation']
    }
  },

  // QUICK SERVICE PATH - Minimal questions, fast filtering
  {
    id: 'quick_service_filter',
    type: 'refinement',
    title: 'What type of service are you looking for?',
    description: 'I\'ll show you options and pricing for your area of interest.',
    question: 'Which area interests you most?',
    options: [
      {
        id: 'quick_hair',
        text: 'Hair services (cut, color, styling)',
        value: 'hair-salon',
        nextNodeId: 'quick_hair_specifics',
        metadata: {
          weight: 8,
          category: 'quick_domain',
          triggers: ['hair_services', 'show_cards_soon']
        }
      },
      {
        id: 'quick_makeup',
        text: 'Makeup application or lessons',
        value: 'makeup-studio',
        nextNodeId: 'quick_makeup_specifics',
        metadata: {
          weight: 8,
          category: 'quick_domain',
          triggers: ['makeup_services', 'show_cards_soon']
        }
      },
      {
        id: 'quick_skincare',
        text: 'Skincare treatments or facials',
        value: 'med-spa',
        nextNodeId: 'quick_skincare_specifics',
        metadata: {
          weight: 8,
          category: 'quick_domain',
          triggers: ['skincare_services', 'show_cards_soon']
        }
      },
      {
        id: 'quick_multiple',
        text: 'Multiple services (hair + makeup, etc.)',
        value: 'multiple',
        nextNodeId: 'quick_package_options',
        metadata: {
          weight: 9,
          category: 'quick_domain',
          triggers: ['package_services', 'bundling_opportunity']
        }
      }
    ],
    metadata: {
      category: 'quick_service_filtering',
      priority: 9,
      tags: ['quick_path', 'domain_selection', 'fast_track']
    }
  },

  // GUIDED CONSULTATION PATH - Detailed discovery
  {
    id: 'guided_current_situation',
    type: 'entry',
    title: 'Tell me about your current situation',
    description: 'Understanding where you\'re starting from helps me give you the best recommendations.',
    question: 'What\'s your current beauty routine like?',
    options: [
      {
        id: 'minimal_routine',
        text: 'Pretty minimal - I don\'t do much beyond basics',
        value: 'minimal',
        nextNodeId: 'guided_goals_discovery',
        metadata: {
          weight: 7,
          category: 'current_state',
          triggers: ['beginner_friendly', 'education_needed', 'simple_start']
        }
      },
      {
        id: 'some_routine',
        text: 'I have some routine but want to improve it',
        value: 'developing',
        nextNodeId: 'guided_goals_discovery',
        metadata: {
          weight: 8,
          category: 'current_state',
          triggers: ['intermediate_level', 'enhancement_focused']
        }
      },
      {
        id: 'established_routine',
        text: 'I have an established routine and get regular services',
        value: 'established',
        nextNodeId: 'guided_change_motivation',
        metadata: {
          weight: 9,
          category: 'current_state',
          triggers: ['experienced_client', 'refinement_focused']
        }
      },
      {
        id: 'professional_level',
        text: 'I work in beauty/fashion or am very experienced',
        value: 'professional',
        nextNodeId: 'guided_specific_goals',
        metadata: {
          weight: 10,
          category: 'current_state',
          triggers: ['expert_level', 'advanced_services', 'technical_discussion']
        }
      }
    ],
    metadata: {
      category: 'guided_assessment',
      priority: 9,
      tags: ['guided_path', 'current_state', 'experience_level']
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

// GOAL DISCOVERY NODES - Natural motivation discovery
export const goalDiscoveryNodes: ConsultationNode[] = [
  {
    id: 'guided_goals_discovery',
    type: 'refinement',
    title: 'What are you hoping to achieve?',
    description: 'Understanding your goals helps me recommend the perfect approach for you.',
    question: 'What would make you feel most confident and happy with your appearance?',
    options: [
      {
        id: 'goal_special_occasion',
        text: 'Looking amazing for a special event or milestone',
        value: 'special_occasion',
        nextNodeId: 'occasion_details',
        metadata: {
          weight: 9,
          category: 'goal_motivation',
          triggers: ['occasion_focused', 'timeline_sensitive', 'high_impact']
        }
      },
      {
        id: 'goal_daily_confidence',
        text: 'Feeling more confident in my daily life',
        value: 'daily_confidence',
        nextNodeId: 'confidence_areas',
        metadata: {
          weight: 8,
          category: 'goal_motivation',
          triggers: ['confidence_building', 'lifestyle_enhancement']
        }
      },
      {
        id: 'goal_professional_image',
        text: 'Improving my professional appearance',
        value: 'professional_image',
        nextNodeId: 'professional_context',
        metadata: {
          weight: 8,
          category: 'goal_motivation',
          triggers: ['professional_focus', 'career_enhancement']
        }
      },
      {
        id: 'goal_maintenance',
        text: 'Maintaining what I have but doing it better',
        value: 'maintenance_improvement',
        nextNodeId: 'maintenance_focus',
        metadata: {
          weight: 7,
          category: 'goal_motivation',
          triggers: ['maintenance_focused', 'optimization']
        }
      },
      {
        id: 'goal_transformation',
        text: 'Making a significant change or trying something new',
        value: 'transformation',
        nextNodeId: 'transformation_scope',
        metadata: {
          weight: 9,
          category: 'goal_motivation',
          triggers: ['transformation_focused', 'change_ready', 'bold_choices']
        }
      }
    ],
    metadata: {
      category: 'goal_discovery',
      priority: 8,
      tags: ['guided_path', 'motivation_discovery', 'natural_flow']
    }
  },

  {
    id: 'occasion_details',
    type: 'refinement',
    title: 'Tell me about your special occasion',
    description: 'The more I know about your event, the better I can help you look and feel amazing.',
    question: 'What\'s the occasion?',
    options: [
      {
        id: 'wedding_bride',
        text: 'My wedding - I\'m the bride',
        value: 'wedding_bride',
        nextNodeId: 'bridal_timeline',
        metadata: {
          weight: 10,
          category: 'occasion_type',
          triggers: ['bridal_focus', 'high_stakes', 'comprehensive_needs']
        }
      },
      {
        id: 'wedding_party',
        text: 'Wedding party member or guest',
        value: 'wedding_guest',
        nextNodeId: 'wedding_role_details',
        metadata: {
          weight: 8,
          category: 'occasion_type',
          triggers: ['wedding_appropriate', 'coordinated_look']
        }
      },
      {
        id: 'date_romantic',
        text: 'Important date or romantic occasion',
        value: 'romantic_date',
        nextNodeId: 'date_context',
        metadata: {
          weight: 7,
          category: 'occasion_type',
          triggers: ['romantic_styling', 'confidence_boost']
        }
      },
      {
        id: 'professional_event',
        text: 'Work event, interview, or professional milestone',
        value: 'professional_event',
        nextNodeId: 'professional_event_details',
        metadata: {
          weight: 8,
          category: 'occasion_type',
          triggers: ['professional_styling', 'authority_presence']
        }
      },
      {
        id: 'celebration',
        text: 'Birthday, anniversary, or personal celebration',
        value: 'personal_celebration',
        nextNodeId: 'celebration_style',
        metadata: {
          weight: 7,
          category: 'occasion_type',
          triggers: ['celebratory_styling', 'personal_expression']
        }
      },
      {
        id: 'photos',
        text: 'Photo shoot or important photos',
        value: 'photo_session',
        nextNodeId: 'photo_context',
        metadata: {
          weight: 8,
          category: 'occasion_type',
          triggers: ['photo_ready', 'camera_appropriate']
        }
      }
    ],
    metadata: {
      category: 'occasion_specification',
      priority: 9,
      tags: ['occasion_path', 'context_discovery', 'high_stakes']
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

// DEFINITIVE END STATES - Consultation pauses for cart actions
export const definitiveEndStates: ConsultationNode[] = [
  {
    id: 'end_state_quick_results',
    type: 'exit',
    title: 'Here are your options',
    description: 'Based on what you\'re looking for, here are the services that match your needs with pricing.',
    question: 'Ready to add something to your cart, or would you like to explore more?',
    options: [
      {
        id: 'add_to_cart',
        text: 'Add a service to my cart',
        value: 'cart_action',
        metadata: {
          weight: 10,
          category: 'cart_action',
          triggers: ['conversion', 'agent_d_bundling']
        }
      },
      {
        id: 'explore_more',
        text: 'Show me more options in this area',
        value: 'expand_results',
        nextNodeId: 'expand_quick_results',
        metadata: {
          weight: 7,
          category: 'exploration',
          triggers: ['catalog_expansion', 'continue_browsing']
        }
      },
      {
        id: 'different_area',
        text: 'Actually, I\'m interested in a different type of service',
        value: 'pivot_service',
        nextNodeId: 'quick_service_filter',
        metadata: {
          weight: 6,
          category: 'pivot',
          triggers: ['service_pivot', 'restart_filtering']
        }
      },
      {
        id: 'need_guidance',
        text: 'I need more help deciding - can you guide me?',
        value: 'request_guidance',
        nextNodeId: 'guided_current_situation',
        metadata: {
          weight: 8,
          category: 'consultation_upgrade',
          triggers: ['detailed_consultation', 'guidance_needed']
        }
      }
    ],
    metadata: {
      category: 'quick_service_end_state',
      priority: 10,
      tags: ['end_state', 'cart_trigger', 'agent_d_handoff']
    }
  },

  {
    id: 'end_state_guided_recommendations',
    type: 'exit',
    title: 'Your personalized recommendations',
    description: 'Based on our conversation, I\'ve selected services that will help you achieve your goals.',
    question: 'What would you like to do next?',
    options: [
      {
        id: 'book_recommended',
        text: 'Book one of these recommended services',
        value: 'cart_action',
        metadata: {
          weight: 10,
          category: 'cart_action',
          triggers: ['conversion', 'agent_d_bundling']
        }
      },
      {
        id: 'learn_more_service',
        text: 'Tell me more about one of these services',
        value: 'service_education',
        nextNodeId: 'service_deep_dive',
        metadata: {
          weight: 8,
          category: 'education',
          triggers: ['service_education', 'confidence_building']
        }
      },
      {
        id: 'modify_recommendations',
        text: 'These don\'t feel quite right - can we adjust?',
        value: 'refine_recommendations',
        nextNodeId: 'recommendation_refinement',
        metadata: {
          weight: 7,
          category: 'refinement',
          triggers: ['recommendation_adjustment', 'preference_clarification']
        }
      },
      {
        id: 'save_for_later',
        text: 'Save these recommendations for later',
        value: 'save_recommendations',
        metadata: {
          weight: 5,
          category: 'save_action',
          triggers: ['lead_nurture', 'future_booking']
        }
      }
    ],
    metadata: {
      category: 'guided_consultation_end_state',
      priority: 10,
      tags: ['end_state', 'cart_trigger', 'agent_d_handoff']
    }
  },

  {
    id: 'end_state_cart_analysis',
    type: 'exit',
    title: 'Let me analyze your selections',
    description: 'I see you\'ve added some services to your cart. Let me suggest some combinations that work beautifully together.',
    question: 'Based on what you\'ve selected, here are some intelligent recommendations:',
    options: [
      {
        id: 'accept_bundle',
        text: 'Add the recommended combination',
        value: 'bundle_acceptance',
        metadata: {
          weight: 10,
          category: 'bundle_action',
          triggers: ['bundle_conversion', 'upsell_success']
        }
      },
      {
        id: 'modify_bundle',
        text: 'I like some of these suggestions - let me customize',
        value: 'bundle_customization',
        nextNodeId: 'bundle_customization',
        metadata: {
          weight: 8,
          category: 'bundle_modification',
          triggers: ['bundle_refinement', 'personalization']
        }
      },
      {
        id: 'just_original',
        text: 'Just book what I originally selected',
        value: 'original_selection',
        metadata: {
          weight: 6,
          category: 'bundle_decline',
          triggers: ['minimal_booking', 'bundle_resistance']
        }
      },
      {
        id: 'continue_shopping',
        text: 'Let me look at more options first',
        value: 'continue_browsing',
        nextNodeId: 'post_cart_browsing',
        metadata: {
          weight: 7,
          category: 'continued_exploration',
          triggers: ['extended_shopping', 'catalog_expansion']
        }
      }
    ],
    metadata: {
      category: 'cart_analysis_end_state',
      priority: 10,
      tags: ['end_state', 'agent_d_primary', 'bundling_focus']
    }
  }
];

// MULTIPLE ENTRY POINT NODES - Can be reached from different paths
export const multipleEntryNodes: ConsultationNode[] = [
  {
    id: 'service_deep_dive',
    type: 'refinement',
    title: 'Let me explain this service',
    description: 'Understanding exactly what this service involves helps you make the best decision.',
    question: 'Which service would you like to know more about?',
    // This node can be reached from:
    // - end_state_guided_recommendations
    // - browsing flow
    // - cart analysis flow
    // - direct service inquiry
    options: [
      {
        id: 'service_process',
        text: 'What exactly happens during this service?',
        value: 'process_explanation',
        nextNodeId: 'service_process_details',
        metadata: {
          weight: 9,
          category: 'service_education',
          triggers: ['process_understanding', 'confidence_building']
        }
      },
      {
        id: 'service_results',
        text: 'What results can I expect?',
        value: 'results_explanation',
        nextNodeId: 'service_results_details',
        metadata: {
          weight: 9,
          category: 'service_education',
          triggers: ['outcome_understanding', 'expectation_setting']
        }
      },
      {
        id: 'service_maintenance',
        text: 'What\'s the maintenance and aftercare like?',
        value: 'maintenance_explanation',
        nextNodeId: 'service_maintenance_details',
        metadata: {
          weight: 8,
          category: 'service_education',
          triggers: ['maintenance_understanding', 'long_term_planning']
        }
      },
      {
        id: 'ready_to_book',
        text: 'I understand - I\'m ready to book this',
        value: 'cart_action',
        metadata: {
          weight: 10,
          category: 'cart_action',
          triggers: ['conversion', 'agent_d_bundling']
        }
      }
    ],
    metadata: {
      category: 'service_education',
      priority: 8,
      tags: ['multiple_entry', 'education', 'conversion_support']
    }
  },

  {
    id: 'recommendation_refinement',
    type: 'refinement',
    title: 'Let\'s adjust your recommendations',
    description: 'Tell me what doesn\'t feel right and I\'ll find better options for you.',
    question: 'What would you like to change about these recommendations?',
    // This node can be reached from:
    // - end_state_guided_recommendations
    // - post-cart analysis
    // - browsing refinement
    options: [
      {
        id: 'too_complex',
        text: 'These seem too complex or time-consuming',
        value: 'simplify_recommendations',
        nextNodeId: 'simplified_options',
        metadata: {
          weight: 8,
          category: 'complexity_adjustment',
          triggers: ['simplification', 'time_conscious']
        }
      },
      {
        id: 'too_simple',
        text: 'I\'m ready for something more advanced or dramatic',
        value: 'enhance_recommendations',
        nextNodeId: 'enhanced_options',
        metadata: {
          weight: 8,
          category: 'complexity_adjustment',
          triggers: ['enhancement', 'bold_choices']
        }
      },
      {
        id: 'wrong_focus',
        text: 'The focus is wrong - I\'m more interested in [different area]',
        value: 'refocus_recommendations',
        nextNodeId: 'focus_adjustment',
        metadata: {
          weight: 9,
          category: 'focus_adjustment',
          triggers: ['domain_shift', 'preference_clarification']
        }
      },
      {
        id: 'budget_concerns',
        text: 'I need to see options at different price points',
        value: 'budget_adjustment',
        nextNodeId: 'budget_options',
        metadata: {
          weight: 8,
          category: 'budget_adjustment',
          triggers: ['price_sensitivity', 'value_options']
        }
      }
    ],
    metadata: {
      category: 'recommendation_adjustment',
      priority: 8,
      tags: ['multiple_entry', 'refinement', 'personalization']
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
  ...goalDiscoveryNodes,
  ...refinementNodes,
  ...bundlingNodes,
  ...definitiveEndStates,
  ...multipleEntryNodes,
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
