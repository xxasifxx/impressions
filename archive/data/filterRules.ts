/**
 * Catalog Filter Rules - Production Data
 * 
 * SCOPE: Hardcoded business intelligence for comprehensive service/product filtering.
 * Contains availability rules, eligibility criteria, business constraints, and user preference logic.
 * 
 * SUCCESS CRITERIA:
 * - Filter accuracy ≥95% for appropriate item inclusion/exclusion
 * - Availability detection ≥98% for service/product availability
 * - Business rule compliance 100% for regulatory and safety requirements
 * - User preference matching ≥90% for personalized filtering
 * 
 * CONSTRAINTS:
 * - Beauty industry focused (hair, makeup, skincare, wellness)
 * - Static rules (no dynamic learning or updates)
 * - USD pricing and US business regulations
 * - English language descriptions
 * 
 * RULE STRUCTURE:
 * - Availability Rules: Define when services/products are available
 * - Eligibility Rules: Determine user eligibility for items
 * - Business Rules: Enforce business constraints and regulations
 * - Preference Rules: Match items to user preferences
 * 
 * KNOWN ISSUES:
 * 1. Rule conflicts: Some rules may contradict each other
 * 2. Availability complexity: Real-time availability requires external systems
 * 3. Preference subjectivity: User preferences may be inconsistent
 * 4. Business rule changes: Regulations and policies may change frequently
 * 
 * MAINTENANCE PROCEDURES:
 * 1. Weekly review: Check rule effectiveness with booking data
 * 2. Rule updates: Add new availability patterns as business grows
 * 3. Compliance updates: Update business rules based on regulatory changes
 * 4. Conflict resolution: Identify and resolve contradictory rules
 * 
 * DIAGNOSTIC METHODS:
 * - Check rule application in filter analysis results
 * - Monitor availability accuracy with actual booking data
 * - Review business rule compliance for audit purposes
 * - Test preference matching with user feedback
 * 
 * EMERGENCY PROCEDURES:
 * - If rules cause incorrect filtering: Disable problematic rules temporarily
 * - If availability errors occur: Fall back to conservative availability estimates
 * - If business rule violations: Use strictest interpretation for safety
 */

import {
  FilterWeights,
  FilterThresholds,
  BusinessRule,
  RuleCondition,
  RuleAction,
  SeasonalFilterFactor,
  FilterPromotion,
  StaffRequirement,
  OperationalHours
} from '../types/FilterTypes';

/**
 * Default weighting factors for filter scoring
 * 
 * USAGE: These weights determine how different factors influence item relevance scores
 * TUNING: Adjust based on business priorities and user feedback
 */
export const DEFAULT_FILTER_WEIGHTS: FilterWeights = {
  relevance: 0.30,           // How well item matches search criteria
  availability: 0.25,        // How available the item is
  userPreference: 0.20,      // How well it matches user preferences
  businessValue: 0.15,       // Business profitability and strategic value
  experienceMatch: 0.10      // Appropriateness for user experience level
};

/**
 * Threshold values for filter decisions
 * 
 * USAGE: These thresholds determine when items are included or excluded
 * TUNING: Adjust based on quality standards and business requirements
 */
export const DEFAULT_FILTER_THRESHOLDS: FilterThresholds = {
  minRelevanceScore: 0.6,        // Minimum relevance for inclusion
  maxPriceDeviation: 0.50,       // Maximum 50% over user's preferred price
  minAvailabilityScore: 0.7,     // Minimum availability for recommendation
  maxComplexityGap: 2,           // Maximum experience level gap
  minBusinessValue: 0.5          // Minimum business value score
};

/**
 * Service availability rules
 * 
 * SCOPE: Defines when services are available based on various factors
 * MAINTENANCE: Update when business hours, staff, or equipment changes
 */
export const SERVICE_AVAILABILITY_RULES = {
  // Standard business hours
  operationalHours: {
    0: { open: '10:00', close: '18:00' }, // Sunday
    1: { open: '09:00', close: '20:00' }, // Monday
    2: { open: '09:00', close: '20:00' }, // Tuesday
    3: { open: '09:00', close: '20:00' }, // Wednesday
    4: { open: '09:00', close: '21:00' }, // Thursday
    5: { open: '09:00', close: '21:00' }, // Friday
    6: { open: '08:00', close: '19:00' }  // Saturday
  } as OperationalHours,

  // Service-specific availability windows
  serviceWindows: {
    'hair-color': {
      minDuration: 120,        // 2 hours minimum
      maxDuration: 300,        // 5 hours maximum
      bufferBefore: 15,        // 15 min setup
      bufferAfter: 30,         // 30 min cleanup
      requiresDaylight: true,  // Better color matching
      preferredTimes: ['10:00-16:00']
    },
    'chemical-treatments': {
      minDuration: 90,
      maxDuration: 240,
      bufferBefore: 20,
      bufferAfter: 45,
      requiresVentilation: true,
      restrictedDays: [0], // No Sundays for chemical treatments
      preferredTimes: ['09:00-15:00']
    },
    'makeup-application': {
      minDuration: 45,
      maxDuration: 120,
      bufferBefore: 10,
      bufferAfter: 15,
      flexibleScheduling: true,
      availableEvenings: true,
      preferredTimes: ['10:00-18:00']
    },
    'facial-treatments': {
      minDuration: 60,
      maxDuration: 150,
      bufferBefore: 15,
      bufferAfter: 20,
      requiresPrivateRoom: true,
      preferredTimes: ['09:00-17:00']
    }
  },

  // Staff availability requirements
  staffRequirements: {
    'senior-colorist': {
      services: ['balayage', 'color-correction', 'complex-color'],
      availability: 'limited',
      bookingAdvance: 7, // days
      maxDailyClients: 4
    },
    'makeup-artist': {
      services: ['bridal-makeup', 'special-event', 'photo-shoot'],
      availability: 'moderate',
      bookingAdvance: 3,
      maxDailyClients: 6
    },
    'esthetician': {
      services: ['facial-treatments', 'chemical-peels', 'microdermabrasion'],
      availability: 'good',
      bookingAdvance: 2,
      maxDailyClients: 8
    },
    'general-stylist': {
      services: ['haircut', 'basic-color', 'styling'],
      availability: 'excellent',
      bookingAdvance: 1,
      maxDailyClients: 10
    }
  },

  // Equipment availability
  equipmentRequirements: {
    'color-processing-station': {
      services: ['hair-color', 'highlights', 'balayage'],
      totalUnits: 4,
      maintenanceSchedule: 'weekly',
      unavailableDates: []
    },
    'facial-room': {
      services: ['facial-treatments', 'chemical-peels'],
      totalUnits: 2,
      requiresPrivacy: true,
      cleaningTime: 30 // minutes between clients
    },
    'makeup-station': {
      services: ['makeup-application', 'makeup-lessons'],
      totalUnits: 3,
      requiresLighting: true,
      setupTime: 15
    }
  }
};

/**
 * Product availability rules
 * 
 * SCOPE: Defines when products are available for purchase
 * MAINTENANCE: Update when inventory systems or suppliers change
 */
export const PRODUCT_AVAILABILITY_RULES = {
  // Inventory thresholds
  inventoryThresholds: {
    'high-demand': {
      categories: ['shampoo', 'conditioner', 'styling-products'],
      minStock: 10,
      reorderPoint: 5,
      maxBackorder: 20
    },
    'specialty': {
      categories: ['color-products', 'chemical-treatments', 'professional-tools'],
      minStock: 3,
      reorderPoint: 2,
      maxBackorder: 5
    },
    'seasonal': {
      categories: ['sun-protection', 'holiday-sets', 'gift-items'],
      minStock: 5,
      reorderPoint: 3,
      seasonalAdjustment: true
    }
  },

  // Supplier availability
  supplierSchedules: {
    'professional-brands': {
      deliveryDays: [2, 4], // Tuesday, Thursday
      leadTime: 3, // days
      minimumOrder: 500, // USD
      backorderAllowed: true
    },
    'retail-brands': {
      deliveryDays: [1, 3, 5], // Monday, Wednesday, Friday
      leadTime: 1,
      minimumOrder: 100,
      backorderAllowed: false
    },
    'specialty-suppliers': {
      deliveryDays: [5], // Friday only
      leadTime: 7,
      minimumOrder: 200,
      backorderAllowed: true
    }
  },

  // Product lifecycle rules
  lifecycleRules: {
    'new-arrivals': {
      promotionPeriod: 30, // days
      featuredPlacement: true,
      discountRestrictions: true
    },
    'seasonal-items': {
      availabilityWindow: 90, // days
      clearancePeriod: 14,
      discountProgression: [0.10, 0.25, 0.50] // increasing discounts
    },
    'discontinued': {
      saleOnly: true,
      noRestock: true,
      clearanceDiscount: 0.30
    }
  }
};

/**
 * User eligibility rules
 * 
 * SCOPE: Determines user eligibility for services and products
 * MAINTENANCE: Update based on safety regulations and business policies
 */
export const USER_ELIGIBILITY_RULES = {
  // Age-based restrictions
  ageRestrictions: {
    'chemical-treatments': {
      minAge: 16,
      parentalConsent: true,
      patchTestRequired: true,
      restrictions: ['bleaching', 'chemical-relaxers', 'perms']
    },
    'advanced-procedures': {
      minAge: 18,
      consultationRequired: true,
      waiverRequired: true,
      restrictions: ['chemical-peels', 'microneedling', 'laser-treatments']
    },
    'makeup-services': {
      minAge: 13,
      parentalConsent: false,
      restrictions: []
    }
  },

  // Experience-based eligibility
  experienceRequirements: {
    'beginner-safe': {
      experienceLevels: ['beginner'],
      services: ['basic-haircut', 'simple-styling', 'basic-facial', 'makeup-lesson'],
      products: ['gentle-cleansers', 'basic-moisturizers', 'beginner-makeup'],
      guidance: 'comprehensive'
    },
    'intermediate-appropriate': {
      experienceLevels: ['beginner', 'intermediate'],
      services: ['color-touch-up', 'advanced-styling', 'specialized-facial'],
      products: ['active-ingredients', 'professional-tools', 'color-products'],
      guidance: 'moderate'
    },
    'advanced-only': {
      experienceLevels: ['advanced', 'expert'],
      services: ['color-correction', 'chemical-treatments', 'editorial-makeup'],
      products: ['professional-grade', 'high-concentration', 'specialized-tools'],
      guidance: 'minimal'
    }
  },

  // Health and safety restrictions
  healthRestrictions: {
    'pregnancy-safe': {
      allowedServices: ['haircut', 'styling', 'gentle-facial', 'makeup'],
      restrictedServices: ['chemical-color', 'chemical-treatments', 'strong-chemicals'],
      allowedProducts: ['pregnancy-safe', 'natural', 'organic'],
      restrictedIngredients: ['retinoids', 'salicylic-acid', 'hydroquinone']
    },
    'sensitive-skin': {
      allowedServices: ['gentle-facial', 'hydrating-treatments'],
      restrictedServices: ['chemical-peels', 'microdermabrasion', 'strong-exfoliation'],
      allowedProducts: ['hypoallergenic', 'fragrance-free', 'gentle'],
      patchTestRequired: true
    },
    'allergies': {
      screeningRequired: true,
      customRestrictions: true,
      alternativeOptions: true,
      emergencyProtocols: true
    }
  }
};

/**
 * Business constraint rules
 * 
 * SCOPE: Enforces business policies, regulations, and operational constraints
 * MAINTENANCE: Update based on regulatory changes and business policy updates
 */
export const BUSINESS_CONSTRAINT_RULES: BusinessRule[] = [
  {
    id: 'licensing-compliance',
    name: 'Professional Licensing Compliance',
    type: 'exclusion',
    conditions: [
      { field: 'serviceType', operator: 'equals', value: 'chemical-treatment' },
      { field: 'staffLicense', operator: 'not-equals', value: 'cosmetology-license' }
    ],
    actions: [
      { type: 'exclude', target: 'service', message: 'Requires licensed cosmetologist' }
    ],
    priority: 10,
    active: true
  },
  {
    id: 'insurance-requirements',
    name: 'Insurance Coverage Requirements',
    type: 'exclusion',
    conditions: [
      { field: 'serviceRisk', operator: 'equals', value: 'high' },
      { field: 'insuranceCoverage', operator: 'equals', value: false }
    ],
    actions: [
      { type: 'exclude', target: 'service', message: 'Not covered by current insurance policy' }
    ],
    priority: 9,
    active: true
  },
  {
    id: 'equipment-safety',
    name: 'Equipment Safety Standards',
    type: 'exclusion',
    conditions: [
      { field: 'equipmentStatus', operator: 'not-equals', value: 'certified' }
    ],
    actions: [
      { type: 'exclude', target: 'service', message: 'Equipment not certified for use' }
    ],
    priority: 10,
    active: true
  },
  {
    id: 'product-expiration',
    name: 'Product Expiration Safety',
    type: 'exclusion',
    conditions: [
      { field: 'expirationDate', operator: 'less-than', value: 'today' }
    ],
    actions: [
      { type: 'exclude', target: 'product', message: 'Product has expired' }
    ],
    priority: 10,
    active: true
  },
  {
    id: 'minimum-age-verification',
    name: 'Minimum Age Verification',
    type: 'exclusion',
    conditions: [
      { field: 'userAge', operator: 'less-than', value: 'serviceMinAge' }
    ],
    actions: [
      { type: 'exclude', target: 'service', message: 'User does not meet minimum age requirement' }
    ],
    priority: 9,
    active: true
  },
  {
    id: 'profitability-threshold',
    name: 'Minimum Profitability Threshold',
    type: 'modification',
    conditions: [
      { field: 'profitMargin', operator: 'less-than', value: 0.20 }
    ],
    actions: [
      { type: 'penalize', target: 'score', value: -0.3, message: 'Below profitability threshold' }
    ],
    priority: 5,
    active: true
  },
  {
    id: 'inventory-optimization',
    name: 'Inventory Level Optimization',
    type: 'modification',
    conditions: [
      { field: 'stockLevel', operator: 'equals', value: 'high' }
    ],
    actions: [
      { type: 'boost', target: 'score', value: 0.2, message: 'High inventory - promote sales' }
    ],
    priority: 3,
    active: true
  }
];

/**
 * User preference matching rules
 * 
 * SCOPE: Matches items to user preferences and historical behavior
 * MAINTENANCE: Update based on user feedback and behavior analysis
 */
export const USER_PREFERENCE_RULES = {
  // Category preference scoring
  categoryPreferences: {
    'hair-services': {
      'color-enthusiast': { boost: 0.3, categories: ['hair-color', 'highlights', 'balayage'] },
      'low-maintenance': { boost: 0.2, categories: ['haircut', 'basic-styling'] },
      'trendy': { boost: 0.25, categories: ['fashion-color', 'creative-cuts', 'avant-garde'] }
    },
    'skincare-services': {
      'anti-aging-focused': { boost: 0.3, categories: ['anti-aging-facial', 'chemical-peels'] },
      'sensitive-skin': { boost: 0.2, categories: ['gentle-facial', 'hydrating-treatments'] },
      'acne-prone': { boost: 0.25, categories: ['acne-facial', 'deep-cleansing'] }
    },
    'makeup-services': {
      'special-events': { boost: 0.3, categories: ['bridal-makeup', 'event-makeup'] },
      'everyday-wear': { boost: 0.2, categories: ['natural-makeup', 'makeup-lessons'] },
      'dramatic-looks': { boost: 0.25, categories: ['editorial-makeup', 'creative-makeup'] }
    }
  },

  // Brand preference scoring
  brandPreferences: {
    'luxury-brands': {
      brands: ['Olaplex', 'Kerastase', 'Shu Uemura', 'La Mer'],
      userTypes: ['premium-customer', 'brand-conscious'],
      boost: 0.25
    },
    'natural-brands': {
      brands: ['Aveda', 'Bumble and Bumble', 'Tarte', 'Drunk Elephant'],
      userTypes: ['eco-conscious', 'sensitive-skin'],
      boost: 0.20
    },
    'professional-brands': {
      brands: ['Redken', 'Matrix', 'Paul Mitchell', 'Schwarzkopf'],
      userTypes: ['experienced-user', 'salon-regular'],
      boost: 0.15
    }
  },

  // Price preference scoring
  pricePreferences: {
    'budget-conscious': {
      priceRange: { max: 100 },
      boost: 0.3,
      penalizeExpensive: 0.4
    },
    'value-seeker': {
      priceRange: { min: 50, max: 200 },
      boost: 0.2,
      preferBundles: true
    },
    'premium-customer': {
      priceRange: { min: 150 },
      boost: 0.1,
      preferExclusive: true
    }
  },

  // Time preference scoring
  timePreferences: {
    'quick-services': {
      maxDuration: 60,
      boost: 0.25,
      preferredServices: ['express-facial', 'quick-color', 'wash-and-go']
    },
    'pampering-sessions': {
      minDuration: 120,
      boost: 0.20,
      preferredServices: ['spa-package', 'full-color', 'deluxe-facial']
    },
    'weekend-warrior': {
      preferredDays: [0, 6], // Sunday, Saturday
      boost: 0.15,
      flexibleTiming: true
    }
  }
};

/**
 * Seasonal filtering factors
 * 
 * SCOPE: Seasonal influences on service and product recommendations
 * MAINTENANCE: Update seasonally and based on regional climate patterns
 */
export const SEASONAL_FILTER_FACTORS: SeasonalFilterFactor[] = [
  {
    season: 'spring',
    influence: 0.3,
    affectedCategories: ['hair-color-refresh', 'skin-renewal', 'fresh-makeup-looks'],
    startDate: new Date('2024-03-20'),
    endDate: new Date('2024-06-20')
  },
  {
    season: 'summer',
    influence: 0.4,
    affectedCategories: ['sun-protection', 'waterproof-makeup', 'hair-protection', 'cooling-treatments'],
    startDate: new Date('2024-06-21'),
    endDate: new Date('2024-09-22')
  },
  {
    season: 'fall',
    influence: 0.2,
    affectedCategories: ['rich-hair-colors', 'hydrating-treatments', 'dramatic-makeup', 'repair-treatments'],
    startDate: new Date('2024-09-23'),
    endDate: new Date('2024-12-20')
  },
  {
    season: 'winter',
    influence: 0.5,
    affectedCategories: ['intensive-hydration', 'protective-treatments', 'party-makeup', 'repair-services'],
    startDate: new Date('2024-12-21'),
    endDate: new Date('2025-03-19')
  },
  {
    season: 'holiday',
    influence: 0.6,
    affectedCategories: ['special-occasion', 'gift-sets', 'premium-services', 'party-ready'],
    startDate: new Date('2024-11-15'),
    endDate: new Date('2025-01-15')
  }
];

/**
 * Promotional filtering rules
 * 
 * SCOPE: Promotional offers that affect filtering and scoring
 * MAINTENANCE: Update based on marketing campaigns and business promotions
 */
export const PROMOTIONAL_FILTER_RULES: FilterPromotion[] = [
  {
    id: 'new-client-special',
    name: 'New Client 20% Off',
    applicableItems: ['haircut', 'basic-color', 'facial'],
    discountType: 'percentage',
    discountValue: 0.20,
    validUntil: new Date('2024-12-31'),
    conditions: [
      { type: 'user-type', value: 'new-client', description: 'First-time clients only' }
    ]
  },
  {
    id: 'color-package-deal',
    name: 'Color + Cut Package',
    applicableItems: ['hair-color', 'haircut'],
    discountType: 'percentage',
    discountValue: 0.15,
    validUntil: new Date('2024-12-31'),
    conditions: [
      { type: 'minimum-purchase', value: 2, description: 'Must book both services' }
    ]
  },
  {
    id: 'seasonal-skincare',
    name: 'Winter Skincare Special',
    applicableItems: ['hydrating-facial', 'moisturizing-products'],
    discountType: 'percentage',
    discountValue: 0.25,
    validUntil: new Date('2025-02-28'),
    conditions: [
      { type: 'date-range', value: 'winter-season', description: 'Winter months only' }
    ]
  },
  {
    id: 'loyalty-reward',
    name: 'Loyalty Member Benefits',
    applicableItems: ['all-services', 'all-products'],
    discountType: 'percentage',
    discountValue: 0.10,
    validUntil: new Date('2025-12-31'),
    conditions: [
      { type: 'user-type', value: 'loyalty-member', description: 'Active loyalty members' }
    ]
  }
];

/**
 * Category-specific filtering rules
 * 
 * SCOPE: Specialized rules for different service and product categories
 * MAINTENANCE: Update when new categories are added or category rules change
 */
export const CATEGORY_FILTER_RULES = {
  // Hair service filtering
  hairServices: {
    colorServices: {
      requiresConsultation: true,
      patchTestRequired: ['first-time-color', 'dramatic-change'],
      maintenanceSchedule: { weeks: 6, reminder: true },
      seasonalBoost: { spring: 0.3, fall: 0.2 }
    },
    chemicalServices: {
      waitPeriod: { afterColor: 14, afterChemical: 21 }, // days
      requiresHealthCheck: true,
      ageRestrictions: { min: 16, parentalConsent: true },
      seasonalRestrictions: { summer: 'limited' }
    },
    cuttingServices: {
      flexibleScheduling: true,
      walkInsAccepted: true,
      seasonalDemand: { 'back-to-school': 0.4, holidays: 0.3 }
    }
  },

  // Skincare service filtering
  skincareServices: {
    facialTreatments: {
      skinTypeMatching: true,
      seasonalAdjustments: true,
      followUpRequired: ['chemical-peels', 'microneedling'],
      contraindications: ['active-acne', 'recent-sun-exposure']
    },
    chemicalTreatments: {
      consultationRequired: true,
      patchTestRequired: true,
      downtimeWarning: true,
      seasonalRestrictions: { summer: 'not-recommended' }
    }
  },

  // Makeup service filtering
  makeupServices: {
    specialEvent: {
      advanceBooking: { weeks: 4, priority: 'high' },
      trialRequired: ['bridal', 'photography'],
      timeBuffer: { before: 30, after: 15 },
      seasonalDemand: { 'wedding-season': 0.5, holidays: 0.4 }
    },
    everyday: {
      flexibleScheduling: true,
      walkInsAccepted: true,
      lessonIncluded: true
    }
  },

  // Product filtering
  products: {
    professionalGrade: {
      consultationRecommended: true,
      instructionsRequired: true,
      followUpSupport: true,
      experienceLevel: ['intermediate', 'advanced', 'expert']
    },
    retailGrade: {
      selfService: true,
      instructionsIncluded: true,
      returnPolicy: 'standard',
      experienceLevel: ['beginner', 'intermediate']
    }
  }
};

/**
 * Performance optimization rules
 * 
 * SCOPE: Rules for optimizing filter performance and caching
 * MAINTENANCE: Update based on performance monitoring and system capacity
 */
export const PERFORMANCE_OPTIMIZATION_RULES = {
  // Caching strategies
  caching: {
    catalogCache: {
      ttl: 3600, // 1 hour
      maxSize: 1000,
      invalidateOn: ['inventory-update', 'price-change']
    },
    userPreferenceCache: {
      ttl: 86400, // 24 hours
      maxSize: 500,
      invalidateOn: ['preference-update', 'purchase']
    },
    availabilityCache: {
      ttl: 300, // 5 minutes
      maxSize: 200,
      invalidateOn: ['booking', 'cancellation']
    }
  },

  // Query optimization
  queryOptimization: {
    maxFilters: 10,
    maxResults: 100,
    timeoutMs: 5000,
    earlyTermination: true
  },

  // Load balancing
  loadBalancing: {
    maxConcurrentFilters: 50,
    queueTimeout: 10000,
    priorityLevels: ['urgent', 'normal', 'background']
  }
};

/**
 * Emergency fallback rules
 * 
 * SCOPE: Fallback logic when primary filtering rules fail
 * USAGE: Ensures system always provides reasonable results
 */
export const EMERGENCY_FALLBACK_RULES = {
  // Simple category fallbacks
  basicCategoryFiltering: {
    'hair': ['haircut', 'hair-color', 'hair-styling'],
    'makeup': ['makeup-application', 'makeup-lesson'],
    'skincare': ['facial', 'skincare-consultation'],
    'products': ['shampoo', 'conditioner', 'moisturizer']
  },

  // Conservative availability fallbacks
  conservativeAvailability: {
    assumeAvailable: ['basic-services', 'retail-products'],
    assumeUnavailable: ['specialty-services', 'professional-products'],
    defaultWaitTime: 7 // days
  },

  // Safe eligibility fallbacks
  safeEligibility: {
    'beginner': ['basic-services', 'gentle-products'],
    'intermediate': ['standard-services', 'quality-products'],
    'advanced': ['premium-services', 'professional-products'],
    'expert': ['all-services', 'all-products']
  },

  // Minimal business rules
  minimalBusinessRules: {
    ageVerification: true,
    safetyFirst: true,
    basicProfitability: true,
    inventoryCheck: false
  }
};

