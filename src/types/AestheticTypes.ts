/**
 * Aesthetic Evolution Types - Defines the emotional state and visual evolution system
 * 
 * This system maps user emotional context to visual aesthetic states that evolve
 * throughout the consultation journey to amplify and resonate with user emotions.
 */

export type EmotionalState = 
  | 'uncertain'      // Initial state - seeking help, unsure
  | 'exploring'      // Discovery phase - learning about options
  | 'engaged'        // Active participation - making choices
  | 'confident'      // Decision clarity - knows what they want
  | 'celebratory';   // Cart/booking moment - ready to commit

export type ConsultationMood = 
  | 'professional'   // Business/interview prep, polished look
  | 'transformative' // Major change, new look, confidence boost
  | 'rejuvenating'   // Self-care, tired, need refreshing
  | 'glamorous'      // Special event, dramatic, luxurious
  | 'natural'        // Subtle enhancement, everyday beauty
  | 'urgent'         // Time pressure, quick solutions needed
  | 'exploratory';   // Browsing, learning, no immediate commitment

export type ServiceEmotion = 
  | 'confidence'     // Makeup, styling - feeling powerful
  | 'renewal'        // Skincare, treatments - feeling refreshed  
  | 'transformation' // Hair, major changes - feeling renewed
  | 'polish'         // Brows, maintenance - feeling put-together
  | 'glamour';       // Lashes, dramatic - feeling stunning

export interface AestheticState {
  id: string;
  emotionalState: EmotionalState;
  mood: ConsultationMood;
  serviceEmotion?: ServiceEmotion;
  
  // Visual Design Tokens
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  
  typography: {
    headingFont: string;
    bodyFont: string;
    headingWeight: number;
    headingSize: string;
    bodySize: string;
    letterSpacing: string;
    lineHeight: number;
  };
  
  spacing: {
    containerPadding: string;
    elementGap: string;
    borderRadius: string;
  };
  
  effects: {
    shadowIntensity: 'none' | 'subtle' | 'medium' | 'strong';
    blurAmount: string;
    gradientIntensity: number;
    animationDuration: string;
    animationEasing: string;
  };
  
  layout: {
    maxWidth: string;
    contentAlignment: 'left' | 'center' | 'right';
    verticalSpacing: 'compact' | 'comfortable' | 'spacious';
  };
}

export interface AestheticEvolution {
  currentState: AestheticState;
  previousState?: AestheticState;
  transitionProgress: number; // 0-1
  isTransitioning: boolean;
  transitionStartTime: number;
  targetState?: AestheticState;
}

export interface EmotionalContext {
  // From Agent B's SmartSearchEngine
  detectedEmotions: string[];
  urgencyLevel: 'low' | 'medium' | 'high';
  consultationPath: 'quick_service' | 'guided_consultation' | 'specific_services';
  serviceCategories: string[];
  
  // Derived emotional mapping
  primaryMood: ConsultationMood;
  serviceEmotion?: ServiceEmotion;
  confidenceLevel: number; // 0-1
  engagementLevel: number; // 0-1
}

export interface AestheticTrigger {
  id: string;
  name: string;
  description: string;
  
  // Conditions for triggering aesthetic evolution
  conditions: {
    emotionalStates?: EmotionalState[];
    moods?: ConsultationMood[];
    consultationProgress?: number; // 0-1
    userActions?: string[];
    timeThresholds?: number; // milliseconds
    confidenceThreshold?: number; // 0-1
  };
  
  // Target aesthetic state
  targetState: EmotionalState;
  transitionDuration: number;
  priority: number; // Higher priority triggers override lower ones
}

export interface AestheticConfig {
  enableTransitions: boolean;
  transitionDuration: number;
  respectsReducedMotion: boolean;
  fallbackState: EmotionalState;
  debugMode: boolean;
}

// Predefined aesthetic evolution paths for different consultation types
export type AestheticEvolutionPath = {
  pathId: string;
  name: string;
  description: string;
  consultationType: 'quick_service' | 'guided_consultation' | 'specific_services';
  stages: {
    stage: number;
    emotionalState: EmotionalState;
    triggerConditions: string[];
    minDuration: number; // minimum time in this stage
  }[];
};

export interface AestheticMetrics {
  // Analytics for aesthetic evolution effectiveness
  stateTransitions: {
    from: EmotionalState;
    to: EmotionalState;
    timestamp: number;
    triggerReason: string;
  }[];
  
  userEngagement: {
    timeInState: Record<EmotionalState, number>;
    interactionsPerState: Record<EmotionalState, number>;
    completionRate: number;
  };
  
  emotionalResonance: {
    detectedMood: ConsultationMood;
    appliedAesthetic: EmotionalState;
    userSatisfactionScore?: number;
  };
}
