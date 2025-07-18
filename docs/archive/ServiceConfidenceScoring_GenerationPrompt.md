# Service Confidence Scoring - Service Generation Prompt

**Purpose:** Generate complete service definitions with confidence scoring characteristics  
**Context:** Beauty consultation platform with service confidence scoring system  
**Target:** Complete the missing aspirational services in `unifiedServicesData.ts`

---

## Core Insight

The existing `UnifiedService` interface already attempts service confidence scoring through:
- `difficulty` levels (Easy/Moderate/Advanced) = service complexity scoring
- `userJourneys` arrays = service appropriateness for different user contexts
- `details.perfectFor` arrays = service suitability characteristics
- `packageCompatible` arrays = service combination scoring

**The goal is to complete the missing services with proper confidence scoring characteristics.**

---

## Enhanced Service Interface

Based on the realization that confidence scoring is of services (not users), enhance the existing interface:

```typescript
export interface UnifiedService {
  // Existing fields
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa' | 'perfume-boutique' | 'vitamin-wellness';
  imageUrl: string;
  featured?: boolean;
  
  // Service Confidence Scoring Fields
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Expert';
  userJourneys: string[]; // Which user contexts this service fits
  packageCompatible?: string[];
  
  // Enhanced Confidence Characteristics
  confidenceFactors: {
    maintenanceLevel: 'low' | 'moderate' | 'high' | 'professional';
    riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
    commitmentRequired: 'minimal' | 'moderate' | 'significant' | 'lifestyle';
    experienceNeeded: 'none' | 'some' | 'experienced' | 'expert';
    resultsPermanence: 'temporary' | 'semi-permanent' | 'long-lasting' | 'permanent';
  };
  
  // Existing detailed fields
  details?: {
    specialist?: string;
    process?: string[];
    benefits?: string[];
    perfectFor?: string[]; // This becomes key for confidence scoring
    preparation?: string[];
    aftercare?: string[];
    confidenceNotes?: string; // Why this service has its confidence characteristics
  };
  
  clientStory?: {
    name: string;
    quote: string;
    rating: number;
    transformation?: string;
    userProfile?: string; // What type of user had success with this service
  };
}
```

---

## Service Generation Requirements

### For Each Service Domain, Generate:

**Hair Salon Services (Target: 12-15 services)**
- Cuts & Styling: Basic cuts, precision cuts, specialty cuts, styling services
- Color Services: Full color, highlights, balayage, color correction, root touch-ups
- Treatments: Deep conditioning, keratin, protein treatments, scalp treatments
- Extensions & Enhancements: Clip-ins, tape-ins, sew-ins, hair pieces

**Makeup Studio Services (Target: 12-15 services)**  
- Daily Makeup: Natural, professional, enhanced looks
- Special Occasion: Party, formal, prom, date night
- Bridal Services: Trial, wedding day, bridal party
- Lessons & Consultations: Basic skills, advanced techniques, color matching

**Med Spa Services (Target: 12-15 services)**
- Facial Treatments: Basic, deep cleansing, anti-aging, acne treatments
- Hair Removal: Waxing (various areas), threading, laser consultation
- Advanced Treatments: Chemical peels, microdermabrasion, LED therapy
- Wellness Services: Consultations, skin analysis, treatment planning

**Perfume Boutique Services (Target: 8-10 services)**
- Consultations: Scent profiling, fragrance matching, lifestyle consultation
- Custom Services: Blending, personalization, signature scent creation
- Education: Fragrance families, application techniques, layering
- Events: Fragrance parties, group consultations, gift consultations

**Vitamin Wellness Services (Target: 8-10 services)**
- Consultations: Health assessment, goal setting, lifestyle analysis
- Custom Plans: Personalized regimens, supplement selection, timing optimization
- Education: Nutrition basics, supplement science, wellness coaching
- Monitoring: Progress tracking, plan adjustments, ongoing support

### Service Confidence Scoring Guidelines

**Easy Services (High Base Confidence):**
- Low maintenance, low risk, suitable for beginners
- Examples: Basic haircuts, natural makeup, basic facials
- `confidenceFactors`: maintenanceLevel: 'low', riskLevel: 'low', commitmentRequired: 'minimal'

**Moderate Services (Medium Base Confidence):**
- Some maintenance, moderate risk, some experience helpful
- Examples: Color touch-ups, special occasion makeup, regular facials
- `confidenceFactors`: maintenanceLevel: 'moderate', riskLevel: 'moderate', commitmentRequired: 'moderate'

**Advanced Services (Lower Base Confidence):**
- High maintenance, higher risk, experience recommended
- Examples: Full color changes, dramatic makeup, advanced treatments
- `confidenceFactors`: maintenanceLevel: 'high', riskLevel: 'high', commitmentRequired: 'significant'

**Expert Services (Lowest Base Confidence):**
- Professional maintenance, high risk, expert knowledge needed
- Examples: Extensions, permanent makeup, intensive treatments
- `confidenceFactors`: maintenanceLevel: 'professional', riskLevel: 'extreme', commitmentRequired: 'lifestyle'

### User Journey Mapping

**Map each service to appropriate user journeys:**
- `fresh-start`: New looks, life changes, first-time services
- `maintenance`: Regular upkeep, touch-ups, ongoing care
- `special-occasion`: Events, celebrations, important dates
- `transformation`: Dramatic changes, major makeovers
- `confidence-boost`: Self-care, feeling better, personal enhancement
- `learning`: Skill building, education, technique development
- `healing`: Recovery, problem-solving, corrective services
- `exploration`: Trying new things, discovering preferences

### Perfect For Characteristics

**Each service should specify who it's perfect for:**
- Experience level: "First-time clients", "Experienced beauty enthusiasts", "Professionals"
- Lifestyle: "Busy professionals", "Stay-at-home parents", "Students", "Retirees"
- Commitment: "Low-maintenance seekers", "High-maintenance lovers", "Occasional indulgers"
- Goals: "Natural enhancement", "Dramatic transformation", "Problem solving", "Skill building"

---

## Generation Prompt Template

For each service, generate:

```typescript
{
  id: 'domain-service-name',
  name: 'Service Display Name',
  description: 'Clear description focusing on benefits and experience',
  price: '$XX', // Realistic pricing for service level
  duration: 'X minutes/hours',
  category: 'Service Category',
  domain: 'service-domain',
  imageUrl: 'https://images.unsplash.com/[appropriate-image]',
  featured: boolean, // true for signature/popular services
  difficulty: 'Easy|Moderate|Advanced|Expert',
  userJourneys: ['journey1', 'journey2', 'journey3'],
  packageCompatible: ['compatible-service-ids'],
  confidenceFactors: {
    maintenanceLevel: 'low|moderate|high|professional',
    riskLevel: 'low|moderate|high|extreme',
    commitmentRequired: 'minimal|moderate|significant|lifestyle',
    experienceNeeded: 'none|some|experienced|expert',
    resultsPermanence: 'temporary|semi-permanent|long-lasting|permanent'
  },
  details: {
    specialist: 'Specialist Name/Title',
    process: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
    perfectFor: ['User type 1', 'User type 2', 'User type 3'],
    preparation: ['Prep step 1', 'Prep step 2'],
    aftercare: ['Care step 1', 'Care step 2'],
    confidenceNotes: 'Explanation of why this service has these confidence characteristics'
  },
  clientStory: {
    name: 'Client Name',
    quote: 'Realistic testimonial focusing on experience and results',
    rating: 4-5,
    transformation: 'Before/after description',
    userProfile: 'Type of user who had success'
  }
}
```

---

## Success Criteria

**Complete Service Catalog:**
- 60-75 total services across 5 domains
- Each service has proper confidence scoring characteristics
- Services span full range of difficulty/complexity levels
- Clear mapping to user journeys and contexts

**Confidence Scoring Ready:**
- Each service can be scored for different user profiles
- `confidenceFactors` enable algorithmic confidence calculation
- `perfectFor` arrays enable user matching
- `userJourneys` enable context-appropriate recommendations

**Business Value:**
- Services represent realistic beauty industry offerings
- Pricing and duration are market-appropriate
- Service descriptions are compelling and clear
- Confidence characteristics enable personalized recommendations

---

**This prompt will generate the missing aspirational services needed to complete the confidence scoring system, with each service properly characterized for algorithmic confidence calculation.**

