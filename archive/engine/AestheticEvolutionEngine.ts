/**
 * AestheticEvolutionEngine - Core engine for aesthetic evolution system
 * 
 * Handles state transitions, emotional context processing, and aesthetic state management.
 */

import { 
  AestheticEvolution, 
  EmotionalState, 
  AestheticState,
  AestheticEvolutionConfig,
  AestheticColors,
  AestheticTypography,
  AestheticSpacing,
  AestheticEffects,
  AestheticLayout
} from '../types/AestheticTypes';
import { ParsedUserInput } from './SmartSearchEngine';
import { ConsultationResponse } from '../data/models/ConsultationTypes';

// Default aesthetic states for each emotional state
const DEFAULT_AESTHETIC_STATES: Record<EmotionalState, AestheticState> = {
  uncertain: {
    emotionalState: 'uncertain',
    colors: {
      primary: '#6B7280',
      secondary: '#9CA3AF',
      accent: '#4B5563',
      background: '#F9FAFB',
      surface: '#F3F4F6',
      text: '#1F2937',
      textSecondary: '#4B5563'
    },
    typography: {
      headingFont: 'system-ui, sans-serif',
      bodyFont: 'system-ui, sans-serif',
      headingWeight: 400,
      headingSize: '1.5rem',
      bodySize: '0.875rem',
      letterSpacing: '0.025em',
      lineHeight: 1.5
    },
    spacing: {
      containerPadding: '1rem',
      elementGap: '0.75rem',
      borderRadius: '0.375rem'
    },
    effects: {
      animationDuration: '0.4s',
      animationEasing: 'ease-in-out',
      shadowIntensity: 'light'
    },
    layout: {
      maxWidth: '64rem',
      verticalSpacing: 'default'
    }
  },
  exploring: {
    emotionalState: 'exploring',
    colors: {
      primary: '#4F46E5',
      secondary: '#818CF8',
      accent: '#6366F1',
      background: '#F5F7FF',
      surface: '#EEF2FF',
      text: '#1E1B4B',
      textSecondary: '#4338CA'
    },
    typography: {
      headingFont: 'system-ui, sans-serif',
      bodyFont: 'system-ui, sans-serif',
      headingWeight: 500,
      headingSize: '1.75rem',
      bodySize: '0.9rem',
      letterSpacing: '0.015em',
      lineHeight: 1.6
    },
    spacing: {
      containerPadding: '1.25rem',
      elementGap: '1rem',
      borderRadius: '0.5rem'
    },
    effects: {
      animationDuration: '0.5s',
      animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      shadowIntensity: 'medium'
    },
    layout: {
      maxWidth: '68rem',
      verticalSpacing: 'default'
    }
  },
  engaged: {
    emotionalState: 'engaged',
    colors: {
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      accent: '#0284C7',
      background: '#F0F9FF',
      surface: '#E0F2FE',
      text: '#0C4A6E',
      textSecondary: '#0369A1'
    },
    typography: {
      headingFont: 'system-ui, sans-serif',
      bodyFont: 'system-ui, sans-serif',
      headingWeight: 600,
      headingSize: '1.875rem',
      bodySize: '0.925rem',
      letterSpacing: '0.01em',
      lineHeight: 1.65
    },
    spacing: {
      containerPadding: '1.5rem',
      elementGap: '1.25rem',
      borderRadius: '0.625rem'
    },
    effects: {
      animationDuration: '0.6s',
      animationEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      shadowIntensity: 'medium'
    },
    layout: {
      maxWidth: '72rem',
      verticalSpacing: 'spacious'
    }
  },
  confident: {
    emotionalState: 'confident',
    colors: {
      primary: '#059669',
      secondary: '#10B981',
      accent: '#047857',
      background: '#ECFDF5',
      surface: '#D1FAE5',
      text: '#064E3B',
      textSecondary: '#065F46'
    },
    typography: {
      headingFont: 'system-ui, sans-serif',
      bodyFont: 'system-ui, sans-serif',
      headingWeight: 700,
      headingSize: '2rem',
      bodySize: '0.95rem',
      letterSpacing: '0.005em',
      lineHeight: 1.7
    },
    spacing: {
      containerPadding: '1.75rem',
      elementGap: '1.5rem',
      borderRadius: '0.75rem'
    },
    effects: {
      animationDuration: '0.7s',
      animationEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      shadowIntensity: 'strong'
    },
    layout: {
      maxWidth: '76rem',
      verticalSpacing: 'spacious'
    }
  },
  celebratory: {
    emotionalState: 'celebratory',
    colors: {
      primary: '#DB2777',
      secondary: '#EC4899',
      accent: '#BE185D',
      background: '#FDF2F8',
      surface: '#FCE7F3',
      text: '#831843',
      textSecondary: '#9D174D'
    },
    typography: {
      headingFont: 'system-ui, sans-serif',
      bodyFont: 'system-ui, sans-serif',
      headingWeight: 800,
      headingSize: '2.25rem',
      bodySize: '1rem',
      letterSpacing: '0',
      lineHeight: 1.75
    },
    spacing: {
      containerPadding: '2rem',
      elementGap: '1.75rem',
      borderRadius: '1rem'
    },
    effects: {
      animationDuration: '0.8s',
      animationEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      shadowIntensity: 'strong'
    },
    layout: {
      maxWidth: '80rem',
      verticalSpacing: 'spacious'
    }
  }
};

// Domain-specific color overrides
const DOMAIN_COLOR_OVERRIDES: Record<string, Partial<AestheticColors>> = {
  'hair-salon': {
    primary: '#E11D48',
    secondary: '#FB7185',
    accent: '#BE123C'
  },
  'makeup-studio': {
    primary: '#D946EF',
    secondary: '#E879F9',
    accent: '#C026D3'
  },
  'med-spa': {
    primary: '#14B8A6',
    secondary: '#2DD4BF',
    accent: '#0D9488'
  }
};

export class AestheticEvolutionEngine {
  private config: AestheticEvolutionConfig;
  private currentEvolution: AestheticEvolution;
  private stateHistory: Array<{ state: EmotionalState; timestamp: number; reason: string }> = [];
  private domainFocus: string | null = null;
  private moodFocus: string | null = null;

  constructor(config: Partial<AestheticEvolutionConfig> = {}) {
    // Default configuration
    this.config = {
      initialState: 'uncertain',
      transitionDuration: 600,
      enableDomainAdaptation: true,
      enableMoodAdaptation: true,
      ...config
    };

    // Initialize with default state
    const initialState = DEFAULT_AESTHETIC_STATES[this.config.initialState];
    
    this.currentEvolution = {
      previousState: { ...initialState },
      currentState: { ...initialState },
      targetState: { ...initialState },
      isTransitioning: false,
      transitionProgress: 1,
      transitionDuration: this.config.transitionDuration
    };

    // Record initial state
    this.stateHistory.push({
      state: this.config.initialState,
      timestamp: Date.now(),
      reason: 'Initial state'
    });
  }

  /**
   * Get current aesthetic evolution state
   */
  public getCurrentEvolution(): AestheticEvolution {
    return { ...this.currentEvolution };
  }

  /**
   * Process emotional context from parsed user input
   */
  public processEmotionalContext(
    parsedInput: ParsedUserInput,
    progress: number = 0
  ): AestheticEvolution {
    // Extract emotional signals from parsed input
    const { confidence, complexity, sentiment } = parsedInput.emotionalContext || {};
    
    // Determine appropriate emotional state based on signals
    let targetState: EmotionalState = 'uncertain';
    
    if (confidence && confidence > 0.8) {
      targetState = 'confident';
    } else if (confidence && confidence > 0.5) {
      targetState = 'engaged';
    } else if (confidence && confidence > 0.2) {
      targetState = 'exploring';
    }
    
    // Override based on progress if available
    if (progress > 0.75) {
      targetState = 'confident';
    } else if (progress > 0.5) {
      targetState = 'engaged';
    } else if (progress > 0.25) {
      targetState = 'exploring';
    }
    
    // Apply domain focus if available
    if (parsedInput.domainFocus && this.config.enableDomainAdaptation) {
      this.domainFocus = parsedInput.domainFocus;
    }
    
    // Apply mood focus if available
    if (parsedInput.mood && this.config.enableMoodAdaptation) {
      this.moodFocus = parsedInput.mood;
    }
    
    // Evolve to the determined state
    return this.evolveToState(targetState, 'Emotional context processing');
  }

  /**
   * Process consultation response
   */
  public processConsultationResponse(
    response: ConsultationResponse,
    progress: number
  ): AestheticEvolution {
    // Determine appropriate emotional state based on consultation progress
    let targetState: EmotionalState = 'uncertain';
    
    if (progress > 0.9) {
      targetState = 'celebratory';
    } else if (progress > 0.75) {
      targetState = 'confident';
    } else if (progress > 0.5) {
      targetState = 'engaged';
    } else if (progress > 0.25) {
      targetState = 'exploring';
    }
    
    // Apply domain focus if available
    if (response.domain && this.config.enableDomainAdaptation) {
      this.domainFocus = response.domain;
    }
    
    // Evolve to the determined state
    return this.evolveToState(targetState, 'Consultation progress');
  }

  /**
   * Manually evolve to a specific emotional state
   */
  public evolveToState(
    state: EmotionalState,
    reason: string = 'Manual trigger'
  ): AestheticEvolution {
    // Skip if already in this state and not transitioning
    if (
      this.currentEvolution.currentState.emotionalState === state && 
      !this.currentEvolution.isTransitioning
    ) {
      return { ...this.currentEvolution };
    }
    
    // Get base target state
    const targetState = { ...DEFAULT_AESTHETIC_STATES[state] };
    
    // Apply domain-specific overrides if applicable
    if (this.domainFocus && this.config.enableDomainAdaptation) {
      const domainOverrides = DOMAIN_COLOR_OVERRIDES[this.domainFocus];
      if (domainOverrides) {
        targetState.colors = {
          ...targetState.colors,
          ...domainOverrides
        };
      }
    }
    
    // Record state change in history
    this.stateHistory.push({
      state,
      timestamp: Date.now(),
      reason
    });
    
    // Start transition
    this.currentEvolution = {
      previousState: { ...this.currentEvolution.currentState },
      currentState: { ...this.currentEvolution.currentState }, // Will be interpolated during transition
      targetState,
      isTransitioning: true,
      transitionProgress: 0,
      transitionDuration: this.config.transitionDuration
    };
    
    return { ...this.currentEvolution };
  }

  /**
   * Trigger celebratory state (e.g., after completing a goal)
   */
  public triggerCelebratoryState(reason: string = 'Achievement'): AestheticEvolution {
    return this.evolveToState('celebratory', reason);
  }

  /**
   * Update transition progress
   */
  public updateTransitionProgress(progress: number): AestheticEvolution {
    if (!this.currentEvolution.isTransitioning) {
      return { ...this.currentEvolution };
    }
    
    // Clamp progress between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Interpolate between previous and target states
    const interpolatedState = this.interpolateStates(
      this.currentEvolution.previousState,
      this.currentEvolution.targetState,
      clampedProgress
    );
    
    // Update current evolution
    this.currentEvolution = {
      ...this.currentEvolution,
      currentState: interpolatedState,
      transitionProgress: clampedProgress,
      isTransitioning: clampedProgress < 1
    };
    
    return { ...this.currentEvolution };
  }

  /**
   * Reset to initial state
   */
  public reset(): AestheticEvolution {
    const initialState = DEFAULT_AESTHETIC_STATES[this.config.initialState];
    
    this.currentEvolution = {
      previousState: { ...initialState },
      currentState: { ...initialState },
      targetState: { ...initialState },
      isTransitioning: false,
      transitionProgress: 1,
      transitionDuration: this.config.transitionDuration
    };
    
    this.stateHistory = [{
      state: this.config.initialState,
      timestamp: Date.now(),
      reason: 'Reset'
    }];
    
    this.domainFocus = null;
    this.moodFocus = null;
    
    return { ...this.currentEvolution };
  }

  /**
   * Get state history for debugging
   */
  public getStateHistory(): Array<{ state: EmotionalState; timestamp: number; reason: string }> {
    return [...this.stateHistory];
  }

  /**
   * Interpolate between two aesthetic states
   */
  private interpolateStates(
    startState: AestheticState,
    endState: AestheticState,
    progress: number
  ): AestheticState {
    // Helper function to interpolate colors
    const interpolateColor = (color1: string, color2: string, progress: number): string => {
      // Convert hex to RGB
      const hexToRgb = (hex: string): [number, number, number] => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
      };
      
      // Convert RGB to hex
      const rgbToHex = (r: number, g: number, b: number): string => {
        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
      };
      
      const [r1, g1, b1] = hexToRgb(color1);
      const [r2, g2, b2] = hexToRgb(color2);
      
      const r = r1 + (r2 - r1) * progress;
      const g = g1 + (g2 - g1) * progress;
      const b = b1 + (b2 - b1) * progress;
      
      return rgbToHex(r, g, b);
    };
    
    // Helper function to interpolate numbers
    const interpolateNumber = (n1: number, n2: number, progress: number): number => {
      return n1 + (n2 - n1) * progress;
    };
    
    // Helper function to interpolate strings that represent numbers with units
    const interpolateStringNumber = (s1: string, s2: string, progress: number): string => {
      // Extract number and unit
      const regex = /^([\d.]+)([a-z%]*)$/;
      const match1 = s1.match(regex);
      const match2 = s2.match(regex);
      
      if (!match1 || !match2) return s1;
      
      const n1 = parseFloat(match1[1]);
      const n2 = parseFloat(match2[1]);
      const unit = match1[2]; // Assume units are the same
      
      const interpolated = n1 + (n2 - n1) * progress;
      return `${interpolated}${unit}`;
    };
    
    // Interpolate colors
    const colors: AestheticColors = {
      primary: interpolateColor(startState.colors.primary, endState.colors.primary, progress),
      secondary: interpolateColor(startState.colors.secondary, endState.colors.secondary, progress),
      accent: interpolateColor(startState.colors.accent, endState.colors.accent, progress),
      background: interpolateColor(startState.colors.background, endState.colors.background, progress),
      surface: interpolateColor(startState.colors.surface, endState.colors.surface, progress),
      text: interpolateColor(startState.colors.text, endState.colors.text, progress),
      textSecondary: interpolateColor(startState.colors.textSecondary, endState.colors.textSecondary, progress)
    };
    
    // Interpolate typography
    const typography: AestheticTypography = {
      headingFont: progress < 0.5 ? startState.typography.headingFont : endState.typography.headingFont,
      bodyFont: progress < 0.5 ? startState.typography.bodyFont : endState.typography.bodyFont,
      headingWeight: Math.round(interpolateNumber(startState.typography.headingWeight, endState.typography.headingWeight, progress)),
      headingSize: interpolateStringNumber(startState.typography.headingSize, endState.typography.headingSize, progress),
      bodySize: interpolateStringNumber(startState.typography.bodySize, endState.typography.bodySize, progress),
      letterSpacing: interpolateStringNumber(startState.typography.letterSpacing, endState.typography.letterSpacing, progress),
      lineHeight: interpolateNumber(startState.typography.lineHeight, endState.typography.lineHeight, progress)
    };
    
    // Interpolate spacing
    const spacing: AestheticSpacing = {
      containerPadding: interpolateStringNumber(startState.spacing.containerPadding, endState.spacing.containerPadding, progress),
      elementGap: interpolateStringNumber(startState.spacing.elementGap, endState.spacing.elementGap, progress),
      borderRadius: interpolateStringNumber(startState.spacing.borderRadius, endState.spacing.borderRadius, progress)
    };
    
    // Interpolate effects
    const effects: AestheticEffects = {
      animationDuration: interpolateStringNumber(startState.effects.animationDuration, endState.effects.animationDuration, progress),
      animationEasing: progress < 0.5 ? startState.effects.animationEasing : endState.effects.animationEasing,
      shadowIntensity: progress < 0.5 ? startState.effects.shadowIntensity : endState.effects.shadowIntensity
    };
    
    // Interpolate layout
    const layout: AestheticLayout = {
      maxWidth: interpolateStringNumber(startState.layout.maxWidth, endState.layout.maxWidth, progress),
      verticalSpacing: progress < 0.5 ? startState.layout.verticalSpacing : endState.layout.verticalSpacing
    };
    
    return {
      emotionalState: progress < 0.5 ? startState.emotionalState : endState.emotionalState,
      colors,
      typography,
      spacing,
      effects,
      layout
    };
  }
}

