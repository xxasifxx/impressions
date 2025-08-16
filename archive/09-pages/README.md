# Pages

The Impressions Beauty Web project includes various page components that serve as the main views for different sections of the application. These pages are organized by domain and purpose.

## Home Pages

These pages serve as entry points and overview pages for the application.

### Home.tsx

The main landing page for the application.

**Key Features:**
- Hero section with primary call-to-action
- Featured services showcase
- Consultation entry point
- Testimonials and social proof
- Latest promotions and offers
- Quick navigation to service domains

### Index.tsx

The root page that handles initial routing and application setup.

**Key Features:**
- Initial route handling
- Context providers setup
- Authentication check
- Theme initialization
- Analytics initialization

## Service Pages

These pages display service information and allow users to browse and select services.

### Services.tsx

The main services overview page that provides access to all service domains.

**Key Features:**
- Service domain navigation
- Featured services from each domain
- Service category browsing
- Special promotions and bundles
- Quick consultation access

### HairServices.tsx

A page dedicated to hair services.

**Key Features:**
- Hair service categories
- Service filtering by hair type, concern, etc.
- Featured hair services
- Hair consultation entry point
- Hair stylist information

### MakeupServices.tsx

A page dedicated to makeup services.

**Key Features:**
- Makeup service categories
- Service filtering by occasion, style, etc.
- Featured makeup services
- Makeup consultation entry point
- Makeup artist information

### MedSpa.tsx

A page dedicated to med spa services.

**Key Features:**
- Med spa service categories
- Service filtering by treatment type, concern, etc.
- Featured med spa services
- Med spa consultation entry point
- Practitioner information

## Consultation Pages

These pages handle the consultation process and results.

### EnhancedConsultation.tsx

The main consultation page that guides users through the decision tree.

**Key Features:**
- Interactive consultation flow
- Progress tracking
- Dynamic questioning based on previous answers
- Visual enhancements based on user preferences
- Option to save progress and continue later

### ConsultationResults.tsx

A page that displays the results of a completed consultation.

**Key Features:**
- Personalized service recommendations
- Recommended service bundles
- Summary of consultation responses
- Option to refine results
- Add to cart functionality
- Booking integration

### PersonalizedResultsPage.tsx

A detailed view of personalized recommendations with additional information.

**Key Features:**
- In-depth service information
- Personalization explanations
- Alternative recommendations
- Customization options
- Stylist/artist matching
- Before/after visualizations

## Booking Pages

These pages handle the booking process for services.

### BookingPage.tsx

The main booking page for scheduling services.

**Key Features:**
- Service selection confirmation
- Date and time selection
- Stylist/artist selection
- Add-on options
- Special requests
- Contact information collection

### BookingConfirmationPage.tsx

A confirmation page displayed after a successful booking.

**Key Features:**
- Booking summary
- Confirmation number
- Calendar integration
- Preparation instructions
- Cancellation/modification policy
- Follow-up appointment suggestions

