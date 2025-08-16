import { ConsultationSessionState } from '@/data/models';

export type PersistenceStrategy = 'localStorage' | 'sessionStorage' | 'memory';

class SessionManager {
  private memoryStore: Map<string, ConsultationSessionState> = new Map();
  private strategy: PersistenceStrategy = 'localStorage';

  setStrategy(strategy: PersistenceStrategy) {
    this.strategy = strategy;
  }

  generateSessionId(): string {
    return `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  persistSession(sessionState: ConsultationSessionState): void {
    const serializedState = JSON.stringify({
      ...sessionState,
      lastUpdated: Date.now()
    });

    switch (this.strategy) {
      case 'localStorage':
        try {
          localStorage.setItem(`consultation_${sessionState.sessionId}`, serializedState);
          // Also store the latest session ID for quick access
          localStorage.setItem('latest_consultation_session', sessionState.sessionId);
        } catch (error) {
          console.warn('Failed to persist to localStorage, falling back to memory:', error);
          this.memoryStore.set(sessionState.sessionId, sessionState);
        }
        break;
      
      case 'sessionStorage':
        try {
          sessionStorage.setItem(`consultation_${sessionState.sessionId}`, serializedState);
          sessionStorage.setItem('latest_consultation_session', sessionState.sessionId);
        } catch (error) {
          console.warn('Failed to persist to sessionStorage, falling back to memory:', error);
          this.memoryStore.set(sessionState.sessionId, sessionState);
        }
        break;
      
      case 'memory':
        this.memoryStore.set(sessionState.sessionId, sessionState);
        break;
    }
  }

  restoreSession(sessionId?: string): ConsultationSessionState | null {
    let targetSessionId = sessionId;
    
    // If no sessionId provided, try to get the latest session
    if (!targetSessionId) {
      switch (this.strategy) {
        case 'localStorage':
          targetSessionId = localStorage.getItem('latest_consultation_session') || undefined;
          break;
        case 'sessionStorage':
          targetSessionId = sessionStorage.getItem('latest_consultation_session') || undefined;
          break;
        case 'memory':
          // Get the most recent session from memory
          const sessions = Array.from(this.memoryStore.values());
          if (sessions.length > 0) {
            const latest = sessions.reduce((latest, current) => 
              current.lastUpdated > latest.lastUpdated ? current : latest
            );
            targetSessionId = latest.sessionId;
          }
          break;
      }
    }

    if (!targetSessionId) {
      return null;
    }

    switch (this.strategy) {
      case 'localStorage':
        try {
          const stored = localStorage.getItem(`consultation_${targetSessionId}`);
          return stored ? JSON.parse(stored) : null;
        } catch (error) {
          console.warn('Failed to restore from localStorage:', error);
          return null;
        }
      
      case 'sessionStorage':
        try {
          const stored = sessionStorage.getItem(`consultation_${targetSessionId}`);
          return stored ? JSON.parse(stored) : null;
        } catch (error) {
          console.warn('Failed to restore from sessionStorage:', error);
          return null;
        }
      
      case 'memory':
        return this.memoryStore.get(targetSessionId) || null;
      
      default:
        return null;
    }
  }

  clearSession(sessionId: string): void {
    switch (this.strategy) {
      case 'localStorage':
        localStorage.removeItem(`consultation_${sessionId}`);
        if (localStorage.getItem('latest_consultation_session') === sessionId) {
          localStorage.removeItem('latest_consultation_session');
        }
        break;
      
      case 'sessionStorage':
        sessionStorage.removeItem(`consultation_${sessionId}`);
        if (sessionStorage.getItem('latest_consultation_session') === sessionId) {
          sessionStorage.removeItem('latest_consultation_session');
        }
        break;
      
      case 'memory':
        this.memoryStore.delete(sessionId);
        break;
    }
  }

  clearAllSessions(): void {
    switch (this.strategy) {
      case 'localStorage':
        const localKeys = Object.keys(localStorage).filter(key => key.startsWith('consultation_'));
        localKeys.forEach(key => localStorage.removeItem(key));
        localStorage.removeItem('latest_consultation_session');
        break;
      
      case 'sessionStorage':
        const sessionKeys = Object.keys(sessionStorage).filter(key => key.startsWith('consultation_'));
        sessionKeys.forEach(key => sessionStorage.removeItem(key));
        sessionStorage.removeItem('latest_consultation_session');
        break;
      
      case 'memory':
        this.memoryStore.clear();
        break;
    }
  }

  listSessions(): string[] {
    switch (this.strategy) {
      case 'localStorage':
        return Object.keys(localStorage)
          .filter(key => key.startsWith('consultation_'))
          .map(key => key.replace('consultation_', ''));
      
      case 'sessionStorage':
        return Object.keys(sessionStorage)
          .filter(key => key.startsWith('consultation_'))
          .map(key => key.replace('consultation_', ''));
      
      case 'memory':
        return Array.from(this.memoryStore.keys());
      
      default:
        return [];
    }
  }

  createInitialSessionState(sessionId?: string): ConsultationSessionState {
    const id = sessionId || this.generateSessionId();
    const now = Date.now();
    
    return {
      sessionId: id,
      startTime: now,
      lastUpdated: now,
      currentNodeId: 'entry',
      responses: [],
      userProfile: {},
      preferences: {
        categories: [],
        priceRange: { min: 0, max: 1000 },
        timeAvailability: 'flexible'
      },
      recommendedItems: [],
      artEvolution: {
        currentTheme: 'neutral',
        evolutionStage: 0,
        colorPalette: ['#f8f9fa', '#e9ecef', '#dee2e6'],
        styleIntensity: 1,
        transitionDirection: 'subtle',
        triggers: []
      },
      navigationStack: ['entry'],
      isComplete: false
    };
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();

