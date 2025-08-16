# Metadata Tagging Guide
## Comprehensive Service Tagging System

### 🎯 **Mission Overview**
Replace 280KB of complex engine code with simple, transparent tag-based service matching. Each of the 85 beauty services must receive appropriate tags from ALL 13 metadata categories.

### 📊 **The Complete Tag System**

#### **1. ExperienceLevel_Tags**
**Purpose**: Match services to client comfort and skill level
- `beginner-friendly` - Low risk, gentle procedures, easy to understand
- `intermediate-level` - Moderate complexity, some maintenance required
- `advanced-expertise` - High complexity, permanent/semi-permanent results

#### **2. TimeInvestment_Tags**
**Purpose**: Match services to available appointment time
- `quick-service` - 30 minutes or less
- `standard-duration` - 30 minutes to 1.5 hours
- `extended-session` - 1.5+ hours

#### **3. EnhancementFocus_Tags**
**Purpose**: Group services by beauty goals for cross-selling
- `facial-enhancement` - Face, skin, makeup, facial features
- `hair-transformation` - All hair-related services
- `skin-improvement` - Skin health, texture, smoothness
- `eye-enhancement` - Lashes, eyebrows, eye makeup
- `brow-perfection` - Dedicated eyebrow services

#### **4. OccasionSuitability_Tags**
**Purpose**: Match services to life events and contexts
- `everyday-appropriate` - Daily wear, natural looks
- `special-occasion` - Events, celebrations, formal occasions
- `professional-setting` - Workplace appropriate, polished looks
- `seasonal-optimal` - Best timing for certain services

#### **5. MaintenanceCommitment_Tags**
**Purpose**: Set realistic expectations for ongoing care
- `low-maintenance` - Minimal ongoing care required
- `moderate-upkeep` - Some regular maintenance needed
- `high-maintenance` - Significant ongoing commitment

#### **6. PricePoint_Tags**
**Purpose**: Align services with budget expectations
- `budget-friendly` - Accessible pricing, good value
- `mid-range` - Standard professional pricing
- `premium-service` - Higher-end, luxury positioning

#### **7. ResultPermanence_Tags**
**Purpose**: Communicate duration and reversibility
- `temporary-results` - Days to weeks, easily reversible
- `semi-permanent` - Weeks to months, gradual fade
- `long-lasting` - Months to permanent, significant commitment

#### **8. RiskLevel_Tags**
**Purpose**: Ensure appropriate safety and expectations
- `minimal-risk` - Very safe, low chance of complications
- `moderate-risk` - Some potential for sensitivity/reactions
- `higher-risk` - Requires expertise, potential complications

#### **9. ServiceCompatibility_Tags**
**Purpose**: Enable intelligent bundling and recommendations
- `pairs-with-hair` - Works well with hair services
- `pairs-with-facial` - Complements facial treatments
- `pairs-with-makeup` - Natural combination with makeup
- `pairs-with-brow-lash` - Synergizes with eye services
- `enhances-color-services` - Supports hair color treatments
- `enhances-skin-treatments` - Complements facial services
- `seasonal-synergy` - Timing-dependent combinations

#### **10. UrgencyLevel_Tags**
**Purpose**: Optimize scheduling and client expectations
- `flexible-timing` - Can be scheduled anytime
- `moderate-urgency` - Some timing considerations
- `time-sensitive` - Specific timing requirements

#### **11. ServiceComplexity_Tags**
**Purpose**: Match technical requirements with staff capabilities
- `simple-procedure` - Basic techniques, minimal training
- `moderate-complexity` - Standard professional skills
- `advanced-technique` - Specialized expertise required

#### **12. EmotionalContext_Tags**
**Purpose**: Provide empathetic service matching
- `confidence-building` - Boosts self-esteem and confidence
- `relaxation-focused` - Stress relief and pampering
- `transformation-oriented` - Significant change and renewal
- `celebration-ready` - Special occasions and milestones

#### **13. ClientEligibility_Tags**
**Purpose**: Ensure safety and appropriate service delivery
- `universal-suitable` - Safe for most clients
- `consultation-required` - Needs professional assessment
- `health-restrictions` - Medical considerations required

### 📝 **Service File Format**
Each service file should be formatted as follows:

```markdown
# [Service Name]
**Service ID**: [service_id]
**Category**: [hair/threading/waxing/eyebrow_lash/facial/makeup]

## Metadata Tags

### ExperienceLevel_Tags
- [appropriate tag]

### TimeInvestment_Tags
- [appropriate tag]

### EnhancementFocus_Tags
- [appropriate tag(s)]

### OccasionSuitability_Tags
- [appropriate tag(s)]

### MaintenanceCommitment_Tags
- [appropriate tag]

### PricePoint_Tags
- [appropriate tag]

### ResultPermanence_Tags
- [appropriate tag]

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

### 🎯 **Tagging Guidelines**

#### **Quality Standards**
1. **Every service must have tags from ALL 13 categories**
2. **Use exact tag names** - no variations or custom tags
3. **Apply multiple tags per category when appropriate**
4. **Ensure logical consistency** across related services
5. **Consider the client perspective** when applying tags

#### **Logic Checks**
- Advanced services should have `advanced-expertise` + `moderate-complexity` or `advanced-technique`
- Quick services should align with `beginner-friendly` or `simple-procedure`
- Premium services should have `long-lasting` or `advanced-technique` justification
- High-maintenance services should have clear ongoing care requirements

#### **Cross-Category Consistency**
- `advanced-expertise` services typically have `moderate-risk` or `higher-risk`
- `extended-session` services often have `premium-service` pricing
- `special-occasion` services usually have `celebration-ready` emotional context
- `time-sensitive` services often require `consultation-required` eligibility

### 🚀 **Agent Assignment System**
Agents will be assigned specific service subsets:
- **Agent 1**: Hair Services (28 services)
- **Agent 2**: Threading + Waxing Services (16 services)
- **Agent 3**: Eyebrow & Lash Services (13 services)
- **Agent 4**: Facial Services (16 services)
- **Agent 5**: Makeup Services (12 services)

### ✅ **Success Validation**
After tagging, each service should enable:
- **Intelligent filtering** through tag combinations
- **Smart bundling** through compatibility tags
- **Experience matching** through level and complexity alignment
- **Emotional resonance** through context and occasion tags

**Remember**: This tagging system replaces complex algorithms with transparent, business-controllable logic that stakeholders can understand and modify.

---

**NEXT: Check your agent assignment in `AGENT_ASSIGNMENTS.md`**

