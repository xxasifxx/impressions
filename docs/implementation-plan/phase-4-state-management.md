# Phase 4: State Management & Persistence

## Overview

This phase focuses on creating a robust state management system that ensures user preferences, consultation results, and aesthetic choices persist throughout the multi-page journey. This is crucial for maintaining a cohesive experience as users navigate between different parts of the application.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Phase 3 (Consultation Engine)

## Objectives

1. Implement global consultation context for state management
2. Create hooks for component access to consultation state
3. Add localStorage persistence for session continuity
4. Ensure aesthetic preferences persist across page navigations
5. Set up state management for cart items and booking data

## Detailed Tasks

### 1. Consultation Context Implementation

- [ ] Create `ConsultationContext.tsx` for global consultation state
- [ ] Define comprehensive state interface for consultation data
- [ ] Implement context provider with state management
- [ ] Add actions and reducers for state updates
- [ ] Create helper functions for common state operations

### 2. Consultation State Hook

- [ ] Implement `useConsultationState.ts` hook for component access
- [ ] Add typed selectors for accessing specific state slices
- [ ] Create action dispatchers for state updates
- [ ] Add memoization for performance optimization
- [ ] Create derived state calculations (e.g., progress percentage)

### 3. State Persistence Utility

- [ ] Create `statePersistence.ts` utility for localStorage handling
- [ ] Implement save and load functions for state
- [ ] Add versioning for backward compatibility
- [ ] Create data migration utilities for schema changes
- [ ] Add error handling and fallback mechanisms

### 4. Cart State Management

- [ ] Enhance existing `CartContext.tsx` for integration with consultation
- [ ] Add persistence for cart items
- [ ] Create utility functions for cart operations
- [ ] Implement cart synchronization across tabs/windows
- [ ] Add validation for cart items

### 5. Aesthetic State Persistence

- [ ] Enhance aesthetic evolution system to persist state
- [ ] Create serialization/deserialization for aesthetic state
- [ ] Implement smooth restoration of aesthetic state
- [ ] Add state transfer between pages
- [ ] Create fallback default states

### 6. Integration with Routing

- [ ] Implement state preservation during page navigation
- [ ] Add route guards for consultation flow
- [ ] Create deep linking capabilities for sharing
- [ ] Implement URL parameter synchronization with state
- [ ] Add route-based state initialization

## Technical Considerations

### Consultation State Structure

The consultation state should be comprehensive and typed:

```typescript
interface ConsultationState {
  // Session information
  sessionId: string;
  startTime: number;
  lastUpdated: number;
  
  // Progress tracking
  currentQuestionId: string | null;
  completedQuestionIds: string[];
  path: string[]; // History of question IDs in order
  
  // Responses
  responses: Record<string, {
    questionId: string;
    selectedOptionIds: string[];
    timestamp: number;
  }>;
  
  // Derived data
  domainFocus: {
    'hair-salon': number;
    'makeup-studio': number;
    'med-spa': number;
  };
  benefitPreferences: Record<string, number>; // Mapping of benefit ID to preference strength
  
  // Results
  recommendationResults: RecommendationResult | null;
  
  // UI state
  isComplete: boolean;
  currentStep: number;
  totalSteps: number;
}
```

### State Persistence Strategy

For localStorage persistence:

```typescript
// Save state to localStorage
const saveState = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify({
      version: '1.0',
      timestamp: Date.now(),
      data: state
    });
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

// Load state from localStorage with version checking
const loadState = <T>(key: string, defaultState: T): T => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return defaultState;
    
    const { version, timestamp, data } = JSON.parse(serializedState);
    
    // Check for expired state (e.g., older than 24 hours)
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
    if (isExpired) return defaultState;
    
    // Handle version migrations if needed
    if (version !== '1.0') {
      return migrateState(version, data, defaultState);
    }
    
    return data as T;
  } catch (err) {
    console.error('Could not load state', err);
    return defaultState;
  }
};
```

### Context Provider Design

The context provider should be efficient and avoid unnecessary re-renders:

```typescript
export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [state, dispatch] = useReducer(
    consultationReducer,
    initialConsultationState,
    (initialState) => loadState('consultation', initialState)
  );
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state]);
  
  // Save state to localStorage when it changes
  useEffect(() => {
    saveState('consultation', state);
  }, [state]);
  
  return (
    <ConsultationContext.Provider value={contextValue}>
      {children}
    </ConsultationContext.Provider>
  );
};
```

### Hook Design

The custom hook should provide a clean API for components:

```typescript
export function useConsultationState() {
  const { state, dispatch } = useContext(ConsultationContext);
  
  // Memoized selectors
  const currentQuestion = useMemo(() => {
    return state.currentQuestionId 
      ? getQuestionById(state.currentQuestionId) 
      : null;
  }, [state.currentQuestionId]);
  
  const progressPercentage = useMemo(() => {
    return Math.round((state.completedQuestionIds.length / state.totalSteps) * 100);
  }, [state.completedQuestionIds.length, state.totalSteps]);
  
  // Action dispatchers
  const answerQuestion = useCallback((questionId: string, optionIds: string[]) => {
    dispatch({ 
      type: 'ANSWER_QUESTION', 
      payload: { questionId, optionIds } 
    });
  }, [dispatch]);
  
  const navigateToNextQuestion = useCallback(() => {
    dispatch({ type: 'NAVIGATE_NEXT' });
  }, [dispatch]);
  
  // Return everything the components need
  return {
    // State
    currentQuestion,
    responses: state.responses,
    isComplete: state.isComplete,
    progressPercentage,
    
    // Actions
    answerQuestion,
    navigateToNextQuestion,
    navigateToPreviousQuestion: () => dispatch({ type: 'NAVIGATE_PREVIOUS' }),
    resetConsultation: () => dispatch({ type: 'RESET' }),
    
    // Raw access (for advanced use cases)
    state,
    dispatch
  };
}
```

## Deliverables

1. `src/contexts/ConsultationContext.tsx` - Global consultation state provider
2. `src/hooks/useConsultationState.ts` - Hook for accessing consultation state
3. `src/utils/statePersistence.ts` - Utilities for state persistence
4. `src/contexts/CartContext.tsx` - Enhanced cart state management
5. `src/hooks/useAestheticState.ts` - Hook for persistent aesthetic state

## Testing Criteria

1. **Functional Testing:**
   - State persists correctly across page refreshes
   - State updates correctly with all actions
   - Context provides correct values to components
   - Hooks return expected values and functions

2. **Performance Testing:**
   - No unnecessary re-renders from context changes
   - State updates are efficient
   - localStorage operations don't block the main thread
   - Memory usage remains stable during extended use

3. **Edge Case Testing:**
   - Handles invalid or corrupt localStorage data
   - Manages state migration between versions
   - Handles concurrent updates from multiple tabs
   - Recovers gracefully from errors

4. **Integration Testing:**
   - Consultation flow maintains state correctly
   - Cart items persist across sessions
   - Aesthetic preferences are maintained throughout journey
   - State synchronizes correctly with URL parameters

## Next Steps

After completing this phase, we will move on to Phase 5: Aesthetic Evolution System Enhancement, which will refine the visual experience based on user preferences.

