# Image-Based Consultation Flow: Product Specification

## 1. Overview

The Image-Based Consultation Flow creates a mandatory but efficient discovery experience for all users, with optimized paths based on user intent. The first question disambiguates between exploration and specific service needs, allowing users who know what they want to pinpoint their desired service in just three decisions maximum. Using compelling imagery and a responsive interface, the consultation quickly connects users with relevant service recommendations across traditional domain boundaries, creating a seamless experience that respects users' time while ensuring they find the most appropriate services.

## 2. User Experience Flow

### 2.1 Homepage Entry Point

The consultation is accessible from a prominent entry point on the homepage:

**Homepage Hero Section**
- Clear "Find Your Perfect Services" call-to-action
- Visually appealing presentation that communicates value
- Single click to launch the consultation experience

### 2.2 Consultation Modal

The consultation launches in a responsive modal overlay:

**Modal Characteristics**
- Responsive sizing based on device and viewport
- Full-screen on mobile, appropriately sized on larger screens
- Smooth animations for entry and exit

**Header Elements**
- Clear title and brief description
- Progress indicator showing completion percentage
- Minimal UI to keep focus on visual content

**Background Treatment**
- Dynamic background imagery that changes with consultation stages
- Subtle gradient overlays to ensure text readability
- Visual reinforcement of the current question context

## 3. Initial Intent Disambiguation

### 3.1 First Question Design

The first question clearly distinguishes between exploration and specific service needs:

**Question Structure**
- Clear question text: "What brings you here today?"
- Visual options in a responsive grid layout
- Distinct visual treatment for the two primary paths

**Exploration Path Option**
- Label: "I'm exploring options"
- Description: "Help me discover services based on my needs"
- Visually appealing lifestyle imagery showing transformation
- Leads to broader questions about preferences and goals

**Specific Service Path Option**
- Label: "I'm looking for a specific service"
- Description: "Help me find exactly what I need"
- Clear imagery representing service categories
- Leads to targeted category selection

**Additional Intent Options**
- "I'm preparing for an event" (leads to event-specific path)
- "I need to address a specific concern" (leads to concern-based path)
- Each with appropriate imagery and clear descriptions

### 3.2 Visual Design Considerations

**Option Card Design**
- Large, visually prominent cards for this critical decision
- Clear visual distinction between paths
- Consistent hover and selection animations
- Accessible design with proper contrast and focus states

**Layout Adaptability**
- Responsive layout that works across devices
- Maintains visual hierarchy on all screen sizes
- Ensures equal prominence for all primary paths

## 4. Specific Service Path (Fast Track)

### 4.1 Service Category Selection (Decision 1)

Immediately after selecting "I'm looking for a specific service":

**Question Structure**
- Question text: "Which service category are you interested in?"
- Visual grid of primary service categories
- Clear, representative imagery for each category

**Primary Categories**
- Hair Services
- Makeup Services
- Skin & Spa Services
- Brow & Lash Services
- Nail Services
- Waxing & Hair Removal

**Visual Design**
- Category-specific imagery that clearly represents each domain
- Color coding for easy recognition
- Brief category descriptions on hover/tap

### 4.2 Service Type Selection (Decision 2)

Based on the selected category:

**Question Structure**
- Question text: "What type of [category] service are you looking for?"
- Visual grid of service types within the selected category
- 4-8 options depending on category breadth

**Example: Hair Services Types**
- Haircuts & Styling
- Color Services
- Treatments & Repairs
- Extensions & Additions
- Blowouts & Styling
- Special Occasion Hair

**Visual Design**
- Service-specific imagery showing results or process
- Brief descriptions of what each service type includes
- Price range indicators where applicable

### 4.3 Specific Service Selection (Decision 3)

Based on the selected service type:

**Question Structure**
- Question text: "Which specific [service type] are you interested in?"
- Visual grid or list of specific services
- 3-8 options depending on service type breadth

**Example: Color Services Specifics**
- Full Color
- Highlights/Lowlights
- Balayage/Ombré
- Root Touch-Up
- Color Correction
- Fashion Color

**Visual Design**
- Before/after imagery where applicable
- Duration and price information
- Brief description of service process and results

### 4.4 Optional Refinement

After selecting a specific service, offer optional refinement:

**Refinement Question**
- Question text: "Would you like to refine your selection further?"
- Options for additional preferences (stylist level, time constraints, etc.)
- "View my recommendation" button to skip refinement

**Refinement Value**
- Helps match to the most appropriate service variation
- Provides additional context for service providers
- Improves accuracy of time and cost estimates

## 5. Exploration Path

### 5.1 Goal-Based Questions

For users selecting "I'm exploring options":

**Primary Goal Question**
- Question text: "What's your main beauty goal right now?"
- Visual options representing different outcomes
- Examples: "Refresh my look," "Complete transformation," "Address specific concerns," etc.

**Style Preference Question**
- Question text: "Which style best represents your preference?"
- Visual options showing different aesthetic styles
- Examples: "Natural & effortless," "Bold & dramatic," "Classic & polished," etc.

**Practical Constraints Question**
- Question text: "What's most important to you for your services?"
- Options addressing time, budget, maintenance level, etc.
- Helps prioritize recommendations based on practical factors

### 5.2 Adaptive Follow-Up Questions

Based on previous selections, show relevant follow-up questions:

**Concern-Specific Questions**
- Only shown if user indicated specific concerns
- Visual options representing common concerns in relevant domains
- Helps narrow recommendations to address specific issues

**Event-Specific Questions**
- Only shown if user indicated event preparation
- Options for event type, timing, and desired outcome
- Helps create appropriate service packages for the event

**Maintenance Questions**
- Questions about desired maintenance level and frequency
- Helps recommend services that match lifestyle and commitment level
- Influences both service selection and aftercare recommendations

### 5.3 Early Recommendation Option

At any point after the second question:

**"View Recommendations" Button**
- Always visible after initial questions
- Allows users to see current recommendations based on information provided
- Respects that users may not want to answer all questions

**Progressive Confidence Indicator**
- Visual indicator of recommendation confidence
- Increases as more questions are answered
- Helps users decide when they have provided sufficient information

## 6. Visual Assets Requirements

### 6.1 Option Imagery

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
- Intent options (exploration vs. specific service)
- Service category representations
- Service type representations
- Specific service before/after examples
- Style preference examples
- Concern visualization
- Outcome representations

### 6.2 Background Imagery

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

## 7. Recommendation Generation

### 7.1 Specific Service Path Recommendations

For users on the specific service path:

**Primary Recommendation**
- The specific service they selected
- Clear presentation with image, description, price, and duration
- Direct booking option

**Complementary Recommendations**
- 2-4 services that pair well with the selected service
- Clear explanation of why they complement the primary service
- Option to add to booking

**Alternative Recommendations**
- 2-3 alternative services that might better meet their needs
- Shown only if relevant based on their selections
- Presented as "You might also consider..."

### 7.2 Exploration Path Recommendations

For users on the exploration path:

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

### 7.3 Special Package Recommendations

For both paths, suggest relevant service packages:

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

## 8. Results Presentation

### 8.1 Results Interface

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

## 9. Integration with Aesthetic Evolution System

The consultation flow integrates with the Aesthetic Evolution System:

### 9.1 Visual Evolution Triggers

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

### 9.2 Technical Integration

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

## 10. Technical Implementation

### 10.1 Component Architecture

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

### 10.2 Data Structure

The consultation data is structured for flexibility:

**Decision Node Structure**
```typescript
interface EnhancedDecisionNode {
  id: string;
  question: string;
  backgroundImage?: string;
  options: EnhancedDecisionOption[];
  path?: 'specific' | 'exploration'; // Tracks which path this node belongs to
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
  path: 'specific' | 'exploration';
  customerMotivation: string;
  customerPreferences: Record<string, number>;
  recommendedServices: {
    primary: string[];
    secondary: string[];
    tertiary: string[];
  };
  crossDomainPackages: string[];
}
```

### 10.3 Performance Considerations

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

## 11. Success Metrics

### 11.1 User Experience Metrics

**Completion Rate**
- Target: >85% of users complete the consultation flow
- Segmented by path (specific vs. exploration)
- Drop-off analysis at each decision point

**Time to Completion**
- Target for specific service path: <30 seconds
- Target for exploration path: <60 seconds
- Distribution analysis to identify optimization opportunities

**Path Distribution**
- Expected split: 60% specific service path, 40% exploration path
- Trend analysis to understand user intent patterns
- Seasonal variations in path preference

### 11.2 Business Impact Metrics

**Conversion Rate**
- Target: >35% of completed consultations result in bookings
- Comparison between specific service and exploration paths
- Analysis of time-to-conversion

**Average Order Value**
- Target: >20% higher than direct bookings without consultation
- Tracking of cross-domain bookings
- Package vs. individual service booking analysis

**Service Discovery**
- Target: >30% of users discover services they weren't initially seeking
- Measured through post-booking surveys
- Tracking of secondary service additions

## 12. Conclusion

The Image-Based Consultation Flow creates a mandatory but efficient discovery experience for all users, with optimized paths based on user intent. By clearly disambiguating between exploration and specific service needs in the first question, the system respects users' time while ensuring they find the most appropriate services. The specific service path allows users to pinpoint their desired service in just three decisions maximum, while the exploration path provides a more guided experience for those who need assistance. The visual, image-based approach creates an engaging experience that drives business results through increased bookings, higher average order values, and improved service discovery.

