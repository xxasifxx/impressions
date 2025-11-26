/**
 * Recommendation Engine - Generates personalized service recommendations
 * based on consultation responses.
 */

import { ConsultationResponse } from '@/hooks/useConsultation';

export interface RecommendationResult {
  primaryDomain: string;
  recommendedServices: Record<string, string[]>;
  crossDomainPackages: string[];
}

export interface ServiceRecommendation {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

export interface BundleRecommendation {
  id: string;
  name: string;
  description: string;
  services: string[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
}

/**
 * Generate recommendations based on consultation responses
 */
export function generateRecommendations(
  domain: string,
  journey: string,
  responses: ConsultationResponse[]
): RecommendationResult {
  // Mock implementation - in a real app, this would use a more sophisticated algorithm
  // and would likely call an API or use a more complex local algorithm
  
  // Default result structure
  const result: RecommendationResult = {
    primaryDomain: domain,
    recommendedServices: {
      'hair-salon': [],
      'makeup-studio': [],
      'med-spa': []
    },
    crossDomainPackages: []
  };
  
  // Add domain-specific recommendations based on the primary domain
  switch (domain) {
    case 'hair-salon':
      result.recommendedServices['hair-salon'] = [
        'hair-salon-haircut',
        'hair-salon-color',
        'hair-salon-treatment'
      ];
      break;
      
    case 'makeup-studio':
      result.recommendedServices['makeup-studio'] = [
        'makeup-studio-full-face',
        'makeup-studio-eyes',
        'makeup-studio-consultation'
      ];
      break;
      
    case 'med-spa':
      result.recommendedServices['med-spa'] = [
        'med-spa-facial',
        'med-spa-massage',
        'med-spa-treatment'
      ];
      break;
      
    default:
      // Default to hair salon if no domain specified
      result.recommendedServices['hair-salon'] = [
        'hair-salon-haircut',
        'hair-salon-style'
      ];
  }
  
  // Add cross-domain recommendations based on responses
  // This is a simplified mock implementation
  const hasHairInterest = responses.some(r => 
    r.questionId.includes('hair') || 
    r.optionId.includes('hair') ||
    r.weight > 0.7
  );
  
  const hasMakeupInterest = responses.some(r => 
    r.questionId.includes('makeup') || 
    r.optionId.includes('makeup') ||
    r.weight > 0.6
  );
  
  const hasSpaInterest = responses.some(r => 
    r.questionId.includes('spa') || 
    r.optionId.includes('treatment') ||
    r.weight > 0.5
  );
  
  // Add complementary services based on detected interests
  if (domain !== 'hair-salon' && hasHairInterest) {
    result.recommendedServices['hair-salon'] = [
      'hair-salon-quickstyle',
      'hair-salon-treatment'
    ];
  }
  
  if (domain !== 'makeup-studio' && hasMakeupInterest) {
    result.recommendedServices['makeup-studio'] = [
      'makeup-studio-express',
      'makeup-studio-consultation'
    ];
  }
  
  if (domain !== 'med-spa' && hasSpaInterest) {
    result.recommendedServices['med-spa'] = [
      'med-spa-express-facial',
      'med-spa-hand-treatment'
    ];
  }
  
  // Add cross-domain packages
  if (hasHairInterest && hasMakeupInterest) {
    result.crossDomainPackages.push('hair-makeup-combo');
  }
  
  if (hasMakeupInterest && hasSpaInterest) {
    result.crossDomainPackages.push('beauty-wellness-package');
  }
  
  if (hasHairInterest && hasSpaInterest) {
    result.crossDomainPackages.push('complete-refresh-package');
  }
  
  if (hasHairInterest && hasMakeupInterest && hasSpaInterest) {
    result.crossDomainPackages.push('ultimate-beauty-day');
  }
  
  return result;
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
