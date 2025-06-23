# Decision Tree Structure for Conversational Consultation

## Hair Salon Decision Tree

```
Root: "What brings you here today?"
├── "Special Event" (weight: varies by event)
│   ├── "Wedding" (weight: 10)
│   │   ├── "This month" (weight: 8) → "Daily styling" (weight: 9) → END
│   │   ├── "Next month" (weight: 10) → "Special occasions" (weight: 7) → END
│   │   └── "Few months" (weight: 9) → "Wash & go" (weight: 5) → END
│   ├── "Date night" (weight: 7)
│   │   ├── "Romantic" → "Timeline" → END
│   │   └── "Fun" → "Timeline" → END
│   ├── "Work event" (weight: 8)
│   │   ├── "Interview" → "Timeline" → END
│   │   └── "Presentation" → "Timeline" → END
│   └── "Party" (weight: 6)
│       ├── "Glamorous" → "Timeline" → END
│       └── "Fun" → "Timeline" → END
├── "Regular Care" 
│   ├── "Cut only" (weight: 6)
│   │   ├── "Monthly" (weight: 9) → "No concerns" (weight: 5) → END
│   │   ├── "6 weeks" (weight: 8) → "Growth goals" (weight: 6) → END
│   │   └── "Quarterly" (weight: 6) → "Damage repair" (weight: 8) → END
│   ├── "Cut & color" (weight: 9)
│   │   ├── "Monthly" → "Concerns" → END
│   │   └── "6 weeks" → "Concerns" → END
│   └── "Full service" (weight: 10)
│       ├── "Monthly" → "Concerns" → END
│       └── "As needed" → "Concerns" → END
└── "Ready for change"
    ├── "Subtle refresh" (weight: 6)
    │   ├── "New chapter" (weight: 8) → "Classic style" (weight: 7) → END
    │   ├── "Confidence boost" (weight: 7) → "Modern style" (weight: 8) → END
    │   └── "Bored" (weight: 6) → "Natural style" (weight: 7) → END
    ├── "Noticeable change" (weight: 8)
    │   ├── "New chapter" → "Style preference" → END
    │   ├── "Confidence boost" → "Style preference" → END
    │   └── "Milestone" (weight: 8) → "Style preference" → END
    └── "Dramatic transformation" (weight: 10)
        ├── "New chapter" → "Style preference" → END
        ├── "Confidence boost" → "Style preference" → END
        └── "Complete makeover" (weight: 10) → "Style preference" → END
```

## Makeup Studio Decision Tree

```
Root: "What brings you here?"
├── "Special Event"
│   ├── "Wedding" (weight: 10)
│   │   ├── "Bride" → "Experience level" → END
│   │   └── "Bridal party" (weight: 9) → "Experience level" → END
│   ├── "Photoshoot" (weight: 9)
│   │   ├── "Professional" → "Experience level" → END
│   │   └── "Personal" → "Experience level" → END
│   ├── "Date night" (weight: 7)
│   │   ├── "Romantic" → "Experience level" → END
│   │   └── "Fun" → "Experience level" → END
│   └── "Party" (weight: 8)
│       ├── "Glamorous" → "Experience level" → END
│       └── "Natural glam" → "Experience level" → END
├── "Learn makeup"
│   ├── "Complete beginner" (weight: 10)
│   │   ├── "Everyday routine" (weight: 9) → END
│   │   ├── "Special occasions" (weight: 8) → END
│   │   └── "Product knowledge" (weight: 8) → END
│   ├── "Some basics" (weight: 8)
│   │   ├── "Everyday routine" → END
│   │   ├── "Special occasions" → END
│   │   └── "Specific techniques" (weight: 7) → END
│   └── "Pretty comfortable" (weight: 6)
│       ├── "Special occasions" → END
│       ├── "Specific techniques" → END
│       └── "Advanced techniques" (weight: 4) → END
└── "Just exploring"
    ├── "Curious about makeup" → "Learning goals" → END
    ├── "Considering services" → "Event type" → END
    └── "Building confidence" → "Learning goals" → END
```

## Med Spa Decision Tree

```
Root: "What brings you here?"
├── "Stress relief" (weight: 9)
│   ├── "Quick refresh" (weight: 6)
│   │   ├── "1-2 hours" → END
│   │   └── "Flexible timing" (weight: 7) → END
│   ├── "Half day" (weight: 9)
│   │   ├── "3-4 hours" → END
│   │   └── "Comprehensive" → END
│   └── "Full day" (weight: 10)
│       ├── "5+ hours" → END
│       └── "Ultimate experience" → END
├── "Me time" (weight: 8)
│   ├── "Quick refresh" → "Time available" → END
│   ├── "Half day" → "Time available" → END
│   └── "Full day" → "Time available" → END
├── "Skin pampering" (weight: 8)
│   ├── "Facial treatments" → "Time available" → END
│   ├── "Anti-aging" → "Time available" → END
│   └── "Hydration" → "Time available" → END
└── "Complete reset" (weight: 10)
    ├── "Mind-body" → "Time available" → END
    ├── "Total relaxation" → "Time available" → END
    └── "Wellness journey" → "Time available" → END
```

## Implementation Structure

### Decision Tree Node Interface
```typescript
interface DecisionNode {
  id: string;
  question: string;
  options: DecisionOption[];
  isLeaf?: boolean; // End of conversation
}

interface DecisionOption {
  id: string;
  label: string;
  weight: number;
  nextNodeId?: string; // null for leaf nodes
  emoji?: string;
}

interface DecisionTree {
  domain: string;
  rootNodeId: string;
  nodes: Record<string, DecisionNode>;
}
```

### Conversation Flow
1. Start at root node
2. Present question with 2-4 simple options
3. User selects option
4. Record weight and move to next node
5. Continue until leaf node reached
6. Calculate final recommendation based on accumulated weights

### Benefits
- **Reduced cognitive load**: One simple decision at a time
- **Natural flow**: Feels like conversation, not form-filling
- **Same data collection**: All business requirements preserved
- **Better completion rates**: Less overwhelming for users
- **Flexible branching**: Can adapt based on previous responses

This decision tree approach maintains all the business logic and weight calculations while creating a truly conversational user experience.

