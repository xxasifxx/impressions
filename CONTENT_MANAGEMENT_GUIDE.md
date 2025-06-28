# Content Management Guide
## Complete Guide to Source Content, Updates, and Maintenance

This guide provides comprehensive documentation for managing all content in the impressions-beauty-web system. Everything is designed to be **hardcoded intelligently** with clear update processes.

---

## 📁 **Content Source Map - Where Everything Lives**

### **1. Services & Products**

#### **Main Service Catalog**
- **File:** `src/data/unifiedServicesData.ts`
- **Contains:** All beauty services across hair, makeup, skincare, wellness
- **Structure:** 
  ```typescript
  {
    id: string,
    name: string,
    category: 'hair' | 'makeup' | 'skincare' | 'wellness',
    subcategory: string,
    description: string,
    duration: number,
    price: number,
    experienceLevel: 'beginner' | 'intermediate' | 'advanced',
    tags: string[],
    preparation: string[],
    aftercare: string[]
  }
  ```

#### **Specialized Service Files**
- `src/data/services/hairData.ts` - Hair services (cuts, color, styling)
- `src/data/services/makeupData.ts` - Makeup services (application, lessons)
- `src/data/services/skincareData.ts` - Skincare services (facials, treatments)
- `src/data/services/wellnessData.ts` - Wellness services (massage, aromatherapy)
- `src/data/services/extensionsData.ts` - Hair extensions
- `src/data/services/rootTouchUpData.ts` - Root touch-up services

### **2. Decision Tree & Consultation Flow**

#### **Decision Tree Nodes**
- **File:** `src/data/nodeTypes.ts`
- **Contains:** Complete hardcoded decision tree (1,200+ lines)
- **Structure:**
  ```typescript
  {
    id: string,
    type: 'question' | 'service_recommendation' | 'bundle_suggestion',
    text: string,
    options?: Array<{
      text: string,
      nextNodeId: string,
      triggers: string[]
    }>,
    services?: string[],
    reasoning?: string
  }
  ```

#### **Consultation Models**
- **File:** `src/data/models/ConsultationTypes.ts`
- **Contains:** Type definitions for consultation flow
- **Purpose:** Ensures type safety across decision tree

### **3. Bundling & Recommendations**

#### **Bundle Definitions**
- **File:** `src/data/bundleData.ts`
- **Contains:** Predefined service bundles with pricing
- **Structure:**
  ```typescript
  {
    id: string,
    name: string,
    description: string,
    services: string[],
    originalPrice: number,
    bundlePrice: number,
    savings: number,
    tags: string[]
  }
  ```

#### **Bundle Intelligence Rules**
- **File:** `src/engine/BundlingIntelligence.ts`
- **Contains:** Hardcoded rules for bundle recommendations
- **Logic:** Service combination patterns, pricing optimization

### **4. Visual Evolution Content**

#### **Professional Context Visual Languages**
- **File:** `src/styles/ContextualVisualLanguage.ts`
- **Contains:** 8 professional contexts with complete visual specifications
- **Contexts:** clinical, artistic, sophisticated, luxury, wellness, precision, dramatic, natural

#### **Emotional State Typography**
- **File:** `src/data/emotionalStateTypography.ts`
- **Contains:** Font mappings for emotional states
- **States:** uncertain, exploring, engaged, confident, celebratory

#### **Color Palettes**
- **File:** `src/styles/EmotionalStates.ts`
- **Contains:** Color schemes for each emotional state
- **Usage:** Base colors that get blended with professional context colors

---

## 🔧 **How to Add New Content**

### **Adding a New Service**

#### **Step 1: Add to Main Catalog**
```typescript
// In src/data/unifiedServicesData.ts
{
  id: 'new-service-id',
  name: 'New Service Name',
  category: 'hair', // or makeup, skincare, wellness
  subcategory: 'specific-type',
  description: 'Detailed description of the service',
  duration: 60, // minutes
  price: 85,
  experienceLevel: 'intermediate',
  tags: ['relevant', 'tags', 'for', 'filtering'],
  preparation: ['What client should do before'],
  aftercare: ['What client should do after']
}
```

#### **Step 2: Add to Specialized File**
Add the same service to the appropriate specialized file (`hairData.ts`, `makeupData.ts`, etc.)

#### **Step 3: Update Decision Tree**
```typescript
// In src/data/nodeTypes.ts - find relevant nodes and add service ID
services: ['existing-service', 'new-service-id']
```

#### **Step 4: Consider Bundle Opportunities**
```typescript
// In src/data/bundleData.ts - create bundles that include new service
{
  id: 'bundle-with-new-service',
  services: ['new-service-id', 'complementary-service'],
  // ... other bundle properties
}
```

### **Adding a New Bundle**

#### **Step 1: Define Bundle**
```typescript
// In src/data/bundleData.ts
{
  id: 'new-bundle-id',
  name: 'Bundle Name',
  description: 'Why these services work together',
  services: ['service-1', 'service-2', 'service-3'],
  originalPrice: 250, // Sum of individual prices
  bundlePrice: 200,   // Discounted price
  savings: 50,
  tags: ['wedding', 'complete-look', 'premium']
}
```

#### **Step 2: Add Bundle Logic**
```typescript
// In src/engine/BundlingIntelligence.ts - add to recommendation rules
if (cartItems.some(item => item.id === 'service-1')) {
  recommendations.push({
    bundleId: 'new-bundle-id',
    reasoning: 'These services complement each other perfectly',
    confidence: 0.9
  });
}
```

### **Adding Decision Tree Paths**

#### **Step 1: Identify Insertion Point**
Find where in the decision tree the new path should branch from

#### **Step 2: Create New Nodes**
```typescript
// In src/data/nodeTypes.ts
{
  id: 'new-path-start',
  type: 'question',
  text: 'What specific outcome are you looking for?',
  options: [
    {
      text: 'Option 1',
      nextNodeId: 'new-path-option-1',
      triggers: ['keyword1', 'keyword2']
    },
    {
      text: 'Option 2', 
      nextNodeId: 'new-path-option-2',
      triggers: ['keyword3', 'keyword4']
    }
  ]
}
```

#### **Step 3: Link to Existing Tree**
Update the parent node to include your new path as an option

---

## 📊 **Content Analysis & Optimization**

### **Service Performance Analysis**

#### **What to Track:**
- Most frequently recommended services
- Services that appear in successful bundles
- Services with high user engagement
- Services that lead to bookings

#### **Where to Look:**
```typescript
// In src/engine/BundlingIntelligence.ts
// Check recommendation frequency in generateBundleRecommendations()

// In src/data/nodeTypes.ts  
// Check which services appear in multiple decision paths

// In src/engine/CardDisplayManager.ts
// Check service display patterns and user interactions
```

### **Decision Tree Optimization**

#### **Path Analysis:**
1. **Dead Ends:** Nodes that don't lead to service recommendations
2. **Popular Paths:** Most frequently traversed routes
3. **Conversion Points:** Where users typically make decisions
4. **Confusion Points:** Where users backtrack or abandon

#### **Optimization Strategies:**
```typescript
// Add more specific options to popular nodes
{
  id: 'popular-node',
  options: [
    // Add more granular choices
    { text: 'Specific option A', nextNodeId: 'targeted-path-a' },
    { text: 'Specific option B', nextNodeId: 'targeted-path-b' },
    { text: 'I need help deciding', nextNodeId: 'guidance-path' }
  ]
}
```

### **Bundle Performance Analysis**

#### **Metrics to Track:**
- Bundle acceptance rate
- Average bundle value
- Most popular bundle combinations
- Seasonal bundle performance

#### **Optimization Process:**
1. **Identify High-Performing Services:** Services that frequently get booked together
2. **Create Logical Bundles:** Group services that have natural synergy
3. **Price Strategically:** Ensure meaningful savings without devaluing services
4. **Test Bundle Names:** Clear, benefit-focused names perform better

---

## 🔄 **Maintenance Workflows**

### **Monthly Content Review**

#### **Services Audit:**
1. **Review service descriptions** for clarity and accuracy
2. **Update pricing** if needed
3. **Check preparation/aftercare instructions** for completeness
4. **Verify experience levels** match actual service complexity

#### **Decision Tree Health Check:**
1. **Test major user paths** to ensure they lead to appropriate services
2. **Check for orphaned nodes** (nodes not reachable from root)
3. **Verify service IDs** in recommendations match actual services
4. **Update seasonal content** (holiday services, seasonal treatments)

#### **Bundle Performance Review:**
1. **Analyze bundle acceptance rates**
2. **Update bundle pricing** based on individual service price changes
3. **Create new seasonal bundles**
4. **Retire underperforming bundles**

### **Quarterly Strategic Updates**

#### **Service Portfolio Review:**
1. **Add new trending services** (new techniques, popular treatments)
2. **Update service categories** if needed
3. **Refresh service descriptions** with current terminology
4. **Add new experience levels** if service complexity changes

#### **Decision Tree Evolution:**
1. **Add new decision paths** for new services
2. **Optimize popular paths** for better user experience
3. **Add more specific targeting** based on user feedback
4. **Update reasoning text** to be more compelling

### **Annual Content Overhaul**

#### **Complete System Review:**
1. **Audit all content files** for consistency
2. **Update visual evolution content** (colors, fonts, contexts)
3. **Refresh bundle strategies** based on year's performance
4. **Major decision tree restructuring** if needed

---

## 🎯 **Smart Hardcoded Intelligence Patterns**

### **Bundle Recommendation Logic**
Instead of AI, use smart hardcoded rules:

```typescript
// Pattern: Service Synergy Rules
const synergyRules = {
  'hair-cut': ['hair-styling', 'hair-treatment'],
  'makeup-application': ['hair-styling', 'eyebrow-shaping'],
  'facial': ['eyebrow-shaping', 'eyelash-extensions'],
  'wedding-makeup': ['hair-styling', 'trial-run']
};

// Pattern: Context-Based Recommendations  
const contextRules = {
  'wedding': ['premium-services', 'trial-runs', 'complete-looks'],
  'everyday': ['maintenance-services', 'quick-services'],
  'special-occasion': ['dramatic-services', 'photo-ready']
};
```

### **Experience Level Detection**
Instead of complex analysis, use response patterns:

```typescript
// Pattern: Response Analysis
const experienceIndicators = {
  beginner: ['help me choose', 'not sure', 'first time', 'guidance'],
  intermediate: ['usually get', 'prefer', 'like to try'],
  expert: ['specific technique', 'advanced', 'professional', 'technical terms']
};
```

### **Emotional State Detection**
Use keyword patterns and response confidence:

```typescript
// Pattern: Emotional Indicators
const emotionalKeywords = {
  uncertain: ['help', 'not sure', 'maybe', 'confused'],
  exploring: ['options', 'different', 'try', 'explore'],
  engaged: ['interested', 'tell me more', 'sounds good'],
  confident: ['definitely', 'exactly', 'perfect', 'yes'],
  celebratory: ['wedding', 'special', 'celebration', 'event']
};
```

---

## 🚀 **Implementation Best Practices**

### **Content Consistency Rules**

1. **Service IDs:** Always use kebab-case (e.g., 'hair-cut-and-style')
2. **Pricing:** Always include duration and price for accurate bundling
3. **Tags:** Use consistent tag vocabulary across all services
4. **Descriptions:** Keep to 1-2 sentences, focus on benefits
5. **Experience Levels:** Be realistic about skill requirements

### **Decision Tree Design Principles**

1. **Clear Questions:** Each question should have obvious, distinct answers
2. **Logical Flow:** Each path should feel natural and progressive
3. **Escape Hatches:** Always provide "I need help" or "Not sure" options
4. **Service Integration:** Every path should lead to actionable service recommendations
5. **Reasoning:** Always explain why services are recommended

### **Bundle Creation Guidelines**

1. **Natural Synergy:** Services should logically complement each other
2. **Meaningful Savings:** At least 15-20% discount from individual pricing
3. **Clear Value:** Bundle name and description should highlight the benefit
4. **Appropriate Sizing:** 2-4 services per bundle (not too overwhelming)
5. **Flexible Options:** Consider offering bundle variations

---

## 📈 **Success Metrics & KPIs**

### **Content Performance Indicators**

1. **Service Recommendation Accuracy:** Do users book recommended services?
2. **Decision Tree Completion Rate:** Do users reach service recommendations?
3. **Bundle Acceptance Rate:** Do users accept bundle suggestions?
4. **User Satisfaction:** Do users find the experience helpful?
5. **Conversion Rate:** Do consultations lead to bookings?

### **Content Health Metrics**

1. **Coverage:** Do all services appear in decision tree paths?
2. **Accessibility:** Can all services be reached through consultation?
3. **Relevance:** Are recommendations appropriate for user inputs?
4. **Freshness:** Is content updated regularly?
5. **Consistency:** Are descriptions and pricing accurate across all files?

---

This guide provides everything needed to maintain and expand the content system. The key is **intelligent hardcoding** - using smart, well-documented rules instead of complex AI systems for reliable, fast, and maintainable results.

