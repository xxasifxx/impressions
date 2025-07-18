# Perfume Boutique Services - Generation Prompt

**Domain:** `perfume-boutique`  
**Target:** 8-10 comprehensive fragrance services with confidence scoring characteristics  
**Context:** Complete the perfume boutique services for confidence scoring system

---

## Service Categories to Generate

### 1. Fragrance Consultation (3-4 services)
- **Scent Consultation** - ✅ Partially exists in marketing content
- **Fragrance Profiling** - Detailed analysis of scent preferences
- **Lifestyle Fragrance Matching** - Scents for different occasions and seasons
- **Signature Scent Discovery** - Find your personal fragrance identity

### 2. Custom Blending (2-3 services)
- **Custom Fragrance Creation** - Bespoke scent blending
- **Scent Layering Workshop** - Learn to combine fragrances
- **Fragrance Modification** - Adjust existing scents to preferences

### 3. Education & Experience (2-3 services)
- **Fragrance Families Workshop** - Learn about scent categories
- **Perfume Application Masterclass** - Proper application techniques
- **Fragrance History & Culture** - Educational experience about perfumery

### 4. Special Services (1-2 services)
- **Group Fragrance Party** - Social fragrance discovery experience
- **Gift Fragrance Consultation** - Help choosing scents for others

---

## Service Template

```typescript
{
  id: 'perfume-[service-name]',
  name: 'Service Display Name',
  description: 'Focus on scent discovery, personal expression, and fragrance expertise',
  price: '$XX', // Range: $25-150 based on complexity and customization
  duration: 'X minutes', // Range: 30 minutes - 2 hours
  category: 'Fragrance Consultation' | 'Custom Blending' | 'Education & Experience' | 'Special Services',
  domain: 'perfume-boutique',
  imageUrl: 'https://images.unsplash.com/[perfume-fragrance-image]',
  featured: boolean, // true for 2-3 signature services
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Expert',
  userJourneys: ['exploration', 'fresh-start', 'special-occasion', 'learning', 'confidence-boost'],
  packageCompatible: ['other-perfume-service-ids', 'makeup-service-ids'],
  confidenceFactors: {
    maintenanceLevel: 'low|moderate|high|professional',
    riskLevel: 'low|moderate|high|extreme',
    commitmentRequired: 'minimal|moderate|significant|lifestyle',
    experienceNeeded: 'none|some|experienced|expert',
    resultsPermanence: 'temporary|semi-permanent|long-lasting|permanent'
  },
  details: {
    specialist: 'Fragrance Consultant Name' | 'Perfume Expert Name',
    process: ['Scent Assessment', 'Preference Analysis', 'Testing', 'Selection', 'Education'],
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
    perfectFor: ['Target user types based on fragrance experience and goals'],
    preparation: ['What to avoid before appointment', 'Timing considerations'],
    aftercare: ['How to test new fragrances', 'Application tips', 'Storage advice'],
    confidenceNotes: 'Why this service has these confidence characteristics'
  },
  clientStory: {
    name: 'Client Name',
    quote: 'Testimonial focusing on scent discovery and personal expression',
    rating: 4-5,
    transformation: 'Fragrance journey and discovery description',
    userProfile: 'Type of user who succeeded with this service'
  }
}
```

---

## Confidence Scoring Guidelines

### Easy Services (High Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'low'` - Simple scent selection, no ongoing commitment
- `riskLevel: 'low'` - Safe, guided fragrance exploration
- `commitmentRequired: 'minimal'` - One-time consultation or experience
- `experienceNeeded: 'none'` - Perfect for fragrance beginners
- `resultsPermanence: 'temporary'` - Can change fragrance choices easily

**Examples:** Basic scent consultation, fragrance education, simple matching
**Perfect For:** Fragrance beginners, gift buyers, casual scent users

### Moderate Services (Medium Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'moderate'` - Some learning and practice involved
- `riskLevel: 'moderate'` - More complex scent combinations
- `commitmentRequired: 'moderate'` - Some investment in learning or products
- `experienceNeeded: 'some'` - Basic fragrance knowledge helpful
- `resultsPermanence: 'semi-permanent'` - Developing scent preferences

**Examples:** Lifestyle matching, scent layering, fragrance workshops
**Perfect For:** Some fragrance experience, interested in learning more

### Advanced Services (Lower Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'high'` - Complex scent understanding required
- `riskLevel: 'high'` - Custom blending, significant investment
- `commitmentRequired: 'significant'` - Time and financial investment
- `experienceNeeded: 'experienced'` - Good understanding of fragrances
- `resultsPermanence: 'long-lasting'` - Custom scents, developed expertise

**Examples:** Custom fragrance creation, advanced blending, signature scents
**Perfect For:** Fragrance enthusiasts, unique scent seekers

### Expert Services (Lowest Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'professional'` - Deep fragrance expertise
- `riskLevel: 'extreme'` - High investment, very personal results
- `commitmentRequired: 'lifestyle'` - Fragrance becomes part of identity
- `experienceNeeded: 'expert'` - Extensive fragrance knowledge
- `resultsPermanence: 'permanent'` - Signature scent, long-term commitment

**Examples:** Bespoke fragrance creation, professional consultation
**Perfect For:** Fragrance connoisseurs, luxury seekers, unique identity

---

## User Journey Mapping

### exploration
Services for discovering new scents and fragrance families
- Scent consultations, fragrance education, family workshops

### fresh-start
Services for finding a new signature scent or fragrance approach
- Signature scent discovery, lifestyle matching, personal profiling

### special-occasion
Services for event-specific or seasonal fragrances
- Occasion-based matching, seasonal scents, special event consultation

### learning
Services focused on fragrance education and skill building
- Workshops, masterclasses, application techniques, history

### confidence-boost
Services that help express personality through scent
- Personal scent discovery, confidence-building consultation

---

## Pricing Guidelines

- **Basic Services:** $25-50 (consultations, basic education)
- **Moderate Services:** $50-85 (workshops, lifestyle matching)
- **Advanced Services:** $85-150 (custom blending, signature scents)
- **Expert Services:** $150+ (bespoke creation, intensive consultation)

## Duration Guidelines

- **Quick Services:** 30-45 minutes (basic consultation, simple matching)
- **Standard Services:** 45-75 minutes (workshops, detailed consultation)
- **Complex Services:** 75-120 minutes (custom blending, signature discovery)
- **Premium Services:** 2+ hours (bespoke creation, intensive education)

---

## Fragrance-Specific Considerations

### Scent Sensitivity
- Account for allergies and sensitivities
- Offer gentle, hypoallergenic options
- Provide testing protocols

### Personal Style Matching
- **Classic:** Timeless, elegant fragrances
- **Modern:** Contemporary, unique scents
- **Bold:** Strong, statement fragrances
- **Subtle:** Light, everyday scents
- **Seasonal:** Weather and occasion appropriate

### Lifestyle Integration
- **Professional:** Workplace-appropriate scents
- **Casual:** Everyday, comfortable fragrances
- **Evening:** Special occasion, romantic scents
- **Active:** Light, fresh, non-overwhelming options

---

## Fragrance Family Education

### Fresh
- Citrus, green, aquatic scents
- Light, energizing, daytime appropriate

### Floral
- Single florals, bouquets, romantic scents
- Feminine, classic, versatile

### Oriental
- Spicy, warm, exotic scents
- Evening, special occasion, bold

### Woody
- Sandalwood, cedar, earthy scents
- Unisex, grounding, sophisticated

---

## Success Criteria

**Complete Perfume Boutique Catalog:**
- 8-10 services covering all major fragrance service categories
- Full range of expertise levels and fragrance goals
- Clear confidence scoring characteristics for each service
- Realistic pricing and duration estimates

**Confidence Scoring Ready:**
- Services can be matched to fragrance experience levels
- `perfectFor` arrays enable lifestyle and preference matching
- `confidenceFactors` support confidence calculation
- `userJourneys` enable scent goal alignment

**Business Realistic:**
- Services reflect actual perfume boutique offerings
- Pricing aligns with fragrance industry standards
- Service descriptions are appealing and educational
- Confidence characteristics match fragrance complexity

---

**Generate services that complete the perfume boutique domain with proper confidence scoring characteristics for personalized fragrance recommendations.**

