# Phase 4: Aesthetic Evolution Consistency

## Overview

This phase focuses on ensuring visual consistency throughout the user journey by extending the existing aesthetic evolution system. The goal is to create a seamless visual experience that evolves based on user interactions, maintaining continuity from consultation to results to booking.

## Timeline

**Duration:** 1.5 weeks
**Dependencies:** Phase 3 (State Management), existing AestheticProvider

## Objectives

1. Extend the aesthetic evolution system to all journey pages
2. Create consistent transition patterns between journey stages
3. Implement domain-specific visual adaptations
4. Ensure responsive behavior across all components
5. Add visual feedback for user interactions

## Current State Analysis

The current aesthetic evolution system (`AestheticProvider.tsx`, `AestheticEvolutionEngine.ts`) is sophisticated but has limited scope:
- Primarily used within the consultation modal
- Limited integration with other journey pages
- Transitions between pages don't maintain aesthetic state
- Inconsistent application across components
- Limited responsive behavior

## Detailed Tasks

### 1. Global Aesthetic Provider

- [ ] Create `GlobalAestheticProvider.tsx` to wrap the entire application
- [ ] Implement state persistence for aesthetic evolution
- [ ] Add synchronization with consultation state
- [ ] Create smooth transitions between pages
- [ ] Implement domain-specific overrides

**Global Provider Implementation:**
```typescript
interface GlobalAestheticProviderProps {
  children: React.ReactNode;
}

export const GlobalAestheticProvider: React.FC<GlobalAestheticProviderProps> = ({ 
  children 
}) => {
  // Get consultation state
  const { state: consultationState } = useConsultationState();
  
  // Determine current emotional state based on journey progress
  const determineEmotionalState = (): EmotionalState => {
    if (!consultationState) return 'uncertain';
    
    if (consultationState.isComplete) {
      return 'confident';
    }
    
    const progress = consultationState.progress;
    
    if (progress > 0.75) return 'engaged';
    if (progress > 0.5) return 'exploring';
    if (progress > 0.25) return 'uncertain';
    
    return 'uncertain';
  };
  
  // Determine current domain focus
  const determineDomainFocus = (): string | undefined => {
    if (!consultationState) return undefined;
    
    // Extract domain focus from responses
    // Implementation details...
    
    return domainFocus;
  };
  
  // Current state values
  const emotionalState = determineEmotionalState();
  const domainFocus = determineDomainFocus();
  
  return (
    <AestheticProvider
      options={{
        initialState: emotionalState,
        enableDomainAdaptation: true,
        enableMoodAdaptation: true
      }}
      consultationProgress={consultationState?.progress || 0}
      currentServiceCategory={domainFocus}
    >
      {children}
    </AestheticProvider>
  );
};
```

### 2. Page Transition System

- [ ] Create `PageTransition.tsx` component for animated page transitions
- [ ] Implement aesthetic-aware transition effects
- [ ] Add state persistence during transitions
- [ ] Create domain-specific transition variations
- [ ] Ensure accessibility during transitions

**Page Transition Component:**
```typescript
interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  location
}) => {
  // Get aesthetic context
  const aesthetic = useAestheticContext();
  
  // Animation configuration based on aesthetic state
  const getAnimationConfig = () => {
    const { currentState, isTransitioning } = aesthetic;
    
    // Base configuration
    const config = {
      duration: parseFloat(currentState.effects.animationDuration) * 1000,
      easing: currentState.effects.animationEasing
    };
    
    // Adjust based on emotional state
    switch (currentState.emotionalState) {
      case 'uncertain':
        return { ...config, duration: config.duration * 0.8 };
      case 'exploring':
        return { ...config, duration: config.duration * 0.9 };
      case 'engaged':
        return config;
      case 'confident':
        return { ...config, duration: config.duration * 1.1 };
      case 'celebratory':
        return { ...config, duration: config.duration * 1.2 };
      default:
        return config;
    }
  };
  
  // Animation configuration
  const animationConfig = getAnimationConfig();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={animationConfig}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
```

### 3. Aesthetic-Aware Components

- [ ] Create `withAestheticStyles.tsx` HOC for component styling
- [ ] Implement `useAestheticStyles` hook for custom components
- [ ] Add aesthetic-aware variants to UI components
- [ ] Create consistent animation patterns
- [ ] Implement responsive behavior based on aesthetic state

**Aesthetic HOC and Hook:**
```typescript
// Higher-order component for aesthetic styling
export function withAestheticStyles<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    applyToContainer?: boolean;
    adaptToDomain?: boolean;
    adaptToMood?: boolean;
  }
) {
  const WrappedComponent = (props: P) => {
    const aesthetic = useAestheticContext();
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Apply styles to container if requested
    useEffect(() => {
      if (options?.applyToContainer && containerRef.current) {
        aesthetic.applyToElement(
          containerRef.current,
          options.adaptToDomain ? undefined : null,
          options.adaptToMood ? undefined : null
        );
      }
    }, [aesthetic.evolution.currentState]);
    
    // Get styles for component
    const { className, style } = useAestheticStyles(
      aesthetic.evolution,
      options?.adaptToDomain ? undefined : null,
      options?.adaptToMood ? undefined : null
    );
    
    // Enhanced props with aesthetic information
    const enhancedProps = {
      ...props,
      aesthetic,
      aestheticClassName: className,
      aestheticStyle: style
    } as P & {
      aesthetic: AestheticContextValue;
      aestheticClassName: string;
      aestheticStyle: React.CSSProperties;
    };
    
    return options?.applyToContainer ? (
      <div ref={containerRef}>
        <Component {...enhancedProps} />
      </div>
    ) : (
      <Component {...enhancedProps} />
    );
  };
  
  WrappedComponent.displayName = `withAestheticStyles(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Hook for custom components
export function useAestheticComponent<T extends HTMLElement = HTMLDivElement>(
  options?: {
    adaptToDomain?: boolean;
    adaptToMood?: boolean;
  }
) {
  const aesthetic = useAestheticContext();
  const ref = useRef<T>(null);
  
  // Apply styles when ref or aesthetic changes
  useEffect(() => {
    if (ref.current) {
      aesthetic.applyToElement(
        ref.current,
        options?.adaptToDomain ? undefined : null,
        options?.adaptToMood ? undefined : null
      );
    }
    
    return () => {
      if (ref.current) {
        aesthetic.removeFromElement(ref.current);
      }
    };
  }, [aesthetic.evolution.currentState, ref.current]);
  
  // Get styles for component
  const { className, style } = useAestheticStyles(
    aesthetic.evolution,
    options?.adaptToDomain ? undefined : null,
    options?.adaptToMood ? undefined : null
  );
  
  return { ref, className, style, aesthetic };
}
```

### 4. Journey Page Enhancements

- [ ] Update `PersonalizedResultsPage.tsx` with aesthetic integration
- [ ] Enhance `BookingPage.tsx` with aesthetic continuity
- [ ] Add aesthetic transitions to `ServiceDetailModal.tsx`
- [ ] Implement domain-specific styling for service cards
- [ ] Create consistent header and footer styling

**Results Page Enhancement:**
```typescript
const PersonalizedResultsPage: React.FC = () => {
  // Get consultation results
  const { state: consultationState } = useConsultationState();
  
  // Get aesthetic context
  const aesthetic = useAestheticContext();
  
  // Trigger confident state when viewing results
  useEffect(() => {
    if (aesthetic.currentState.emotionalState !== 'confident') {
      aesthetic.evolveToState('confident', 'Viewing personalized results');
    }
  }, []);
  
  // Apply domain-specific styling based on primary recommendations
  useEffect(() => {
    if (consultationState?.recommendations) {
      // Determine primary domain from recommendations
      const domains = new Set<string>();
      
      consultationState.recommendations.primaryServices.forEach(service => {
        domains.add(service.domain);
      });
      
      // Set domain focus if there's a clear primary domain
      if (domains.size === 1) {
        const [primaryDomain] = domains;
        aesthetic.setDomainFocus(primaryDomain);
      }
    }
  }, [consultationState?.recommendations]);
  
  // Rest of component implementation...
};

// Apply aesthetic styles to the page
export default withAestheticStyles(PersonalizedResultsPage, {
  applyToContainer: true,
  adaptToDomain: true
});
```

### 5. Responsive Aesthetic Behavior

- [ ] Create `useResponsiveAesthetic.ts` hook for responsive styling
- [ ] Implement breakpoint-specific aesthetic variations
- [ ] Add device-specific animation patterns
- [ ] Create touch-friendly interaction styles
- [ ] Implement orientation-aware layouts

**Responsive Aesthetic Hook:**
```typescript
export function useResponsiveAesthetic() {
  const aesthetic = useAestheticContext();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  
  // Get responsive style variations
  const getResponsiveStyles = () => {
    const baseStyles = useAestheticStyles(
      aesthetic.evolution,
      undefined,
      undefined
    );
    
    // Mobile-specific adjustments
    if (isMobile) {
      return {
        ...baseStyles,
        style: {
          ...baseStyles.style,
          '--aesthetic-container-padding': '0.75rem',
          '--aesthetic-element-gap': '0.5rem',
          '--aesthetic-font-size-heading': 'calc(1em * 0.85)',
          '--aesthetic-font-size-body': 'calc(1em * 0.9)'
        } as React.CSSProperties
      };
    }
    
    // Tablet-specific adjustments
    if (isTablet) {
      return {
        ...baseStyles,
        style: {
          ...baseStyles.style,
          '--aesthetic-container-padding': '1.25rem',
          '--aesthetic-element-gap': '0.75rem'
        } as React.CSSProperties
      };
    }
    
    // Desktop (default)
    return baseStyles;
  };
  
  // Get responsive animation durations
  const getResponsiveAnimationDuration = () => {
    const baseDuration = parseFloat(aesthetic.currentState.effects.animationDuration);
    
    if (isMobile) return `${baseDuration * 0.8}s`;
    if (isTablet) return `${baseDuration * 0.9}s`;
    
    return `${baseDuration}s`;
  };
  
  return {
    ...aesthetic,
    responsiveStyles: getResponsiveStyles(),
    responsiveAnimationDuration: getResponsiveAnimationDuration(),
    isMobile,
    isTablet,
    isDesktop
  };
}
```

## Technical Considerations

### Performance Optimization

- Use CSS variables for efficient style updates
- Implement will-change for animated properties
- Optimize transitions for GPU acceleration
- Use passive event listeners for scroll events
- Implement throttling for resize handlers

### Accessibility

- Ensure animations respect reduced motion preferences
- Maintain sufficient color contrast during transitions
- Provide focus indicators that adapt to aesthetic state
- Ensure keyboard navigation works with transitions
- Add ARIA attributes for dynamic content

### Cross-Browser Compatibility

- Test transitions in all major browsers
- Implement fallbacks for unsupported features
- Use feature detection for advanced animations
- Ensure consistent behavior across platforms
- Add polyfills for older browsers

## Deliverables

1. `src/contexts/GlobalAestheticProvider.tsx` - Application-wide provider
2. `src/components/PageTransition.tsx` - Aesthetic-aware transitions
3. `src/hooks/useAestheticComponent.ts` - Enhanced styling hook
4. `src/hooks/useResponsiveAesthetic.ts` - Responsive styling hook
5. Updated journey pages with aesthetic integration

## Testing Criteria

1. **Visual Consistency Testing:**
   - Aesthetic state persists across page transitions
   - Visual elements adapt consistently to state changes
   - Domain-specific styling is applied correctly
   - Transitions between states are smooth
   - Responsive behavior works on all screen sizes

2. **Performance Testing:**
   - Transitions run at 60fps
   - Style updates don't cause layout thrashing
   - Memory usage remains stable during transitions
   - No jank during page navigation
   - Animations are efficient on mobile devices

3. **Accessibility Testing:**
   - Respects reduced motion preferences
   - Maintains sufficient color contrast
   - Focus indicators are visible in all states
   - Screen readers announce state changes
   - Keyboard navigation works during transitions

4. **Cross-Browser Testing:**
   - Works consistently across Chrome, Firefox, Safari
   - Degrades gracefully in older browsers
   - Responsive behavior works on all platforms
   - Touch interactions work on mobile devices
   - High-DPI displays render correctly

## Next Steps

After completing this phase, we will move on to Phase 5: Mobile & Responsive Optimization, which will ensure the entire experience works seamlessly on mobile devices.

