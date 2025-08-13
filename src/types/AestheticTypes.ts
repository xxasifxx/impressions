/**
 * Types for the aesthetic evolution system
 */

// Emotional states that drive aesthetic evolution
export type EmotionalState = 'uncertain' | 'exploring' | 'engaged' | 'confident' | 'celebratory';

// Color palette for an aesthetic state
export interface AestheticColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

// Typography settings for an aesthetic state
export interface AestheticTypography {
  headingFont: string;
  bodyFont: string;
  headingWeight: number;
  headingSize: string;
  bodySize: string;
  letterSpacing: string;
  lineHeight: number;
}

// Spacing settings for an aesthetic state
export interface AestheticSpacing {
  containerPadding: string;
  elementGap: string;
  borderRadius: string;
}

// Animation and effects settings
export interface AestheticEffects {
  animationDuration: string;
  animationEasing: string;
  shadowIntensity: 'none' | 'light' | 'medium' | 'strong';
}

// Layout settings
export interface AestheticLayout {
  maxWidth: string;
  verticalSpacing: 'compact' | 'default' | 'spacious';
}

// Complete aesthetic state
export interface AestheticState {
  emotionalState: EmotionalState;
  colors: AestheticColors;
  typography: AestheticTypography;
  spacing: AestheticSpacing;
  effects: AestheticEffects;
  layout: AestheticLayout;
}

// Aesthetic evolution state
export interface AestheticEvolution {
  previousState: AestheticState;
  currentState: AestheticState;
  targetState: AestheticState;
  isTransitioning: boolean;
  transitionProgress: number;
  transitionDuration: number;
}

// Configuration for the aesthetic evolution engine
export interface AestheticEvolutionConfig {
  initialState: EmotionalState;
  transitionDuration: number;
  enableDomainAdaptation: boolean;
  enableMoodAdaptation: boolean;
}

