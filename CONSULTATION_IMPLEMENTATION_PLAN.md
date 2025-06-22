# Consultation Experience Implementation Plan

**Created**: 2025-01-22  
**Status**: APPROVED - Ready for Implementation  
**Goal**: Transform website from "sophisticated shopping cart" into "virtual stylist consultation tool"  

## Executive Summary

### The Transformation
**From**: Landing Page → "View All Services" → Overwhelming Marketplace → Cart  
**To**: Landing Page → "What brings you in today?" → Consultation Questions → Personalized Recommendations → Sophisticated Cart

### Business Impact
- **Increase conversion rates** - Guided experience reduces decision paralysis
- **Increase average booking value** - Natural progression to service bundles  
- **Differentiate from competitors** - Premium consultation vs basic booking
- **Reduce support calls** - Clear, guided experience

## Implementation Phases

### Phase 1: Foundation (Steps 1-2)
**Goal**: Replace generic "View All Services" with consultation entry points

### Phase 2: Core Experience (Steps 3-5)  
**Goal**: Build interactive consultation and recommendation system

### Phase 3: Complete Implementation (Steps 6-8)
**Goal**: Full consultation experience across all domains

## Detailed Implementation Steps

### Step 1: Create Consultation Entry Component
**Confidence Level**: 9/10  
**Files**: 
- `src/components/ConsultationEntry.tsx` (new)
- `src/data/unifiedServicesData.ts` (existing)
- `src/contexts/DomainThemeContext.tsx` (existing)

**Description**: Build reusable ConsultationEntry component to replace generic 'View All Services' buttons. This component will show 'What brings you in today?' with specific journey buttons (Special Occasion, Transformation, Maintenance, etc.) and include a secondary 'browse all services' option. The component will be domain-aware and use the existing userJourneys data structure.

**Implementation Details**:
```jsx
// ConsultationEntry.tsx structure
<div className="consultation-entry">
  <h3>What brings you in today?</h3>
  <div className="journey-buttons">
    {journeys.map(journey => (
      <Button onClick={() => startConsultation(journey.id)}>
        {journey.title}
        <span className="description">{journey.description}</span>
      </Button>
    ))}
  </div>
  <Link to="/services?domain={domain}" className="secondary">
    Or browse all services
  </Link>
</div>
```

### Step 2: Update Hair Salon Landing Page
**Confidence Level**: 10/10  
**Files**:
- `src/pages/HairSalonLanding.tsx` (existing)
- `src/components/ConsultationEntry.tsx` (from Step 1)

**Description**: Modify the Hair Salon landing page to use the new ConsultationEntry component instead of the generic 'View All Services' button. This will transform the user experience from a marketplace dump to a guided consultation entry point. The change maintains the existing design aesthetic while fundamentally improving the user journey.

**Current Code to Replace**:
```jsx
<Link to="/services?domain=hair-salon" className="inline-block">
  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
    View All Services
  </Button>
</Link>
```

**New Implementation**:
```jsx
<ConsultationEntry domain="hair-salon" />
```

### Step 3: Create Consultation Flow Component
**Confidence Level**: 8/10  
**Files**:
- `src/components/ConsultationFlow.tsx` (new)
- `src/data/consultationQuestions.ts` (new)
- `src/hooks/useConsultation.ts` (new)

**Description**: Create a multi-step consultation flow component that asks targeted questions based on the selected journey type. For example, Special Occasion journey asks about event type, timeline, and current routine. The component will progressively collect user preferences and guide them toward personalized service recommendations.

**Consultation Questions Structure**:
```typescript
// consultationQuestions.ts
export const consultationQuestions = {
  'hair-salon': {
    'special-occasion': [
      {
        id: 'occasion-type',
        question: "What's the occasion?",
        options: ['Wedding', 'Date Night', 'Job Interview', 'Party', 'Other']
      },
      {
        id: 'timeline',
        question: "When is your event?",
        options: ['This week', 'Next month', '3+ months away']
      },
      {
        id: 'current-routine',
        question: "What's your current hair routine?",
        options: ['Daily styling', 'Wash and go', 'Professional monthly', 'Special occasions only']
      }
    ],
    'transformation': [
      {
        id: 'change-level',
        question: "What kind of change are you looking for?",
        options: ['Subtle refresh', 'Dramatic change', 'Complete makeover']
      },
      {
        id: 'maintenance',
        question: "What's your maintenance preference?",
        options: ['High maintenance', 'Low maintenance', 'Seasonal touch-ups']
      },
      {
        id: 'timeline',
        question: "What's your timeline?",
        options: ['ASAP', 'Within a month', 'Planning ahead']
      }
    ]
    // ... other journeys
  }
  // ... other domains
};
```

### Step 4: Build Recommendation Engine
**Confidence Level**: 7/10  
**Files**:
- `src/utils/recommendationEngine.ts` (new)
- `src/data/unifiedServicesData.ts` (existing)
- `src/contexts/ServiceCartContext.tsx` (existing)

**Description**: Develop a recommendation engine that takes consultation responses and generates personalized service suggestions. This will leverage the existing getServicesByUserJourney function and extend it with consultation response filtering. The engine will suggest primary services plus complementary services, naturally leading to the existing cart bundling system.

**Recommendation Engine Structure**:
```typescript
// recommendationEngine.ts
export interface ConsultationResponse {
  domain: string;
  journey: string;
  answers: Record<string, string>;
}

export interface ServiceRecommendation {
  primary: UnifiedService[];
  complementary: UnifiedService[];
  packages: ServicePackage[];
  reasoning: string;
}

export const generateRecommendations = (
  response: ConsultationResponse
): ServiceRecommendation => {
  // Logic to filter services based on consultation responses
  // Leverage existing getServicesByUserJourney function
  // Add consultation-specific filtering
  // Suggest complementary services
  // Identify applicable packages
};
```

### Step 5: Create Consultation Results Page
**Confidence Level**: 8/10  
**Files**:
- `src/pages/ConsultationResults.tsx` (new)
- `src/components/RecommendationCard.tsx` (new)
- `src/utils/recommendationEngine.ts` (from Step 4)

**Description**: Create a consultation results page that displays personalized service recommendations with explanations. Instead of showing all services, this page will show 'Based on your consultation, we recommend...' with curated service selections. It will highlight package opportunities and explain why services are recommended, creating the consultation experience the business owner envisioned.

**Results Page Structure**:
```jsx
// ConsultationResults.tsx
<div className="consultation-results">
  <div className="consultation-summary">
    <h2>Your Consultation Results</h2>
    <p>Based on your {journey} consultation...</p>
  </div>
  
  <div className="primary-recommendations">
    <h3>We recommend starting with:</h3>
    {primaryServices.map(service => (
      <RecommendationCard 
        service={service} 
        reasoning={reasoning}
        onAddToCart={addToCart}
      />
    ))}
  </div>
  
  <div className="complementary-services">
    <h3>Complete your look with:</h3>
    {complementaryServices.map(service => (
      <RecommendationCard service={service} />
    ))}
  </div>
  
  <div className="package-opportunities">
    <h3>Save with these packages:</h3>
    {packages.map(pkg => (
      <PackageCard package={pkg} />
    ))}
  </div>
</div>
```

### Step 6: Add Consultation Routing
**Confidence Level**: 9/10  
**Files**:
- `src/App.tsx` (existing)
- `src/pages/ConsultationFlow.tsx` (new)
- `src/pages/ConsultationResults.tsx` (from Step 5)

**Description**: Add new routes to support the consultation experience: /consultation/:domain/:journey for the consultation flow and /consultation/:domain/:journey/results for personalized recommendations. This creates dedicated consultation paths separate from the generic services marketplace.

**New Routes**:
```jsx
// App.tsx additions
<Route path="/consultation/:domain/:journey" element={<ConsultationFlow />} />
<Route path="/consultation/:domain/:journey/results" element={<ConsultationResults />} />
```

### Step 7: Update Other Landing Pages
**Confidence Level**: 10/10  
**Files**:
- `src/pages/MakeupStudioLanding.tsx` (existing)
- `src/pages/MedSpaLanding.tsx` (existing)
- `src/components/ConsultationEntry.tsx` (from Step 1)

**Description**: Extend the consultation entry experience to the Makeup Studio and Med Spa landing pages, replacing their generic 'View All Services' buttons with domain-specific consultation entry points. This ensures consistent consultation experience across all three business domains.

**Implementation**:
```jsx
// MakeupStudioLanding.tsx
<ConsultationEntry domain="makeup-studio" />

// MedSpaLanding.tsx  
<ConsultationEntry domain="med-spa" />
```

### Step 8: Test and Refine User Experience
**Confidence Level**: 8/10  
**Files**:
- `src/pages/HairSalonLanding.tsx` (existing)
- `src/pages/ConsultationFlow.tsx` (from Step 6)
- `src/pages/ConsultationResults.tsx` (from Step 5)
- `src/components/ServiceCart.tsx` (existing)

**Description**: Test the complete consultation experience from landing page through to cart, ensuring smooth user flow and that the consultation naturally leads to the existing sophisticated cart system. Refine the consultation questions, recommendation logic, and visual design based on testing results.

**Testing Checklist**:
- [ ] Consultation entry points work on all landing pages
- [ ] Consultation flow guides users through questions smoothly
- [ ] Recommendations are relevant and personalized
- [ ] Consultation naturally leads to cart system
- [ ] Package detection works with consultation recommendations
- [ ] Cross-domain consultation works (hair + makeup packages)
- [ ] Mobile experience is optimized
- [ ] Loading states and error handling work properly

## Success Metrics

### Technical Metrics
- [ ] All consultation components render without errors
- [ ] Consultation flow completes successfully
- [ ] Recommendations engine generates relevant suggestions
- [ ] Integration with existing cart system works seamlessly

### Business Metrics (Expected Improvements)
- **Conversion Rate**: Increase from consultation guidance
- **Average Booking Value**: Increase from natural bundling progression
- **User Engagement**: Longer session times, more page views
- **Support Calls**: Decrease from clearer user experience

## Risk Mitigation

### Technical Risks
- **Integration Issues**: Ensure consultation system works with existing cart
- **Performance**: Optimize recommendation engine for fast responses
- **Mobile Experience**: Ensure consultation works well on mobile devices

### Business Risks
- **User Confusion**: Provide clear fallback to browse all services
- **Over-Complexity**: Keep consultation simple and intuitive
- **Conversion Drop**: Monitor metrics and adjust if needed

## Future Enhancements

### Phase 4: Advanced Features (Future)
- AI-powered recommendations based on user behavior
- Visual consultation with before/after examples  
- Integration with booking calendar for real-time availability
- Consultation history and preferences for returning customers
- A/B testing framework for optimizing consultation questions

## Implementation Notes

### Leveraging Existing Infrastructure
- **User Journey Data**: Already defined in `userJourneys` object
- **Service Filtering**: `getServicesByUserJourney()` function exists
- **Cart System**: Sophisticated bundling already implemented
- **Domain Context**: Multi-domain support already built
- **Theming**: Domain-specific styling already available

### Key Integration Points
- Consultation must lead naturally to existing cart system
- Recommendations should trigger existing package detection
- Domain context must be preserved throughout consultation
- Existing service data structure should be leveraged

### Development Approach
- Build components incrementally and test integration
- Maintain existing functionality while adding consultation layer
- Use existing design patterns and styling
- Ensure mobile-first responsive design
- Add proper error handling and loading states

This plan transforms the website from a technical showcase into the business tool the owner envisioned - a virtual stylist that guides customers through personalized service discovery and naturally leads them to the sophisticated bundling system that already exists.

