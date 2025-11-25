# Work Packages - Outcome-Focused Beauty Consultation MVP

**Created**: 2025-11-25  
**Status**: APPROVED - Ready for Implementation  
**Purpose**: Discrete, executable work packages for agentic development

## Overview

Each work package is designed to be:
- **Self-contained**: All context and requirements included
- **Testable**: Clear acceptance criteria and validation steps
- **Independent**: Can be executed without dependencies on other packages
- **Documented**: Complete specifications for any agent to execute

## Package Execution Order

### Phase 1: Foundation (Packages 1-3)
Core infrastructure and configuration

### Phase 2: Consultation Engine (Packages 4-7)
Outcome-focused consultation flow

### Phase 3: Integration (Packages 8-10)
WhatsApp integration and message generation

### Phase 4: Optimization (Packages 11-12)
Performance and user experience enhancements

---

## PACKAGE 1: Configuration Management System

**Priority**: Critical  
**Estimated Time**: 2-3 hours  
**Dependencies**: None  

### Objective
Create centralized configuration system for business settings, WhatsApp integration, and environment-specific variables.

### Requirements
1. Create `src/config/businessConfig.ts` with TypeScript interfaces
2. Support environment variable overrides
3. Provide default fallback values
4. Include domain-specific configurations

### Technical Specifications
```typescript
// src/config/businessConfig.ts
export interface BusinessConfig {
  whatsappNumber: string;
  businessName: string;
  environment: 'development' | 'production';
  domains: {
    'hair-salon': DomainConfig;
    'makeup-studio': DomainConfig;
    'med-spa': DomainConfig;
  };
}

export interface DomainConfig {
  name: string;
  primaryColor: string;
  services: string[];
  specialties: string[];
}
```

### Implementation Details
- Use `process.env.VITE_WHATSAPP_NUMBER` for phone number
- Provide development fallback: `'1234567890'`
- Export `getBusinessConfig()` function
- Include validation for required fields

### Acceptance Criteria
- [ ] Configuration loads without errors
- [ ] Environment variables override defaults
- [ ] TypeScript types are properly defined
- [ ] All domains have complete configuration
- [ ] Validation prevents invalid configurations

### Files to Create/Modify
- `src/config/businessConfig.ts` (new)
- `src/config/index.ts` (new)

### Testing Requirements
- Unit tests for configuration loading
- Environment variable override testing
- Validation error handling tests

---

## PACKAGE 2: Service Data Architecture

**Priority**: Critical  
**Estimated Time**: 3-4 hours  
**Dependencies**: Package 1 (Configuration)  

### Objective
Restructure the 85-service database for outcome-focused consultation logic instead of traditional service browsing.

### Requirements
1. Enhance existing service data with outcome mappings
2. Create service recommendation logic
3. Add budget and timeline compatibility data
4. Implement service search and filtering utilities

### Technical Specifications
```typescript
// Enhance existing Service interface
export interface EnhancedService extends Service {
  outcomes: CustomerOutcome[];           // Which outcomes this service supports
  budgetCompatibility: BudgetRange[];    // Which budgets this fits
  timelineCompatibility: Timeline[];     // How much notice needed
  combinationServices: string[];         // Services that pair well
  upsellOpportunities: string[];         // Natural upsells
  complexity: 'simple' | 'moderate' | 'complex';
}
```

### Implementation Details
- Extend existing `SERVICES` array with outcome mappings
- Create utility functions for service recommendations
- Add service filtering by outcome, budget, timeline
- Implement service combination logic

### Acceptance Criteria
- [ ] All 85 services have outcome mappings
- [ ] Budget compatibility is accurately defined
- [ ] Timeline requirements are realistic
- [ ] Service combinations make business sense
- [ ] Utility functions work correctly

### Files to Create/Modify
- `src/data/enhancedServicesData.ts` (new)
- `src/utils/serviceRecommendations.ts` (new)
- `src/types/consultation.ts` (new)

### Testing Requirements
- Service recommendation accuracy tests
- Budget/timeline filtering tests
- Service combination logic validation

---

## PACKAGE 3: Consultation Data Types & Interfaces

**Priority**: Critical  
**Estimated Time**: 1-2 hours  
**Dependencies**: None  

### Objective
Define comprehensive TypeScript interfaces for consultation flow, ensuring type safety and clear data contracts.

### Requirements
1. Define consultation data structures
2. Create validation interfaces
3. Establish message generation types
4. Include error handling types

### Technical Specifications
```typescript
// src/types/consultation.ts
export enum CustomerOutcome {
  SPECIAL_EVENT = 'special-event',
  TRANSFORMATION = 'transformation',
  MAINTENANCE = 'maintenance',
  PROBLEM_SOLVING = 'problem-solving',
  EXPERIMENTATION = 'experimentation'
}

export interface ConsultationData {
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
  outcome: CustomerOutcome;
  budget: BudgetRange;
  timeline: Timeline;
  preferences: string;
  additionalInfo?: string;
  sessionId: string;
  timestamp: Date;
}

export interface ConsultationStep {
  id: number;
  type: 'outcome' | 'budget' | 'timeline' | 'preferences';
  question: string;
  options: string[];
  validation: ValidationRule;
  helpText?: string;
}
```

### Implementation Details
- Use strict TypeScript types
- Include comprehensive JSDoc documentation
- Add validation rule definitions
- Create utility type guards

### Acceptance Criteria
- [ ] All consultation data types defined
- [ ] Validation interfaces complete
- [ ] Type guards implemented
- [ ] JSDoc documentation complete
- [ ] No TypeScript compilation errors

### Files to Create/Modify
- `src/types/consultation.ts` (new)
- `src/types/validation.ts` (new)
- `src/types/index.ts` (new)

### Testing Requirements
- Type guard validation tests
- Interface completeness verification

---

## PACKAGE 4: Consultation Step Engine

**Priority**: High  
**Estimated Time**: 4-5 hours  
**Dependencies**: Package 3 (Types)  

### Objective
Create the core consultation flow engine that manages step progression, data collection, and validation.

### Requirements
1. Build step management system
2. Implement progressive question logic
3. Add validation and error handling
4. Create step navigation controls

### Technical Specifications
```typescript
// src/hooks/useConsultationFlow.ts
export const useConsultationFlow = (domain: string) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [consultationData, setConsultationData] = useState<ConsultationData>();
  const [errors, setErrors] = useState<ValidationError[]>([]);
  
  const nextStep = () => { /* logic */ };
  const previousStep = () => { /* logic */ };
  const updateData = (key: string, value: any) => { /* logic */ };
  const validateStep = () => { /* logic */ };
  
  return {
    currentStep,
    consultationData,
    errors,
    nextStep,
    previousStep,
    updateData,
    validateStep,
    isComplete: currentStep > 4
  };
};
```

### Implementation Details
- Use React hooks for state management
- Implement step validation before progression
- Add error handling and user feedback
- Support step navigation (back/forward)

### Acceptance Criteria
- [ ] Step progression works smoothly
- [ ] Data validation prevents invalid submissions
- [ ] Error messages are user-friendly
- [ ] Navigation controls function correctly
- [ ] State management is reliable

### Files to Create/Modify
- `src/hooks/useConsultationFlow.ts` (new)
- `src/utils/consultationValidation.ts` (new)
- `src/components/consultation/ConsultationStep.tsx` (new)

### Testing Requirements
- Step progression logic tests
- Validation rule enforcement tests
- Error handling scenario tests

---

## PACKAGE 5: Outcome-Focused Question Engine

**Priority**: High  
**Estimated Time**: 3-4 hours  
**Dependencies**: Package 4 (Step Engine)  

### Objective
Implement dynamic question generation based on customer outcomes, ensuring questions are relevant and lead to actionable insights.

### Requirements
1. Create outcome-specific question sets
2. Implement dynamic option generation
3. Add contextual help and guidance
4. Ensure questions capture actionable data

### Technical Specifications
```typescript
// src/utils/questionGeneration.ts
export const generateQuestionForStep = (
  step: number, 
  domain: string, 
  previousAnswers: Partial<ConsultationData>
): ConsultationStep => {
  const questionGenerators = {
    1: generateOutcomeQuestion,
    2: generateBudgetQuestion,
    3: generateTimelineQuestion,
    4: generatePreferenceQuestion
  };
  
  return questionGenerators[step](domain, previousAnswers);
};
```

### Implementation Details
- Questions adapt based on domain (hair/makeup/med-spa)
- Options change based on previous answers
- Include helpful context and examples
- Ensure questions lead to actionable business insights

### Acceptance Criteria
- [ ] Questions are domain-appropriate
- [ ] Options are relevant and comprehensive
- [ ] Help text provides useful guidance
- [ ] Questions capture actionable data
- [ ] Flow feels natural and conversational

### Files to Create/Modify
- `src/utils/questionGeneration.ts` (new)
- `src/data/consultationQuestions.ts` (new)
- `src/components/consultation/QuestionRenderer.tsx` (new)

### Testing Requirements
- Question relevance validation
- Option completeness verification
- Help text clarity assessment

---

## PACKAGE 6: Consultation UI Components

**Priority**: High  
**Estimated Time**: 5-6 hours  
**Dependencies**: Package 5 (Question Engine)  

### Objective
Build user interface components for the consultation flow that are mobile-optimized, accessible, and aligned with the visual charter.

### Requirements
1. Create consultation flow container
2. Build step indicator component
3. Implement question/answer components
4. Add progress and navigation elements

### Technical Specifications
```typescript
// src/components/consultation/ConsultationFlow.tsx
export const ConsultationFlow: React.FC<{
  domain: string;
  onComplete: (data: ConsultationData) => void;
}> = ({ domain, onComplete }) => {
  const {
    currentStep,
    consultationData,
    nextStep,
    previousStep,
    updateData,
    isComplete
  } = useConsultationFlow(domain);
  
  // Component implementation
};
```

### Implementation Details
- Mobile-first responsive design
- Touch-friendly interaction areas
- Clear visual hierarchy
- Smooth transitions between steps
- Accessibility compliance (WCAG 2.1)

### Acceptance Criteria
- [ ] Mobile-optimized layout
- [ ] Touch interactions work smoothly
- [ ] Visual design follows charter
- [ ] Accessibility requirements met
- [ ] Smooth step transitions

### Files to Create/Modify
- `src/components/consultation/ConsultationFlow.tsx` (new)
- `src/components/consultation/StepIndicator.tsx` (new)
- `src/components/consultation/AnswerOptions.tsx` (new)
- `src/components/consultation/NavigationControls.tsx` (new)

### Testing Requirements
- Mobile responsiveness tests
- Accessibility compliance verification
- User interaction flow tests

---

## PACKAGE 7: Message Preview Component

**Priority**: High  
**Estimated Time**: 2-3 hours  
**Dependencies**: Package 6 (UI Components)  

### Objective
Create a message preview component that shows customers exactly what will be sent via WhatsApp before they commit to sending it.

### Requirements
1. Generate formatted WhatsApp message preview
2. Allow minor edits before sending
3. Show message character count
4. Provide send/edit options

### Technical Specifications
```typescript
// src/components/consultation/MessagePreview.tsx
export const MessagePreview: React.FC<{
  consultationData: ConsultationData;
  onSend: (message: string) => void;
  onEdit: () => void;
}> = ({ consultationData, onSend, onEdit }) => {
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Component implementation
};
```

### Implementation Details
- Real-time message generation
- Character count display
- Edit functionality for personalization
- Clear send/back navigation
- WhatsApp-style message formatting

### Acceptance Criteria
- [ ] Message preview is accurate
- [ ] Edit functionality works
- [ ] Character count is displayed
- [ ] Send/back options are clear
- [ ] Message formatting looks professional

### Files to Create/Modify
- `src/components/consultation/MessagePreview.tsx` (new)
- `src/utils/messageFormatting.ts` (new)

### Testing Requirements
- Message generation accuracy tests
- Edit functionality validation
- Character count verification

---

## PACKAGE 8: WhatsApp Integration System

**Priority**: Critical  
**Estimated Time**: 2-3 hours  
**Dependencies**: Package 7 (Message Preview)  

### Objective
Implement WhatsApp integration using wa.me redirect approach, ensuring reliable message delivery and proper URL encoding.

### Requirements
1. Create WhatsApp URL generation
2. Handle message encoding properly
3. Add error handling for failed opens
4. Support different devices/platforms

### Technical Specifications
```typescript
// src/utils/whatsappIntegration.ts
export const sendToWhatsApp = (
  message: string, 
  phoneNumber: string
): Promise<boolean> => {
  try {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Handle different platforms
    if (isMobile()) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
    
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};
```

### Implementation Details
- Proper URL encoding for special characters
- Platform detection (mobile vs desktop)
- Error handling for blocked popups
- Fallback options if WhatsApp not available

### Acceptance Criteria
- [ ] WhatsApp opens correctly on all platforms
- [ ] Messages are properly encoded
- [ ] Error handling works
- [ ] Fallback options available
- [ ] Phone number validation

### Files to Create/Modify
- `src/utils/whatsappIntegration.ts` (new)
- `src/utils/platformDetection.ts` (new)

### Testing Requirements
- Cross-platform compatibility tests
- Message encoding validation
- Error scenario handling tests

---

## PACKAGE 9: Message Generation Engine

**Priority**: High  
**Estimated Time**: 3-4 hours  
**Dependencies**: Package 8 (WhatsApp Integration)  

### Objective
Create intelligent message generation that produces personalized, actionable WhatsApp messages based on consultation responses.

### Requirements
1. Generate personalized message content
2. Include all relevant consultation data
3. Add business context and next steps
4. Optimize for human sales team

### Technical Specifications
```typescript
// src/utils/messageGeneration.ts
export const generateWhatsAppMessage = (
  data: ConsultationData,
  config: BusinessConfig
): string => {
  const header = generateMessageHeader(config.businessName);
  const body = generateMessageBody(data);
  const summary = generatePersonalizedSummary(data);
  const cta = generateCallToAction(data);
  
  return `${header}\n\n${body}\n\n${summary}\n\n${cta}`;
};
```

### Implementation Details
- Personalization based on outcome type
- Professional but friendly tone
- Include all consultation data clearly
- Add context for sales team
- Optimize message length for WhatsApp

### Acceptance Criteria
- [ ] Messages are personalized and relevant
- [ ] All consultation data is included
- [ ] Tone is professional but approachable
- [ ] Messages are optimal length
- [ ] Sales team can act on information

### Files to Create/Modify
- `src/utils/messageGeneration.ts` (new)
- `src/utils/messagePersonalization.ts` (new)
- `src/templates/messageTemplates.ts` (new)

### Testing Requirements
- Message quality assessment
- Personalization accuracy tests
- Sales team feedback validation

---

## PACKAGE 10: Landing Page Integration

**Priority**: Medium  
**Estimated Time**: 2-3 hours  
**Dependencies**: Package 9 (Message Generation)  

### Objective
Integrate the consultation flow into existing landing pages, replacing "View All Services" buttons with consultation entry points.

### Requirements
1. Update landing page components
2. Add consultation entry points
3. Maintain existing design aesthetic
4. Ensure smooth user flow

### Technical Specifications
```typescript
// Update existing landing page components
const ConsultationEntryPoint: React.FC<{
  domain: string;
  onStartConsultation: () => void;
}> = ({ domain, onStartConsultation }) => {
  return (
    <div className="consultation-entry">
      <h3>What brings you in today?</h3>
      <Button onClick={onStartConsultation}>
        Start Your Beauty Consultation
      </Button>
      <Link to={`/services?domain=${domain}`} className="secondary">
        Or browse all services
      </Link>
    </div>
  );
};
```

### Implementation Details
- Replace existing "View All Services" buttons
- Maintain current visual design
- Add secondary option to browse services
- Ensure mobile optimization

### Acceptance Criteria
- [ ] Landing pages updated successfully
- [ ] Consultation entry points are prominent
- [ ] Design consistency maintained
- [ ] Mobile experience optimized
- [ ] Service browsing still available

### Files to Create/Modify
- `src/components/home/ConsultationEntryPoint.tsx` (new)
- `src/pages/HairSalonLanding.tsx` (modify)
- `src/pages/MakeupStudioLanding.tsx` (modify)
- `src/pages/MedSpaLanding.tsx` (modify)

### Testing Requirements
- Landing page functionality tests
- Design consistency verification
- Mobile optimization validation

---

## PACKAGE 11: Performance Optimization

**Priority**: Medium  
**Estimated Time**: 2-3 hours  
**Dependencies**: Package 10 (Landing Page Integration)  

### Objective
Optimize application performance for mobile devices and ensure fast loading times throughout the consultation flow.

### Requirements
1. Implement code splitting for consultation components
2. Optimize image loading and sizing
3. Add loading states and transitions
4. Minimize bundle size

### Technical Specifications
```typescript
// Implement lazy loading for consultation components
const ConsultationFlow = lazy(() => import('./components/consultation/ConsultationFlow'));

// Add loading states
const ConsultationWrapper: React.FC = () => {
  return (
    <Suspense fallback={<ConsultationLoadingSpinner />}>
      <ConsultationFlow />
    </Suspense>
  );
};
```

### Implementation Details
- Code splitting for consultation components
- Image optimization and lazy loading
- Loading state components
- Bundle size analysis and optimization

### Acceptance Criteria
- [ ] Initial page load < 2 seconds
- [ ] Consultation steps load < 500ms
- [ ] Images load progressively
- [ ] Bundle size optimized
- [ ] Loading states provide feedback

### Files to Create/Modify
- `src/components/common/LoadingSpinner.tsx` (new)
- `src/utils/performanceOptimization.ts` (new)
- Update existing components with lazy loading

### Testing Requirements
- Performance benchmarking
- Bundle size analysis
- Loading time measurements

---

## PACKAGE 12: Analytics & Tracking

**Priority**: Low  
**Estimated Time**: 2-3 hours  
**Dependencies**: Package 11 (Performance Optimization)  

### Objective
Implement basic analytics to track consultation completion rates, drop-off points, and conversion metrics.

### Requirements
1. Track consultation step progression
2. Monitor completion rates
3. Identify drop-off points
4. Measure WhatsApp conversion

### Technical Specifications
```typescript
// src/utils/analytics.ts
export const trackConsultationEvent = (
  event: 'step_completed' | 'consultation_completed' | 'whatsapp_sent',
  data: {
    step?: number;
    domain?: string;
    outcome?: string;
    sessionId: string;
  }
) => {
  // Analytics implementation
  console.log('Analytics Event:', event, data);
  
  // Future: Send to analytics service
  // analytics.track(event, data);
};
```

### Implementation Details
- Client-side event tracking
- Local storage for session tracking
- Privacy-compliant data collection
- Preparation for future analytics integration

### Acceptance Criteria
- [ ] Key events are tracked
- [ ] Session data is maintained
- [ ] Privacy compliance ensured
- [ ] Analytics ready for integration
- [ ] Performance impact minimal

### Files to Create/Modify
- `src/utils/analytics.ts` (new)
- `src/hooks/useAnalytics.ts` (new)
- Update consultation components with tracking

### Testing Requirements
- Event tracking verification
- Privacy compliance validation
- Performance impact assessment

---

## Package Dependencies Graph

```
Package 1 (Config) → Package 2 (Service Data)
Package 3 (Types) → Package 4 (Step Engine) → Package 5 (Questions) → Package 6 (UI) → Package 7 (Preview)
Package 7 → Package 8 (WhatsApp) → Package 9 (Messages)
Package 9 → Package 10 (Landing Pages) → Package 11 (Performance) → Package 12 (Analytics)
```

## Execution Guidelines

### For Each Package:
1. **Read the complete specification** before starting
2. **Create all required files** as specified
3. **Implement all acceptance criteria** before marking complete
4. **Run all specified tests** to validate functionality
5. **Document any deviations** from the specification

### Quality Standards:
- **TypeScript**: Strict type checking enabled
- **Testing**: Unit tests for all business logic
- **Documentation**: JSDoc for all public functions
- **Performance**: Mobile-optimized, < 2s load times
- **Accessibility**: WCAG 2.1 AA compliance

### Validation Process:
- Each package must pass all acceptance criteria
- Code review for TypeScript compliance
- Manual testing on mobile devices
- Performance benchmarking
- Accessibility audit

This work package structure ensures that any agent can pick up and execute individual packages while maintaining system coherence and quality standards.

