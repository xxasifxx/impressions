import { ArtEvolutionState, ConsultationResponse } from '@/data/models';

export interface DynamicStyleContext {
  theme: string;
  colorPalette: string[];
  intensity: number;
  transitionClass: string;
  customProperties: Record<string, string>;
}

export class ArtEvolutionManager {
  private static readonly THEME_TRANSITIONS = {
    neutral: ['elegant', 'minimal'],
    elegant: ['vibrant', 'sophisticated'],
    vibrant: ['playful', 'bold'],
    minimal: ['clean', 'modern'],
    sophisticated: ['luxury', 'refined'],
    playful: ['fun', 'energetic'],
    bold: ['dramatic', 'striking'],
    clean: ['fresh', 'simple'],
    modern: ['contemporary', 'sleek'],
    luxury: ['premium', 'exclusive']
  };

  private static readonly COLOR_PALETTES = {
    neutral: ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'],
    elegant: ['#f8f5f0', '#e8ddd4', '#d4c4b0', '#c0a882'],
    vibrant: ['#fff0f5', '#ffe4e6', '#fecaca', '#f87171'],
    minimal: ['#ffffff', '#f9fafb', '#f3f4f6', '#e5e7eb'],
    sophisticated: ['#1f2937', '#374151', '#4b5563', '#6b7280'],
    playful: ['#fef3c7', '#fde68a', '#f59e0b', '#d97706'],
    bold: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'],
    clean: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4'],
    modern: ['#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8'],
    luxury: ['#fdf4ff', '#fae8ff', '#e879f9', '#d946ef']
  };

  static evolveArtStyle(
    currentState: ArtEvolutionState,
    responses: ConsultationResponse[]
  ): ArtEvolutionState {
    const latestResponse = responses[responses.length - 1];
    if (!latestResponse) return currentState;

    // Analyze response to determine evolution direction
    const evolutionTrigger = this.analyzeResponse(latestResponse);
    
    // Determine new theme based on response patterns
    const newTheme = this.selectNewTheme(currentState.currentTheme, evolutionTrigger);
    
    // Calculate new intensity based on user engagement
    const newIntensity = this.calculateIntensity(currentState, responses);
    
    // Select new color palette
    const newColorPalette = this.COLOR_PALETTES[newTheme as keyof typeof this.COLOR_PALETTES] || 
                           this.COLOR_PALETTES.neutral;

    return {
      currentTheme: newTheme,
      evolutionStage: currentState.evolutionStage + 1,
      colorPalette: newColorPalette,
      styleIntensity: newIntensity,
      transitionDirection: this.getTransitionDirection(currentState.currentTheme, newTheme),
      triggers: [...currentState.triggers, evolutionTrigger]
    };
  }

  static generateStyleContext(artState: ArtEvolutionState): DynamicStyleContext {
    const { currentTheme, colorPalette, styleIntensity } = artState;
    
    return {
      theme: currentTheme,
      colorPalette,
      intensity: styleIntensity,
      transitionClass: this.getTransitionClass(artState.transitionDirection),
      customProperties: {
        '--primary-color': colorPalette[0],
        '--secondary-color': colorPalette[1],
        '--accent-color': colorPalette[2],
        '--background-color': colorPalette[0],
        '--text-color': this.getContrastColor(colorPalette[0]),
        '--intensity': styleIntensity.toString(),
        '--border-radius': `${Math.max(0.5, styleIntensity * 0.5)}rem`,
        '--shadow-intensity': `${styleIntensity * 0.1}`,
        '--animation-duration': `${Math.max(0.2, 0.5 / styleIntensity)}s`
      }
    };
  }

  private static analyzeResponse(response: ConsultationResponse): any {
    // Analyze response content to determine art evolution triggers
    const responseValue = response.value;
    const responseText = typeof responseValue === 'string' ? responseValue.toLowerCase() : '';
    
    let category = 'neutral';
    let intensity = 1;
    
    // Categorize response based on content
    if (responseText.includes('elegant') || responseText.includes('sophisticated')) {
      category = 'elegant';
      intensity = 2;
    } else if (responseText.includes('bold') || responseText.includes('dramatic')) {
      category = 'bold';
      intensity = 3;
    } else if (responseText.includes('fun') || responseText.includes('playful')) {
      category = 'playful';
      intensity = 2.5;
    } else if (responseText.includes('minimal') || responseText.includes('simple')) {
      category = 'minimal';
      intensity = 1;
    } else if (responseText.includes('luxury') || responseText.includes('premium')) {
      category = 'luxury';
      intensity = 2.5;
    }

    return {
      responsePattern: category,
      themeShift: category,
      intensity,
      duration: 300
    };
  }

  private static selectNewTheme(currentTheme: string, trigger: any): string {
    const possibleTransitions = this.THEME_TRANSITIONS[currentTheme as keyof typeof this.THEME_TRANSITIONS];
    
    if (!possibleTransitions) {
      return trigger.themeShift || currentTheme;
    }

    // Select theme based on trigger or random from possible transitions
    if (trigger.themeShift && possibleTransitions.includes(trigger.themeShift)) {
      return trigger.themeShift;
    }

    return possibleTransitions[Math.floor(Math.random() * possibleTransitions.length)];
  }

  private static calculateIntensity(
    currentState: ArtEvolutionState,
    responses: ConsultationResponse[]
  ): number {
    const baseIntensity = currentState.styleIntensity;
    const responseCount = responses.length;
    
    // Increase intensity as user progresses through consultation
    const progressIntensity = Math.min(3, 1 + (responseCount * 0.1));
    
    // Factor in recent response patterns
    const recentResponses = responses.slice(-3);
    const engagementBoost = recentResponses.length * 0.1;
    
    return Math.min(3, Math.max(1, baseIntensity + progressIntensity + engagementBoost));
  }

  private static getTransitionDirection(oldTheme: string, newTheme: string): 'subtle' | 'moderate' | 'dramatic' {
    if (oldTheme === newTheme) return 'subtle';
    
    const themeDistance = this.calculateThemeDistance(oldTheme, newTheme);
    
    if (themeDistance <= 1) return 'subtle';
    if (themeDistance <= 2) return 'moderate';
    return 'dramatic';
  }

  private static calculateThemeDistance(theme1: string, theme2: string): number {
    // Simple distance calculation based on theme categories
    const themeCategories = {
      neutral: 0, minimal: 0, clean: 0,
      elegant: 1, sophisticated: 1, modern: 1,
      vibrant: 2, playful: 2, bold: 2,
      luxury: 3, dramatic: 3, striking: 3
    };
    
    const distance1 = themeCategories[theme1 as keyof typeof themeCategories] || 0;
    const distance2 = themeCategories[theme2 as keyof typeof themeCategories] || 0;
    
    return Math.abs(distance1 - distance2);
  }

  private static getTransitionClass(direction: 'subtle' | 'moderate' | 'dramatic'): string {
    switch (direction) {
      case 'subtle': return 'transition-all duration-300 ease-in-out';
      case 'moderate': return 'transition-all duration-500 ease-in-out';
      case 'dramatic': return 'transition-all duration-700 ease-in-out';
      default: return 'transition-all duration-300 ease-in-out';
    }
  }

  private static getContrastColor(backgroundColor: string): string {
    // Simple contrast color calculation
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}

