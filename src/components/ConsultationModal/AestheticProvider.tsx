import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  AestheticState, 
  AestheticHistory, 
  EmotionalState, 
  ServiceCategory, 
  ConsultationMood,
  AestheticContextType
} from '@/types/AestheticTypes';

// Import the aesthetic CSS
import '@/styles/aesthetic-states.css';

// Create context with default values
const AestheticContext = createContext<AestheticContextType>({
  currentState: {
    emotionalState: 'uncertain',
    timestamp: Date.now()
  },
  history: {
    states: [],
    transitions: []
  },
  evolveToState: () => {},
  applyToElement: () => {},
  getStateClassName: () => '',
  triggerCelebratoryState: () => {}
});

// Hook to use the aesthetic context
export const useAestheticContext = () => useContext(AestheticContext);

interface AestheticProviderProps {
  children: ReactNode;
  initialState?: EmotionalState;
}

export const AestheticProvider: React.FC<AestheticProviderProps> = ({ 
  children, 
  initialState = 'uncertain' 
}) => {
  // Initialize state
  const [currentState, setCurrentState] = useState<AestheticState>({
    emotionalState: initialState,
    timestamp: Date.now()
  });
  
  // Initialize history
  const [history, setHistory] = useState<AestheticHistory>({
    states: [{ emotionalState: initialState, timestamp: Date.now() }],
    transitions: []
  });
  
  // Track if we're in a transition
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Apply transition class to document root when transitioning
  useEffect(() => {
    if (isTransitioning) {
      document.documentElement.classList.add('aesthetic-transitioning');
    } else {
      document.documentElement.classList.remove('aesthetic-transitioning');
    }
  }, [isTransitioning]);
  
  // Apply the current emotional state class to document root
  useEffect(() => {
    // Remove all emotional state classes
    document.documentElement.classList.forEach(className => {
      if (className.startsWith('aesthetic-state-')) {
        document.documentElement.classList.remove(className);
      }
    });
    
    // Add the current emotional state class
    document.documentElement.classList.add(`aesthetic-state-${currentState.emotionalState}`);
  }, [currentState.emotionalState]);
  
  // Function to evolve to a new emotional state
  const evolveToState = (newState: EmotionalState, message?: string) => {
    // Don't transition to the same state
    if (newState === currentState.emotionalState) return;
    
    // Start transition
    setIsTransitioning(true);
    
    // Create new state object
    const nextState: AestheticState = {
      emotionalState: newState,
      serviceCategory: currentState.serviceCategory,
      mood: currentState.mood,
      message,
      timestamp: Date.now()
    };
    
    // Create transition object
    const transition = {
      from: currentState,
      to: nextState,
      duration: 300 // milliseconds
    };
    
    // Update state and history
    setCurrentState(nextState);
    setHistory(prev => ({
      states: [...prev.states, nextState],
      transitions: [...prev.transitions, transition]
    }));
    
    // End transition after duration
    setTimeout(() => {
      setIsTransitioning(false);
    }, transition.duration);
  };
  
  // Function to apply service category and mood to an element
  const applyToElement = (
    element: HTMLElement,
    serviceCategory?: ServiceCategory,
    mood?: ConsultationMood
  ) => {
    // Remove existing service category classes
    element.classList.forEach(className => {
      if (className.startsWith('aesthetic-service-')) {
        element.classList.remove(className);
      }
    });
    
    // Remove existing mood classes
    element.classList.forEach(className => {
      if (className.startsWith('aesthetic-mood-')) {
        element.classList.remove(className);
      }
    });
    
    // Add new service category class if provided
    if (serviceCategory) {
      element.classList.add(`aesthetic-service-${serviceCategory}`);
      
      // Update current state
      setCurrentState(prev => ({
        ...prev,
        serviceCategory,
        timestamp: Date.now()
      }));
    }
    
    // Add new mood class if provided
    if (mood) {
      element.classList.add(`aesthetic-mood-${mood}`);
      
      // Update current state
      setCurrentState(prev => ({
        ...prev,
        mood,
        timestamp: Date.now()
      }));
    }
  };
  
  // Function to get the current state as a className string
  const getStateClassName = () => {
    const classes = [`aesthetic-state-${currentState.emotionalState}`];
    
    if (currentState.serviceCategory) {
      classes.push(`aesthetic-service-${currentState.serviceCategory}`);
    }
    
    if (currentState.mood) {
      classes.push(`aesthetic-mood-${currentState.mood}`);
    }
    
    return classes.join(' ');
  };
  
  // Function to trigger a celebratory state and then return to previous state
  const triggerCelebratoryState = (message?: string) => {
    const previousState = currentState.emotionalState;
    
    // Evolve to celebratory state
    evolveToState('celebratory', message || 'Celebration!');
    
    // Return to previous state after 2 seconds
    setTimeout(() => {
      evolveToState(previousState);
    }, 2000);
  };
  
  // Context value
  const contextValue: AestheticContextType = {
    currentState,
    history,
    evolveToState,
    applyToElement,
    getStateClassName,
    triggerCelebratoryState
  };
  
  return (
    <AestheticContext.Provider value={contextValue}>
      {children}
    </AestheticContext.Provider>
  );
};

