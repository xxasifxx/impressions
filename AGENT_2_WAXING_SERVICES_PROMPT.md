# Agent 2: Hair Removal Specialist - Waxing Services
## Your Mission: Tag 10 Waxing Services

### 🤖 **You Are Agent 2: Hair Removal Specialist - Waxing Focus**
You have been assigned to apply comprehensive metadata tags to **10 waxing services**. This completes your systematic tagging work for hair removal services.

### 🎯 **Your Specific Assignment - Waxing Services**
Apply appropriate metadata tags from all 13 comprehensive tag categories to these **10 waxing services**:

1. `wax_001_underarms.md` - Waxing - Underarms
2. `wax_002_bikini.md` - Waxing - Bikini
3. `wax_003_arms_half.md` - Waxing - Arms (Half)
4. `wax_004_arms_full.md` - Waxing - Arms (Full)
5. `wax_005_legs_half.md` - Waxing - Legs (Half)
6. `wax_006_legs_full.md` - Waxing - Legs (Full)
7. `wax_007_chest.md` - Waxing - Chest
8. `wax_008_back.md` - Waxing - Back
9. `wax_009_brazilian.md` - Brazilian Wax
10. `wax_010_full_body.md` - Full Body Wax

**Location**: All files are in `src/data/services/` directory

### 🚨 **CRITICAL: Apply Agentic Gates**
Before starting, ensure you understand these quality gates:

1. **Gate 1: Scope Adherence** - Only work on the 10 waxing services listed above
2. **Gate 2: Tag Consistency** - Use exact tag names from the 13 metadata categories  
3. **Gate 3: Service Understanding** - Understand each waxing service before tagging
4. **Gate 4: Tag Logic** - Apply tags that make logical sense for waxing
5. **Gate 5: Quality Control** - Ensure comprehensive coverage across all 13 categories

### 📋 **Required Actions**

#### **Step 1: Read Foundation Documents (5 minutes)**
- `METADATA_TAGGING_GUIDE.md` - Complete tagging system and format
- `AGENT_QUICK_START.md` - Speed tips and examples
- Review the service database in `src/data/serviceDatabase.ts` for context

#### **Step 2: Understand Waxing Services (15 minutes)**
Waxing is hair removal using heated wax applied and removed with strips:
- **Longer-Lasting**: Results last 3-6 weeks (longer than threading)
- **Moderate to High Pain**: More discomfort than threading
- **Variable Duration**: From 15 minutes (underarms) to 3 hours (full body)
- **Seasonal Considerations**: Popular before summer/vacation
- **Privacy Considerations**: Some services require intimate positioning

#### **Step 3: Apply Comprehensive Tags (Main Work)**
For each service, apply tags from ALL 13 categories:

1. **ExperienceLevel_Tags** - `beginner-friendly` / `intermediate-level` / `advanced-expertise`
2. **TimeInvestment_Tags** - `quick-service` / `standard-duration` / `extended-session`
3. **EnhancementFocus_Tags** - `skin-improvement` (smooth skin focus)
4. **OccasionSuitability_Tags** - `everyday-appropriate` / `special-occasion` / `seasonal-optimal`
5. **MaintenanceCommitment_Tags** - `low-maintenance` / `moderate-upkeep` / `high-maintenance`
6. **PricePoint_Tags** - `budget-friendly` / `mid-range` / `premium-service`
7. **ResultPermanence_Tags** - `temporary-results` / `semi-permanent` / `long-lasting`
8. **RiskLevel_Tags** - `minimal-risk` / `moderate-risk` / `higher-risk`
9. **ServiceCompatibility_Tags** - `seasonal-synergy` / `pairs-with-facial` / `enhances-skin-treatments`
10. **UrgencyLevel_Tags** - `flexible-timing` / `moderate-urgency` / `time-sensitive`
11. **ServiceComplexity_Tags** - `simple-procedure` / `moderate-complexity` / `advanced-technique`
12. **EmotionalContext_Tags** - `confidence-building` / `relaxation-focused` / `transformation-oriented`
13. **ClientEligibility_Tags** - `universal-suitable` / `consultation-required` / `health-restrictions`

### 💡 **Waxing Services Tagging Hints**

#### **Service Duration Patterns**
- **Quick Services** (15-20 min): Underarms, Bikini
- **Standard Duration** (30-60 min): Arms, Legs (Half), Chest, Back
- **Extended Session** (60+ min): Legs (Full), Brazilian, Full Body

#### **Experience Level Considerations**
- **Beginner-Friendly**: Underarms, Arms (Half)
- **Intermediate-Level**: Bikini, Legs, Chest, Back
- **Advanced-Expertise**: Brazilian, Full Body (due to technique and client comfort)

#### **Risk Level Assessment**
- **Minimal-Risk**: Arms, Legs
- **Moderate-Risk**: Underarms, Chest, Back (sensitive areas)
- **Higher-Risk**: Bikini, Brazilian (intimate areas, higher pain)

#### **Seasonal Considerations**
- Most waxing services have `seasonal-optimal` for summer preparation
- `seasonal-synergy` with vacation planning and swimwear season

#### **ServiceCompatibility_Tags for Waxing**
- `seasonal-synergy` - Popular before summer/vacation
- `enhances-skin-treatments` - Creates smooth canvas for other treatments
- `pairs-with-facial` - Can be combined in spa packages

### 📝 **Service File Format Template**
Use this exact format for each service:

```markdown
# [Service Name]
**Service ID**: [service_id]
**Category**: waxing

## Metadata Tags

### ExperienceLevel_Tags
- [appropriate tag]

### TimeInvestment_Tags
- [appropriate tag]

### EnhancementFocus_Tags
- skin-improvement

### OccasionSuitability_Tags
- [appropriate tag(s)]

### MaintenanceCommitment_Tags
- [appropriate tag]

### PricePoint_Tags
- [appropriate tag]

### ResultPermanence_Tags
- [temporary-results or semi-permanent]

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
- ❌ Underestimating pain/risk for intimate waxing services
- ❌ Missing `seasonal-optimal` for summer-focused services
- ❌ Not considering privacy/comfort for Brazilian services
- ❌ Applying same experience level to all waxing services
- ❌ Missing `health-restrictions` for sensitive area services

### ✅ **Success Criteria**
- [ ] All 10 services have tags from all 13 categories
- [ ] Duration tags reflect actual service time requirements
- [ ] Risk levels appropriate for body area and technique
- [ ] Seasonal considerations included where relevant
- [ ] Experience levels reflect client comfort requirements

### 📊 **Progress Tracking**
Update your progress in `AGENT_COORDINATION_PROTOCOL.md`:
- [ ] wax_001_underarms.md
- [ ] wax_002_bikini.md
- [ ] wax_003_arms_half.md
- [ ] wax_004_arms_full.md
- [ ] wax_005_legs_half.md
- [ ] wax_006_legs_full.md
- [ ] wax_007_chest.md
- [ ] wax_008_back.md
- [ ] wax_009_brazilian.md
- [ ] wax_010_full_body.md

### 🎉 **Agent 2 Mission Complete**
Upon finishing these 10 waxing services, you will have completed all 16 hair removal services (6 threading + 10 waxing) with comprehensive metadata tagging.

**Remember**: Waxing services vary significantly in complexity, duration, and client comfort requirements. Consider the full spectrum from simple arm waxing to complex Brazilian services.

---

**READY TO START**: Begin with `wax_001_underarms.md` and complete your hair removal specialization!

