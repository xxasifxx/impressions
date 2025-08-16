# Impressions Beauty Web Archive

This archive contains components, contexts, and other files that are no longer part of the streamlined user journey.

## Streamlined User Journey
The application has been refocused to support only the following user journey:
- Home > Consultation > Resultant Landing Page > Cart Checkout > Booking Form > Submission Confirmation

All other routes and components not directly supporting this journey have been archived here.

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

## Archiving Process
Files were moved to this archive as part of the technical debt reduction effort. The application has been rewritten to focus exclusively on the streamlined user journey, with new implementations inspired by the archived components but rebuilt for better performance and maintainability.

## Reference
This archive serves as a reference for understanding the previous implementation and can be used as inspiration for future enhancements to the streamlined application.

