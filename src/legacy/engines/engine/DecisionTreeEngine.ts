import {
  ConsultationNode,
  ConsultationResponse,
  ConsultationSessionState,
  UserProfile,
  RecommendedItem
} from '@/data/models';
import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from '@/data/models/UnifiedProduct';
import { SmartSearchEngine, ParsedUserInput } from './SmartSearchEngine';

export interface DecisionTreeConfig {
  maxQuestionsBeforeCards: number;
  targetCatalogSize: { min: number; max: number };
  sessionTimeoutMinutes: number;
  enableAdaptivePaths: boolean;
}

export interface TreeGenerationContext {
  userProfile: UserProfile;
  responses: ConsultationResponse[];
  currentCatalogSize: number;
  cartContents: (UnifiedService | UnifiedProduct)[];
  sessionDuration: number;
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
}

export interface NextNodeResult {
  node: ConsultationNode | null;
  shouldShowCards: boolean;
  shouldTriggerCart?: boolean;
  reasoning: string;
  confidence: number;
  alternativePaths?: string[];
}

export class DecisionTreeEngine {
  private config: DecisionTreeConfig;
  private nodeRegistry: Map<string, ConsultationNode>;
  private transitionRules: Map<string, (context: TreeGenerationContext) => NextNodeResult>;
  private smartSearchEngine: SmartSearchEngine;

  constructor(config: Partial<DecisionTreeConfig> = {}) {
    this.config = {
      maxQuestionsBeforeCards: 6,
      targetCatalogSize: { min: 8, max: 20 },
      sessionTimeoutMinutes: 30,
      enableAdaptivePaths: true,
      ...config
    };
    
    this.nodeRegistry = new Map();
    this.transitionRules = new Map();
    this.smartSearchEngine = new SmartSearchEngine();
    this.initializeTransitionRules();
  }

  /**
   * Start a new consultation session
   */
  startConsultation(sessionState: ConsultationSessionState): ConsultationNode {
    // Always start with the entry node to detect motivation/occasion
    const entryNode = this.getEntryNode(sessionState);
    
    if (!entryNode) {
      throw new Error('No entry node available for consultation');
    }

    return entryNode;
  }

  /**
   * Process a user response and determine the next step
   */
  processResponse(
    response: ConsultationResponse,
    sessionState: ConsultationSessionState
  ): NextNodeResult {
    const context = this.buildGenerationContext(sessionState);
    
    // Handle text input with smart search routing
    if (response.textInput && response.textInput.trim()) {
      const parsedInput = this.smartSearchEngine.parseUserInput(response.textInput);
      
      // If smart search has high confidence, route directly to suggested node
      if (parsedInput.confidence >= 0.8) {
        const targetNode = this.nodeRegistry.get(parsedInput.routingNodeId);
        if (targetNode) {
          return {
            node: targetNode,
            shouldShowCards: parsedInput.suggestedRoute === 'quick_service',
            reasoning: `Smart routing: ${parsedInput.suggestedRoute} (confidence: ${parsedInput.confidence})`,
            confidence: parsedInput.confidence,
            alternativePaths: parsedInput.preFilteredServices
          };
        }
      }
      
      // Store parsed input in response metadata for later use
      response.metadata = {
        ...response.metadata,
        smartSearchResult: parsedInput
      };
    }
    
    // Update context with the new response
    const updatedContext = {
      ...context,
      responses: [...context.responses, response]
    };

    // Determine next node based on current node type and response
    const currentNode = this.nodeRegistry.get(response.nodeId);
    if (!currentNode) {
      throw new Error(`Node ${response.nodeId} not found in registry`);
    }

    return this.determineNextNode(currentNode, response, updatedContext);
  }

  /**
   * Register a consultation node in the tree
   */
  registerNode(node: ConsultationNode): void {
    this.nodeRegistry.set(node.id, node);
  }

  /**
   * Register multiple nodes at once
   */
  registerNodes(nodes: ConsultationNode[]): void {
    nodes.forEach(node => this.registerNode(node));
  }

  /**
   * Get a specific node by ID
   */
  getNode(nodeId: string): ConsultationNode | undefined {
    return this.nodeRegistry.get(nodeId);
  }

  /**
   * Check if consultation should show cards instead of more questions
   */
  shouldShowCards(context: TreeGenerationContext): boolean {
    const questionCount = context.responses.length;
    const catalogSize = context.currentCatalogSize;
    
    // Show cards if we've asked enough questions
    if (questionCount >= this.config.maxQuestionsBeforeCards) {
      return true;
    }

    // Show cards if catalog is filtered to target size
    if (catalogSize >= this.config.targetCatalogSize.min && 
        catalogSize <= this.config.targetCatalogSize.max) {
      return true;
    }

    // Show cards if user has clear service direction (detected in responses)
    if (this.hasCleanServiceDirection(context)) {
      return true;
    }

    return false;
  }

  /**
   * Generate recommendations based on current session state
   */
  generateRecommendations(sessionState: ConsultationSessionState): RecommendedItem[] {
    const context = this.buildGenerationContext(sessionState);
    
    // This will be enhanced by the RulesEngine and BundlingIntelligence
    // For now, return basic structure
    return [];
  }

  /**
   * Get available exit paths for current session
   */
  getExitPaths(sessionState: ConsultationSessionState): ConsultationNode[] {
    const exitNodes = Array.from(this.nodeRegistry.values())
      .filter(node => node.type === 'exit');
    
    // Filter exit nodes based on current context
    const context = this.buildGenerationContext(sessionState);
    
    return exitNodes.filter(node => this.isExitPathValid(node, context));
  }

  /**
   * Reset consultation to a specific point
   */
  resetToNode(nodeId: string, sessionState: ConsultationSessionState): ConsultationNode | null {
    const node = this.nodeRegistry.get(nodeId);
    if (!node) {
      return null;
    }

    // This would typically involve updating the session state
    // to remove responses after the target node
    return node;
  }

  // Private helper methods

  private getEntryNode(sessionState: ConsultationSessionState): ConsultationNode | null {
    // Start with consultation type segmentation
    const consultationTypeNode = this.nodeRegistry.get('entry_consultation_type');
    
    if (consultationTypeNode) {
      return consultationTypeNode;
    }

    // Fallback to any entry node
    const entryNodes = Array.from(this.nodeRegistry.values())
      .filter(node => node.type === 'entry');

    return entryNodes.length > 0 ? entryNodes[0] : null;
  }

  private determineNextNode(
    currentNode: ConsultationNode,
    response: ConsultationResponse,
    context: TreeGenerationContext
  ): NextNodeResult {
    const selectedOption = currentNode.options.find(opt => opt.id === response.optionId);
    
    // Handle cart actions - these trigger definitive end states
    if (selectedOption?.value === 'cart_action') {
      return {
        node: null,
        shouldShowCards: true,
        shouldTriggerCart: true,
        reasoning: 'User ready to add services to cart - triggering Agent D bundling',
        confidence: 1.0
      };
    }

    // Handle quick service path - show cards sooner
    if (selectedOption?.metadata?.triggers?.includes('show_cards_soon')) {
      return {
        node: null,
        shouldShowCards: true,
        reasoning: 'Quick service path - showing options with minimal questions',
        confidence: 0.9
      };
    }

    // Look for explicit next node in the response option
    if (selectedOption?.nextNodeId) {
      const nextNode = this.nodeRegistry.get(selectedOption.nextNodeId);
      if (nextNode) {
        return {
          node: nextNode,
          shouldShowCards: false,
          reasoning: 'Following explicit node transition',
          confidence: 1.0
        };
      }
    }

    // Check if we should show cards for guided consultation (more questions allowed)
    if (this.shouldShowCards(context)) {
      // Determine which end state to use
      const isQuickPath = context.responses.some(r => 
        r.optionId === 'quick_service' || 
        r.metadata?.triggers?.includes('fast_track')
      );
      
      if (isQuickPath) {
        const endStateNode = this.nodeRegistry.get('end_state_quick_results');
        return {
          node: endStateNode || null,
          shouldShowCards: true,
          reasoning: 'Quick service path complete - showing filtered results',
          confidence: 0.9
        };
      } else {
        const endStateNode = this.nodeRegistry.get('end_state_guided_recommendations');
        return {
          node: endStateNode || null,
          shouldShowCards: true,
          reasoning: 'Guided consultation complete - showing personalized recommendations',
          confidence: 0.9
        };
      }
    }

    // Use transition rules to determine next node
    const ruleKey = `${currentNode.type}_${response.optionId}`;
    const transitionRule = this.transitionRules.get(ruleKey);
    
    if (transitionRule) {
      return transitionRule(context);
    }

    // Default transition logic based on node type
    return this.getDefaultTransition(currentNode, response, context);
  }

  private buildGenerationContext(sessionState: ConsultationSessionState): TreeGenerationContext {
    return {
      userProfile: sessionState.userProfile,
      responses: sessionState.responses,
      currentCatalogSize: 100, // This will be calculated by CatalogFilter
      cartContents: [], // This will come from cart context
      sessionDuration: Date.now() - sessionState.startTime,
      experienceLevel: this.detectExperienceLevel(sessionState)
    };
  }

  private detectExperienceLevel(sessionState: ConsultationSessionState): 'beginner' | 'intermediate' | 'expert' {
    // Analyze responses to detect experience level
    const responses = sessionState.responses;
    
    // Look for experience-related responses
    const experienceResponse = responses.find(r => 
      r.metadata?.category === 'experience' || 
      r.nodeId.includes('experience')
    );

    if (experienceResponse) {
      const value = experienceResponse.value.toString().toLowerCase();
      if (value.includes('first') || value.includes('never')) {
        return 'beginner';
      }
      if (value.includes('regularly') || value.includes('often')) {
        return 'expert';
      }
    }

    return 'intermediate';
  }

  private hasCleanServiceDirection(context: TreeGenerationContext): boolean {
    // Check if user responses indicate clear service category preference
    const categoryResponses = context.responses.filter(r => 
      r.metadata?.category === 'service_category' ||
      r.metadata?.category === 'domain'
    );

    return categoryResponses.length > 0;
  }

  private isExitPathValid(node: ConsultationNode, context: TreeGenerationContext): boolean {
    // Validate if this exit path makes sense for current context
    // For example, don't show "single item" exit if cart has multiple items
    
    if (node.metadata?.tags?.includes('single_item') && context.cartContents.length > 1) {
      return false;
    }

    if (node.metadata?.tags?.includes('high_value') && context.cartContents.length === 0) {
      return false;
    }

    return true;
  }

  private getDefaultTransition(
    currentNode: ConsultationNode,
    response: ConsultationResponse,
    context: TreeGenerationContext
  ): NextNodeResult {
    // Default transition logic based on node types
    switch (currentNode.type) {
      case 'entry':
        // Entry nodes typically go to filtering or bundling
        return this.getFilteringNode(context);
      
      case 'bundling':
        // Bundling nodes can go to refinement or exit
        return this.getRefinementNode(context);
      
      case 'refinement':
        // Refinement can loop back to bundling or go to exit
        if (context.responses.length >= this.config.maxQuestionsBeforeCards) {
          return this.getExitNode(context);
        }
        return this.getBundlingNode(context);
      
      default:
        return {
          node: null,
          shouldShowCards: true,
          reasoning: 'Default transition to card display',
          confidence: 0.5
        };
    }
  }

  private getFilteringNode(context: TreeGenerationContext): NextNodeResult {
    // Find appropriate filtering node
    const filteringNodes = Array.from(this.nodeRegistry.values())
      .filter(node => node.type === 'refinement' && node.metadata?.category === 'filtering');
    
    if (filteringNodes.length > 0) {
      return {
        node: filteringNodes[0],
        shouldShowCards: false,
        reasoning: 'Moving to filtering to narrow down options',
        confidence: 0.8
      };
    }

    return {
      node: null,
      shouldShowCards: true,
      reasoning: 'No filtering nodes available, showing cards',
      confidence: 0.6
    };
  }

  private getRefinementNode(context: TreeGenerationContext): NextNodeResult {
    const refinementNodes = Array.from(this.nodeRegistry.values())
      .filter(node => node.type === 'refinement');
    
    if (refinementNodes.length > 0) {
      return {
        node: refinementNodes[0],
        shouldShowCards: false,
        reasoning: 'Moving to refinement for personalization',
        confidence: 0.7
      };
    }

    return this.getExitNode(context);
  }

  private getBundlingNode(context: TreeGenerationContext): NextNodeResult {
    const bundlingNodes = Array.from(this.nodeRegistry.values())
      .filter(node => node.type === 'bundling');
    
    if (bundlingNodes.length > 0) {
      return {
        node: bundlingNodes[0],
        shouldShowCards: false,
        reasoning: 'Moving to bundling for recommendations',
        confidence: 0.8
      };
    }

    return this.getExitNode(context);
  }

  private getExitNode(context: TreeGenerationContext): NextNodeResult {
    const exitNodes = Array.from(this.nodeRegistry.values())
      .filter(node => node.type === 'exit');
    
    if (exitNodes.length > 0) {
      return {
        node: exitNodes[0],
        shouldShowCards: false,
        reasoning: 'Moving to exit for completion',
        confidence: 0.9
      };
    }

    return {
      node: null,
      shouldShowCards: true,
      reasoning: 'No exit nodes available, showing cards',
      confidence: 0.5
    };
  }

  private initializeTransitionRules(): void {
    // Initialize specific transition rules
    // These will be populated by the RulesEngine
    
    // Example rule structure:
    // this.transitionRules.set('entry_wedding', (context) => {
    //   // Special handling for wedding responses
    //   return this.getBridalBundlingNode(context);
    // });
  }
}
