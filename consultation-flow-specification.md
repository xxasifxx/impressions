# Image-Based Consultation Flow: Complete Specification

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

## 7. Data Output Structure

### 7.1 Consultation Output Format

The consultation flow produces a structured data output that can be consumed by the landing page builder:

**Core Output Structure**
```typescript
interface ConsultationOutput {
  // Path identification
  selectedPath: 'specific' | 'exploration' | 'event' | 'concern';
  completionLevel: number; // 0-1 representing how far they got
  
  // For specific service path
  selectedCategory?: string;
  selectedServiceType?: string;
  selectedService?: string;
  
  // For exploration path
  primaryGoal?: string;
  stylePreference?: string;
  practicalConstraints?: string[];
  
  // Common attributes
  concernAreas?: string[];
  eventContext?: {
    eventType?: string;
    eventDate?: string;
    eventImportance?: 'casual' | 'important' | 'critical';
  };
  
  // Metadata
  timestamp: number;
  sessionId: string;
}
```

### 7.2 Service Mapping Structure

The consultation maps user selections to service attributes:

**Service Attribute Mapping**
```typescript
interface ServiceAttributeMapping {
  // Maps goals to service attributes
  goalMapping: {
    [goalId: string]: {
      serviceAttributes: string[];
      domainWeights: {
        hair: number;
        makeup: number;
        spa: number;
        brows: number;
        nails: number;
      }
    }
  };
  
  // Maps style preferences to service attributes
  styleMapping: {
    [styleId: string]: {
      serviceAttributes: string[];
    }
  };
  
  // Maps concerns to service attributes
  concernMapping: {
    [concernId: string]: {
      serviceAttributes: string[];
      recommendedServices: string[];
    }
  };
}
```

### 7.3 User Profile Generation

The consultation generates a user profile based on selections:

**User Profile Structure**
```typescript
interface UserProfile {
  id: string;
  primaryIntent: 'specific' | 'exploration' | 'event' | 'concern';
  
  // Service preferences
  domainPreferences: {
    hair: number; // 0-1 weight
    makeup: number;
    spa: number;
    brows: number;
    nails: number;
  };
  
  // Style attributes
  styleAttributes: {
    natural: number; // 0-1 weight
    bold: number;
    classic: number;
    trendy: number;
    // etc.
  };
  
  // Practical factors
  practicalFactors: {
    timeConstraint?: 'minimal' | 'moderate' | 'flexible';
    budgetLevel?: 'economy' | 'standard' | 'premium' | 'luxury';
    maintenanceWillingness?: 'low' | 'medium' | 'high';
  };
  
  // Context information
  contextualFactors: {
    eventPreparation?: boolean;
    specificConcerns?: string[];
    seasonalContext?: string;
  };
}
```

### 7.4 Landing Page Integration

The consultation flow outputs data that directly informs the landing page builder:

**Landing Page Data Structure**
```typescript
interface LandingPageData {
  // User profile information
  userProfile: UserProfile;
  
  // Service recommendations
  recommendations: {
    primary: ServiceRecommendation[];
    secondary: ServiceRecommendation[];
    tertiary: ServiceRecommendation[];
    packages: PackageRecommendation[];
  };
  
  // Visual customization parameters
  visualParameters: {
    dominantDomain: string;
    stylePreference: string;
    colorPalette: string;
    imageryStyle: string;
  };
  
  // Content customization parameters
  contentParameters: {
    headlineTemplate: string;
    subheadlineTemplate: string;
    benefitFocus: string[];
    testimonialCategory: string;
  };
}

interface ServiceRecommendation {
  id: string;
  name: string;
  category: string;
  relevanceScore: number;
  matchReasons: string[];
  complementaryTo?: string[]; // IDs of services this complements
}

interface PackageRecommendation {
  id: string;
  name: string;
  services: string[]; // IDs of included services
  discountPercentage: number;
  totalDuration: number;
  totalPrice: number;
  relevanceScore: number;
  matchReasons: string[];
}
```

## 8. Service Catalog Mapping

### 8.1 Service Metadata Structure

Each service in the catalog includes comprehensive metadata for matching:

**Service Metadata**
```typescript
interface ServiceMetadata {
  id: string;
  name: string;
  displayName: string;
  category: string;
  type: string;
  domain: 'hair' | 'makeup' | 'spa' | 'brows' | 'nails' | 'waxing';
  
  // Basic information
  description: string;
  shortDescription: string;
  duration: number; // in minutes
  price: number;
  priceRange?: [number, number]; // min/max for variable pricing
  
  // Visual assets
  primaryImage: string;
  galleryImages: string[];
  beforeAfterImages?: {before: string; after: string}[];
  
  // Attributes for matching
  attributes: {
    style: string[]; // e.g., "natural", "bold", "classic"
    outcome: string[]; // e.g., "volumizing", "smoothing", "defining"
    concern: string[]; // e.g., "damaged", "thinning", "uneven"
    experience: string[]; // e.g., "relaxing", "quick", "premium"
    maintenance: string[]; // e.g., "low", "medium", "high"
    occasion: string[]; // e.g., "everyday", "special", "wedding"
  };
  
  // Related services
  complementaryServices: string[]; // IDs of complementary services
  alternativeServices: string[]; // IDs of alternative services
  prerequisiteServices?: string[]; // IDs of required prerequisite services
  
  // Availability
  seasonality?: string[]; // e.g., "summer", "winter", "year-round"
  availability: boolean;
  limitedTimeOffer?: boolean;
}
```

### 8.2 Service Category Hierarchy

The service catalog is organized in a three-level hierarchy:

**Category → Type → Specific Service**

**Hair Services**
- Haircuts & Styling
  - Women's Haircut
  - Men's Haircut
  - Children's Haircut
  - Blowout
  - Special Occasion Style
- Color Services
  - Full Color
  - Highlights/Lowlights
  - Balayage/Ombré
  - Root Touch-Up
  - Color Correction
  - Fashion Color
- Treatments & Repairs
  - Deep Conditioning
  - Keratin Treatment
  - Bond Repair
  - Scalp Treatment
- Extensions & Additions
  - Tape-In Extensions
  - Fusion Extensions
  - Clip-In Extensions

**Makeup Services**
- Everyday Makeup
  - Natural Makeup Application
  - Day-to-Night Makeup
  - Express Makeup
- Special Occasion
  - Bridal Makeup
  - Event Makeup
  - Photoshoot Makeup
- Makeup Lessons
  - Personal Makeup Lesson
  - Group Makeup Class
  - Teen Makeup Lesson

**Skin & Spa Services**
- Facials
  - Classic Facial
  - Anti-Aging Facial
  - Hydrating Facial
  - Acne Treatment Facial
- Treatments
  - Chemical Peel
  - Microdermabrasion
  - LED Light Therapy
  - Microneedling
- Body Treatments
  - Body Scrub
  - Body Wrap
  - Massage

**Brow & Lash Services**
- Brow Services
  - Brow Shaping
  - Brow Tinting
  - Brow Lamination
  - Microblading
- Lash Services
  - Lash Lift
  - Lash Tint
  - Classic Lash Extensions
  - Volume Lash Extensions

**Nail Services**
- Manicures
  - Basic Manicure
  - Gel Manicure
  - Dip Powder
  - Nail Art
- Pedicures
  - Basic Pedicure
  - Spa Pedicure
  - Gel Pedicure
- Nail Enhancements
  - Acrylic Nails
  - Nail Extensions
  - Nail Repair

**Waxing & Hair Removal**
- Face Waxing
  - Lip Wax
  - Chin Wax
  - Full Face Wax
- Body Waxing
  - Underarm Wax
  - Leg Wax
  - Brazilian Wax
  - Back/Chest Wax
- Threading
  - Eyebrow Threading
  - Upper Lip Threading
  - Full Face Threading

### 8.3 User Profile to Service Mapping

The system maps user profiles to services using a weighted attribute matching system:

**Mapping Logic**
1. For specific service path:
   - Direct mapping based on selected category, type, and service
   - Complementary services identified through service metadata
   - Alternative services suggested based on service metadata

2. For exploration path:
   - Calculate domain weights based on primary goal and style preferences
   - Match style attributes from user profile to service attributes
   - Apply practical constraints as filters (time, budget, maintenance)
   - Calculate relevance scores for all services based on attribute matching
   - Sort services by relevance score within each domain
   - Select top services for primary, secondary, and tertiary recommendations

**Example Mapping Rules**
- Goal "Refresh my look" increases weight for services tagged with "refreshing", "updating", "maintenance"
- Style "Natural & effortless" increases weight for services tagged with "natural", "subtle", "low-maintenance"
- Concern "Damaged hair" increases weight for services tagged with "repair", "conditioning", "treatment"
- Time constraint "Under 1 hour" filters out services with duration > 60 minutes
- Budget level "Economy" prioritizes services in lower price tiers

## 9. Technical Implementation

### 9.1 Component Architecture

The consultation flow uses a modular component structure:

**Core Components**
- `EnhancedConsultationModal`: Container component with responsive sizing
- `EnhancedConsultationFlow`: Main flow controller and state manager
- `ConsultationQuestion`: Question presentation with adaptive layout
- `OptionGrid`: Responsive grid system for visual options
- `OptionCard`: Individual visual option with multiple layouts

**Component Hierarchy**
```
EnhancedConsultationModal
└── AestheticProvider (context provider)
    └── EnhancedConsultationFlow
        ├── ConsultationQuestion
        │   └── OptionGrid
        │       └── OptionCard
        └── ConsultationResults (when complete)
```

**State Management**
- React state for local component state
- Context API for shared state across components
- LocalStorage for persistence between sessions

**Animation System**
- Framer Motion for smooth transitions and animations
- AnimatePresence for component mounting/unmounting
- Consistent animation timing and easing
- Performance optimization for mobile devices

### 9.2 Data Structure

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

**Decision Tree Structure**
```typescript
const enhancedDecisionTree: Record<string, EnhancedDecisionNode> = {
  // Root node - initial intent disambiguation
  'root': {
    id: 'root',
    question: 'What brings you here today?',
    backgroundImage: '/images/consultation/backgrounds/welcome.jpg',
    options: [
      {
        id: 'specific-service',
        label: 'I\'m looking for a specific service',
        imageUrl: '/images/consultation/options/specific-service.jpg',
        emoji: '🔍',
        description: 'Help me find exactly what I need',
        weight: 1,
        nextNodeId: 'service-category',
        path: 'specific'
      },
      {
        id: 'exploration',
        label: 'I\'m exploring options',
        imageUrl: '/images/consultation/options/exploration.jpg',
        emoji: '✨',
        description: 'Help me discover services based on my needs',
        weight: 1,
        nextNodeId: 'primary-goal',
        path: 'exploration'
      },
      // Additional options...
    ]
  },
  
  // Specific service path nodes
  'service-category': {
    id: 'service-category',
    question: 'Which service category are you interested in?',
    backgroundImage: '/images/consultation/backgrounds/categories.jpg',
    path: 'specific',
    options: [
      {
        id: 'hair',
        label: 'Hair Services',
        imageUrl: '/images/consultation/options/hair.jpg',
        emoji: '💇‍♀️',
        weight: 1,
        domains: ['hair'],
        nextNodeId: 'hair-service-type'
      },
      // Additional categories...
    ]
  },
  
  // Additional nodes...
};
```

### 9.3 Performance Considerations

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

## 10. Success Metrics

### 10.1 User Experience Metrics

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

### 10.2 Business Impact Metrics

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

## 11. Implementation Plan

### 11.1 Development Phases

**Phase 1: Core Framework**
- Implement consultation modal and basic flow
- Develop initial decision tree structure
- Create responsive option grid and card components
- Implement basic state management

**Phase 2: Visual Assets**
- Develop visual design system for consultation
- Create/source imagery for options and backgrounds
- Implement image optimization pipeline
- Integrate with responsive layout system

**Phase 3: Service Mapping**
- Implement service metadata structure
- Develop attribute matching system
- Create user profile generation logic
- Build recommendation generation algorithm

**Phase 4: Landing Page Integration**
- Develop data output structure
- Create landing page data transformation
- Implement persistence mechanism
- Test end-to-end flow from consultation to landing page

**Phase 5: Testing & Optimization**
- Conduct usability testing
- Implement analytics tracking
- Optimize performance metrics
- Refine recommendation algorithm based on results

### 11.2 Timeline

**Week 1-2: Phase 1**
- Day 1-3: Component architecture setup
- Day 4-7: Basic flow implementation
- Day 8-10: State management implementation
- Day 11-14: Initial testing and refinement

**Week 3-4: Phase 2**
- Day 1-5: Visual asset creation/sourcing
- Day 6-10: Integration of visual assets
- Day 11-14: Responsive testing and optimization

**Week 5-6: Phase 3**
- Day 1-5: Service metadata implementation
- Day 6-10: Matching algorithm development
- Day 11-14: Testing with sample user profiles

**Week 7-8: Phase 4**
- Day 1-5: Landing page data structure implementation
- Day 6-10: Integration testing
- Day 11-14: End-to-end flow validation

**Week 9-10: Phase 5**
- Day 1-5: Usability testing
- Day 6-10: Performance optimization
- Day 11-14: Final refinements and documentation

## 12. Conclusion

The Image-Based Consultation Flow creates a mandatory but efficient discovery experience for all users, with optimized paths based on user intent. By clearly disambiguating between exploration and specific service needs in the first question, the system respects users' time while ensuring they find the most appropriate services. The specific service path allows users to pinpoint their desired service in just three decisions maximum, while the exploration path provides a more guided experience for those who need assistance. The structured data output from the consultation flow enables the landing page builder to create personalized, relevant landing pages that cater to each user's specific needs and preferences.

This specification provides a comprehensive framework for implementing the consultation flow, with detailed information on user experience, data structures, service mapping, technical implementation, and success metrics. By following this specification, the development team can create a cohesive, effective consultation experience that drives business results through increased bookings, higher average order values, and improved service discovery.

