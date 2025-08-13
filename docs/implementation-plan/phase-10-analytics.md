# Phase 10: Analytics & Optimization

## Overview

This final phase focuses on implementing analytics tracking throughout the user journey to measure engagement, identify drop-off points, and track conversions. It also includes optimizations based on initial usage data. This phase provides the tools needed to measure success and continuously improve the experience based on real user data.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Phases 1-9 (All previous phases)

## Objectives

1. Implement comprehensive analytics tracking
2. Create hooks for component-level tracking
3. Add conversion monitoring for key actions
4. Track the complete user journey
5. Optimize performance based on analytics data

## Detailed Tasks

### 1. Analytics Service

- [ ] Create `analytics.ts` service with event tracking functions
- [ ] Implement integration with analytics provider (Google Analytics, Mixpanel, etc.)
- [ ] Add user session tracking
- [ ] Create custom event definitions
- [ ] Implement error tracking

### 2. Analytics Hook

- [ ] Implement `useAnalytics.ts` hook for component-level tracking
- [ ] Create typed event tracking functions
- [ ] Add automatic page view tracking
- [ ] Implement user action tracking
- [ ] Create conversion tracking utilities

### 3. Analytics Provider

- [ ] Create `AnalyticsProvider.tsx` for global analytics context
- [ ] Implement user identification and session management
- [ ] Add consent management for privacy compliance
- [ ] Create debug mode for development
- [ ] Implement analytics queue for offline support

### 4. Journey Tracking

- [ ] Implement consultation step tracking
- [ ] Add results page interaction tracking
- [ ] Create booking funnel analytics
- [ ] Implement service selection tracking
- [ ] Add user preference analytics

### 5. Conversion Tracking

- [ ] Implement add-to-cart conversion tracking
- [ ] Add booking completion tracking
- [ ] Create consultation completion analytics
- [ ] Implement return visit tracking
- [ ] Add referral source attribution

### 6. Performance Optimization

- [ ] Implement performance metrics tracking
- [ ] Add load time optimization
- [ ] Create component rendering optimization
- [ ] Implement network request optimization
- [ ] Add image loading optimization

## Technical Considerations

### Analytics Service

The analytics service should provide a clean API for tracking:

```typescript
// Analytics event types
export enum EventType {
  PAGE_VIEW = 'page_view',
  CONSULTATION_START = 'consultation_start',
  CONSULTATION_STEP = 'consultation_step',
  CONSULTATION_COMPLETE = 'consultation_complete',
  SERVICE_VIEW = 'service_view',
  SERVICE_ADD_TO_CART = 'service_add_to_cart',
  BOOKING_START = 'booking_start',
  BOOKING_STEP = 'booking_step',
  BOOKING_COMPLETE = 'booking_complete',
  ERROR = 'error'
}

// Analytics service
export class AnalyticsService {
  private provider: any; // Analytics provider instance
  private initialized: boolean = false;
  private queue: Array<{ event: string, properties: any }> = [];
  private userId: string | null = null;
  private sessionId: string;
  
  constructor() {
    this.sessionId = this.generateSessionId();
  }
  
  // Initialize analytics provider
  public init(config: any): void {
    try {
      // Initialize provider (e.g., Google Analytics, Mixpanel)
      // This is a placeholder - actual implementation depends on provider
      this.provider = window.analyticsProvider;
      this.provider.init(config);
      
      this.initialized = true;
      
      // Process queued events
      this.processQueue();
      
      console.log('Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize analytics', error);
    }
  }
  
  // Identify user
  public identify(userId: string, traits?: Record<string, any>): void {
    this.userId = userId;
    
    if (this.initialized) {
      this.provider.identify(userId, traits);
    } else {
      this.queue.push({ 
        event: 'identify', 
        properties: { userId, traits } 
      });
    }
  }
  
  // Track event
  public track(
    event: EventType | string, 
    properties?: Record<string, any>
  ): void {
    const eventProperties = {
      ...properties,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      userId: this.userId
    };
    
    if (this.initialized) {
      this.provider.track(event, eventProperties);
    } else {
      this.queue.push({ event, properties: eventProperties });
    }
  }
  
  // Track page view
  public pageView(
    pageName: string, 
    properties?: Record<string, any>
  ): void {
    this.track(EventType.PAGE_VIEW, {
      pageName,
      path: window.location.pathname,
      ...properties
    });
  }
  
  // Track consultation step
  public trackConsultationStep(
    stepNumber: number,
    questionId: string,
    responseIds: string[]
  ): void {
    this.track(EventType.CONSULTATION_STEP, {
      stepNumber,
      questionId,
      responseIds,
      totalSteps: this.getTotalConsultationSteps()
    });
  }
  
  // Track service add to cart
  public trackAddToCart(
    service: Service,
    source: 'results_page' | 'service_detail' | 'complementary_suggestion'
  ): void {
    this.track(EventType.SERVICE_ADD_TO_CART, {
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDomain: service.domain,
      source
    });
  }
  
  // Track booking completion
  public trackBookingComplete(
    booking: Booking
  ): void {
    this.track(EventType.BOOKING_COMPLETE, {
      bookingId: booking.id,
      services: booking.services.map(s => ({
        id: s.id,
        name: s.name,
        price: s.price,
        domain: s.domain
      })),
      totalPrice: booking.totalPrice,
      appointmentDate: booking.date,
      appointmentTime: booking.time
    });
  }
  
  // Track error
  public trackError(
    errorType: string,
    errorMessage: string,
    errorContext?: Record<string, any>
  ): void {
    this.track(EventType.ERROR, {
      errorType,
      errorMessage,
      ...errorContext
    });
  }
  
  // Process queued events
  private processQueue(): void {
    if (!this.initialized) return;
    
    this.queue.forEach(item => {
      if (item.event === 'identify') {
        this.provider.identify(
          item.properties.userId, 
          item.properties.traits
        );
      } else {
        this.provider.track(item.event, item.properties);
      }
    });
    
    this.queue = [];
  }
  
  // Generate session ID
  private generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  // Get total consultation steps
  private getTotalConsultationSteps(): number {
    // This would be implemented to get the actual number of steps
    return 5; // Placeholder
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();
```

### Analytics Hook

The analytics hook should make tracking easy from components:

```typescript
export function useAnalytics() {
  // Get analytics from context if using provider
  // const analyticsContext = useContext(AnalyticsContext);
  
  // Track page view on mount or route change
  useEffect(() => {
    const pageName = getPageNameFromPath(window.location.pathname);
    analytics.pageView(pageName);
    
    // Listen for route changes if using client-side routing
    const handleRouteChange = (url: string) => {
      const newPageName = getPageNameFromPath(url);
      analytics.pageView(newPageName);
    };
    
    // Add route change listener (implementation depends on router)
    // router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      // router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  
  // Track component view
  const trackComponentView = useCallback((
    componentName: string,
    properties?: Record<string, any>
  ) => {
    analytics.track('component_view', {
      componentName,
      ...properties
    });
  }, []);
  
  // Track user action
  const trackAction = useCallback((
    actionName: string,
    properties?: Record<string, any>
  ) => {
    analytics.track(`action_${actionName}`, properties);
  }, []);
  
  // Track consultation progress
  const trackConsultationStep = useCallback((
    stepNumber: number,
    questionId: string,
    responseIds: string[]
  ) => {
    analytics.trackConsultationStep(stepNumber, questionId, responseIds);
  }, []);
  
  // Track service interactions
  const trackServiceView = useCallback((
    service: Service,
    source: string
  ) => {
    analytics.track(EventType.SERVICE_VIEW, {
      serviceId: service.id,
      serviceName: service.name,
      serviceDomain: service.domain,
      source
    });
  }, []);
  
  const trackAddToCart = useCallback((
    service: Service,
    source: 'results_page' | 'service_detail' | 'complementary_suggestion'
  ) => {
    analytics.trackAddToCart(service, source);
  }, []);
  
  // Track booking funnel
  const trackBookingStep = useCallback((
    stepNumber: number,
    stepName: string,
    properties?: Record<string, any>
  ) => {
    analytics.track(EventType.BOOKING_STEP, {
      stepNumber,
      stepName,
      ...properties
    });
  }, []);
  
  const trackBookingComplete = useCallback((
    booking: Booking
  ) => {
    analytics.trackBookingComplete(booking);
  }, []);
  
  // Track errors
  const trackError = useCallback((
    errorType: string,
    errorMessage: string,
    errorContext?: Record<string, any>
  ) => {
    analytics.trackError(errorType, errorMessage, errorContext);
  }, []);
  
  return {
    trackComponentView,
    trackAction,
    trackConsultationStep,
    trackServiceView,
    trackAddToCart,
    trackBookingStep,
    trackBookingComplete,
    trackError
  };
}

// Helper function to get page name from path
function getPageNameFromPath(path: string): string {
  const pathSegments = path.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return 'home';
  }
  
  const basePath = pathSegments[0];
  
  switch (basePath) {
    case 'consultation':
      return 'consultation';
    case 'personalized-results':
      return 'results';
    case 'booking':
      return 'booking';
    case 'booking-confirmation':
      return 'booking_confirmation';
    default:
      return basePath;
  }
}
```

### Analytics Provider

The analytics provider component should manage global analytics state:

```typescript
interface AnalyticsContextValue {
  isInitialized: boolean;
  isConsentGiven: boolean;
  userId: string | null;
  setUserId: (id: string) => void;
  giveConsent: () => void;
  revokeConsent: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

interface AnalyticsProviderProps {
  children: React.ReactNode;
  analyticsConfig?: any;
  debugMode?: boolean;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  analyticsConfig,
  debugMode = false
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Initialize analytics on mount if consent is already given
  useEffect(() => {
    const storedConsent = localStorage.getItem('analytics_consent');
    const hasConsent = storedConsent === 'true';
    
    setIsConsentGiven(hasConsent);
    
    if (hasConsent) {
      initializeAnalytics();
    }
  }, []);
  
  // Initialize analytics
  const initializeAnalytics = useCallback(() => {
    try {
      analytics.init({
        ...analyticsConfig,
        debug: debugMode
      });
      
      setIsInitialized(true);
      
      // Restore user ID if available
      const storedUserId = localStorage.getItem('analytics_user_id');
      if (storedUserId) {
        analytics.identify(storedUserId);
        setUserId(storedUserId);
      }
      
      console.log('Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize analytics', error);
    }
  }, [analyticsConfig, debugMode]);
  
  // Set user ID
  const handleSetUserId = useCallback((id: string) => {
    setUserId(id);
    localStorage.setItem('analytics_user_id', id);
    
    if (isInitialized) {
      analytics.identify(id);
    }
  }, [isInitialized]);
  
  // Give consent
  const giveConsent = useCallback(() => {
    setIsConsentGiven(true);
    localStorage.setItem('analytics_consent', 'true');
    
    if (!isInitialized) {
      initializeAnalytics();
    }
  }, [isInitialized, initializeAnalytics]);
  
  // Revoke consent
  const revokeConsent = useCallback(() => {
    setIsConsentGiven(false);
    localStorage.setItem('analytics_consent', 'false');
    
    // Additional cleanup if needed
  }, []);
  
  const contextValue = useMemo(() => ({
    isInitialized,
    isConsentGiven,
    userId,
    setUserId: handleSetUserId,
    giveConsent,
    revokeConsent
  }), [
    isInitialized,
    isConsentGiven,
    userId,
    handleSetUserId,
    giveConsent,
    revokeConsent
  ]);
  
  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Hook to use analytics context
export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  
  return context;
}
```

### Performance Monitoring

Implement performance monitoring for optimization:

```typescript
// Performance metrics tracking
export function trackPerformanceMetrics() {
  // Use Web Vitals library
  import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
    getCLS(metric => {
      analytics.track('performance_metric', {
        name: 'CLS',
        value: metric.value,
        rating: metric.rating
      });
    });
    
    getFID(metric => {
      analytics.track('performance_metric', {
        name: 'FID',
        value: metric.value,
        rating: metric.rating
      });
    });
    
    getLCP(metric => {
      analytics.track('performance_metric', {
        name: 'LCP',
        value: metric.value,
        rating: metric.rating
      });
    });
    
    getFCP(metric => {
      analytics.track('performance_metric', {
        name: 'FCP',
        value: metric.value,
        rating: metric.rating
      });
    });
    
    getTTFB(metric => {
      analytics.track('performance_metric', {
        name: 'TTFB',
        value: metric.value,
        rating: metric.rating
      });
    });
  });
}

// Component render timing
export function useRenderTiming(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      analytics.track('component_render_time', {
        componentName,
        renderTime
      });
    };
  }, [componentName]);
}

// Track API request performance
export function trackApiPerformance(
  endpoint: string,
  startTime: number,
  endTime: number,
  success: boolean,
  statusCode?: number
) {
  const duration = endTime - startTime;
  
  analytics.track('api_performance', {
    endpoint,
    duration,
    success,
    statusCode
  });
}
```

## Deliverables

1. `src/services/analytics.ts` - Analytics service implementation
2. `src/hooks/useAnalytics.ts` - Hook for component-level tracking
3. `src/components/AnalyticsProvider.tsx` - Global analytics provider
4. `src/utils/performanceTracking.ts` - Performance monitoring utilities
5. `src/components/ConsentBanner.tsx` - Analytics consent management

## Testing Criteria

1. **Functional Testing:**
   - Events are properly tracked and sent to analytics provider
   - User identification works correctly
   - Consent management functions as expected
   - Performance metrics are accurately captured
   - All key user actions are tracked

2. **Privacy Testing:**
   - Consent is properly obtained before tracking
   - User can opt out of tracking
   - Personal data is properly anonymized
   - Compliance with privacy regulations (GDPR, CCPA)
   - Data retention policies are implemented

3. **Performance Testing:**
   - Analytics code doesn't impact page performance
   - Tracking calls are properly batched
   - Failed tracking attempts are queued for retry
   - Memory usage remains stable during extended sessions
   - Network usage is optimized

4. **Integration Testing:**
   - Analytics data appears correctly in analytics dashboard
   - Custom events are properly formatted
   - User journey can be tracked end-to-end
   - Conversion funnels are properly configured
   - Error tracking captures relevant information

## Next Steps

After completing all 10 phases, the Impressions beauty website will have a complete, user-focused journey from homepage to booking confirmation. The implementation will feature:

1. A unified entry point that doesn't force domain choices
2. An engaging, image-based consultation experience
3. Personalized, benefit-oriented recommendations
4. A seamless booking flow
5. Consistent aesthetic evolution throughout the journey
6. Mobile optimization for all users
7. Analytics for continuous improvement

The next steps would be to:

1. Conduct user testing to validate the implementation
2. Analyze analytics data to identify optimization opportunities
3. Implement A/B testing for key conversion points
4. Expand the service catalog and recommendation engine
5. Integrate with backend systems for real booking functionality

