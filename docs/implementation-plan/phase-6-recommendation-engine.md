# Phase 6: Recommendation Engine & Benefit Categorization

## Overview

This phase focuses on enhancing the recommendation engine to categorize services by benefit rather than just by domain. The engine should identify complementary services across domains that serve similar needs or benefits, providing users with personalized recommendations that span the entire beauty experience.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Phase 2 (Service Data), Phase 4 (State Management)

## Objectives

1. Define benefit categories that span domains
2. Create algorithms to match user preferences to benefits
3. Implement logic for cross-domain service suggestions
4. Add explanation generation for recommendations
5. Create comprehensive recommendation types and interfaces

## Detailed Tasks

### 1. Recommendation Types Definition

- [ ] Create `RecommendationTypes.ts` with detailed type definitions
- [ ] Define interfaces for recommendation results
- [ ] Create types for benefit-based categorization
- [ ] Define types for recommendation explanations
- [ ] Add utility types for filtering and sorting recommendations

### 2. Benefit Categorization Utility

- [ ] Implement `benefitCategorization.ts` utility
- [ ] Create functions for grouping services by benefit
- [ ] Add algorithms for determining primary benefits
- [ ] Implement scoring system for benefit relevance
- [ ] Create utility functions for benefit-based filtering

### 3. Recommendation Engine Enhancement

- [ ] Enhance `recommendationEngine.ts` with benefit-based logic
- [ ] Implement algorithms for matching consultation responses to benefits
- [ ] Create cross-domain recommendation strategies
- [ ] Add personalization factors based on user preferences
- [ ] Implement recommendation scoring and ranking

### 4. Explanation Generation

- [ ] Create system for generating personalized explanations
- [ ] Implement templates for different recommendation types
- [ ] Add context-aware explanation selection
- [ ] Create benefit-focused explanation content
- [ ] Implement personalization in explanation text

### 5. Integration with Consultation Data

- [ ] Connect recommendation engine to consultation responses
- [ ] Create mapping between question responses and benefits
- [ ] Implement weighting system for different response types
- [ ] Add confidence scoring for recommendations
- [ ] Create fallback recommendation strategies

### 6. Testing and Optimization

- [ ] Create test suite for recommendation engine
- [ ] Implement A/B testing capability for recommendation strategies
- [ ] Add performance optimization for large service catalogs
- [ ] Create documentation for recommendation system
- [ ] Build a demo/playground for recommendation testing

## Technical Considerations

### Recommendation Result Structure

The recommendation result should be organized by benefit:

```typescript
interface RecommendationResult {
  // Primary benefit categories with services
  benefitCategories: {
    [benefitCategoryId: string]: {
      id: string;
      title: string;
      description: string;
      services: Service[];
      relevanceScore: number; // 0-1 score of how relevant this category is
    }
  };
  
  // Top recommended services across all categories
  primaryServices: Service[];
  
  // Complementary services that pair well with primary services
  complementaryServices: Service[];
  
  // Domain breakdown
  domainFocus: {
    'hair-salon': number; // 0-1 score
    'makeup-studio': number;
    'med-spa': number;
  };
  
  // Personalized explanations for recommendations
  explanations: {
    [serviceId: string]: string;
  };
  
  // Metadata about the recommendation
  metadata: {
    confidence: number; // 0-1 score of recommendation confidence
    generatedAt: number; // timestamp
    basedOn: string[]; // question IDs that influenced this
    consultationId: string;
  };
}
```

### Benefit Categorization Algorithm

The benefit categorization should map consultation responses to benefits:

```typescript
function categorizeBenefits(
  responses: ConsultationResponse[],
  questions: ConsultationQuestion[],
  benefitCategories: BenefitCategory[]
): Record<string, number> {
  // Initialize benefit scores
  const benefitScores: Record<string, number> = {};
  benefitCategories.forEach(category => {
    benefitScores[category.id] = 0;
  });
  
  // Process each response
  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId);
    if (!question) return;
    
    // Find selected options
    const selectedOptions = question.options.filter(
      option => response.selectedOptionIds.includes(option.id)
    );
    
    // Process each selected option
    selectedOptions.forEach(option => {
      // Get benefit tags from option metadata
      const benefitTags = option.metadata?.benefits || [];
      
      // Increase score for each matching benefit
      benefitTags.forEach(benefitTag => {
        // Find matching benefit categories
        benefitCategories.forEach(category => {
          if (category.tags.includes(benefitTag)) {
            // Increase score based on response weight
            benefitScores[category.id] += response.weight || 1;
          }
        });
      });
    });
  });
  
  // Normalize scores to 0-1 range
  const maxScore = Math.max(...Object.values(benefitScores), 1);
  Object.keys(benefitScores).forEach(key => {
    benefitScores[key] = benefitScores[key] / maxScore;
  });
  
  return benefitScores;
}
```

### Recommendation Generation

The recommendation engine should use benefit scores to select services:

```typescript
function generateRecommendations(
  benefitScores: Record<string, number>,
  services: Service[],
  userPreferences: UserPreferences
): RecommendationResult {
  // Sort benefit categories by score
  const sortedBenefits = Object.entries(benefitScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .filter(([, score]) => score > 0.3); // Only use significant benefits
  
  // Initialize result structure
  const result: RecommendationResult = {
    benefitCategories: {},
    primaryServices: [],
    complementaryServices: [],
    domainFocus: { 'hair-salon': 0, 'makeup-studio': 0, 'med-spa': 0 },
    explanations: {},
    metadata: {
      confidence: 0,
      generatedAt: Date.now(),
      basedOn: [],
      consultationId: userPreferences.consultationId
    }
  };
  
  // Process each significant benefit
  sortedBenefits.forEach(([benefitId, score]) => {
    const benefitCategory = getBenefitCategoryById(benefitId);
    if (!benefitCategory) return;
    
    // Find services matching this benefit
    const matchingServices = services.filter(service => 
      service.benefits.includes(benefitId)
    );
    
    // Sort by relevance to user preferences
    const sortedServices = sortServicesByRelevance(
      matchingServices, 
      userPreferences
    );
    
    // Take top services (limit to 3-5 per category)
    const topServices = sortedServices.slice(0, 4);
    
    // Add to result
    result.benefitCategories[benefitId] = {
      id: benefitId,
      title: benefitCategory.title,
      description: benefitCategory.description,
      services: topServices,
      relevanceScore: score
    };
    
    // Add to primary services if high relevance
    if (score > 0.7) {
      result.primaryServices.push(...topServices.slice(0, 2));
    }
    
    // Update domain focus
    topServices.forEach(service => {
      result.domainFocus[service.domain] += score;
    });
    
    // Generate explanations
    topServices.forEach(service => {
      result.explanations[service.id] = generateExplanation(
        service, 
        benefitCategory,
        userPreferences
      );
    });
  });
  
  // Normalize domain focus
  const totalDomainFocus = Object.values(result.domainFocus).reduce((a, b) => a + b, 0);
  if (totalDomainFocus > 0) {
    Object.keys(result.domainFocus).forEach(domain => {
      result.domainFocus[domain as keyof typeof result.domainFocus] /= totalDomainFocus;
    });
  }
  
  // Find complementary services
  result.complementaryServices = findComplementaryServices(
    result.primaryServices,
    services,
    userPreferences
  );
  
  // Generate explanations for complementary services
  result.complementaryServices.forEach(service => {
    result.explanations[service.id] = generateComplementaryExplanation(
      service,
      result.primaryServices,
      userPreferences
    );
  });
  
  // Calculate overall confidence
  result.metadata.confidence = calculateConfidence(
    sortedBenefits,
    result.primaryServices.length,
    userPreferences
  );
  
  return result;
}
```

### Explanation Generation

Personalized explanations should be generated for each recommendation:

```typescript
function generateExplanation(
  service: Service,
  benefitCategory: BenefitCategory,
  userPreferences: UserPreferences
): string {
  // Base templates for different benefit categories
  const templates = {
    'signature-look': [
      "Perfect for your personal style, this ${service.name} will ${benefit}.",
      "We recommended this ${service.name} because it aligns with your style preferences and will ${benefit}.",
      "Based on your consultation, this ${service.name} will enhance your signature look by ${benefitDetail}."
    ],
    'relaxation': [
      "This ${service.name} provides the relaxation you're looking for, helping you ${benefit}.",
      "For stress relief and renewal, we suggest this ${service.name} which will ${benefit}.",
      "Based on your preferences, this ${service.name} offers the perfect way to ${benefitDetail}."
    ],
    // Additional benefit category templates...
  };
  
  // Select template based on benefit category
  const categoryTemplates = templates[benefitCategory.id] || templates['signature-look'];
  const templateIndex = Math.floor(Math.random() * categoryTemplates.length);
  let template = categoryTemplates[templateIndex];
  
  // Personalization variables
  const variables = {
    service: service,
    benefit: getBenefitDescription(service, benefitCategory),
    benefitDetail: getDetailedBenefitDescription(service, userPreferences),
    userPreference: getRelevantUserPreference(userPreferences, service)
  };
  
  // Replace variables in template
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), value);
  });
  
  return template;
}
```

## Deliverables

1. `src/types/RecommendationTypes.ts` - Detailed type definitions
2. `src/utils/benefitCategorization.ts` - Benefit categorization utility
3. `src/utils/recommendationEngine.ts` - Enhanced recommendation engine
4. `src/utils/explanationGenerator.ts` - Explanation generation utility
5. `src/hooks/useRecommendations.ts` - Hook for accessing recommendations

## Testing Criteria

1. **Functional Testing:**
   - Recommendations match user preferences
   - Benefit categorization correctly groups services
   - Cross-domain recommendations are relevant
   - Explanations are personalized and meaningful

2. **Performance Testing:**
   - Recommendation generation is efficient
   - Handles large service catalogs without performance issues
   - Memory usage remains stable during recommendation generation
   - Caching mechanisms work correctly

3. **Edge Case Testing:**
   - Handles sparse or incomplete consultation data
   - Provides reasonable recommendations with limited information
   - Degrades gracefully with missing service data
   - Handles conflicting user preferences appropriately

4. **Integration Testing:**
   - Recommendations integrate with consultation results
   - Benefit categories display correctly on results page
   - Explanations render properly in service cards
   - Recommendation data persists across page navigations

## Next Steps

After completing this phase, we will move on to Phase 7: Personalized Results Page, which will implement the benefit-oriented results page that showcases the recommendations generated by this engine.

