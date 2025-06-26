export interface ConsultationNode {
  id: string;
  type: 'entry' | 'bundling' | 'refinement' | 'exit';
  title: string;
  description?: string;
  question?: string;
  hasTextInput?: boolean;
  textInputPlaceholder?: string;
  options: ConsultationOption[];
  metadata?: {
    category?: string;
    priority?: number;
    tags?: string[];
  };
}

export interface ConsultationOption {
  id: string;
  text: string;
  value: any;
  nextNodeId?: string;
  metadata?: {
    weight?: number;
    category?: string;
    triggers?: string[];
  };
}

export interface ConsultationResponse {
  nodeId: string;
  optionId: string;
  value: any;
  textInput?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface ConsultationSessionState {
  sessionId: string;
  startTime: number;
  lastUpdated: number;
  currentNodeId: string;
  responses: ConsultationResponse[];
  userProfile: UserProfile;
  preferences: UserPreferences;
  recommendedItems: RecommendedItem[];
  artEvolution: ArtEvolutionState;
  navigationStack: string[];
  isComplete: boolean;
}

export interface UserProfile {
  id?: string;
  demographics?: {
    ageRange?: string;
    skinType?: string;
    hairType?: string;
    lifestyle?: string[];
  };
  preferences?: {
    budget?: string;
    timeCommitment?: string;
    experienceLevel?: string;
    priorities?: string[];
  };
  history?: {
    previousServices?: string[];
    previousProducts?: string[];
    consultationHistory?: string[];
  };
}

export interface UserPreferences {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  timeAvailability: string;
  specialRequirements?: string[];
  avoidances?: string[];
}

export interface RecommendedItem {
  type: 'service' | 'product';
  itemId: string;
  confidence: number;
  reasoning: string;
  bundleContext?: {
    bundleId: string;
    bundleReason: string;
    compatibleItems: string[];
  };
}

export interface ArtEvolutionState {
  currentTheme: string;
  evolutionStage: number;
  colorPalette: string[];
  styleIntensity: number;
  transitionDirection: 'subtle' | 'moderate' | 'dramatic';
  triggers: ArtEvolutionTrigger[];
}

export interface ArtEvolutionTrigger {
  responsePattern: string;
  themeShift: string;
  intensity: number;
  duration: number;
}

export interface ConsultationSessionContext {
  sessionState: ConsultationSessionState;
  updateSession: (updates: Partial<ConsultationSessionState>) => void;
  addResponse: (response: ConsultationResponse) => void;
  navigateToNode: (nodeId: string) => void;
  persistSession: () => void;
  restoreSession: (sessionId: string) => void;
}

// Navigation types for modal-based system
export interface ModalNavigationStack {
  current: string;
  history: string[];
  canGoBack: boolean;
  canGoForward: boolean;
}

export type NavigationDirection = 'forward' | 'back' | 'jump';

export interface ModalLifecycleState {
  phase: 'opening' | 'active' | 'transitioning' | 'closing';
  previousPhase?: string;
  timestamp: number;
}
