/**
 * Bundle Recommendation Rules - Production Data
 * 
 * SCOPE: Hardcoded business intelligence for intelligent service/product bundling.
 * Contains compatibility rules, pricing logic, experience matching, and business optimization rules.
 * 
 * SUCCESS CRITERIA:
 * - Bundle accuracy ≥90% for appropriate recommendations
 * - Compatibility detection ≥95% for service/product conflicts
 * - Pricing calculations accurate to within $0.01
 * - Experience matching appropriate for user skill level
 * 
 * CONSTRAINTS:
 * - Beauty industry focused (hair, makeup, skincare, wellness)
 * - Static rules (no dynamic learning or updates)
 * - USD pricing calculations
 * - English language descriptions
 * 
 * RULE STRUCTURE:
 * - Compatibility Rules: Define which services/products work well together
 * - Pricing Rules: Calculate discounts and bundle pricing
 * - Experience Rules: Match bundles to user experience levels
 * - Business Rules: Optimize for profitability and inventory
 * 
 * KNOWN ISSUES:
 * 1. Rule conflicts: Some rules may contradict each other
 * 2. Pricing complexity: Complex discount stacking scenarios
 * 3. Inventory integration: Rules assume perfect inventory availability
 * 4. Seasonal variations: Limited seasonal rule coverage
 * 
 * MAINTENANCE PROCEDURES:
 * 1. Monthly review: Check rule effectiveness with sales data
 * 2. Rule updates: Add new service/product combinations as catalog grows
 * 3. Pricing adjustment: Update discount percentages based on business performance
 * 4. Conflict resolution: Identify and resolve contradictory rules
 * 
 * DIAGNOSTIC METHODS:
 * - Check rule application in bundle analysis results
 * - Monitor compatibility scores for accuracy
 * - Review pricing calculations for correctness
 * - Test experience matching with known user profiles
 * 
 * EMERGENCY PROCEDURES:
 * - If rules cause incorrect bundling: Disable problematic rules temporarily
 * - If pricing errors occur: Fall back to individual item pricing
 * - If compatibility issues arise: Use conservative compatibility scoring
 */

import { 
  BundleWeights, 
  BundleThresholds, 
  ServiceSynergy, 
  CompatibilityIssue,
  DiscountSource,
  SeasonalFactor,
  ProfitabilityTarget
} from '../types/BundleTypes';

/**
 * Default weighting factors for bundle scoring
 * 
 * USAGE: These weights determine how different factors influence bundle recommendations
 * TUNING: Adjust based on business priorities and customer feedback
 */
export const DEFAULT_BUNDLE_WEIGHTS: BundleWeights = {
  compatibility: 0.30,        // Service/product compatibility
  pricing: 0.25,             // Value and discount attractiveness
  experienceMatch: 0.20,     // Appropriateness for user skill level
  businessValue: 0.15,       // Profitability and strategic value
  customerSatisfaction: 0.10 // Historical satisfaction scores
};

/**
 * Threshold values for bundle decisions
 * 
 * USAGE: These thresholds determine when bundles are recommended or rejected
 * TUNING: Adjust based on quality standards and business requirements
 */
export const DEFAULT_BUNDLE_THRESHOLDS: BundleThresholds = {
  minCompatibilityScore: 0.7,    // Minimum compatibility for recommendation
  maxPriceIncrease: 0.15,        // Maximum 15% price increase over individual items
  minDiscountPercentage: 0.05,   // Minimum 5% discount to justify bundling
  maxComplexityGap: 2,           // Maximum experience level gap (beginner=1, expert=4)
  minProfitabilityScore: 0.6     // Minimum profitability score for business viability
};

/**
 * Service compatibility rules
 * 
 * SCOPE: Defines which services work well together, conflicts, and optimal sequencing
 * MAINTENANCE: Update when new services are added or service procedures change
 */
export const SERVICE_COMPATIBILITY_RULES = {
  // Hair services compatibility
  hair: {
    synergies: [
      {
        services: ['haircut', 'hair-color'],
        synergyType: 'sequential' as const,
        benefit: 'Color application is more precise after fresh cut',
        valueIncrease: 0.15,
        optimalSequence: ['haircut', 'hair-color']
      },
      {
        services: ['hair-color', 'hair-treatment'],
        synergyType: 'enhancing' as const,
        benefit: 'Treatment protects and enhances color longevity',
        valueIncrease: 0.20,
        optimalSequence: ['hair-color', 'hair-treatment']
      },
      {
        services: ['haircut', 'hair-styling'],
        synergyType: 'complementary' as const,
        benefit: 'Styling showcases the new cut perfectly',
        valueIncrease: 0.10,
        optimalSequence: ['haircut', 'hair-styling']
      },
      {
        services: ['balayage', 'hair-gloss'],
        synergyType: 'enhancing' as const,
        benefit: 'Gloss adds shine and depth to balayage highlights',
        valueIncrease: 0.25,
        optimalSequence: ['balayage', 'hair-gloss']
      }
    ],
    conflicts: [
      {
        services: ['hair-color', 'chemical-relaxer'],
        type: 'conflict' as const,
        severity: 'critical' as const,
        description: 'Chemical processes cannot be performed on the same day',
        affectedItems: ['hair-color', 'chemical-relaxer'],
        resolution: 'Schedule services at least 2 weeks apart'
      },
      {
        services: ['bleaching', 'perm'],
        type: 'conflict' as const,
        severity: 'critical' as const,
        description: 'Bleaching and perming are incompatible chemical processes',
        affectedItems: ['bleaching', 'perm'],
        resolution: 'Choose one service or schedule months apart'
      }
    ]
  },

  // Makeup services compatibility
  makeup: {
    synergies: [
      {
        services: ['makeup-consultation', 'makeup-application'],
        synergyType: 'sequential' as const,
        benefit: 'Consultation ensures perfect application technique',
        valueIncrease: 0.20,
        optimalSequence: ['makeup-consultation', 'makeup-application']
      },
      {
        services: ['eyebrow-shaping', 'makeup-application'],
        synergyType: 'complementary' as const,
        benefit: 'Shaped brows enhance overall makeup look',
        valueIncrease: 0.15,
        optimalSequence: ['eyebrow-shaping', 'makeup-application']
      },
      {
        services: ['makeup-lesson', 'makeup-application'],
        synergyType: 'enhancing' as const,
        benefit: 'Learn techniques while getting professional application',
        valueIncrease: 0.30,
        optimalSequence: ['makeup-lesson', 'makeup-application']
      }
    ],
    conflicts: [
      {
        services: ['lash-extensions', 'lash-lift'],
        type: 'conflict' as const,
        severity: 'high' as const,
        description: 'Cannot perform both lash services simultaneously',
        affectedItems: ['lash-extensions', 'lash-lift'],
        resolution: 'Choose one lash service based on desired outcome'
      }
    ]
  },

  // Skincare services compatibility
  skincare: {
    synergies: [
      {
        services: ['facial-cleansing', 'facial-treatment'],
        synergyType: 'sequential' as const,
        benefit: 'Deep cleansing prepares skin for treatment absorption',
        valueIncrease: 0.25,
        optimalSequence: ['facial-cleansing', 'facial-treatment']
      },
      {
        services: ['exfoliation', 'hydrating-mask'],
        synergyType: 'sequential' as const,
        benefit: 'Exfoliation allows better mask penetration',
        valueIncrease: 0.20,
        optimalSequence: ['exfoliation', 'hydrating-mask']
      },
      {
        services: ['facial-massage', 'moisturizing-treatment'],
        synergyType: 'enhancing' as const,
        benefit: 'Massage improves product absorption and circulation',
        valueIncrease: 0.15,
        optimalSequence: ['facial-massage', 'moisturizing-treatment']
      }
    ],
    conflicts: [
      {
        services: ['chemical-peel', 'microdermabrasion'],
        type: 'conflict' as const,
        severity: 'high' as const,
        description: 'Both are intensive exfoliation treatments',
        affectedItems: ['chemical-peel', 'microdermabrasion'],
        resolution: 'Choose one exfoliation method based on skin sensitivity'
      },
      {
        services: ['retinol-treatment', 'glycolic-acid-treatment'],
        type: 'warning' as const,
        severity: 'medium' as const,
        description: 'Combining active ingredients may cause irritation',
        affectedItems: ['retinol-treatment', 'glycolic-acid-treatment'],
        resolution: 'Use on alternating days or reduce concentration'
      }
    ]
  }
};

/**
 * Product compatibility rules
 * 
 * SCOPE: Defines which products complement services and each other
 * MAINTENANCE: Update when new products are added or formulations change
 */
export const PRODUCT_COMPATIBILITY_RULES = {
  // Hair product compatibility
  hairProducts: {
    serviceComplements: {
      'hair-color': ['color-protecting-shampoo', 'color-safe-conditioner', 'color-enhancing-mask'],
      'haircut': ['styling-cream', 'hair-oil', 'texture-spray'],
      'hair-treatment': ['deep-conditioning-mask', 'leave-in-treatment', 'hair-serum'],
      'balayage': ['purple-shampoo', 'color-gloss', 'heat-protectant']
    },
    productSynergies: [
      {
        products: ['shampoo', 'conditioner'],
        benefit: 'Complete cleansing and conditioning system',
        discountPercentage: 0.10
      },
      {
        products: ['hair-mask', 'hair-oil'],
        benefit: 'Deep treatment with sealing oil for maximum hydration',
        discountPercentage: 0.15
      }
    ]
  },

  // Makeup product compatibility
  makeupProducts: {
    serviceComplements: {
      'makeup-application': ['setting-spray', 'makeup-remover', 'touch-up-kit'],
      'makeup-lesson': ['beginner-brush-set', 'basic-palette', 'practice-products'],
      'eyebrow-shaping': ['brow-gel', 'brow-pencil', 'brow-powder']
    },
    productSynergies: [
      {
        products: ['foundation', 'concealer', 'setting-powder'],
        benefit: 'Complete base makeup system for flawless coverage',
        discountPercentage: 0.12
      },
      {
        products: ['eyeshadow-palette', 'eyeshadow-brushes'],
        benefit: 'Professional application tools with color selection',
        discountPercentage: 0.08
      }
    ]
  },

  // Skincare product compatibility
  skincareProducts: {
    serviceComplements: {
      'facial-treatment': ['home-care-serum', 'maintenance-moisturizer', 'sunscreen'],
      'chemical-peel': ['gentle-cleanser', 'healing-balm', 'broad-spectrum-spf'],
      'hydrating-facial': ['hyaluronic-serum', 'ceramide-cream', 'overnight-mask']
    },
    productSynergies: [
      {
        products: ['cleanser', 'toner', 'moisturizer'],
        benefit: 'Complete daily skincare routine for optimal results',
        discountPercentage: 0.15
      },
      {
        products: ['vitamin-c-serum', 'sunscreen'],
        benefit: 'Antioxidant protection with UV defense for comprehensive care',
        discountPercentage: 0.10
      }
    ]
  }
};

/**
 * Experience-based bundling rules
 * 
 * SCOPE: Matches bundle complexity to user experience levels
 * MAINTENANCE: Update based on user feedback and success rates
 */
export const EXPERIENCE_BUNDLING_RULES = {
  beginner: {
    maxServices: 2,
    maxProducts: 3,
    preferredServiceTypes: ['basic-haircut', 'simple-facial', 'makeup-lesson'],
    avoidedServiceTypes: ['color-correction', 'advanced-chemical-treatments', 'editorial-makeup'],
    recommendedBundles: [
      {
        name: 'First-Time Hair Experience',
        services: ['consultation', 'basic-haircut', 'styling'],
        products: ['shampoo', 'conditioner'],
        reasoning: 'Gentle introduction to professional hair care'
      },
      {
        name: 'Skincare Starter',
        services: ['skin-analysis', 'basic-facial'],
        products: ['gentle-cleanser', 'moisturizer', 'sunscreen'],
        reasoning: 'Foundation for healthy skincare routine'
      }
    ]
  },

  intermediate: {
    maxServices: 3,
    maxProducts: 5,
    preferredServiceTypes: ['color-touch-up', 'specialized-facial', 'event-makeup'],
    avoidedServiceTypes: ['complex-color-correction', 'medical-grade-treatments'],
    recommendedBundles: [
      {
        name: 'Color Refresh Package',
        services: ['color-consultation', 'color-application', 'styling'],
        products: ['color-safe-shampoo', 'color-mask', 'heat-protectant'],
        reasoning: 'Comprehensive color service with maintenance products'
      },
      {
        name: 'Special Event Ready',
        services: ['makeup-trial', 'makeup-application', 'touch-up-service'],
        products: ['setting-spray', 'lipstick', 'compact-mirror'],
        reasoning: 'Complete preparation for important events'
      }
    ]
  },

  advanced: {
    maxServices: 4,
    maxProducts: 7,
    preferredServiceTypes: ['complex-color', 'advanced-treatments', 'professional-makeup'],
    avoidedServiceTypes: [], // No restrictions for advanced users
    recommendedBundles: [
      {
        name: 'Color Transformation',
        services: ['color-consultation', 'color-correction', 'toning', 'styling'],
        products: ['purple-shampoo', 'color-mask', 'bond-builder', 'styling-cream'],
        reasoning: 'Complete color change with professional maintenance'
      },
      {
        name: 'Advanced Skincare Protocol',
        services: ['skin-analysis', 'chemical-peel', 'led-therapy', 'hydrating-treatment'],
        products: ['gentle-cleanser', 'recovery-serum', 'barrier-cream', 'sunscreen'],
        reasoning: 'Intensive treatment with proper aftercare'
      }
    ]
  },

  expert: {
    maxServices: 6,
    maxProducts: 10,
    preferredServiceTypes: ['avant-garde-color', 'medical-treatments', 'editorial-makeup'],
    avoidedServiceTypes: [], // No restrictions for experts
    recommendedBundles: [
      {
        name: 'Professional Color Artistry',
        services: ['color-consultation', 'bleaching', 'color-application', 'toning', 'cut', 'styling'],
        products: ['bond-protector', 'color-line', 'professional-tools', 'maintenance-kit'],
        reasoning: 'Complete professional-level color transformation'
      },
      {
        name: 'Master Class Experience',
        services: ['technique-consultation', 'advanced-application', 'photography', 'touch-up'],
        products: ['professional-kit', 'specialty-products', 'tools', 'reference-materials'],
        reasoning: 'Educational experience with professional-grade results'
      }
    ]
  }
};

/**
 * Pricing and discount rules
 * 
 * SCOPE: Calculates bundle discounts and pricing optimization
 * MAINTENANCE: Update discount percentages based on business performance
 */
export const PRICING_RULES = {
  // Volume-based discounts
  volumeDiscounts: [
    { minItems: 2, maxItems: 3, discountPercentage: 0.05 },
    { minItems: 4, maxItems: 5, discountPercentage: 0.10 },
    { minItems: 6, maxItems: 8, discountPercentage: 0.15 },
    { minItems: 9, maxItems: Infinity, discountPercentage: 0.20 }
  ],

  // Service-specific bundle discounts
  serviceBundleDiscounts: {
    'hair-color-package': {
      requiredServices: ['color-consultation', 'color-application'],
      discountPercentage: 0.08,
      description: 'Color service bundle discount'
    },
    'complete-makeover': {
      requiredServices: ['haircut', 'hair-color', 'makeup-application'],
      discountPercentage: 0.15,
      description: 'Complete transformation package'
    },
    'skincare-intensive': {
      requiredServices: ['facial-analysis', 'treatment', 'follow-up'],
      discountPercentage: 0.12,
      description: 'Comprehensive skincare program'
    }
  },

  // Product bundle discounts
  productBundleDiscounts: {
    'hair-care-system': {
      requiredProducts: ['shampoo', 'conditioner', 'treatment'],
      discountPercentage: 0.15,
      description: 'Complete hair care routine'
    },
    'makeup-starter-kit': {
      requiredProducts: ['foundation', 'concealer', 'powder', 'mascara'],
      discountPercentage: 0.12,
      description: 'Essential makeup basics'
    },
    'skincare-regimen': {
      requiredProducts: ['cleanser', 'serum', 'moisturizer', 'sunscreen'],
      discountPercentage: 0.18,
      description: 'Daily skincare routine'
    }
  },

  // Experience-based pricing adjustments
  experiencePricingAdjustments: {
    beginner: {
      consultationDiscount: 0.20, // Encourage professional guidance
      productDiscount: 0.10,      // Make products more accessible
      serviceDiscount: 0.05       // Gentle introduction pricing
    },
    intermediate: {
      consultationDiscount: 0.10,
      productDiscount: 0.05,
      serviceDiscount: 0.00
    },
    advanced: {
      consultationDiscount: 0.05,
      productDiscount: 0.00,
      serviceDiscount: 0.00
    },
    expert: {
      consultationDiscount: 0.00,
      productDiscount: 0.00,
      serviceDiscount: 0.00,
      premiumAccess: true // Access to exclusive services/products
    }
  }
};

/**
 * Seasonal factors affecting bundling
 * 
 * SCOPE: Seasonal influences on service and product recommendations
 * MAINTENANCE: Update seasonally and based on regional climate patterns
 */
export const SEASONAL_FACTORS: SeasonalFactor[] = [
  {
    season: 'spring',
    influence: 0.3,
    affectedCategories: ['hair-color', 'skincare-renewal', 'fresh-makeup'],
    reasoning: 'Spring renewal and fresh looks are popular'
  },
  {
    season: 'summer',
    influence: 0.4,
    affectedCategories: ['sun-protection', 'waterproof-makeup', 'hair-protection'],
    reasoning: 'Summer requires protection and long-lasting products'
  },
  {
    season: 'fall',
    influence: 0.2,
    affectedCategories: ['rich-colors', 'hydrating-treatments', 'dramatic-makeup'],
    reasoning: 'Fall trends toward richer, more dramatic looks'
  },
  {
    season: 'winter',
    influence: 0.5,
    affectedCategories: ['hydrating-treatments', 'protective-products', 'party-makeup'],
    reasoning: 'Winter requires extra hydration and holiday glamour'
  },
  {
    season: 'holiday',
    influence: 0.6,
    affectedCategories: ['special-occasion', 'gift-sets', 'premium-services'],
    reasoning: 'Holiday season drives special occasion and gift purchases'
  }
];

/**
 * Business profitability targets
 * 
 * SCOPE: Profitability optimization for different service/product categories
 * MAINTENANCE: Update based on business performance and strategic goals
 */
export const PROFITABILITY_TARGETS: ProfitabilityTarget[] = [
  {
    category: 'hair-services',
    targetMargin: 0.65,
    priority: 8,
    constraints: ['maintain-quality-standards', 'competitive-pricing']
  },
  {
    category: 'makeup-services',
    targetMargin: 0.70,
    priority: 7,
    constraints: ['premium-positioning', 'artist-expertise']
  },
  {
    category: 'skincare-services',
    targetMargin: 0.75,
    priority: 9,
    constraints: ['medical-grade-products', 'specialized-training']
  },
  {
    category: 'hair-products',
    targetMargin: 0.45,
    priority: 6,
    constraints: ['volume-sales', 'brand-partnerships']
  },
  {
    category: 'makeup-products',
    targetMargin: 0.50,
    priority: 7,
    constraints: ['trend-responsiveness', 'quality-brands']
  },
  {
    category: 'skincare-products',
    targetMargin: 0.55,
    priority: 8,
    constraints: ['ingredient-quality', 'efficacy-proven']
  }
];

/**
 * Bundle validation rules
 * 
 * SCOPE: Rules for validating bundle recommendations before presentation
 * MAINTENANCE: Update based on customer feedback and business requirements
 */
export const BUNDLE_VALIDATION_RULES = {
  // Required validations
  required: [
    {
      rule: 'compatibility-check',
      description: 'All items must be compatible with each other',
      severity: 'critical' as const
    },
    {
      rule: 'experience-appropriateness',
      description: 'Bundle complexity must match user experience level',
      severity: 'high' as const
    },
    {
      rule: 'pricing-accuracy',
      description: 'All pricing calculations must be accurate',
      severity: 'critical' as const
    },
    {
      rule: 'inventory-availability',
      description: 'All items must be available for booking/purchase',
      severity: 'high' as const
    }
  ],

  // Recommended validations
  recommended: [
    {
      rule: 'profitability-check',
      description: 'Bundle should meet minimum profitability targets',
      severity: 'medium' as const
    },
    {
      rule: 'customer-satisfaction-prediction',
      description: 'Bundle should have high predicted satisfaction score',
      severity: 'medium' as const
    },
    {
      rule: 'seasonal-appropriateness',
      description: 'Bundle should align with seasonal factors',
      severity: 'low' as const
    }
  ],

  // Quality thresholds
  qualityThresholds: {
    minOverallScore: 0.7,
    minCompatibilityScore: 0.8,
    minExperienceMatch: 0.6,
    minProfitabilityScore: 0.5,
    maxComplexityGap: 1.5
  }
};

/**
 * Emergency fallback rules
 * 
 * SCOPE: Fallback logic when primary bundling rules fail
 * USAGE: Ensures system always provides reasonable recommendations
 */
export const EMERGENCY_FALLBACK_RULES = {
  // Simple compatibility fallbacks
  basicCompatibility: {
    'hair-services': ['hair-products'],
    'makeup-services': ['makeup-products'],
    'skincare-services': ['skincare-products']
  },

  // Conservative pricing fallbacks
  conservativePricing: {
    maxDiscount: 0.10,
    minMargin: 0.40,
    defaultBundleDiscount: 0.05
  },

  // Safe experience matching
  safeExperienceMatching: {
    'beginner': ['basic-services', 'starter-products'],
    'intermediate': ['standard-services', 'quality-products'],
    'advanced': ['premium-services', 'professional-products'],
    'expert': ['all-services', 'all-products']
  }
};

