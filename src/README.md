# Impressions Beauty Web - Streamlined Application

This application has been refocused to support only the following user journey:
- Home > Consultation > Resultant Landing Page > Cart Checkout > Booking Form > Submission Confirmation

## Archived Content

All components, contexts, hooks, and other files that are not part of this streamlined journey have been moved to `__archived` directories within their respective parent directories. This approach allows us to:

1. Keep the codebase clean and focused
2. Maintain access to archived code for reference
3. Clearly separate active code from deprecated code

## Key Components Retained

The following key components have been retained for the streamlined journey:

### Contexts
- ModalStateContext.tsx
- DomainThemeContext.tsx
- CartContext.tsx
- UnifiedCartContext.tsx

### Hooks
- useAestheticEvolution.ts
- useConsultation.ts
- useConsultationNode.ts
- useDecisionTree.ts
- useDynamicStyling.ts
- useModalState.ts
- useUnifiedCart.ts

### Engines
- AestheticEvolutionEngine.ts

### Utils
- artEvolution.ts

### Types
- ConsultationTypes.ts
- AestheticTypes.ts
- CartTypes.ts

### Data
- consultationData.ts

### Pages
- Home.tsx
- BookingPage.tsx
- BookingConfirmationPage.tsx
- ConsultationResults.tsx
- EnhancedConsultation.tsx
- PersonalizedResultsPage.tsx

## Dynamic Visual Styling

A key feature of this streamlined application is that the consultation's decision tree dynamically influences both content presentation and visual styling based on user choices. As users progress through the consultation, the application evolves its aesthetic to match their preferences and needs.

