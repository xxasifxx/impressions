# Data Models

The data models in the Impressions Beauty Web project define the structure and relationships of the data used throughout the application. These models ensure consistency, type safety, and clear data flow.

## Types and Models

The core type definitions and data models establish the foundation for all data structures in the application.

### Core Types

- **Service**: Represents a beauty service with properties like id, name, description, price, duration, domain, and metadata
- **ServiceBundle**: Represents a group of related services offered together, with properties like id, name, services, totalPrice, discountedPrice, and savings
- **ConsultationNode**: Represents a node in the consultation decision tree, with properties like id, question, options, and nextNodeMap
- **ConsultationOption**: Represents a selectable option in a consultation question, with properties like id, label, value, and metadata
- **ConsultationResult**: Represents the outcome of a consultation, with properties like id, responses, recommendedServices, and recommendedBundles
- **UserPreference**: Represents user preferences captured during consultation, with properties like preferredStyles, concerns, goals, and constraints
- **CartItem**: Represents an item in the shopping cart, with properties like id, service, quantity, and price
- **BookingSlot**: Represents an available time slot for booking, with properties like id, date, time, duration, and availability

### Domain-Specific Types

- **HairService**: Extends Service with hair-specific properties like hairType, technique, and additionalOptions
- **MakeupService**: Extends Service with makeup-specific properties like style, occasion, and products
- **MedSpaService**: Extends Service with med-spa-specific properties like treatmentType, technology, and aftercare

### UI-Related Types

- **ModalState**: Represents the state of a modal, with properties like isOpen, view, data, and history
- **ThemeConfig**: Represents theme configuration, with properties like colorScheme, typography, spacing, and animations
- **AestheticStyle**: Represents a visual style, with properties like name, colors, typography, imagery, and transitions

## Service Data

The service data structures define the actual service offerings available in the application.

### Service Categories

Services are organized into categories within each domain:

- **Hair Services**: Categories like Haircuts, Coloring, Treatments, Styling
- **Makeup Services**: Categories like Everyday, Special Occasion, Bridal, Lessons
- **Med Spa Services**: Categories like Facials, Injectables, Laser Treatments, Body Treatments

### Service Attributes

Each service includes detailed attributes:

- **Basic Information**: Name, description, price, duration
- **Technical Details**: Techniques, products, equipment used
- **Suitability Factors**: Hair type, skin type, concerns addressed
- **Results**: Expected outcomes, maintenance requirements
- **Add-ons**: Optional enhancements or modifications

### Service Relationships

Services can be related to each other in various ways:

- **Complementary Services**: Services that work well together
- **Prerequisite Services**: Services that should be done before others
- **Alternative Services**: Services that can substitute for each other
- **Follow-up Services**: Services recommended after others

## Metadata Tags

The metadata tagging system provides a flexible way to categorize and filter services based on various attributes.

### Tag Categories

Tags are organized into several categories:

- **Hair Concerns**: Tags like Dryness, Frizz, Thinning, Damage
- **Hair Goals**: Tags like Volume, Shine, Growth, Color Protection
- **Hair Types**: Tags like Straight, Wavy, Curly, Coily
- **Makeup Styles**: Tags like Natural, Glamorous, Dramatic, Editorial
- **Skin Concerns**: Tags like Acne, Aging, Hyperpigmentation, Sensitivity
- **Treatment Intensity**: Tags like Gentle, Moderate, Intensive
- **Experience Level**: Tags like Beginner, Intermediate, Advanced

### Tag Usage

Tags are used throughout the application for:

- **Filtering**: Allowing users to find services matching specific criteria
- **Recommendations**: Matching user preferences to suitable services
- **Bundling**: Creating logical groupings of complementary services
- **Content Organization**: Structuring service listings and categories

### Tag Relationships

Tags can have relationships with other tags:

- **Parent-Child**: Hierarchical relationships between tags
- **Related Tags**: Tags that are commonly associated
- **Conflicting Tags**: Tags that are mutually exclusive
- **Strength Indicators**: How strongly a service exhibits a tagged attribute

