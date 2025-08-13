# Phase 9: Mobile Optimization

## Overview

This phase focuses on optimizing the entire user journey for mobile devices, ensuring that the consultation flow, results page, and booking experience work seamlessly on smaller screens. With a significant portion of users accessing the site on mobile devices, this phase is crucial for maximizing reach and engagement.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Phases 1-8 (All previous phases)

## Objectives

1. Create mobile-specific styles and layouts
2. Optimize the consultation experience for touch interactions
3. Ensure responsive behavior across all components
4. Optimize image loading for mobile connections
5. Implement touch-friendly interaction patterns

## Detailed Tasks

### 1. Mobile-Specific Styles

- [ ] Create `mobile.css` with responsive styles
- [ ] Implement mobile-first media queries
- [ ] Add touch-friendly sizing for interactive elements
- [ ] Optimize spacing and typography for small screens
- [ ] Create mobile-specific animations and transitions

### 2. Mobile Consultation Experience

- [ ] Create `MobileConsultation.tsx` for optimized mobile experience
- [ ] Implement swipe navigation between questions
- [ ] Optimize image grid for touch selection
- [ ] Create full-screen modal experience
- [ ] Implement mobile-friendly progress indicator

### 3. Responsive Behavior Hook

- [ ] Implement `useMediaQuery.ts` hook for responsive behavior
- [ ] Create breakpoint constants for consistent media queries
- [ ] Add orientation detection for device rotation
- [ ] Implement touch detection for interaction patterns
- [ ] Create utilities for responsive component rendering

### 4. Mobile Results Page Optimization

- [ ] Optimize benefit sections for vertical scrolling
- [ ] Create collapsible sections for better space utilization
- [ ] Implement bottom sheet for service details
- [ ] Optimize service cards for touch interaction
- [ ] Create persistent add-to-cart button

### 5. Mobile Booking Flow

- [ ] Optimize calendar for touch selection
- [ ] Create mobile-friendly time picker
- [ ] Implement step-by-step booking process
- [ ] Add mobile-optimized form inputs
- [ ] Create fixed position navigation buttons

### 6. Performance Optimization

- [ ] Implement responsive image loading
- [ ] Add lazy loading for off-screen content
- [ ] Optimize animations for mobile performance
- [ ] Reduce network requests for mobile connections
- [ ] Implement touch event debouncing

## Technical Considerations

### Media Query Hook

The useMediaQuery hook should provide responsive behavior detection:

```typescript
// Breakpoint constants
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

// Hook for media query matching
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);
  
  return matches;
}

// Convenience hooks for common queries
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${breakpoints.md})`);
}

export function useIsTablet() {
  return useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`);
}

export function useIsDesktop() {
  return useMediaQuery(`(min-width: ${breakpoints.lg})`);
}

export function useIsPortrait() {
  return useMediaQuery('(orientation: portrait)');
}

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const touchSupported = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;
    
    setIsTouch(touchSupported);
  }, []);
  
  return isTouch;
}
```

### Mobile Consultation Component

The mobile consultation component should be optimized for touch:

```typescript
interface MobileConsultationProps {
  questions: ConsultationQuestion[];
  currentQuestionIndex: number;
  onAnswer: (questionId: string, optionIds: string[]) => void;
  onNavigate: (direction: 'next' | 'previous') => void;
  responses: Record<string, string[]>;
}

export const MobileConsultation: React.FC<MobileConsultationProps> = ({
  questions,
  currentQuestionIndex,
  onAnswer,
  onNavigate,
  responses
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedOptionIds = responses[currentQuestion.id] || [];
  
  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentQuestionIndex < questions.length - 1) {
      onNavigate('next');
    } else if (isRightSwipe && currentQuestionIndex > 0) {
      onNavigate('previous');
    }
  };
  
  return (
    <div 
      className="mobile-consultation"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="question-container">
        <h2 className="question-text">{currentQuestion.text}</h2>
        {currentQuestion.description && (
          <p className="question-description">{currentQuestion.description}</p>
        )}
        
        <div className="mobile-progress-indicator">
          <div className="progress-dots">
            {questions.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentQuestionIndex ? 'active' : ''} ${index < currentQuestionIndex ? 'completed' : ''}`} 
              />
            ))}
          </div>
          <div className="progress-text">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>
      
      <div className="options-container">
        {currentQuestion.responseType === 'image-choice' ? (
          <div className="image-options-grid">
            {currentQuestion.options.map(option => (
              <div 
                key={option.id}
                className={`image-option ${selectedOptionIds.includes(option.id) ? 'selected' : ''}`}
                onClick={() => {
                  const newSelectedIds = currentQuestion.responseType === 'single'
                    ? [option.id]
                    : selectedOptionIds.includes(option.id)
                      ? selectedOptionIds.filter(id => id !== option.id)
                      : [...selectedOptionIds, option.id];
                  
                  onAnswer(currentQuestion.id, newSelectedIds);
                }}
              >
                <div className="image-container">
                  <img 
                    src={option.imageUrl} 
                    alt={option.text}
                    loading="lazy"
                    width="150"
                    height="150"
                  />
                </div>
                <div className="option-text">{option.text}</div>
                <div className="selection-indicator" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-options-list">
            {/* Text-based options rendering */}
          </div>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button
          className="prev-button"
          onClick={() => onNavigate('previous')}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        
        <button
          className="next-button"
          onClick={() => onNavigate('next')}
          disabled={selectedOptionIds.length === 0}
        >
          {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
      
      <div className="swipe-hint">
        <span className="swipe-icon">↔️</span>
        <span className="swipe-text">Swipe to navigate</span>
      </div>
    </div>
  );
};
```

### Mobile CSS Approach

The mobile CSS should follow a mobile-first approach:

```css
/* Base styles (mobile-first) */
.service-card {
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.service-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0 0;
}

.service-content {
  padding: 1rem;
}

.service-name {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.service-description {
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.service-actions {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.add-to-cart-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}

/* Tablet styles */
@media (min-width: 768px) {
  .service-card {
    display: flex;
    max-width: 100%;
  }
  
  .service-image {
    width: 200px;
    flex-shrink: 0;
  }
  
  .service-image img {
    height: 100%;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  .service-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .service-description {
    -webkit-line-clamp: 3;
  }
  
  .service-actions {
    margin-top: auto;
    border-top: none;
  }
  
  .add-to-cart-button {
    width: auto;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .service-card {
    flex-direction: column;
    width: calc(33.333% - 1rem);
    margin: 0 0.5rem 1rem;
  }
  
  .service-image {
    width: 100%;
  }
  
  .service-image img {
    height: 200px;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  .service-content {
    height: 150px;
  }
  
  .service-name {
    font-size: 1.25rem;
  }
  
  .service-description {
    font-size: 1rem;
  }
  
  .service-actions {
    padding: 1rem;
  }
  
  .add-to-cart-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
```

### Responsive Image Loading

Optimize images for different screen sizes:

```typescript
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  className,
  width,
  height,
  priority = false
}) => {
  // Generate srcset for different screen sizes
  const generateSrcSet = () => {
    const basePath = src.substring(0, src.lastIndexOf('.'));
    const extension = src.substring(src.lastIndexOf('.'));
    
    return [320, 640, 768, 1024, 1280, 1536]
      .map(size => `${basePath}-${size}w${extension} ${size}w`)
      .join(', ');
  };
  
  return (
    <img
      src={src}
      srcSet={generateSrcSet()}
      sizes={sizes}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};
```

### Touch-Friendly Interactions

Implement touch-friendly interaction patterns:

```typescript
// Utility for detecting long press
export function useLongPress(
  callback: () => void,
  ms: number = 500
) {
  const [startLongPress, setStartLongPress] = useState(false);
  
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    }
    
    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);
  
  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);
  
  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop
  };
}

// Utility for swipe detection
export function useSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  threshold: number = 50
) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe) {
      if (distanceX > threshold && onSwipeLeft) {
        onSwipeLeft();
      } else if (distanceX < -threshold && onSwipeRight) {
        onSwipeRight();
      }
    } else {
      if (distanceY > threshold && onSwipeUp) {
        onSwipeUp();
      } else if (distanceY < -threshold && onSwipeDown) {
        onSwipeDown();
      }
    }
  };
  
  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
}
```

## Deliverables

1. `src/styles/mobile.css` - Mobile-specific styles
2. `src/components/MobileConsultation.tsx` - Mobile-optimized consultation
3. `src/hooks/useMediaQuery.ts` - Responsive behavior hook
4. `src/components/ResponsiveImage.tsx` - Responsive image component
5. `src/hooks/useTouchInteractions.ts` - Touch interaction hooks

## Testing Criteria

1. **Device Testing:**
   - Test on various mobile devices (iOS, Android)
   - Test on different screen sizes (phone, small tablet, large tablet)
   - Test in both portrait and landscape orientations
   - Test with touch and keyboard input

2. **Performance Testing:**
   - Measure load times on mobile connections (3G, 4G)
   - Test scrolling performance on lower-end devices
   - Measure memory usage during extended sessions
   - Test battery impact of animations and interactions

3. **Usability Testing:**
   - Verify touch targets are appropriately sized (min 44x44px)
   - Ensure text is readable without zooming
   - Test that forms are easy to complete on mobile
   - Verify that navigation is intuitive on small screens

4. **Responsive Testing:**
   - Verify layout adapts appropriately at all breakpoints
   - Test that content reflows rather than requiring horizontal scrolling
   - Ensure images load at appropriate resolutions
   - Verify that interactive elements work at all sizes

## Next Steps

After completing this phase, we will move on to Phase 10: Analytics & Optimization, which will implement analytics tracking and optimize the user journey based on data.

