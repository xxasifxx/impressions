import React, { useEffect, useCallback, ReactNode } from 'react';
import { X, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModalState } from '@/hooks/useModalState';
import { useUnifiedCart } from '@/hooks/useUnifiedCart';
import { PersistenceStrategy } from '@/utils/sessionManager';
import {
  ModalLifecycleState,
  ArtEvolutionState,
  NavigationDirection
} from '@/data/models';

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  persistenceStrategy?: PersistenceStrategy;
  className?: string;
  showNavigation?: boolean;
  showSessionControls?: boolean;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  onClose,
  children,
  persistenceStrategy = 'localStorage',
  className = '',
  showNavigation = true,
  showSessionControls = false
}) => {
  const {
    sessionState,
    modalLifecycle,
    setModalLifecycle,
    navigationStack,
    navigate,
    createNewSession,
    clearCurrentSession,
    setPersistenceStrategy,
    persistSession
  } = useModalState();

  const { cartItems } = useUnifiedCart();

  // Set persistence strategy on mount
  useEffect(() => {
    setPersistenceStrategy(persistenceStrategy);
  }, [persistenceStrategy, setPersistenceStrategy]);

  // Handle modal lifecycle changes
  useEffect(() => {
    if (isOpen && modalLifecycle.phase === 'opening') {
      const timer = setTimeout(() => {
        setModalLifecycle({
          phase: 'active',
          previousPhase: 'opening',
          timestamp: Date.now()
        });
      }, 300); // Allow for opening animation

      return () => clearTimeout(timer);
    }
  }, [isOpen, modalLifecycle.phase, setModalLifecycle]);

  // Auto-persist session periodically
  useEffect(() => {
    if (isOpen && modalLifecycle.phase === 'active') {
      const interval = setInterval(() => {
        persistSession();
      }, 30000); // Persist every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isOpen, modalLifecycle.phase, persistSession]);

  // Handle modal close
  const handleClose = useCallback(() => {
    setModalLifecycle({
      phase: 'closing',
      previousPhase: modalLifecycle.phase,
      timestamp: Date.now()
    });

    // Persist session before closing
    persistSession();

    // Delay actual close to allow for closing animation
    setTimeout(() => {
      onClose();
      setModalLifecycle({
        phase: 'opening',
        timestamp: Date.now()
      });
    }, 300);
  }, [modalLifecycle.phase, setModalLifecycle, persistSession, onClose]);

  // Handle navigation
  const handleNavigation = useCallback((direction: NavigationDirection, target?: string) => {
    setModalLifecycle({
      phase: 'transitioning',
      previousPhase: modalLifecycle.phase,
      timestamp: Date.now()
    });

    navigate(direction, target);

    // Return to active state after transition
    setTimeout(() => {
      setModalLifecycle({
        phase: 'active',
        previousPhase: 'transitioning',
        timestamp: Date.now()
      });
    }, 200);
  }, [modalLifecycle.phase, setModalLifecycle, navigate]);

  // Generate dynamic styles based on art evolution
  const getDynamicStyles = useCallback((artEvolution: ArtEvolutionState) => {
    const { colorPalette, styleIntensity, currentTheme } = artEvolution;
    
    const baseStyles = {
      backgroundColor: colorPalette[0] || '#ffffff',
      borderColor: colorPalette[1] || '#e5e7eb',
      transition: 'all 0.3s ease-in-out'
    };

    // Theme-specific adjustments
    switch (currentTheme) {
      case 'elegant':
        return {
          ...baseStyles,
          background: `linear-gradient(135deg, ${colorPalette[0]}, ${colorPalette[1]})`,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        };
      
      case 'vibrant':
        return {
          ...baseStyles,
          background: `radial-gradient(circle at center, ${colorPalette[0]}, ${colorPalette[2]})`,
          transform: `scale(${1 + (styleIntensity - 1) * 0.02})`,
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)'
        };
      
      case 'minimal':
        return {
          ...baseStyles,
          backgroundColor: colorPalette[0],
          border: `1px solid ${colorPalette[1]}`,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        };
      
      default:
        return baseStyles;
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  const dynamicStyles = getDynamicStyles(sessionState.artEvolution);
  const isTransitioning = modalLifecycle.phase === 'transitioning';
  const isClosing = modalLifecycle.phase === 'closing';

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isClosing ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        className={`
          relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden
          ${isTransitioning ? 'opacity-75' : 'opacity-100'}
          ${className}
        `}
        style={dynamicStyles}
      >
        {/* Header with navigation and controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {showNavigation && navigationStack.canGoBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('back')}
                disabled={isTransitioning}
                className="flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            )}
            
            {showSessionControls && (
              <Button
                variant="ghost"
                size="sm"
                onClick={createNewSession}
                disabled={isTransitioning}
                className="flex items-center space-x-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </Button>
            )}
          </div>

          {/* Session info */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Step {sessionState.navigationStack.length}</span>
            {cartItems.length > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
              </span>
            )}
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isTransitioning}
            className="flex items-center justify-center w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content area */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className={`p-6 ${isTransitioning ? 'pointer-events-none' : ''}`}>
            {children}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${Math.min((sessionState.responses.length / 10) * 100, 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;

