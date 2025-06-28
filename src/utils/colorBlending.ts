/**
 * Production-Grade Color Blending System
 * 
 * Provides perceptually uniform color blending using LAB color space
 * for smooth transitions between emotional and professional contexts.
 * 
 * Key Features:
 * - LAB color space conversion for perceptual uniformity
 * - Context-aware blending strategies
 * - Accessibility compliance (contrast ratio maintenance)
 * - Performance optimized for 60fps animations
 */

export type BlendingStrategy = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface ColorBlendOptions {
  strategy?: BlendingStrategy;
  maintainContrast?: boolean;
  minContrastRatio?: number;
}

/**
 * Convert hex color to LAB color space
 * LAB provides perceptually uniform color blending
 */
function hexToLab(hex: string): [number, number, number] {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Convert RGB to XYZ
  const toXYZ = (c: number) => {
    if (c > 0.04045) {
      return Math.pow((c + 0.055) / 1.055, 2.4);
    }
    return c / 12.92;
  };
  
  const x = toXYZ(r) * 0.4124564 + toXYZ(g) * 0.3575761 + toXYZ(b) * 0.1804375;
  const y = toXYZ(r) * 0.2126729 + toXYZ(g) * 0.7151522 + toXYZ(b) * 0.0721750;
  const z = toXYZ(r) * 0.0193339 + toXYZ(g) * 0.1191920 + toXYZ(b) * 0.9503041;
  
  // Convert XYZ to LAB
  const xn = 0.95047; // D65 illuminant
  const yn = 1.00000;
  const zn = 1.08883;
  
  const fx = x / xn > 0.008856 ? Math.pow(x / xn, 1/3) : (7.787 * (x / xn) + 16/116);
  const fy = y / yn > 0.008856 ? Math.pow(y / yn, 1/3) : (7.787 * (y / yn) + 16/116);
  const fz = z / zn > 0.008856 ? Math.pow(z / zn, 1/3) : (7.787 * (z / zn) + 16/116);
  
  const L = 116 * fy - 16;
  const A = 500 * (fx - fy);
  const B = 200 * (fy - fz);
  
  return [L, A, B];
}

/**
 * Convert LAB color to hex
 */
function labToHex(lab: [number, number, number]): string {
  const [L, A, B] = lab;
  
  // Convert LAB to XYZ
  const fy = (L + 16) / 116;
  const fx = A / 500 + fy;
  const fz = fy - B / 200;
  
  const xn = 0.95047;
  const yn = 1.00000;
  const zn = 1.08883;
  
  const x = xn * (fx > 0.206897 ? Math.pow(fx, 3) : (fx - 16/116) / 7.787);
  const y = yn * (fy > 0.206897 ? Math.pow(fy, 3) : (fy - 16/116) / 7.787);
  const z = zn * (fz > 0.206897 ? Math.pow(fz, 3) : (fz - 16/116) / 7.787);
  
  // Convert XYZ to RGB
  const toRGB = (c: number) => {
    if (c > 0.0031308) {
      return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    }
    return 12.92 * c;
  };
  
  const r = toRGB(x * 3.2404542 + y * -1.5371385 + z * -0.4985314);
  const g = toRGB(x * -0.9692660 + y * 1.8760108 + z * 0.0415560);
  const b = toRGB(x * 0.0556434 + y * -0.2040259 + z * 1.0572252);
  
  // Clamp and convert to hex
  const clamp = (val: number) => Math.max(0, Math.min(1, val));
  const toHex = (val: number) => Math.round(clamp(val) * 255).toString(16).padStart(2, '0');
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Apply blending strategy to ratio
 */
function applyBlendingStrategy(ratio: number, strategy: BlendingStrategy): number {
  switch (strategy) {
    case 'ease-in':
      return ratio * ratio;
    case 'ease-out':
      return 1 - Math.pow(1 - ratio, 2);
    case 'ease-in-out':
      return ratio < 0.5 
        ? 2 * ratio * ratio 
        : 1 - Math.pow(-2 * ratio + 2, 2) / 2;
    case 'linear':
    default:
      return ratio;
  }
}

/**
 * Calculate relative luminance for contrast ratio calculation
 */
function getRelativeLuminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0];
  
  const [r, g, b] = rgb.map(c => {
    if (c <= 0.03928) {
      return c / 12.92;
    }
    return Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Production-grade color blending with LAB color space
 */
export function blendColors(
  color1: string, 
  color2: string, 
  ratio: number,
  options: ColorBlendOptions = {}
): string {
  const {
    strategy = 'linear',
    maintainContrast = false,
    minContrastRatio = 4.5 // WCAG AA standard
  } = options;
  
  // Apply blending strategy to ratio
  const adjustedRatio = applyBlendingStrategy(Math.max(0, Math.min(1, ratio)), strategy);
  
  // Convert colors to LAB space
  const lab1 = hexToLab(color1);
  const lab2 = hexToLab(color2);
  
  // Blend in LAB space for perceptual uniformity
  const blendedLab: [number, number, number] = [
    lab1[0] + (lab2[0] - lab1[0]) * adjustedRatio,
    lab1[1] + (lab2[1] - lab1[1]) * adjustedRatio,
    lab1[2] + (lab2[2] - lab1[2]) * adjustedRatio
  ];
  
  // Convert back to hex
  let blendedColor = labToHex(blendedLab);
  
  // Maintain contrast ratio if requested
  if (maintainContrast) {
    // This is a simplified contrast maintenance - in full production,
    // you might want more sophisticated contrast preservation
    const originalContrast = getContrastRatio(color1, '#ffffff');
    const blendedContrast = getContrastRatio(blendedColor, '#ffffff');
    
    if (blendedContrast < minContrastRatio && originalContrast >= minContrastRatio) {
      // If we've lost too much contrast, bias toward the more contrasting color
      const contrastBias = originalContrast > getContrastRatio(color2, '#ffffff') ? 0.3 : 0.7;
      const adjustedBlendedLab: [number, number, number] = [
        lab1[0] + (lab2[0] - lab1[0]) * (adjustedRatio * contrastBias),
        lab1[1] + (lab2[1] - lab1[1]) * (adjustedRatio * contrastBias),
        lab1[2] + (lab2[2] - lab1[2]) * (adjustedRatio * contrastBias)
      ];
      blendedColor = labToHex(adjustedBlendedLab);
    }
  }
  
  return blendedColor;
}

/**
 * Get recommended blending strategy for professional context
 */
export function getContextBlendingStrategy(context: string): BlendingStrategy {
  const strategyMap: Record<string, BlendingStrategy> = {
    'clinical': 'linear',        // Clean, direct transitions
    'artistic': 'ease-in-out',   // Smooth, creative transitions
    'sophisticated': 'ease-out', // Elegant, refined transitions
    'luxury': 'ease-in-out',     // Smooth, premium feel
    'wellness': 'ease-out',      // Gentle, calming transitions
    'precision': 'linear',       // Direct, no-nonsense
    'dramatic': 'ease-in',       // Bold, impactful
    'natural': 'ease-out'        // Soft, organic feel
  };
  
  return strategyMap[context] || 'linear';
}

/**
 * Batch blend multiple colors for gradient creation
 */
export function blendColorGradient(
  colors: string[],
  steps: number,
  strategy: BlendingStrategy = 'linear'
): string[] {
  if (colors.length < 2) return colors;
  if (steps < 2) return [colors[0], colors[colors.length - 1]];
  
  const gradient: string[] = [];
  const segmentSize = (steps - 1) / (colors.length - 1);
  
  for (let i = 0; i < steps; i++) {
    const position = i / segmentSize;
    const segmentIndex = Math.floor(position);
    const segmentRatio = position - segmentIndex;
    
    if (segmentIndex >= colors.length - 1) {
      gradient.push(colors[colors.length - 1]);
    } else {
      const blended = blendColors(
        colors[segmentIndex],
        colors[segmentIndex + 1],
        segmentRatio,
        { strategy }
      );
      gradient.push(blended);
    }
  }
  
  return gradient;
}

/**
 * Performance-optimized color blending for animations
 * Pre-calculates common blends to avoid repeated LAB conversions
 */
export class ColorBlendCache {
  private cache = new Map<string, string>();
  
  getBlendedColor(
    color1: string,
    color2: string,
    ratio: number,
    options: ColorBlendOptions = {}
  ): string {
    const key = `${color1}-${color2}-${ratio}-${JSON.stringify(options)}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    
    const blended = blendColors(color1, color2, ratio, options);
    this.cache.set(key, blended);
    
    // Limit cache size to prevent memory leaks
    if (this.cache.size > 1000) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    return blended;
  }
  
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton cache for performance
export const colorBlendCache = new ColorBlendCache();

