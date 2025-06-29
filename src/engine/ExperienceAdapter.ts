import {
  ConsultationNode,
  ConsultationResponse,
  ConsultationSessionState
} from '@/data/models/ConsultationTypes';
import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from '@/data/models/UnifiedProduct';
import { ExperienceProfile } from './RulesEngine';
import { ExperienceAnalysisEngine } from './ExperienceAnalysisEngine';

export interface AdaptationConfig {
  enableEducationalContent: boolean;
  enableComplexityFiltering: boolean;
  enablePersonalizedMessaging: boolean;
  enableProgressiveDisclosure: boolean;
}

export interface AdaptedContent {
  node: ConsultationNode;
  explanations: string[];
  recommendations: string[];
  warnings: string[];
  educationalTips: string[];
  complexityLevel: 'simple' | 'moderate' | 'complex';
}

export interface ExperienceAdaptation {
  questionStyle: 'simple' | 'detailed' | 'technical';
  explanationLevel: 'minimal' | 'standard' | 'comprehensive';
  serviceComplexity: 'beginner' | 'intermediate' | 'advanced';
  recommendationStyle: 'guided' | 'balanced' | 'autonomous';
  progressionSpeed: 'slow' | 'normal' | 'fast';
}

export interface LearningPath {
  currentLevel: string;
  suggestedProgression: string[];
  educationalServices: string[];
  skillBuildingRecommendations: string[];
  confidenceBuilders: string[];
}

export class ExperienceAdapter {
  private config: AdaptationConfig;
  private experienceProfiles: Map<string, ExperienceProfile>;
  private adaptationRules: Map<string, (profile: ExperienceProfile) => ExperienceAdaptation>;

  constructor(config: Partial<AdaptationConfig> = {}) {
    this.config = {
      enableEducationalContent: true,
      enableComplexityFiltering: true,
      enablePersonalizedMessaging: true,
      enableProgressiveDisclosure: true,
      ...config
    };

    this.experienceProfiles = new Map();
    this.adaptationRules = new Map();
    this.initializeAdaptationRules();
  }

  /**
   * Adapt consultation content based on user experience level
   */
  adaptContent(
    node: ConsultationNode,
    experienceProfile: ExperienceProfile,
    sessionState: ConsultationSessionState
  ): AdaptedContent {
    const adaptation = this.getAdaptationStrategy(experienceProfile);
    const adaptedNode = this.adaptNode(node, adaptation, experienceProfile);
    
    return {
      node: adaptedNode,
      explanations: this.generateExplanations(node, adaptation, experienceProfile),
      recommendations: this.generateRecommendations(node, adaptation, experienceProfile),
      warnings: this.generateWarnings(node, adaptation, experienceProfile),
      educationalTips: this.generateEducationalTips(node, adaptation, experienceProfile),
      complexityLevel: this.determineComplexityLevel(node, experienceProfile)
    };
  }

  /**
   * Filter services based on experience level
   */
  filterServicesByExperience(
    services: UnifiedService[],
    experienceProfile: ExperienceProfile
  ): UnifiedService[] {
    if (!this.config.enableComplexityFiltering) {
      return services;
    }

    return services.filter(service => {
      const serviceComplexity = this.assessServiceComplexity(service);
      return this.isServiceAppropriate(serviceComplexity, experienceProfile);
    });
  }

  /**
   * Filter products based on experience level
   */
  filterProductsByExperience(
    products: UnifiedProduct[],
    experienceProfile: ExperienceProfile
  ): UnifiedProduct[] {
    if (!this.config.enableComplexityFiltering) {
      return products;
    }

    return products.filter(product => {
      const productComplexity = this.assessProductComplexity(product);
      return this.isProductAppropriate(productComplexity, experienceProfile);
    });
  }

  /**
   * Generate learning path for user progression
   */
  generateLearningPath(
    experienceProfile: ExperienceProfile,
    availableServices: UnifiedService[]
  ): LearningPath {
    const currentLevel = experienceProfile.level;
    
    let suggestedProgression: string[] = [];
    let educationalServices: string[] = [];
    let skillBuildingRecommendations: string[] = [];
    let confidenceBuilders: string[] = [];

    switch (currentLevel) {
      case 'beginner':
        suggestedProgression = [
          'Start with consultation/lesson services',
          'Try basic services (cleansing facial, basic makeup)',
          'Learn home care routines',
          'Progress to intermediate services'
        ];
        
        educationalServices = availableServices
          .filter(s => s.name.toLowerCase().includes('consultation') || 
                      s.name.toLowerCase().includes('lesson'))
          .map(s => s.id);
        
        skillBuildingRecommendations = [
          'Book a makeup lesson to learn basic techniques',
          'Start with a gentle facial to understand your skin',
          'Learn proper skincare routine from professionals'
        ];
        
        confidenceBuilders = [
          'Professional consultation builds knowledge',
          'Start simple and build complexity over time',
          'Ask questions - professionals love to educate'
        ];
        break;

      case 'intermediate':
        suggestedProgression = [
          'Explore specialized services in your areas of interest',
          'Try combination services and packages',
          'Learn advanced techniques',
          'Consider regular maintenance schedules'
        ];
        
        educationalServices = availableServices
          .filter(s => s.category?.includes('advanced') || 
                      s.name.toLowerCase().includes('masterclass'))
          .map(s => s.id);
        
        skillBuildingRecommendations = [
          'Try advanced color techniques',
          'Explore specialized facial treatments',
          'Learn professional makeup application'
        ];
        
        confidenceBuilders = [
          'You have good foundation knowledge',
          'Ready for more complex services',
          'Can handle multiple service combinations'
        ];
        break;

      case 'expert':
        suggestedProgression = [
          'Explore cutting-edge techniques and trends',
          'Try luxury and premium services',
          'Consider becoming a brand ambassador',
          'Share knowledge with others'
        ];
        
        educationalServices = availableServices
          .filter(s => s.category?.includes('premium') || 
                      s.category?.includes('luxury'))
          .map(s => s.id);
        
        skillBuildingRecommendations = [
          'Try the latest techniques and trends',
          'Explore premium product lines',
          'Consider advanced certification programs'
        ];
        
        confidenceBuilders = [
          'You have expert-level knowledge',
          'Ready for any service complexity',
          'Can provide valuable feedback to professionals'
        ];
        break;
    }

    return {
      currentLevel,
      suggestedProgression,
      educationalServices,
      skillBuildingRecommendations,
      confidenceBuilders
    };
  }

  /**
   * Adapt messaging tone based on experience level
   */
  adaptMessaging(
    message: string,
    experienceProfile: ExperienceProfile
  ): string {
    if (!this.config.enablePersonalizedMessaging) {
      return message;
    }

    const adaptation = this.getAdaptationStrategy(experienceProfile);

    switch (adaptation.explanationLevel) {
      case 'minimal':
        // Expert users - concise, technical
        return message.replace(/Let me explain[^.]*\./g, '')
                     .replace(/This is because[^.]*\./g, '');

      case 'comprehensive':
        // Beginner users - add explanations
        if (!message.includes('because') && !message.includes('This helps')) {
          return message + ' This helps ensure you get the best results and feel confident with your choice.';
        }
        return message;

      case 'standard':
      default:
        return message;
    }
  }

  /**
   * Determine if user is ready for next complexity level
   */
  assessReadinessForProgression(
    experienceProfile: ExperienceProfile,
    sessionState: ConsultationSessionState
  ): {
    isReady: boolean;
    reasoning: string;
    suggestedNextSteps: string[];
  } {
    const responses = sessionState.responses;
    const confidenceIndicators = this.analyzeConfidenceIndicators(responses);

    let isReady = false;
    let reasoning = '';
    let suggestedNextSteps: string[] = [];

    switch (experienceProfile.level) {
      case 'beginner':
        isReady = confidenceIndicators.showsUnderstanding && 
                 confidenceIndicators.asksGoodQuestions;
        reasoning = isReady 
          ? 'You\'re showing good understanding and asking thoughtful questions - ready for intermediate services'
          : 'Continue building foundation knowledge with educational services';
        suggestedNextSteps = isReady 
          ? ['Try combination services', 'Explore specialized treatments']
          : ['Book consultation services', 'Start with basic treatments'];
        break;

      case 'intermediate':
        isReady = confidenceIndicators.showsExpertise && 
                 confidenceIndicators.comfortableWithComplexity;
        reasoning = isReady 
          ? 'Your responses show expert-level understanding - ready for advanced services'
          : 'Continue exploring intermediate services to build expertise';
        suggestedNextSteps = isReady 
          ? ['Try premium services', 'Explore cutting-edge techniques']
          : ['Master current techniques', 'Try more service combinations'];
        break;

      case 'expert':
        isReady = false; // Already at highest level
        reasoning = 'You\'re already at expert level - focus on latest trends and premium experiences';
        suggestedNextSteps = ['Explore new techniques', 'Try luxury services', 'Share expertise'];
        break;
    }

    return { isReady, reasoning, suggestedNextSteps };
  }

  // Private helper methods

  private initializeAdaptationRules(): void {
    // Beginner adaptation
    this.adaptationRules.set('beginner', (profile) => ({
      questionStyle: 'simple',
      explanationLevel: 'comprehensive',
      serviceComplexity: 'beginner',
      recommendationStyle: 'guided',
      progressionSpeed: 'slow'
    }));

    // Intermediate adaptation
    this.adaptationRules.set('intermediate', (profile) => ({
      questionStyle: 'detailed',
      explanationLevel: 'standard',
      serviceComplexity: 'intermediate',
      recommendationStyle: 'balanced',
      progressionSpeed: 'normal'
    }));

    // Expert adaptation
    this.adaptationRules.set('expert', (profile) => ({
      questionStyle: 'technical',
      explanationLevel: 'minimal',
      serviceComplexity: 'advanced',
      recommendationStyle: 'autonomous',
      progressionSpeed: 'fast'
    }));
  }

  private getAdaptationStrategy(experienceProfile: ExperienceProfile): ExperienceAdaptation {
    const rule = this.adaptationRules.get(experienceProfile.level);
    return rule ? rule(experienceProfile) : {
      questionStyle: 'detailed',
      explanationLevel: 'standard',
      serviceComplexity: 'intermediate',
      recommendationStyle: 'balanced',
      progressionSpeed: 'normal'
    };
  }

  private adaptNode(
    node: ConsultationNode,
    adaptation: ExperienceAdaptation,
    experienceProfile: ExperienceProfile
  ): ConsultationNode {
    const adaptedNode = { ...node };

    // Adapt question style
    if (adaptation.questionStyle === 'simple') {
      adaptedNode.question = this.simplifyQuestion(node.question || '');
    } else if (adaptation.questionStyle === 'technical') {
      adaptedNode.question = this.addTechnicalDetail(node.question || '');
    }

    // Adapt description based on explanation level
    if (adaptation.explanationLevel === 'comprehensive') {
      adaptedNode.description = this.addDetailedExplanation(node.description || '');
    } else if (adaptation.explanationLevel === 'minimal') {
      adaptedNode.description = this.simplifyDescription(node.description || '');
    }

    return adaptedNode;
  }

  private generateExplanations(
    node: ConsultationNode,
    adaptation: ExperienceAdaptation,
    experienceProfile: ExperienceProfile
  ): string[] {
    if (!this.config.enableEducationalContent || adaptation.explanationLevel === 'minimal') {
      return [];
    }

    const explanations: string[] = [];

    // Add explanations based on node type and experience level
    switch (node.type) {
      case 'entry':
        if (experienceProfile.level === 'beginner') {
          explanations.push('This helps me understand your goals so I can recommend the perfect services for you.');
        }
        break;

      case 'bundling':
        if (experienceProfile.level === 'beginner') {
          explanations.push('Bundling services often provides better results because they work together synergistically.');
          explanations.push('You also save money compared to booking services separately.');
        }
        break;

      case 'refinement':
        if (experienceProfile.level === 'beginner') {
          explanations.push('These details help me personalize recommendations to your specific needs and preferences.');
        }
        break;
    }

    return explanations;
  }

  private generateRecommendations(
    node: ConsultationNode,
    adaptation: ExperienceAdaptation,
    experienceProfile: ExperienceProfile
  ): string[] {
    const recommendations: string[] = [];

    if (experienceProfile.level === 'beginner') {
      recommendations.push('Take your time to consider each option - there\'s no rush.');
      recommendations.push('Feel free to ask questions about any service you\'re curious about.');
    } else if (experienceProfile.level === 'expert') {
      recommendations.push('Based on your experience, you might be interested in our latest techniques.');
    }

    return recommendations;
  }

  private generateWarnings(
    node: ConsultationNode,
    adaptation: ExperienceAdaptation,
    experienceProfile: ExperienceProfile
  ): string[] {
    const warnings: string[] = [];

    if (experienceProfile.level === 'beginner') {
      if (node.type === 'bundling') {
        warnings.push('Don\'t feel pressured to add services you\'re not comfortable with.');
      }
    }

    return warnings;
  }

  private generateEducationalTips(
    node: ConsultationNode,
    adaptation: ExperienceAdaptation,
    experienceProfile: ExperienceProfile
  ): string[] {
    if (!this.config.enableEducationalContent) {
      return [];
    }

    const tips: string[] = [];

    if (experienceProfile.level === 'beginner') {
      switch (node.type) {
        case 'entry':
          tips.push('Professional consultations are a great way to learn about what works best for you.');
          break;
        case 'bundling':
          tips.push('Many services work better together - like color and protective products.');
          break;
      }
    }

    return tips;
  }

  private determineComplexityLevel(
    node: ConsultationNode,
    experienceProfile: ExperienceProfile
  ): 'simple' | 'moderate' | 'complex' {
    // Determine complexity based on node type and user experience
    if (experienceProfile.level === 'beginner') {
      return 'simple';
    } else if (experienceProfile.level === 'expert') {
      return 'complex';
    }
    return 'moderate';
  }

  private assessServiceComplexity(service: UnifiedService): 'simple' | 'moderate' | 'complex' {
    const name = service.name.toLowerCase();
    const category = service.category?.toLowerCase() || '';

    // Simple services
    if (name.includes('consultation') || name.includes('basic') || 
        name.includes('simple') || category.includes('basic')) {
      return 'simple';
    }

    // Complex services
    if (name.includes('advanced') || name.includes('complex') || 
        name.includes('transformation') || category.includes('advanced')) {
      return 'complex';
    }

    return 'moderate';
  }

  private assessProductComplexity(product: UnifiedProduct): 'simple' | 'moderate' | 'complex' {
    const name = product.name.toLowerCase();
    const category = product.category?.toLowerCase() || '';

    // Simple products
    if (name.includes('basic') || name.includes('starter') || 
        category.includes('beginner')) {
      return 'simple';
    }

    // Complex products
    if (name.includes('professional') || name.includes('advanced') || 
        category.includes('expert')) {
      return 'complex';
    }

    return 'moderate';
  }

  private isServiceAppropriate(
    serviceComplexity: 'simple' | 'moderate' | 'complex',
    experienceProfile: ExperienceProfile
  ): boolean {
    switch (experienceProfile.level) {
      case 'beginner':
        return serviceComplexity === 'simple' || serviceComplexity === 'moderate';
      case 'intermediate':
        return true; // Can handle all complexity levels
      case 'expert':
        return serviceComplexity === 'moderate' || serviceComplexity === 'complex';
      default:
        return true;
    }
  }

  private isProductAppropriate(
    productComplexity: 'simple' | 'moderate' | 'complex',
    experienceProfile: ExperienceProfile
  ): boolean {
    return this.isServiceAppropriate(productComplexity, experienceProfile);
  }

  private analyzeConfidenceIndicators(responses: ConsultationResponse[]): {
    showsUnderstanding: boolean;
    asksGoodQuestions: boolean;
    showsExpertise: boolean;
    comfortableWithComplexity: boolean;
  } {
    // Use the production-grade Experience Analysis Engine
    const analysisInput = {
      responses: responses.map(r => ({
        text: r.value.toString(),
        timestamp: new Date(r.timestamp || Date.now()),
        context: r.metadata?.category,
        metadata: r.metadata
      })),
      sessionContext: {
        serviceCategory: this.detectServiceCategory(responses),
        previousSessions: 0 // Could be enhanced with session tracking
      }
    };
    
    const analysisEngine = new ExperienceAnalysisEngine();
    const result = analysisEngine.analyzeExperience(analysisInput);
    
    // Map detailed analysis to simplified indicators for backward compatibility
    return {
      showsUnderstanding: result.technicalKnowledge.score > 0.5,
      asksGoodQuestions: result.decisionConfidence.questioningBehavior > 0.3,
      showsExpertise: result.experienceLevel === 'advanced' || result.experienceLevel === 'expert',
      comfortableWithComplexity: result.recommendations.suggestedServiceComplexity === 'complex' || 
                                result.recommendations.suggestedServiceComplexity === 'advanced'
    };
  }
  
  /**
   * Detect service category from consultation responses
   */
  private detectServiceCategory(responses: ConsultationResponse[]): string {
    const allText = responses.map(r => r.value.toString()).join(' ').toLowerCase();
    
    const categoryKeywords = {
      hair: ['hair', 'cut', 'color', 'style', 'trim', 'highlights', 'balayage', 'roots'],
      makeup: ['makeup', 'foundation', 'lipstick', 'eyeshadow', 'mascara', 'contour', 'blush'],
      skincare: ['facial', 'skin', 'acne', 'wrinkles', 'cleansing', 'moisturizer', 'treatment'],
      wellness: ['massage', 'relaxation', 'aromatherapy', 'wellness', 'spa', 'therapeutic']
    };
    
    let bestCategory = 'general';
    let bestScore = 0;
    
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      const matches = keywords.filter(keyword => allText.includes(keyword));
      const score = matches.length;
      
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    }
    
    return bestCategory;
  }

  private simplifyQuestion(question: string): string {
    return question.replace(/specifically/g, '')
                  .replace(/particularly/g, '')
                  .replace(/\b(complex|sophisticated|advanced)\b/g, '');
  }

  private addTechnicalDetail(question: string): string {
    // Add technical terms for expert users
    return question;
  }

  private addDetailedExplanation(description: string): string {
    if (!description.includes('This helps')) {
      return description + ' This helps me provide the most suitable recommendations for your needs.';
    }
    return description;
  }

  private simplifyDescription(description: string): string {
    return description.split('.')[0] + '.'; // Keep only first sentence
  }
}
