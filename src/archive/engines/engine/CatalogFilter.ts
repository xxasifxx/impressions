import {
  ConsultationResponse,
  ConsultationSessionState,
  UserProfile
} from '@/data/models/ConsultationTypes';
import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from '@/data/models/UnifiedProduct';
import { RulesEngine, CatalogFilter, MotivationProfile, ExperienceProfile } from './RulesEngine';

export interface FilterResult {
  filteredServices: UnifiedService[];
  filteredProducts: UnifiedProduct[];
  totalCount: number;
  appliedFilters: CatalogFilter[];
  reasoning: string;
  confidence: number;
}

export interface FilterCriteria {
  domains?: string[];
  categories?: string[];
  priceRange?: { min: number; max: number };
  experienceLevel?: string[];
  timeline?: string;
  stylePreferences?: string[];
  excludeCategories?: string[];
  maxResults?: number;
}

export interface CatalogFilterConfig {
  targetSize: { min: number; max: number };
  maxFiltersToApply: number;
  prioritizeByMotivation: boolean;
  includeEducationalServices: boolean;
}

export class CatalogFilter {
  private rulesEngine: RulesEngine;
  private config: CatalogFilterConfig;

  constructor(
    rulesEngine: RulesEngine,
    config: Partial<CatalogFilterConfig> = {}
  ) {
    this.rulesEngine = rulesEngine;
    this.config = {
      targetSize: { min: 8, max: 20 },
      maxFiltersToApply: 5,
      prioritizeByMotivation: true,
      includeEducationalServices: true,
      ...config
    };
  }

  /**
   * Filter the complete catalog based on consultation responses
   */
  filterCatalog(
    sessionState: ConsultationSessionState,
    availableServices: UnifiedService[],
    availableProducts: UnifiedProduct[]
  ): FilterResult {
    const motivation = this.rulesEngine.detectMotivation(sessionState.responses);
    const experience = this.rulesEngine.detectExperience(sessionState.responses);
    
    // Generate filter criteria based on responses
    const criteria = this.generateFilterCriteria(sessionState.responses, motivation, experience);
    
    // Apply filters progressively until we reach target size
    const result = this.applyProgressiveFiltering(
      availableServices,
      availableProducts,
      criteria,
      motivation,
      experience
    );

    return result;
  }

  /**
   * Check if current catalog size is within target range
   */
  isTargetSizeReached(currentSize: number): boolean {
    return currentSize >= this.config.targetSize.min && 
           currentSize <= this.config.targetSize.max;
  }

  /**
   * Get filter suggestions for further refinement
   */
  suggestAdditionalFilters(
    currentResult: FilterResult,
    sessionState: ConsultationSessionState
  ): CatalogFilter[] {
    const suggestions: CatalogFilter[] = [];

    // If catalog is too large, suggest more specific filters
    if (currentResult.totalCount > this.config.targetSize.max) {
      // Suggest style-based filtering
      suggestions.push({
        type: 'category',
        value: ['natural', 'professional', 'glamorous'],
        operator: 'contains',
        reasoning: 'Narrow down by style preference to find your perfect match'
      });

      // Suggest experience-level filtering
      suggestions.push({
        type: 'experience_level',
        value: ['beginner', 'intermediate', 'advanced'],
        operator: 'contains',
        reasoning: 'Filter by complexity level that matches your comfort zone'
      });

      // Suggest price range filtering
      suggestions.push({
        type: 'price_range',
        value: { min: 0, max: 200 },
        operator: 'range',
        reasoning: 'Focus on services within your preferred price range'
      });
    }

    return suggestions;
  }

  /**
   * Apply a specific filter to the catalog
   */
  applyFilter(
    services: UnifiedService[],
    products: UnifiedProduct[],
    filter: CatalogFilter
  ): { services: UnifiedService[]; products: UnifiedProduct[] } {
    const filteredServices = this.filterServices(services, filter);
    const filteredProducts = this.filterProducts(products, filter);

    return {
      services: filteredServices,
      products: filteredProducts
    };
  }

  // Private helper methods

  private generateFilterCriteria(
    responses: ConsultationResponse[],
    motivation: MotivationProfile,
    experience: ExperienceProfile
  ): FilterCriteria {
    const criteria: FilterCriteria = {
      maxResults: this.config.targetSize.max
    };

    // Domain filtering based on responses
    const domainResponse = responses.find(r => 
      r.metadata?.category === 'domain' || r.nodeId.includes('domain')
    );
    
    if (domainResponse) {
      const domain = domainResponse.value.toString();
      if (domain !== 'complete' && domain !== 'exploration') {
        criteria.domains = [domain];
      }
    }

    // Style filtering
    const styleResponse = responses.find(r => 
      r.metadata?.category === 'style' || r.nodeId.includes('style')
    );
    
    if (styleResponse) {
      criteria.stylePreferences = [styleResponse.value.toString()];
    }

    // Experience level filtering
    criteria.experienceLevel = [experience.level];

    // Motivation-based category filtering
    if (motivation.primary === 'wedding') {
      criteria.categories = ['bridal', 'wedding', 'special-occasion'];
    } else if (motivation.primary === 'professional') {
      criteria.categories = ['professional', 'business', 'polished'];
    } else if (motivation.primary === 'maintenance') {
      criteria.categories = ['maintenance', 'touch-up', 'regular'];
    }

    // Timeline-based filtering
    if (motivation.timeline === 'immediate') {
      criteria.timeline = 'immediate';
      // Exclude services that take too long
      criteria.excludeCategories = ['complex-color', 'major-transformation'];
    }

    return criteria;
  }

  private applyProgressiveFiltering(
    services: UnifiedService[],
    products: UnifiedProduct[],
    criteria: FilterCriteria,
    motivation: MotivationProfile,
    experience: ExperienceProfile
  ): FilterResult {
    let currentServices = [...services];
    let currentProducts = [...products];
    const appliedFilters: CatalogFilter[] = [];
    const reasoningParts: string[] = [];

    // Step 1: Domain filtering (highest priority)
    if (criteria.domains && criteria.domains.length > 0) {
      const domainFilter: CatalogFilter = {
        type: 'domain',
        value: criteria.domains,
        operator: 'contains',
        reasoning: `Focusing on ${criteria.domains.join(', ')} services based on your interests`
      };

      const filtered = this.applyFilter(currentServices, currentProducts, domainFilter);
      currentServices = filtered.services;
      currentProducts = filtered.products;
      appliedFilters.push(domainFilter);
      reasoningParts.push(domainFilter.reasoning);
    }

    // Step 2: Motivation-based category filtering
    if (criteria.categories && criteria.categories.length > 0) {
      const categoryFilter: CatalogFilter = {
        type: 'category',
        value: criteria.categories,
        operator: 'contains',
        reasoning: `Selecting ${motivation.primary} services for your specific needs`
      };

      const filtered = this.applyFilter(currentServices, currentProducts, categoryFilter);
      currentServices = filtered.services;
      currentProducts = filtered.products;
      appliedFilters.push(categoryFilter);
      reasoningParts.push(categoryFilter.reasoning);
    }

    // Step 3: Experience level filtering
    if (criteria.experienceLevel && criteria.experienceLevel.length > 0) {
      const experienceFilter: CatalogFilter = {
        type: 'experience_level',
        value: criteria.experienceLevel,
        operator: 'contains',
        reasoning: `Matching services to your ${experience.level} experience level`
      };

      const filtered = this.applyFilter(currentServices, currentProducts, experienceFilter);
      currentServices = filtered.services;
      currentProducts = filtered.products;
      appliedFilters.push(experienceFilter);
      reasoningParts.push(experienceFilter.reasoning);
    }

    // Step 4: Style preference filtering (if catalog is still too large)
    const currentTotal = currentServices.length + currentProducts.length;
    if (currentTotal > this.config.targetSize.max && criteria.stylePreferences) {
      const styleFilter: CatalogFilter = {
        type: 'category',
        value: criteria.stylePreferences,
        operator: 'contains',
        reasoning: `Filtering by your ${criteria.stylePreferences.join(', ')} style preference`
      };

      const filtered = this.applyFilter(currentServices, currentProducts, styleFilter);
      currentServices = filtered.services;
      currentProducts = filtered.products;
      appliedFilters.push(styleFilter);
      reasoningParts.push(styleFilter.reasoning);
    }

    // Step 5: Timeline-based exclusions
    if (criteria.excludeCategories && criteria.excludeCategories.length > 0) {
      const exclusionFilter: CatalogFilter = {
        type: 'category',
        value: criteria.excludeCategories,
        operator: 'exclude',
        reasoning: `Excluding time-intensive services due to your ${motivation.timeline} timeline`
      };

      const filtered = this.applyFilter(currentServices, currentProducts, exclusionFilter);
      currentServices = filtered.services;
      currentProducts = filtered.products;
      appliedFilters.push(exclusionFilter);
      reasoningParts.push(exclusionFilter.reasoning);
    }

    // Step 6: Final size adjustment if needed
    const finalTotal = currentServices.length + currentProducts.length;
    if (finalTotal > this.config.targetSize.max) {
      // Prioritize services over products for consultation
      const maxServices = Math.min(currentServices.length, Math.floor(this.config.targetSize.max * 0.7));
      const maxProducts = this.config.targetSize.max - maxServices;

      currentServices = this.prioritizeServices(currentServices, motivation, experience).slice(0, maxServices);
      currentProducts = this.prioritizeProducts(currentProducts, motivation, experience).slice(0, maxProducts);

      reasoningParts.push('Prioritized most relevant services and products for your consultation');
    }

    return {
      filteredServices: currentServices,
      filteredProducts: currentProducts,
      totalCount: currentServices.length + currentProducts.length,
      appliedFilters,
      reasoning: reasoningParts.join('; '),
      confidence: this.calculateFilterConfidence(appliedFilters, motivation, experience)
    };
  }

  private filterServices(services: UnifiedService[], filter: CatalogFilter): UnifiedService[] {
    switch (filter.type) {
      case 'domain':
        return services.filter(service => {
          if (filter.operator === 'contains') {
            return filter.value.some((domain: string) => service.domain === domain);
          }
          return true;
        });

      case 'category':
        return services.filter(service => {
          if (filter.operator === 'contains') {
            return filter.value.some((category: string) => 
              service.category.toLowerCase().includes(category.toLowerCase()) ||
              service.name.toLowerCase().includes(category.toLowerCase())
            );
          } else if (filter.operator === 'exclude') {
            return !filter.value.some((category: string) => 
              service.category.toLowerCase().includes(category.toLowerCase()) ||
              service.name.toLowerCase().includes(category.toLowerCase())
            );
          }
          return true;
        });

      case 'experience_level':
        return services.filter(service => {
          if (filter.operator === 'contains') {
            // This would need to be implemented based on service metadata
            // For now, return all services
            return true;
          }
          return true;
        });

      case 'duration':
        return services.filter(service => {
          if (filter.operator === 'range' && service.duration) {
            return service.duration <= filter.value;
          }
          return true;
        });

      default:
        return services;
    }
  }

  private filterProducts(products: UnifiedProduct[], filter: CatalogFilter): UnifiedProduct[] {
    switch (filter.type) {
      case 'domain':
        return products.filter(product => {
          if (filter.operator === 'contains') {
            return filter.value.some((domain: string) => product.domain === domain);
          }
          return true;
        });

      case 'category':
        return products.filter(product => {
          if (filter.operator === 'contains') {
            return filter.value.some((category: string) => 
              product.category.toLowerCase().includes(category.toLowerCase()) ||
              product.name.toLowerCase().includes(category.toLowerCase())
            );
          } else if (filter.operator === 'exclude') {
            return !filter.value.some((category: string) => 
              product.category.toLowerCase().includes(category.toLowerCase()) ||
              product.name.toLowerCase().includes(category.toLowerCase())
            );
          }
          return true;
        });

      case 'price_range':
        return products.filter(product => {
          if (filter.operator === 'range') {
            const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
            return price >= filter.value.min && price <= filter.value.max;
          }
          return true;
        });

      default:
        return products;
    }
  }

  private prioritizeServices(
    services: UnifiedService[],
    motivation: MotivationProfile,
    experience: ExperienceProfile
  ): UnifiedService[] {
    return services.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Motivation-based scoring
      if (motivation.primary === 'wedding') {
        if (a.category.toLowerCase().includes('bridal')) scoreA += 10;
        if (b.category.toLowerCase().includes('bridal')) scoreB += 10;
      }

      if (motivation.primary === 'professional') {
        if (a.category.toLowerCase().includes('professional')) scoreA += 10;
        if (b.category.toLowerCase().includes('professional')) scoreB += 10;
      }

      // Experience-based scoring
      if (experience.level === 'beginner') {
        if (a.name.toLowerCase().includes('consultation')) scoreA += 5;
        if (b.name.toLowerCase().includes('consultation')) scoreB += 5;
      }

      // Urgency-based scoring
      if (motivation.urgency > 7) {
        if (a.duration && a.duration <= 120) scoreA += 3; // Quick services
        if (b.duration && b.duration <= 120) scoreB += 3;
      }

      return scoreB - scoreA;
    });
  }

  private prioritizeProducts(
    products: UnifiedProduct[],
    motivation: MotivationProfile,
    experience: ExperienceProfile
  ): UnifiedProduct[] {
    return products.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // In-stock products get priority
      if (a.inStock) scoreA += 5;
      if (b.inStock) scoreB += 5;

      // Experience-based scoring
      if (experience.level === 'beginner') {
        if (a.category.toLowerCase().includes('starter')) scoreA += 3;
        if (b.category.toLowerCase().includes('starter')) scoreB += 3;
      }

      return scoreB - scoreA;
    });
  }

  private calculateFilterConfidence(
    appliedFilters: CatalogFilter[],
    motivation: MotivationProfile,
    experience: ExperienceProfile
  ): number {
    let confidence = 0.5; // Base confidence

    // More filters applied = higher confidence in relevance
    confidence += appliedFilters.length * 0.1;

    // Strong motivation signals increase confidence
    if (motivation.urgency > 7) confidence += 0.2;
    if (motivation.primary !== 'general') confidence += 0.15;

    // Clear experience level increases confidence
    if (experience.level !== 'intermediate') confidence += 0.1;

    return Math.min(confidence, 1.0);
  }
}

