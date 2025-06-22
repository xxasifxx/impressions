# Impressions Beauty Web - Implementation Plan

## Project Goal
Fix the broken user journey system to create an intelligent, revenue-generating customer experience that guides users through personalized service package building with automatic bundling discounts.

## Current Problems
1. Domain context is lost when users navigate from landing pages to services
2. All CTAs lead to the same generic marketplace that defaults to hair-salon theme
3. Domain tabs are just modals, not actual navigation
4. User journey personalization is just surface-level filtering
5. Intelligent cart bundling system is underutilized
6. No automatic discount application for service packages

## Success Criteria
- Users maintain domain context throughout their journey
- Automatic service bundling with real-time discount calculation
- Personalized experiences for each beauty vertical (Hair, Makeup, Med Spa)
- Increased average order value through intelligent recommendations
- Clear progress tracking and measurable business impact

---

## PHASE 1: FOUNDATION FIXES

### Step 1: Create Documentation Structure
**Objective**: Establish clear documentation and progress tracking
**Duration**: 1 hour
**Files to Create**:
- `IMPLEMENTATION_PLAN.md` (this file)
- `PROGRESS_LOG.md`
- `CART_REQUIREMENTS.md`
- `docs/step-by-step/` directory

**Acceptance Criteria**:
- [ ] All documentation files created
- [ ] Progress logging system established
- [ ] Step-by-step documentation structure ready

### Step 2: Fix Domain Context Preservation
**Objective**: Implement URL-based domain routing to maintain context throughout navigation
**Duration**: 3-4 hours
**Files to Modify**:
- `src/contexts/DomainThemeContext.tsx`
- `src/pages/Services.tsx`
- `src/pages/HairSalonLanding.tsx`
- `src/pages/MakeupStudioLanding.tsx`
- `src/pages/MedSpaLanding.tsx`

**Technical Requirements**:
- Add URL parameter reading to DomainThemeContext (`?domain=hair-salon`)
- Update Services page to read domain from URL instead of defaulting
- Modify all landing page CTAs to include domain parameter
- Add fallback logic for invalid domain parameters

**Acceptance Criteria**:
- [ ] Users clicking "Hair Salon" → Landing → "Browse Services" maintain hair context
- [ ] Users clicking "Makeup Studio" → Landing → "View Services" maintain makeup context
- [ ] Users clicking "Med Spa" → Landing → "View Services" maintain spa context
- [ ] URL reflects current domain context
- [ ] Page refresh maintains domain context

### Step 3: Replace Modal Tabs with Real Domain Navigation
**Objective**: Convert fake domain tabs into actual navigation that switches domain context
**Duration**: 2-3 hours
**Files to Modify**:
- `src/components/IntegratedDomainTabs.tsx`
- `src/components/DomainModal.tsx`
- `src/pages/Services.tsx`

**Technical Requirements**:
- Remove modal functionality from domain tabs
- Implement actual domain switching via URL updates
- Maintain service cart across domain switches
- Update tab styling to reflect active domain

**Acceptance Criteria**:
- [ ] Clicking domain tabs changes URL and page context
- [ ] Service cart persists across domain switches
- [ ] Active domain tab is visually highlighted
- [ ] No more modal popups for domain switching

---

## PHASE 2: INTELLIGENT CART SYSTEM

### Step 4: Audit Current Cart Implementation
**Objective**: Document existing cart functionality and identify gaps
**Duration**: 2 hours
**Files to Analyze**:
- `src/contexts/ServiceCartContext.tsx`
- `src/components/ServiceCart.tsx`
- `src/data/unifiedServicesData.ts`

**Deliverables**:
- Document current package discount logic
- Identify existing service bundles
- Map current cart state management
- List missing automatic bundling features

**Acceptance Criteria**:
- [ ] Complete audit document created
- [ ] Current package discounts catalogued
- [ ] Gap analysis completed
- [ ] Requirements for intelligent bundling defined

### Step 5: Implement Automatic Bundle Detection
**Objective**: Create smart service bundling that suggests complementary services
**Duration**: 4-5 hours
**Files to Create/Modify**:
- `src/utils/bundleDetection.ts`
- `src/contexts/ServiceCartContext.tsx`
- `src/components/ServiceCart.tsx`

**Technical Requirements**:
- Implement bundle detection algorithm
- Add real-time discount calculation
- Create bundle suggestion UI components
- Add automatic discount application

**Acceptance Criteria**:
- [ ] Adding eyebrow threading suggests face threading with $8 discount
- [ ] Adding haircut suggests color services with bundle pricing
- [ ] Cart shows original prices crossed out with savings highlighted
- [ ] Bundle suggestions appear immediately when qualifying services added

### Step 6: Create Cross-Domain Bundle Intelligence
**Objective**: Enable intelligent service recommendations across beauty verticals
**Duration**: 3-4 hours
**Files to Create/Modify**:
- `src/utils/crossDomainBundles.ts`
- `src/components/CrossDomainRecommendations.tsx`
- `src/contexts/ServiceCartContext.tsx`

**Technical Requirements**:
- Define cross-domain bundle rules (hair + makeup for special occasions)
- Implement recommendation engine
- Create UI for cross-domain suggestions
- Maintain domain context while showing cross-domain options

**Acceptance Criteria**:
- [ ] Hair customers see relevant makeup suggestions for special occasions
- [ ] Makeup customers see hair styling suggestions for events
- [ ] Med spa customers see maintenance package recommendations
- [ ] Cross-domain bundles apply appropriate discounts

---

## PHASE 3: PERSONALIZED EXPERIENCES

### Step 7: Implement Domain-Specific Service Filtering
**Objective**: Show relevant services automatically based on domain context
**Duration**: 2-3 hours
**Files to Modify**:
- `src/pages/Services.tsx`
- `src/data/unifiedServicesData.ts`
- `src/components/UserJourneyFilter.tsx`

**Technical Requirements**:
- Filter services by domain automatically
- Update user journey filters to be domain-specific
- Maintain search functionality within domain context
- Add "View All Services" option for cross-domain browsing

**Acceptance Criteria**:
- [ ] Hair salon visitors see hair services by default
- [ ] Makeup studio visitors see makeup services by default
- [ ] Med spa visitors see spa services by default
- [ ] User journey filters show domain-appropriate options
- [ ] Search works within domain context

### Step 8: Create Journey-Specific Service Layouts
**Objective**: Present services differently based on user journey selection
**Duration**: 4-5 hours
**Files to Create/Modify**:
- `src/components/JourneySpecificLayout.tsx`
- `src/pages/Services.tsx`
- `src/components/ServiceCard.tsx`

**Technical Requirements**:
- Design different layouts for different journey types
- Emphasize before/after galleries for "Transformation" journeys
- Focus on quick booking for "Maintenance" journeys
- Highlight packages for "Special Occasion" journeys

**Acceptance Criteria**:
- [ ] "Transformation" journey shows before/after galleries prominently
- [ ] "Maintenance" journey emphasizes quick booking and regular services
- [ ] "Special Occasion" journey highlights premium services and packages
- [ ] Layout changes are smooth and intuitive

---

## PHASE 4: OPTIMIZATION & TRACKING

### Step 9: Implement Conversion Tracking
**Objective**: Add analytics to measure system effectiveness
**Duration**: 2-3 hours
**Files to Create**:
- `src/utils/analytics.ts`
- `src/hooks/useAnalytics.ts`

**Technical Requirements**:
- Track domain entry points
- Monitor journey selection rates
- Measure cart abandonment
- Track bundle acceptance rates

**Acceptance Criteria**:
- [ ] Domain entry tracking implemented
- [ ] Journey selection tracking active
- [ ] Cart behavior tracking functional
- [ ] Bundle recommendation tracking working

### Step 10: Performance Testing & Bug Fixes
**Objective**: Ensure system works reliably under real-world conditions
**Duration**: 3-4 hours

**Technical Requirements**:
- Test all user journey paths
- Verify cart persistence across sessions
- Test bundle detection accuracy
- Fix any discovered bugs

**Acceptance Criteria**:
- [ ] All user journeys tested and working
- [ ] Cart persists across browser sessions
- [ ] Bundle detection is accurate and fast
- [ ] No critical bugs remain

---

## PROGRESS TRACKING

Each step must be logged in `PROGRESS_LOG.md` with:
- Start time and date
- Actual time spent vs. estimated
- Specific files modified
- Issues encountered
- Acceptance criteria completion status
- Screenshots/evidence of functionality

## ANTI-BRILLIANCE RULES

1. **Do exactly what each step specifies, nothing more**
2. **Log progress after every micro-change**
3. **Don't "improve" or "optimize" beyond the spec**
4. **Ask for approval before any creative additions**
5. **Test only what the step requires**
6. **Document any deviations from the plan**

## ROLLBACK PLAN

If any step breaks existing functionality:
1. Immediately revert changes using git
2. Log the issue in PROGRESS_LOG.md
3. Analyze what went wrong
4. Update the plan if necessary
5. Get approval before proceeding

---

**Total Estimated Duration**: 25-35 hours
**Expected Business Impact**: 
- Reduced cart abandonment by 30-40%
- Increased average order value by 25-35%
- Improved customer satisfaction through clearer journeys
- Higher conversion rates from landing pages

