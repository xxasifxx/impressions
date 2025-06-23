import {
  ConsultationNode,
  ConsultationResponse,
  ConsultationSessionState,
  ConsultationSessionContext,
  ArtEvolutionState,
  RecommendedItem
} from '@/data/models/ConsultationTypes';
import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from '@/data/models/UnifiedProduct';

import { DecisionTreeEngine, NextNodeResult } from './DecisionTreeEngine';
import { RulesEngine } from './RulesEngine';
import { CatalogFilter, FilterResult } from './CatalogFilter';
import { CardDisplayManager, CardDisplayDecision } from './CardDisplayManager';
import { BundlingIntelligence, BundleRecommendation } from './BundlingIntelligence';

export interface SessionManagerConfig {
  autoSaveInterval: number; // milliseconds
  sessionTimeoutMinutes: number;
  maxSessionHistory: number;
  enableArtEvolution: boolean;
  enableBundling: boolean;
}

export interface ConsultationState {
  currentNode: ConsultationNode | null;
  filteredServices: UnifiedService[];
  filteredProducts: UnifiedProduct[];
  bundleRecommendations: BundleRecommendation[];
  shouldShowCards: boolean;
  cardDisplayDecision: CardDisplayDecision | null;
  isComplete: boolean;
  completionReason?: string;
}

export interface SessionEvent {
  type: 'node_transition' | 'response_added' | 'cards_displayed' | 'bundle_suggested' | 'session_completed';
  timestamp: number;
  data: any;
  nodeId?: string;
}

export class ConsultationSessionManager {
  private decisionTreeEngine: DecisionTreeEngine;
  private rulesEngine: RulesEngine;
  private catalogFilter: CatalogFilter;
  private cardDisplayManager: CardDisplayManager;
  private bundlingIntelligence: BundlingIntelligence;
  private config: SessionManagerConfig;
  
  private sessionState: ConsultationSessionState | null = null;
  private consultationState: ConsultationState;
  private sessionEvents: SessionEvent[] = [];
  private autoSaveTimer: NodeJS.Timeout | null = null;

  constructor(
    availableServices: UnifiedService[],
    availableProducts: UnifiedProduct[],
    config: Partial<SessionManagerConfig> = {}
  ) {
    this.config = {
      autoSaveInterval: 30000, // 30 seconds
      sessionTimeoutMinutes: 30,
      maxSessionHistory: 100,
      enableArtEvolution: true,
      enableBundling: true,
      ...config
    };

    // Initialize engines
    this.rulesEngine = new RulesEngine();
    this.decisionTreeEngine = new DecisionTreeEngine();
    this.catalogFilter = new CatalogFilter(this.rulesEngine);
    this.cardDisplayManager = new CardDisplayManager(this.rulesEngine);
    this.bundlingIntelligence = new BundlingIntelligence(this.rulesEngine);

    // Initialize consultation state
    this.consultationState = {
      currentNode: null,
      filteredServices: availableServices,
      filteredProducts: availableProducts,
      bundleRecommendations: [],
      shouldShowCards: false,
      cardDisplayDecision: null,
      isComplete: false
    };

    // Register nodes with decision tree engine
    this.initializeDecisionTree();
  }

  /**
   * Start a new consultation session
   */
  startSession(initialUserProfile?: Partial<ConsultationSessionState>): ConsultationSessionContext {
    // Create new session state
    this.sessionState = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      lastUpdated: Date.now(),
      currentNodeId: '',
      responses: [],
      userProfile: {
        id: initialUserProfile?.userProfile?.id,
        demographics: initialUserProfile?.userProfile?.demographics || {},
        preferences: initialUserProfile?.userProfile?.preferences || {},
        history: initialUserProfile?.userProfile?.history || {}
      },
      preferences: {
        categories: [],
        priceRange: { min: 0, max: 1000 },
        timeAvailability: 'flexible',
        specialRequirements: [],
        avoidances: []
      },
      recommendedItems: [],
      artEvolution: this.initializeArtEvolution(),
      navigationStack: [],
      isComplete: false
    };

    // Start with entry node
    const entryNode = this.decisionTreeEngine.startConsultation(this.sessionState);
    this.consultationState.currentNode = entryNode;
    this.sessionState.currentNodeId = entryNode.id;
    this.sessionState.navigationStack = [entryNode.id];

    // Log session start event
    this.logEvent({
      type: 'node_transition',
      timestamp: Date.now(),
      data: { nodeId: entryNode.id, nodeType: entryNode.type },
      nodeId: entryNode.id
    });

    // Start auto-save
    this.startAutoSave();

    // Return session context
    return this.createSessionContext();
  }

  /**
   * Process a user response and advance the consultation
   */
  processResponse(response: ConsultationResponse): {
    nextNode: ConsultationNode | null;
    shouldShowCards: boolean;
    bundleRecommendations: BundleRecommendation[];
    artEvolution: ArtEvolutionState;
  } {
    if (!this.sessionState) {
      throw new Error('No active session');
    }

    // Add response to session
    this.sessionState.responses.push(response);
    this.sessionState.lastUpdated = Date.now();

    // Log response event
    this.logEvent({
      type: 'response_added',
      timestamp: Date.now(),
      data: { response },
      nodeId: response.nodeId
    });

    // Process response through decision tree engine
    const nextNodeResult = this.decisionTreeEngine.processResponse(response, this.sessionState);

    // Update art evolution if enabled
    if (this.config.enableArtEvolution) {
      this.updateArtEvolution(response);
    }

    // Filter catalog based on current responses
    const filterResult = this.catalogFilter.filterCatalog(
      this.sessionState,
      this.consultationState.filteredServices,
      this.consultationState.filteredProducts
    );

    this.consultationState.filteredServices = filterResult.filteredServices;
    this.consultationState.filteredProducts = filterResult.filteredProducts;

    // Check if we should show cards
    const cardDecision = this.cardDisplayManager.shouldShowCards(
      this.sessionState,
      filterResult.totalCount
    );

    this.consultationState.shouldShowCards = cardDecision.shouldShowCards;
    this.consultationState.cardDisplayDecision = cardDecision;

    // Generate bundle recommendations if enabled
    if (this.config.enableBundling && cardDecision.shouldShowCards) {
      const cartItems = this.getCurrentCartItems();
      this.consultationState.bundleRecommendations = 
        this.bundlingIntelligence.analyzeCartForBundles(cartItems, this.sessionState);

      if (this.consultationState.bundleRecommendations.length > 0) {
        this.logEvent({
          type: 'bundle_suggested',
          timestamp: Date.now(),
          data: { bundles: this.consultationState.bundleRecommendations },
          nodeId: this.sessionState.currentNodeId
        });
      }
    }

    // Handle next node or card display
    if (nextNodeResult.shouldShowCards || cardDecision.shouldShowCards) {
      this.consultationState.currentNode = null;
      this.logEvent({
        type: 'cards_displayed',
        timestamp: Date.now(),
        data: { 
          catalogSize: filterResult.totalCount,
          decision: cardDecision,
          reasoning: nextNodeResult.reasoning || cardDecision.reasoning
        },
        nodeId: this.sessionState.currentNodeId
      });
    } else if (nextNodeResult.node) {
      this.consultationState.currentNode = nextNodeResult.node;
      this.sessionState.currentNodeId = nextNodeResult.node.id;
      this.sessionState.navigationStack.push(nextNodeResult.node.id);

      this.logEvent({
        type: 'node_transition',
        timestamp: Date.now(),
        data: { 
          nodeId: nextNodeResult.node.id, 
          nodeType: nextNodeResult.node.type,
          reasoning: nextNodeResult.reasoning
        },
        nodeId: nextNodeResult.node.id
      });
    }

    return {
      nextNode: this.consultationState.currentNode,
      shouldShowCards: this.consultationState.shouldShowCards,
      bundleRecommendations: this.consultationState.bundleRecommendations,
      artEvolution: this.sessionState.artEvolution
    };
  }

  /**
   * Complete the consultation session
   */
  completeSession(reason: string = 'user_completed'): void {
    if (!this.sessionState) return;

    this.sessionState.isComplete = true;
    this.sessionState.lastUpdated = Date.now();
    this.consultationState.isComplete = true;
    this.consultationState.completionReason = reason;

    this.logEvent({
      type: 'session_completed',
      timestamp: Date.now(),
      data: { reason, duration: Date.now() - this.sessionState.startTime },
      nodeId: this.sessionState.currentNodeId
    });

    this.stopAutoSave();
  }

  /**
   * Get current session context for React components
   */
  getSessionContext(): ConsultationSessionContext | null {
    if (!this.sessionState) return null;
    return this.createSessionContext();
  }

  /**
   * Get current consultation state
   */
  getConsultationState(): ConsultationState {
    return { ...this.consultationState };
  }

  /**
   * Get session analytics and insights
   */
  getSessionAnalytics(): {
    duration: number;
    questionsAnswered: number;
    nodesVisited: number;
    catalogReduction: number;
    bundlesGenerated: number;
    artEvolutionStage: number;
    completionRate: number;
  } {
    if (!this.sessionState) {
      return {
        duration: 0,
        questionsAnswered: 0,
        nodesVisited: 0,
        catalogReduction: 0,
        bundlesGenerated: 0,
        artEvolutionStage: 0,
        completionRate: 0
      };
    }

    const duration = Date.now() - this.sessionState.startTime;
    const questionsAnswered = this.sessionState.responses.length;
    const nodesVisited = this.sessionState.navigationStack.length;
    const initialCatalogSize = this.consultationState.filteredServices.length + 
                              this.consultationState.filteredProducts.length;
    const catalogReduction = initialCatalogSize > 0 ? 
      (1 - (this.consultationState.filteredServices.length + 
            this.consultationState.filteredProducts.length) / initialCatalogSize) * 100 : 0;
    const bundlesGenerated = this.consultationState.bundleRecommendations.length;
    const artEvolutionStage = this.sessionState.artEvolution.evolutionStage;
    
    // Calculate completion rate based on typical consultation flow
    const expectedSteps = 6; // Based on strategic guidelines
    const completionRate = Math.min((questionsAnswered / expectedSteps) * 100, 100);

    return {
      duration,
      questionsAnswered,
      nodesVisited,
      catalogReduction,
      bundlesGenerated,
      artEvolutionStage,
      completionRate
    };
  }

  /**
   * Navigate back to a previous node
   */
  navigateBack(): ConsultationNode | null {
    if (!this.sessionState || this.sessionState.navigationStack.length <= 1) {
      return null;
    }

    // Remove current node from stack
    this.sessionState.navigationStack.pop();
    
    // Get previous node
    const previousNodeId = this.sessionState.navigationStack[this.sessionState.navigationStack.length - 1];
    const previousNode = this.decisionTreeEngine.getNode(previousNodeId);

    if (previousNode) {
      this.consultationState.currentNode = previousNode;
      this.sessionState.currentNodeId = previousNode.id;
      this.consultationState.shouldShowCards = false;
      
      // Remove responses after the target node
      this.sessionState.responses = this.sessionState.responses.filter(r => 
        this.sessionState!.navigationStack.includes(r.nodeId)
      );

      this.logEvent({
        type: 'node_transition',
        timestamp: Date.now(),
        data: { nodeId: previousNode.id, nodeType: previousNode.type, action: 'back' },
        nodeId: previousNode.id
      });
    }

    return previousNode;
  }

  /**
   * Restore session from saved state
   */
  restoreSession(savedState: ConsultationSessionState): boolean {
    try {
      this.sessionState = savedState;
      
      // Restore current node
      if (savedState.currentNodeId) {
        const currentNode = this.decisionTreeEngine.getNode(savedState.currentNodeId);
        this.consultationState.currentNode = currentNode || null;
      }

      // Re-filter catalog based on saved responses
      if (savedState.responses.length > 0) {
        const filterResult = this.catalogFilter.filterCatalog(
          this.sessionState,
          this.consultationState.filteredServices,
          this.consultationState.filteredProducts
        );

        this.consultationState.filteredServices = filterResult.filteredServices;
        this.consultationState.filteredProducts = filterResult.filteredProducts;
      }

      this.startAutoSave();
      return true;
    } catch (error) {
      console.error('Failed to restore session:', error);
      return false;
    }
  }

  // Private helper methods

  private createSessionContext(): ConsultationSessionContext {
    if (!this.sessionState) {
      throw new Error('No active session');
    }

    return {
      sessionState: this.sessionState,
      updateSession: (updates) => {
        if (this.sessionState) {
          Object.assign(this.sessionState, updates);
          this.sessionState.lastUpdated = Date.now();
        }
      },
      addResponse: (response) => {
        this.processResponse(response);
      },
      navigateToNode: (nodeId) => {
        const node = this.decisionTreeEngine.getNode(nodeId);
        if (node && this.sessionState) {
          this.consultationState.currentNode = node;
          this.sessionState.currentNodeId = nodeId;
          this.sessionState.navigationStack.push(nodeId);
        }
      },
      persistSession: () => {
        // This would integrate with Agent A's session persistence
        if (this.sessionState) {
          localStorage.setItem(`consultation_session_${this.sessionState.sessionId}`, 
                              JSON.stringify(this.sessionState));
        }
      },
      restoreSession: (sessionId) => {
        const saved = localStorage.getItem(`consultation_session_${sessionId}`);
        if (saved) {
          const savedState = JSON.parse(saved);
          this.restoreSession(savedState);
        }
      }
    };
  }

  private initializeDecisionTree(): void {
    // This would register all nodes from nodeTypes.ts
    // For now, we'll assume nodes are registered elsewhere
  }

  private initializeArtEvolution(): ArtEvolutionState {
    return {
      currentTheme: 'neutral',
      evolutionStage: 0,
      colorPalette: ['#f8f9fa', '#e9ecef', '#dee2e6'],
      styleIntensity: 1,
      transitionDirection: 'subtle',
      triggers: []
    };
  }

  private updateArtEvolution(response: ConsultationResponse): void {
    if (!this.sessionState) return;

    const artEvolution = this.sessionState.artEvolution;
    
    // Evolve based on response content
    if (response.metadata?.category === 'style') {
      const style = response.value.toString().toLowerCase();
      
      if (style.includes('glamorous') || style.includes('dramatic')) {
        artEvolution.currentTheme = 'glamorous';
        artEvolution.styleIntensity = Math.min(artEvolution.styleIntensity + 2, 10);
        artEvolution.transitionDirection = 'dramatic';
      } else if (style.includes('professional') || style.includes('polished')) {
        artEvolution.currentTheme = 'professional';
        artEvolution.styleIntensity = Math.min(artEvolution.styleIntensity + 1, 10);
        artEvolution.transitionDirection = 'moderate';
      } else if (style.includes('romantic') || style.includes('soft')) {
        artEvolution.currentTheme = 'romantic';
        artEvolution.styleIntensity = Math.min(artEvolution.styleIntensity + 1, 10);
        artEvolution.transitionDirection = 'subtle';
      }
    }

    // Evolve based on motivation
    if (response.metadata?.category === 'motivation') {
      const motivation = response.value.toString().toLowerCase();
      
      if (motivation.includes('wedding')) {
        artEvolution.currentTheme = 'romantic';
        artEvolution.colorPalette = ['#fdf2f8', '#fce7f3', '#fbcfe8'];
      } else if (motivation.includes('professional')) {
        artEvolution.currentTheme = 'professional';
        artEvolution.colorPalette = ['#f8fafc', '#f1f5f9', '#e2e8f0'];
      }
    }

    // Increase evolution stage
    artEvolution.evolutionStage = Math.min(artEvolution.evolutionStage + 1, 5);
  }

  private getCurrentCartItems(): (UnifiedService | UnifiedProduct)[] {
    // This would integrate with Agent A's cart system
    // For now, return empty array
    return [];
  }

  private generateSessionId(): string {
    return `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private logEvent(event: SessionEvent): void {
    this.sessionEvents.push(event);
    
    // Keep only recent events
    if (this.sessionEvents.length > this.config.maxSessionHistory) {
      this.sessionEvents = this.sessionEvents.slice(-this.config.maxSessionHistory);
    }
  }

  private startAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }

    this.autoSaveTimer = setInterval(() => {
      if (this.sessionState) {
        this.createSessionContext().persistSession();
      }
    }, this.config.autoSaveInterval);
  }

  private stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }
}

