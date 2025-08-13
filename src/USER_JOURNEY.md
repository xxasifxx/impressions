# Impressions Beauty Website - User Journey

This document details the complete user journey for the Impressions beauty website, from initial landing to booking confirmation.

## 1. Homepage Experience

When a user first lands on the Impressions website, they encounter:

### Visual Elements
- **Hero Section**: A visually striking image that subtly incorporates elements from all three domains (hair, makeup, spa)
- **Tagline**: "Discover Your Perfect Beauty Experience"
- **Primary CTA**: Large, prominent "Find Your Perfect Services" button
- **Subtle Domain Hints**: Visual cues from all domains without forcing an explicit choice

### User Actions
- Click the primary CTA button to begin the consultation
- (Optional) Browse minimal navigation for about/contact information

### Technical Components
- `HomePage.tsx`: Main container component
- `HeroSection.tsx`: Visual hero area with CTA
- `ConsultationEntryButton.tsx`: Button that launches the consultation modal

### Design Principles
- Clean, uncluttered design
- No explicit domain choices (hair salon, makeup studio, med spa)
- Single, clear call-to-action
- Visually appealing imagery that speaks to diverse beauty interests

## 2. Consultation Flow

After clicking the CTA, the user enters the consultation flow:

### Visual Elements
- **Modal Interface**: Full-screen or large modal with immersive experience
- **Image-Based Questions**: Visual choices rather than text options
- **Progress Indicator**: Shows advancement through the consultation
- **Evolving Aesthetics**: UI subtly adapts to user's emerging preferences

### Question Progression
1. **Lifestyle/Occasion**: "What's your upcoming occasion or everyday style?"
   - Images showing different lifestyle scenarios (special event, professional, casual, etc.)

2. **Aesthetic Preference**: "Which visual style appeals to you most?"
   - Images showing different aesthetic directions (natural, bold, elegant, etc.)

3. **Specific Needs**: "What specific areas would you like to focus on?"
   - Images highlighting different beauty focuses (hair, skin, makeup, relaxation, etc.)

4. **Time & Budget**: "How much time do you have for your beauty experience?"
   - Visual representations of different time commitments

### User Actions
- Select image-based choices for each question
- Navigate forward/back through questions
- See UI aesthetics evolve based on their choices

### Technical Components
- `UnifiedConsultationModal.tsx`: Modal container
- `UnifiedConsultationFlow.tsx`: Manages consultation state and flow
- `ImageChoiceQuestion.tsx`: Presents visual choices
- `AestheticProvider.tsx`: Manages evolving UI aesthetics

### Design Principles
- Highly visual, minimal text
- Intuitive progression from broad to specific
- No explicit domain categorization
- Smooth transitions between questions
- Adaptive UI that responds to user preferences

## 3. Personalized Results Page

After completing the consultation, the user sees their personalized recommendations:

### Visual Elements
- **Personalized Header**: Greeting with aesthetic matching their preferences
- **Benefit Categories**: Sections organized by benefit rather than domain
- **Service Cards**: Visual representations of recommended services
- **Explanation Badges**: "Why We Recommended This" for each service
- **Add to Cart**: Clear buttons to select services

### Benefit Categories Examples
- **"For Your Signature Look"**: Core services that define their style
- **"For Relaxation & Renewal"**: Services focused on wellbeing
- **"For Special Occasions"**: Event-specific recommendations
- **"Quick Enhancements"**: Fast, high-impact services

### User Actions
- Browse recommendations organized by benefit
- View service details by clicking cards
- Add services to cart
- Proceed to booking

### Technical Components
- `PersonalizedResultsPage.tsx`: Main results container
- `BenefitSection.tsx`: Groups services by benefit category
- `ServiceCard.tsx`: Displays individual service with image
- `ServiceDetailModal.tsx`: Shows detailed service information
- `Cart.tsx`: Manages selected services

### Design Principles
- Benefit-focused organization rather than domain-based
- Consistent aesthetic with consultation choices
- Clear explanations for recommendations
- Easy path to booking
- Visual continuity from consultation

## 4. Booking Experience

After selecting services, the user proceeds to booking:

### Visual Elements
- **Selected Services**: Visual summary of chosen services
- **Calendar Interface**: Intuitive date/time selection
- **Complementary Suggestions**: Additional services that pair well
- **Booking Summary**: Clear overview of selections, time, and cost

### User Actions
- Select date and time for appointment
- Review service selections
- Add complementary services (optional)
- Confirm booking

### Technical Components
- `BookingPage.tsx`: Main booking interface
- `Calendar.tsx`: Date and time selection
- `ComplementaryServiceSuggestion.tsx`: Additional service recommendations
- `BookingConfirmationPage.tsx`: Confirmation and summary

### Design Principles
- Seamless continuation of personalized experience
- Clear, visual representation of services
- Simple, intuitive scheduling
- Opportunity for additional service discovery
- Celebratory confirmation experience

## 5. Booking Confirmation

After completing the booking, the user receives confirmation:

### Visual Elements
- **Confirmation Message**: Celebratory, personalized confirmation
- **Booking Details**: Visual summary of services, date, time
- **Preparation Tips**: Personalized tips based on booked services
- **Next Steps**: Clear information on what to expect

### User Actions
- Save booking to calendar (optional)
- Share booking (optional)
- Explore preparation tips
- Return to homepage or exit

### Technical Components
- `BookingConfirmationPage.tsx`: Confirmation display
- `PreparationTips.tsx`: Service-specific preparation guidance
- `ShareBooking.tsx`: Options to save/share booking

### Design Principles
- Celebratory, positive tone
- Clear confirmation of successful booking
- Helpful next steps
- Continued personalization

## Key Transitions Between Stages

### Homepage → Consultation
- Smooth modal transition
- Immediate immersion in visual choices
- No jarring domain selection

### Consultation → Results
- Seamless transition preserving aesthetic choices
- Clear indication that results are personalized
- Benefit-focused presentation rather than domain-focused

### Results → Booking
- Maintained aesthetic continuity
- Visual representation of selected services
- Intuitive progression to scheduling

### Booking → Confirmation
- Celebratory transition
- Clear confirmation of successful booking
- Helpful next steps

## Mobile Journey Considerations

### Homepage
- Simplified hero with prominent CTA
- Touch-friendly button sizing
- Minimal scrolling required

### Consultation
- Full-screen modal experience
- Swipe navigation between questions
- Larger touch targets for image selection

### Results
- Vertical scrolling through benefit categories
- Card-based layout optimized for mobile
- Bottom sheet for service details

### Booking
- Simplified calendar optimized for touch
- Progressive disclosure of options
- Fixed position booking button

## Personalization Elements

Throughout the journey, several elements are personalized based on user preferences:

1. **Visual Aesthetic**: Colors, typography, and spacing evolve based on style preferences

2. **Language & Tone**: Copy adapts to match the user's emerging style (elegant, natural, bold, etc.)

3. **Imagery**: Service images selected to match aesthetic preferences

4. **Recommendations**: Services tailored to expressed needs and preferences

5. **Explanations**: Personalized explanations of why each service was recommended

