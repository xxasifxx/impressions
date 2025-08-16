# Consultation Flow System: Product Specification

## 1. Overview

The Consultation Flow System efficiently guides users through a personalized discovery process that maps their preferences to appropriate beauty services from a metatagged catalog of nearly 100 unique offerings. Through a streamlined questionnaire with 3-5 targeted questions, the system classifies users into one of twelve distinct profile types and generates a structured data object that identifies three tiers of service recommendations: primary services (directly satisfying immediate requirements), secondary services (matching broader interests), and tertiary services (generally relevant but lower priority). This structured data is passed as props to the landing page builder, which dynamically constructs a personalized experience that prominently features the most relevant services while still exposing users to the full range of offerings that might interest them.

## 2. System Architecture

### 2.1 Core Components

**Question Engine**
- Manages the presentation and sequencing of questions
- Handles conditional logic for question selection
- Tracks user responses and session state
- Optimized for sub-500ms response times

**Profile Classifier**
- Processes response patterns using weighted scoring algorithms
- Maps users to one of twelve distinct profile types
- Calibrated through continuous feedback and conversion data
- Employs machine learning for pattern recognition and classification refinement

**Service Recommendation Engine**
- Analyzes user profile against metatagged service catalog
- Applies ranking algorithms to determine service relevance
- Organizes services into primary, secondary, and tertiary tiers
- Generates structured data object for landing page builder

**Data Connector**
- Manages data flow between consultation and landing page builder
- Handles serialization and deserialization of profile data
- Ensures consistent data structure for downstream components
- Implements caching strategies for performance optimization

### 2.2 Data Flow

1. **Input Collection**: User responses to consultation questions
2. **Profile Classification**: Mapping responses to a specific user profile
3. **Service Matching**: Matching profile to metatagged service catalog
4. **Recommendation Tiering**: Organizing matched services into primary, secondary, and tertiary tiers
5. **Data Transformation**: Converting recommendations into structured props
6. **Output Delivery**: Passing props to landing page builder

## 3. Question Framework

### 3.1 Question Design Principles

**Efficiency**
- Each question must provide high information gain
- Questions should help differentiate between multiple profile types
- Redundant or low-value questions are eliminated
- Maximum of 5 questions to complete classification

**Clarity**
- Questions use simple, jargon-free language
- Options are distinct and easily understood
- Visual aids supplement text where appropriate
- Progress indication is clear and encouraging

**Adaptability**
- Question selection adapts based on previous responses
- Not all users see the same questions
- The system prioritizes questions with highest classification value
- Early termination when sufficient confidence is reached

### 3.2 Core Question Types

**Outcome Preference Questions**
- Focus on desired end results rather than specific services
- Example: "What kind of change are you looking for?" with options ranging from subtle enhancement to dramatic transformation
- High value for initial profile differentiation
- Influences primary service tier recommendations

**Style Preference Questions**
- Address aesthetic preferences and personal style
- Example: "Which style description best matches your preference?" with visual examples
- Helps refine profile classification
- Influences secondary service tier recommendations

**Practical Constraint Questions**
- Address time, budget, and maintenance willingness
- Example: "How much time can you commit to maintenance?" with options from minimal to extensive
- Helps filter and prioritize recommendations
- Ensures recommendations are realistic and actionable

**Concern-Based Questions**
- Focus on specific issues or goals
- Example: "Which of these concerns is most important to address?" with common concern options
- Helps identify primary service needs
- Directly influences primary tier recommendations

**Experience-Level Questions**
- Gauge familiarity and comfort with different service types
- Example: "How would you describe your experience with these services?" from novice to expert
- Helps tailor recommendation presentation
- Influences information density in the landing page

### 3.3 Question Sequencing

The system employs dynamic question sequencing rather than a fixed decision tree:

1. **Initial Question**: Always focuses on outcome preference (subtle vs. dramatic, etc.)
2. **Subsequent Questions**: Selected based on information gain calculation
3. **Termination Criteria**: Either maximum questions reached or confidence threshold exceeded
4. **Fallback Paths**: Defined for ambiguous classification cases

## 4. Profile Classification System

### 4.1 User Profile Types

The system classifies users into twelve distinct profile types that represent common patterns of preferences, needs, and behaviors:

**Natural Minimalist - Everyday**
- Seeks subtle enhancements for everyday life
- Values low maintenance and natural results
- Typically interested in: natural-finish makeup, gentle facial treatments, low-maintenance haircuts

**Natural Minimalist - Special Occasion**
- Seeks subtle enhancements for specific events
- Values natural-looking results that photograph well
- Typically interested in: camera-ready makeup, subtle highlights, express facials

**Dramatic Transformer - Trend Explorer**
- Seeks bold, noticeable changes
- Values being on-trend and making a statement
- Typically interested in: vibrant hair colors, statement makeup, innovative treatments

**Dramatic Transformer - Personal Reinvention**
- Seeks significant transformation for personal reasons
- Values comprehensive change and expert guidance
- Typically interested in: complete makeovers, dramatic cuts, transformative treatments

**Precision Specialist - Problem Solver**
- Seeks technical expertise for specific concerns
- Values measurable results and specialized knowledge
- Typically interested in: targeted treatments, corrective services, specialized techniques

**Precision Specialist - Enhancement Focused**
- Seeks technical expertise for enhancement rather than correction
- Values precision and customization
- Typically interested in: detailed work, enhancement techniques, customized approaches

**Luxury Indulger - Experience Seeker**
- Values premium experience and atmosphere
- Seeks comprehensive, indulgent services
- Typically interested in: luxury packages, premium products, exclusive treatments

**Luxury Indulger - Results Focused**
- Values premium results regardless of experience
- Seeks best-in-class outcomes
- Typically interested in: high-end techniques, premium products, expert practitioners

**Quick Refresher - Maintenance**
- Seeks efficient, regular maintenance
- Values consistency and reliability
- Typically interested in: express services, maintenance packages, quick touch-ups

**Quick Refresher - Specific Need**
- Seeks efficient solution for a specific issue
- Values targeted, time-efficient services
- Typically interested in: targeted express treatments, specific quick fixes

**Wellness Seeker - Holistic**
- Approaches beauty as part of overall wellness
- Values natural ingredients and holistic approaches
- Typically interested in: wellness-oriented treatments, natural products, integrated approaches

**Wellness Seeker - Specific Benefit**
- Seeks specific wellness benefits from beauty services
- Values measurable wellness outcomes
- Typically interested in: therapeutic treatments, benefit-specific services, wellness-enhancing techniques

### 4.2 Classification Algorithm

The classification system uses a weighted scoring approach rather than rigid decision paths:

**Response Weighting**
- Each response option has weighted associations with different profile types
- Weights are determined through initial calibration and ongoing optimization
- Example: Selecting "dramatic change" might add 0.8 to Dramatic Transformer scores and -0.3 to Natural Minimalist scores

**Confidence Calculation**
- Profile scores are normalized after each question
- Confidence is measured by the differential between the highest and second-highest profile scores
- Classification terminates when confidence exceeds threshold or maximum questions are reached

**Ambiguity Handling**
- When multiple profiles have similar scores, additional differentiating questions are presented
- If ambiguity persists, the system may present a hybrid recommendation set
- Continuous learning improves disambiguation over time

**Feedback Integration**
- User interactions with recommendations provide feedback to the classification system
- Conversion rates and engagement metrics refine profile associations
- A/B testing of classification weights optimizes system accuracy

## 5. Service Recommendation Engine

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

### 5.2 Recommendation Algorithm

The recommendation engine matches user profiles to services through a multi-step process:

**Initial Filtering**
- Eliminates services with incompatible core attributes
- Applies practical constraints (time, budget, maintenance)
- Ensures baseline relevance for all recommendations

**Relevance Scoring**
- Calculates relevance score for each service based on profile match
- Weights different metadata attributes according to profile type
- Example: Natural Minimalist profile heavily weights natural result type and low maintenance

**Tiering Logic**
- Primary Tier: Services with highest relevance scores that directly address stated needs
- Secondary Tier: Services with high relevance that complement primary services or address secondary interests
- Tertiary Tier: Services with moderate relevance that might interest the user based on their profile

**Diversity Enforcement**
- Ensures recommendations span appropriate service categories
- Prevents overrepresentation of a single service type
- Maintains strategic variety while preserving relevance

**Personalization Refinement**
- Applies user-specific adjustments based on explicit preferences
- Incorporates historical data when available
- Adjusts for seasonal and trend factors

### 5.3 Output Structure

The recommendation engine generates a structured data object with these components:

**Profile Data**
- Identified Profile Type
- Confidence Score
- Key Preference Indicators
- Practical Constraints

**Primary Recommendations**
- Array of 3-5 highest relevance services
- Service IDs and core metadata
- Relevance scores and match rationale
- Presentation priority indicators

**Secondary Recommendations**
- Array of 5-8 complementary services
- Service IDs and core metadata
- Relevance scores and relationship to primary services
- Grouping suggestions for presentation

**Tertiary Recommendations**
- Array of 8-12 additional relevant services
- Service IDs and core metadata
- Relevance scores and discovery rationale
- Categorization for browsing sections

**Presentation Guidance**
- Layout suggestions based on profile type
- Information density recommendations
- Visual emphasis guidelines
- Call-to-action prioritization

## 6. Performance Optimization

### 6.1 Response Time Targets

**Question Engine**
- Question rendering: < 100ms
- Response processing: < 50ms
- Next question selection: < 100ms
- Total perceived latency: < 250ms

**Classification System**
- Profile scoring: < 50ms
- Confidence calculation: < 25ms
- Profile determination: < 75ms
- Total classification time: < 150ms

**Recommendation Engine**
- Initial filtering: < 50ms
- Relevance scoring: < 100ms
- Tiering and organization: < 100ms
- Output generation: < 50ms
- Total recommendation time: < 300ms

**End-to-End Performance**
- Complete consultation to recommendation: < 500ms
- Data transfer to landing page builder: < 100ms
- Total system performance: < 600ms

### 6.2 Optimization Strategies

**Computational Efficiency**
- Pre-computed weights and scoring matrices
- Optimized classification algorithms
- Efficient data structures for metadata matching
- Lazy evaluation where appropriate

**Caching Strategies**
- Question rendering templates cached
- Common profile classification patterns cached
- Popular service recommendation sets cached
- Metadata relationship maps pre-computed

**Parallel Processing**
- Concurrent scoring of multiple profile types
- Parallel service relevance calculations
- Background processing of tertiary recommendations
- Asynchronous data preparation for landing page

**Progressive Loading**
- Critical path optimization for core questions
- Primary recommendations prioritized in processing
- Secondary and tertiary recommendations can load progressively
- Non-essential metadata loaded on demand

## 7. Integration with Aesthetic Evolution System

The Consultation Flow System works in tandem with the Aesthetic Evolution System:

### 7.1 Trigger Points

**Profile Identification**
- As the classification system gains confidence in a profile type, it triggers corresponding aesthetic state changes
- Example: When Natural Minimalist score exceeds threshold, aesthetic shifts toward organic colors and clean typography

**Question Transitions**
- Each question transition provides an opportunity for subtle aesthetic evolution
- Reinforces the sense of progression and personalization

**Recommendation Generation**
- The final transition to recommendations triggers the most significant aesthetic evolution
- Fully realizes the personalized visual experience based on the identified profile

### 7.2 Data Exchange

**Profile Type Communication**
- Consultation Flow System communicates the identified profile type to the Aesthetic Evolution System
- Includes confidence score and key preference indicators
- Enables appropriate aesthetic state selection

**State Synchronization**
- Both systems maintain synchronized state
- Ensures consistent user experience across components
- Facilitates smooth transitions between consultation and recommendations

**Feedback Loop**
- User interactions with the evolved aesthetic provide feedback to both systems
- Helps refine both classification and aesthetic evolution

## 8. Implementation Considerations

### 8.1 Technical Requirements

**Frontend Technologies**
- React for component-based UI
- Redux for state management
- Styled Components for dynamic styling
- Framer Motion for subtle animations

**Backend Technologies**
- Node.js for API services
- Redis for caching and performance optimization
- MongoDB for flexible metadata storage
- GraphQL for efficient data fetching

**Infrastructure**
- Containerized microservices architecture
- CDN for static assets and caching
- Load balancing for high-volume handling
- Auto-scaling based on demand patterns

### 8.2 Development Approach

**Phased Implementation**
1. Core question engine and basic classification
2. Initial recommendation engine with primary tier focus
3. Enhanced classification with all profile types
4. Complete recommendation engine with all tiers
5. Performance optimization and scaling

**Testing Strategy**
- Automated unit tests for classification algorithms
- Integration tests for end-to-end flows
- Performance testing under various load conditions
- A/B testing of question formulations and weights

**Continuous Improvement**
- Analytics integration for performance monitoring
- Conversion tracking for recommendation effectiveness
- Regular recalibration of classification weights
- Ongoing metadata refinement for service catalog

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

### 9.3 Technical Performance Metrics

**Response Time**
- Target: 95th percentile <500ms for end-to-end consultation
- Monitoring of component-level performance

**Error Rate**
- Target: <0.1% error rate in classification and recommendations
- Tracking of edge cases and classification ambiguities

**Scalability**
- Target: Maintain performance metrics at 10x baseline load
- Load testing and performance degradation analysis

## 10. Conclusion

The Consultation Flow System creates an efficient, personalized discovery process that connects users with the most relevant services from a large catalog while maintaining exceptional performance. By employing sophisticated classification algorithms and a tiered recommendation approach, the system ensures users quickly find services that meet their immediate needs while also discovering complementary and related offerings that enhance their overall experience. The integration with the Aesthetic Evolution System creates a cohesive, responsive user journey that builds confidence and engagement through subtle visual feedback, ultimately driving higher conversion rates and customer satisfaction.

