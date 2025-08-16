# Components

The components in the Impressions Beauty Web project are organized into several categories based on their functionality and purpose. This structure promotes reusability, maintainability, and a clear separation of concerns.

## UI Base Components

These are the foundational UI components that serve as building blocks for more complex components. They are designed to be highly reusable and follow consistent design patterns.

Key components include:
- **Button**: Customizable button component with various styles and states
- **Card**: Container component for displaying content in a card format
- **Input**: Form input components with validation support
- **Modal**: Base modal component for creating overlay dialogs
- **Select**: Dropdown selection component
- **Checkbox**: Toggle component for boolean selections
- **RadioGroup**: Component for mutually exclusive selections
- **Tooltip**: Informational hover component
- **Badge**: Label component for status indicators
- **Avatar**: User or entity representation component

These components are built on top of shadcn-ui and Tailwind CSS, providing a consistent design language throughout the application.

## Container Components

Container components are higher-level components that manage state and business logic. They typically compose multiple UI base components to create more complex functionality.

Key components include:
- **ServiceCard**: Displays service information with actions
- **BundleCard**: Presents bundled services with pricing
- **CartSummary**: Shows cart contents and totals
- **FilterPanel**: Provides filtering options for services
- **NavigationBar**: Top-level navigation component
- **Footer**: Site footer with links and information
- **Layout**: Page layout component with common elements

Container components often connect to context providers to access and modify application state.

## Consultation Components

These components are specifically designed for the consultation experience, implementing the decision tree-based flow.

Key components include:
- **ConsultationModal**: Main container for the consultation experience
- **QuestionNode**: Displays a consultation question with options
- **OptionSelector**: Presents selectable options for questions
- **ProgressIndicator**: Shows consultation progress
- **ResultsPreview**: Displays preliminary results during consultation
- **ConsultationSummary**: Summarizes consultation inputs and results
- **RecommendationCard**: Presents personalized service recommendations

These components work together to create an interactive, guided consultation experience that adapts to user inputs.

## Service Section Components

These components are focused on displaying and interacting with service information across different domains (hair, makeup, med spa).

Key components include:
- **ServiceCategory**: Groups related services under a category
- **ServiceDetail**: Displays detailed information about a service
- **PricingTable**: Shows service pricing information
- **ServiceComparison**: Compares different service options
- **ServiceGallery**: Displays images of service results
- **ServiceFilter**: Filters services based on criteria
- **DomainSelector**: Switches between service domains

These components ensure consistent presentation of service information while accommodating domain-specific variations.

## Template Components

Template components provide layout structures for different page types and sections. They establish consistent page organization and content flow.

Key components include:
- **PageTemplate**: Base template for standard pages
- **ServicePageTemplate**: Template for service listing pages
- **DetailPageTemplate**: Template for detailed content pages
- **ConsultationPageTemplate**: Template for consultation-related pages
- **ResultsPageTemplate**: Template for displaying recommendation results
- **BookingPageTemplate**: Template for the booking process

These templates ensure consistent layout and user experience across different sections of the application.

