# Business Logic Specification - Outcome-Focused Beauty Consultation

**Created**: 2025-11-25  
**Status**: APPROVED - Ready for Implementation  
**Purpose**: Complete business logic for converting customer outcomes into qualified WhatsApp inquiries

## Executive Summary

### Business Challenge
With 85 beauty services across 6 categories, customers experience decision paralysis. They know what they want to achieve (look great for wedding, fix damaged hair, try new style) but don't know which specific services to book.

### Solution Logic
**Outcome-First Consultation** that captures what customers want to achieve, not which services they think they need. Generate structured WhatsApp messages that enable human sales team to recommend appropriate services and close bookings.

## Core Business Logic

### 1. Outcome Categories

#### Primary Outcome Types
```typescript
enum CustomerOutcome {
  SPECIAL_EVENT = 'special-event',           // Wedding, date, interview, party
  TRANSFORMATION = 'transformation',         // Complete makeover, new look
  MAINTENANCE = 'maintenance',               // Regular upkeep, touch-ups
  PROBLEM_SOLVING = 'problem-solving',       // Fix issues, address concerns
  EXPERIMENTATION = 'experimentation'       // Try new styles, explore options
}
```

#### Outcome-Specific Questions
Each outcome type triggers different follow-up questions to capture relevant context:

**Special Event**:
- What's the occasion?
- When is the event?
- What's the dress code/vibe?
- Any specific requirements?

**Transformation**:
- What inspired this change?
- How dramatic are you feeling?
- Any styles you love/hate?
- Maintenance preferences?

**Maintenance**:
- What's your current routine?
- What's working/not working?
- How often do you visit?
- Budget for regular services?

### 2. Customer Segmentation Logic

#### Budget-Based Segmentation
```typescript
enum BudgetRange {
  BUDGET_CONSCIOUS = '$100-250',      // Basic services, single treatments
  MODERATE = '$250-500',              // Service combinations, quality treatments
  PREMIUM = '$500-1000',              // Comprehensive packages, luxury services
  LUXURY = '$1000-2000',              // Full transformation packages
  UNLIMITED = '$2000+',               // Complete makeover experiences
  FLEXIBLE = 'I\'m flexible'         // Let business recommend based on needs
}
```

#### Timeline-Based Urgency
```typescript
enum Timeline {
  URGENT = 'This week',               // High priority, premium pricing
  SOON = 'Next week',                 // Standard scheduling
  PLANNED = 'Within a month',         // Normal booking flow
  FUTURE = 'In 2-3 months',          // Advance planning, package deals
  FLEXIBLE = 'I\'m flexible'         // Optimal scheduling for business
}
```

### 3. Message Generation Logic

#### Message Structure Template
```typescript
interface WhatsAppMessage {
  header: string;                     // Business branding
  outcome: string;                    // Customer's desired result
  budget: string;                     // Investment range
  timeline: string;                   // When they need service
  preferences: string;                // Style/aesthetic preferences
  summary: string;                    // Personalized consultation summary
  callToAction: string;               // Next steps
}
```

#### Dynamic Message Generation
```typescript
const generatePersonalizedSummary = (data: ConsultationData): string => {
  const { outcome, budget, timeline, preferences } = data;
  
  // Logic for different outcome types
  switch (outcome) {
    case 'special-event':
      return `Looking to look absolutely stunning for their special occasion. 
              With a ${budget} budget and ${timeline} timeline, they want ${preferences} 
              styling that will make them feel confident and beautiful.`;
              
    case 'transformation':
      return `Ready for a complete transformation! They're feeling bold with a 
              ${budget} investment and ${timeline} to work with. Their style preference 
              is ${preferences} - this is going to be exciting!`;
              
    case 'maintenance':
      return `Wants to maintain their current look with regular ${preferences} services. 
              Budget of ${budget} works well for ongoing appointments, and they're 
              flexible with ${timeline} scheduling.`;
              
    // Additional cases for problem-solving and experimentation
  }
};
```

### 4. Service Recommendation Logic (For Human Sales Team)

#### Service Category Mapping
```typescript
const outcomeToServiceMapping = {
  'special-event': {
    hair: ['Bridal Hair Styling', 'Hairstyle', 'Blow Out', 'Color Touch-Up'],
    makeup: ['Bridal Silver/Gold/Platinum', 'Formal Party Makeup', 'Airbrush Makeup'],
    facial: ['Express Facial', 'Hydrating Facial', 'LED Light Therapy'],
    eyebrow_lash: ['Eyebrow Shaping', 'Lash Extensions', 'Lash Lift']
  },
  
  'transformation': {
    hair: ['Color Correction', 'Balayage', 'Keratin Treatment', 'Hair Extensions'],
    makeup: ['Makeup Lesson', 'Contouring Makeup', 'Photography Makeup'],
    facial: ['Chemical Peel', 'Microdermabrasion', 'Anti-Aging Treatments'],
    eyebrow_lash: ['Microblading', 'Lash Volume Extensions', 'Eyebrow Laminating']
  },
  
  'maintenance': {
    hair: ['Haircut - Women/Men', 'Root Touch-Up', 'Deep Conditioning'],
    threading: ['Threading - Eyebrow', 'Threading - Upper Lip'],
    waxing: ['Waxing - Bikini', 'Waxing - Underarms', 'Waxing - Legs'],
    facial: ['Gold Facial', 'Express Facial', 'Men\'s Facial']
  }
};
```

#### Budget-to-Service Logic
```typescript
const budgetToServiceRecommendations = {
  '$100-250': {
    maxServices: 2,
    serviceTypes: ['single-treatment', 'basic-combination'],
    examples: ['Haircut + Blow Out', 'Express Facial + Eyebrow Threading']
  },
  
  '$250-500': {
    maxServices: 3,
    serviceTypes: ['service-combination', 'premium-single'],
    examples: ['Color + Cut + Style', 'Bridal Makeup + Lash Extensions']
  },
  
  '$500-1000': {
    maxServices: 5,
    serviceTypes: ['comprehensive-package', 'luxury-treatments'],
    examples: ['Full Color Correction + Extensions', 'Bridal Package + Facial']
  }
};
```

## Consultation Flow Logic

### 1. Entry Point Logic
```typescript
const determineEntryPoint = (domain: string, userIntent: string) => {
  // Logic for different domain entry points
  const domainQuestions = {
    'hair-salon': {
      primary: "What's your hair goal?",
      options: ['Special event styling', 'Complete hair transformation', 
               'Regular maintenance', 'Fix hair problems', 'Try something new']
    },
    
    'makeup-studio': {
      primary: "What's your makeup vision?",
      options: ['Event makeup', 'Learn new techniques', 'Regular touch-ups', 
               'Complete makeover', 'Professional photoshoot']
    },
    
    'med-spa': {
      primary: "What's your skincare goal?",
      options: ['Special event prep', 'Anti-aging treatment', 'Regular facials',
               'Problem skin solutions', 'Relaxation and pampering']
    }
  };
  
  return domainQuestions[domain];
};
```

### 2. Progressive Question Logic
```typescript
const getNextQuestion = (currentStep: number, previousAnswers: ConsultationData) => {
  const questionFlow = {
    1: {
      type: 'outcome-selection',
      question: getDomainSpecificOutcomeQuestion(previousAnswers.domain),
      validation: 'required'
    },
    
    2: {
      type: 'budget-selection',
      question: "What's your investment range for this beauty experience?",
      options: getBudgetOptionsForOutcome(previousAnswers.outcome),
      validation: 'required'
    },
    
    3: {
      type: 'timeline-selection',
      question: "When are you looking to book this?",
      options: getTimelineOptionsForOutcome(previousAnswers.outcome),
      validation: 'required'
    },
    
    4: {
      type: 'preference-selection',
      question: getPreferenceQuestionForOutcome(previousAnswers.outcome),
      options: getPreferenceOptionsForOutcome(previousAnswers.outcome),
      validation: 'required'
    }
  };
  
  return questionFlow[currentStep];
};
```

### 3. Validation Logic
```typescript
const validateConsultationData = (data: ConsultationData): ValidationResult => {
  const errors: string[] = [];
  
  // Required field validation
  if (!data.outcome) errors.push('Outcome selection required');
  if (!data.budget) errors.push('Budget range required');
  if (!data.timeline) errors.push('Timeline required');
  if (!data.preferences) errors.push('Style preferences required');
  
  // Business logic validation
  if (data.timeline === 'This week' && data.budget === '$100-250') {
    errors.push('Urgent timeline may require premium pricing');
  }
  
  if (data.outcome === 'transformation' && data.budget === '$100-250') {
    errors.push('Transformation services typically require higher investment');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings: generateWarnings(data)
  };
};
```

## WhatsApp Message Optimization

### 1. Message Formatting Logic
```typescript
const formatWhatsAppMessage = (data: ConsultationData): string => {
  const emoji = getOutcomeEmoji(data.outcome);
  const urgency = getUrgencyIndicator(data.timeline);
  const summary = generatePersonalizedSummary(data);
  
  return `
${emoji} New Beauty Consultation Request from Impressions

🎯 Service Needed: ${data.outcome}
💰 Budget: ${data.budget}
📅 Timeline: ${data.timeline} ${urgency}
💅 Style Preference: ${data.preferences}

${summary}

✨ Ready to book this consultation! Please contact me to schedule.
  `.trim();
};
```

### 2. Message Personalization Logic
```typescript
const personalizeMessage = (data: ConsultationData): string => {
  const personalizationRules = {
    'special-event': (data) => 
      `This is such an exciting occasion! I want to make sure I look absolutely perfect.`,
      
    'transformation': (data) => 
      `I'm ready for a big change and would love your expert guidance on the best approach.`,
      
    'maintenance': (data) => 
      `I love taking care of myself and want to establish a regular routine with your team.`,
      
    'problem-solving': (data) => 
      `I have some specific concerns I'd like to address and would appreciate your professional advice.`,
      
    'experimentation': (data) => 
      `I'm feeling adventurous and would love to try something new with your guidance.`
  };
  
  return personalizationRules[data.outcome](data);
};
```

## Business Rules & Constraints

### 1. Service Availability Rules
```typescript
const serviceAvailabilityRules = {
  'urgent-timeline': {
    'This week': {
      availableServices: ['Express services', 'Single treatments', 'Touch-ups'],
      unavailableServices: ['Color correction', 'Extensions', 'Complex treatments'],
      message: 'For urgent bookings, we focus on services that can be completed quickly'
    }
  },
  
  'budget-constraints': {
    '$100-250': {
      maxDuration: '2 hours',
      serviceLimit: 2,
      message: 'We can create beautiful results within your budget range'
    }
  }
};
```

### 2. Upselling Logic
```typescript
const generateUpsellOpportunities = (data: ConsultationData): string[] => {
  const upsells: string[] = [];
  
  if (data.outcome === 'special-event' && data.budget !== '$100-250') {
    upsells.push('Consider adding a pre-event facial for glowing skin');
  }
  
  if (data.outcome === 'transformation' && !data.preferences.includes('maintenance')) {
    upsells.push('Ask about maintenance packages to keep your new look fresh');
  }
  
  if (data.timeline === 'I\'m flexible') {
    upsells.push('Flexible scheduling may qualify for package discounts');
  }
  
  return upsells;
};
```

### 3. Quality Assurance Rules
```typescript
const qualityAssuranceChecks = {
  messageLength: {
    min: 100,
    max: 500,
    rule: 'WhatsApp messages should be comprehensive but not overwhelming'
  },
  
  informationCompleteness: {
    required: ['outcome', 'budget', 'timeline', 'preferences'],
    rule: 'All consultation data must be captured for effective sales conversation'
  },
  
  personalization: {
    minPersonalizedElements: 3,
    rule: 'Messages must feel personal and specific to customer needs'
  }
};
```

## Success Metrics & KPIs

### 1. Consultation Quality Metrics
```typescript
interface ConsultationMetrics {
  completionRate: number;        // % who complete all 4 steps
  dropoffByStep: number[];       // Where people abandon consultation
  averageTimePerStep: number[];  // How long each step takes
  messageQuality: number;        // Human sales team feedback score
}
```

### 2. Conversion Tracking
```typescript
interface ConversionMetrics {
  whatsappClickRate: number;     // % who click "Send via WhatsApp"
  messageDeliveryRate: number;   // % of messages successfully sent
  salesResponseRate: number;     // % who get response from sales team
  bookingConversionRate: number; // % who book actual appointments
}
```

### 3. Business Impact Metrics
```typescript
interface BusinessMetrics {
  averageInquiryValue: number;   // Average budget of inquiries
  serviceDiscoveryRate: number;  // % who discover new services
  upsellOpportunityRate: number; // % with upsell potential
  customerSatisfactionScore: number; // Post-consultation feedback
}
```

This business logic specification provides the complete framework for converting customer outcomes into qualified sales inquiries while maintaining the simplicity and effectiveness of the MVP approach.

