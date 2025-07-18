/**
 * Smart Search Engine - Text interpreter for natural consultation input
 * 
 * This engine parses user text input and routes them to appropriate
 * consultation nodes with relevant service suggestions.
 */

import { ConsultationNode } from '../types/ConsultationTypes';

export interface ServiceCategory {
  id: string;
  name: string;
  keywords: string[];
  relatedServices: string[];
  urgencyIndicators: string[];
  emotionalContext: string[];
}

export interface ParsedUserInput {
  originalText: string;
  detectedServices: ServiceCategory[];
  urgencyLevel: 'low' | 'medium' | 'high';
  emotionalContext: string[];
  suggestedRoute: 'quick_service' | 'guided_consultation' | 'specific_services';
  confidence: number;
  routingNodeId: string;
  preFilteredServices: string[];
}

export interface SmartSearchConfig {
  confidenceThreshold: number;
  maxSuggestions: number;
  enableFuzzyMatching: boolean;
}

export class SmartSearchEngine {
  private serviceCategories: Map<string, ServiceCategory>;
  private config: SmartSearchConfig;

  constructor(config: Partial<SmartSearchConfig> = {}) {
    this.config = {
      confidenceThreshold: 0.7,
      maxSuggestions: 6,
      enableFuzzyMatching: true,
      ...config
    };
    
    this.serviceCategories = new Map();
    this.initializeServiceCategories();
  }

  /**
   * Parse user text input and determine routing
   */
  parseUserInput(text: string): ParsedUserInput {
    const normalizedText = this.normalizeText(text);
    
    // Detect services mentioned
    const detectedServices = this.detectServices(normalizedText);
    
    // Analyze urgency indicators
    const urgencyLevel = this.analyzeUrgency(normalizedText);
    
    // Detect emotional context
    const emotionalContext = this.detectEmotionalContext(normalizedText);
    
    // Determine routing strategy
    const routingDecision = this.determineRouting(
      detectedServices, 
      urgencyLevel, 
      emotionalContext,
      normalizedText
    );

    return {
      originalText: text,
      detectedServices,
      urgencyLevel,
      emotionalContext,
      suggestedRoute: routingDecision.route,
      confidence: routingDecision.confidence,
      routingNodeId: routingDecision.nodeId,
      preFilteredServices: routingDecision.services
    };
  }

  private initializeServiceCategories(): void {
    // Hair Services
    this.serviceCategories.set('hair', {
      id: 'hair',
      name: 'Hair Services',
      keywords: [
        'hair', 'haircut', 'cut', 'trim', 'style', 'styling', 'blowout', 'blow dry',
        'color', 'highlights', 'lowlights', 'balayage', 'ombre', 'dye', 'tint',
        'perm', 'straightening', 'keratin', 'treatment', 'deep condition',
        'updo', 'braids', 'curls', 'waves', 'bangs', 'layers'
      ],
      relatedServices: ['makeup', 'skincare'],
      urgencyIndicators: ['wedding', 'event', 'date', 'interview', 'tomorrow', 'today'],
      emotionalContext: ['confidence', 'change', 'fresh', 'new look', 'transformation']
    });

    // Makeup Services  
    this.serviceCategories.set('makeup', {
      id: 'makeup',
      name: 'Makeup Services',
      keywords: [
        'makeup', 'make up', 'foundation', 'concealer', 'eyeshadow', 'mascara',
        'lipstick', 'blush', 'contour', 'highlight', 'brows', 'eyebrows',
        'lashes', 'eyelashes', 'application', 'lesson', 'tutorial',
        'bridal makeup', 'evening makeup', 'natural makeup', 'dramatic'
      ],
      relatedServices: ['hair', 'skincare', 'lashes'],
      urgencyIndicators: ['wedding', 'event', 'party', 'date', 'photos', 'tonight'],
      emotionalContext: ['glamorous', 'natural', 'confident', 'special', 'beautiful']
    });

    // Skincare Services
    this.serviceCategories.set('skincare', {
      id: 'skincare',
      name: 'Skincare Services',
      keywords: [
        'facial', 'skin', 'skincare', 'acne', 'breakouts', 'pores', 'blackheads',
        'hydration', 'moisturizing', 'anti-aging', 'wrinkles', 'fine lines',
        'exfoliation', 'peeling', 'microdermabrasion', 'extraction',
        'glow', 'radiant', 'clear skin', 'smooth', 'texture', 'tone'
      ],
      relatedServices: ['makeup', 'lashes'],
      urgencyIndicators: ['event', 'photos', 'wedding', 'vacation'],
      emotionalContext: ['tired', 'dull', 'refreshed', 'rejuvenated', 'healthy', 'glowing']
    });

    // Brow Services
    this.serviceCategories.set('brows', {
      id: 'brows',
      name: 'Brow Services', 
      keywords: [
        'eyebrows', 'brows', 'threading', 'waxing', 'tweezing', 'shaping',
        'tinting', 'lamination', 'microblading', 'brow gel', 'arch',
        'cleanup', 'maintenance', 'touch up'
      ],
      relatedServices: ['makeup', 'lashes'],
      urgencyIndicators: ['overgrown', 'messy', 'event', 'photos'],
      emotionalContext: ['polished', 'clean', 'defined', 'natural', 'bold']
    });

    // Lash Services
    this.serviceCategories.set('lashes', {
      id: 'lashes',
      name: 'Lash Services',
      keywords: [
        'lashes', 'eyelashes', 'extensions', 'lift', 'tint', 'curl',
        'volume', 'length', 'individual', 'strip', 'magnetic',
        'mascara', 'false lashes', 'natural lashes'
      ],
      relatedServices: ['makeup', 'brows'],
      urgencyIndicators: ['event', 'vacation', 'wedding', 'photos'],
      emotionalContext: ['dramatic', 'natural', 'effortless', 'glamorous', 'bold']
    });
  }

  private normalizeText(text: string): string {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private detectServices(text: string): ServiceCategory[] {
    const detected: ServiceCategory[] = [];
    
    for (const [categoryId, category] of this.serviceCategories) {
      const matchCount = category.keywords.filter(keyword => 
        text.includes(keyword)
      ).length;
      
      if (matchCount > 0) {
        detected.push(category);
      }
    }

    // Sort by relevance (number of keyword matches)
    return detected.sort((a, b) => {
      const aMatches = a.keywords.filter(k => text.includes(k)).length;
      const bMatches = b.keywords.filter(k => text.includes(k)).length;
      return bMatches - aMatches;
    });
  }

  private analyzeUrgency(text: string): 'low' | 'medium' | 'high' {
    const highUrgency = ['today', 'tonight', 'tomorrow', 'asap', 'urgent', 'emergency'];
    const mediumUrgency = ['this week', 'soon', 'next week', 'wedding', 'event', 'date', 'interview'];
    
    if (highUrgency.some(word => text.includes(word))) {
      return 'high';
    }
    
    if (mediumUrgency.some(word => text.includes(word))) {
      return 'medium';
    }
    
    return 'low';
  }

  private detectEmotionalContext(text: string): string[] {
    const emotionalKeywords = [
      'tired', 'dull', 'confident', 'beautiful', 'fresh', 'new', 'change',
      'transformation', 'special', 'glamorous', 'natural', 'dramatic',
      'polished', 'professional', 'relaxed', 'pampered', 'rejuvenated'
    ];
    
    return emotionalKeywords.filter(keyword => text.includes(keyword));
  }

  private determineRouting(
    services: ServiceCategory[],
    urgency: 'low' | 'medium' | 'high',
    emotional: string[],
    text: string
  ): { route: 'quick_service' | 'guided_consultation' | 'specific_services', confidence: number, nodeId: string, services: string[] } {
    
    // Specific service requests with clear intent
    if (services.length >= 2 || this.hasSpecificServiceMentions(text)) {
      return {
        route: 'specific_services',
        confidence: 0.9,
        nodeId: 'specific_service_breakdown',
        services: services.map(s => s.id)
      };
    }

    // Single service with urgency = quick path
    if (services.length === 1 && urgency === 'high') {
      return {
        route: 'quick_service',
        confidence: 0.8,
        nodeId: 'quick_service_filter',
        services: services.map(s => s.id)
      };
    }

    // Emotional context or vague requests = guided consultation
    if (emotional.length > 0 || this.hasVagueLanguage(text)) {
      return {
        route: 'guided_consultation',
        confidence: 0.8,
        nodeId: 'guided_current_situation',
        services: services.map(s => s.id)
      };
    }

    // Default to guided consultation for unclear requests
    return {
      route: 'guided_consultation',
      confidence: 0.6,
      nodeId: 'guided_current_situation',
      services: []
    };
  }

  private hasSpecificServiceMentions(text: string): boolean {
    const specificPhrases = [
      'i want', 'i need', 'looking for', 'interested in',
      'haircut and', 'makeup and', 'facial and', 'brows and'
    ];
    
    return specificPhrases.some(phrase => text.includes(phrase));
  }

  private hasVagueLanguage(text: string): boolean {
    const vagueIndicators = [
      'help', 'not sure', 'maybe', 'thinking about', 'considering',
      'advice', 'recommend', 'suggest', 'what should', 'how do'
    ];
    
    return vagueIndicators.some(indicator => text.includes(indicator));
  }

  /**
   * Get suggested services based on detected categories
   */
  getSuggestedServices(detectedServices: ServiceCategory[]): string[] {
    const suggestions = new Set<string>();
    
    detectedServices.forEach(service => {
      // Add the main service
      suggestions.add(service.id);
      
      // Add related services
      service.relatedServices.forEach(related => {
        if (suggestions.size < this.config.maxSuggestions) {
          suggestions.add(related);
        }
      });
    });
    
    return Array.from(suggestions);
  }
}
