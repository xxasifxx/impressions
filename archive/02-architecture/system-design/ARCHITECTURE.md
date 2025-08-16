# Impressions Beauty Website - Architecture Overview

This document provides an architectural overview of the Impressions beauty website, focusing on the user journey and the technical components that support it.

## User Journey

The website is designed around a seamless user journey:

1. **Homepage Entry** → 2. **Visual Consultation** → 3. **Personalized Results** → 4. **Booking & Confirmation**

This journey is supported by several key technical systems:

## Core Technical Systems

### 1. Consultation Engine

The consultation engine guides users through a series of image-based questions to understand their preferences and needs.

**Key Components:**
- `UnifiedConsultationFlow`: Manages the overall consultation experience
- `ImageChoiceQuestion`: Presents visual choices to users
- `ConsultationContext`: Maintains consultation state throughout the journey

**Data Flow:**
1. User selects visual preferences
2. Responses are processed to identify domains and benefits
3. Results are stored in consultation context
4. User is directed to personalized results

### 2. Aesthetic Evolution System

This system adapts the visual appearance of the UI based on user preferences, creating a personalized experience.

**Key Components:**
- `AestheticEvolutionEngine`: Core logic for state transitions
- `AestheticProvider`: React context for aesthetic state
- `useAestheticEvolution`: Hook for components to access aesthetic state

**Evolution Process:**
1. Initial state begins with neutral aesthetic
2. User choices influence emotional context
3. UI transitions smoothly between aesthetic states
4. Final state reflects user's style preferences

### 3. Recommendation Engine

Analyzes consultation responses to generate personalized service recommendations across domains.

**Key Components:**
- `recommendationEngine`: Core logic for generating recommendations
- `benefitCategorization`: Organizes services by benefit rather than domain
- `servicesData`: Comprehensive service information with imagery

**Recommendation Process:**
1. Analyze consultation responses
2. Identify primary benefits sought by user
3. Match benefits to services across domains
4. Generate explanations for recommendations
5. Organize into benefit-based categories

### 4. Cart & Booking System

Manages the selection and booking of services.

**Key Components:**
- `CartContext`: Manages selected services
- `BookingPage`: Handles appointment scheduling
- `Calendar`: Date and time selection
- `BookingConfirmationPage`: Confirmation and summary

**Booking Flow:**
1. User adds recommended services to cart
2. User proceeds to booking page
3. User selects date and time
4. System confirms availability
5. User receives booking confirmation

## Data Architecture

### Key Data Structures

1. **Service**
```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: number;
  imageUrl: string;
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
  benefits: string[];
  tags: string[];
  relatedServices: string[];
}
```

2. **Consultation Question**
```typescript
interface ConsultationQuestion {
  id: string;
  text: string;
  description?: string;
  imageUrl?: string;
  responseType: 'single' | 'multiple' | 'image-choice';
  options: {
    id: string;
    text: string;
    imageUrl: string;
    domain?: string;
    benefits?: string[];
  }[];
}
```

3. **Aesthetic State**
```typescript
interface AestheticState {
  emotionalState: 'uncertain' | 'exploring' | 'engaged' | 'confident' | 'celebratory';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    // Additional color properties
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    headingWeight: number;
    // Additional typography properties
  };
  // Additional aesthetic properties
}
```

4. **Recommendation Result**
```typescript
interface RecommendationResult {
  benefitCategories: {
    [benefitCategory: string]: {
      title: string;
      description: string;
      services: Service[];
    }
  };
  primaryServices: Service[];
  complementaryServices: Service[];
  explanation: {
    [serviceId: string]: string;
  };
}
```

## Component Hierarchy

```
App
├── HomePage
│   └── HeroSection
│       └── ConsultationEntryButton
│
├── ConsultationModal
│   ├── AestheticProvider
│   └── UnifiedConsultationFlow
│       ├── ImageChoiceQuestion
│       └── ProgressIndicator
│
├── PersonalizedResultsPage
│   ├── BenefitSection
│   │   └── ServiceCard
│   └── ServiceDetailModal
│
├── BookingPage
│   ├── Calendar
│   └── ComplementaryServiceSuggestion
│
├── BookingConfirmationPage
│
└── Shared Components
    ├── Cart
    ├── Button
    ├── Dialog
    └── Sheet
```

## State Management

1. **Local Component State**
   - UI interactions
   - Form inputs
   - Modal visibility

2. **Context-Based State**
   - `CartContext`: Manages cart items
   - `AestheticContext`: Manages UI appearance
   - `ConsultationContext`: Manages consultation progress and results

3. **Persistent State**
   - LocalStorage for cart items
   - LocalStorage for consultation results
   - LocalStorage for user preferences

## Technical Considerations

### Performance Optimization

1. **Image Optimization**
   - Lazy loading for images
   - Responsive image sizes
   - WebP format where supported

2. **Code Splitting**
   - Route-based code splitting
   - Component lazy loading

3. **State Management Efficiency**
   - Memoization of expensive calculations
   - Selective context updates

### Accessibility

1. **Keyboard Navigation**
   - Full keyboard support for consultation
   - Focus management for modals

2. **Screen Reader Support**
   - Semantic HTML
   - ARIA attributes
   - Alternative text for images

3. **Visual Accessibility**
   - Sufficient color contrast
   - Resizable text
   - Focus indicators

### Mobile Considerations

1. **Responsive Design**
   - Mobile-first approach
   - Flexible layouts
   - Touch-friendly targets

2. **Performance**
   - Reduced image sizes for mobile
   - Simplified animations
   - Optimized network requests

## Future Extensibility

1. **Backend Integration**
   - API endpoints for service data
   - Authentication for user accounts
   - Real booking system integration

2. **Personalization Enhancements**
   - User accounts with saved preferences
   - Recommendation refinement based on feedback
   - Personalized follow-up communications

3. **Analytics Integration**
   - Detailed journey tracking
   - Conversion optimization
   - A/B testing framework

