# Experience Analysis Engine - Production Guide for Future Agents

## 🎯 **SYSTEM OVERVIEW**

The Experience Analysis Engine determines user expertise levels in beauty consultations using hardcoded pattern matching. This system replaces AI-based analysis with reliable, fast, deterministic logic.

### **Primary Function**
Analyze user consultation responses to classify experience level (beginner → intermediate → advanced → expert) and generate appropriate service recommendations.

### **Business Impact**
- Improves service recommendations accuracy
- Reduces inappropriate service suggestions
- Enhances user satisfaction through personalized guidance
- Prevents beginners from booking overly complex services

---

## 📊 **SCOPE & CONSTRAINTS**

### **What This System DOES:**
✅ Analyzes text responses for experience indicators  
✅ Classifies users into 4 experience levels  
✅ Generates service complexity recommendations  
✅ Provides guidance level suggestions  
✅ Detects service context (hair, makeup, skincare, wellness)  
✅ Handles multiple languages (basic support)  
✅ Works with 1-20 consultation responses  

### **What This System DOES NOT:**
❌ Analyze images or video content  
❌ Access external APIs or databases  
❌ Store user data persistently  
❌ Handle real-time conversation analysis  
❌ Provide medical or safety advice  
❌ Guarantee 100% accuracy (uses confidence scoring)  

### **Performance Constraints:**
- **Response Time:** < 1000ms for typical analysis
- **Memory Usage:** < 50MB per analysis session
- **Input Limit:** Max 10,000 characters per response
- **Accuracy Target:** 85%+ correct classification on test data

---

## ✅ **SUCCESS CRITERIA**

### **Primary Success Metrics:**
1. **Classification Accuracy:** ≥85% correct experience level detection
2. **Response Time:** ≤1000ms for analysis completion
3. **Confidence Reliability:** High confidence (≥0.7) correlates with ≥90% accuracy
4. **Recommendation Appropriateness:** Suggested services match user capability

### **Secondary Success Metrics:**
1. **Pattern Match Coverage:** ≥60% of responses trigger pattern matches
2. **Context Detection:** ≥80% accurate service category identification
3. **Error Handling:** Graceful degradation for edge cases
4. **Consistency:** Identical inputs produce identical outputs

---

## 🧪 **HAPPY PATH TESTING INTERFACE**

### **Quick Validation Test:**
```typescript
import { ExperienceAnalysisEngine } from './ExperienceAnalysisEngine';

// Test 1: Beginner Classification
const beginnerTest = {
  responses: [
    { text: "I'm not sure what I want. This is my first time getting highlights.", timestamp: new Date() },
    { text: "Can you help me choose what would look good?", timestamp: new Date() }
  ]
};

const engine = new ExperienceAnalysisEngine();
const result = engine.analyzeExperience(beginnerTest);

// Expected Results:
// result.experienceLevel === 'beginner'
// result.confidence === 'medium' or 'high'
// result.recommendations.suggestedServiceComplexity === 'simple'
// result.recommendations.recommendedGuidanceLevel === 'comprehensive'
```

### **Complete Happy Path Test Suite:**
```typescript
// Test 2: Expert Classification
const expertTest = {
  responses: [
    { text: "I need color correction using advanced techniques and specific toner formulas.", timestamp: new Date() },
    { text: "I understand the bleaching process and color theory principles.", timestamp: new Date() }
  ]
};

// Expected: experienceLevel === 'expert', suggestedServiceComplexity === 'advanced'

// Test 3: Context Detection
const makeupTest = {
  responses: [
    { text: "I need contouring and highlighting for my wedding photos.", timestamp: new Date() }
  ]
};

// Expected: Service context detected as 'makeup'

// Test 4: Performance Test
const startTime = Date.now();
const result = engine.analyzeExperience(beginnerTest);
const duration = Date.now() - startTime;

// Expected: duration < 1000ms
```

### **Validation Checklist:**
- [ ] Beginner users get 'simple' service complexity
- [ ] Expert users get 'advanced' service complexity  
- [ ] High confidence correlates with clear language patterns
- [ ] Context detection works for hair/makeup/skincare/wellness
- [ ] Analysis completes within 1000ms
- [ ] Identical inputs produce identical outputs

---

## 🚨 **KNOWN FAILURE STATES & DIAGNOSTICS**

### **Failure State 1: Incorrect Experience Classification**

**Symptoms:**
- Beginner classified as expert (or vice versa)
- Low confidence scores across all analyses
- Inappropriate service recommendations

**Diagnostic Steps:**
1. Check pattern matching results: `result.vocabulary.matchedPatterns`
2. Examine confidence scores: `result.confidence`
3. Review input text quality and length
4. Verify pattern definitions in `experiencePatterns.ts`

**Common Causes:**
- Insufficient response text (< 10 words)
- Mixed signals in responses (beginner + expert language)
- Missing patterns for specific terminology
- Incorrect pattern weights

**Resolution:**
```typescript
// Debug pattern matching
const debugEngine = new ExperienceAnalysisEngine({ debugMode: true });
const result = debugEngine.analyzeExperience(input);
console.log('Pattern matches:', result.vocabulary.evidence);
console.log('Technical matches:', result.technicalKnowledge.evidence);
```

### **Failure State 2: Poor Performance (>1000ms)**

**Symptoms:**
- Analysis takes longer than 1000ms
- Memory usage spikes
- Browser becomes unresponsive

**Diagnostic Steps:**
1. Check input size: Count total characters in responses
2. Monitor pattern matching complexity
3. Profile fuzzy matching performance
4. Check for infinite loops in pattern analysis

**Common Causes:**
- Extremely long input text (>10,000 characters)
- Complex fuzzy matching on large vocabulary
- Inefficient string operations
- Memory leaks in pattern caching

**Resolution:**
```typescript
// Performance monitoring
const startTime = performance.now();
const result = engine.analyzeExperience(input);
const endTime = performance.now();
console.log(`Analysis took ${endTime - startTime}ms`);

// Input size check
const totalChars = input.responses.reduce((sum, r) => sum + r.text.length, 0);
if (totalChars > 10000) {
  console.warn('Input exceeds recommended size limit');
}
```

### **Failure State 3: Context Detection Failure**

**Symptoms:**
- Service context returns 'general' for obvious beauty terms
- Context-specific patterns not triggering
- Recommendations don't match service type

**Diagnostic Steps:**
1. Check service category detection logic
2. Verify keyword matching in `detectServiceContext()`
3. Review context-specific patterns
4. Test with isolated service terms

**Common Causes:**
- Missing keywords in category definitions
- Typos in service terminology
- Insufficient text for context detection
- Competing contexts with similar scores

**Resolution:**
```typescript
// Debug context detection
const allText = responses.map(r => r.text).join(' ').toLowerCase();
console.log('Combined text:', allText);

const categoryKeywords = {
  hair: ['hair', 'cut', 'color', 'style', 'trim', 'highlights'],
  makeup: ['makeup', 'foundation', 'lipstick', 'eyeshadow'],
  // ... check if keywords match your text
};
```

### **Failure State 4: Low Confidence Scores**

**Symptoms:**
- All analyses return 'low' confidence
- Pattern matches are sparse
- Recommendations are overly cautious

**Diagnostic Steps:**
1. Check pattern match coverage
2. Review confidence calculation logic
3. Verify pattern definitions are comprehensive
4. Test with known good examples

**Common Causes:**
- Incomplete pattern definitions
- Overly strict confidence thresholds
- Poor quality input text
- Missing domain-specific vocabulary

**Resolution:**
```typescript
// Confidence debugging
console.log('Vocabulary confidence:', result.vocabulary.confidence);
console.log('Technical confidence:', result.technicalKnowledge.confidence);
console.log('Overall confidence calculation:', result.confidence);

// Check pattern coverage
const totalPatterns = VOCABULARY_PATTERNS.length + TECHNICAL_KNOWLEDGE_PATTERNS.length;
const matchedPatterns = result.vocabulary.matchedPatterns.length + 
                       result.technicalKnowledge.matchedPatterns.length;
console.log(`Pattern coverage: ${matchedPatterns}/${totalPatterns}`);
```

---

## 🔧 **TROUBLESHOOTING PROCEDURES**

### **Step 1: Quick Health Check**
```typescript
// Run this to verify system is working
const healthCheck = {
  responses: [
    { text: "I need a simple haircut, nothing fancy", timestamp: new Date() }
  ]
};

const result = engine.analyzeExperience(healthCheck);
console.log('Health check result:', {
  level: result.experienceLevel,
  confidence: result.confidence,
  complexity: result.recommendations.suggestedServiceComplexity
});

// Expected: level='beginner', confidence='medium'+'high', complexity='simple'
```

### **Step 2: Pattern Validation**
```typescript
// Verify patterns are loading correctly
import { VOCABULARY_PATTERNS, TECHNICAL_KNOWLEDGE_PATTERNS } from '../data/experiencePatterns';

console.log('Vocabulary patterns loaded:', VOCABULARY_PATTERNS.length);
console.log('Technical patterns loaded:', TECHNICAL_KNOWLEDGE_PATTERNS.length);

// Expected: 5+ vocabulary patterns, 4+ technical patterns
```

### **Step 3: Performance Baseline**
```typescript
// Establish performance baseline
const performanceTest = {
  responses: Array(5).fill(null).map((_, i) => ({
    text: `Response ${i} with beauty terms like balayage and contouring`,
    timestamp: new Date()
  }))
};

const times = [];
for (let i = 0; i < 10; i++) {
  const start = performance.now();
  engine.analyzeExperience(performanceTest);
  times.push(performance.now() - start);
}

const avgTime = times.reduce((a, b) => a + b) / times.length;
console.log(`Average analysis time: ${avgTime}ms`);

// Expected: <500ms average
```

### **Step 4: Error Recovery**
```typescript
// Test error handling
const errorTests = [
  { responses: [] }, // Empty input
  { responses: [{ text: "", timestamp: new Date() }] }, // Empty text
  { responses: [{ text: "a".repeat(20000), timestamp: new Date() }] } // Oversized input
];

errorTests.forEach((test, i) => {
  try {
    const result = engine.analyzeExperience(test);
    console.log(`Error test ${i} passed:`, result.experienceLevel);
  } catch (error) {
    console.error(`Error test ${i} failed:`, error.message);
  }
});
```

---

## 📈 **MONITORING & MAINTENANCE**

### **Key Metrics to Track:**
1. **Classification Distribution:** % of users in each experience level
2. **Confidence Score Distribution:** Average confidence by experience level
3. **Performance Metrics:** 95th percentile response time
4. **Error Rates:** % of analyses that fail or return low confidence

### **Monthly Maintenance Tasks:**
1. Review classification accuracy with sample data
2. Update patterns based on new beauty terminology
3. Performance optimization if response times increase
4. Pattern weight adjustment based on user feedback

### **Quarterly Reviews:**
1. Comprehensive accuracy testing with real consultation data
2. Pattern effectiveness analysis
3. Performance benchmarking
4. Documentation updates

---

## 🆘 **EMERGENCY PROCEDURES**

### **If System Completely Fails:**
1. **Immediate Fallback:** Return default beginner classification
2. **Error Logging:** Capture full input and error details
3. **User Impact:** Graceful degradation to basic recommendations
4. **Recovery:** Restart with simplified pattern matching

### **Emergency Fallback Code:**
```typescript
// Emergency fallback implementation
function emergencyFallback(input: ExperienceAnalysisInput): ExperienceAnalysisResult {
  return {
    experienceLevel: 'beginner',
    confidence: 'low',
    overallScore: 0.2,
    recommendations: {
      suggestedServiceComplexity: 'simple',
      recommendedGuidanceLevel: 'comprehensive',
      appropriateServiceTypes: ['basic-services'],
      cautionAreas: ['System in emergency mode - manual review recommended']
    },
    // ... other required fields with safe defaults
  };
}
```

---

## 📞 **SUPPORT CONTACTS**

**For Future Agents:**
- This documentation should provide complete troubleshooting guidance
- All diagnostic procedures are self-contained
- No external dependencies required for debugging
- Pattern definitions are human-readable and modifiable

**System Dependencies:**
- No external APIs
- No database connections  
- No network requirements
- Pure TypeScript/JavaScript implementation

This system is designed to be **completely self-diagnosable** by future agents using the procedures documented above.

