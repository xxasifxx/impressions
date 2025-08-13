# Phase 3: State Management & Persistence

## Overview

This phase focuses on implementing robust state management and persistence for the consultation journey. The goal is to ensure that user responses, recommendations, and aesthetic state persist across page navigations and browser sessions, creating a seamless multi-page experience.

## Timeline

**Duration:** 1.5 weeks
**Dependencies:** Phase 1 (Image-Based Consultation), Phase 2 (Benefit-Oriented Results)

## Objectives

1. Create a global consultation context for state management
2. Implement persistent storage for consultation data
3. Develop hooks for accessing consultation state
4. Ensure state synchronization across components
5. Add state restoration for returning users

## Current State Analysis

The current state management approach has several limitations:
- Consultation state is managed within the `UnifiedConsultationFlow` component
- Results are passed via URL parameters or localStorage without a unified approach
- No centralized state management for the consultation journey
- Limited persistence between sessions
- No synchronization between consultation and results pages

## Detailed Tasks

### 1. Consultation Context

- [ ] Create `ConsultationContext.tsx` for global state management
- [ ] Define comprehensive state interface for consultation data
- [ ] Implement context provider with state and actions
- [ ] Add state initialization and reset functionality
- [ ] Create utility functions for state operations

**Consultation Context Structure:**
```typescript
interface ConsultationState {
  // Current state
  currentNodeId: string;
  responses: Record<string, { 
    optionId: string; 
    weight: number; 
    domains?: string[] 
  }>;
  conversationHistory: Array<{ 
    question: string; 
    answer: string;
    imageUrl?: string;
  }>;
  
  // Progress tracking
  isComplete: boolean;
  progress: number;
  
  // Results
  recommendations: BenefitRecommendationResult | null;
  
  // Metadata
  startedAt: number;
  completedAt: number | null;
  lastUpdatedAt: number;
}

interface ConsultationContextValue {
  // State
  state: ConsultationState;
  
  // Actions
  setCurrentNode: (nodeId: string) => void;
  recordResponse: (nodeId: string, option: UnifiedDecisionOption) => void;
  goBack: () => void;
  completeConsultation: (recommendations: BenefitRecommendationResult) => void;
  resetConsultation: () => void;
  
  // Utility functions
  getProgress: () => number;
  getCurrentNode: () => UnifiedDecisionNode | null;
  hasResponse: (nodeId: string) => boolean;
}

export const ConsultationContext = createContext<ConsultationContextValue | undefined>(undefined);

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Implementation details...
};
```

### 2. Persistent Storage

- [ ] Create `consultationStorage.ts` utility for data persistence
- [ ] Implement localStorage-based persistence
- [ ] Add session expiration and cleanup
- [ ] Create data migration for version changes
- [ ] Add encryption for sensitive data

**Storage Implementation:**
```typescript
export const STORAGE_KEY = 'impressions_consultation';
export const STORAGE_VERSION = '1.0';

export interface StorageData {
  version: string;
  state: ConsultationState;
  expiresAt: number; // Timestamp
}

export const saveConsultationState = (state: ConsultationState): void => {
  try {
    // Set expiration (7 days from now)
    const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000);
    
    const data: StorageData = {
      version: STORAGE_VERSION,
      state,
      expiresAt
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save consultation state:', error);
  }
};

export const loadConsultationState = (): ConsultationState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const parsedData: StorageData = JSON.parse(data);
    
    // Check expiration
    if (parsedData.expiresAt < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    // Check version and migrate if needed
    if (parsedData.version !== STORAGE_VERSION) {
      return migrateStorageData(parsedData);
    }
    
    return parsedData.state;
  } catch (error) {
    console.error('Failed to load consultation state:', error);
    return null;
  }
};

// Additional utility functions...
```

### 3. Consultation State Hook

- [ ] Create `useConsultationState.ts` hook for component access
- [ ] Implement derived state calculations
- [ ] Add action dispatchers with validation
- [ ] Create selectors for specific state slices
- [ ] Add debugging helpers for development

**Consultation Hook:**
```typescript
export function useConsultationState() {
  const context = useContext(ConsultationContext);
  
  if (context === undefined) {
    throw new Error('useConsultationState must be used within a ConsultationProvider');
  }
  
  return context;
}

// Specialized hooks for specific use cases
export function useConsultationProgress() {
  const { state, getProgress } = useConsultationState();
  return {
    progress: getProgress(),
    isComplete: state.isComplete,
    currentNodeId: state.currentNodeId,
    totalResponses: Object.keys(state.responses).length
  };
}

export function useConsultationResults() {
  const { state } = useConsultationState();
  
  // Ensure results exist
  if (!state.recommendations) {
    throw new Error('Consultation results not available. Complete the consultation first.');
  }
  
  return state.recommendations;
}
```

### 4. Navigation State Management

- [ ] Create `useConsultationNavigation.ts` hook for navigation
- [ ] Implement navigation history tracking
- [ ] Add route guards for incomplete consultations
- [ ] Create deep linking capabilities
- [ ] Implement URL state synchronization

**Navigation Hook:**
```typescript
export function useConsultationNavigation() {
  const { state, resetConsultation } = useConsultationState();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Navigate to results page
  const goToResults = useCallback(() => {
    if (!state.isComplete) {
      console.warn('Attempted to navigate to results with incomplete consultation');
    }
    navigate('/personalized-results');
  }, [state.isComplete, navigate]);
  
  // Navigate to consultation
  const startConsultation = useCallback((reset: boolean = false) => {
    if (reset) {
      resetConsultation();
    }
    navigate('/consultation');
  }, [resetConsultation, navigate]);
  
  // Navigate to booking with selected services
  const goToBooking = useCallback((serviceIds: string[]) => {
    const queryParams = new URLSearchParams();
    serviceIds.forEach(id => queryParams.append('service', id));
    navigate(`/booking?${queryParams.toString()}`);
  }, [navigate]);
  
  // Check if user can access results
  const canAccessResults = state.isComplete;
  
  return {
    goToResults,
    startConsultation,
    goToBooking,
    canAccessResults
  };
}
```

### 5. Cart Synchronization

- [ ] Update `useCart.ts` hook to work with consultation results
- [ ] Implement add recommended services to cart
- [ ] Create bundle creation from recommendations
- [ ] Add cart persistence across sessions
- [ ] Implement cart and consultation state synchronization

**Cart Integration:**
```typescript
export function useConsultationCart() {
  const { state } = useConsultationState();
  const { addToCart, items, clearCart } = useCart();
  
  // Add a recommended service to cart
  const addRecommendedServiceToCart = useCallback((serviceId: string) => {
    if (!state.recommendations) return;
    
    // Find service in recommendations
    const allServices = [
      ...state.recommendations.primaryServices,
      ...state.recommendations.complementaryServices
    ];
    
    const service = allServices.find(s => s.id === serviceId);
    if (!service) return;
    
    // Add to cart
    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      domain: service.domain,
      duration: service.duration,
      // Additional metadata
      isRecommended: true,
      benefitIds: service.benefitIds
    });
  }, [state.recommendations, addToCart]);
  
  // Add all primary recommendations to cart
  const addAllPrimaryToCart = useCallback(() => {
    if (!state.recommendations) return;
    
    state.recommendations.primaryServices.forEach(service => {
      addRecommendedServiceToCart(service.id);
    });
  }, [state.recommendations, addRecommendedServiceToCart]);
  
  // Check if a recommended service is in cart
  const isRecommendedServiceInCart = useCallback((serviceId: string) => {
    return items.some(item => item.id === serviceId);
  }, [items]);
  
  return {
    addRecommendedServiceToCart,
    addAllPrimaryToCart,
    isRecommendedServiceInCart,
    cartItems: items,
    clearCart
  };
}
```

## Technical Considerations

### State Design Principles

- Keep state normalized to avoid duplication
- Use immutable update patterns for predictability
- Separate UI state from domain state
- Design for serialization and persistence
- Include metadata for debugging and analytics

### Performance Optimization

- Implement memoization for derived state
- Use context selectors to prevent unnecessary renders
- Batch state updates when possible
- Optimize storage operations for large state objects
- Implement lazy loading for state restoration

### Error Handling

- Add robust error handling for storage operations
- Implement state recovery mechanisms
- Create fallback states for corrupted data
- Add validation for state integrity
- Log errors for debugging and analytics

## Deliverables

1. `src/contexts/ConsultationContext.tsx` - Global consultation context
2. `src/utils/consultationStorage.ts` - Persistence utilities
3. `src/hooks/useConsultationState.ts` - Main consultation hook
4. `src/hooks/useConsultationNavigation.ts` - Navigation utilities
5. Updated `src/hooks/useCart.ts` - With consultation integration

## Testing Criteria

1. **Functional Testing:**
   - State persists across page refreshes
   - Navigation between pages maintains state
   - Cart synchronization works correctly
   - State reset functions properly
   - Error recovery mechanisms work as expected

2. **Integration Testing:**
   - Consultation flow integrates with context
   - Results page uses persisted state
   - Cart operations work with recommendations
   - Navigation guards prevent invalid access
   - Deep linking works correctly

3. **Performance Testing:**
   - State operations are performant
   - Storage operations don't block UI
   - Large state objects handle efficiently
   - Memory usage remains stable
   - No unnecessary re-renders

4. **Edge Case Testing:**
   - Handles corrupted storage data
   - Works with missing or partial state
   - Recovers from unexpected errors
   - Handles concurrent state updates
   - Works with browser storage limitations

## Next Steps

After completing this phase, we will move on to Phase 4: Aesthetic Evolution Consistency, which will ensure visual consistency throughout the user journey.

