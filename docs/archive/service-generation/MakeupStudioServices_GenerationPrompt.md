# Makeup Studio Services - Generation Prompt

**Domain:** `makeup-studio`  
**Target:** 12-15 comprehensive makeup services with confidence scoring characteristics  
**Context:** Complete the missing makeup studio services for confidence scoring system

---

## Service Categories to Generate

### 1. Daily & Professional Makeup (3-4 services)
- **Natural Enhancement** - ✅ Already exists
- **Professional Look** - Polished makeup for work/business
- **Everyday Glam** - Enhanced daily makeup with more impact
- **Quick Touch-Up** - Express makeup for busy schedules

### 2. Special Occasion Makeup (3-4 services)
- **Glam Makeup** - ✅ Already exists
- **Date Night** - Romantic, sultry evening looks
- **Party Ready** - Fun, bold looks for celebrations
- **Photo Shoot** - Camera-ready makeup for portraits/events

### 3. Bridal & Wedding (2-3 services)
- **Bridal Makeup** - ✅ Already exists
- **Bridal Trial** - Practice session before wedding day
- **Bridal Party** - Coordinated looks for wedding party

### 4. Learning & Consultation (3-4 services)
- **Personal Makeup Lesson** - ✅ Already exists
- **Color Consultation** - Find your perfect shades and undertones
- **Technique Workshop** - Learn specific skills (contouring, eyes, etc.)
- **Product Consultation** - Personalized product recommendations

### 5. Enhancement Services (2-3 services)
- **Lash Extensions** - ✅ Already exists
- **Eyebrow Styling** - ✅ Already exists
- **Lash Lift & Tint** - Natural lash enhancement

---

## Service Template

```typescript
{
  id: 'makeup-[service-name]',
  name: 'Service Display Name',
  description: 'Focus on confidence, beauty enhancement, and occasion appropriateness',
  price: '$XX', // Range: $35-150 based on complexity and duration
  duration: 'X minutes', // Range: 30 minutes - 2 hours
  category: 'Daily & Professional' | 'Special Occasion' | 'Bridal & Wedding' | 'Learning & Consultation' | 'Enhancement Services',
  domain: 'makeup-studio',
  imageUrl: 'https://images.unsplash.com/[makeup-related-image]',
  featured: boolean, // true for 2-3 signature services
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Expert',
  userJourneys: ['confidence-boost', 'special-occasion', 'learning', 'transformation', 'fresh-start'],
  packageCompatible: ['other-makeup-service-ids', 'hair-service-ids'],
  confidenceFactors: {
    maintenanceLevel: 'low|moderate|high|professional',
    riskLevel: 'low|moderate|high|extreme',
    commitmentRequired: 'minimal|moderate|significant|lifestyle',
    experienceNeeded: 'none|some|experienced|expert',
    resultsPermanence: 'temporary|semi-permanent|long-lasting|permanent'
  },
  details: {
    specialist: 'Makeup Artist Name',
    process: ['Consultation', 'Skin Prep', 'Application', 'Final Touches', 'Education'],
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
    perfectFor: ['Target user types based on experience and occasion needs'],
    preparation: ['Skin care prep', 'What to bring', 'Timing considerations'],
    aftercare: ['Touch-up tips', 'Removal instructions', 'Product care'],
    confidenceNotes: 'Why this service has these confidence characteristics'
  },
  clientStory: {
    name: 'Client Name',
    quote: 'Testimonial focusing on confidence boost and occasion success',
    rating: 4-5,
    transformation: 'Specific look transformation description',
    userProfile: 'Type of user who succeeded with this service'
  }
}
```

---

## Confidence Scoring Guidelines

### Easy Services (High Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'low'` - Makeup washes off, minimal upkeep
- `riskLevel: 'low'` - Temporary, easily correctable
- `commitmentRequired: 'minimal'` - One-time service
- `experienceNeeded: 'none'` - Suitable for beginners
- `resultsPermanence: 'temporary'` - Lasts hours to a day

**Examples:** Natural enhancement, basic lessons, everyday looks
**Perfect For:** Makeup beginners, busy professionals, natural beauty seekers

### Moderate Services (Medium Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'moderate'` - Some touch-up knowledge needed
- `riskLevel: 'moderate'` - More complex application
- `commitmentRequired: 'moderate'` - Some practice or follow-up needed
- `experienceNeeded: 'some'` - Basic makeup knowledge helpful
- `resultsPermanence: 'temporary'` - Event-duration wear

**Examples:** Professional looks, party makeup, color consultations
**Perfect For:** Some makeup experience, special occasion needs

### Advanced Services (Lower Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'high'` - Complex techniques, skill needed
- `riskLevel: 'high'` - Bold looks, potential for mistakes
- `commitmentRequired: 'significant'` - Practice and skill development
- `experienceNeeded: 'experienced'` - Comfortable with makeup
- `resultsPermanence: 'temporary'` - But requires skill to recreate

**Examples:** Dramatic glam, advanced techniques, photo shoot makeup
**Perfect For:** Makeup enthusiasts, confident users, special events

### Expert Services (Lowest Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'professional'` - Ongoing professional maintenance
- `riskLevel: 'extreme'` - Semi-permanent, near eye area
- `commitmentRequired: 'lifestyle'` - Ongoing care and appointments
- `experienceNeeded: 'expert'` - Understanding of risks and care
- `resultsPermanence: 'semi-permanent'` - Weeks to months

**Examples:** Lash extensions, permanent makeup consultations
**Perfect For:** High-maintenance comfort, professional results seekers

---

## User Journey Mapping

### confidence-boost
Services that make users feel more beautiful and confident
- Natural enhancement, professional looks, color consultations

### special-occasion
Services for events, dates, celebrations
- Glam makeup, bridal services, party looks, photo shoots

### learning
Services focused on skill building and education
- Makeup lessons, technique workshops, product consultations

### transformation
Services for dramatic changes and new looks
- Bold makeup styles, complete makeovers, advanced techniques

### fresh-start
Services for trying makeup for the first time or new approaches
- Basic lessons, natural looks, gentle introductions

---

## Pricing Guidelines

- **Basic Services:** $35-65 (natural looks, quick services)
- **Moderate Services:** $65-95 (special occasion, lessons)
- **Advanced Services:** $95-150 (bridal, advanced techniques, photo shoots)
- **Expert Services:** $150+ (lash extensions, intensive workshops)

## Duration Guidelines

- **Quick Services:** 30-45 minutes (touch-ups, natural looks)
- **Standard Services:** 45-75 minutes (most makeup applications)
- **Complex Services:** 75-120 minutes (bridal, lessons, advanced looks)
- **Premium Services:** 2+ hours (intensive workshops, multiple looks)

---

## Occasion-Specific Considerations

### Daily/Professional
- Natural, polished, appropriate for workplace
- Long-wearing, minimal touch-up needed
- Enhances features without being dramatic

### Special Occasion
- More dramatic, photo-friendly
- Longer wear time for events
- Complements outfit and venue

### Bridal
- Photograph beautifully, last all day
- Coordinate with wedding style and dress
- Stress-resistant, emotion-proof

### Learning
- Educational value, skill building
- Take-home knowledge and techniques
- Confidence building for self-application

---

## Success Criteria

**Complete Makeup Studio Catalog:**
- 12-15 services covering all major makeup service categories
- Full range of difficulty levels and occasion types
- Clear confidence scoring characteristics for each service
- Realistic pricing and duration estimates

**Confidence Scoring Ready:**
- Services can be matched to user experience levels
- `perfectFor` arrays enable precise occasion matching
- `confidenceFactors` support confidence calculation
- `userJourneys` enable context-appropriate recommendations

**Business Realistic:**
- Services reflect actual makeup studio offerings
- Pricing aligns with beauty industry standards
- Service descriptions are appealing and accurate
- Confidence characteristics match real service complexity

---

**Generate services that complete the makeup studio domain with proper confidence scoring characteristics for personalized recommendations.**

