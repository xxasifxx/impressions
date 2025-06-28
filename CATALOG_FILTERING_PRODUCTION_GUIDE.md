# Catalog Filter Engine - Production Guide for Future Agents

## 🎯 **SYSTEM OVERVIEW**

The Catalog Filter Engine provides comprehensive service/product filtering with business rules, availability checking, and user eligibility validation. This system intelligently filters beauty service and product catalogs based on multiple criteria to present the most relevant and appropriate options to users.

### **Primary Function**
Filter large catalogs of services and products based on user criteria, business constraints, availability, and eligibility rules to provide personalized and appropriate recommendations.

### **Business Impact**
- Improves user experience by showing only relevant and available items
- Reduces booking conflicts through accurate availability filtering
- Ensures compliance with business rules and safety regulations
- Increases conversion rates through better item relevance

---

## 📊 **SCOPE & CONSTRAINTS**

### **What This System DOES:**
✅ Filters services/products by category, price, availability, and user preferences  
✅ Validates user eligibility based on age, experience, and health restrictions  
✅ Applies business rules for compliance, safety, and profitability  
✅ Checks real-time availability for services and inventory for products  
✅ Scores and ranks items by relevance and appropriateness  
✅ Provides detailed reasoning for inclusions and exclusions  
✅ Handles seasonal factors and promotional considerations  
✅ Works with up to 3000 total items (1000 services + 2000 products)  

### **What This System DOES NOT:**
❌ Make actual bookings or reservations  
❌ Process payments or financial transactions  
❌ Store user data or filtering history persistently  
❌ Integrate with external inventory or booking systems  
❌ Provide medical advice or override safety restrictions  
❌ Guarantee 100% availability accuracy (uses best available data)  

### **Performance Constraints:**
- **Response Time:** < 200ms for typical catalog filtering
- **Memory Usage:** < 200MB per filtering session
- **Input Limit:** Max 1000 services + 2000 products per operation
- **Accuracy Target:** 95%+ appropriate item inclusion/exclusion

---

## ✅ **SUCCESS CRITERIA**

### **Primary Success Metrics:**
1. **Filter Accuracy:** ≥95% appropriate item inclusion/exclusion
2. **Response Time:** ≤200ms for filtering completion
3. **Relevance Quality:** High relevance (≥0.8) correlates with ≥90% user satisfaction
4. **Availability Accuracy:** ≥98% accurate availability status

### **Secondary Success Metrics:**
1. **Business Compliance:** 100% compliance with safety and regulatory rules
2. **User Eligibility:** Accurate eligibility validation for all user types
3. **Filter Effectiveness:** Meaningful reduction in catalog size while maintaining quality
4. **Error Handling:** Graceful degradation for edge cases

---

## 🧪 **HAPPY PATH TESTING INTERFACE**

### **Quick Validation Test:**
```typescript
import { CatalogFilterEngine } from './CatalogFilterEngine';

// Test 1: Basic Category Filtering
const basicTest = {
  catalog: {
    services: [
      { id: 'haircut', name: 'Basic Haircut', price: 50, category: 'hair' },
      { id: 'facial', name: 'Basic Facial', price: 80, category: 'skincare' }
    ],
    products: [
      { id: 'shampoo', name: 'Professional Shampoo', price: 25, category: 'hair' },
      { id: 'moisturizer', name: 'Daily Moisturizer', price: 35, category: 'skincare' }
    ]
  },
  filterCriteria: {
    categories: ['hair'],
    priceRange: { min: 0, max: 100, currency: 'USD' }
  },
  userContext: {
    experienceLevel: 'beginner'
  },
  businessContext: {}
};

const engine = new CatalogFilterEngine();
const result = engine.filterCatalog(basicTest);

// Expected Results:
// result.filteredCatalog.services.length === 1 (haircut only)
// result.filteredCatalog.products.length === 1 (shampoo only)
// result.filterSummary.filterEffectiveness > 0.7
// result.metadata.processingTime < 200
```

### **Complete Happy Path Test Suite:**
```typescript
// Test 2: Price Range Filtering
const priceTest = {
  catalog: {
    services: [
      { id: 'budget-cut', name: 'Budget Cut', price: 30, category: 'hair' },
      { id: 'premium-cut', name: 'Premium Cut', price: 150, category: 'hair' }
    ],
    products: []
  },
  filterCriteria: {
    priceRange: { min: 25, max: 100, currency: 'USD' }
  },
  userContext: { experienceLevel: 'intermediate' },
  businessContext: {}
};

// Expected: Only budget-cut included (premium-cut exceeds price range)

// Test 3: Experience Level Filtering
const experienceTest = {
  catalog: {
    services: [
      { id: 'basic-color', name: 'Basic Color', complexity: 'basic', category: 'hair' },
      { id: 'expert-color', name: 'Color Correction', complexity: 'expert', category: 'hair' }
    ],
    products: []
  },
  filterCriteria: {
    experienceLevel: 'beginner'
  },
  userContext: { experienceLevel: 'beginner' },
  businessContext: {}
};

// Expected: Only basic-color included (expert-color too complex for beginner)

// Test 4: Availability Filtering
const availabilityTest = {
  catalog: {
    services: [
      { id: 'available-service', name: 'Available Service', category: 'hair' }
    ],
    products: [
      { id: 'in-stock-product', name: 'In Stock Product', category: 'hair' }
    ]
  },
  filterCriteria: {
    availability: { urgency: 'high' }
  },
  userContext: { experienceLevel: 'intermediate' },
  businessContext: {
    inventoryLevels: [
      { itemId: 'in-stock-product', availableStock: 10, currentStock: 10, reservedStock: 0, reorderPoint: 5 }
    ]
  }
};

// Expected: Both items included if available

// Test 5: Performance Test
const performanceTest = {
  catalog: {
    services: Array.from({ length: 100 }, (_, i) => ({
      id: `service-${i}`,
      name: `Service ${i}`,
      price: 50 + i,
      category: 'hair'
    })),
    products: Array.from({ length: 200 }, (_, i) => ({
      id: `product-${i}`,
      name: `Product ${i}`,
      price: 25 + i,
      category: 'hair'
    }))
  },
  filterCriteria: {
    categories: ['hair'],
    priceRange: { min: 0, max: 200, currency: 'USD' }
  },
  userContext: { experienceLevel: 'intermediate' },
  businessContext: {}
};

const startTime = Date.now();
const result = engine.filterCatalog(performanceTest);
const duration = Date.now() - startTime;

// Expected: duration < 200ms
```

### **Validation Checklist:**
- [ ] Basic category filtering works correctly
- [ ] Price range filtering excludes items outside range
- [ ] Experience level filtering prevents inappropriate complexity
- [ ] Availability filtering respects urgency requirements
- [ ] Large catalog filtering completes within 200ms performance target
- [ ] Filter effectiveness scores indicate meaningful filtering

---

## 🚨 **KNOWN FAILURE STATES & DIAGNOSTICS**

### **Failure State 1: No Items Filtered (Empty Results)**

**Symptoms:**
- Empty filteredCatalog.services and filteredCatalog.products arrays
- High rejection count in filterSummary
- Low filter effectiveness score

**Diagnostic Steps:**
1. Check filter criteria restrictiveness: `result.appliedFilters`
2. Examine rejection reasons: `result.rejectedItems`
3. Review availability constraints: `result.diagnostics.processing`
4. Verify business rule compliance

**Common Causes:**
- Overly restrictive filter criteria (too narrow price range, limited categories)
- Availability constraints eliminating all options
- Business rules blocking all items (age restrictions, safety rules)
- Invalid or conflicting filter criteria

**Resolution:**
```typescript
// Debug empty results
const diagnostics = engine.getDiagnosticInfo(input);
console.log('Filter effectiveness:', diagnostics.filtering.effectiveness);
console.log('Rejection reasons:', result.rejectedItems.map(item => item.rejectionReasons));

// Check for overly restrictive criteria
if (result.filterSummary.rejectedCount.total > result.filterSummary.originalCount.total * 0.9) {
  console.warn('Filters may be too restrictive');
}

// Examine applied filters
result.appliedFilters.forEach(filter => {
  console.log(`${filter.filterName}: ${filter.itemsAffected} items affected`);
});
```

### **Failure State 2: Poor Performance (>200ms)**

**Symptoms:**
- Processing time exceeds 200ms target
- High memory usage during filtering
- Browser becomes unresponsive

**Diagnostic Steps:**
1. Check catalog size: Count total services + products
2. Monitor filter complexity: Number of criteria and rules
3. Profile individual filter performance
4. Check for infinite loops in business rule evaluation

**Common Causes:**
- Large catalog size (>3000 total items)
- Complex business rule evaluation
- Inefficient availability checking
- Memory leaks in filtering logic

**Resolution:**
```typescript
// Performance monitoring
const startTime = performance.now();
const result = engine.filterCatalog(input);
const endTime = performance.now();
console.log(`Filtering took ${endTime - startTime}ms`);

// Catalog size check
const totalItems = input.catalog.services.length + input.catalog.products.length;
if (totalItems > 3000) {
  console.warn('Catalog exceeds recommended size limit');
}

// Performance breakdown
const metrics = result.metadata.performanceMetrics;
console.log('Performance breakdown:', {
  categoryFilter: metrics.categoryFilterTime,
  priceFilter: metrics.priceFilterTime,
  availabilityFilter: metrics.availabilityFilterTime,
  businessRules: metrics.businessRuleFilterTime,
  scoring: metrics.scoringTime
});
```

### **Failure State 3: Incorrect Availability Status**

**Symptoms:**
- Items showing as available when they're not
- Items showing as unavailable when they are
- Inconsistent availability information

**Diagnostic Steps:**
1. Check availability data sources: `businessContext.inventoryLevels`
2. Verify availability calculation logic
3. Test with known availability scenarios
4. Check for data synchronization issues

**Common Causes:**
- Stale or missing inventory data
- Incorrect availability calculation logic
- Business context data inconsistencies
- External system integration failures

**Resolution:**
```typescript
// Debug availability issues
const availabilityDiag = result.filteredCatalog.services.map(service => ({
  id: service.id,
  available: service.availability.available,
  staffAvailable: service.availability.staffAvailable,
  equipmentAvailable: service.availability.equipmentAvailable,
  estimatedWait: service.availability.estimatedWaitTime
}));

console.log('Service availability status:', availabilityDiag);

// Check inventory levels
const inventoryDiag = result.filteredCatalog.products.map(product => ({
  id: product.id,
  inStock: product.availability.inStock,
  stockLevel: product.availability.stockLevel,
  backorderAvailable: product.availability.backorderAvailable
}));

console.log('Product availability status:', inventoryDiag);
```

### **Failure State 4: Inappropriate Item Recommendations**

**Symptoms:**
- Beginner users getting expert-level recommendations
- Items that violate user restrictions being included
- Low relevance scores for filtered items

**Diagnostic Steps:**
1. Check eligibility validation: `item.eligibility`
2. Review experience level matching
3. Verify business rule application
4. Test with known user profiles

**Common Causes:**
- Incorrect experience level classification
- Missing or incomplete user restrictions
- Business rule evaluation errors
- Eligibility checking logic failures

**Resolution:**
```typescript
// Debug eligibility issues
const eligibilityDiag = result.filteredCatalog.services.map(service => ({
  id: service.id,
  eligible: service.eligibility.eligible,
  eligibilityScore: service.eligibility.eligibilityScore,
  restrictions: service.eligibility.restrictions,
  warnings: service.warnings
}));

console.log('Service eligibility status:', eligibilityDiag);

// Check experience matching
const experienceGaps = result.filteredCatalog.services.map(service => {
  const serviceComplexity = getServiceComplexity(service);
  const userLevel = getUserExperienceLevel(input.userContext.experienceLevel);
  return {
    id: service.id,
    serviceComplexity,
    userLevel,
    gap: Math.abs(serviceComplexity - userLevel)
  };
});

console.log('Experience level gaps:', experienceGaps);
```

---

## 🔧 **TROUBLESHOOTING PROCEDURES**

### **Step 1: Quick Health Check**
```typescript
// Run this to verify system is working
const healthCheck = engine.runHealthCheck();
console.log('Health check result:', {
  healthy: healthCheck.healthy,
  issues: healthCheck.issues,
  performance: healthCheck.performance
});

// Expected: healthy=true, performance<200ms, issues=[]
```

### **Step 2: Rule Validation**
```typescript
// Verify filter rules are consistent
const ruleValidation = engine.validateFilterRules();
console.log('Rule validation:', {
  valid: ruleValidation.valid,
  issues: ruleValidation.issues,
  warnings: ruleValidation.warnings
});

// Expected: valid=true, minimal issues/warnings
```

### **Step 3: Filter Combination Testing**
```typescript
// Test various filter combinations
const combinationTest = engine.testFilterCombinations();
console.log('Filter combination test:', {
  passed: combinationTest.passed,
  failed: combinationTest.failed,
  issues: combinationTest.issues
});

// Expected: passed > failed, minimal issues
```

### **Step 4: Input Validation**
```typescript
// Test with known good input
const testInput = {
  catalog: {
    services: [{ id: 'test', name: 'Test Service', price: 50, category: 'hair' }],
    products: [{ id: 'test', name: 'Test Product', price: 25, category: 'hair' }]
  },
  filterCriteria: { categories: ['hair'] },
  userContext: { experienceLevel: 'intermediate' },
  businessContext: {}
};

const diagnostics = engine.getDiagnosticInfo(testInput);
console.log('Input diagnostics:', diagnostics.input);

// Expected: Valid input with reasonable catalog size
```

### **Step 5: Component Analysis**
```typescript
// Test individual filtering components
const result = engine.filterCatalog(testInput);

console.log('Filter Summary:', {
  effectiveness: result.filterSummary.filterEffectiveness,
  averageRelevance: result.filterSummary.averageRelevanceScore,
  reductionRate: result.filterSummary.rejectedCount.total / result.filterSummary.originalCount.total
});

console.log('Applied Filters:', result.appliedFilters.map(f => ({
  name: f.filterName,
  processingTime: f.processingTime,
  impact: f.impact.reductionPercentage
})));

console.log('Performance Metrics:', {
  totalTime: result.metadata.processingTime,
  filtersApplied: result.metadata.filtersApplied,
  rulesEvaluated: result.metadata.rulesEvaluated
});
```

---

## 📈 **MONITORING & MAINTENANCE**

### **Key Metrics to Track:**
1. **Filter Effectiveness:** Average effectiveness score across all filtering operations
2. **Response Time Distribution:** 95th percentile processing time
3. **Availability Accuracy:** % of availability predictions that match actual status
4. **User Satisfaction:** Correlation between relevance scores and user actions

### **Weekly Maintenance Tasks:**
1. Review filter effectiveness with user behavior data
2. Update availability rules based on booking patterns
3. Adjust business rules based on policy changes
4. Performance optimization if response times increase

### **Monthly Reviews:**
1. Comprehensive accuracy testing with real catalog data
2. Business rule compliance audit
3. Performance benchmarking and optimization
4. Documentation updates and rule refinement

### **Quarterly Assessments:**
1. Filter algorithm effectiveness analysis
2. User experience impact measurement
3. Business impact assessment (conversion rates, satisfaction)
4. System scalability and capacity planning

---

## 🆘 **EMERGENCY PROCEDURES**

### **If System Completely Fails:**
1. **Immediate Fallback:** Return basic category-based filtering with warnings
2. **Error Logging:** Capture full input and error details for analysis
3. **User Impact:** Graceful degradation to manual catalog browsing
4. **Recovery:** Restart with simplified filtering rules

### **Emergency Fallback Code:**
```typescript
// Emergency fallback implementation
function emergencyFilterFallback(input: FilterInput): FilterResult {
  // Basic category filtering only
  const basicServices = input.catalog.services
    .filter(service => !input.filterCriteria.categories || 
      input.filterCriteria.categories.includes(service.category || ''))
    .slice(0, 20)
    .map(service => ({
      ...service,
      filterScore: 0.5,
      matchReasons: ['Emergency fallback - basic category filtering only'],
      warnings: [{ type: 'compatibility', severity: 'high', message: 'System error - manual review recommended' }],
      recommendations: [],
      availability: { available: true, staffAvailable: true, equipmentAvailable: true, estimatedWaitTime: 60 },
      eligibility: { eligible: true, eligibilityScore: 0.5, requirements: [], restrictions: [], recommendations: [] }
    }));

  const basicProducts = input.catalog.products
    .filter(product => !input.filterCriteria.categories || 
      input.filterCriteria.categories.includes(product.category || ''))
    .slice(0, 30)
    .map(product => ({
      ...product,
      filterScore: 0.5,
      matchReasons: ['Emergency fallback - basic category filtering only'],
      warnings: [{ type: 'compatibility', severity: 'high', message: 'System error - manual review recommended' }],
      recommendations: [],
      availability: { inStock: true, stockLevel: 'medium', backorderAvailable: false },
      eligibility: { eligible: true, eligibilityScore: 0.5, requirements: [], restrictions: [], recommendations: [] }
    }));

  return {
    filteredCatalog: { services: basicServices, products: basicProducts },
    filterSummary: {
      originalCount: { services: input.catalog.services.length, products: input.catalog.products.length, total: input.catalog.services.length + input.catalog.products.length },
      filteredCount: { services: basicServices.length, products: basicProducts.length, total: basicServices.length + basicProducts.length },
      rejectedCount: { services: 0, products: 0, total: 0 },
      filterEffectiveness: 0.3,
      averageRelevanceScore: 0.5,
      topCategories: []
    },
    appliedFilters: [{ filterType: 'category', filterName: 'Emergency Category Filter', criteria: input.filterCriteria.categories, itemsAffected: 0, impact: { reductionPercentage: 0, qualityImprovement: 0, performanceImpact: 0, userSatisfactionImpact: 0 }, processingTime: 0 }],
    rejectedItems: [],
    metadata: {
      filterTimestamp: new Date(),
      processingTime: 0,
      filtersApplied: 1,
      rulesEvaluated: 1,
      performanceMetrics: { totalFilterTime: 0, categoryFilterTime: 0, priceFilterTime: 0, availabilityFilterTime: 0, businessRuleFilterTime: 0, scoringTime: 0 }
    }
  };
}
```

### **Partial Failure Recovery:**
```typescript
// If specific filtering components fail, use conservative defaults
const conservativeConfig = {
  maxResults: 50,
  minRelevanceScore: 0.4,
  enableCaching: false,
  enablePerformanceMonitoring: true,
  enableBusinessRules: false, // Disable complex business rules
  enableSeasonalFactors: false, // Disable seasonal adjustments
  weights: {
    relevance: 0.5,
    availability: 0.3,
    userPreference: 0.2,
    businessValue: 0.0,
    experienceMatch: 0.0
  }
};

const conservativeEngine = new CatalogFilterEngine(conservativeConfig);
```

---

## 📞 **SUPPORT CONTACTS**

**For Future Agents:**
- This documentation should provide complete troubleshooting guidance
- All diagnostic procedures are self-contained
- No external dependencies required for debugging
- Business rules are human-readable and modifiable

**System Dependencies:**
- No external APIs or databases required for core filtering
- No network connectivity needed for basic operations
- Pure TypeScript/JavaScript implementation
- Self-contained business logic and rules

This system is designed to be **completely self-diagnosable** by future agents using the procedures documented above.

