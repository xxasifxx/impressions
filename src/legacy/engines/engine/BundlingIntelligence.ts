import {
  ConsultationResponse,
  ConsultationSessionState,
  RecommendedItem
} from '@/data/models/ConsultationTypes';
import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from '@/data/models/UnifiedProduct';
import { RulesEngine, BundleSuggestion, MotivationProfile, ExperienceProfile } from './RulesEngine';

export interface BundleRecommendation {
  id: string;
  name: string;
  description: string;
  reasoning: string;
  items: BundleItem[];
  totalValue: number;
  bundlePrice: number;
  savings: number;
  savingsPercentage: number;
  confidence: number;
  priority: number;
  category: 'natural' | 'occasion' | 'maintenance' | 'transformation' | 'professional';
  tags: string[];
}

export interface BundleItem {
  type: 'service' | 'product';
  item: UnifiedService | UnifiedProduct;
  isRequired: boolean;
  reasoning: string;
  addedValue: string;
}

export interface BundleContext {
  currentCart: (UnifiedService | UnifiedProduct)[];
  motivation: MotivationProfile;
  experience: ExperienceProfile;
  sessionState: ConsultationSessionState;
  availableServices: UnifiedService[];
  availableProducts: UnifiedProduct[];
}

export interface BundlingRule {
  id: string;
  name: string;
  description: string;
  condition: (context: BundleContext) => boolean;
  generateBundle: (context: BundleContext) => BundleRecommendation | null;
  priority: number;
  category: string;
}

export interface CrossSellOpportunity {
  triggerItem: string;
  recommendedItems: string[];
  reasoning: string;
  confidence: number;
  timing: 'immediate' | 'after_service' | 'follow_up';
}

export class BundlingIntelligence {
  private rulesEngine: RulesEngine;
  private bundlingRules: Map<string, BundlingRule>;
  private crossSellRules: Map<string, CrossSellOpportunity[]>;

  constructor(rulesEngine: RulesEngine) {
    this.rulesEngine = rulesEngine;
    this.bundlingRules = new Map();
    this.crossSellRules = new Map();
    
    this.initializeBundlingRules();
    this.initializeCrossSellRules();
  }

  /**
   * Generate bundle recommendations based on current context
   */
  generateBundleRecommendations(context: BundleContext): BundleRecommendation[] {
    const recommendations: BundleRecommendation[] = [];
    
    // Apply all applicable bundling rules
    for (const rule of this.bundlingRules.values()) {
      if (rule.condition(context)) {
        const bundle = rule.generateBundle(context);
        if (bundle) {
          recommendations.push(bundle);
        }
      }
    }

    // Sort by priority and confidence
    return recommendations
      .sort((a, b) => {
        const priorityDiff = b.priority - a.priority;
        if (priorityDiff !== 0) return priorityDiff;
        return b.confidence - a.confidence;
      })
      .slice(0, 3); // Limit to top 3 recommendations
  }

  /**
   * Analyze cart for bundling opportunities
   */
  analyzeCartForBundles(
    cartItems: (UnifiedService | UnifiedProduct)[],
    sessionState: ConsultationSessionState
  ): BundleRecommendation[] {
    const motivation = this.rulesEngine.detectMotivation(sessionState.responses);
    const experience = this.rulesEngine.detectExperience(sessionState.responses);

    const context: BundleContext = {
      currentCart: cartItems,
      motivation,
      experience,
      sessionState,
      availableServices: [], // Would be injected
      availableProducts: []  // Would be injected
    };

    return this.generateBundleRecommendations(context);
  }

  /**
   * Get cross-sell recommendations for a specific item
   */
  getCrossSellRecommendations(
    itemId: string,
    context: BundleContext
  ): CrossSellOpportunity[] {
    const opportunities = this.crossSellRules.get(itemId) || [];
    
    // Filter opportunities based on context
    return opportunities.filter(opp => this.isOpportunityRelevant(opp, context));
  }

  /**
   * Generate reasoning for why items work well together
   */
  generateBundleReasoning(items: BundleItem[], motivation: MotivationProfile): string {
    const serviceItems = items.filter(item => item.type === 'service');
    const productItems = items.filter(item => item.type === 'product');

    let reasoning = '';

    // Service coordination reasoning
    if (serviceItems.length > 1) {
      if (motivation.primary === 'wedding') {
        reasoning += 'These services are perfectly coordinated for your wedding day, ensuring a cohesive, stunning look that photographs beautifully. ';
      } else if (motivation.primary === 'professional') {
        reasoning += 'This combination creates a polished, professional appearance that projects confidence and competence. ';
      } else {
        reasoning += 'These services complement each other perfectly, creating a complete transformation that enhances your natural beauty. ';
      }
    }

    // Product protection reasoning
    if (productItems.length > 0 && serviceItems.length > 0) {
      const hasColorService = serviceItems.some(item => 
        item.item.name.toLowerCase().includes('color') || 
        item.item.category.toLowerCase().includes('color')
      );

      if (hasColorService) {
        reasoning += 'The included products protect your color investment, keeping it vibrant and beautiful for weeks longer. ';
      } else {
        reasoning += 'These products help maintain your service results and extend the benefits of your professional treatment. ';
      }
    }

    // Value reasoning
    if (items.length > 2) {
      reasoning += 'Bundling these services and products together saves you money while ensuring everything works perfectly together.';
    }

    return reasoning.trim();
  }

  /**
   * Calculate bundle pricing with intelligent discounts
   */
  calculateBundlePricing(items: BundleItem[]): {
    totalValue: number;
    bundlePrice: number;
    savings: number;
    savingsPercentage: number;
  } {
    const totalValue = items.reduce((sum, item) => {
      const price = parseFloat(item.item.price.replace(/[^0-9.]/g, ''));
      return sum + price;
    }, 0);

    // Calculate discount based on bundle size and item types
    let discountPercentage = 0;

    // Base discount for bundling
    if (items.length >= 2) discountPercentage += 5;
    if (items.length >= 3) discountPercentage += 5;
    if (items.length >= 4) discountPercentage += 5;

    // Additional discount for service + product combinations
    const hasServices = items.some(item => item.type === 'service');
    const hasProducts = items.some(item => item.type === 'product');
    
    if (hasServices && hasProducts) {
      discountPercentage += 10; // Encourage product adoption
    }

    // Cap discount at 25%
    discountPercentage = Math.min(discountPercentage, 25);

    const bundlePrice = totalValue * (1 - discountPercentage / 100);
    const savings = totalValue - bundlePrice;

    return {
      totalValue,
      bundlePrice,
      savings,
      savingsPercentage: discountPercentage
    };
  }

  /**
   * Register a new bundling rule
   */
  registerBundlingRule(rule: BundlingRule): void {
    this.bundlingRules.set(rule.id, rule);
  }

  /**
   * Register cross-sell opportunities for an item
   */
  registerCrossSellRule(itemId: string, opportunities: CrossSellOpportunity[]): void {
    this.crossSellRules.set(itemId, opportunities);
  }

  // Private helper methods

  private initializeBundlingRules(): void {
    // Bridal Bundle Rule
    this.registerBundlingRule({
      id: 'bridal_complete_package',
      name: 'Complete Bridal Package',
      description: 'Comprehensive wedding day beauty package',
      condition: (context) => {
        return context.motivation.primary === 'wedding' ||
               context.currentCart.some(item => 
                 item.name.toLowerCase().includes('bridal') ||
                 item.category?.toLowerCase().includes('bridal')
               );
      },
      generateBundle: (context) => {
        const items: BundleItem[] = [];

        // Core bridal services
        const bridalMakeup = context.availableServices.find(s => 
          s.name.toLowerCase().includes('bridal makeup')
        );
        if (bridalMakeup) {
          items.push({
            type: 'service',
            item: bridalMakeup,
            isRequired: true,
            reasoning: 'Professional bridal makeup ensures you look flawless in photos',
            addedValue: 'Photo-ready, long-lasting makeup'
          });
        }

        const bridalHair = context.availableServices.find(s => 
          s.name.toLowerCase().includes('bridal hair')
        );
        if (bridalHair) {
          items.push({
            type: 'service',
            item: bridalHair,
            isRequired: true,
            reasoning: 'Coordinated hair styling complements your makeup and dress',
            addedValue: 'Complete, coordinated bridal look'
          });
        }

        // Trial service
        const makeupTrial = context.availableServices.find(s => 
          s.name.toLowerCase().includes('trial')
        );
        if (makeupTrial) {
          items.push({
            type: 'service',
            item: makeupTrial,
            isRequired: false,
            reasoning: 'Trial ensures perfect results and reduces wedding day stress',
            addedValue: 'Confidence and peace of mind'
          });
        }

        // Touch-up kit
        const touchUpKit = context.availableProducts.find(p => 
          p.name.toLowerCase().includes('touch-up') ||
          p.name.toLowerCase().includes('emergency')
        );
        if (touchUpKit) {
          items.push({
            type: 'product',
            item: touchUpKit,
            isRequired: false,
            reasoning: 'Emergency touch-ups throughout your wedding day',
            addedValue: 'All-day confidence'
          });
        }

        if (items.length < 2) return null;

        const pricing = this.calculateBundlePricing(items);
        const reasoning = this.generateBundleReasoning(items, context.motivation);

        return {
          id: 'bridal_complete',
          name: 'Complete Bridal Experience',
          description: 'Everything you need for your perfect wedding day look',
          reasoning,
          items,
          ...pricing,
          confidence: 0.95,
          priority: 10,
          category: 'occasion',
          tags: ['bridal', 'wedding', 'complete', 'coordination']
        };
      },
      priority: 10,
      category: 'bridal'
    });

    // Color Protection Bundle Rule
    this.registerBundlingRule({
      id: 'color_protection_bundle',
      name: 'Color Protection Package',
      description: 'Protect and maintain your color investment',
      condition: (context) => {
        return context.currentCart.some(item => 
          item.name.toLowerCase().includes('color') ||
          item.category?.toLowerCase().includes('color')
        );
      },
      generateBundle: (context) => {
        const items: BundleItem[] = [];

        // Find the color service in cart
        const colorService = context.currentCart.find(item => 
          item.name.toLowerCase().includes('color')
        );

        if (colorService) {
          items.push({
            type: 'service',
            item: colorService as UnifiedService,
            isRequired: true,
            reasoning: 'Your beautiful new color service',
            addedValue: 'Stunning color transformation'
          });
        }

        // Color-safe shampoo
        const colorShampoo = context.availableProducts.find(p => 
          p.name.toLowerCase().includes('color') && 
          p.name.toLowerCase().includes('shampoo')
        );
        if (colorShampoo) {
          items.push({
            type: 'product',
            item: colorShampoo,
            isRequired: true,
            reasoning: 'Color-safe formula prevents fading and maintains vibrancy',
            addedValue: 'Extends color life by 4-6 weeks'
          });
        }

        // Color-safe conditioner
        const colorConditioner = context.availableProducts.find(p => 
          p.name.toLowerCase().includes('color') && 
          p.name.toLowerCase().includes('conditioner')
        );
        if (colorConditioner) {
          items.push({
            type: 'product',
            item: colorConditioner,
            isRequired: true,
            reasoning: 'Nourishes and protects color-treated hair',
            addedValue: 'Healthy, vibrant hair'
          });
        }

        // Color treatment
        const colorTreatment = context.availableProducts.find(p => 
          p.name.toLowerCase().includes('color') && 
          p.name.toLowerCase().includes('treatment')
        );
        if (colorTreatment) {
          items.push({
            type: 'product',
            item: colorTreatment,
            isRequired: false,
            reasoning: 'Weekly treatment maintains color intensity',
            addedValue: 'Salon-fresh color longer'
          });
        }

        if (items.length < 2) return null;

        const pricing = this.calculateBundlePricing(items);
        const reasoning = 'Since you\'re investing in beautiful color, these products will protect that investment and keep your color looking salon-fresh for weeks longer. Color-treated hair needs special care to prevent fading and maintain health.';

        return {
          id: 'color_protection',
          name: 'Color Protection Package',
          description: 'Keep your color vibrant and healthy',
          reasoning,
          items,
          ...pricing,
          confidence: 0.9,
          priority: 8,
          category: 'maintenance',
          tags: ['color', 'protection', 'maintenance', 'value']
        };
      },
      priority: 8,
      category: 'color_care'
    });

    // Professional Polish Bundle Rule
    this.registerBundlingRule({
      id: 'professional_polish_bundle',
      name: 'Professional Polish Package',
      description: 'Complete professional appearance package',
      condition: (context) => {
        return context.motivation.primary === 'professional' ||
               context.sessionState.responses.some(r => 
                 r.value.toString().toLowerCase().includes('professional') ||
                 r.value.toString().toLowerCase().includes('work')
               );
      },
      generateBundle: (context) => {
        const items: BundleItem[] = [];

        // Professional makeup
        const professionalMakeup = context.availableServices.find(s => 
          s.name.toLowerCase().includes('professional') ||
          s.category?.toLowerCase().includes('professional')
        );
        if (professionalMakeup) {
          items.push({
            type: 'service',
            item: professionalMakeup,
            isRequired: true,
            reasoning: 'Polished makeup that enhances your professional presence',
            addedValue: 'Workplace confidence'
          });
        }

        // Business-appropriate hair
        const businessHair = context.availableServices.find(s => 
          s.name.toLowerCase().includes('business') ||
          s.name.toLowerCase().includes('professional')
        );
        if (businessHair) {
          items.push({
            type: 'service',
            item: businessHair,
            isRequired: false,
            reasoning: 'Sophisticated hairstyle that projects competence',
            addedValue: 'Professional credibility'
          });
        }

        // Consultation/lesson
        const consultation = context.availableServices.find(s => 
          s.name.toLowerCase().includes('consultation') ||
          s.name.toLowerCase().includes('lesson')
        );
        if (consultation && context.experience.level === 'beginner') {
          items.push({
            type: 'service',
            item: consultation,
            isRequired: false,
            reasoning: 'Learn techniques to maintain your professional look daily',
            addedValue: 'Daily confidence and skills'
          });
        }

        if (items.length < 1) return null;

        const pricing = this.calculateBundlePricing(items);
        const reasoning = this.generateBundleReasoning(items, context.motivation);

        return {
          id: 'professional_polish',
          name: 'Professional Polish Package',
          description: 'Everything you need for workplace confidence',
          reasoning,
          items,
          ...pricing,
          confidence: 0.85,
          priority: 7,
          category: 'professional',
          tags: ['professional', 'business', 'confidence', 'polished']
        };
      },
      priority: 7,
      category: 'professional'
    });
  }

  private initializeCrossSellRules(): void {
    // Hair color cross-sells
    this.registerCrossSellRule('hair-color-service', [
      {
        triggerItem: 'hair-color-service',
        recommendedItems: ['color-safe-shampoo', 'color-safe-conditioner', 'color-treatment'],
        reasoning: 'Protect your color investment with professional products',
        confidence: 0.9,
        timing: 'immediate'
      }
    ]);

    // Facial cross-sells
    this.registerCrossSellRule('facial-treatment', [
      {
        triggerItem: 'facial-treatment',
        recommendedItems: ['daily-cleanser', 'moisturizer', 'sunscreen'],
        reasoning: 'Maintain your facial results with proper home care',
        confidence: 0.85,
        timing: 'immediate'
      }
    ]);

    // Makeup service cross-sells
    this.registerCrossSellRule('makeup-application', [
      {
        triggerItem: 'makeup-application',
        recommendedItems: ['makeup-lesson', 'touch-up-kit', 'setting-spray'],
        reasoning: 'Learn to recreate the look and maintain it all day',
        confidence: 0.8,
        timing: 'after_service'
      }
    ]);
  }

  private isOpportunityRelevant(
    opportunity: CrossSellOpportunity,
    context: BundleContext
  ): boolean {
    // Check if user already has recommended items
    const hasRecommendedItem = context.currentCart.some(item => 
      opportunity.recommendedItems.includes(item.id)
    );

    if (hasRecommendedItem) return false;

    // Check if opportunity matches user experience level
    if (context.experience.level === 'beginner' && 
        opportunity.recommendedItems.some(item => item.includes('advanced'))) {
      return false;
    }

    // Check timing relevance
    if (opportunity.timing === 'immediate' && context.currentCart.length === 0) {
      return false;
    }

    return true;
  }
}

