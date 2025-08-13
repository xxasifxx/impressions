# Phase 5: Mobile & Responsive Optimization

## Overview

This phase focuses on optimizing the entire user journey for mobile devices, ensuring that the consultation flow, results page, and booking experience work seamlessly on smaller screens. With a significant portion of users accessing the site on mobile devices, this phase is crucial for maximizing reach and engagement.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Phases 1-4 (All previous phases)

## Objectives

1. Create mobile-specific layouts and interactions
2. Optimize the consultation experience for touch interactions
3. Implement responsive behavior across all components
4. Optimize image loading for mobile connections
5. Create touch-friendly interaction patterns

## Current State Analysis

The current mobile experience has several limitations:
- Basic responsive styling without mobile-specific interactions
- Limited touch optimization for consultation flow
- Inconsistent behavior on smaller screens
- Performance issues with image-heavy content
- Navigation challenges on mobile devices

## Detailed Tasks

### 1. Mobile-First Styling

- [ ] Create `mobile.css` with mobile-first media queries
- [ ] Implement touch-friendly sizing for interactive elements
- [ ] Optimize spacing and typography for small screens
- [ ] Create mobile-specific animations and transitions
- [ ] Implement responsive grid layouts

**Mobile-First CSS Approach:**
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
}
```

### 2. Mobile Consultation Experience

- [ ] Create `MobileConsultation.tsx` for optimized mobile experience
- [ ] Implement swipe navigation between questions
- [ ] Optimize image grid for touch selection
- [ ] Create full-screen modal experience
- [ ] Implement mobile-friendly progress indicator

**Mobile Consultation Component:**
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
      {/* Component implementation */}
    </div>
  );
};
```

### 3. Responsive Behavior Hook

- [ ] Implement `useMediaQuery.ts` hook for responsive behavior
- [ ] Create breakpoint constants for consistent media queries
- [ ] Add orientation detection for device rotation
- [ ] Implement touch detection for interaction patterns
- [ ] Create utilities for responsive component rendering

**Media Query Hook:**
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
      navigator.maxTouchPoints > 0;
    
    setIsTouch(touchSupported);
  }, []);
  
  return isTouch;
}
```

### 4. Mobile Results Page

- [ ] Optimize benefit sections for vertical scrolling
- [ ] Create collapsible sections for better space utilization
- [ ] Implement bottom sheet for service details
- [ ] Optimize service cards for touch interaction
- [ ] Create persistent add-to-cart button

**Mobile Results Page Enhancements:**
```typescript
const MobileResultsPage: React.FC = () => {
  const { state: consultationState } = useConsultationState();
  const { addRecommendedServiceToCart } = useConsultationCart();
  
  // State for bottom sheet
  const [selectedService, setSelectedService] = useState<RecommendedService | null>(null);
  
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  // Show service details in bottom sheet
  const showServiceDetails = (service: RecommendedService) => {
    setSelectedService(service);
  };
  
  // Close bottom sheet
  const closeServiceDetails = () => {
    setSelectedService(null);
  };
  
  if (!consultationState?.recommendations) {
    return <EmptyResultsState />;
  }
  
  return (
    <div className="mobile-results-page">
      {/* Header with summary */}
      <div className="sticky top-0 bg-white z-10 p-4 shadow-sm">
        <h1 className="text-xl font-semibold">Your Personalized Results</h1>
        <p className="text-sm text-gray-600">
          Based on your consultation, we've selected these services for you
        </p>
      </div>
      
      {/* Primary benefits */}
      <div className="benefit-sections p-4 space-y-4">
        {Object.values(consultationState.recommendations.benefitCategories)
          .filter(category => category.relevanceScore > 0.7)
          .map(category => (
            <div key={category.id} className="benefit-section">
              <button
                className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                onClick={() => toggleSection(category.id)}
              >
                <h2 className="text-lg font-medium">{category.title}</h2>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedSections[category.id] ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedSections[category.id] && (
                <div className="mt-2 space-y-3">
                  {category.services.map(service => (
                    <div
                      key={service.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                      onClick={() => showServiceDetails(service)}
                    >
                      {/* Mobile service card */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
      
      {/* Persistent add to cart button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t">
        <button
          className="w-full py-3 bg-primary text-white rounded-lg font-medium"
          onClick={() => {/* Add all primary to cart */}}
        >
          Add Recommended Services to Cart
        </button>
      </div>
      
      {/* Bottom sheet for service details */}
      {selectedService && (
        <BottomSheet
          isOpen={!!selectedService}
          onClose={closeServiceDetails}
        >
          {/* Service detail content */}
        </BottomSheet>
      )}
    </div>
  );
};
```

### 5. Mobile Booking Flow

- [ ] Optimize calendar for touch selection
- [ ] Create mobile-friendly time picker
- [ ] Implement step-by-step booking process
- [ ] Add mobile-optimized form inputs
- [ ] Create fixed position navigation buttons

**Mobile Booking Components:**
```typescript
// Mobile-optimized calendar
const MobileCalendar: React.FC<CalendarProps> = ({
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime,
  availableDates,
  availableTimes
}) => {
  // Component implementation
};

// Mobile time picker
const MobileTimePicker: React.FC<TimePickerProps> = ({
  availableTimes,
  selectedTime,
  onTimeSelect
}) => {
  return (
    <div className="mobile-time-picker">
      <div className="time-slots-grid grid grid-cols-3 gap-2">
        {availableTimes.map(time => (
          <button
            key={time}
            className={`time-slot p-3 rounded-lg text-center ${
              selectedTime === time ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
            onClick={() => onTimeSelect(time)}
          >
            {formatTime(time)}
          </button>
        ))}
      </div>
    </div>
  );
};

// Mobile booking form
const MobileBookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  initialValues
}) => {
  // Component implementation
};
```

### 6. Touch Interaction Utilities

- [ ] Create `useTouchInteractions.ts` hook for touch gestures
- [ ] Implement swipe detection for navigation
- [ ] Add long press detection for additional options
- [ ] Create touch-friendly drag interactions
- [ ] Implement pull-to-refresh functionality

**Touch Interaction Hooks:**
```typescript
// Swipe detection hook
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

// Long press detection hook
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
```

## Technical Considerations

### Mobile Performance

- Implement code splitting for faster initial load
- Use lazy loading for off-screen content
- Optimize animations for mobile GPUs
- Reduce network requests for mobile connections
- Implement touch event debouncing

### Responsive Images

- Use srcset and sizes attributes for responsive images
- Implement WebP format with fallbacks
- Create multiple image sizes for different devices
- Use lazy loading for images
- Implement blur-up loading technique

### Touch Optimization

- Ensure touch targets are at least 44x44px
- Implement active states for touch feedback
- Use native-feeling animations and transitions
- Provide haptic feedback where appropriate
- Ensure scrollable areas have momentum scrolling

## Deliverables

1. `src/styles/mobile.css` - Mobile-first styles
2. `src/components/mobile/MobileConsultation.tsx` - Mobile consultation experience
3. `src/hooks/useMediaQuery.ts` - Responsive behavior hook
4. `src/hooks/useTouchInteractions.ts` - Touch interaction utilities
5. Mobile-optimized versions of key journey pages

## Testing Criteria

1. **Device Testing:**
   - Test on various mobile devices (iOS, Android)
   - Test on different screen sizes (phone, small tablet, large tablet)
   - Test in both portrait and landscape orientations
   - Test with touch and keyboard input
   - Test on different browsers (Chrome, Safari, Firefox)

2. **Performance Testing:**
   - Measure load times on mobile connections (3G, 4G)
   - Test scrolling performance on lower-end devices
   - Measure memory usage during extended sessions
   - Test battery impact of animations and interactions
   - Verify image loading optimization

3. **Usability Testing:**
   - Verify touch targets are appropriately sized
   - Ensure text is readable without zooming
   - Test that forms are easy to complete on mobile
   - Verify that navigation is intuitive on small screens
   - Test swipe and touch interactions

4. **Responsive Testing:**
   - Verify layout adapts appropriately at all breakpoints
   - Test that content reflows rather than requiring horizontal scrolling
   - Ensure images load at appropriate resolutions
   - Verify that interactive elements work at all sizes
   - Test orientation changes

## Next Steps

After completing all 5 phases, the Impressions beauty website will have a complete, user-focused journey from homepage to booking confirmation. The implementation will feature:

1. A visually engaging, image-based consultation experience
2. Personalized, benefit-oriented recommendations
3. Robust state management and persistence
4. Consistent aesthetic evolution throughout the journey
5. Optimized mobile experience

The next steps would be to:

1. Conduct user testing to validate the implementation
2. Implement analytics tracking for journey insights
3. Create A/B testing for key conversion points
4. Expand the service catalog and recommendation engine
5. Integrate with backend systems for real booking functionality

