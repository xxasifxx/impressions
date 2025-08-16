# Consultation Flow & Decision Tree Specification

## Overview

The Consultation Flow & Decision Tree is a core component of the Impressions Beauty Web platform, designed to guide users through a personalized consultation experience that maps their needs, preferences, and concerns to appropriate beauty services. This system works in tandem with the Aesthetic Evolution System to create a cohesive, responsive user experience that subtly evolves as users progress through their journey.

## Goals

1. Create an intuitive, conversational consultation flow that feels personalized
2. Map user responses to appropriate service recommendations using the existing metatag system
3. Build comprehensive user profiles during the consultation process
4. Trigger appropriate aesthetic evolution states at key decision points
5. Generate personalized service recommendations with high relevance
6. Support cross-domain recommendations when appropriate

## User Journey

The consultation flow is a critical part of the streamlined user journey:

```
Home → Consultation → Personalized Results → Cart Checkout → Booking → Confirmation
```

This specification focuses on the Consultation phase and its transition to Personalized Results.

## Consultation Structure

### Entry Points

Users can enter the consultation flow through multiple entry points:

1. **Primary Entry**: Direct from homepage via prominent "Find Your Perfect Service" CTA
2. **Domain-Specific Entry**: From domain landing pages (Hair, Makeup, Spa, etc.)
3. **Concern-Based Entry**: From concern-focused content (e.g., "Solutions for Dry Hair")
4. **Re-Entry**: From previous consultation results for refinement

Each entry point will initialize the consultation with appropriate context:

| Entry Point | Initial Domain Focus | Initial Question Set | Aesthetic State |
|-------------|----------------------|----------------------|-----------------|
| Primary | None (Domain-agnostic) | General Interest | Uncertain |
| Domain-Specific | Pre-selected domain | Domain-specific | Exploring |
| Concern-Based | Related domain | Concern-specific | Exploring |
| Re-Entry | Previous domain | Refinement | Engaged |

### Question Types

The consultation will utilize several question types to gather user information:

1. **Single-Select**: One choice from multiple options
2. **Multi-Select**: Multiple choices from options
3. **Rating Scale**: Numerical rating (1-5 or 1-10)
4. **Image Selection**: Choose from visual options
5. **Text Input**: Limited free-form responses for specific data points

Each question will be tagged with metadata that influences:
- Which services it relates to
- How it affects the aesthetic evolution
- Which questions should follow based on the response

### Decision Tree Structure

The consultation uses a hybrid decision tree model:

1. **Core Path**: Essential questions that all users answer
2. **Branch Paths**: Specialized question sets based on previous responses
3. **Skip Logic**: Ability to bypass irrelevant questions based on context
4. **Merge Points**: Where branch paths reconverge for common questions

The decision tree is not strictly hierarchical but allows for dynamic path generation based on accumulated user profile data.

## User Profile Building

As users progress through the consultation, the system builds a comprehensive profile with several components:

### Domain Affinity

Tracks user interest across service domains:

```typescript
interface DomainAffinity {
  hair: number; // 0-100 scale
  makeup: number;
  facial: number;
  lash: number;
  brow: number;
  waxing: number;
  threading: number;
}
```

### Metatag Weights

Accumulates weights for service metatags based on responses:

```typescript
interface MetatagWeights {
  experienceLevel: Record<string, number>; // e.g., {"beginner-friendly": 80, "advanced-techniques": 20}
  timeInvestment: Record<string, number>;
  enhancementFocus: Record<string, number>;
  occasionSuitability: Record<string, number>;
  maintenanceCommitment: Record<string, number>;
  pricePoint: Record<string, number>;
  resultPermanence: Record<string, number>;
  riskLevel: Record<string, number>;
  serviceCompatibility: Record<string, number>;
  urgencyLevel: Record<string, number>;
  serviceComplexity: Record<string, number>;
  emotionalContext: Record<string, number>;
  clientEligibility: Record<string, number>;
}
```

### Explicit Preferences

Direct preferences stated by the user:

```typescript
interface ExplicitPreferences {
  mustHave: string[]; // Features/aspects the user explicitly wants
  mustAvoid: string[]; // Features/aspects the user explicitly wants to avoid
  priceMax: number | null; // Maximum price point if specified
  timeMax: number | null; // Maximum time commitment if specified
}
```

### Demographic Information

Optional demographic data that may influence recommendations:

```typescript
interface Demographics {
  ageRange?: string;
  gender?: string;
  skinType?: string;
  hairType?: string;
  sensitivityLevel?: string;
}
```

### Consultation Context

Metadata about the consultation itself:

```typescript
interface ConsultationContext {
  entryPoint: 'primary' | 'domain-specific' | 'concern-based' | 're-entry';
  completionPercentage: number;
  startTime: Date;
  questionsAnswered: number;
  currentPath: string;
  emotionalState: 'uncertain' | 'exploring' | 'engaged' | 'confident' | 'celebratory';
}
```

## Aesthetic Evolution Integration

The consultation flow will trigger aesthetic evolution at key points:

### Transition Triggers

1. **Domain Selection**: When a user selects a primary service domain
   - Transition from 'uncertain' to 'exploring'
   - Apply domain-specific color palette

2. **Commitment Point**: When a user has answered enough questions to show investment
   - Transition from 'exploring' to 'engaged'
   - Enhance typography and spacing

3. **Preference Clarity**: When user profile has strong affinity scores
   - Transition from 'engaged' to 'confident'
   - Refine visual presentation

4. **Completion**: When consultation is complete and showing results
   - Transition to 'celebratory'
   - Apply full visual enhancement

### Visual Feedback

Each question will provide subtle visual feedback that reinforces the user's progress:

1. **Progress Indicator**: Shows completion percentage with domain-appropriate styling
2. **Response Confirmation**: Brief animation acknowledging each response
3. **Path Visualization**: Optional breadcrumb showing the consultation path
4. **Aesthetic Shifts**: Subtle color and typography changes as emotional state evolves

## Service Recommendation Algorithm

The recommendation engine uses a multi-step process to match user profiles to services:

### Filtering Phase

1. **Hard Constraints**: Apply explicit user preferences as filters
   - Remove services outside price/time constraints
   - Remove services conflicting with "must avoid" preferences
   - Prioritize services matching "must have" preferences

2. **Eligibility Filtering**: Remove services inappropriate for user
   - Apply client eligibility metatags
   - Consider demographic compatibility

### Scoring Phase

Each remaining service receives a composite score based on:

1. **Domain Affinity Score**: How well the service matches domain interests
2. **Metatag Alignment Score**: Weighted match between service metatags and user profile
3. **Contextual Relevance Score**: Based on entry point and consultation path
4. **Popularity Adjustment**: Slight boost for popular services within the matching set

The scoring formula:

```
ServiceScore = (DomainAffinityScore * 0.3) + 
               (MetatagAlignmentScore * 0.5) + 
               (ContextualRelevanceScore * 0.15) + 
               (PopularityAdjustment * 0.05)
```

### Diversity Enforcement

To ensure varied recommendations:

1. **Domain Distribution**: Ensure representation across domains with high affinity
2. **Service Type Variety**: Include different service types within domains
3. **Price Range Distribution**: Include options across appropriate price ranges
4. **Novelty Inclusion**: Include at least one "discovery" recommendation

### Results Presentation

Results will be organized into:

1. **Primary Recommendations**: Top 3-5 services with highest scores
2. **Domain Categories**: Additional recommendations grouped by domain
3. **Bundled Suggestions**: Complementary service combinations
4. **Alternative Options**: Services that match some but not all criteria

## Implementation Details

### Data Sources

The consultation system will utilize:

1. **Service Catalog**: The comprehensive service database with metatags
2. **Question Bank**: Structured question data with response options
3. **Decision Tree Map**: Rules for question sequencing and branching
4. **Domain Definitions**: Characteristics and relationships between domains
5. **Metatag Definitions**: Complete metatag system with weights and relationships

### State Management

The consultation state will be managed through:

```typescript
interface ConsultationState {
  userProfile: {
    domainAffinity: DomainAffinity;
    metatagWeights: MetatagWeights;
    explicitPreferences: ExplicitPreferences;
    demographics: Demographics;
  };
  context: ConsultationContext;
  history: {
    questionId: string;
    responseIds: string[];
    timestamp: Date;
  }[];
  currentQuestion: {
    id: string;
    text: string;
    responseType: string;
    options: any[];
  };
  nextQuestions: string[];
  results: null | ServiceRecommendation[];
}
```

### API Endpoints

The consultation system will expose these key endpoints:

1. `GET /api/consultation/start` - Initialize consultation session
2. `GET /api/consultation/questions/:id` - Fetch question by ID
3. `POST /api/consultation/response` - Submit response and get next question
4. `GET /api/consultation/results` - Generate and retrieve recommendations
5. `POST /api/consultation/save` - Save consultation for later reference
6. `GET /api/consultation/resume/:id` - Resume saved consultation

## User Experience Considerations

### Accessibility

1. All questions and responses will be fully accessible with proper ARIA attributes
2. Keyboard navigation will be supported throughout the flow
3. Color contrast will meet WCAG AA standards even during aesthetic transitions
4. Text alternatives will be provided for image-based questions

### Performance

1. Questions will be pre-loaded to minimize latency between responses
2. Progressive loading will be used for image-heavy questions
3. State will be persisted to prevent data loss if session is interrupted
4. Recommendation calculation will be optimized to complete in under 500ms

### Mobile Experience

1. Question layout will adapt to mobile viewport
2. Touch-friendly response options with appropriate tap targets
3. Reduced animation on low-power devices
4. Offline support for continuing consultation with intermittent connectivity

## Testing and Validation

### Effectiveness Metrics

The consultation system will be evaluated based on:

1. **Completion Rate**: Percentage of users who complete the consultation
2. **Recommendation Acceptance**: Rate at which users select recommended services
3. **Cross-Domain Discovery**: Rate of cross-domain service selection
4. **Time Efficiency**: Average time to complete consultation
5. **Satisfaction Score**: User ratings of recommendation relevance

### A/B Testing Strategy

Initial A/B tests will focus on:

1. Question sequencing variations
2. Different visual feedback mechanisms
3. Recommendation presentation formats
4. Entry point effectiveness

## Future Enhancements

1. **AI-Enhanced Recommendations**: Incorporate machine learning to improve matching
2. **Voice-Based Consultation**: Support for voice input and conversational UI
3. **AR Service Preview**: Augmented reality previews of service results
4. **Social Proof Integration**: Incorporate reviews and before/after imagery
5. **Consultation History**: Allow users to compare multiple consultation results

## Conclusion

The Consultation Flow & Decision Tree system creates a personalized, adaptive experience that guides users to the most relevant beauty services while building a comprehensive user profile. By integrating with the Aesthetic Evolution System, it provides subtle visual feedback that enhances the user experience and creates a sense of progression and personalization.

