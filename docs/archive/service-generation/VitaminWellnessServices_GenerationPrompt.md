# Vitamin Wellness Services - Generation Prompt

**Domain:** `vitamin-wellness`  
**Target:** 8-10 comprehensive wellness services with confidence scoring characteristics  
**Context:** Complete the vitamin wellness services for confidence scoring system

---

## Service Categories to Generate

### 1. Health Assessment & Consultation (3-4 services)
- **Wellness Consultation** - ✅ Partially exists in marketing content
- **Comprehensive Health Assessment** - Detailed analysis of health and wellness needs
- **Beauty Nutrition Analysis** - Focus on nutrients for hair, skin, and nails
- **Lifestyle Wellness Planning** - Holistic approach to health and beauty

### 2. Custom Supplement Programs (2-3 services)
- **Personalized Vitamin Regimen** - Custom supplement recommendations
- **Beauty Supplement Program** - Targeted nutrients for beauty goals
- **Seasonal Wellness Plan** - Adjust supplements for seasonal needs

### 3. Education & Coaching (2-3 services)
- **Nutrition Education Workshop** - Learn about vitamins and wellness
- **Supplement Science Seminar** - Understanding how supplements work
- **Wellness Coaching Session** - Ongoing support and guidance

### 4. Monitoring & Support (1-2 services)
- **Progress Tracking Consultation** - Monitor wellness improvements
- **Supplement Plan Adjustment** - Modify regimen based on results

---

## Service Template

```typescript
{
  id: 'wellness-[service-name]',
  name: 'Service Display Name',
  description: 'Focus on health optimization, beauty from within, and scientific wellness',
  price: '$XX', // Range: $35-200 based on complexity and duration
  duration: 'X minutes', // Range: 30 minutes - 2 hours
  category: 'Health Assessment & Consultation' | 'Custom Supplement Programs' | 'Education & Coaching' | 'Monitoring & Support',
  domain: 'vitamin-wellness',
  imageUrl: 'https://images.unsplash.com/[wellness-health-image]',
  featured: boolean, // true for 2-3 signature services
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Expert',
  userJourneys: ['healing', 'transformation', 'maintenance', 'learning', 'fresh-start'],
  packageCompatible: ['other-wellness-service-ids', 'medspa-service-ids'],
  confidenceFactors: {
    maintenanceLevel: 'low|moderate|high|professional',
    riskLevel: 'low|moderate|high|extreme',
    commitmentRequired: 'minimal|moderate|significant|lifestyle',
    experienceNeeded: 'none|some|experienced|expert',
    resultsPermanence: 'temporary|semi-permanent|long-lasting|permanent'
  },
  details: {
    specialist: 'Wellness Consultant Name' | 'Nutritionist Name' | 'Health Coach Name',
    process: ['Health Assessment', 'Goal Setting', 'Plan Creation', 'Education', 'Follow-up'],
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
    perfectFor: ['Target user types based on health goals and commitment level'],
    preparation: ['Health history preparation', 'Current supplement list', 'Goal clarification'],
    aftercare: ['Implementation guidance', 'Progress monitoring', 'Plan adjustments'],
    confidenceNotes: 'Why this service has these confidence characteristics'
  },
  clientStory: {
    name: 'Client Name',
    quote: 'Testimonial focusing on health improvement and beauty benefits',
    rating: 4-5,
    transformation: 'Specific health and beauty improvement description',
    userProfile: 'Type of user who succeeded with this service'
  }
}
```

---

## Confidence Scoring Guidelines

### Easy Services (High Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'low'` - Simple recommendations, easy to follow
- `riskLevel: 'low'` - Basic supplements, minimal interactions
- `commitmentRequired: 'minimal'` - One-time consultation or basic plan
- `experienceNeeded: 'none'` - Perfect for wellness beginners
- `resultsPermanence: 'temporary'` - Can easily adjust or stop

**Examples:** Basic wellness consultation, simple education, general recommendations
**Perfect For:** Wellness beginners, general health seekers, low commitment

### Moderate Services (Medium Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'moderate'` - Regular supplement routine, some monitoring
- `riskLevel: 'moderate'` - Multiple supplements, some complexity
- `commitmentRequired: 'moderate'` - Ongoing routine, periodic check-ins
- `experienceNeeded: 'some'` - Basic health awareness helpful
- `resultsPermanence: 'semi-permanent'` - Benefits with consistent use

**Examples:** Personalized regimens, beauty programs, coaching sessions
**Perfect For:** Some wellness experience, specific health goals

### Advanced Services (Lower Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'high'` - Complex regimens, careful monitoring needed
- `riskLevel: 'high'` - Advanced supplements, potential interactions
- `commitmentRequired: 'significant'` - Lifestyle changes, long-term commitment
- `experienceNeeded: 'experienced'` - Good understanding of health and supplements
- `resultsPermanence: 'long-lasting'` - Significant health improvements

**Examples:** Comprehensive programs, advanced coaching, complex regimens
**Perfect For:** Health enthusiasts, specific conditions, serious commitment

### Expert Services (Lowest Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'professional'` - Medical-grade approach, professional monitoring
- `riskLevel: 'extreme'` - High-dose supplements, medical considerations
- `commitmentRequired: 'lifestyle'` - Complete wellness lifestyle integration
- `experienceNeeded: 'expert'` - Extensive health knowledge, medical awareness
- `resultsPermanence: 'permanent'` - Long-term health transformation

**Examples:** Medical-grade programs, intensive coaching, therapeutic approaches
**Perfect For:** Serious health conditions, professional guidance comfort

---

## User Journey Mapping

### healing
Services focused on addressing health issues and deficiencies
- Comprehensive assessments, therapeutic programs, corrective approaches

### transformation
Services for significant health and beauty improvements
- Advanced programs, lifestyle changes, dramatic improvements

### maintenance
Services for ongoing health optimization and prevention
- Regular monitoring, seasonal adjustments, preventive care

### learning
Services focused on health education and empowerment
- Workshops, seminars, coaching, knowledge building

### fresh-start
Services for beginning a wellness journey or new approach
- Basic consultations, beginner programs, gentle introductions

---

## Pricing Guidelines

- **Basic Services:** $35-65 (consultations, basic education)
- **Moderate Services:** $65-120 (personalized programs, coaching)
- **Advanced Services:** $120-200 (comprehensive programs, intensive coaching)
- **Expert Services:** $200+ (medical-grade programs, professional monitoring)

## Duration Guidelines

- **Quick Services:** 30-45 minutes (basic consultation, simple education)
- **Standard Services:** 45-90 minutes (comprehensive consultation, program creation)
- **Complex Services:** 90-120 minutes (detailed assessment, advanced planning)
- **Premium Services:** 2+ hours (intensive programs, comprehensive education)

---

## Wellness-Specific Considerations

### Health Goals
- **Beauty Enhancement:** Hair, skin, nail health
- **Energy & Vitality:** Overall wellness, fatigue reduction
- **Immune Support:** Prevention, seasonal health
- **Stress Management:** Adaptogenic support, mental wellness
- **Anti-Aging:** Longevity, cellular health

### Supplement Categories
- **Basic Multivitamins:** Foundation nutrition
- **Beauty Supplements:** Biotin, collagen, antioxidants
- **Targeted Nutrients:** Specific deficiency correction
- **Herbal Supplements:** Natural wellness support
- **Advanced Formulas:** Specialized, therapeutic doses

### Safety Considerations
- **Drug Interactions:** Medication compatibility
- **Health Conditions:** Medical considerations
- **Dosage Safety:** Appropriate amounts
- **Quality Standards:** Third-party tested supplements
- **Professional Guidance:** When to consult healthcare providers

---

## Evidence-Based Approach

### Scientific Foundation
- Research-backed recommendations
- Evidence-based supplement selection
- Measurable health outcomes
- Professional standards

### Personalization Factors
- **Age & Gender:** Life stage appropriate
- **Health Status:** Current conditions and medications
- **Lifestyle:** Diet, exercise, stress levels
- **Goals:** Specific health and beauty objectives
- **Budget:** Cost-effective recommendations

---

## Success Criteria

**Complete Vitamin Wellness Catalog:**
- 8-10 services covering all major wellness service categories
- Full range of commitment levels and health goals
- Clear confidence scoring characteristics for each service
- Realistic pricing and duration estimates

**Confidence Scoring Ready:**
- Services can be matched to wellness experience levels
- `perfectFor` arrays enable health goal matching
- `confidenceFactors` support confidence calculation
- `userJourneys` enable wellness journey alignment

**Business Realistic:**
- Services reflect actual wellness consultation offerings
- Pricing aligns with health coaching industry standards
- Service descriptions are professional and trustworthy
- Confidence characteristics match wellness complexity

**Safety & Compliance:**
- All services emphasize professional guidance
- Clear disclaimers about medical consultation
- Evidence-based approach to recommendations
- Appropriate scope of practice boundaries

---

**Generate services that complete the vitamin wellness domain with proper confidence scoring characteristics for personalized health and beauty recommendations.**

