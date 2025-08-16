# Image-Based Consultation Flow: Product Specification

## 1. Overview

The Image-Based Consultation Flow provides an optional, visually-driven discovery path for users who need guidance in finding the right beauty services. Rather than forcing all users through a consultation funnel, this approach respects that many visitors have confident, specific reasons to visit and offers the consultation as a helpful tool for those who want assistance. Using compelling imagery and a streamlined interface, the consultation quickly connects users with relevant service recommendations across traditional domain boundaries, creating opportunities for discovery while respecting users' time and preferences.

## 2. User Experience Flow

### 2.1 Homepage Entry Point

The consultation is accessible from a single, prominent entry point on the homepage:

**Homepage Hero Section**
- Clear "Find Your Perfect Services" call-to-action
- Positioned as an optional discovery tool, not a requirement
- Visually appealing presentation that communicates value
- Single click to launch the consultation experience

### 2.2 Consultation Modal

The consultation launches in a responsive modal overlay:

**Modal Characteristics**
- Responsive sizing based on device and viewport
- Full-screen on mobile, appropriately sized on larger screens
- Maintains context of the homepage for easy return
- Smooth animations for entry and exit

**Header Elements**
- Clear title and brief description
- Progress indicator showing completion percentage
- Exit option to return to homepage
- Minimal UI to keep focus on visual content

**Background Treatment**
- Dynamic background imagery that changes with consultation stages
- Subtle gradient overlays to ensure text readability
- Visual reinforcement of the current question context

## 3. Visual Decision Points

### 3.1 Question Presentation

Each decision point in the consultation is presented as a visual choice:

**Question Structure**
- Brief, clear question text (maximum 15 words)
- Visual options presented in a responsive grid
- 2-6 options per question, optimized for the specific decision point
- Adaptive layout based on screen size and orientation

**Visual Option Components**
- High-quality lifestyle imagery representing each option
- Brief label (1-3 words) for each option
- Optional emoji for additional visual reinforcement
- Optional micro-tags indicating relevant service domains
- Subtle hover and selection animations

**Grid Adaptability**
- Responsive grid layout that adjusts to screen dimensions
- Larger, horizontal cards for 2-3 options on wide screens
- Compact grid for 4+ options or narrow screens
- Maintains visual hierarchy regardless of layout

### 3.2 Decision Flow

The consultation uses a streamlined flow to quickly reach relevant recommendations:

**Initial Context Question**
- First question establishes primary motivation or context
- Examples: "What brings you in today?" or "What's your main beauty goal?"
- Options include event preparation, specific concerns, exploration, etc.
- Sets the foundation for subsequent questions

**Focused Follow-Up Questions**
- 1-2 additional questions based on initial selection
- Quickly narrow to relevant service categories
- Respect user's time with minimal steps to recommendations
- Skip unnecessary questions based on previous responses

**Early Exit Options**
- Allow users to view recommendations at any point
- "Show me recommendations" option always available
- Respect that users may not want to answer all questions
- Provide best possible recommendations based on information provided

## 4. Visual Assets Requirements

### 4.1 Option Imagery

Each option requires carefully selected imagery:

**Image Specifications**
- High-quality lifestyle photography (not stock-looking)
- 16:9 or 4:3 aspect ratio depending on option position
- Minimum 800px width for proper display on high-resolution screens
- Optimized file size for fast loading (max 150KB per image)

**Image Content Guidelines**
- Clear visual representation of the option concept
- Diverse representation of people and styles
- Consistent visual style across the consultation
- Emotionally resonant imagery that evokes desired feelings

**Image Categories Needed**
- Style representations (natural, dramatic, classic, trendy, etc.)
- Outcome representations (special event, everyday, transformation, etc.)
- Concern representations (damaged hair, uneven skin, etc.)
- Experience representations (quick service, luxury experience, etc.)

### 4.2 Background Imagery

Background images create context for each question:

**Background Specifications**
- Subtle, atmospheric imagery that doesn't compete with options
- Darker or gradient-overlaid to ensure text readability
- Thematically aligned with the current question
- Responsive to different screen sizes and orientations

**Background Transitions**
- Smooth crossfades between background changes
- Timed to coincide with question transitions
- Reinforces progression through the consultation

## 5. Recommendation Generation

### 5.1 Response Processing

The system processes user selections to generate recommendations:

**Response Weighting**
- Each option selection contributes to service relevance scores
- Options are tagged with domain relevance and service attributes
- Weights are applied based on the question's importance in the flow
- Multiple selections build a comprehensive preference profile

**Cross-Domain Mapping**
- Responses map to service attributes across traditional boundaries
- Example: "Natural look" preference applies to hair, makeup, and skincare
- Domain-specific interpretations of common preferences
- Enables discovery of services users might not have considered

### 5.2 Recommendation Structure

Recommendations are organized into meaningful tiers:

**Primary Recommendations (3-5 services)**
- Highest relevance services that directly address user's selections
- May span multiple service domains based on selections
- Presented prominently with clear rationale
- Direct path to booking or learning more

**Secondary Recommendations (5-8 services)**
- Complementary services that enhance primary recommendations
- Cross-domain opportunities that users might not have considered
- Bundling suggestions for comprehensive solutions
- Presented as "You might also like" or "Complete your look"

**Tertiary Recommendations (Remaining relevant services)**
- Additional services with moderate relevance
- Organized by category for browsing
- Presented lower on results page
- Encourages further exploration

### 5.3 Special Package Recommendations

The system can suggest cross-domain service packages:

**Package Creation Logic**
- Identifies complementary services across domains
- Creates logical service combinations based on user needs
- Applies appropriate bundling discounts
- Prioritizes packages that solve the user's primary needs

**Package Presentation**
- Visually distinct from individual service recommendations
- Clear explanation of package benefits and savings
- Simplified booking path for multiple services
- Special visual treatment to highlight value

## 6. Results Presentation

### 6.1 Results Interface

The recommendation results maintain the visual approach:

**Results Layout**
- Clean, visually-driven presentation
- Organized by recommendation tier
- Responsive design that works across devices
- Maintains aesthetic consistency with consultation

**Service Presentation**
- Image-forward design for each recommended service
- Brief, benefit-focused service descriptions
- Clear pricing and duration information
- Visual indicators for service domains (hair, makeup, spa)

**Action Paths**
- Primary CTA for booking highest-relevance services
- Secondary paths for exploring additional recommendations
- Option to refine results or start over
- Seamless transition to booking flow

## 7. Integration with Aesthetic Evolution System

The consultation flow integrates with the Aesthetic Evolution System:

### 7.1 Visual Evolution Triggers

**Progress-Based Evolution**
- Subtle visual changes as user progresses through consultation
- Color palette shifts based on completion percentage
- Typography refinements that increase in sophistication
- Micro-animations that become more confident and defined

**Selection-Based Evolution**
- Visual adaptations based on user preferences
- Example: More dramatic or subtle color transitions based on style preferences
- Typography weight and spacing adjustments based on selected aesthetics
- Background treatment changes that reflect emerging user profile

### 7.2 Technical Integration

**State Management**
- Consultation progress and domain focus passed to Aesthetic Provider
- Real-time updates as user makes selections
- Smooth transitions between aesthetic states
- Persistence of aesthetic state through to results

**Component Adaptation**
- UI components respond to aesthetic state
- Button styles, card treatments, and animations adapt
- Maintains accessibility while evolving visually
- Creates cohesive experience across consultation stages

## 8. Technical Implementation

### 8.1 Component Architecture

The consultation flow uses a modular component structure:

**Core Components**
- `EnhancedConsultationModal`: Container component with responsive sizing
- `EnhancedConsultationFlow`: Main flow controller and state manager
- `ConsultationQuestion`: Question presentation with adaptive layout
- `OptionGrid`: Responsive grid system for visual options
- `OptionCard`: Individual visual option with multiple layouts
- `ConsultationResults`: Results presentation and action paths

**State Management**
- React state for local component state
- Context API for shared state across components
- LocalStorage for persistence between sessions

**Animation System**
- Framer Motion for smooth transitions and animations
- AnimatePresence for component mounting/unmounting
- Consistent animation timing and easing
- Performance optimization for mobile devices

### 8.2 Data Structure

The consultation data is structured for flexibility:

**Decision Node Structure**
```typescript
interface EnhancedDecisionNode {
  id: string;
  question: string;
  backgroundImage?: string;
  options: EnhancedDecisionOption[];
}

interface EnhancedDecisionOption {
  id: string;
  label: string;
  imageUrl: string;
  emoji?: string;
  description?: string;
  weight: number;
  domains?: string[];
  nextNodeId?: string;
  isLeaf?: boolean;
}
```

**Service Metadata Structure**
```typescript
interface ServiceMetadata {
  id: string;
  name: string;
  category: string;
  domain: string;
  duration: number;
  price: number;
  attributes: {
    style: string[];
    outcome: string[];
    concern: string[];
    experience: string[];
  };
  image: string;
  description: string;
}
```

**Recommendation Output Structure**
```typescript
interface RecommendationOutput {
  customerMotivation: string;
  customerPreferences: Record<string, number>;
  recommendedServices: {
    'hair-salon': string[];
    'makeup-studio': string[];
    'med-spa': string[];
  };
  crossDomainPackages: string[];
}
```

### 8.3 Performance Considerations

**Image Optimization**
- Progressive loading for images
- Appropriate sizing for different devices
- WebP format with fallbacks
- Lazy loading for off-screen content

**Interaction Responsiveness**
- < 100ms response time for user interactions
- Optimized render cycles
- Debounced window resize handlers
- Touch-optimized interactions for mobile

**Accessibility Considerations**
- Proper alt text for all images
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast throughout

## 9. Success Metrics

### 9.1 User Experience Metrics

**Completion Rate**
- Target: >75% of users who start consultation view recommendations
- Measured at each question step to identify drop-off points
- Segmented by device type

**Time to Completion**
- Target: Average <45 seconds to reach recommendations
- Distribution analysis to identify outliers
- Correlation with satisfaction and conversion

**User Satisfaction**
- Target: >80% positive feedback on consultation experience
- Measured through post-consultation surveys or interaction patterns
- Qualitative feedback collection for continuous improvement

### 9.2 Business Impact Metrics

**Consultation Usage Rate**
- Target: >25% of homepage visitors use the consultation
- Trend analysis over time to measure growing awareness
- Correlation with marketing campaigns

**Conversion Rate**
- Target: >30% of completed consultations result in bookings
- Comparison with non-consultation booking rate
- Analysis of time-to-conversion

**Average Order Value**
- Target: >20% higher than non-consultation bookings
- Tracking of cross-domain bookings
- Package vs. individual service booking analysis

## 10. Conclusion

The Image-Based Consultation Flow provides an optional, visually-driven discovery path for users who need guidance in finding the right beauty services. By respecting that many visitors have confident, specific reasons to visit and offering the consultation as a helpful tool rather than a requirement, this approach creates a positive user experience that drives business results. The focus on compelling imagery, streamlined interaction, and cross-domain recommendations creates opportunities for service discovery and increased average order value, while the integration with the Aesthetic Evolution System reinforces the premium positioning of the brand.

