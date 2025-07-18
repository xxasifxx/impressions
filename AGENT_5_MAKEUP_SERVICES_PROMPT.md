# Agent 5: Makeup Artistry Specialist - Complete Assignment
## Your Mission: Tag All 12 Makeup Services

### 🤖 **You Are Agent 5: Makeup Artistry Specialist**
You have been assigned to apply comprehensive metadata tags to **all 12 makeup services**. This is systematic tagging work for makeup application and education services.

### 🎯 **Your Specific Assignment - All Makeup Services**
Apply appropriate metadata tags from all 13 comprehensive tag categories to these **12 makeup services**:

1. `makeup_001_dinner_party_makeup.md` - Dinner Party Makeup
2. `makeup_002_formal_party_makeup.md` - Formal Party Makeup
3. `makeup_003_bridal_silver.md` - Bridal Makeup (Silver Package)
4. `makeup_004_bridal_gold.md` - Bridal Makeup (Gold Package)
5. `makeup_005_bridal_platinum.md` - Bridal Makeup (Platinum Package)
6. `makeup_006_natural_makeup.md` - Natural Makeup
7. `makeup_007_airbrush_makeup.md` - Airbrush Makeup
8. `makeup_008_photography_makeup.md` - Photography Makeup
9. `makeup_009_makeup_lesson.md` - Makeup Lesson
10. `makeup_010_makeup_consultation.md` - Makeup Consultation
11. `makeup_011_makeup_touch_up.md` - Makeup Touch Up
12. `makeup_012_contouring_makeup.md` - Contouring Makeup

**Location**: All files are in `src/data/services/` directory

### 🚨 **CRITICAL: Apply Agentic Gates**
Before starting, ensure you understand these quality gates:

1. **Gate 1: Scope Adherence** - Only work on the 12 makeup services listed above
2. **Gate 2: Tag Consistency** - Use exact tag names from the 13 metadata categories  
3. **Gate 3: Service Understanding** - Understand each makeup service before tagging
4. **Gate 4: Tag Logic** - Apply tags that make logical sense for makeup services
5. **Gate 5: Quality Control** - Ensure comprehensive coverage across all 13 categories

### 📋 **Required Actions**

#### **Step 1: Read Foundation Documents (5 minutes)**
- `METADATA_TAGGING_GUIDE.md` - Complete tagging system and format
- `AGENT_QUICK_START.md` - Speed tips and examples
- Review the service database in `src/data/serviceDatabase.ts` for context

#### **Step 2: Understand Makeup Services (20 minutes)**
Makeup services span from event applications to education:

**Event Makeup**:
- **Dinner Party**: Semi-formal occasion makeup
- **Formal Party**: Elegant, sophisticated makeup
- **Bridal Packages**: Wedding makeup with varying service levels
- **Photography**: Camera-ready makeup with special considerations

**Technique-Specific**:
- **Natural Makeup**: Subtle, everyday enhancement
- **Airbrush Makeup**: Professional spray application technique
- **Contouring**: Advanced sculpting and shaping techniques

**Educational Services**:
- **Makeup Lesson**: Teaching application techniques
- **Makeup Consultation**: Color matching and product recommendations
- **Touch Up**: Quick fixes and maintenance

#### **Step 3: Apply Comprehensive Tags (Main Work)**
For each service, apply tags from ALL 13 categories:

1. **ExperienceLevel_Tags** - `beginner-friendly` / `intermediate-level` / `advanced-expertise`
2. **TimeInvestment_Tags** - `quick-service` / `standard-duration` / `extended-session`
3. **EnhancementFocus_Tags** - `facial-enhancement` (primary for makeup services)
4. **OccasionSuitability_Tags** - `everyday-appropriate` / `special-occasion` / `professional-setting`
5. **MaintenanceCommitment_Tags** - `low-maintenance` / `moderate-upkeep` / `high-maintenance`
6. **PricePoint_Tags** - `budget-friendly` / `mid-range` / `premium-service`
7. **ResultPermanence_Tags** - `temporary-results` / `semi-permanent` / `long-lasting`
8. **RiskLevel_Tags** - `minimal-risk` / `moderate-risk` / `higher-risk`
9. **ServiceCompatibility_Tags** - `pairs-with-makeup` / `pairs-with-hair` / `pairs-with-facial`
10. **UrgencyLevel_Tags** - `flexible-timing` / `moderate-urgency` / `time-sensitive`
11. **ServiceComplexity_Tags** - `simple-procedure` / `moderate-complexity` / `advanced-technique`
12. **EmotionalContext_Tags** - `confidence-building` / `relaxation-focused` / `transformation-oriented` / `celebration-ready`
13. **ClientEligibility_Tags** - `universal-suitable` / `consultation-required` / `health-restrictions`

### 💡 **Makeup Services Tagging Hints**

#### **Event Makeup Patterns**

**Dinner Party Makeup**:
- `intermediate-level`, `standard-duration`, `mid-range`
- `special-occasion`, `confidence-building`, `universal-suitable`

**Formal Party Makeup**:
- `intermediate-level`, `standard-duration`, `premium-service`
- `special-occasion`, `celebration-ready`, `universal-suitable`

**Bridal Makeup Packages**:
- **Silver**: `intermediate-level`, `standard-duration`, `mid-range`
- **Gold**: `intermediate-level`, `extended-session`, `premium-service`
- **Platinum**: `advanced-expertise`, `extended-session`, `premium-service`
- All bridal: `special-occasion`, `celebration-ready`, `time-sensitive`

#### **Technique-Specific Patterns**

**Natural Makeup**:
- `beginner-friendly`, `standard-duration`, `budget-friendly`
- `everyday-appropriate`, `confidence-building`, `universal-suitable`

**Airbrush Makeup**:
- `advanced-expertise`, `extended-session`, `premium-service`
- `special-occasion`, `transformation-oriented`, `consultation-required`

**Photography Makeup**:
- `advanced-expertise`, `extended-session`, `premium-service`
- `professional-setting`, `transformation-oriented`, `consultation-required`

**Contouring Makeup**:
- `advanced-expertise`, `extended-session`, `premium-service`
- `transformation-oriented`, `confidence-building`, `consultation-required`

#### **Educational Services Patterns**

**Makeup Lesson**:
- `beginner-friendly`, `extended-session`, `mid-range`
- `confidence-building`, `transformation-oriented`, `universal-suitable`

**Makeup Consultation**:
- `beginner-friendly`, `quick-service`, `budget-friendly`
- `confidence-building`, `universal-suitable`, `flexible-timing`

**Touch Up**:
- `beginner-friendly`, `quick-service`, `budget-friendly`
- `flexible-timing`, `confidence-building`, `universal-suitable`

### 📝 **Service File Format Template**
Use this exact format for each service:

```markdown
# [Service Name]
**Service ID**: [service_id]
**Category**: makeup

## Metadata Tags

### ExperienceLevel_Tags
- [appropriate tag]

### TimeInvestment_Tags
- [appropriate tag]

### EnhancementFocus_Tags
- facial-enhancement

### OccasionSuitability_Tags
- [appropriate tag(s)]

### MaintenanceCommitment_Tags
- [appropriate tag]

### PricePoint_Tags
- [appropriate tag]

### ResultPermanence_Tags
- temporary-results

### RiskLevel_Tags
- [appropriate tag]

### ServiceCompatibility_Tags
- [appropriate tag(s)]

### UrgencyLevel_Tags
- [appropriate tag]

### ServiceComplexity_Tags
- [appropriate tag]

### EmotionalContext_Tags
- [appropriate tag(s)]

### ClientEligibility_Tags
- [appropriate tag]
```

### ⚠️ **Avoid These Mistakes**
- ❌ Treating all makeup services as the same complexity
- ❌ Missing `time-sensitive` for bridal services
- ❌ Not considering `consultation-required` for advanced techniques
- ❌ Underestimating the premium positioning of airbrush/photography makeup
- ❌ Missing `celebration-ready` for event-focused services

### ✅ **Success Criteria**
- [ ] All 12 services have tags from all 13 categories
- [ ] Bridal services properly reflect special occasion and timing needs
- [ ] Advanced techniques show appropriate complexity and pricing
- [ ] Educational services emphasize confidence-building
- [ ] ServiceCompatibility_Tags enable logical bundling with hair/facial

### 📊 **Progress Tracking**
Update your progress in `AGENT_COORDINATION_PROTOCOL.md`:
- [ ] makeup_001_dinner_party_makeup.md
- [ ] makeup_002_formal_party_makeup.md
- [ ] makeup_003_bridal_silver.md
- [ ] makeup_004_bridal_gold.md
- [ ] makeup_005_bridal_platinum.md
- [ ] makeup_006_natural_makeup.md
- [ ] makeup_007_airbrush_makeup.md
- [ ] makeup_008_photography_makeup.md
- [ ] makeup_009_makeup_lesson.md
- [ ] makeup_010_makeup_consultation.md
- [ ] makeup_011_makeup_touch_up.md
- [ ] makeup_012_contouring_makeup.md

### 🎉 **Agent 5 Mission Complete**
Upon finishing these 12 services, you will have completed all makeup services with comprehensive metadata tagging, creating the foundation for intelligent makeup service recommendations and event planning.

**Remember**: Makeup services range from quick touch-ups to elaborate bridal applications. Consider the full spectrum of occasions, techniques, and client needs.

---

**READY TO START**: Begin with `makeup_001_dinner_party_makeup.md` and work systematically through all your makeup services!

