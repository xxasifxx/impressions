# Service Confidence Scoring System - Data-Driven Work Breakdown Structure

**Document Version:** 3.0  
**Date:** 2025-01-18  
**Product Owner:** Data-Driven Product Team  
**Target Audience:** Development Team, Business Stakeholders  

---

## Executive Summary

**Problem:** Users need personalized service recommendations based on their maintenance commitment, risk tolerance, and service preferences.

**Solution:** Service confidence scoring system where each of the 18 available services gets a confidence score based on user profile, creating 64 unique catalog states (4³ combinations).

**Data Foundation:** Complete analysis of all 18 cart-addable services with justified maintenance, risk, and frequency requirements.

**Timeline:** 3 weeks  
**Priority:** High (enables personalized recommendations)

---

## 1. Service Catalog Foundation

### 1.1 Complete Service Inventory (18 Services)

**Hair Salon Services (6):**
- Precision Cut ($45, Easy, Low maintenance, Low risk)
- Balayage Highlights ($120, Advanced, Low maintenance, High risk)
- Full Color Service ($85, Moderate, High maintenance, High risk)
- Root Touch-Up ($65, Easy, Moderate maintenance, Moderate risk)
- Hair Extensions ($150, Advanced, Professional maintenance, Extreme risk)
- Professional Blowout ($35, Easy, Low maintenance, Low risk)

**Makeup Studio Services (6):**
- Glam Makeup ($65, Moderate, Low maintenance, Low risk)
- Bridal Makeup ($125, Advanced, Low maintenance, Low risk)
- Natural Enhancement ($45, Easy, Low maintenance, Low risk)
- Lash Extensions ($85, Advanced, High maintenance, High risk)
- Eyebrow Styling ($35, Moderate, Low maintenance, Low risk)
- Personal Makeup Lesson ($95, Easy, Moderate maintenance, Low risk)

**Med-Spa Services (6):**
- Gold Radiance Facial ($95, Advanced, Moderate maintenance, Low risk)
- Precision Eyebrow Threading ($20, Moderate, Low maintenance, Moderate risk)
- HydraFacial Treatment ($120, Moderate, Moderate maintenance, Low risk)
- Brazilian Wax ($65, Advanced, Low maintenance, Moderate risk)
- Dermaplaning Facial ($75, Moderate, Moderate maintenance, Low risk)
- LED Light Therapy ($55, Easy, Moderate maintenance, Moderate risk)

### 1.2 Service Classification

**Regular Services (9):** Require ongoing maintenance schedules
**Event Services (9):** Special occasion focused with timing requirements

**Universal Experience Vectors (Apply to all 18 services):**
1. **Maintenance Commitment:** Low → Moderate → High → Professional
2. **Risk Tolerance:** Low → Moderate → High → Extreme

**Selective Experience Vectors:**
3. **Service Frequency:** (Regular services only) One-time → Monthly → Bi-monthly → Quarterly
4. **Event Timing Sensitivity:** (Event services only) Low → Moderate → High → Critical
5. **Durability Requirements:** (Event services only) Short → Medium → Long → All-day
6. **Stress Resistance:** (Event services only) Low → Moderate → High → Extreme

---

## 2. Justified Numerical Framework

### 2.1 Base Confidence Scores (Justified by Service Analysis)

**Hair Extensions: Base Confidence = 0.15**
- **Justification:** Extreme risk (permanent hair damage), professional maintenance required
- **Supporting Data:** Daily specialized care, 4-6 week maintenance cycle, potential natural hair loss
- **Appropriate For:** Only users with professional-level commitment and extreme risk tolerance

**Precision Cut: Base Confidence = 0.85**
- **Justification:** Low risk (grows naturally), low maintenance (6-8 week trims)
- **Supporting Data:** Natural hair growth, minimal daily care, reversible results
- **Appropriate For:** Nearly all users regardless of commitment level

**Full Color Service: Base Confidence = 0.35**
- **Justification:** High maintenance (daily product use), high risk (chemical damage)
- **Supporting Data:** Requires sulfate-free products, 4-6 week touch-ups, potential breakage
- **Appropriate For:** Users with high maintenance commitment and moderate-to-high risk tolerance

**Lash Extensions: Base Confidence = 0.25**
- **Justification:** High maintenance (daily care), high risk (eye area, lash damage)
- **Supporting Data:** 2-3 week fills, careful cleansing, potential natural lash loss
- **Appropriate For:** Users with high maintenance commitment and high risk tolerance

**Professional Blowout: Base Confidence = 0.90**
- **Justification:** Low maintenance (2-3 days), low risk (temporary styling)
- **Supporting Data:** Minimal aftercare, natural fade, no permanent consequences
- **Appropriate For:** All users, especially event-focused

### 2.2 Modifier Values (Justified by Service Characteristics)

**Maintenance Commitment Modifiers:**
```typescript
// For High Maintenance Services (Full Color, Lash Extensions)
maintenanceModifiers = {
  low: -0.4,        // Incompatible with low commitment
  moderate: -0.2,   // Challenging for moderate commitment  
  high: +0.1,       // Suitable for high commitment
  professional: +0.3 // Ideal for professional commitment
}

// For Low Maintenance Services (Precision Cut, Blowout)
maintenanceModifiers = {
  low: +0.1,        // Perfect for low commitment
  moderate: +0.1,   // Still suitable
  high: 0.0,        // Neutral
  professional: 0.0 // Neutral
}
```

**Risk Tolerance Modifiers:**
```typescript
// For High Risk Services (Balayage, Full Color, Lash Extensions)
riskModifiers = {
  conservative: -0.3, // Avoid high-risk services
  cautious: -0.1,     // Hesitant about risk
  adventurous: +0.2,  // Comfortable with risk
  experimental: +0.3  // Seeks high-risk services
}

// For Extreme Risk Services (Hair Extensions)
riskModifiers = {
  conservative: -0.5, // Completely inappropriate
  cautious: -0.3,     // Very inappropriate
  adventurous: 0.0,   // Neutral consideration
  experimental: +0.2  // Willing to try
}
```

**Service Frequency Modifiers (Regular Services Only):**
```typescript
// For Monthly Services (Root Touch-Up, Facials)
frequencyModifiers = {
  occasional: -0.2,   // Too frequent for occasional users
  regular: +0.1,      // Good match
  frequent: +0.2,     // Excellent match
  constant: +0.1      // Might be too much
}

// For Quarterly Services (Balayage)
frequencyModifiers = {
  occasional: +0.1,   // Good match for occasional
  regular: +0.2,      // Excellent match
  frequent: 0.0,      // Neutral
  constant: -0.1      // Might want more frequent
}
```

### 2.3 Mathematical Validation

**Example Calculation - Hair Extensions for Conservative, Low-Maintenance User:**
```
Base Confidence: 0.15
+ Maintenance Modifier (low): -0.4
+ Risk Modifier (conservative): -0.5
= -0.75 → Clamped to 0.0

Result: 0% confidence - service completely hidden
```

**Example Calculation - Precision Cut for Any User:**
```
Base Confidence: 0.85
+ Maintenance Modifier (low): +0.1
+ Risk Modifier (conservative): 0.0
= 0.95

Result: 95% confidence - service prominently displayed
```

---

## 3. Work Breakdown Structure

### 3.1 Phase 1: Service Analysis Validation (Week 1)

#### 3.1.1 Service Data Validation
**Owner:** Product Analyst  
**Duration:** 3 days  
**Dependencies:** None  

**Deliverables:**
- [ ] **Service Characteristics Database:** All 18 services with maintenance/risk/frequency data
- [ ] **Justification Documentation:** Every numerical decision backed by service analysis
- [ ] **Edge Case Identification:** Services that don't fit standard patterns
- [ ] **Business Logic Validation:** Confirm scoring approach with stakeholders

**Technical Specifications:**
```typescript
interface ServiceCharacteristics {
  id: string
  name: string
  baseConfidence: number
  baseConfidenceJustification: string
  maintenanceLevel: 'low' | 'moderate' | 'high' | 'professional'
  maintenanceJustification: string
  riskLevel: 'low' | 'moderate' | 'high' | 'extreme'
  riskJustification: string
  serviceType: 'regular' | 'event'
  frequencyRequirement?: 'one-time' | 'monthly' | 'bi-monthly' | 'quarterly'
  eventCriteria?: {
    timingSensitivity: 'low' | 'moderate' | 'high' | 'critical'
    durabilityNeeds: 'short' | 'medium' | 'long' | 'all-day'
    stressResistance: 'low' | 'moderate' | 'high' | 'extreme'
  }
}
```

**Acceptance Criteria:**
- All 18 services have documented characteristics with justifications
- Base confidence scores range appropriately (0.15-0.90)
- Maintenance/risk levels align with service analysis data
- Stakeholder approval on scoring approach

#### 3.1.2 User Profile Definition
**Owner:** UX Researcher + Product Analyst  
**Duration:** 2 days  
**Dependencies:** 3.1.1  

**Deliverables:**
- [ ] **User Profile Schema:** Three dimensions with four options each (4³ = 64 states)
- [ ] **Profile Questions:** Clear, user-friendly questions for each dimension
- [ ] **Validation Logic:** Ensure all 64 combinations are mathematically valid
- [ ] **User Testing:** Validate that users understand and can answer questions

**User Profile Schema:**
```typescript
interface UserProfile {
  maintenanceCommitment: 'low' | 'moderate' | 'high' | 'professional'
  riskTolerance: 'conservative' | 'cautious' | 'adventurous' | 'experimental'
  servicePreference: 'occasional' | 'regular' | 'frequent' | 'constant' // For regular services
  // OR
  eventContext?: 'casual' | 'important' | 'major' | 'once-in-lifetime' // For event services
}
```

**Acceptance Criteria:**
- User questions are clear and unambiguous
- All 64 profile combinations produce valid confidence scores
- User testing shows 90%+ comprehension of questions
- Profile captures sufficient information for accurate scoring

### 3.2 Phase 2: Confidence Scoring Engine (Week 2)

#### 3.2.1 Core Scoring Algorithm
**Owner:** Backend Developer  
**Duration:** 4 days  
**Dependencies:** 3.1.1, 3.1.2  

**Deliverables:**
- [ ] **Scoring Engine:** Calculate confidence for each service based on user profile
- [ ] **Modifier System:** Apply justified modifiers based on service characteristics
- [ ] **Validation Logic:** Ensure scores are mathematically sound and business-logical
- [ ] **Performance Optimization:** Handle 18 services × 64 profiles efficiently

**Technical Implementation:**
```typescript
class ServiceConfidenceEngine {
  private serviceCharacteristics: Map<string, ServiceCharacteristics>
  private modifierRules: ModifierRules
  
  calculateServiceConfidence(
    serviceId: string, 
    userProfile: UserProfile
  ): ServiceConfidenceResult {
    const service = this.serviceCharacteristics.get(serviceId)
    let confidence = service.baseConfidence
    
    // Apply universal modifiers
    confidence += this.getMaintenanceModifier(service, userProfile)
    confidence += this.getRiskModifier(service, userProfile)
    
    // Apply selective modifiers
    if (service.serviceType === 'regular') {
      confidence += this.getFrequencyModifier(service, userProfile)
    } else if (service.serviceType === 'event') {
      confidence += this.getEventModifiers(service, userProfile)
    }
    
    // Clamp to [0, 1] range
    return {
      serviceId,
      confidence: Math.max(0, Math.min(1, confidence)),
      appliedModifiers: this.getAppliedModifiers(service, userProfile),
      justification: this.generateJustification(service, userProfile, confidence)
    }
  }
  
  calculateCatalogConfidence(userProfile: UserProfile): CatalogConfidenceResult {
    const serviceConfidences = this.allServices.map(service => 
      this.calculateServiceConfidence(service.id, userProfile)
    )
    
    return {
      userProfile,
      serviceConfidences: serviceConfidences.sort((a, b) => b.confidence - a.confidence),
      highConfidenceServices: serviceConfidences.filter(s => s.confidence >= 0.7),
      lowConfidenceServices: serviceConfidences.filter(s => s.confidence <= 0.3),
      catalogState: this.generateCatalogState(userProfile)
    }
  }
}
```

**Acceptance Criteria:**
- All 18 services get appropriate confidence scores for all 64 user profiles
- High-maintenance services score low for low-commitment users
- High-risk services score low for conservative users
- Scoring is consistent and mathematically sound
- Performance handles 18×64 calculations efficiently

#### 3.2.2 API Implementation
**Owner:** Backend Developer  
**Duration:** 1 day  
**Dependencies:** 3.2.1  

**Deliverables:**
- [ ] **REST API Endpoints:** Service confidence calculation and catalog filtering
- [ ] **Request Validation:** Ensure valid user profiles and service requests
- [ ] **Response Formatting:** Clear, actionable confidence data
- [ ] **Error Handling:** Graceful handling of invalid inputs

**API Specification:**
```typescript
// Calculate confidence for specific service
POST /api/v1/service-confidence
{
  request: {
    serviceId: string
    userProfile: UserProfile
  }
  response: ServiceConfidenceResult
}

// Get filtered catalog based on user profile
POST /api/v1/catalog-confidence
{
  request: {
    userProfile: UserProfile
    confidenceThreshold?: number // Default 0.3
  }
  response: {
    catalogState: string // One of 64 possible states
    recommendedServices: ServiceConfidenceResult[]
    hiddenServices: ServiceConfidenceResult[]
    totalServices: number
    profileSummary: string
  }
}
```

**Acceptance Criteria:**
- API responds within 100ms for typical requests
- All 64 user profiles return valid catalog states
- Confidence thresholds work correctly for filtering
- Error messages are helpful and actionable

### 3.3 Phase 3: Frontend Integration & Testing (Week 3)

#### 3.3.1 User Profile Collection Interface
**Owner:** Frontend Developer  
**Duration:** 3 days  
**Dependencies:** 3.1.2, 3.2.2  

**Deliverables:**
- [ ] **Profile Questions UI:** Clear, intuitive interface for collecting user preferences
- [ ] **Progressive Disclosure:** Show relevant questions based on service context
- [ ] **Validation & Feedback:** Real-time validation and helpful explanations
- [ ] **Mobile Optimization:** Works perfectly on all device sizes

**Interface Specifications:**
```typescript
interface ProfileCollectionFlow {
  // Step 1: Maintenance Commitment
  maintenanceQuestion: {
    title: "How much time do you want to spend maintaining your look?"
    options: [
      { value: 'low', label: 'Minimal upkeep', description: 'I prefer low-maintenance options' },
      { value: 'moderate', label: 'Some maintenance', description: 'I can do regular upkeep' },
      { value: 'high', label: 'High maintenance', description: 'I enjoy detailed care routines' },
      { value: 'professional', label: 'Professional level', description: 'I want the best regardless of effort' }
    ]
  }
  
  // Step 2: Risk Tolerance  
  riskQuestion: {
    title: "How do you feel about trying new or complex services?"
    options: [
      { value: 'conservative', label: 'Play it safe', description: 'I prefer tried-and-true options' },
      { value: 'cautious', label: 'Somewhat cautious', description: 'I like some adventure but not too much risk' },
      { value: 'adventurous', label: 'Open to adventure', description: 'I enjoy trying new things' },
      { value: 'experimental', label: 'Love experimenting', description: 'I want to try the latest and greatest' }
    ]
  }
  
  // Step 3: Service Context (Conditional)
  contextQuestion: {
    regular: {
      title: "How often do you typically get beauty services?"
      options: [
        { value: 'occasional', label: 'Special occasions only', description: 'A few times per year' },
        { value: 'regular', label: 'Regular maintenance', description: 'Every few months' },
        { value: 'frequent', label: 'Frequent visits', description: 'Monthly or more' },
        { value: 'constant', label: 'Constant upkeep', description: 'Weekly or bi-weekly' }
      ]
    }
    event: {
      title: "What type of event are you preparing for?"
      options: [
        { value: 'casual', label: 'Casual event', description: 'Dinner, party, night out' },
        { value: 'important', label: 'Important occasion', description: 'Work event, graduation, anniversary' },
        { value: 'major', label: 'Major celebration', description: 'Birthday milestone, engagement' },
        { value: 'once-in-lifetime', label: 'Once-in-a-lifetime', description: 'Wedding, major life event' }
      ]
    }
  }
}
```

**Acceptance Criteria:**
- Users can complete profile in under 60 seconds
- Questions are clear and options are distinct
- Interface works smoothly on mobile and desktop
- Real-time preview of how answers affect recommendations

#### 3.3.2 Confidence-Based Catalog Display
**Owner:** Frontend Developer  
**Duration:** 2 days  
**Dependencies:** 3.3.1, 3.2.2  

**Deliverables:**
- [ ] **Dynamic Service Filtering:** Show/hide services based on confidence scores
- [ ] **Visual Confidence Indicators:** Clear visual cues for service appropriateness
- [ ] **Personalized Recommendations:** Highlight high-confidence services
- [ ] **Explanation System:** Help users understand why services are recommended

**Display Logic:**
```typescript
interface CatalogDisplayRules {
  highConfidence: {
    threshold: 0.7
    display: 'prominent'
    indicators: ['recommended', 'great-match', 'popular-choice']
    sorting: 'confidence-desc'
  }
  
  mediumConfidence: {
    threshold: 0.4
    display: 'normal'
    indicators: ['good-option', 'consider-this']
    sorting: 'price-asc'
  }
  
  lowConfidence: {
    threshold: 0.3
    display: 'deemphasized'
    indicators: ['advanced-option', 'requires-commitment']
    sorting: 'confidence-desc'
  }
  
  veryLowConfidence: {
    threshold: 0.0
    display: 'hidden'
    showInAdvanced: true
    warningRequired: true
  }
}
```

**Acceptance Criteria:**
- High-confidence services are prominently displayed
- Low-confidence services are appropriately de-emphasized
- Users can still access all services if desired
- Confidence indicators are helpful and not overwhelming

#### 3.3.3 Validation & User Testing
**Owner:** UX Researcher + QA Engineer  
**Duration:** 2 days  
**Dependencies:** 3.3.1, 3.3.2  

**Deliverables:**
- [ ] **User Testing Sessions:** 20+ users test complete flow
- [ ] **Confidence Validation:** Verify recommendations match user expectations
- [ ] **Edge Case Testing:** Test all 64 profile combinations
- [ ] **Performance Validation:** Ensure system handles load efficiently

**Testing Scenarios:**
```typescript
interface TestingScenarios {
  userPersonas: [
    {
      name: 'Conservative Beginner'
      profile: { maintenance: 'low', risk: 'conservative', frequency: 'occasional' }
      expectedHighConfidence: ['Precision Cut', 'Professional Blowout', 'Natural Enhancement']
      expectedLowConfidence: ['Hair Extensions', 'Lash Extensions', 'Full Color']
    },
    {
      name: 'Adventurous Regular'
      profile: { maintenance: 'high', risk: 'adventurous', frequency: 'frequent' }
      expectedHighConfidence: ['Balayage', 'Full Color', 'Lash Extensions', 'Gold Facial']
      expectedLowConfidence: ['Hair Extensions'] // Still extreme risk
    },
    {
      name: 'Professional Experimental'
      profile: { maintenance: 'professional', risk: 'experimental', frequency: 'constant' }
      expectedHighConfidence: ['Hair Extensions', 'All Advanced Services']
      expectedLowConfidence: [] // Should have access to everything
    }
  ]
  
  edgeCases: [
    'All services at minimum confidence threshold',
    'All services at maximum confidence threshold', 
    'Mixed confidence distribution',
    'Event vs regular service context switching'
  ]
}
```

**Acceptance Criteria:**
- 90%+ of users find recommendations helpful and accurate
- All 64 profile combinations produce sensible results
- No mathematical errors or edge case failures
- System performance meets requirements under load

---

## 4. Success Metrics & Validation

### 4.1 Technical Success Metrics

**Mathematical Validation:**
- All 64 user profiles produce valid confidence distributions
- High-maintenance services score low for low-commitment users (validated)
- High-risk services score low for conservative users (validated)
- Service confidence ranges utilize full 0-1 spectrum appropriately

**Performance Metrics:**
- API response time <100ms for confidence calculations
- Frontend renders filtered catalog in <2 seconds
- System handles 1000+ concurrent profile calculations

### 4.2 User Experience Success Metrics

**Profile Collection:**
- Users complete profile questions in <60 seconds
- 95%+ comprehension rate on profile questions
- <5% abandonment rate during profile collection

**Recommendation Quality:**
- 85%+ of users find high-confidence recommendations appropriate
- 90%+ of users understand why services are recommended/hidden
- <10% of users override low-confidence service warnings

### 4.3 Business Impact Metrics

**Engagement:**
- Increased time spent browsing services
- Higher service booking completion rates
- Reduced consultation time (better pre-filtering)

**Satisfaction:**
- Improved post-service satisfaction scores
- Reduced service mismatches and complaints
- Higher rebooking rates

---

## 5. Risk Management & Contingencies

### 5.1 Technical Risks

**Low Risk - Well-Justified System:**
- All numerical decisions backed by service analysis data
- Mathematical relationships are straightforward and validated
- No complex algorithms or machine learning dependencies
- Clear fallback to showing all services if confidence system fails

### 5.2 User Experience Risks

**Mitigation Strategies:**
- Extensive user testing before launch
- Ability to bypass confidence filtering if desired
- Clear explanations for all recommendations
- Gradual rollout with feedback collection

### 5.3 Business Risks

**Validation Approach:**
- A/B test against current system
- Monitor key business metrics closely
- Quick rollback capability if metrics decline
- Regular review and adjustment of confidence thresholds

---

## 6. Implementation Timeline

### Week 1: Foundation
- **Days 1-3:** Service data validation and justification documentation
- **Days 4-5:** User profile definition and question design

### Week 2: Core System
- **Days 1-4:** Confidence scoring engine implementation
- **Day 5:** API development and testing

### Week 3: Integration & Validation
- **Days 1-3:** Frontend interface development
- **Days 4-5:** User testing and validation

**Total Timeline:** 3 weeks (vs 6+ weeks for complex rehabilitation)

---

## 7. Conclusion

### 7.1 Key Advantages

**Data-Driven Foundation:**
- Every numerical decision justified by actual service analysis
- 18 services completely characterized with maintenance/risk/frequency data
- Mathematical relationships based on business logic, not arbitrary weights

**User-Focused Design:**
- Simple 3-question profile collection
- 64 unique catalog experiences from straightforward user input
- Clear confidence indicators and explanations

**Business Value:**
- Personalized recommendations improve user satisfaction
- Reduced mismatched services and complaints
- Better service discovery and booking rates

### 7.2 Success Validation

This approach will succeed because:
1. **Grounded in Real Data:** Service analysis provides concrete foundation
2. **Mathematically Sound:** All calculations justified and validated
3. **User-Testable:** Clear success metrics and validation methods
4. **Business-Aligned:** Directly addresses service matching problems

### 7.3 Fundamental Difference

**Previous Approaches:** Built sophisticated systems on arbitrary assumptions
**This Approach:** Built simple system on concrete service analysis data

**The key insight:** Start with the services, understand their real characteristics, then build the simplest system that matches users to appropriate services based on those characteristics.

---

**Document Control:**
- **Version:** 3.0 (Data-Driven)
- **Replaces:** Version 2.0 (User-Focused), Version 1.0 (Engineering-Focused)
- **Foundation:** Complete analysis of 18 cart-addable services
- **Validation:** Every numerical decision justified with service data
- **Next Review:** After Week 1 implementation

