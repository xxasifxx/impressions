import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  ConsultationSessionState,
  ConsultationResponse,
  ModalNavigationStack,
  NavigationDirection,
  ModalLifecycleState,
  ConsultationSessionContext
} from '@/data/models';
import { sessionManager, PersistenceStrategy } from '@/utils/sessionManager';

interface ModalStateContextType extends ConsultationSessionContext {
  // Modal lifecycle
  modalLifecycle: ModalLifecycleState;
  setModalLifecycle: (state: ModalLifecycleState) => void;
  
  // Navigation
  navigationStack: ModalNavigationStack;
  navigate: (direction: NavigationDirection, target?: string) => void;
  
  // Session management
  createNewSession: () => void;
  loadSession: (sessionId?: string) => boolean;
  clearCurrentSession: () => void;
  setPersistenceStrategy: (strategy: PersistenceStrategy) => void;
}

interface ModalStateProviderProps {
  children: ReactNode;
  persistenceStrategy?: PersistenceStrategy;
}

const ModalStateContext = createContext<ModalStateContextType | undefined>(undefined);

export const ModalStateProvider: React.FC<ModalStateProviderProps> = ({ 
  children, 
  persistenceStrategy = 'localStorage' 
}) => {
  const [sessionState, setSessionState] = useState<ConsultationSessionState>(() => {
    sessionManager.setStrategy(persistenceStrategy);
    return sessionManager.createInitialSessionState();
  });

  const [modalLifecycle, setModalLifecycle] = useState<ModalLifecycleState>({
    phase: 'opening',
    timestamp: Date.now()
  });

  // Calculate navigation stack
  const navigationStack: ModalNavigationStack = {
    current: sessionState.currentNodeId,
    history: sessionState.navigationStack,
    canGoBack: sessionState.navigationStack.length > 1,
    canGoForward: false // In consultation flow, we don't typically go forward
  };

  // Update session state
  const updateSession = useCallback((updates: Partial<ConsultationSessionState>) => {
    setSessionState(prev => {
      const updated = {
        ...prev,
        ...updates,
        lastUpdated: Date.now()
      };
      
      // Auto-persist on updates
      sessionManager.persistSession(updated);
      return updated;
    });
  }, []);

  // Add consultation response
  const addResponse = useCallback((response: ConsultationResponse) => {
    updateSession({
      responses: [...sessionState.responses, response],
      lastUpdated: Date.now()
    });
  }, [sessionState.responses, updateSession]);

  // Navigate to specific node
  const navigateToNode = useCallback((nodeId: string) => {
    updateSession({
      currentNodeId: nodeId,
      navigationStack: [...sessionState.navigationStack, nodeId],
      lastUpdated: Date.now()
    });
  }, [sessionState.navigationStack, updateSession]);

  // Modal navigation
  const navigate = useCallback((direction: NavigationDirection, target?: string) => {
    switch (direction) {
      case 'forward':
        if (target) {
          navigateToNode(target);
        }
        break;
      
      case 'back':
        if (navigationStack.canGoBack) {
          const newStack = [...sessionState.navigationStack];
          newStack.pop(); // Remove current
          const previousNode = newStack[newStack.length - 1];
          
          updateSession({
            currentNodeId: previousNode,
            navigationStack: newStack,
            lastUpdated: Date.now()
          });
        }
        break;
      
      case 'jump':
        if (target) {
          // Jump to specific node without adding to history
          updateSession({
            currentNodeId: target,
            lastUpdated: Date.now()
          });
        }
        break;
    }
  }, [navigationStack.canGoBack, sessionState.navigationStack, navigateToNode, updateSession]);

  // Persist session manually
  const persistSession = useCallback(() => {
    sessionManager.persistSession(sessionState);
  }, [sessionState]);

  // Restore session
  const restoreSession = useCallback((sessionId: string) => {
    const restored = sessionManager.restoreSession(sessionId);
    if (restored) {
      setSessionState(restored);
    }
  }, []);

  // Create new session
  const createNewSession = useCallback(() => {
    const newSession = sessionManager.createInitialSessionState();
    setSessionState(newSession);
    sessionManager.persistSession(newSession);
  }, []);

  // Load session (latest or specific)
  const loadSession = useCallback((sessionId?: string): boolean => {
    const restored = sessionManager.restoreSession(sessionId);
    if (restored) {
      setSessionState(restored);
      return true;
    }
    return false;
  }, []);

  // Clear current session
  const clearCurrentSession = useCallback(() => {
    sessionManager.clearSession(sessionState.sessionId);
    createNewSession();
  }, [sessionState.sessionId, createNewSession]);

  // Set persistence strategy
  const setPersistenceStrategy = useCallback((strategy: PersistenceStrategy) => {
    sessionManager.setStrategy(strategy);
  }, []);

  const contextValue: ModalStateContextType = {
    sessionState,
    updateSession,
    addResponse,
    navigateToNode,
    persistSession,
    restoreSession,
    modalLifecycle,
    setModalLifecycle,
    navigationStack,
    navigate,
    createNewSession,
    loadSession,
    clearCurrentSession,
    setPersistenceStrategy
  };

  return (
    <ModalStateContext.Provider value={contextValue}>
      {children}
    </ModalStateContext.Provider>
  );
};

export const useModalState = (): ModalStateContextType => {
  const context = useContext(ModalStateContext);
  if (!context) {
    throw new Error('useModalState must be used within a ModalStateProvider');
  }
  return context;
};

