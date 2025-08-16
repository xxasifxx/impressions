# Consultation Flow: User-Centric Journey Specification

## 1. Overview

The Consultation Flow creates a personalized discovery experience that efficiently connects users with relevant beauty services based on their specific needs and interests. Rather than forcing users through a rigid classification system, the flow adapts to each user's journey - whether they arrive with a specific service in mind or are openly exploring options. Through a series of targeted questions, the system progressively narrows the field of relevant services until it can present a compelling set of primary recommendations, complementary services, and additional options. This approach prioritizes the user's actual goals and preferences, creating a natural, intuitive experience that feels responsive rather than prescriptive.

## 2. User Entry Points & Intent

Users typically enter the consultation flow with one of three primary intents:

### 2.1 Service-Specific Intent
- User arrives looking for a specific service (e.g., "haircut," "facial")
- System should quickly confirm specifics and present relevant options
- Minimal questions needed (1-2) to refine and present primary recommendations
- Example entry: User clicks on "Haircut" category or searches for "facial"

### 2.2 Need-Based Intent
- User arrives with a need but uncertain about specific services (e.g., "special occasion look," "fix damaged hair")
- System should help translate need into appropriate service recommendations
- Moderate questions needed (2-3) to understand need and present solutions
- Example entry: User clicks on "Help me prepare for a special event" or "Solve a specific concern"

### 2.3 Exploratory Intent
- User arrives to browse and discover services without a specific goal
- System should help user explore based on preferences and interests
- More questions may be beneficial (3-4) to understand preferences and narrow options
- Example entry: User clicks on "Explore all services" or "Help me discover new options"

## 3. Question Framework

### 3.1 Question Design Principles

**Progressive Relevance**
- Each question should meaningfully narrow the field of relevant services
- Questions adapt based on previous answers to maintain relevance
- System tracks "information gain" to determine when sufficient information exists

**Minimal Friction**
- Ask only questions that provide substantial value to recommendations
- Present primary recommendations as soon as sufficient information exists
- Allow users to skip questions or explore more based on their interest level

**Natural Conversation**
- Questions follow a natural conversational flow rather than a rigid tree
- Language is simple, friendly, and jargon-free
- Options are clear and relatable to users without industry knowledge

**Visual Support**
- Where appropriate, include visual aids to clarify options
- Use imagery that represents diverse styles and preferences
- Ensure visuals are accessible and load quickly

### 3.2 Core Question Types

**Intent Clarification**
- Purpose: Understand why the user is visiting and what they hope to achieve
- Example: "What brings you here today?" with options like "I'm looking for a specific service," "I need help with a beauty concern," "I'm exploring options for an upcoming event"
- Value: Immediately directs the flow toward the user's actual goal

**Service Interest**
- Purpose: Identify specific service categories of interest
- Example: "Which services are you most interested in exploring?" with options like "Hair," "Skin," "Makeup," "Nails," "I'm not sure yet"
- Value: Quickly narrows the service catalog to relevant categories

**Outcome Preference**
- Purpose: Understand desired end results rather than specific services
- Example: "What kind of change are you looking for?" with options ranging from "Subtle enhancement" to "Dramatic transformation"
- Value: Helps match services to desired outcomes regardless of user's service knowledge

**Practical Constraint**
- Purpose: Identify limitations that affect service suitability
- Example: "How much time do you have available for your appointment?" with options from "Under 30 minutes" to "2+ hours"
- Value: Ensures recommendations are realistic and actionable

**Style Preference**
- Purpose: Understand aesthetic preferences to refine recommendations
- Example: "Which of these styles most appeals to you?" with visual examples
- Value: Helps personalize recommendations beyond functional needs

**Concern-Based**
- Purpose: Identify specific issues the user wants to address
- Example: "Which of these concerns would you most like to address?" with common concern options
- Value: Directly connects concerns to appropriate solutions

### 3.3 Adaptive Question Sequencing

Rather than following a rigid tree, questions are selected dynamically:

**Initial Question Selection**
- Based on entry point and initial user action
- Service-specific entry → Service refinement questions
- Need-based entry → Concern and outcome questions
- Exploratory entry → Category and style questions

**Subsequent Question Selection**
- Based on information gain calculation
- System evaluates which question would most effectively narrow the field
- Questions with highest expected information gain are prioritized

**Termination Criteria**
- Primary recommendations can be confidently determined
- Sufficient differentiation exists between primary and secondary recommendations
- Maximum of 4 questions reached (to prevent fatigue)
- User chooses to view recommendations before completing all questions

## 4. Service Matching & Recommendation

### 4.1 Service Metadata Structure

Each service in the catalog is tagged with multiple metadata attributes:

**Core Attributes**
- Service Category (Hair, Skin, Makeup, Nails, etc.)
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

### 4.2 Progressive Filtering Mechanism

The system uses a progressive filtering approach rather than rigid classification:

**Initial Service Pool**
- All services in the catalog start as potentially relevant
- Entry point may pre-filter to specific categories

**Progressive Narrowing**
- Each user response applies filters to the service pool
- Filters may be strict (must match) or weighted (influences relevance score)
- Example: Selecting "Hair" category strictly filters to hair services, while selecting "Natural look" applies weighted relevance to services with natural results

**Relevance Scoring**
- Each service receives a dynamic relevance score based on match to user responses
- Scores are recalculated after each response
- Multiple factors contribute to the overall score with different weights

**Confidence Threshold**
- System tracks confidence in its recommendation set
- When confidence exceeds threshold, primary recommendations are ready
- Confidence is based on differentiation between top services and remaining pool

### 4.3 Recommendation Tiers

**Primary Recommendations (3-5 services)**
- Services that directly satisfy the user's immediate requirements
- Highest relevance scores based on all provided information
- Presented prominently at the top of results
- Include clear explanation of why each service was recommended

**Secondary Recommendations (5-8 services)**
- Services that match the user's broader interests but aren't their immediate focus
- Complementary services that pair well with primary recommendations
- Bundling opportunities that enhance the primary services
- Presented in the middle sections of the results page

**Tertiary Recommendations (Remaining relevant services)**
- Services they may generally be interested in after scrolling past primary and secondary
- Organized by category or theme for easy browsing
- Still maintain some relevance to user preferences
- Presented in browsable sections lower on the page

### 4.4 Recommendation Refinement

**Practical Constraint Application**
- Time constraints filter out services exceeding available time
- Budget constraints adjust recommendation priority
- Maintenance willingness affects service suitability

**Personalization Factors**
- Location-specific availability
- Seasonal relevance
- Trending services within relevant categories
- Special promotions on relevant services

## 5. User Interface & Experience

### 5.1 Question Presentation

**Progressive Disclosure**
- One question visible at a time
- Clear, concise question text
- 3-5 distinct answer options per question
- Visual aids where appropriate

**Navigation Controls**
- Simple forward/back navigation
- Option to skip questions when appropriate
- "Show me recommendations" option always available
- Progress indicator showing question count

**Visual Feedback**
- Subtle animations for transitions
- Visual acknowledgment of selections
- Integration with Aesthetic Evolution System for subtle visual changes

### 5.2 Results Presentation

**Primary Recommendations Section**
- Prominent placement at top of results
- Rich presentation with images, descriptions, and key details
- Clear explanation of why each service was recommended
- Direct booking/inquiry calls to action

**Secondary Recommendations Section**
- Organized by complementary themes or categories
- Visually distinct from primary recommendations
- Emphasis on relationship to primary services
- "Better together" bundling suggestions

**Tertiary Recommendations Section**
- Organized in browsable, categorized sections
- Clean, efficient presentation for easy scanning
- Maintains consistent visual language
- Encourages further exploration

### 5.3 User Controls & Refinement

**Filter Controls**
- Allow users to further refine results by practical factors
- Time, price, availability filters
- Category and type filters
- Maintain consistency with consultation inputs

**Sorting Options**
- Sort by relevance (default)
- Sort by price (low to high, high to low)
- Sort by duration (quick to extended)
- Sort by popularity

**Preference Adjustment**
- Allow users to indicate if recommendations match their expectations
- Provide option to adjust preferences and regenerate recommendations
- Remember preferences for return visits

## 6. Data Structure & Implementation

### 6.1 Question Data Structure

Questions are stored in a flexible format that enables dynamic selection:

```json
{
  "questions": {
    "q_intent": {
      "text": "What brings you here today?",
      "type": "intent",
      "options": [
        {
          "id": "specific_service",
          "text": "I'm looking for a specific service",
          "filters": [],
          "next_questions": ["q_service_category"]
        },
        {
          "id": "beauty_concern",
          "text": "I need help with a beauty concern",
          "filters": [],
          "next_questions": ["q_concern"]
        },
        {
          "id": "event_prep",
          "text": "I'm preparing for an upcoming event",
          "filters": [],
          "next_questions": ["q_event_type"]
        }
      ],
      "info_gain": 0.8,
      "skip_allowed": false
    },
    "q_service_category": {
      "text": "Which service category are you interested in?",
      "type": "category",
      "options": [
        {
          "id": "hair",
          "text": "Hair",
          "filters": [{"field": "category", "value": "hair", "type": "strict"}],
          "next_questions": ["q_hair_service_type", "q_hair_outcome"]
        },
        // Additional options...
      ],
      "info_gain": 0.9,
      "skip_allowed": false
    },
    // Additional questions...
  }
}
```

### 6.2 Service Metadata Structure

Services are stored with comprehensive metadata for matching:

```json
{
  "services": {
    "service123": {
      "id": "service123",
      "name": "Express Balayage",
      "category": "hair",
      "type": "color",
      "duration": 90,
      "price_tier": "premium",
      "style_attributes": {
        "result_type": ["natural", "dimensional"],
        "maintenance_level": "medium",
        "technique_complexity": "advanced",
        "trend_alignment": "current"
      },
      "benefit_attributes": {
        "primary_benefit": "enhancement",
        "secondary_benefits": ["dimension", "brightness"],
        "concerns_addressed": ["flat_color", "grow_out"],
        "special_considerations": ["color_treated"]
      },
      "experience_attributes": {
        "sensory_experience": "neutral",
        "expertise_level": "specialized",
        "exclusivity": "standard",
        "social_factor": "instagram_worthy"
      },
      "description": "A quick, dimensional hair color technique that creates natural-looking highlights with minimal maintenance.",
      "image_url": "/images/services/express-balayage.jpg"
    },
    // Additional services...
  }
}
```

### 6.3 Recommendation Generation Logic

The recommendation engine uses a weighted scoring approach:

**Relevance Score Calculation**
- Each user response applies filters and adjusts weights
- Strict filters remove services from consideration
- Weighted filters adjust service scores
- Scores are normalized after each response

**Service Categorization**
- Primary: Top scoring services (typically top 3-5)
- Secondary: Next tier of scores + complementary services to primary
- Tertiary: Remaining services with positive relevance scores

**Output Structure**
- Structured data object with three recommendation tiers
- Metadata for rendering appropriate UI components
- Explanation data for why services were recommended

### 6.4 Integration with Landing Page Builder

The consultation flow passes structured data to the landing page builder:

**Profile Data**
- Key preference indicators from responses
- Practical constraints identified
- Entry point and intent information

**Recommendation Data**
- Primary services array with relevance scores and rationale
- Secondary services array with complementary relationships
- Tertiary services organized by category or theme

**Presentation Guidance**
- Layout suggestions based on recommendation structure
- Section organization recommendations
- Visual emphasis guidance

## 7. Implementation Approach

### 7.1 Development Phases

**Phase 1: Core Question Framework**
- Implement basic question presentation
- Develop initial question bank for main entry points
- Create simple service filtering based on responses

**Phase 2: Service Metadata & Matching**
- Implement comprehensive service metadata structure
- Develop relevance scoring algorithm
- Create initial recommendation generation logic

**Phase 3: User Experience Refinement**
- Implement adaptive question selection
- Develop confidence threshold logic
- Create rich recommendation presentation

**Phase 4: Integration & Testing**
- Integrate with Aesthetic Evolution System
- Implement landing page builder data passing
- Conduct comprehensive user testing

**Phase 5: Optimization & Expansion**
- Optimize performance for high user volumes
- Refine question bank based on user feedback
- Expand service metadata and matching rules

### 7.2 Technical Considerations

**Frontend Implementation**
- React components for question rendering
- State management for tracking responses and filters
- Smooth transitions between questions and to results

**Backend Implementation**
- Efficient service matching algorithms
- Dynamic question selection logic
- Caching of common recommendation patterns

**Performance Targets**
- Question rendering: < 100ms
- Response processing: < 50ms
- Recommendation generation: < 200ms
- Total perceived latency: < 350ms

## 8. Success Metrics

### 8.1 User Experience Metrics

**Completion Rate**
- Target: >90% of users who start consultation view recommendations
- Measured at each question step to identify drop-off points

**Time to Recommendations**
- Target: Average <30 seconds to reach recommendations
- Distribution analysis to identify outliers

**Perceived Relevance**
- Target: >85% of users rate recommendations as relevant
- Measured through post-consultation surveys or interaction patterns

### 8.2 Business Impact Metrics

**Conversion Rate**
- Target: >25% increase in service bookings compared to non-personalized experience
- Measured across different entry points and recommendation tiers

**Average Order Value**
- Target: >15% increase in average order value
- Analysis of primary vs. secondary service bookings

**Return Rate**
- Target: >20% increase in return visits
- Correlation analysis with recommendation interaction patterns

## 9. Conclusion

The Consultation Flow creates a user-centric discovery experience that efficiently connects users with relevant beauty services based on their specific needs and interests. By adapting to each user's journey and progressively narrowing the field of relevant services, the system provides personalized recommendations that feel responsive rather than prescriptive. The integration with the Aesthetic Evolution System creates a cohesive, engaging experience that builds confidence through subtle visual feedback, ultimately driving higher conversion rates and customer satisfaction.

This specification provides a framework for developing the consultation flow while acknowledging that the detailed user journey map will be the most substantial specification in the overall system. The focus on user intent and progressive filtering ensures that the system serves the user's actual goals rather than forcing them through a rigid classification process.

