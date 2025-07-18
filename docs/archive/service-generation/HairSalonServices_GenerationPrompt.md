# Hair Salon Services - Generation Prompt

**Domain:** `hair-salon`  
**Target:** 12-15 comprehensive hair services with confidence scoring characteristics  
**Context:** Complete the missing hair salon services for confidence scoring system

---

## Service Categories to Generate

### 1. Cuts & Styling (4-5 services)
- **Basic Cut** - Simple, low-maintenance cuts
- **Precision Cut** - ✅ Already exists
- **Specialty Cut** - Trendy, complex cuts (pixie, asymmetrical, etc.)
- **Styling Service** - Blowouts, updos, special occasion styling
- **Consultation Cut** - Cut with detailed consultation and styling lesson

### 2. Color Services (4-5 services)
- **Full Color Service** - ✅ Already exists
- **Balayage Highlights** - ✅ Already exists  
- **Root Touch-Up** - ✅ Already exists
- **Color Correction** - Fix previous color mistakes
- **Fashion Color** - Vivid, temporary colors (pink, blue, etc.)

### 3. Treatments & Care (2-3 services)
- **Deep Conditioning Treatment** - Moisture and repair
- **Keratin Treatment** - Smoothing and frizz control
- **Scalp Treatment** - Health and growth focused

### 4. Extensions & Enhancements (2-3 services)
- **Hair Extensions** - ✅ Already exists
- **Clip-In Extensions** - Temporary length/volume
- **Hair Pieces** - Bangs, highlights, accent pieces

---

## Service Template

```typescript
{
  id: 'hair-[service-name]',
  name: 'Service Display Name',
  description: 'Focus on transformation and lifestyle benefits',
  price: '$XX', // Range: $25-200 based on complexity
  duration: 'X minutes', // Range: 30 minutes - 4 hours
  category: 'Cuts & Styling' | 'Color Services' | 'Treatments & Care' | 'Extensions & Enhancements',
  domain: 'hair-salon',
  imageUrl: 'https://images.unsplash.com/[hair-related-image]',
  featured: boolean, // true for 2-3 signature services
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Expert',
  userJourneys: ['fresh-start', 'maintenance', 'transformation', 'special-occasion', 'confidence-boost'],
  packageCompatible: ['other-hair-service-ids'],
  confidenceFactors: {
    maintenanceLevel: 'low|moderate|high|professional',
    riskLevel: 'low|moderate|high|extreme',
    commitmentRequired: 'minimal|moderate|significant|lifestyle',
    experienceNeeded: 'none|some|experienced|expert',
    resultsPermanence: 'temporary|semi-permanent|long-lasting|permanent'
  },
  details: {
    specialist: 'Hair Stylist Name',
    process: ['Consultation', 'Preparation', 'Service', 'Styling', 'Education'],
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'],
    perfectFor: ['Target user types based on lifestyle and experience'],
    preparation: ['What client should do before appointment'],
    aftercare: ['How to maintain results at home'],
    confidenceNotes: 'Why this service has these confidence characteristics'
  },
  clientStory: {
    name: 'Client Name',
    quote: 'Realistic testimonial about experience and results',
    rating: 4-5,
    transformation: 'Specific before/after description',
    userProfile: 'Type of user who succeeded with this service'
  }
}
```

---

## Confidence Scoring Guidelines

### Easy Services (High Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'low'`
- `riskLevel: 'low'` 
- `commitmentRequired: 'minimal'`
- `experienceNeeded: 'none'`
- `resultsPermanence: 'temporary' | 'semi-permanent'`

**Examples:** Basic cuts, temporary styling, clip-in extensions
**Perfect For:** First-time clients, busy professionals, low-maintenance seekers

### Moderate Services (Medium Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'moderate'`
- `riskLevel: 'moderate'`
- `commitmentRequired: 'moderate'`
- `experienceNeeded: 'some'`
- `resultsPermanence: 'semi-permanent' | 'long-lasting'`

**Examples:** Root touch-ups, basic treatments, precision cuts
**Perfect For:** Regular salon clients, moderate maintenance comfort

### Advanced Services (Lower Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'high'`
- `riskLevel: 'high'`
- `commitmentRequired: 'significant'`
- `experienceNeeded: 'experienced'`
- `resultsPermanence: 'long-lasting' | 'permanent'`

**Examples:** Full color changes, balayage, keratin treatments
**Perfect For:** Experienced clients, high-maintenance comfort, transformation seekers

### Expert Services (Lowest Base Confidence)
**Characteristics:**
- `maintenanceLevel: 'professional'`
- `riskLevel: 'extreme'`
- `commitmentRequired: 'lifestyle'`
- `experienceNeeded: 'expert'`
- `resultsPermanence: 'permanent'`

**Examples:** Extensions, major color corrections, complex cuts
**Perfect For:** Hair enthusiasts, professional maintenance commitment, expert knowledge

---

## User Journey Mapping

### fresh-start
Services for new looks, life changes, first salon experiences
- Basic cuts, consultations, gentle color changes

### maintenance  
Services for regular upkeep and touch-ups
- Root touch-ups, trims, treatments, simple styling

### transformation
Services for dramatic changes and makeovers
- Major cuts, full color changes, extensions, corrective services

### special-occasion
Services for events and celebrations
- Styling, temporary enhancements, special cuts

### confidence-boost
Services for feeling better and self-care
- Treatments, gentle enhancements, consultation services

---

## Pricing Guidelines

- **Basic Services:** $25-60 (cuts, simple styling)
- **Moderate Services:** $60-120 (color touch-ups, treatments)
- **Advanced Services:** $120-200 (full color, balayage, extensions)
- **Expert Services:** $200+ (major corrections, premium extensions)

## Duration Guidelines

- **Quick Services:** 30-60 minutes (touch-ups, simple cuts)
- **Standard Services:** 1-2 hours (most cuts, basic color)
- **Complex Services:** 2-3 hours (full color, treatments)
- **Premium Services:** 3-4 hours (extensions, major transformations)

---

## Success Criteria

**Complete Hair Salon Catalog:**
- 12-15 services covering all major hair service categories
- Full range of difficulty levels (Easy to Expert)
- Clear confidence scoring characteristics for each service
- Realistic pricing and duration estimates

**Confidence Scoring Ready:**
- Each service can be algorithmically scored for user appropriateness
- `perfectFor` arrays enable precise user matching
- `confidenceFactors` support mathematical confidence calculation
- `userJourneys` enable context-appropriate recommendations

**Business Realistic:**
- Services reflect actual hair salon offerings
- Pricing aligns with market standards
- Service descriptions are compelling and accurate
- Confidence characteristics match real service complexity

---

**Generate services that complete the hair salon domain with proper confidence scoring characteristics for personalized recommendations.**

