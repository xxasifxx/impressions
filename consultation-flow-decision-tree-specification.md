# Consultation Flow Decision Tree: Product Specification

## 1. Overview

The Consultation Flow Decision Tree guides users through a streamlined series of questions to identify their beauty service needs and preferences. Using a practical hard-coded decision tree approach, the system efficiently classifies users into appropriate profile types and generates tiered service recommendations from a metatagged catalog of nearly 100 unique offerings. The decision tree is designed to be straightforward to implement and maintain while providing a personalized experience that connects users with relevant services across primary, secondary, and tertiary recommendation tiers.

## 2. Decision Tree Structure

### 2.1 Core Principles

The decision tree follows these core principles:

- **Simplicity**: Clear, direct paths through the question flow
- **Efficiency**: Maximum of 5 questions to reach classification
- **Predictability**: Consistent journeys for similar user inputs
- **Maintainability**: Easy to update, test, and refine
- **Scalability**: Handles high user volumes with minimal computational overhead

### 2.2 Tree Organization

The decision tree is organized into three levels:

**Level 1: Initial Classification**
- First question focuses on broad preference categories
- Branches into 5 main paths based on response
- Sets the foundation for profile identification

**Level 2: Profile Refinement**
- Second and third questions narrow down specific profile type
- Each main path branches into 2-3 sub-paths
- Completes the profile classification process

**Level 3: Recommendation Tuning**
- Fourth and fifth questions refine recommendation priorities
- Influences the weighting and ordering of service recommendations
- May be skipped if sufficient information is already gathered

### 2.3 Decision Points

Each decision point in the tree consists of:

- **Question ID**: Unique identifier for the question
- **Question Text**: Clear, concise question presented to the user
- **Response Options**: Set of possible answers (typically 3-5 options)
- **Next Question Mapping**: Which question to present next based on response
- **Profile Score Adjustments**: How each response affects profile classification
- **Metadata Tags**: Associated service attributes for recommendation matching

## 3. Question Bank

### 3.1 Level 1 Questions (Initial Classification)

**Q1: Approach Preference**
- Question: "What's your preferred approach to beauty services?"
- Options:
  - "I prefer subtle, natural-looking results" → Q2A (Natural path)
  - "I want noticeable, transformative results" → Q2B (Dramatic path)
  - "I need specialized expertise for specific concerns" → Q2C (Technical path)
  - "I value premium experiences and results" → Q2D (Luxury path)
  - "I need efficient, practical services" → Q2E (Quick path)
- Profile Mapping: Initial classification into one of the five main profile categories

### 3.2 Level 2 Questions (Profile Refinement)

**Natural Path (Q2A)**
- Question: "What's your main goal for natural-looking services?"
- Options:
  - "Looking polished for everyday life" → Q3A1 (Natural Minimalist - Everyday)
  - "Addressing specific concerns while maintaining a natural look" → Q3A2 (Natural Minimalist - Problem Solving)
  - "Preparing for a special occasion with a natural look" → Q3A3 (Natural Minimalist - Special Occasion)

**Dramatic Path (Q2B)**
- Question: "What kind of transformation interests you most?"
- Options:
  - "Trying the latest trends and making a statement" → Q3B1 (Dramatic Transformer - Trend Explorer)
  - "A significant change to my current look" → Q3B2 (Dramatic Transformer - Personal Reinvention)
  - "Looking exceptional for a special event" → Q3B3 (Dramatic Transformer - Special Occasion)

**Technical Path (Q2C)**
- Question: "What aspect of technical expertise matters most to you?"
- Options:
  - "Addressing specific concerns or problems" → Q3C1 (Precision Specialist - Problem Solver)
  - "Enhancing my features with specialized techniques" → Q3C2 (Precision Specialist - Enhancement Focused)
  - "Learning about advanced or innovative approaches" → Q3C3 (Precision Specialist - Innovation Seeker)

**Luxury Path (Q2D)**
- Question: "What does luxury mean to you in beauty services?"
- Options:
  - "A comprehensive, indulgent experience" → Q3D1 (Luxury Indulger - Experience Seeker)
  - "Exceptional, premium results" → Q3D2 (Luxury Indulger - Results Focused)
  - "Exclusive or unique treatments" → Q3D3 (Luxury Indulger - Exclusivity Focused)

**Quick Path (Q2E)**
- Question: "What's your priority for quick services?"
- Options:
  - "Regular maintenance that fits my schedule" → Q3E1 (Quick Refresher - Maintenance)
  - "Addressing a specific need efficiently" → Q3E2 (Quick Refresher - Specific Need)
  - "Looking good with minimal time investment" → Q3E3 (Quick Refresher - Time Conscious)

### 3.3 Level 3 Questions (Recommendation Tuning)

**Q3A1: Natural Minimalist - Everyday**
- Question: "Which aspect of your everyday look would you like to enhance?"
- Options:
  - "Overall freshness and glow"
  - "Defined features while looking natural"
  - "Low-maintenance hair that looks good every day"
  - "Healthy skin with minimal makeup needs"

**Q3B2: Dramatic Transformer - Personal Reinvention**
- Question: "What's driving your desire for transformation?"
- Options:
  - "A new chapter in life or career"
  - "Expressing my personality more boldly"
  - "Wanting a completely different look"
  - "Building confidence through my appearance"

**Q3C1: Precision Specialist - Problem Solver**
- Question: "What specific concern are you looking to address?"
- Options:
  - "Hair-related issues (thinning, damage, etc.)"
  - "Skin-related concerns (texture, tone, etc.)"
  - "Specific feature enhancement (brows, lips, etc.)"
  - "Correcting previous service results"

**Q3D2: Luxury Indulger - Results Focused**
- Question: "What premium results are most important to you?"
- Options:
  - "Long-lasting, high-quality color or style"
  - "Visible improvement in texture or appearance"
  - "Custom-formulated treatments for my specific needs"
  - "Comprehensive transformation with premium techniques"

**Q3E2: Quick Refresher - Specific Need**
- Question: "What specific quick service are you looking for?"
- Options:
  - "Touch-up for a specific area or feature"
  - "Quick refresh before an event or meeting"
  - "Maintenance between more comprehensive services"
  - "Specific concern that needs immediate attention"

### 3.4 Practical Constraint Questions

These questions may be inserted at appropriate points in the tree to refine recommendations:

**Time Availability**
- Question: "How much time can you commit to your appointment?"
- Options:
  - "Less than 30 minutes"
  - "30-60 minutes"
  - "1-2 hours"
  - "2+ hours, I have time for a comprehensive service"

**Maintenance Willingness**
- Question: "How much ongoing maintenance are you comfortable with?"
- Options:
  - "Minimal - I prefer low-maintenance options"
  - "Moderate - I can commit to some regular upkeep"
  - "High - I'm willing to maintain a more demanding regimen"

**Budget Consideration**
- Question: "What's your budget range for this service?"
- Options:
  - "Budget-friendly options"
  - "Mid-range services"
  - "Premium services"
  - "Luxury services - price is not my primary concern"

## 4. Profile Classification

### 4.1 Profile Types

The decision tree maps users to these 12 distinct profile types:

**Natural Minimalist - Everyday**
- Seeks subtle enhancements for everyday life
- Values low maintenance and natural results
- Primary services: natural-finish makeup, gentle facial treatments, low-maintenance haircuts

**Natural Minimalist - Special Occasion**
- Seeks subtle enhancements for specific events
- Values natural-looking results that photograph well
- Primary services: camera-ready natural makeup, subtle highlights, express facials

**Dramatic Transformer - Trend Explorer**
- Seeks bold, noticeable changes
- Values being on-trend and making a statement
- Primary services: vibrant hair colors, statement makeup, innovative treatments

**Dramatic Transformer - Personal Reinvention**
- Seeks significant transformation for personal reasons
- Values comprehensive change and expert guidance
- Primary services: complete makeovers, dramatic cuts, transformative treatments

**Precision Specialist - Problem Solver**
- Seeks technical expertise for specific concerns
- Values measurable results and specialized knowledge
- Primary services: targeted treatments, corrective services, specialized techniques

**Precision Specialist - Enhancement Focused**
- Seeks technical expertise for enhancement rather than correction
- Values precision and customization
- Primary services: detailed work, enhancement techniques, customized approaches

**Luxury Indulger - Experience Seeker**
- Values premium experience and atmosphere
- Seeks comprehensive, indulgent services
- Primary services: luxury packages, premium products, exclusive treatments

**Luxury Indulger - Results Focused**
- Values premium results regardless of experience
- Seeks best-in-class outcomes
- Primary services: high-end techniques, premium products, expert practitioners

**Quick Refresher - Maintenance**
- Seeks efficient, regular maintenance
- Values consistency and reliability
- Primary services: express services, maintenance packages, quick touch-ups

**Quick Refresher - Specific Need**
- Seeks efficient solution for a specific issue
- Values targeted, time-efficient services
- Primary services: targeted express treatments, specific quick fixes

**Wellness Seeker - Holistic**
- Approaches beauty as part of overall wellness
- Values natural ingredients and holistic approaches
- Primary services: wellness-oriented treatments, natural products, integrated approaches

**Wellness Seeker - Specific Benefit**
- Seeks specific wellness benefits from beauty services
- Values measurable wellness outcomes
- Primary services: therapeutic treatments, benefit-specific services, wellness-enhancing techniques

### 4.2 Classification Mechanism

The classification mechanism uses a straightforward path-based approach:

1. **Path Tracking**: The system tracks which path the user follows through the decision tree
2. **Direct Mapping**: Each end path in the tree maps directly to a specific profile type
3. **Constraint Adjustment**: Practical constraint questions modify the recommendation priorities but not the profile type
4. **Deterministic Outcome**: The same sequence of responses always leads to the same profile classification

## 5. Service Recommendation Generation

### 5.1 Service Metadata Structure

Each service in the catalog is tagged with multiple metadata attributes:

**Core Attributes**
- Service Category (Hair, Skin, Makeup, Specialized)
- Service Type (Cut, Color, Treatment, etc.)
- Duration (Express, Standard, Extended)
- Price Tier (Budget, Standard, Premium, Luxury)

**Style Attributes**
- Result Type (Natural, Defined, Dramatic, Bold, etc.)
- Maintenance Level (Low, Medium, High)
- Technique Complexity (Basic, Intermediate, Advanced)
- Trend Alignment (Classic, Current, Cutting-edge)

**Benefit Attributes**
- Primary Benefit (Enhancement, Correction, Transformation, Maintenance)
- Secondary Benefits (Multiple possible)
- Concern Addressing (Multiple possible)
- Special Considerations (Multiple possible)

**Experience Attributes**
- Sensory Experience (Relaxing, Energizing, Neutral)
- Expertise Level (General, Specialized, Expert)
- Exclusivity (Standard, Premium, Exclusive)
- Social Factor (Instagram-worthy, Subtle, Statement)

### 5.2 Recommendation Mapping

Each profile type has pre-defined mappings to service metadata:

**Primary Services Mapping**
- Direct mapping between profile type and high-relevance service attributes
- Example: Natural Minimalist - Everyday → Services with Natural Result Type, Low Maintenance, Enhancement Primary Benefit
- Typically returns 3-5 services that directly address the user's immediate needs

**Secondary Services Mapping**
- Mapping to complementary service attributes based on profile type
- Example: Natural Minimalist - Everyday → Services with Natural Result Type in different categories than primary services
- Typically returns 5-8 services that match broader interests

**Tertiary Services Mapping**
- Mapping to generally relevant service attributes
- Example: Natural Minimalist - Everyday → Services with Low Maintenance across all categories
- Typically returns 8-12 services that might interest the user based on their profile

### 5.3 Recommendation Refinement

The recommendation sets are refined based on practical constraints:

**Time Constraint Application**
- Filters out services that exceed the user's available time
- Prioritizes services that fit within time constraints

**Budget Constraint Application**
- Filters out services that exceed the user's budget range
- Ensures recommendations are financially appropriate

**Maintenance Constraint Application**
- Adjusts service priorities based on maintenance willingness
- Ensures high-maintenance services are only recommended to users willing to maintain them

## 6. Data Structure and Integration

### 6.1 Decision Tree Data Structure

The decision tree is implemented as a JSON structure:

```json
{
  "questions": {
    "Q1": {
      "text": "What's your preferred approach to beauty services?",
      "options": [
        {
          "text": "I prefer subtle, natural-looking results",
          "next_question": "Q2A",
          "profile_hint": "Natural"
        },
        {
          "text": "I want noticeable, transformative results",
          "next_question": "Q2B",
          "profile_hint": "Dramatic"
        },
        // Additional options...
      ]
    },
    "Q2A": {
      "text": "What's your main goal for natural-looking services?",
      "options": [
        {
          "text": "Looking polished for everyday life",
          "next_question": "Q3A1",
          "profile_hint": "Natural-Everyday"
        },
        // Additional options...
      ]
    },
    // Additional questions...
  },
  "profiles": {
    "Natural-Everyday": {
      "name": "Natural Minimalist - Everyday",
      "primary_service_tags": ["natural-result", "low-maintenance", "enhancement"],
      "secondary_service_tags": ["natural-result", "complementary-categories"],
      "tertiary_service_tags": ["low-maintenance", "all-categories"]
    },
    // Additional profiles...
  }
}
```

### 6.2 Output Data Structure

The system generates a structured data object with these components:

**Profile Data**
- Identified Profile Type
- Key Preference Indicators
- Practical Constraints

**Service Recommendations**
- Primary Services Array (3-5 services)
- Secondary Services Array (5-8 services)
- Tertiary Services Array (8-12 services)

**Landing Page Props**
- Layout Guidance
- Section Organization
- Call-to-Action Priorities

Example output structure:

```json
{
  "profile": {
    "type": "Natural-Everyday",
    "name": "Natural Minimalist - Everyday",
    "preferences": {
      "approach": "natural",
      "goal": "everyday",
      "enhancement_focus": "overall_freshness"
    },
    "constraints": {
      "time": "30-60",
      "maintenance": "low",
      "budget": "mid-range"
    }
  },
  "recommendations": {
    "primary": [
      {
        "id": "service123",
        "name": "Express Facial Glow Treatment",
        "category": "Skin",
        "duration": 45,
        "price_tier": "mid-range",
        "description": "Quick facial that enhances natural glow with minimal downtime"
      },
      // Additional primary services...
    ],
    "secondary": [
      // 5-8 secondary services
    ],
    "tertiary": [
      // 8-12 tertiary services
    ]
  },
  "landing_page_props": {
    "layout": "natural_minimalist",
    "sections": [
      {
        "title": "Quick Glow Enhancers",
        "services": ["service123", "service456"],
        "priority": 1
      },
      // Additional sections...
    ],
    "cta_priority": "book_consultation"
  }
}
```

### 6.3 Integration with Aesthetic Evolution System

The decision tree integrates with the Aesthetic Evolution System through these mechanisms:

**Profile Type Mapping**
- Each profile type maps to specific aesthetic states
- Example: Natural Minimalist - Everyday → Natural Minimalist aesthetic state

**Question Progression Triggers**
- Each question transition triggers subtle aesthetic evolution
- Reinforces the sense of progression and personalization

**Final Classification Trigger**
- The final profile classification triggers the complete aesthetic transformation
- Prepares the visual experience for the recommendation display

## 7. Implementation Approach

### 7.1 Development Phases

**Phase 1: Core Decision Tree**
- Implement the basic question flow structure
- Create the profile classification logic
- Develop the question bank for main paths

**Phase 2: Service Mapping**
- Implement the service metadata structure
- Create the recommendation mapping logic
- Develop the initial service catalog with metadata

**Phase 3: Constraint Handling**
- Add practical constraint questions
- Implement recommendation refinement logic
- Test with various constraint combinations

**Phase 4: Integration and Testing**
- Integrate with Aesthetic Evolution System
- Implement landing page props generation
- Conduct comprehensive user testing

**Phase 5: Optimization and Scaling**
- Optimize performance for high user volumes
- Refine question bank based on user feedback
- Expand service catalog and metadata

### 7.2 Technical Considerations

**Frontend Implementation**
- React components for question rendering
- State management for tracking user path
- Smooth transitions between questions

**Backend Implementation**
- Efficient decision tree traversal
- Fast service matching algorithms
- Caching of common recommendation sets

**Performance Targets**
- Question rendering: < 100ms
- Path traversal: < 50ms
- Recommendation generation: < 200ms
- Total perceived latency: < 350ms

## 8. User Journey Integration

The decision tree is a critical component of the overall user journey:

```
Home → Consultation → Personalized Results → Cart Checkout → Booking → Confirmation
```

### 8.1 Entry Points

**Direct Entry**
- User clicks "Find My Perfect Services" on homepage
- Begins at Q1 of the decision tree

**Guided Entry**
- User selects a broad category of interest
- Begins at a relevant point in the decision tree

**Return User Entry**
- Previous users may skip parts of the tree
- System uses saved preferences to shortcut the process

### 8.2 Exit Points

**Primary Exit: Personalized Results**
- User completes the consultation
- System displays personalized recommendations
- Landing page is customized based on profile

**Secondary Exit: Save & Return**
- User can save progress and return later
- System stores their path through the tree

**Tertiary Exit: Quick Browse**
- User can exit to browse all services at any point
- System uses partial information to influence browsing experience

## 9. Success Metrics

### 9.1 User Experience Metrics

**Completion Rate**
- Target: >90% of users complete the consultation
- Measured at each question step to identify drop-off points

**Time to Completion**
- Target: Average <45 seconds to complete consultation
- Distribution analysis to identify outliers

**Perceived Relevance**
- Target: >85% of users rate recommendations as relevant
- Measured through post-consultation surveys

### 9.2 Business Impact Metrics

**Conversion Rate**
- Target: >25% increase in service bookings compared to non-personalized experience
- Measured across different profile types and service categories

**Average Order Value**
- Target: >15% increase in average order value
- Analysis of primary vs. secondary service bookings

**Return Rate**
- Target: >20% increase in return visits
- Correlation analysis with profile types and recommendation tiers

## 10. Conclusion

The Consultation Flow Decision Tree creates a straightforward, efficient path for users to discover relevant beauty services based on their preferences and needs. By using a practical hard-coded decision tree approach with a well-developed question bank, the system provides a personalized experience that is easy to implement, maintain, and scale. The integration with the Aesthetic Evolution System creates a cohesive user journey that builds confidence and engagement through subtle visual feedback, ultimately driving higher conversion rates and customer satisfaction.

