# Phase 5: Aesthetic Evolution System Enhancement

## Overview

This phase focuses on refining the aesthetic evolution system to ensure visual consistency throughout the entire user journey. As users progress through the consultation, the UI should subtly adapt to their emerging style preferences, and this aesthetic should carry through to the results page and booking flow.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Phase 4 (State Management)

## Objectives

1. Define clear visual transitions between aesthetic states
2. Create a system for applying aesthetic changes consistently across components
3. Implement smooth transitions between aesthetic states
4. Ensure aesthetic preferences persist across page navigations
5. Add CSS tokens for consistent styling throughout the application

## Detailed Tasks

### 1. Aesthetic Tokens CSS

- [ ] Create `aesthetic-tokens.css` with CSS custom properties
- [ ] Define token sets for different emotional states
- [ ] Create mixins or utility classes for common patterns
- [ ] Implement responsive adjustments for tokens
- [ ] Add documentation for token usage

### 2. Aesthetic Provider Enhancement

- [ ] Enhance `AestheticProvider.tsx` with improved state management
- [ ] Add support for theme persistence across page loads
- [ ] Implement context for providing aesthetic state to components
- [ ] Create smooth transition mechanism between states
- [ ] Add support for domain-specific aesthetic adjustments

### 3. Aesthetic Evolution Engine Refinement

- [ ] Refine `AestheticEvolutionEngine.ts` with improved algorithms
- [ ] Add support for more granular state transitions
- [ ] Implement interpolation between aesthetic states
- [ ] Create more sophisticated emotional state detection
- [ ] Add support for user preference overrides

### 4. Component Integration

- [ ] Update key components to consume aesthetic context
- [ ] Create higher-order component for aesthetic integration
- [ ] Implement consistent styling patterns across components
- [ ] Add animation transitions for state changes
- [ ] Ensure accessibility across all aesthetic states

### 5. Cross-Page Consistency

- [ ] Implement aesthetic state transfer between pages
- [ ] Create page transition effects that maintain aesthetic
- [ ] Add aesthetic initialization based on URL parameters
- [ ] Ensure consistent loading states with current aesthetic
- [ ] Create fallback aesthetics for error states

### 6. Testing and Refinement

- [ ] Create visual regression tests for aesthetic states
- [ ] Implement A/B testing capability for aesthetic variations
- [ ] Add performance monitoring for transitions
- [ ] Create documentation for aesthetic system
- [ ] Build a demo/playground for aesthetic exploration

## Technical Considerations

### Aesthetic Tokens Structure

The CSS tokens should support all aesthetic states:

```css
/* Base tokens */
:root {
  /* Neutral state - default */
  --color-primary: #6B7280;
  --color-secondary: #9CA3AF;
  --color-accent: #4B5563;
  --color-background: #F9FAFB;
  --color-surface: #F3F4F6;
  --color-text: #1F2937;
  --color-text-secondary: #4B5563;
  
  --font-heading: 'system-ui, sans-serif';
  --font-body: 'system-ui, sans-serif';
  --font-weight-heading: 400;
  --font-size-heading: 1.5rem;
  --font-size-body: 0.875rem;
  --letter-spacing: 0.025em;
  --line-height: 1.5;
  
  --container-padding: 1rem;
  --element-gap: 0.75rem;
  --border-radius: 0.375rem;
  
  --animation-duration: 0.4s;
  --animation-easing: ease-in-out;
  --shadow-intensity: light;
}

/* Emotional state variations */
.aesthetic-state-exploring {
  --color-primary: #4F46E5;
  --color-secondary: #818CF8;
  --color-accent: #6366F1;
  --color-background: #F5F7FF;
  --color-surface: #EEF2FF;
  --color-text: #1E1B4B;
  --color-text-secondary: #4338CA;
  
  --font-weight-heading: 500;
  --font-size-heading: 1.75rem;
  --font-size-body: 0.9rem;
  --letter-spacing: 0.015em;
  --line-height: 1.6;
  
  --container-padding: 1.25rem;
  --element-gap: 1rem;
  --border-radius: 0.5rem;
  
  --animation-duration: 0.5s;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --shadow-intensity: medium;
}

/* Additional emotional states... */

/* Domain-specific overrides */
.aesthetic-service-hair-salon {
  --color-primary: #E11D48;
  --color-secondary: #FB7185;
  --color-accent: #BE123C;
}

.aesthetic-service-makeup-studio {
  --color-primary: #D946EF;
  --color-secondary: #E879F9;
  --color-accent: #C026D3;
}

.aesthetic-service-med-spa {
  --color-primary: #14B8A6;
  --color-secondary: #2DD4BF;
  --color-accent: #0D9488;
}
```

### Aesthetic Provider Implementation

The provider should handle transitions smoothly:

```typescript
interface AestheticProviderProps {
  children: React.ReactNode;
  initialState?: EmotionalState;
  consultationProgress?: number;
  currentServiceCategory?: string;
}

export const AestheticProvider: React.FC<AestheticProviderProps> = ({
  children,
  initialState = 'uncertain',
  consultationProgress = 0,
  currentServiceCategory
}) => {
  // Load persisted state or use initial
  const [aestheticState, setAestheticState] = useState<AestheticState>(() => {
    return loadAestheticState() || getStateForEmotion(initialState);
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Update state based on consultation progress
  useEffect(() => {
    if (consultationProgress > 0.75) {
      transitionToState('confident');
    } else if (consultationProgress > 0.5) {
      transitionToState('engaged');
    } else if (consultationProgress > 0.25) {
      transitionToState('exploring');
    }
  }, [consultationProgress]);
  
  // Smooth transition between states
  const transitionToState = useCallback((newState: EmotionalState) => {
    if (aestheticState.emotionalState === newState) return;
    
    setIsTransitioning(true);
    
    // Start with current state
    const startState = { ...aestheticState };
    // Target new state
    const targetState = getStateForEmotion(newState);
    
    // Animate transition
    const startTime = performance.now();
    const duration = 600; // ms
    
    const animateTransition = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Interpolate between states
      const currentState = interpolateStates(startState, targetState, progress);
      setAestheticState(currentState);
      
      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        setIsTransitioning(false);
        // Save final state
        saveAestheticState(targetState);
      }
    };
    
    requestAnimationFrame(animateTransition);
  }, [aestheticState]);
  
  // Generate CSS variables from current state
  const cssVariables = useMemo(() => {
    return {
      '--color-primary': aestheticState.colors.primary,
      '--color-secondary': aestheticState.colors.secondary,
      '--color-accent': aestheticState.colors.accent,
      '--color-background': aestheticState.colors.background,
      '--color-surface': aestheticState.colors.surface,
      '--color-text': aestheticState.colors.text,
      '--color-text-secondary': aestheticState.colors.textSecondary,
      
      '--font-weight-heading': aestheticState.typography.headingWeight,
      '--font-size-heading': aestheticState.typography.headingSize,
      '--font-size-body': aestheticState.typography.bodySize,
      '--letter-spacing': aestheticState.typography.letterSpacing,
      '--line-height': aestheticState.typography.lineHeight,
      
      '--container-padding': aestheticState.spacing.containerPadding,
      '--element-gap': aestheticState.spacing.elementGap,
      '--border-radius': aestheticState.spacing.borderRadius,
      
      '--animation-duration': aestheticState.effects.animationDuration,
      '--animation-easing': aestheticState.effects.animationEasing,
    } as React.CSSProperties;
  }, [aestheticState]);
  
  // Combine class names for current state
  const classNames = [
    `aesthetic-state-${aestheticState.emotionalState}`,
    currentServiceCategory ? `aesthetic-service-${currentServiceCategory}` : '',
    isTransitioning ? 'aesthetic-transitioning' : ''
  ].filter(Boolean).join(' ');
  
  return (
    <AestheticContext.Provider value={{ 
      state: aestheticState, 
      isTransitioning,
      transitionToState,
      currentServiceCategory
    }}>
      <div className={classNames} style={cssVariables}>
        {children}
      </div>
    </AestheticContext.Provider>
  );
};
```

### Interpolation Between States

For smooth transitions, implement state interpolation:

```typescript
function interpolateStates(
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
  
  // Interpolate all properties
  return {
    emotionalState: progress < 0.5 ? startState.emotionalState : endState.emotionalState,
    colors: {
      primary: interpolateColor(startState.colors.primary, endState.colors.primary, progress),
      secondary: interpolateColor(startState.colors.secondary, endState.colors.secondary, progress),
      accent: interpolateColor(startState.colors.accent, endState.colors.accent, progress),
      background: interpolateColor(startState.colors.background, endState.colors.background, progress),
      surface: interpolateColor(startState.colors.surface, endState.colors.surface, progress),
      text: interpolateColor(startState.colors.text, endState.colors.text, progress),
      textSecondary: interpolateColor(startState.colors.textSecondary, endState.colors.textSecondary, progress)
    },
    // Interpolate other properties similarly...
  };
}
```

## Deliverables

1. `src/styles/aesthetic-tokens.css` - CSS variables for theming
2. `src/components/ConsultationModal/AestheticProvider.tsx` - Enhanced provider
3. `src/hooks/useAestheticEvolution.ts` - Improved hook for aesthetic state
4. `src/engine/AestheticEvolutionEngine.ts` - Refined evolution engine
5. `src/components/AestheticWrapper.tsx` - HOC for component integration

## Testing Criteria

1. **Visual Testing:**
   - All aesthetic states render correctly
   - Transitions between states are smooth
   - Components maintain consistent styling across states
   - Domain-specific overrides apply correctly

2. **Functional Testing:**
   - State transitions trigger at appropriate consultation progress points
   - Aesthetic persists across page navigations
   - Components respond appropriately to aesthetic changes
   - Fallback aesthetics apply when needed

3. **Performance Testing:**
   - Transitions are smooth without jank
   - CSS variable updates don't cause layout thrashing
   - Memory usage remains stable during transitions
   - Animation frame rate stays high during transitions

4. **Accessibility Testing:**
   - Color contrast meets WCAG standards in all states
   - Text remains readable across all aesthetic variations
   - Focus states are visible in all aesthetic states
   - Animations respect reduced motion preferences

## Next Steps

After completing this phase, we will move on to Phase 6: Recommendation Engine & Benefit Categorization, which will enhance the recommendation system to provide benefit-based suggestions across domains.

