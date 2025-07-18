import {
  ConsultationResponse,
  ConsultationSessionState,
  UserProfile,
  RecommendedItem
} from '@/data/models';
import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from '@/data/models/UnifiedProduct';

export interface ConsultationRule {
  id: string;
  name: string;
  description: string;
  condition: (context: RuleContext) => boolean;
  action: (context: RuleContext) => RuleResult;
  priority: number;
  category: 'motivation' | 'filtering' | 'bundling' | 'experience' | 'exit';
}

export interface RuleContext {
  responses: ConsultationResponse[];
  userProfile: UserProfile;
  sessionState: ConsultationSessionState;
  availableServices: UnifiedService[];
  availableProducts: UnifiedProduct[];
  cartContents: (UnifiedService | UnifiedProduct)[];
  sessionDuration: number;
}

export interface RuleResult {
  recommendations: RecommendedItem[];
  nextNodeSuggestion?: string;
  catalogFilters: CatalogFilter[];
  bundleSuggestions: BundleSuggestion[];
  reasoning: string;
  confidence: number;
  userMessage?: string;
}

export interface CatalogFilter {
  type: 'domain' | 'category' | 'price_range' | 'duration' | 'experience_level';
  value: any;
  operator: 'equals' | 'contains' | 'range' | 'exclude';
  reasoning: string;
}

export interface BundleSuggestion {
  primaryItem: string;
  bundleItems: string[];
  reasoning: string;
  discountPercentage?: number;
  priority: number;
}

export interface MotivationProfile {
  primary: string;
  secondary?: string;
  timeline: 'immediate' | 'soon' | 'flexible';
  occasion?: string;
  urgency: number; // 1-10 scale
}

export interface ExperienceProfile {
  level: 'beginner' | 'intermediate' | 'expert';
  frequency: 'first_time' | 'occasional' | 'regular';
  comfort_with_complexity: number; // 1-10 scale
  previous_services: string[];
}

export class RulesEngine {
  private rules: Map<string, ConsultationRule>;
  private motivationDetectors: Map<string, (responses: ConsultationResponse[]) => MotivationProfile>;
  private experienceDetectors: Map<string, (responses: ConsultationResponse[]) => ExperienceProfile>;

  constructor() {
    this.rules = new Map();
    this.motivationDetectors = new Map();
    this.experienceDetectors = new Map();
    
    this.initializeRules();
    this.initializeDetectors();
  }

  /**
   * Analyze user responses and apply relevant rules
   */
  analyzeAndRecommend(context: RuleContext): RuleResult {
    const applicableRules = this.getApplicableRules(context);
    
    // Sort rules by priority
    applicableRules.sort((a, b) => b.priority - a.priority);
    
    // Apply rules and combine results
    const results = applicableRules.map(rule => rule.action(context));
    
    return this.combineResults(results, context);
  }

  /**
   * Detect user motivation from responses
   */
  detectMotivation(responses: ConsultationResponse[]): MotivationProfile {
    // Look for motivation-related responses
    const motivationResponse = responses.find(r => 
      r.metadata?.category === 'motivation' || 
      r.nodeId.includes('motivation') ||
      r.nodeId.includes('occasion')
    );

    if (motivationResponse) {
      const value = motivationResponse.value.toString().toLowerCase();
      
      // Wedding/Bridal motivation
      if (value.includes('wedding') || value.includes('bridal')) {
        return {
          primary: 'wedding',
          timeline: 'soon',
          occasion: 'wedding',
          urgency: 9
        };
      }
      
      // Professional/Work motivation
      if (value.includes('professional') || value.includes('work') || value.includes('interview')) {
        return {
          primary: 'professional',
          timeline: 'soon',
          occasion: 'work',
          urgency: 7
        };
      }
      
      // Special event motivation
      if (value.includes('event') || value.includes('party') || value.includes('date')) {
        return {
          primary: 'special_event',
          timeline: 'soon',
          occasion: 'social',
          urgency: 6
        };
      }
      
      // Self-care/transformation motivation
      if (value.includes('myself') || value.includes('confidence') || value.includes('better')) {
        return {
          primary: 'self_care',
          timeline: 'flexible',
          urgency: 4
        };
      }
      
      // Maintenance motivation
      if (value.includes('maintenance') || value.includes('touch') || value.includes('regular')) {
        return {
          primary: 'maintenance',
          timeline: 'flexible',
          urgency: 3
        };
      }
    }

    // Default motivation
    return {
      primary: 'general',
      timeline: 'flexible',
      urgency: 5
    };
  }

  /**
   * Detect user experience level from responses
   */
  detectExperience(responses: ConsultationResponse[]): ExperienceProfile {
    const experienceResponse = responses.find(r => 
      r.metadata?.category === 'experience' || 
      r.nodeId.includes('experience') ||
      r.nodeId.includes('frequency')
    );

    if (experienceResponse) {
      const value = experienceResponse.value.toString().toLowerCase();
      
      if (value.includes('first') || value.includes('never')) {
        return {
          level: 'beginner',
          frequency: 'first_time',
          comfort_with_complexity: 3,
          previous_services: []
        };
      }
      
      if (value.includes('regularly') || value.includes('often') || value.includes('monthly')) {
        return {
          level: 'expert',
          frequency: 'regular',
          comfort_with_complexity: 8,
          previous_services: ['multiple']
        };
      }
      
      if (value.includes('occasionally') || value.includes('sometimes')) {
        return {
          level: 'intermediate',
          frequency: 'occasional',
          comfort_with_complexity: 6,
          previous_services: ['some']
        };
      }
    }

    return {
      level: 'intermediate',
      frequency: 'occasional',
      comfort_with_complexity: 5,
      previous_services: []
    };
  }

  /**
   * Generate catalog filters based on user profile
   */
  generateCatalogFilters(context: RuleContext): CatalogFilter[] {
    const filters: CatalogFilter[] = [];
    const motivation = this.detectMotivation(context.responses);
    const experience = this.detectExperience(context.responses);

    // Domain filtering based on motivation
    if (motivation.primary === 'wedding') {
      filters.push({
        type: 'category',
        value: ['bridal-makeup', 'bridal-hair', 'wedding-prep'],
        operator: 'contains',
        reasoning: 'Focusing on bridal services for wedding preparation'
      });
    }

    if (motivation.primary === 'professional') {
      filters.push({
        type: 'category',
        value: ['professional-makeup', 'business-hair', 'polished-look'],
        operator: 'contains',
        reasoning: 'Professional services for workplace confidence'
      });
    }

    // Experience level filtering
    if (experience.level === 'beginner') {
      filters.push({
        type: 'experience_level',
        value: ['beginner', 'easy'],
        operator: 'contains',
        reasoning: 'Beginner-friendly services to build confidence'
      });
    }

    if (experience.level === 'expert') {
      filters.push({
        type: 'experience_level',
        value: ['advanced', 'expert', 'complex'],
        operator: 'contains',
        reasoning: 'Advanced services for experienced clients'
      });
    }

    // Timeline-based filtering
    if (motivation.timeline === 'immediate') {
      filters.push({
        type: 'duration',
        value: 120, // 2 hours max
        operator: 'range',
        reasoning: 'Quick services for immediate needs'
      });
    }

    return filters;
  }

  /**
   * Generate bundle suggestions based on context
   */
  generateBundleSuggestions(context: RuleContext): BundleSuggestion[] {
    const suggestions: BundleSuggestion[] = [];
    const motivation = this.detectMotivation(context.responses);
    const cartItems = context.cartContents;

    // Wedding bundle suggestions
    if (motivation.primary === 'wedding') {
      suggestions.push({
        primaryItem: 'bridal-makeup',
        bundleItems: ['bridal-hair', 'makeup-trial', 'touch-up-kit'],
        reasoning: 'Complete bridal package ensures a coordinated, stress-free wedding day look',
        discountPercentage: 15,
        priority: 10
      });
    }

    // Hair color bundle suggestions
    const hasHairColor = cartItems.some(item => 
      item.category?.includes('color') || item.name.toLowerCase().includes('color')
    );
    
    if (hasHairColor) {
      suggestions.push({
        primaryItem: 'hair-color',
        bundleItems: ['color-safe-shampoo', 'color-protecting-conditioner', 'color-maintenance-treatment'],
        reasoning: 'Color-safe products protect your investment and keep your color vibrant longer',
        discountPercentage: 10,
        priority: 8
      });
    }

    // Skincare bundle suggestions
    const hasFacial = cartItems.some(item => 
      item.category?.includes('facial') || item.name.toLowerCase().includes('facial')
    );
    
    if (hasFacial) {
      suggestions.push({
        primaryItem: 'facial-treatment',
        bundleItems: ['daily-cleanser', 'moisturizer', 'sunscreen'],
        reasoning: 'Home care products maintain your facial results and protect your skin investment',
        discountPercentage: 12,
        priority: 7
      });
    }

    return suggestions;
  }

  /**
   * Register a new rule
   */
  registerRule(rule: ConsultationRule): void {
    this.rules.set(rule.id, rule);
  }

  /**
   * Get all rules of a specific category
   */
  getRulesByCategory(category: string): ConsultationRule[] {
    return Array.from(this.rules.values()).filter(rule => rule.category === category);
  }

  // Private helper methods

  private getApplicableRules(context: RuleContext): ConsultationRule[] {
    return Array.from(this.rules.values()).filter(rule => rule.condition(context));
  }

  private combineResults(results: RuleResult[], context: RuleContext): RuleResult {
    const combinedRecommendations: RecommendedItem[] = [];
    const combinedFilters: CatalogFilter[] = [];
    const combinedBundles: BundleSuggestion[] = [];
    const reasoningParts: string[] = [];
    
    let totalConfidence = 0;
    let confidenceCount = 0;

    results.forEach(result => {
      combinedRecommendations.push(...result.recommendations);
      combinedFilters.push(...result.catalogFilters);
      combinedBundles.push(...result.bundleSuggestions);
      reasoningParts.push(result.reasoning);
      
      totalConfidence += result.confidence;
      confidenceCount++;
    });

    // Remove duplicates and sort by confidence
    const uniqueRecommendations = this.deduplicateRecommendations(combinedRecommendations);
    const uniqueFilters = this.deduplicateFilters(combinedFilters);
    const uniqueBundles = this.deduplicateBundles(combinedBundles);

    return {
      recommendations: uniqueRecommendations,
      catalogFilters: uniqueFilters,
      bundleSuggestions: uniqueBundles,
      reasoning: reasoningParts.join('; '),
      confidence: confidenceCount > 0 ? totalConfidence / confidenceCount : 0.5
    };
  }

  private deduplicateRecommendations(recommendations: RecommendedItem[]): RecommendedItem[] {
    const seen = new Set<string>();
    return recommendations.filter(rec => {
      const key = `${rec.type}_${rec.itemId}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    }).sort((a, b) => b.confidence - a.confidence);
  }

  private deduplicateFilters(filters: CatalogFilter[]): CatalogFilter[] {
    const seen = new Set<string>();
    return filters.filter(filter => {
      const key = `${filter.type}_${filter.operator}_${JSON.stringify(filter.value)}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private deduplicateBundles(bundles: BundleSuggestion[]): BundleSuggestion[] {
    const seen = new Set<string>();
    return bundles.filter(bundle => {
      const key = `${bundle.primaryItem}_${bundle.bundleItems.join('_')}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    }).sort((a, b) => b.priority - a.priority);
  }

  private initializeRules(): void {
    // Wedding/Bridal Rules
    this.registerRule({
      id: 'wedding_comprehensive',
      name: 'Wedding Comprehensive Package',
      description: 'Recommend complete bridal package for wedding motivation',
      condition: (context) => {
        const motivation = this.detectMotivation(context.responses);
        return motivation.primary === 'wedding';
      },
      action: (context) => {
        return {
          recommendations: [
            {
              type: 'service',
              itemId: 'bridal-makeup',
              confidence: 0.95,
              reasoning: 'Professional bridal makeup ensures you look perfect in photos and feel confident on your special day'
            },
            {
              type: 'service',
              itemId: 'bridal-hair',
              confidence: 0.9,
              reasoning: 'Coordinated hair styling complements your makeup and dress for a complete bridal look'
            }
          ],
          catalogFilters: [
            {
              type: 'category',
              value: ['bridal', 'wedding'],
              operator: 'contains',
              reasoning: 'Focusing on wedding-specific services'
            }
          ],
          bundleSuggestions: [
            {
              primaryItem: 'bridal-makeup',
              bundleItems: ['bridal-hair', 'makeup-trial'],
              reasoning: 'Complete bridal package with trial ensures perfect wedding day results',
              discountPercentage: 15,
              priority: 10
            }
          ],
          reasoning: 'Wedding clients need comprehensive, coordinated services for their special day',
          confidence: 0.95,
          userMessage: 'Congratulations on your upcoming wedding! Let me help you create the perfect bridal look.'
        };
      },
      priority: 10,
      category: 'motivation'
    });

    // Professional/Work Rules
    this.registerRule({
      id: 'professional_polished',
      name: 'Professional Polished Look',
      description: 'Recommend professional services for work/career motivation',
      condition: (context) => {
        const motivation = this.detectMotivation(context.responses);
        return motivation.primary === 'professional';
      },
      action: (context) => {
        return {
          recommendations: [
            {
              type: 'service',
              itemId: 'professional-makeup',
              confidence: 0.85,
              reasoning: 'Professional makeup enhances your natural features for workplace confidence'
            },
            {
              type: 'service',
              itemId: 'business-hair',
              confidence: 0.8,
              reasoning: 'Polished hairstyle projects competence and professionalism'
            }
          ],
          catalogFilters: [
            {
              type: 'category',
              value: ['professional', 'business', 'polished'],
              operator: 'contains',
              reasoning: 'Professional services for workplace confidence'
            }
          ],
          bundleSuggestions: [],
          reasoning: 'Professional clients need polished, workplace-appropriate services',
          confidence: 0.85
        };
      },
      priority: 8,
      category: 'motivation'
    });

    // Beginner Experience Rules
    this.registerRule({
      id: 'beginner_gentle_intro',
      name: 'Beginner Gentle Introduction',
      description: 'Recommend beginner-friendly services with education',
      condition: (context) => {
        const experience = this.detectExperience(context.responses);
        return experience.level === 'beginner';
      },
      action: (context) => {
        return {
          recommendations: [
            {
              type: 'service',
              itemId: 'consultation-lesson',
              confidence: 0.9,
              reasoning: 'Personal consultation teaches you techniques you can use at home'
            }
          ],
          catalogFilters: [
            {
              type: 'experience_level',
              value: ['beginner', 'gentle', 'educational'],
              operator: 'contains',
              reasoning: 'Beginner-friendly services to build confidence'
            }
          ],
          bundleSuggestions: [],
          reasoning: 'First-time clients benefit from educational, gentle introduction to professional services',
          confidence: 0.9,
          userMessage: 'Since this is new for you, I\'ll recommend services that include education so you feel confident and informed.'
        };
      },
      priority: 7,
      category: 'experience'
    });
  }

  private initializeDetectors(): void {
    // Motivation detectors are implemented in the main methods above
    // This could be expanded for more sophisticated detection patterns
  }
}

