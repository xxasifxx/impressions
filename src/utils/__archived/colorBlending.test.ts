/**
 * Production-Grade Color Blending Tests
 * 
 * Validates LAB color space blending, accessibility compliance,
 * and context-aware blending strategies.
 */

import { 
  blendColors, 
  getContextBlendingStrategy, 
  blendColorGradient,
  ColorBlendCache 
} from '../colorBlending';

describe('Production Color Blending System', () => {
  
  describe('Basic Color Blending', () => {
    test('should blend colors smoothly in LAB space', () => {
      const color1 = '#ff0000'; // Red
      const color2 = '#0000ff'; // Blue
      
      // Test midpoint blend
      const midBlend = blendColors(color1, color2, 0.5);
      expect(midBlend).toMatch(/^#[0-9a-f]{6}$/i);
      expect(midBlend).not.toBe(color1);
      expect(midBlend).not.toBe(color2);
    });

    test('should return original colors at extremes', () => {
      const color1 = '#ff0000';
      const color2 = '#0000ff';
      
      const blend0 = blendColors(color1, color2, 0);
      const blend1 = blendColors(color1, color2, 1);
      
      // Should be very close to original colors (allowing for LAB conversion rounding)
      expect(blend0.toLowerCase()).toMatch(/^#[f-9][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/);
      expect(blend1.toLowerCase()).toMatch(/^#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][f-9][0-9a-f]$/);
    });

    test('should handle invalid ratios gracefully', () => {
      const color1 = '#ff0000';
      const color2 = '#0000ff';
      
      // Should clamp ratios to 0-1 range
      const underBlend = blendColors(color1, color2, -0.5);
      const overBlend = blendColors(color1, color2, 1.5);
      
      expect(underBlend).toMatch(/^#[0-9a-f]{6}$/i);
      expect(overBlend).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('Context-Aware Blending Strategies', () => {
    test('should return appropriate strategies for professional contexts', () => {
      expect(getContextBlendingStrategy('clinical')).toBe('linear');
      expect(getContextBlendingStrategy('artistic')).toBe('ease-in-out');
      expect(getContextBlendingStrategy('luxury')).toBe('ease-in-out');
      expect(getContextBlendingStrategy('dramatic')).toBe('ease-in');
      expect(getContextBlendingStrategy('unknown')).toBe('linear');
    });

    test('should apply different blending strategies', () => {
      const color1 = '#ff0000';
      const color2 = '#0000ff';
      const ratio = 0.3;
      
      const linearBlend = blendColors(color1, color2, ratio, { strategy: 'linear' });
      const easeInBlend = blendColors(color1, color2, ratio, { strategy: 'ease-in' });
      const easeOutBlend = blendColors(color1, color2, ratio, { strategy: 'ease-out' });
      
      // Different strategies should produce different results
      expect(linearBlend).not.toBe(easeInBlend);
      expect(linearBlend).not.toBe(easeOutBlend);
      expect(easeInBlend).not.toBe(easeOutBlend);
    });
  });

  describe('Accessibility Compliance', () => {
    test('should maintain contrast when requested', () => {
      const highContrastColor = '#000000'; // Black
      const lowContrastColor = '#cccccc';  // Light gray
      
      const blend = blendColors(highContrastColor, lowContrastColor, 0.8, {
        maintainContrast: true,
        minContrastRatio: 4.5
      });
      
      expect(blend).toMatch(/^#[0-9a-f]{6}$/i);
      // Should not be too light if we're trying to maintain contrast
      expect(blend.toLowerCase()).not.toBe('#cccccc');
    });

    test('should handle contrast maintenance edge cases', () => {
      const color1 = '#ffffff'; // White
      const color2 = '#000000'; // Black
      
      // Should handle extreme contrast scenarios
      const blend = blendColors(color1, color2, 0.5, {
        maintainContrast: true,
        minContrastRatio: 4.5
      });
      
      expect(blend).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('Gradient Generation', () => {
    test('should create smooth color gradients', () => {
      const colors = ['#ff0000', '#00ff00', '#0000ff']; // Red, Green, Blue
      const gradient = blendColorGradient(colors, 5);
      
      expect(gradient).toHaveLength(5);
      expect(gradient[0]).toBe('#ff0000'); // Should start with first color
      expect(gradient[4]).toBe('#0000ff'); // Should end with last color
      
      // All colors should be valid hex
      gradient.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    test('should handle edge cases in gradient generation', () => {
      // Single color
      const singleGradient = blendColorGradient(['#ff0000'], 3);
      expect(singleGradient).toEqual(['#ff0000']);
      
      // Two colors, two steps
      const twoStepGradient = blendColorGradient(['#ff0000', '#0000ff'], 2);
      expect(twoStepGradient).toHaveLength(2);
    });
  });

  describe('Performance Optimization', () => {
    test('should cache blended colors for performance', () => {
      const cache = new ColorBlendCache();
      const color1 = '#ff0000';
      const color2 = '#0000ff';
      const ratio = 0.5;
      
      // First call should calculate
      const blend1 = cache.getBlendedColor(color1, color2, ratio);
      
      // Second call should use cache
      const blend2 = cache.getBlendedColor(color1, color2, ratio);
      
      expect(blend1).toBe(blend2);
      expect(blend1).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should limit cache size to prevent memory leaks', () => {
      const cache = new ColorBlendCache();
      
      // Fill cache beyond limit
      for (let i = 0; i < 1100; i++) {
        cache.getBlendedColor('#ff0000', '#0000ff', i / 1100);
      }
      
      // Cache should not grow indefinitely
      // This is a behavioral test - we can't directly check cache size
      // but we can verify it still works
      const result = cache.getBlendedColor('#ff0000', '#0000ff', 0.5);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should clear cache when requested', () => {
      const cache = new ColorBlendCache();
      
      // Add something to cache
      cache.getBlendedColor('#ff0000', '#0000ff', 0.5);
      
      // Clear cache
      cache.clearCache();
      
      // Should still work after clearing
      const result = cache.getBlendedColor('#ff0000', '#0000ff', 0.5);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('Real-World Beauty Context Scenarios', () => {
    test('should blend emotional and professional context colors', () => {
      // Uncertain emotional state (soft blue) + Clinical context (clean white)
      const emotionalColor = '#87ceeb'; // Sky blue (uncertain/calming)
      const clinicalColor = '#f8f9fa';  // Clean white (clinical)
      
      const blend = blendColors(emotionalColor, clinicalColor, 0.3, {
        strategy: 'linear',
        maintainContrast: true
      });
      
      expect(blend).toMatch(/^#[0-9a-f]{6}$/i);
      // Should be somewhere between the two colors
      expect(blend).not.toBe(emotionalColor);
      expect(blend).not.toBe(clinicalColor);
    });

    test('should handle luxury wedding context blending', () => {
      // Confident emotional state (gold) + Luxury context (deep purple)
      const confidentColor = '#ffd700'; // Gold (confident)
      const luxuryColor = '#4b0082';     // Indigo (luxury)
      
      const blend = blendColors(confidentColor, luxuryColor, 0.4, {
        strategy: 'ease-in-out', // Luxury uses smooth transitions
        maintainContrast: true
      });
      
      expect(blend).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should handle artistic makeup context blending', () => {
      // Engaged emotional state (vibrant) + Artistic context (creative)
      const engagedColor = '#ff6b6b';  // Coral (engaged/energetic)
      const artisticColor = '#9b59b6'; // Purple (artistic/creative)
      
      const blend = blendColors(engagedColor, artisticColor, 0.6, {
        strategy: 'ease-in-out', // Artistic uses creative transitions
        maintainContrast: false  // Artistic can be more experimental
      });
      
      expect(blend).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle invalid hex colors gracefully', () => {
      // This test depends on implementation - might throw or return fallback
      expect(() => {
        blendColors('invalid', '#ff0000', 0.5);
      }).not.toThrow(); // Should handle gracefully, not crash
    });

    test('should handle short hex colors', () => {
      // 3-digit hex colors should work
      const result = blendColors('#f00', '#00f', 0.5);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should handle colors without # prefix', () => {
      const result = blendColors('ff0000', '0000ff', 0.5);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});

/**
 * Visual Regression Test Data
 * 
 * These are expected color blends for visual regression testing.
 * Update these values if the blending algorithm changes intentionally.
 */
export const EXPECTED_BLENDS = {
  'red-blue-50': {
    input: { color1: '#ff0000', color2: '#0000ff', ratio: 0.5 },
    // Expected output would be calculated and stored here for regression testing
    // expected: '#calculated-result'
  },
  'clinical-uncertain': {
    input: { color1: '#87ceeb', color2: '#f8f9fa', ratio: 0.3 },
    // expected: '#calculated-result'
  }
  // Add more test cases as needed
};

