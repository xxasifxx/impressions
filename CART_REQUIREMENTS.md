# Intelligent Cart System Requirements

## Overview
The cart system is the revenue-generating core of the Impressions Beauty platform. It must intelligently detect service combinations, automatically apply discounts, and guide customers toward higher-value packages.

---

## CURRENT STATE ANALYSIS

### Existing Cart Features (from ServiceCartContext.tsx):
- ✅ Basic cart functionality (add, remove, update quantity)
- ✅ Service duration calculation
- ✅ Total price calculation
- ✅ Predefined service packages with discounts
- ✅ Coupon code system

### Existing Service Packages:
1. **Perfect Brows Package** (`brow-perfect`)
   - Services: eyebrow-threading + full-face-threading
   - Discount: $8 fixed discount
   - Coupon: "BROWPERFECT"

2. **Bridal Glow Package** (`bridal-glow`)
   - Services: bridal-makeup + gold-facial
   - Discount: 15% percentage discount
   - Coupon: "BRIDALGLOW"

3. **Hair Transformation** (`hair-transformation`)
   - Services: precision-cut + full-color + deep-conditioning
   - Discount: $20 fixed discount
   - Coupon: "TRANSFORM"

### Current Problems:
- ❌ No automatic bundle detection
- ❌ No real-time discount suggestions
- ❌ No cross-domain bundling
- ❌ No intelligent upselling
- ❌ Package discounts not prominently displayed
- ❌ No dynamic pricing visualization

---

## REQUIRED CART INTELLIGENCE FEATURES

### 1. Automatic Bundle Detection
**Requirement**: When users add services to cart, automatically detect potential bundles and suggest them.

**Examples**:
- Add "eyebrow-threading" → Suggest "Add face threading for $8 total savings"
- Add "precision-cut" → Suggest "Add color service and save $20"
- Add "bridal-makeup" → Suggest "Add gold facial for 15% off total"

**Technical Implementation**:
- Monitor cart changes in real-time
- Check each new service against bundle definitions
- Calculate potential savings
- Display suggestions prominently in cart UI

### 2. Dynamic Pricing Display
**Requirement**: Show original prices, discounted prices, and savings clearly.

**Visual Requirements**:
- Original prices crossed out
- New prices highlighted in green
- Total savings prominently displayed
- "You're saving $X!" messaging

**Examples**:
```
Eyebrow Threading         $25  $20
Face Threading           $30  $25
                         ---  ---
Bundle Discount          -$8
                         ---  ---
Total                    $55  $37
You're saving $18!
```

### 3. Cross-Domain Bundle Intelligence
**Requirement**: Suggest complementary services from other domains.

**Business Logic**:
- Hair + Special Occasion → Suggest makeup services
- Makeup + Wedding → Suggest hair styling
- Any service + Special event → Suggest complete packages
- Med Spa + Maintenance → Suggest regular treatment packages

**Implementation Rules**:
- Only suggest cross-domain when contextually relevant
- Maintain primary domain context
- Show cross-domain suggestions as "Complete Your Look" section
- Apply appropriate cross-domain discounts

### 4. Smart Upselling Logic
**Requirement**: Intelligently suggest higher-value services based on cart contents.

**Upselling Rules**:
- Basic haircut → Suggest styling or color
- Basic makeup → Suggest premium or bridal packages
- Single service → Suggest maintenance packages
- Low-value cart → Suggest package upgrades

**Timing**:
- Immediate suggestions when adding services
- Checkout page upsells
- "Frequently bought together" recommendations

### 5. Package Upgrade Suggestions
**Requirement**: When users have services that are close to a package, suggest upgrading.

**Examples**:
- Has 2 of 3 services in a package → "Add [service] and save $X more!"
- Has expensive individual services → "Get the [package name] instead and save $X!"
- Has basic services → "Upgrade to premium package for only $X more!"

---

## CART UI/UX REQUIREMENTS

### Cart Sidebar/Modal:
- **Always visible** cart icon with item count
- **Expandable cart** showing current items
- **Real-time updates** as items are added/removed
- **Bundle suggestions** prominently displayed
- **Savings calculator** showing total discounts

### Bundle Suggestion Components:
- **Suggestion cards** with clear value propositions
- **One-click add** for suggested bundles
- **Before/after pricing** clearly displayed
- **Limited-time offers** for urgency (optional)

### Checkout Integration:
- **Package summary** with all discounts applied
- **Upsell opportunities** at checkout
- **Service duration** and **appointment time** calculation
- **Specialist matching** for booked services

---

## BUSINESS RULES

### Discount Priority:
1. **Automatic bundles** apply first
2. **Manual coupon codes** apply to remaining total
3. **Cross-domain discounts** apply to cross-domain items only
4. **Maximum discount limits** to prevent abuse

### Bundle Eligibility:
- **Minimum cart value** for certain bundles
- **Service compatibility** (some services can't be combined)
- **Specialist availability** for complex packages
- **Time slot requirements** for multi-service bookings

### Revenue Optimization:
- **Prioritize higher-margin** service suggestions
- **Promote underbooked** services/time slots
- **Seasonal promotions** integration
- **New customer specials** for first-time visitors

---

## TECHNICAL SPECIFICATIONS

### Data Structures:
```typescript
interface BundleRule {
  id: string;
  name: string;
  description: string;
  requiredServices: string[];
  suggestedServices?: string[];
  discountType: 'percentage' | 'fixed' | 'tiered';
  discountValue: number;
  conditions?: BundleCondition[];
  priority: number;
}

interface BundleSuggestion {
  bundleId: string;
  suggestedServices: UnifiedService[];
  potentialSavings: number;
  currentTotal: number;
  bundleTotal: number;
  urgency?: 'high' | 'medium' | 'low';
}
```

### API Requirements:
- **Bundle detection endpoint** for real-time suggestions
- **Price calculation endpoint** with all discounts applied
- **Cross-domain recommendations** endpoint
- **Package availability** checking

### Performance Requirements:
- **Bundle detection** must complete in <200ms
- **Price calculations** must be real-time
- **Cart updates** must be instant
- **Suggestions** must not block cart functionality

---

## SUCCESS METRICS

### Business KPIs:
- **Average Order Value** increase of 25-35%
- **Cart abandonment** reduction of 30-40%
- **Package adoption** rate of 40%+
- **Cross-domain sales** increase of 20%+

### User Experience Metrics:
- **Time to checkout** reduction
- **Bundle suggestion** click-through rate
- **Customer satisfaction** with recommendations
- **Repeat booking** rate increase

### Technical Metrics:
- **Cart performance** <200ms response times
- **Bundle accuracy** >95% relevant suggestions
- **System reliability** 99.9% uptime
- **Error rates** <0.1% for cart operations

---

## IMPLEMENTATION PHASES

### Phase 1: Basic Bundle Detection
- Implement automatic detection for existing packages
- Add real-time suggestion display
- Create dynamic pricing visualization

### Phase 2: Cross-Domain Intelligence
- Add cross-domain bundle rules
- Implement "Complete Your Look" suggestions
- Create cross-domain discount logic

### Phase 3: Advanced Upselling
- Add smart upselling algorithms
- Implement package upgrade suggestions
- Create urgency and scarcity features

### Phase 4: Optimization
- A/B test different suggestion strategies
- Optimize bundle rules based on data
- Add seasonal and promotional logic

---

## ACCEPTANCE CRITERIA

### Must Have:
- [ ] Automatic bundle detection for all existing packages
- [ ] Real-time discount calculation and display
- [ ] Cross-domain service suggestions
- [ ] Clear savings visualization
- [ ] One-click bundle acceptance

### Should Have:
- [ ] Smart upselling based on cart contents
- [ ] Package upgrade suggestions
- [ ] Urgency messaging for limited offers
- [ ] Mobile-optimized cart experience

### Could Have:
- [ ] AI-powered personalized recommendations
- [ ] Dynamic pricing based on demand
- [ ] Social proof ("Others also booked...")
- [ ] Loyalty program integration

---

**This cart system will transform the salon from a basic booking site into an intelligent revenue-generating platform that guides customers toward higher-value purchases while providing genuine value through smart bundling.**

