/**
 * Emotional States - Visual design tokens for each emotional state
 * 
 * Maps emotional states to specific visual aesthetics that resonate with
 * user psychology and amplify their emotional journey through consultation.
 */

import { AestheticState, EmotionalState, ConsultationMood, ServiceEmotion } from '../types/AestheticTypes';

// Base color palette for beauty industry
const BEAUTY_PALETTE = {
  // Neutrals - Professional, calming
  pearl: '#F8F6F3',
  champagne: '#F7E7CE', 
  taupe: '#D4C4B0',
  charcoal: '#2C2C2C',
  
  // Warm tones - Confidence, transformation
  rose: '#E8B4B8',
  coral: '#FF6B6B',
  gold: '#D4AF37',
  bronze: '#CD7F32',
  
  // Cool tones - Rejuvenation, clarity
  sage: '#9CAF88',
  lavender: '#B19CD9',
  mint: '#98D8C8',
  steel: '#708090',
  
  // Luxury tones - Celebration, premium
  burgundy: '#800020',
  emerald: '#50C878',
  sapphire: '#0F52BA',
  platinum: '#E5E4E2'
};

// Typography scales for different emotional intensities
const TYPOGRAPHY_SCALES = {
  subtle: {
    headingWeight: 400,
    headingSize: '1.5rem',
    bodySize: '0.95rem',
    letterSpacing: '0.01em',
    lineHeight: 1.5
  },
  balanced: {
    headingWeight: 500,
    headingSize: '1.75rem', 
    bodySize: '1rem',
    letterSpacing: '0em',
    lineHeight: 1.6
  },
  confident: {
    headingWeight: 600,
    headingSize: '2rem',
    bodySize: '1.05rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.4
  },
  bold: {
    headingWeight: 700,
    headingSize: '2.25rem',
    bodySize: '1.1rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.3
  }
};

/**
 * UNCERTAIN STATE - Initial consultation entry
 * Calming, professional, non-intimidating
 */
export const UNCERTAIN_STATE: AestheticState = {
  id: 'uncertain',
  emotionalState: 'uncertain',
  mood: 'professional',
  
  colors: {
    primary: BEAUTY_PALETTE.taupe,
    secondary: BEAUTY_PALETTE.pearl,
    accent: BEAUTY_PALETTE.sage,
    background: '#FEFEFE',
    surface: BEAUTY_PALETTE.pearl,
    text: BEAUTY_PALETTE.charcoal,
    textSecondary: '#666666'
  },
  
  typography: TYPOGRAPHY_SCALES.subtle,
  
  spacing: {
    containerPadding: '2rem',
    elementGap: '1.5rem',
    borderRadius: '8px'
  },
  
  effects: {
    shadowIntensity: 'subtle',
    blurAmount: '0px',
    gradientIntensity: 0.1,
    animationDuration: '0.3s',
    animationEasing: 'ease-out'
  },
  
  layout: {
    maxWidth: '480px',
    contentAlignment: 'center',
    verticalSpacing: 'comfortable'
  }
};

/**
 * EXPLORING STATE - Discovery and learning phase
 * Inspiring, open, possibility-focused
 */
export const EXPLORING_STATE: AestheticState = {
  id: 'exploring',
  emotionalState: 'exploring',
  mood: 'exploratory',
  
  colors: {
    primary: BEAUTY_PALETTE.sage,
    secondary: BEAUTY_PALETTE.mint,
    accent: BEAUTY_PALETTE.coral,
    background: '#FAFBFC',
    surface: '#FFFFFF',
    text: BEAUTY_PALETTE.charcoal,
    textSecondary: '#555555'
  },
  
  typography: TYPOGRAPHY_SCALES.balanced,
  
  spacing: {
    containerPadding: '2.5rem',
    elementGap: '2rem',
    borderRadius: '12px'
  },
  
  effects: {
    shadowIntensity: 'medium',
    blurAmount: '1px',
    gradientIntensity: 0.3,
    animationDuration: '0.4s',
    animationEasing: 'ease-in-out'
  },
  
  layout: {
    maxWidth: '520px',
    contentAlignment: 'center',
    verticalSpacing: 'comfortable'
  }
};

/**
 * ENGAGED STATE - Active participation and choice-making
 * Dynamic, interactive, empowering
 */
export const ENGAGED_STATE: AestheticState = {
  id: 'engaged',
  emotionalState: 'engaged',
  mood: 'transformative',
  
  colors: {
    primary: BEAUTY_PALETTE.coral,
    secondary: BEAUTY_PALETTE.rose,
    accent: BEAUTY_PALETTE.gold,
    background: '#F9F7F4',
    surface: '#FFFFFF',
    text: BEAUTY_PALETTE.charcoal,
    textSecondary: '#444444'
  },
  
  typography: TYPOGRAPHY_SCALES.confident,
  
  spacing: {
    containerPadding: '3rem',
    elementGap: '2.5rem',
    borderRadius: '16px'
  },
  
  effects: {
    shadowIntensity: 'medium',
    blurAmount: '2px',
    gradientIntensity: 0.5,
    animationDuration: '0.5s',
    animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  layout: {
    maxWidth: '560px',
    contentAlignment: 'center',
    verticalSpacing: 'spacious'
  }
};

/**
 * CONFIDENT STATE - Clear decision-making
 * Sophisticated, premium, empowering
 */
export const CONFIDENT_STATE: AestheticState = {
  id: 'confident',
  emotionalState: 'confident',
  mood: 'professional',
  serviceEmotion: 'confidence',
  
  colors: {
    primary: BEAUTY_PALETTE.charcoal,
    secondary: BEAUTY_PALETTE.gold,
    accent: BEAUTY_PALETTE.emerald,
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: BEAUTY_PALETTE.charcoal,
    textSecondary: '#333333'
  },
  
  typography: TYPOGRAPHY_SCALES.confident,
  
  spacing: {
    containerPadding: '3.5rem',
    elementGap: '3rem',
    borderRadius: '20px'
  },
  
  effects: {
    shadowIntensity: 'strong',
    blurAmount: '3px',
    gradientIntensity: 0.7,
    animationDuration: '0.6s',
    animationEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  },
  
  layout: {
    maxWidth: '600px',
    contentAlignment: 'center',
    verticalSpacing: 'spacious'
  }
};

/**
 * CELEBRATORY STATE - Cart/booking moment
 * Luxurious, exciting, anticipatory
 */
export const CELEBRATORY_STATE: AestheticState = {
  id: 'celebratory',
  emotionalState: 'celebratory',
  mood: 'glamorous',
  serviceEmotion: 'glamour',
  
  colors: {
    primary: BEAUTY_PALETTE.burgundy,
    secondary: BEAUTY_PALETTE.gold,
    accent: BEAUTY_PALETTE.platinum,
    background: 'linear-gradient(135deg, #F8F6F3 0%, #F7E7CE 100%)',
    surface: '#FFFFFF',
    text: BEAUTY_PALETTE.charcoal,
    textSecondary: '#2C2C2C'
  },
  
  typography: TYPOGRAPHY_SCALES.bold,
  
  spacing: {
    containerPadding: '4rem',
    elementGap: '3.5rem',
    borderRadius: '24px'
  },
  
  effects: {
    shadowIntensity: 'strong',
    blurAmount: '4px',
    gradientIntensity: 1.0,
    animationDuration: '0.8s',
    animationEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  layout: {
    maxWidth: '640px',
    contentAlignment: 'center',
    verticalSpacing: 'spacious'
  }
};

// Service-specific aesthetic variations
export const SERVICE_AESTHETIC_MODIFIERS = {
  // Hair services - Transformation focus
  hair: {
    colorShift: { accent: BEAUTY_PALETTE.bronze },
    serviceEmotion: 'transformation' as ServiceEmotion
  },
  
  // Makeup services - Confidence focus  
  makeup: {
    colorShift: { accent: BEAUTY_PALETTE.coral },
    serviceEmotion: 'confidence' as ServiceEmotion
  },
  
  // Skincare services - Renewal focus
  skincare: {
    colorShift: { accent: BEAUTY_PALETTE.mint },
    serviceEmotion: 'renewal' as ServiceEmotion
  },
  
  // Brow services - Polish focus
  brows: {
    colorShift: { accent: BEAUTY_PALETTE.taupe },
    serviceEmotion: 'polish' as ServiceEmotion
  },
  
  // Lash services - Glamour focus
  lashes: {
    colorShift: { accent: BEAUTY_PALETTE.sapphire },
    serviceEmotion: 'glamour' as ServiceEmotion
  }
};

// Mood-based aesthetic adjustments
export const MOOD_AESTHETIC_ADJUSTMENTS = {
  urgent: {
    animationDuration: '0.2s',
    spacing: { containerPadding: '1.5rem', elementGap: '1rem' },
    layout: { verticalSpacing: 'compact' as const }
  },
  
  rejuvenating: {
    colors: { 
      primary: BEAUTY_PALETTE.sage,
      accent: BEAUTY_PALETTE.mint 
    },
    effects: { shadowIntensity: 'subtle' as const }
  },
  
  glamorous: {
    colors: {
      accent: BEAUTY_PALETTE.gold,
      secondary: BEAUTY_PALETTE.platinum
    },
    effects: { 
      shadowIntensity: 'strong' as const,
      gradientIntensity: 0.8 
    }
  }
};

// Export all aesthetic states for easy access
export const AESTHETIC_STATES = {
  uncertain: UNCERTAIN_STATE,
  exploring: EXPLORING_STATE,
  engaged: ENGAGED_STATE,
  confident: CONFIDENT_STATE,
  celebratory: CELEBRATORY_STATE
} as const;

// Helper function to get aesthetic state by emotional state
export function getAestheticState(emotionalState: EmotionalState): AestheticState {
  return AESTHETIC_STATES[emotionalState];
}

// Helper function to apply service-specific modifications
export function applyServiceModifications(
  baseState: AestheticState, 
  serviceCategory: string
): AestheticState {
  const modifier = SERVICE_AESTHETIC_MODIFIERS[serviceCategory as keyof typeof SERVICE_AESTHETIC_MODIFIERS];
  if (!modifier) return baseState;
  
  return {
    ...baseState,
    colors: {
      ...baseState.colors,
      ...modifier.colorShift
    },
    serviceEmotion: modifier.serviceEmotion
  };
}

// Helper function to apply mood-based adjustments
export function applyMoodAdjustments(
  baseState: AestheticState,
  mood: ConsultationMood
): AestheticState {
  const adjustment = MOOD_AESTHETIC_ADJUSTMENTS[mood as keyof typeof MOOD_AESTHETIC_ADJUSTMENTS];
  if (!adjustment) return baseState;
  
  return {
    ...baseState,
    colors: adjustment.colors ? { ...baseState.colors, ...adjustment.colors } : baseState.colors,
    spacing: adjustment.spacing ? { ...baseState.spacing, ...adjustment.spacing } : baseState.spacing,
    effects: adjustment.effects ? { ...baseState.effects, ...adjustment.effects } : baseState.effects,
    layout: adjustment.layout ? { ...baseState.layout, ...adjustment.layout } : baseState.layout
  };
}

