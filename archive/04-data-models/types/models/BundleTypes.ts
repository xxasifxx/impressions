/**
 * Bundle Recommendation Types - Production System
 * 
 * SCOPE: Type definitions for intelligent service/product bundling recommendations.
 * Supports multi-factor analysis including user experience, service compatibility, and business rules.
 * 
 * SUCCESS CRITERIA:
 * - Complete type coverage for all bundling scenarios
 * - Clear interfaces for diagnostic and testing purposes
 * - Extensible design for future bundling logic expansion
 * - Type safety for all bundling operations
 * 
 * CONSTRAINTS:
 * - TypeScript strict mode compliance
 * - No external type dependencies
 * - Backward compatibility with existing cart types
 * - Performance-optimized type definitions
 * 
 * USAGE:
 * - Import specific types as needed: import { BundleRecommendation } from './BundleTypes'
 * - Use BundleAnalysisInput for engine input validation
 * - Use BundleAnalysisResult for engine output processing
 * - Use diagnostic types for troubleshooting and testing
 */

import { UnifiedService } from '../data/unifiedServicesData';
import { UnifiedProduct } from './UnifiedProduct';
import { ExperienceLevel } from './ExperienceTypes';

/**
 * Core bundle recommendation result
 */
export interface BundleRecommendation {
  id: string;
  name: string;
  description: string;
  services: UnifiedService[];
  products: UnifiedProduct[];
  totalPrice: number;
  originalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  confidence: ConfidenceLevel;
  reasoning: string[];
  tags: BundleTag[];
  priority: number; // Higher = more important recommendation
  estimatedDuration?: number; // Total service time in minutes
  compatibility: CompatibilityScore;
}

/**
 * Input for bundle analysis
 */
export interface BundleAnalysisInput {
  currentCart: {
    services: UnifiedService[];
    products: UnifiedProduct[];
  };
  userProfile: {
    experienceLevel: ExperienceLevel;
    preferences?: UserPreferences;
    previousPurchases?: PurchaseHistory[];
    budget?: BudgetConstraints;
  };
  sessionContext: {
    serviceCategory?: string;
    consultationResponses?: string[];
    timeConstraints?: TimeConstraints;
    specialRequests?: string[];
  };
  businessContext: {
    availableInventory?: InventoryStatus[];
    currentPromotions?: Promotion[];
    seasonalFactors?: SeasonalFactor[];
    profitabilityTargets?: ProfitabilityTarget[];
  };
}

/**
 * Complete bundle analysis result
 */
export interface BundleAnalysisResult {
  recommendations: BundleRecommendation[];
  analysis: {
    compatibilityAnalysis: CompatibilityAnalysis;
    pricingAnalysis: PricingAnalysis;
    experienceAnalysis: ExperienceMatchAnalysis;
    businessAnalysis: BusinessRuleAnalysis;
  };
  metadata: {
    analysisTimestamp: Date;
    processingTime: number;
    confidence: ConfidenceLevel;
    recommendationCount: number;
    fallbacksUsed: string[];
  };
  diagnostics?: BundleDiagnosticInfo;
}

/**
 * Confidence levels for recommendations
 */
export type ConfidenceLevel = 'low' | 'medium' | 'high' | 'very-high';

/**
 * Bundle categorization tags
 */
export type BundleTag = 
  | 'value-focused'
  | 'premium-experience'
  | 'time-efficient'
  | 'comprehensive-care'
  | 'beginner-friendly'
  | 'expert-level'
  | 'seasonal-special'
  | 'maintenance-routine'
  | 'special-occasion'
  | 'corrective-treatment';

/**
 * Service/product compatibility scoring
 */
export interface CompatibilityScore {
  overall: number; // 0-1 scale
  serviceCompatibility: number;
  productCompatibility: number;
  timingCompatibility: number;
  experienceCompatibility: number;
  issues: CompatibilityIssue[];
}

/**
 * Compatibility issues that affect bundling
 */
export interface CompatibilityIssue {
  type: 'conflict' | 'warning' | 'optimization';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedItems: string[];
  resolution?: string;
}

/**
 * User preferences for bundling
 */
export interface UserPreferences {
  budgetRange?: {
    min: number;
    max: number;
    preferred: number;
  };
  timePreferences?: {
    maxDuration: number;
    preferredDuration: number;
    flexibilityLevel: 'strict' | 'moderate' | 'flexible';
  };
  servicePreferences?: {
    preferredCategories: string[];
    avoidedCategories: string[];
    intensityPreference: 'gentle' | 'moderate' | 'intensive';
  };
  productPreferences?: {
    brandPreferences: string[];
    ingredientAvoidance: string[];
    priceRange: 'budget' | 'mid-range' | 'premium' | 'luxury';
  };
}

/**
 * Purchase history for personalization
 */
export interface PurchaseHistory {
  date: Date;
  services: UnifiedService[];
  products: UnifiedProduct[];
  totalAmount: number;
  satisfaction?: number; // 1-5 scale
  feedback?: string;
  repeatPurchase: boolean;
}

/**
 * Budget constraints
 */
export interface BudgetConstraints {
  maxTotal: number;
  preferredTotal: number;
  flexibility: number; // 0-1 scale, how much over preferred is acceptable
  paymentMethod?: 'cash' | 'card' | 'financing' | 'gift-card';
  splitPayment?: boolean;
}

/**
 * Time constraints for services
 */
export interface TimeConstraints {
  maxDuration: number; // minutes
  preferredDuration: number; // minutes
  appointmentType: 'single-session' | 'multi-session' | 'flexible';
  urgency: 'low' | 'medium' | 'high';
  schedulingFlexibility: 'strict' | 'moderate' | 'flexible';
}

/**
 * Inventory status for availability checking
 */
export interface InventoryStatus {
  itemId: string;
  itemType: 'service' | 'product';
  available: boolean;
  quantity?: number;
  nextAvailable?: Date;
  alternatives?: string[];
}

/**
 * Promotional offers
 */
export interface Promotion {
  id: string;
  name: string;
  type: 'percentage' | 'fixed-amount' | 'buy-one-get-one' | 'bundle-discount';
  value: number;
  applicableItems: string[];
  minimumPurchase?: number;
  validUntil: Date;
  stackable: boolean;
  conditions?: PromotionCondition[];
}

/**
 * Promotion conditions
 */
export interface PromotionCondition {
  type: 'minimum-items' | 'category-requirement' | 'experience-level' | 'first-time-customer';
  value: any;
  description: string;
}

/**
 * Seasonal factors affecting recommendations
 */
export interface SeasonalFactor {
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'holiday';
  influence: number; // -1 to 1, negative discourages, positive encourages
  affectedCategories: string[];
  reasoning: string;
}

/**
 * Profitability targets for business optimization
 */
export interface ProfitabilityTarget {
  category: string;
  targetMargin: number; // percentage
  priority: number; // 1-10 scale
  constraints?: string[];
}

/**
 * Detailed compatibility analysis
 */
export interface CompatibilityAnalysis {
  serviceCompatibility: {
    score: number;
    conflicts: CompatibilityIssue[];
    synergies: ServiceSynergy[];
    recommendations: string[];
  };
  productCompatibility: {
    score: number;
    conflicts: CompatibilityIssue[];
    complementaryProducts: UnifiedProduct[];
    recommendations: string[];
  };
  timingAnalysis: {
    totalDuration: number;
    optimalSequence: string[];
    timeConflicts: CompatibilityIssue[];
    recommendations: string[];
  };
  experienceMatch: {
    score: number;
    appropriatenessLevel: ExperienceLevel;
    concerns: string[];
    recommendations: string[];
  };
}

/**
 * Service synergies that enhance bundling value
 */
export interface ServiceSynergy {
  services: string[];
  synergyType: 'complementary' | 'sequential' | 'enhancing' | 'cost-effective';
  benefit: string;
  valueIncrease: number; // percentage
}

/**
 * Pricing analysis for bundle recommendations
 */
export interface PricingAnalysis {
  originalTotal: number;
  bundleTotal: number;
  totalSavings: number;
  savingsPercentage: number;
  priceBreakdown: PriceBreakdownItem[];
  discountSources: DiscountSource[];
  competitiveAnalysis?: CompetitiveAnalysis;
  valueProposition: string;
}

/**
 * Individual price breakdown items
 */
export interface PriceBreakdownItem {
  itemId: string;
  itemName: string;
  itemType: 'service' | 'product';
  originalPrice: number;
  bundlePrice: number;
  discount: number;
  discountReason: string;
}

/**
 * Sources of discounts in bundle
 */
export interface DiscountSource {
  type: 'volume-discount' | 'bundle-synergy' | 'promotion' | 'loyalty' | 'seasonal';
  amount: number;
  percentage: number;
  description: string;
  applicableItems: string[];
}

/**
 * Competitive pricing analysis
 */
export interface CompetitiveAnalysis {
  marketPosition: 'below-market' | 'at-market' | 'above-market' | 'premium';
  competitorComparison: number; // percentage difference from average competitor
  valueScore: number; // 0-10 scale
  differentiators: string[];
}

/**
 * Experience level matching analysis
 */
export interface ExperienceMatchAnalysis {
  userExperienceLevel: ExperienceLevel;
  bundleComplexity: 'simple' | 'moderate' | 'complex' | 'expert';
  matchScore: number; // 0-1 scale
  concerns: ExperienceConcern[];
  adaptations: ExperienceAdaptation[];
  recommendations: string[];
}

/**
 * Experience-related concerns
 */
export interface ExperienceConcern {
  type: 'too-complex' | 'too-simple' | 'time-intensive' | 'skill-required' | 'maintenance-heavy';
  severity: 'low' | 'medium' | 'high';
  description: string;
  mitigation?: string;
}

/**
 * Adaptations for experience level
 */
export interface ExperienceAdaptation {
  type: 'simplification' | 'guidance-increase' | 'product-substitution' | 'service-modification';
  description: string;
  impact: string;
}

/**
 * Business rule analysis
 */
export interface BusinessRuleAnalysis {
  profitabilityScore: number; // 0-1 scale
  inventoryImpact: InventoryImpact;
  promotionalOpportunities: Promotion[];
  seasonalAlignment: number; // -1 to 1 scale
  strategicValue: number; // 0-1 scale
  riskFactors: BusinessRisk[];
  recommendations: string[];
}

/**
 * Inventory impact assessment
 */
export interface InventoryImpact {
  availabilityScore: number; // 0-1 scale
  stockLevels: InventoryStatus[];
  alternatives: AlternativeOption[];
  restockTimeline?: Date;
}

/**
 * Alternative options for unavailable items
 */
export interface AlternativeOption {
  originalItemId: string;
  alternativeItemId: string;
  alternativeType: 'substitute' | 'upgrade' | 'downgrade' | 'equivalent';
  priceDifference: number;
  qualityDifference: number; // -1 to 1 scale
  availabilityDate?: Date;
}

/**
 * Business risks in bundle recommendations
 */
export interface BusinessRisk {
  type: 'low-margin' | 'inventory-shortage' | 'customer-dissatisfaction' | 'operational-complexity';
  probability: number; // 0-1 scale
  impact: number; // 0-1 scale
  description: string;
  mitigation?: string;
}

/**
 * Configuration for bundle analysis engine
 */
export interface BundleAnalysisConfig {
  maxRecommendations: number;
  minConfidenceThreshold: number;
  enableProfitabilityOptimization: boolean;
  enableSeasonalFactors: boolean;
  enableInventoryChecking: boolean;
  enableCompetitiveAnalysis: boolean;
  debugMode: boolean;
  weights: BundleWeights;
  thresholds: BundleThresholds;
}

/**
 * Weighting factors for bundle scoring
 */
export interface BundleWeights {
  compatibility: number;
  pricing: number;
  experienceMatch: number;
  businessValue: number;
  customerSatisfaction: number;
  profitability: number;
}

/**
 * Threshold values for bundle decisions
 */
export interface BundleThresholds {
  minCompatibilityScore: number;
  maxPriceIncrease: number;
  minDiscountPercentage: number;
  maxComplexityGap: number;
  minProfitabilityScore: number;
}

/**
 * Diagnostic information for troubleshooting
 */
export interface BundleDiagnosticInfo {
  input: {
    cartItemCount: number;
    userExperienceLevel: ExperienceLevel;
    budgetRange?: string;
    timeConstraints?: string;
  };
  processing: {
    rulesApplied: string[];
    calculationsPerformed: string[];
    fallbacksTriggered: string[];
    performanceMetrics: ProcessingMetrics;
  };
  scoring: {
    compatibilityScores: Record<string, number>;
    pricingScores: Record<string, number>;
    experienceScores: Record<string, number>;
    businessScores: Record<string, number>;
  };
  recommendations: {
    generatedCount: number;
    filteredCount: number;
    finalCount: number;
    rejectionReasons: string[];
  };
  validation: {
    passedValidation: boolean;
    validationErrors: string[];
    warningMessages: string[];
  };
}

/**
 * Performance metrics for optimization
 */
export interface ProcessingMetrics {
  totalProcessingTime: number;
  compatibilityAnalysisTime: number;
  pricingAnalysisTime: number;
  experienceAnalysisTime: number;
  businessAnalysisTime: number;
  recommendationGenerationTime: number;
  memoryUsage?: number;
}

/**
 * Bundle validation result
 */
export interface BundleValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  score: number;
}

/**
 * Validation errors
 */
export interface ValidationError {
  type: 'compatibility' | 'pricing' | 'inventory' | 'business-rule' | 'experience-mismatch';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  affectedItems: string[];
  resolution?: string;
}

/**
 * Validation warnings
 */
export interface ValidationWarning {
  type: 'suboptimal' | 'risk' | 'recommendation' | 'performance';
  message: string;
  impact: string;
  suggestion?: string;
}

/**
 * Bundle modification tracking
 */
export interface BundleModification {
  type: 'add' | 'remove' | 'substitute' | 'upgrade' | 'downgrade';
  itemId: string;
  itemType: 'service' | 'product';
  reason: string;
  priceImpact: number;
  compatibilityImpact: number;
  timestamp: Date;
}

/**
 * Bundle recommendation context for personalization
 */
export interface RecommendationContext {
  source: 'consultation' | 'cart-analysis' | 'upsell' | 'cross-sell' | 'seasonal';
  trigger: string;
  userIntent: 'exploration' | 'specific-need' | 'value-seeking' | 'premium-experience';
  sessionData: {
    pageViews: string[];
    timeSpent: number;
    interactionPattern: string;
  };
}

/**
 * A/B testing support for bundle recommendations
 */
export interface BundleTestVariant {
  variantId: string;
  name: string;
  description: string;
  configOverrides: Partial<BundleAnalysisConfig>;
  targetAudience?: string[];
  expectedImpact: string;
}

/**
 * Bundle performance tracking
 */
export interface BundlePerformanceMetrics {
  recommendationId: string;
  presented: boolean;
  clicked: boolean;
  addedToCart: boolean;
  purchased: boolean;
  customerSatisfaction?: number;
  repeatPurchase?: boolean;
  timestamp: Date;
  userFeedback?: string;
}

