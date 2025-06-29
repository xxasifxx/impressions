/**
 * Catalog Filtering Types - Production System
 * 
 * SCOPE: Type definitions for comprehensive service/product filtering and availability checking.
 * Supports multi-criteria filtering including user eligibility, business constraints, and availability rules.
 * 
 * SUCCESS CRITERIA:
 * - Complete type coverage for all filtering scenarios
 * - Clear interfaces for diagnostic and testing purposes
 * - Extensible design for future filtering logic expansion
 * - Type safety for all filtering operations
 * 
 * CONSTRAINTS:
 * - TypeScript strict mode compliance
 * - No external type dependencies
 * - Backward compatibility with existing service/product types
 * - Performance-optimized type definitions
 * 
 * USAGE:
 * - Import specific types as needed: import { FilterCriteria } from './FilterTypes'
 * - Use FilterInput for engine input validation
 * - Use FilterResult for engine output processing
 * - Use diagnostic types for troubleshooting and testing
 */

import { UnifiedService } from '../data/unifiedServicesData';
import { UnifiedProduct } from './UnifiedProduct';
import { ExperienceLevel } from './ExperienceTypes';

/**
 * Input for catalog filtering
 */
export interface FilterInput {
  catalog: {
    services: UnifiedService[];
    products: UnifiedProduct[];
  };
  filterCriteria: FilterCriteria;
  userContext: UserFilterContext;
  businessContext: BusinessFilterContext;
  sessionContext?: SessionFilterContext;
}

/**
 * Complete filter result
 */
export interface FilterResult {
  filteredCatalog: {
    services: FilteredService[];
    products: FilteredProduct[];
  };
  filterSummary: FilterSummary;
  appliedFilters: AppliedFilter[];
  rejectedItems: RejectedItem[];
  metadata: FilterMetadata;
  diagnostics?: FilterDiagnosticInfo;
}

/**
 * Comprehensive filtering criteria
 */
export interface FilterCriteria {
  // Basic filters
  categories?: string[];
  priceRange?: PriceRange;
  availability?: AvailabilityFilter;
  
  // Experience-based filters
  experienceLevel?: ExperienceLevel;
  complexityRange?: ComplexityRange;
  
  // Service-specific filters
  serviceFilters?: ServiceFilters;
  
  // Product-specific filters
  productFilters?: ProductFilters;
  
  // Business rule filters
  businessRules?: BusinessRuleFilters;
  
  // Custom filters
  customFilters?: CustomFilter[];
}

/**
 * User context for filtering
 */
export interface UserFilterContext {
  experienceLevel: ExperienceLevel;
  preferences?: UserFilterPreferences;
  restrictions?: UserRestrictions;
  history?: UserFilterHistory;
  demographics?: UserDemographics;
}

/**
 * Business context for filtering
 */
export interface BusinessFilterContext {
  operationalHours?: OperationalHours;
  staffAvailability?: StaffAvailability;
  inventoryLevels?: InventoryLevel[];
  promotions?: FilterPromotion[];
  seasonalFactors?: SeasonalFilterFactor[];
  businessRules?: BusinessRule[];
}

/**
 * Session context for filtering
 */
export interface SessionFilterContext {
  currentCart?: {
    services: UnifiedService[];
    products: UnifiedProduct[];
  };
  consultationResponses?: string[];
  timeConstraints?: TimeConstraints;
  budgetConstraints?: BudgetConstraints;
  specialRequests?: string[];
}

/**
 * Filtered service with additional metadata
 */
export interface FilteredService extends UnifiedService {
  filterScore: number; // 0-1 relevance score
  matchReasons: string[];
  warnings?: FilterWarning[];
  recommendations?: string[];
  availability: ServiceAvailability;
  eligibility: UserEligibility;
}

/**
 * Filtered product with additional metadata
 */
export interface FilteredProduct extends UnifiedProduct {
  filterScore: number; // 0-1 relevance score
  matchReasons: string[];
  warnings?: FilterWarning[];
  recommendations?: string[];
  availability: ProductAvailability;
  eligibility: UserEligibility;
}

/**
 * Filter summary statistics
 */
export interface FilterSummary {
  originalCount: {
    services: number;
    products: number;
    total: number;
  };
  filteredCount: {
    services: number;
    products: number;
    total: number;
  };
  rejectedCount: {
    services: number;
    products: number;
    total: number;
  };
  filterEffectiveness: number; // 0-1 how well filters worked
  averageRelevanceScore: number;
  topCategories: string[];
}

/**
 * Applied filter tracking
 */
export interface AppliedFilter {
  filterType: FilterType;
  filterName: string;
  criteria: any;
  itemsAffected: number;
  impact: FilterImpact;
  processingTime: number;
}

/**
 * Rejected item information
 */
export interface RejectedItem {
  itemId: string;
  itemName: string;
  itemType: 'service' | 'product';
  rejectionReasons: RejectionReason[];
  alternativeSuggestions?: string[];
}

/**
 * Filter metadata
 */
export interface FilterMetadata {
  filterTimestamp: Date;
  processingTime: number;
  filtersApplied: number;
  rulesEvaluated: number;
  cacheHits?: number;
  performanceMetrics: FilterPerformanceMetrics;
}

/**
 * Price range filter
 */
export interface PriceRange {
  min?: number;
  max?: number;
  currency: string;
  includePromotions?: boolean;
}

/**
 * Availability filter
 */
export interface AvailabilityFilter {
  dateRange?: DateRange;
  timePreferences?: TimePreference[];
  urgency?: 'low' | 'medium' | 'high';
  flexibilityLevel?: 'strict' | 'moderate' | 'flexible';
}

/**
 * Complexity range filter
 */
export interface ComplexityRange {
  minComplexity: number; // 1-4 scale
  maxComplexity: number; // 1-4 scale
  allowSlightlyAbove?: boolean;
}

/**
 * Service-specific filters
 */
export interface ServiceFilters {
  duration?: DurationFilter;
  serviceTypes?: string[];
  excludeServiceTypes?: string[];
  requiresCertification?: boolean;
  maintenanceLevel?: 'low' | 'medium' | 'high';
  resultDuration?: 'temporary' | 'semi-permanent' | 'permanent';
}

/**
 * Product-specific filters
 */
export interface ProductFilters {
  brands?: string[];
  excludeBrands?: string[];
  ingredients?: IngredientFilter;
  productTypes?: string[];
  excludeProductTypes?: string[];
  certifications?: string[];
  shelfLife?: ShelfLifeFilter;
}

/**
 * Business rule filters
 */
export interface BusinessRuleFilters {
  profitabilityThreshold?: number;
  inventoryThreshold?: number;
  staffRequirements?: StaffRequirement[];
  equipmentRequirements?: string[];
  licenseRequirements?: string[];
  insuranceRequirements?: string[];
}

/**
 * Custom filter definition
 */
export interface CustomFilter {
  name: string;
  type: 'include' | 'exclude' | 'boost' | 'penalize';
  criteria: any;
  weight: number; // 0-1 importance
  description: string;
}

/**
 * User filter preferences
 */
export interface UserFilterPreferences {
  preferredCategories: string[];
  avoidedCategories: string[];
  brandPreferences: string[];
  brandAvoidances: string[];
  pricePreference: 'budget' | 'value' | 'premium' | 'luxury';
  timePreferences: TimePreference[];
  intensityPreference: 'gentle' | 'moderate' | 'intensive';
}

/**
 * User restrictions
 */
export interface UserRestrictions {
  allergies: string[];
  medicalConditions: string[];
  skinSensitivities: string[];
  religiousRestrictions: string[];
  dietaryRestrictions: string[];
  timeRestrictions: TimeRestriction[];
  budgetRestrictions: BudgetRestriction[];
}

/**
 * User filter history
 */
export interface UserFilterHistory {
  previousPurchases: PreviousPurchase[];
  favoriteServices: string[];
  favoriteProducts: string[];
  avoidedItems: string[];
  satisfactionRatings: SatisfactionRating[];
}

/**
 * User demographics for filtering
 */
export interface UserDemographics {
  ageRange?: string;
  skinType?: string;
  hairType?: string;
  lifestyle?: string;
  occupation?: string;
  location?: string;
}

/**
 * Service availability information
 */
export interface ServiceAvailability {
  available: boolean;
  nextAvailable?: Date;
  waitingList?: boolean;
  alternativeSlots?: Date[];
  staffAvailable: boolean;
  equipmentAvailable: boolean;
  estimatedWaitTime?: number; // minutes
}

/**
 * Product availability information
 */
export interface ProductAvailability {
  inStock: boolean;
  stockLevel: 'low' | 'medium' | 'high';
  nextRestock?: Date;
  alternativeProducts?: string[];
  backorderAvailable: boolean;
  estimatedDelivery?: Date;
}

/**
 * User eligibility for item
 */
export interface UserEligibility {
  eligible: boolean;
  eligibilityScore: number; // 0-1 how suitable
  requirements: EligibilityRequirement[];
  restrictions: EligibilityRestriction[];
  recommendations: string[];
}

/**
 * Filter warning
 */
export interface FilterWarning {
  type: 'compatibility' | 'experience' | 'availability' | 'cost' | 'time';
  severity: 'low' | 'medium' | 'high';
  message: string;
  recommendation?: string;
}

/**
 * Filter types
 */
export type FilterType = 
  | 'category'
  | 'price'
  | 'availability'
  | 'experience'
  | 'complexity'
  | 'service-specific'
  | 'product-specific'
  | 'business-rule'
  | 'user-preference'
  | 'custom';

/**
 * Filter impact assessment
 */
export interface FilterImpact {
  reductionPercentage: number;
  qualityImprovement: number; // 0-1 how much relevance improved
  performanceImpact: number; // milliseconds added
  userSatisfactionImpact: number; // predicted impact on satisfaction
}

/**
 * Rejection reasons
 */
export interface RejectionReason {
  category: 'availability' | 'eligibility' | 'business-rule' | 'preference' | 'restriction';
  reason: string;
  severity: 'blocking' | 'warning' | 'preference';
  canOverride: boolean;
  overrideRequirements?: string[];
}

/**
 * Date range
 */
export interface DateRange {
  startDate: Date;
  endDate: Date;
  excludeDates?: Date[];
}

/**
 * Time preference
 */
export interface TimePreference {
  dayOfWeek?: number; // 0-6, Sunday = 0
  timeSlot: {
    start: string; // HH:MM format
    end: string;   // HH:MM format
  };
  preference: 'preferred' | 'acceptable' | 'avoid';
}

/**
 * Duration filter
 */
export interface DurationFilter {
  minDuration?: number; // minutes
  maxDuration?: number; // minutes
  preferredDuration?: number; // minutes
  flexibility: 'strict' | 'moderate' | 'flexible';
}

/**
 * Ingredient filter
 */
export interface IngredientFilter {
  requiredIngredients?: string[];
  avoidedIngredients?: string[];
  preferredIngredients?: string[];
  naturalOnly?: boolean;
  organicOnly?: boolean;
  veganOnly?: boolean;
  crueltyfreeOnly?: boolean;
}

/**
 * Shelf life filter
 */
export interface ShelfLifeFilter {
  minShelfLife?: number; // days
  preferFresh?: boolean;
  allowNearExpiry?: boolean;
}

/**
 * Staff requirement
 */
export interface StaffRequirement {
  role: string;
  certificationLevel: string;
  experienceYears: number;
  specializations: string[];
}

/**
 * Operational hours
 */
export interface OperationalHours {
  [dayOfWeek: number]: {
    open: string; // HH:MM
    close: string; // HH:MM
    breaks?: { start: string; end: string }[];
  };
}

/**
 * Staff availability
 */
export interface StaffAvailability {
  staffId: string;
  name: string;
  role: string;
  availableSlots: Date[];
  specializations: string[];
  bookingBuffer: number; // minutes between appointments
}

/**
 * Inventory level
 */
export interface InventoryLevel {
  itemId: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderPoint: number;
  nextDelivery?: Date;
}

/**
 * Filter promotion
 */
export interface FilterPromotion {
  id: string;
  name: string;
  applicableItems: string[];
  discountType: 'percentage' | 'fixed' | 'bogo';
  discountValue: number;
  validUntil: Date;
  conditions: PromotionCondition[];
}

/**
 * Seasonal filter factor
 */
export interface SeasonalFilterFactor {
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'holiday';
  influence: number; // -1 to 1
  affectedCategories: string[];
  startDate: Date;
  endDate: Date;
}

/**
 * Business rule
 */
export interface BusinessRule {
  id: string;
  name: string;
  type: 'inclusion' | 'exclusion' | 'modification' | 'warning';
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number; // 1-10
  active: boolean;
}

/**
 * Time constraints
 */
export interface TimeConstraints {
  maxDuration: number; // minutes
  preferredStartTime?: string; // HH:MM
  mustFinishBy?: string; // HH:MM
  breakRequirements?: BreakRequirement[];
}

/**
 * Budget constraints
 */
export interface BudgetConstraints {
  maxTotal: number;
  preferredTotal: number;
  flexibility: number; // 0-1
  paymentMethod?: string;
}

/**
 * Time restriction
 */
export interface TimeRestriction {
  type: 'unavailable' | 'preferred' | 'avoid';
  dayOfWeek?: number;
  timeSlot?: { start: string; end: string };
  dateRange?: DateRange;
  reason: string;
}

/**
 * Budget restriction
 */
export interface BudgetRestriction {
  type: 'hard-limit' | 'soft-limit' | 'preference';
  amount: number;
  category?: string;
  reason: string;
}

/**
 * Previous purchase
 */
export interface PreviousPurchase {
  itemId: string;
  itemType: 'service' | 'product';
  purchaseDate: Date;
  satisfaction: number; // 1-5
  wouldRepurchase: boolean;
  notes?: string;
}

/**
 * Satisfaction rating
 */
export interface SatisfactionRating {
  itemId: string;
  rating: number; // 1-5
  date: Date;
  feedback?: string;
}

/**
 * Eligibility requirement
 */
export interface EligibilityRequirement {
  type: 'age' | 'experience' | 'health' | 'certification' | 'equipment';
  description: string;
  met: boolean;
  howToMeet?: string;
}

/**
 * Eligibility restriction
 */
export interface EligibilityRestriction {
  type: 'medical' | 'age' | 'experience' | 'legal' | 'safety';
  description: string;
  severity: 'blocking' | 'warning' | 'advisory';
  workaround?: string;
}

/**
 * Promotion condition
 */
export interface PromotionCondition {
  type: 'minimum-purchase' | 'category-requirement' | 'date-range' | 'user-type';
  value: any;
  description: string;
}

/**
 * Rule condition
 */
export interface RuleCondition {
  field: string;
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains' | 'not-contains';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

/**
 * Rule action
 */
export interface RuleAction {
  type: 'include' | 'exclude' | 'modify' | 'warn' | 'boost' | 'penalize';
  target: string;
  value?: any;
  message?: string;
}

/**
 * Break requirement
 */
export interface BreakRequirement {
  afterMinutes: number;
  breakDuration: number;
  type: 'mandatory' | 'recommended';
}

/**
 * Filter performance metrics
 */
export interface FilterPerformanceMetrics {
  totalFilterTime: number;
  categoryFilterTime: number;
  priceFilterTime: number;
  availabilityFilterTime: number;
  businessRuleFilterTime: number;
  scoringTime: number;
  memoryUsage?: number;
}

/**
 * Configuration for catalog filtering engine
 */
export interface FilterConfig {
  maxResults: number;
  minRelevanceScore: number;
  enableCaching: boolean;
  enablePerformanceMonitoring: boolean;
  enableBusinessRules: boolean;
  enableSeasonalFactors: boolean;
  debugMode: boolean;
  weights: FilterWeights;
  thresholds: FilterThresholds;
}

/**
 * Weighting factors for filter scoring
 */
export interface FilterWeights {
  relevance: number;
  availability: number;
  userPreference: number;
  businessValue: number;
  experienceMatch: number;
  priceAppeal: number;
}

/**
 * Threshold values for filter decisions
 */
export interface FilterThresholds {
  minRelevanceScore: number;
  maxPriceDeviation: number;
  minAvailabilityScore: number;
  maxComplexityGap: number;
  minBusinessValue: number;
}

/**
 * Diagnostic information for troubleshooting
 */
export interface FilterDiagnosticInfo {
  input: {
    catalogSize: { services: number; products: number };
    filterCriteriaCount: number;
    userContextComplete: boolean;
    businessContextComplete: boolean;
  };
  processing: {
    filtersApplied: string[];
    rulesEvaluated: string[];
    cacheUtilization: number;
    performanceMetrics: FilterPerformanceMetrics;
  };
  scoring: {
    averageRelevanceScore: number;
    scoreDistribution: { [range: string]: number };
    topScoringItems: string[];
    rejectionReasons: { [reason: string]: number };
  };
  results: {
    originalCount: number;
    filteredCount: number;
    rejectedCount: number;
    filterEffectiveness: number;
  };
  validation: {
    passedValidation: boolean;
    validationErrors: string[];
    warningMessages: string[];
  };
}

/**
 * Filter validation result
 */
export interface FilterValidationResult {
  isValid: boolean;
  errors: FilterValidationError[];
  warnings: FilterValidationWarning[];
  score: number;
}

/**
 * Filter validation error
 */
export interface FilterValidationError {
  type: 'criteria' | 'context' | 'business-rule' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  field?: string;
  resolution?: string;
}

/**
 * Filter validation warning
 */
export interface FilterValidationWarning {
  type: 'performance' | 'relevance' | 'availability' | 'recommendation';
  message: string;
  impact: string;
  suggestion?: string;
}

/**
 * Filter modification tracking
 */
export interface FilterModification {
  type: 'add' | 'remove' | 'modify' | 'override';
  filterType: FilterType;
  description: string;
  impact: FilterImpact;
  timestamp: Date;
  reason: string;
}

/**
 * A/B testing support for filters
 */
export interface FilterTestVariant {
  variantId: string;
  name: string;
  description: string;
  configOverrides: Partial<FilterConfig>;
  targetAudience?: string[];
  expectedImpact: string;
}

/**
 * Filter performance tracking
 */
export interface FilterPerformanceTracking {
  sessionId: string;
  filterCriteria: FilterCriteria;
  resultsShown: number;
  itemsClicked: number;
  itemsAddedToCart: number;
  itemsPurchased: number;
  userSatisfaction?: number;
  timestamp: Date;
}

