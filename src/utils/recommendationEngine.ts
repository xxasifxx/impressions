import { UnifiedService, getServicesByUserJourney, allUnifiedServices } from '@/data/unifiedServicesData';
import { ConsultationResponse } from '@/hooks/useConsultation';

export interface ServiceRecommendation {
  service: UnifiedService;
  score: number;
  reasoning: string[];
  bundleOpportunity?: boolean;
  marginTier?: 'high' | 'medium' | 'low';
}

export interface BundleRecommendation {
  id: string;
  name: string;
  services: UnifiedService[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  reasoning: string;
  marginAnalysis: {
    totalCost: number;
    totalMargin: number;
    marginPercentage: number;
  };
}

export interface RecommendationResult {
  primary: ServiceRecommendation[];
  complementary: ServiceRecommendation[];
  bundles: BundleRecommendation[];
  totalRecommendations: number;
  consultationSummary: string;
}

// Service pricing and margin analysis
const parsePrice = (priceString: string): number => {
  const cleanPrice = priceString.replace(/[$+]/g, '');
  return parseInt(cleanPrice) || 0;
};

// Estimated cost basis (typically 40-60% of service price for labor + materials)
const estimateCostBasis = (service: UnifiedService): number => {
  const price = parsePrice(service.price);
  
  // Different cost ratios by category
  const costRatios: Record<string, number> = {
    'Cuts & Styling': 0.45, // Lower material cost, higher skill
    'Color Services': 0.55, // Higher material cost
    'Treatments': 0.50,
    'Brow Services': 0.40, // Quick services, lower overhead
    'Lash Services': 0.45,
    'Makeup Application': 0.35, // Mostly skill-based
    'Facial Treatments': 0.50,
    'Threading': 0.30, // Very low material cost
    'Waxing': 0.35
  };
  
  const ratio = costRatios[service.category] || 0.50;
  return Math.round(price * ratio);
};

const calculateMargin = (service: UnifiedService): number => {
  const price = parsePrice(service.price);
  const cost = estimateCostBasis(service);
  return price - cost;
};

const getMarginTier = (service: UnifiedService): 'high' | 'medium' | 'low' => {
  const margin = calculateMargin(service);
  if (margin >= 40) return 'high';
  if (margin >= 20) return 'medium';
  return 'low';
};

// Consultation response scoring
const scoreServiceForConsultation = (
  service: UnifiedService, 
  responses: ConsultationResponse[]
): { score: number; reasoning: string[] } => {
  let score = 0;
  const reasoning: string[] = [];
  
  // Base score from user journey match
  const journeyResponse = responses.find(r => r.questionId.includes('occasion-type') || r.questionId.includes('change-level') || r.questionId.includes('confidence-goal'));
  if (journeyResponse && service.userJourneys?.includes(journeyResponse.optionId)) {
    score += journeyResponse.weight;
    reasoning.push(`Matches your ${journeyResponse.optionId.replace('-', ' ')} goals`);
  }
  
  // Timeline considerations
  const timelineResponse = responses.find(r => r.questionId === 'timeline');
  if (timelineResponse) {
    if (timelineResponse.optionId === 'this-week' && service.duration && !service.duration.includes('3+ hours')) {
      score += 5;
      reasoning.push('Available for quick turnaround');
    } else if (timelineResponse.optionId === 'planning-ahead' && service.difficulty === 'Advanced') {
      score += 3;
      reasoning.push('Perfect for planned transformation');
    }
  }
  
  // Maintenance preferences
  const maintenanceResponse = responses.find(r => r.questionId.includes('maintenance') || r.questionId.includes('routine'));
  if (maintenanceResponse) {
    if (maintenanceResponse.optionId.includes('low') && service.difficulty === 'Easy') {
      score += 4;
      reasoning.push('Low maintenance option');
    } else if (maintenanceResponse.optionId.includes('high') && service.difficulty === 'Advanced') {
      score += 4;
      reasoning.push('Sophisticated styling option');
    }
  }
  
  // Special occasion considerations
  const occasionResponse = responses.find(r => r.questionId === 'occasion-type');
  if (occasionResponse) {
    if (occasionResponse.optionId === 'wedding' && service.featured) {
      score += 6;
      reasoning.push('Perfect for your special day');
    } else if (occasionResponse.optionId === 'job-interview' && service.details?.perfectFor?.some(p => p.includes('professional'))) {
      score += 5;
      reasoning.push('Professional and polished look');
    }
  }
  
  return { score, reasoning };
};

// Find complementary services
const findComplementaryServices = (
  primaryService: UnifiedService,
  domain: string,
  responses: ConsultationResponse[]
): ServiceRecommendation[] => {
  const complementary: ServiceRecommendation[] = [];
  
  // Get services from packageCompatible
  if (primaryService.packageCompatible) {
    const compatibleServices = allUnifiedServices.filter(service => 
      service.domain === domain &&
      service.id !== primaryService.id &&
      primaryService.packageCompatible?.some(compat => 
        service.category.toLowerCase().includes(compat.replace('-', ' ')) ||
        service.id.includes(compat)
      )
    );
    
    compatibleServices.forEach(service => {
      const { score, reasoning } = scoreServiceForConsultation(service, responses);
      if (score > 0) {
        complementary.push({
          service,
          score: score + 2, // Bonus for being complementary
          reasoning: [...reasoning, `Complements your ${primaryService.name}`],
          bundleOpportunity: true,
          marginTier: getMarginTier(service)
        });
      }
    });
  }
  
  // Add category-based complementary services
  const categoryComplements: Record<string, string[]> = {
    'Cuts & Styling': ['Color Services', 'Treatments'],
    'Color Services': ['Cuts & Styling', 'Treatments'],
    'Makeup Application': ['Brow Services', 'Lash Services'],
    'Brow Services': ['Lash Services', 'Threading'],
    'Threading': ['Brow Services', 'Waxing'],
    'Facial Treatments': ['Threading', 'Waxing']
  };
  
  const complements = categoryComplements[primaryService.category] || [];
  complements.forEach(category => {
    const categoryServices = allUnifiedServices.filter(service => 
      service.domain === domain &&
      service.category === category &&
      service.id !== primaryService.id &&
      !complementary.some(c => c.service.id === service.id)
    );
    
    categoryServices.slice(0, 2).forEach(service => { // Limit to top 2 per category
      const { score, reasoning } = scoreServiceForConsultation(service, responses);
      if (score > 0) {
        complementary.push({
          service,
          score: score + 1,
          reasoning: [...reasoning, `Enhances your overall look`],
          bundleOpportunity: true,
          marginTier: getMarginTier(service)
        });
      }
    });
  });
  
  return complementary.sort((a, b) => b.score - a.score).slice(0, 4);
};

// Generate bundle recommendations
const generateBundles = (
  primary: ServiceRecommendation[],
  complementary: ServiceRecommendation[]
): BundleRecommendation[] => {
  const bundles: BundleRecommendation[] = [];
  
  // Create bundles with primary + complementary services
  primary.slice(0, 2).forEach(primaryRec => {
    const compatibleComplementary = complementary.filter(comp => 
      comp.bundleOpportunity && 
      comp.marginTier !== 'low' // Only bundle profitable services
    );
    
    // 2-service bundles
    compatibleComplementary.slice(0, 2).forEach(compRec => {
      const services = [primaryRec.service, compRec.service];
      const originalPrice = services.reduce((sum, s) => sum + parsePrice(s.price), 0);
      const totalCost = services.reduce((sum, s) => sum + estimateCostBasis(s), 0);
      const totalMargin = originalPrice - totalCost;
      
      // Apply 10-15% bundle discount while maintaining profitability
      const discountPercentage = totalMargin > 50 ? 0.15 : 0.10;
      const bundlePrice = Math.round(originalPrice * (1 - discountPercentage));
      const finalMargin = bundlePrice - totalCost;
      
      if (finalMargin > totalCost * 0.3) { // Ensure 30% margin minimum
        bundles.push({
          id: `bundle-${primaryRec.service.id}-${compRec.service.id}`,
          name: `${primaryRec.service.name} + ${compRec.service.name}`,
          services,
          originalPrice,
          bundlePrice,
          savings: originalPrice - bundlePrice,
          reasoning: `Perfect combination for your consultation goals`,
          marginAnalysis: {
            totalCost,
            totalMargin: finalMargin,
            marginPercentage: Math.round((finalMargin / bundlePrice) * 100)
          }
        });
      }
    });
    
    // 3-service bundles (premium packages)
    if (compatibleComplementary.length >= 2) {
      const topTwo = compatibleComplementary.slice(0, 2);
      const services = [primaryRec.service, ...topTwo.map(c => c.service)];
      const originalPrice = services.reduce((sum, s) => sum + parsePrice(s.price), 0);
      const totalCost = services.reduce((sum, s) => sum + estimateCostBasis(s), 0);
      const totalMargin = originalPrice - totalCost;
      
      // Larger discount for 3-service bundles
      const discountPercentage = totalMargin > 80 ? 0.20 : 0.15;
      const bundlePrice = Math.round(originalPrice * (1 - discountPercentage));
      const finalMargin = bundlePrice - totalCost;
      
      if (finalMargin > totalCost * 0.35) { // Higher margin requirement for complex bundles
        bundles.push({
          id: `bundle-premium-${primaryRec.service.id}`,
          name: `Complete ${primaryRec.service.category} Package`,
          services,
          originalPrice,
          bundlePrice,
          savings: originalPrice - bundlePrice,
          reasoning: `Complete transformation package with maximum value`,
          marginAnalysis: {
            totalCost,
            totalMargin: finalMargin,
            marginPercentage: Math.round((finalMargin / bundlePrice) * 100)
          }
        });
      }
    }
  });
  
  return bundles.sort((a, b) => b.savings - a.savings);
};

// Main recommendation engine
export const generateRecommendations = (
  domain: string,
  journey: string,
  responses: ConsultationResponse[]
): RecommendationResult => {
  // Get base services for the journey
  const journeyServices = getServicesByUserJourney(domain, journey);
  
  // Score and rank primary services
  const primaryRecommendations: ServiceRecommendation[] = journeyServices
    .map(service => {
      const { score, reasoning } = scoreServiceForConsultation(service, responses);
      return {
        service,
        score,
        reasoning,
        bundleOpportunity: !!service.packageCompatible?.length,
        marginTier: getMarginTier(service)
      };
    })
    .filter(rec => rec.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Top 3 primary recommendations
  
  // Find complementary services for top primary service
  const complementaryRecommendations = primaryRecommendations.length > 0 
    ? findComplementaryServices(primaryRecommendations[0].service, domain, responses)
    : [];
  
  // Generate profitable bundles
  const bundles = generateBundles(primaryRecommendations, complementaryRecommendations);
  
  // Create consultation summary
  const consultationSummary = `Based on your ${journey.replace('-', ' ')} consultation, we've curated personalized recommendations that match your preferences and goals.`;
  
  return {
    primary: primaryRecommendations,
    complementary: complementaryRecommendations,
    bundles,
    totalRecommendations: primaryRecommendations.length + complementaryRecommendations.length,
    consultationSummary
  };
};

// Utility function to format price
export const formatPrice = (price: number): string => {
  return `$${price}`;
};

// Utility function to calculate total bundle savings
export const calculateTotalSavings = (bundles: BundleRecommendation[]): number => {
  return bundles.reduce((total, bundle) => total + bundle.savings, 0);
};

