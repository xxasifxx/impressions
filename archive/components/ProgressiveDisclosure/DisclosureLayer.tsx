/**
 * Disclosure Layer Component
 * 
 * Renders information layers that progressively reveal based on user readiness.
 * Integrates with cognitive load assessment and professional context.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useProgressiveDisclosure, DisclosureLevel, InformationLayer } from './ProgressiveDisclosureEngine';
import { useContextualLayout } from '../ContextualLayout';

interface DisclosureLayerProps {
  layers: InformationLayer[];
  className?: string;
  onReveal?: (level: DisclosureLevel) => void;
  onHide?: (level: DisclosureLevel) => void;
}

export const DisclosureLayer: React.FC<DisclosureLayerProps> = ({
  layers,
  className = '',
  onReveal,
  onHide
}) => {
  const { context, revealLevel, canReveal, getRevealStrategy, updateUserReadiness } = useProgressiveDisclosure();
  const { state: contextualState } = useContextualLayout();
  const [visibleLayers, setVisibleLayers] = useState<Set<DisclosureLevel>>(new Set(['essential']));
  const [animatingLayers, setAnimatingLayers] = useState<Set<DisclosureLevel>>(new Set());
  const interactionCount = useRef(0);

  /**
   * Handle user interaction to track engagement
   */
  const handleInteraction = () => {
    interactionCount.current += 1;
    updateUserReadiness({ 
      interactionCount: interactionCount.current,
      engagementLevel: Math.min(interactionCount.current * 0.1, 1)
    });
  };

  /**
   * Auto-reveal layers based on strategy and readiness
   */
  useEffect(() => {
    layers.forEach(layer => {
      const strategy = getRevealStrategy(layer.level);
      const isReady = canReveal(layer.level);
      const isVisible = visibleLayers.has(layer.level);

      if (!isReady || isVisible) return;

      // Auto-reveal based on strategy
      if (strategy === 'immediate') {
        revealLayer(layer.level, 'immediate');
      } else if (strategy === 'progressive') {
        // Check if conditions are met
        const conditions = layer.triggerConditions;
        const readiness = context.userReadiness;

        const conditionsMet = (
          (!conditions.engagementThreshold || readiness.engagementLevel >= conditions.engagementThreshold) &&
          (!conditions.confidenceLevel || readiness.confidenceLevel >= conditions.confidenceLevel) &&
          (!conditions.timeSpent || readiness.timeSpent >= conditions.timeSpent) &&
          (!conditions.interactionDepth || readiness.interactionCount >= conditions.interactionDepth)
        );

        if (conditionsMet) {
          revealLayer(layer.level, 'progressive');
        }
      }
    });
  }, [context.userReadiness, layers]);

  /**
   * Reveal a layer with animation
   */
  const revealLayer = (level: DisclosureLevel, trigger: 'immediate' | 'progressive' | 'user-request') => {
    if (!canReveal(level) || visibleLayers.has(level)) return;

    const layer = layers.find(l => l.level === level);
    if (!layer) return;

    // Start animation
    setAnimatingLayers(prev => new Set([...prev, level]));
    
    // Reveal immediately for instant timing, otherwise use animation
    const timing = layer.revealAnimation?.timing || 'smooth';
    const delay = timing === 'instant' ? 0 : timing === 'quick' ? 150 : timing === 'smooth' ? 300 : 500;

    setTimeout(() => {
      setVisibleLayers(prev => new Set([...prev, level]));
      revealLevel(level, trigger === 'user-request' ? 'request' : 'engagement');
      onReveal?.(level);

      // End animation
      setTimeout(() => {
        setAnimatingLayers(prev => {
          const newSet = new Set(prev);
          newSet.delete(level);
          return newSet;
        });
      }, delay);
    }, delay);
  };

  /**
   * Hide a layer
   */
  const hideLayer = (level: DisclosureLevel) => {
    if (level === 'essential') return; // Never hide essential info

    setVisibleLayers(prev => {
      const newSet = new Set(prev);
      newSet.delete(level);
      return newSet;
    });
    
    onHide?.(level);
  };

  /**
   * Render layer with appropriate styling and animation
   */
  const renderLayer = (layer: InformationLayer) => {
    const isVisible = visibleLayers.has(layer.level);
    const isAnimating = animatingLayers.has(layer.level);
    const isAvailable = canReveal(layer.level);
    const strategy = getRevealStrategy(layer.level);

    if (!isVisible && strategy !== 'on-demand') return null;

    const animation = layer.revealAnimation || { timing: 'smooth', direction: 'fade', easing: 'ease-out' };
    
    const layerClasses = [
      'disclosure-layer',
      `disclosure-level-${layer.level}`,
      `contextual-${contextualState.currentContext}`,
      `${contextualState.visualComplexity}-complexity`,
      isVisible ? 'visible' : 'hidden',
      isAnimating ? 'animating' : '',
      `reveal-${animation.direction}`,
      `timing-${animation.timing}`
    ].filter(Boolean).join(' ');

    const layerStyle: React.CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transform: getTransformForDirection(animation.direction, isVisible),
      transition: `all ${getTimingDuration(animation.timing)}ms ${animation.easing}`,
      pointerEvents: isVisible ? 'auto' : 'none'
    };

    return (
      <div
        key={layer.level}
        className={layerClasses}
        style={layerStyle}
        onClick={handleInteraction}
        data-functional-purpose={layer.functionalPurpose}
        data-disclosure-level={layer.level}
        data-reveal-strategy={strategy}
      >
        {/* Show reveal button for on-demand content */}
        {!isVisible && strategy === 'on-demand' && isAvailable && (
          <button
            className="disclosure-reveal-button contextual-interactive"
            onClick={(e) => {
              e.stopPropagation();
              revealLayer(layer.level, 'user-request');
            }}
            aria-label={`Reveal ${layer.level} information`}
          >
            <span className="contextual-typography">
              Show {layer.level} details
            </span>
          </button>
        )}

        {/* Layer content */}
        {isVisible && (
          <div className="disclosure-content">
            {layer.content}
            
            {/* Hide button for non-essential content */}
            {layer.level !== 'essential' && (
              <button
                className="disclosure-hide-button"
                onClick={(e) => {
                  e.stopPropagation();
                  hideLayer(layer.level);
                }}
                aria-label={`Hide ${layer.level} information`}
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`progressive-disclosure ${className}`}
      data-professional-context={contextualState.currentContext}
      data-visual-complexity={contextualState.visualComplexity}
      data-cognitive-load={context.userReadiness.cognitiveLoad}
    >
      {layers.map(renderLayer)}
    </div>
  );
};

/**
 * Get CSS transform for reveal direction
 */
function getTransformForDirection(direction: string, isVisible: boolean): string {
  if (isVisible) return 'none';
  
  switch (direction) {
    case 'slide':
      return 'translateY(-10px)';
    case 'expand':
      return 'scaleY(0)';
    case 'unfold':
      return 'scaleY(0) rotateX(-90deg)';
    case 'fade':
    default:
      return 'none';
  }
}

/**
 * Get animation duration for timing
 */
function getTimingDuration(timing: string): number {
  switch (timing) {
    case 'instant':
      return 0;
    case 'quick':
      return 150;
    case 'smooth':
      return 300;
    case 'deliberate':
      return 500;
    default:
      return 300;
  }
}

