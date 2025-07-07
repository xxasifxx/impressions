# Current System Characterization - Forensic Analysis

**Analysis Date**: July 6, 2025 - 22:30 UTC
**Objective**: Document actual behavior of existing static recommendation system without assumptions

## System Architecture - VERIFIED

### Input Interface
**Function**: `getUnifiedServiceRecommendations(responses)`
**Location**: `src/data/unifiedConsultationFlow.ts:343`

**Input Type**:
```typescript
responses: Record<string, { 
  optionId: string; 
  weight: number; 
  domains?: string[] 
}>
```

**Input Source**: User responses collected through `UnifiedConsultationFlow.tsx` component

### Decision Tree Structure - VERIFIED

**Total Decision Nodes**: 449 lines of decision tree logic
**Leaf Nodes**: 16 terminal nodes that trigger recommendations
**Root Question**: "What brings you here today?"

**Primary Motivations (Root Options)**:
1. `special-event` (weight: 8) → leads to event-type questions
2. `regular-maintenance` (weight: 6) → leads to maintenance-areas
3. `appearance-enhancement` (weight: 7) → leads to enhancement-goals  
4. `skin-concerns` (weight: 7) → leads to skin-issues

**Navigation Logic**: 
- User selects option → adds to responses with weight
- If `isLeaf: true` OR no `nextNodeId` → triggers recommendation generation
- Otherwise → navigates to next question node

### Recommendation Algorithm - ACTUAL BEHAVIOR

**Step 1: Weight Calculation**
```typescript
const totalWeight = Object.values(responses).reduce((sum, r) => sum + r.weight, 0);
const avgWeight = totalWeight / Object.keys(responses).length;
```

**Step 2: Domain Detection**
```typescript
const relevantDomains = new Set<string>();
// Collects all domains from user responses
```

**Step 3: Primary Motivation Extraction**
```typescript
const primaryMotivation = firstResponse?.optionId || 'special-event';
// Uses FIRST response only, fallback to 'special-event'
```

**Step 4: Static Service Mapping**
Hardcoded mapping object with 6 motivation categories:
- `special-event`: hair-precision-cut, hair-balayage, blowout-styling, makeup-bridal, makeup-special-event, gold-facial, dermaplaning
- `wedding`: hair-balayage, blowout-styling, hair-extensions, makeup-bridal, lash-extensions, gold-facial, hydra-facial, dermaplaning  
- `professional`: hair-precision-cut, hair-color, makeup-natural, brow-styling, hydra-facial
- `regular-maintenance`: hair-precision-cut, hair-color, deep-conditioning, brow-styling, lash-extensions, eyebrow-threading, hydra-facial
- `appearance-enhancement`: hair-balayage, hair-extensions, keratin-treatment, lash-extensions, brow-styling, gold-facial, led-light-therapy
- `skin-concerns`: gold-facial, hydra-facial, led-light-therapy, dermaplaning

**Step 5: Premium Service Enhancement**
```typescript
if (avgWeight >= 8) {
  // Adds premium services: hair-extensions, keratin-treatment, lash-extensions, gold-facial
}
```

**Step 6: Cross-Domain Package Generation**
- `avgWeight >= 9` OR `primaryMotivation === 'wedding'` → adds 'bridal-complete'
- `primaryMotivation === 'professional'` OR `'appearance-enhancement'` → adds 'professional-polish'  
- `primaryMotivation === 'regular-maintenance'` AND `avgWeight >= 7` → adds 'maintenance-package'

### Output Structure - VERIFIED

**Return Type**: `UnifiedConsultationResult`
```typescript
{
  customerMotivation: string,           // Primary motivation from first response
  recommendedServices: {
    'hair-salon': string[],            // Service IDs for hair domain
    'makeup-studio': string[],         // Service IDs for makeup domain  
    'med-spa': string[]                // Service IDs for med-spa domain
  },
  crossDomainPackages: string[],       // Package IDs based on motivation/weight
  totalWeight: number                  // Sum of all response weights
}
```

## Critical Behavioral Characteristics

### Deterministic Behavior
- ✅ Same input always produces same output
- ✅ No randomization or external dependencies
- ✅ Pure function with predictable logic

### Logic Limitations - IDENTIFIED
1. **First Response Bias**: Only uses first response for primary motivation, ignores subsequent responses for motivation
2. **Static Mapping**: No learning or adaptation, fixed service mappings
3. **Weight Threshold Logic**: Hard-coded thresholds (8, 9, 7) with no justification
4. **Domain Filtering**: If no domains specified in responses, includes all domains
5. **Fallback Behavior**: Defaults to 'special-event' if no responses provided

### Edge Cases - DOCUMENTED
1. **Empty Input**: `responses = {}` → Returns special-event recommendations with totalWeight: 0
2. **Single Response**: Works correctly, uses that response as primary motivation
3. **Mixed Domains**: Correctly aggregates domains from all responses
4. **High Weight Responses**: Triggers premium service additions at avgWeight >= 8

### Integration Points - VERIFIED
**Called From**: `src/components/UnifiedConsultationFlow.tsx:51`
**Trigger Condition**: When user reaches leaf node OR node with no nextNodeId
**State Management**: Result stored in React state as `recommendations`

## Current System Strengths
- ✅ **Functional**: Actually works and produces recommendations
- ✅ **Fast**: No external dependencies, immediate response
- ✅ **Predictable**: Deterministic behavior, easy to debug
- ✅ **Integrated**: Properly connected to UI flow

## Current System Weaknesses  
- ❌ **Static**: No personalization or learning capability
- ❌ **Simplistic**: Basic weight-based logic only
- ❌ **Limited**: Fixed service mappings, no dynamic discovery
- ❌ **Biased**: Over-relies on first response for motivation

## Baseline Established
This system serves as our **Golden Master** for regression testing. Any engine integration must maintain or improve upon this baseline functionality while preserving the deterministic, fast response characteristics that currently work.

**Next Phase**: Static analysis of engines to understand their interfaces and complexity before attempting any integration.

