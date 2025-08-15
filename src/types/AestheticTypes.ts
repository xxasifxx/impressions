/**
 * Types for the Aesthetic Evolution System
 */

// Emotional states that the UI can evolve through
export type EmotionalState = 
  | 'uncertain'   // Initial exploration state
  | 'exploring'   // Discovery phase
  | 'engaged'     // Active participation
  | 'confident'   // Decision clarity
  | 'celebratory' // Completion state
;

// Service categories that affect the aesthetic
export type ServiceCategory = 
  | 'hair-salon'
  | 'makeup-studio'
  | 'med-spa'
  | 'full-service'
;

// Consultation moods that affect the aesthetic
export type ConsultationMood = 
  | 'professional'   // Clean, structured, business-like
  | 'transformative' // Bold, dramatic changes
  | 'rejuvenating'   // Fresh, revitalizing
  | 'glamorous'      // Luxurious, special occasion
  | 'natural'        // Subtle, organic
  | 'urgent'         // Quick, immediate results
  | 'exploratory'    // Curious, open to options
;

// Current state of the aesthetic system
export interface AestheticState {
  emotionalState: EmotionalState;
  serviceCategory?: ServiceCategory;
  mood?: ConsultationMood;
  message?: string;
  timestamp: number;
}

// Transition between aesthetic states
export interface AestheticTransition {
  from: AestheticState;
  to: AestheticState;
  duration: number;
}

// History of aesthetic state changes
export interface AestheticHistory {
  states: AestheticState[];
  transitions: AestheticTransition[];
}

// Context for the aesthetic provider
export interface AestheticContextType {
  currentState: AestheticState;
  history: AestheticHistory;
  evolveToState: (state: EmotionalState, message?: string) => void;
  applyToElement: (
    element: HTMLElement, 
    serviceCategory?: ServiceCategory,
    mood?: ConsultationMood
  ) => void;
  getStateClassName: () => string;
  triggerCelebratoryState: (message?: string) => void;
}

