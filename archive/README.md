# Impressions Beauty Web Archive

This archive contains components, contexts, and other files that are no longer part of the streamlined user journey.

## Streamlined User Journey
The application has been refocused to support only the following user journey:
- Home > Consultation > Resultant Landing Page > Cart Checkout > Booking Form > Submission Confirmation

All other routes and components not directly supporting this journey have been moved to this archive.

## Archive Structure
The archive maintains the original project structure, with files organized by their original directories:

- `components/` - UI components that are no longer in use
- `contexts/` - Context providers that are no longer needed
- `data/` - Data models and service data not used in the streamlined journey
- `engine/` - Engine implementations that have been replaced or are no longer needed
- `hooks/` - Custom hooks that are not part of the streamlined journey
- `pages/` - Page components for deprecated routes
- `styles/` - Style definitions not used in the current implementation
- `types/` - Type definitions for archived components
- `utils/` - Utility functions not needed in the streamlined journey
- `__tests__/` - Tests for archived components

## Key Components Retained in Source

Only the following components have been retained in the source tree for the streamlined journey:

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

