# Med Spa Services - Generation Prompt

**Domain:** `med-spa`  
**Target:** 12-15 comprehensive med spa services with confidence scoring characteristics  
**Context:** Complete the missing med spa services for confidence scoring system

---

## Service Categories to Generate

### 1. Facial Treatments (4-5 services)
- **Gold Radiance Facial** - ✅ Already exists
- **HydraFacial Treatment** - ✅ Already exists
- **Dermaplaning Facial** - ✅ Already exists
- **Anti-Aging Facial** - Focused on fine lines and firmness
- **Acne Treatment Facial** - Problem-solving for breakouts
- **Sensitive Skin Facial** - Gentle treatment for reactive skin

### 2. Hair Removal Services (3-4 services)
- **Brazilian Wax** - ✅ Already exists
- **Precision Eyebrow Threading** - ✅ Already exists
- **Full Leg Wax** - Complete leg hair removal
- **Underarm Wax** - Quick, professional hair removal
- **Laser Hair Removal Consultation** - Assessment for laser treatments

### 3. Advanced Treatments (3-4 services)
- **LED Light Therapy** - ✅ Already exists
- **Chemical Peel** - Skin resurfacing treatment
- **Microdermabrasion** - Exfoliation and skin renewal
- **Oxygen Facial** - Hydrating, rejuvenating treatment

### 4. Wellness & Consultation (2-3 services)
- **Skin Analysis Consultation** - Professional skin assessment
- **Treatment Planning Session** - Customized skincare regimen
- **Wellness Consultation** - Holistic approach to skin health

---

## Service Template

```typescript
{
  id: 'medspa-[service-name]',
  name: 'Service Display Name',
  description: 'Focus on skin health, wellness, and professional results',
  price: '$XX', // Range: $20-200 based on complexity and technology
  duration: 'X minutes', // Range: 20 minutes - 2 hours
  category: 'Facial Treatments' | 'Hair Removal Services' | 'Advanced Treatments' | 'Wellness & Consultation',
  domain: 'med-spa',
  imageUrl: 'https://images.unsplash.com/[spa-treatment-image]',
  featured: boolean, // true for 2-3 signature services
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Expert',
  userJourneys: ['self-care', 'healing', 'transformation', 'maintenance', 'quick-fix'],
  packageCompatible: ['other-medspa-service-ids', 'wellness-service-ids'],
  confidenceFactors: {
    maintenanceLevel: 'low|moderate|high|professional',
    riskLevel: 'low|moderate|high|extreme',
    commitmentRequired: 'minimal|moderate|significant|lifestyle',
    experienceNeeded: 'none|some|experienced|expert',
    resultsPermanence: 'temporary|semi-permanent|long-lasting|permanent'
  },
  details: {
    specialist: 'Licensed Esthetician Name' | 'Wellness Specialist Name',
    process: ['Consultation', 'Preparation', 'Treatment', 'Aftercare', 'Follow-up'],
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
    perfectFor: ['Target user types based on skin concerns and experience'],
    preparation: ['Pre-treatment instructions', 'What to avoid', 'Timing considerations'],
    aftercare: ['Post-treatment care', 'Expected results timeline', 'Follow-up recommendations'],
    confidenceNotes: 'Why this service has these confidence characteristics'
  },
  clientStory: {
    name: 'Client Name',
    quote: 'Testimonial focusing on skin improvement and wellness results',
    rating: 4-5,
    transformation: 'Specific skin improvement description',
    userProfile: 'Type of user who succeeded with this service'
  }
}
```

---

## Confidence Scoring Guidelines

### Easy Services (High Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'low'` - Minimal ongoing care needed
- `riskLevel: 'low'` - Gentle, non-invasive treatments
- `commitmentRequired: 'minimal'` - One-time or occasional service
- `experienceNeeded: 'none'` - Suitable for spa beginners
- `resultsPermanence: 'temporary'` - Effects last days to weeks

**Examples:** Basic facials, consultations, gentle treatments
**Perfect For:** Spa newcomers, sensitive skin, self-care seekers

### Moderate Services (Medium Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'moderate'` - Some aftercare and follow-up
- `riskLevel: 'moderate'` - Professional treatment with some sensitivity
- `commitmentRequired: 'moderate'` - Regular treatments for best results
- `experienceNeeded: 'some'` - Basic understanding of skincare helpful
- `resultsPermanence: 'semi-permanent'` - Effects last weeks to months

**Examples:** Regular facials, basic hair removal, LED therapy
**Perfect For:** Regular spa clients, established skincare routine

### Advanced Services (Lower Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'high'` - Specific aftercare requirements
- `riskLevel: 'high'` - More intensive treatments, potential side effects
- `commitmentRequired: 'significant'` - Series of treatments, lifestyle adjustments
- `experienceNeeded: 'experienced'` - Understanding of advanced skincare
- `resultsPermanence: 'long-lasting'` - Effects last months

**Examples:** Chemical peels, microdermabrasion, intensive treatments
**Perfect For:** Experienced spa clients, specific skin concerns

### Expert Services (Lowest Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'professional'` - Ongoing professional monitoring
- `riskLevel: 'extreme'` - Medical-grade treatments, significant risks
- `commitmentRequired: 'lifestyle'` - Long-term treatment plans
- `experienceNeeded: 'expert'` - Thorough understanding of risks and benefits
- `resultsPermanence: 'permanent'` - Lasting changes to skin

**Examples:** Laser consultations, intensive treatment programs
**Perfect For:** Serious skin concerns, professional guidance comfort

---

## User Journey Mapping

### self-care
Services focused on relaxation, pampering, and wellness
- Relaxing facials, gentle treatments, wellness consultations

### healing
Services for problem-solving and skin repair
- Acne treatments, sensitive skin care, corrective services

### transformation
Services for significant skin improvement and change
- Advanced treatments, intensive programs, dramatic improvements

### maintenance
Services for ongoing skin health and upkeep
- Regular facials, hair removal, preventive treatments

### quick-fix
Services for immediate results and fast solutions
- Express treatments, quick procedures, immediate improvements

---

## Pricing Guidelines

- **Basic Services:** $20-60 (consultations, basic treatments)
- **Moderate Services:** $60-120 (standard facials, hair removal)
- **Advanced Services:** $120-200 (chemical peels, advanced facials)
- **Expert Services:** $200+ (laser consultations, intensive programs)

## Duration Guidelines

- **Quick Services:** 20-45 minutes (consultations, express treatments)
- **Standard Services:** 45-90 minutes (most facials, hair removal)
- **Complex Services:** 90-120 minutes (advanced treatments, combinations)
- **Premium Services:** 2+ hours (intensive treatments, full programs)

---

## Treatment-Specific Considerations

### Facial Treatments
- Focus on skin health and improvement
- Professional-grade products and techniques
- Customizable based on skin type and concerns

### Hair Removal
- Professional technique and hygiene
- Comfort and efficiency focus
- Appropriate for different body areas and skin types

### Advanced Treatments
- Medical-grade equipment and expertise
- Significant results with proper aftercare
- May require series of treatments

### Wellness & Consultation
- Educational and planning focused
- Personalized approach to skin health
- Foundation for other treatments

---

## Skin Type & Concern Matching

### All Skin Types
- Basic facials, consultations, gentle treatments
- Focus on universal skin health principles

### Specific Concerns
- **Acne:** Targeted treatments, deep cleansing, oil control
- **Aging:** Anti-aging facials, advanced treatments, prevention
- **Sensitivity:** Gentle approaches, hypoallergenic products
- **Pigmentation:** Brightening treatments, even tone focus
- **Dehydration:** Hydrating treatments, moisture barrier repair

---

## Success Criteria

**Complete Med Spa Catalog:**
- 12-15 services covering all major med spa service categories
- Full range of treatment intensities and skin concerns
- Clear confidence scoring characteristics for each service
- Realistic pricing and duration estimates

**Confidence Scoring Ready:**
- Services can be matched to user comfort with spa treatments
- `perfectFor` arrays enable skin concern matching
- `confidenceFactors` support confidence calculation
- `userJourneys` enable wellness goal alignment

**Business Realistic:**
- Services reflect actual med spa offerings
- Pricing aligns with wellness industry standards
- Service descriptions are professional and appealing
- Confidence characteristics match real treatment complexity

---

**Generate services that complete the med spa domain with proper confidence scoring characteristics for personalized wellness recommendations.**

