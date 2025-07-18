# Service Confidence Scoring System - Implementation Prompt

**Date:** 2025-01-18  
**Purpose:** Clear specification for building a service confidence scoring system  
**Context:** Beauty consultation platform with multiple service domains  

---

## System Requirements

### Core Problem
Users need personalized service recommendations based on their maintenance commitment, risk tolerance, and service preferences. Each service should receive an individual confidence score that determines its visibility and prominence in the catalog.

### Service Architecture
The system must handle **5 service domains:**
1. **Hair Salon** - cuts, color, styling, treatments
2. **Makeup Studio** - application, lessons, special events
3. **Med Spa** - facials, treatments, wellness procedures
4. **Perfume Boutique** - consultations, custom blending
5. **Vitamin Wellness** - consultations, supplement recommendations

### Mathematical Framework
- **User Profile:** 3 dimensions × 4 options each = 64 possible states
- **Service Scoring:** Each service gets confidence score (0.0-1.0) for each user state
- **Catalog Filtering:** High confidence services (>0.7) prominent, low confidence (<0.3) de-emphasized

---

## Implementation Specification

### User Profile Collection
**Three Questions Create User Profile:**

1. **Maintenance Commitment**
   - "How much time do you want to spend maintaining your look?"
   - Options: Low | Moderate | High | Professional

2. **Risk Tolerance** 
   - "How do you feel about trying new or complex services?"
   - Options: Conservative | Cautious | Adventurous | Experimental

3. **Service Context**
   - Regular services: "How often do you get beauty services?"
   - Options: Occasional | Regular | Frequent | Constant
   - Event services: "What type of event are you preparing for?"
   - Options: Casual | Important | Major | Once-in-lifetime

### Service Confidence Calculation
**For each service, calculate confidence score:**

```
confidence = baseConfidence + maintenanceModifier + riskModifier + contextModifier
clamp result to [0.0, 1.0]
```

**Base Confidence Examples:**
- Low-maintenance, low-risk services: 0.8-0.9 (haircuts, basic makeup)
- High-maintenance, high-risk services: 0.1-0.3 (extensions, permanent procedures)
- Consultation services: 0.7-0.8 (lessons, consultations)

**Modifier Examples:**
- High-maintenance service + low-commitment user: -0.4
- High-risk service + conservative user: -0.3
- Event service + event-planning user: +0.2

### Catalog Display Logic
**Based on confidence scores:**
- **High Confidence (0.7-1.0):** Prominently displayed, "Recommended" badges
- **Medium Confidence (0.4-0.7):** Normal display, "Good Option" indicators  
- **Low Confidence (0.3-0.4):** De-emphasized, "Advanced Option" warnings
- **Very Low (0.0-0.3):** Hidden by default, accessible in "Show All" mode

---

## Technical Requirements

### API Endpoints
```typescript
POST /api/confidence/calculate
{
  userProfile: {
    maintenanceCommitment: 'low' | 'moderate' | 'high' | 'professional'
    riskTolerance: 'conservative' | 'cautious' | 'adventurous' | 'experimental'
    serviceContext: 'occasional' | 'regular' | 'frequent' | 'constant'
  }
  domain?: 'hair-salon' | 'makeup-studio' | 'med-spa' | 'perfume-boutique' | 'vitamin-wellness'
}

Response: {
  catalogState: string // One of 64 possible states
  serviceConfidences: Array<{
    serviceId: string
    confidence: number
    displayLevel: 'prominent' | 'normal' | 'deemphasized' | 'hidden'
    reasoning: string
  }>
}
```

### Service Data Structure
```typescript
interface ServiceDefinition {
  id: string
  name: string
  domain: string
  baseConfidence: number
  baseConfidenceReason: string
  characteristics: {
    maintenanceLevel: 'low' | 'moderate' | 'high' | 'professional'
    riskLevel: 'low' | 'moderate' | 'high' | 'extreme'
    serviceType: 'regular' | 'event' | 'consultation'
    frequencyRequirement?: string
    eventRequirements?: object
  }
  modifiers: {
    maintenance: { low: number, moderate: number, high: number, professional: number }
    risk: { conservative: number, cautious: number, adventurous: number, experimental: number }
    context: { [key: string]: number }
  }
}
```

### Frontend Components
- **Profile Collection Interface:** 3-step questionnaire with clear options
- **Confidence-Based Catalog:** Dynamic filtering and visual indicators
- **Service Detail Views:** Confidence explanations and recommendations
- **Override Capability:** Users can access all services if desired

---

## Success Criteria

### User Experience
- Profile collection completes in <60 seconds
- 90%+ of users find high-confidence recommendations appropriate
- <10% of users need to override low-confidence warnings
- Clear understanding of why services are recommended/hidden

### Technical Performance
- API responds in <100ms for confidence calculations
- Frontend renders filtered catalog in <2 seconds
- System handles 1000+ concurrent profile calculations
- All 64 user profile states produce valid results

### Business Impact
- Improved service booking completion rates
- Reduced service mismatches and complaints
- Higher post-service satisfaction scores
- Better service discovery and exploration

---

## Implementation Approach

### Phase 1: Core Engine (Week 1)
- Service confidence calculation algorithm
- User profile definition and validation
- Basic API endpoints for confidence scoring

### Phase 2: Service Integration (Week 2)  
- Service data structure and characteristics definition
- Confidence modifier system implementation
- Integration with existing service catalog

### Phase 3: Frontend & Testing (Week 3)
- Profile collection interface
- Confidence-based catalog display
- User testing and validation

---

## Key Design Principles

### Data-Driven Decisions
- Every numerical value must be justified by service characteristics
- Base confidence scores reflect real service complexity and risk
- Modifiers based on logical relationships between user preferences and service requirements

### User-Centric Design
- Simple, clear questions that users can answer confidently
- Transparent reasoning for recommendations
- Flexibility to override system suggestions when desired

### Scalable Architecture
- System works with partial service data initially
- Easy to add new services and domains
- Confidence calculations independent of specific service implementations

### Business Value Focus
- Improves user satisfaction through better service matching
- Reduces consultation time and service mismatches
- Enables personalized experiences at scale

---

## Success Validation

The system succeeds when:
1. **Users trust the recommendations** - high-confidence services feel appropriate
2. **Service matching improves** - fewer complaints about inappropriate services
3. **Discovery increases** - users find services they wouldn't have considered
4. **Business metrics improve** - higher satisfaction, completion rates, retention

**Core Insight:** The confidence scoring system transforms a generic service catalog into 64 personalized experiences, each optimized for a specific user profile and service context.

---

**This prompt defines a complete, implementable system for service confidence scoring that delivers real business value through personalized recommendations.**

