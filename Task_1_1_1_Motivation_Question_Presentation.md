# Task 1.1.1: Motivation Question Presentation

## Task Overview
**Task ID**: IMP-US-001.1.1  
**Task Title**: Motivation Question Presentation  
**Parent Activity**: Activity 1.1 - Initial Motivation Assessment  
**Task Owner**: Frontend Development Team  
**Estimated Effort**: 16 hours  
**Priority**: P0 - Critical Path  

## Task Purpose

### Objective
Implement the primary motivation question interface that captures customer intent through an engaging, psychology-aware presentation that adapts to user context and provides clear, emotionally resonant response options while maintaining high engagement and accurate motivation detection.

### Business Value
- Establishes accurate customer motivation with >90% detection rate
- Reduces consultation abandonment by 35% through engaging presentation
- Increases cross-domain discovery by 50% through motivation-based routing
- Improves recommendation relevance by 40% through early intent capture

### Success Criteria
- **SC-001**: Question presentation loads in <1.5 seconds on mobile
- **SC-002**: User engagement rate >95% (users who interact with options)
- **SC-003**: Motivation detection accuracy >90% validated against outcomes
- **SC-004**: Mobile usability score >90% for question interaction

## Technical Specifications

### Component Architecture
```typescript
interface MotivationQuestionProps {
  entryContext: EntryContext;
  onMotivationSelected: (motivation: MotivationSelection) => void;
  onAnalyticsEvent: (event: AnalyticsEvent) => void;
  theme: ConsultationTheme;
  isLoading?: boolean;
}

interface MotivationSelection {
  optionId: string;
  label: string;
  weight: number;
  domains: string[];
  responseTime: number;
  confidence: number;
}

interface EntryContext {
  source: 'direct' | 'unified' | 'referral' | 'campaign';
  domain?: 'hair-salon' | 'makeup-studio' | 'med-spa';
  referrerUrl?: string;
  campaignId?: string;
  userAgent: string;
  timestamp: string;
}
```

### React Component Implementation
```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Heart, Calendar, Zap } from 'lucide-react';

const MotivationQuestionPresentation: React.FC<MotivationQuestionProps> = ({
  entryContext,
  onMotivationSelected,
  onAnalyticsEvent,
  theme,
  isLoading = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questionStartTime] = useState(Date.now());
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track question presentation
  useEffect(() => {
    onAnalyticsEvent({
      type: 'motivation_question_presented',
      context: entryContext,
      timestamp: new Date().toISOString()
    });
  }, []);

  // Handle option selection
  const handleOptionSelect = useCallback((option: MotivationOption) => {
    if (selectedOption === option.id) return;
    
    setSelectedOption(option.id);
    setHasInteracted(true);
    
    const responseTime = Date.now() - questionStartTime;
    
    // Track selection analytics
    onAnalyticsEvent({
      type: 'motivation_option_selected',
      optionId: option.id,
      responseTime,
      context: entryContext,
      timestamp: new Date().toISOString()
    });
    
    // Prepare motivation selection data
    const motivationSelection: MotivationSelection = {
      optionId: option.id,
      label: option.label,
      weight: option.weight,
      domains: option.domains || [],
      responseTime,
      confidence: calculateSelectionConfidence(option, responseTime)
    };
    
    // Delay for visual feedback, then proceed
    setTimeout(() => {
      onMotivationSelected(motivationSelection);
    }, 300);
  }, [selectedOption, questionStartTime, onMotivationSelected, onAnalyticsEvent, entryContext]);

  // Motivation options based on entry context
  const motivationOptions = getContextualMotivationOptions(entryContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50/30 flex flex-col">
      {/* Progress Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-rose-600">Beauty Consultation</span>
            <span className="text-sm text-gray-500">Step 1 of 4-6</span>
          </div>
          <Progress value={15} className="h-2 bg-rose-100" />
          <p className="text-xs text-gray-500 mt-2">About 4 minutes remaining</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Question Card */}
          <Card className="p-8 mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-rose-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                  What brings you here today?
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I'd love to understand what you're hoping to achieve so I can create 
                  the perfect beauty experience just for you.
                </p>
              </div>
            </motion.div>

            {/* Options Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <AnimatePresence>
                {motivationOptions.map((option, index) => (
                  <MotivationOptionCard
                    key={option.id}
                    option={option}
                    isSelected={selectedOption === option.id}
                    onSelect={handleOptionSelect}
                    animationDelay={0.1 * index}
                    isLoading={isLoading}
                  />
                ))}
              </AnimatePresence>
            </div>
          </Card>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Personalized recommendations
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Expert guidance
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Secure & private
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
```

### Motivation Option Card Component
```typescript
interface MotivationOptionCardProps {
  option: MotivationOption;
  isSelected: boolean;
  onSelect: (option: MotivationOption) => void;
  animationDelay: number;
  isLoading: boolean;
}

const MotivationOptionCard: React.FC<MotivationOptionCardProps> = ({
  option,
  isSelected,
  onSelect,
  animationDelay,
  isLoading
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isLoading) return;
    onSelect(option);
  };

  const getOptionIcon = (optionId: string) => {
    const iconMap = {
      'special-event': Calendar,
      'regular-maintenance': Heart,
      'appearance-enhancement': Sparkles,
      'skin-concerns': Zap
    };
    return iconMap[optionId] || Sparkles;
  };

  const IconComponent = getOptionIcon(option.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`
          p-6 cursor-pointer transition-all duration-300 border-2
          ${isSelected 
            ? 'border-rose-500 bg-rose-50 shadow-lg' 
            : 'border-gray-200 hover:border-rose-300 hover:shadow-md'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start space-x-4">
          <div className={`
            flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors
            ${isSelected ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}
          `}>
            <IconComponent className="w-6 h-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`
                font-semibold text-lg leading-tight
                ${isSelected ? 'text-rose-900' : 'text-gray-900'}
              `}>
                {option.label}
              </h3>
              {option.emoji && (
                <span className="text-2xl ml-2">{option.emoji}</span>
              )}
            </div>
            
            {option.description && (
              <p className={`
                text-sm leading-relaxed
                ${isSelected ? 'text-rose-700' : 'text-gray-600'}
              `}>
                {option.description}
              </p>
            )}
            
            {/* Domain indicators */}
            {option.domains && option.domains.length > 1 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {option.domains.map(domain => (
                  <span
                    key={domain}
                    className={`
                      px-2 py-1 text-xs rounded-full font-medium
                      ${isSelected 
                        ? 'bg-rose-200 text-rose-800' 
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}
                  >
                    {formatDomainName(domain)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selection indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4"
            >
              <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
```

### Data Structures
```typescript
interface MotivationOption {
  id: string;
  label: string;
  description?: string;
  weight: number;
  domains?: string[];
  emoji?: string;
  nextNodeId?: string;
  isLeaf?: boolean;
}

// Contextual motivation options based on entry point
function getContextualMotivationOptions(context: EntryContext): MotivationOption[] {
  const baseOptions: MotivationOption[] = [
    {
      id: 'special-event',
      label: 'I have a special event coming up',
      description: 'Wedding, date night, professional event, or celebration',
      weight: 8,
      domains: ['hair-salon', 'makeup-studio', 'med-spa'],
      emoji: '✨',
      nextNodeId: 'event-type'
    },
    {
      id: 'regular-maintenance',
      label: 'I need regular maintenance',
      description: 'Keep up with my beauty routine and look my best',
      weight: 6,
      domains: ['hair-salon', 'makeup-studio', 'med-spa'],
      emoji: '💅',
      nextNodeId: 'maintenance-areas'
    },
    {
      id: 'appearance-enhancement',
      label: 'I want to enhance my appearance',
      description: 'Try something new or improve my current look',
      weight: 7,
      domains: ['hair-salon', 'makeup-studio', 'med-spa'],
      emoji: '🌟',
      nextNodeId: 'enhancement-goals'
    },
    {
      id: 'skin-concerns',
      label: 'I have skin concerns',
      description: 'Address specific skin issues or improve skin health',
      weight: 7,
      domains: ['med-spa'],
      emoji: '✨',
      nextNodeId: 'skin-issues'
    }
  ];

  // Adapt options based on entry context
  if (context.domain) {
    return baseOptions.filter(option => 
      !option.domains || option.domains.includes(context.domain!)
    );
  }

  return baseOptions;
}

// Calculate selection confidence based on response time and option characteristics
function calculateSelectionConfidence(option: MotivationOption, responseTime: number): number {
  let confidence = 0.8; // Base confidence
  
  // Adjust based on response time (sweet spot is 2-8 seconds)
  if (responseTime < 1000) {
    confidence -= 0.1; // Too quick, might be impulsive
  } else if (responseTime > 15000) {
    confidence -= 0.15; // Too long, might indicate uncertainty
  } else if (responseTime >= 2000 && responseTime <= 8000) {
    confidence += 0.1; // Thoughtful consideration time
  }
  
  // Adjust based on option weight (higher weight = more decisive)
  confidence += (option.weight - 5) * 0.02;
  
  return Math.max(0.3, Math.min(1.0, confidence));
}
```

## User Interface Specifications

### Visual Design Requirements

#### Color Palette
- **Primary**: Rose/Pink gradient (#f43f5e to #ec4899)
- **Secondary**: Warm gray (#6b7280 to #374151)
- **Success**: Emerald (#10b981)
- **Background**: Soft rose gradient (#fdf2f8 to #ffffff)
- **Text**: Dark gray (#111827) for primary, medium gray (#6b7280) for secondary

#### Typography
- **Question Title**: 24px/32px (mobile), 32px/40px (desktop), font-weight: 600
- **Question Description**: 18px/28px, font-weight: 400
- **Option Labels**: 18px/24px, font-weight: 600
- **Option Descriptions**: 14px/20px, font-weight: 400
- **UI Text**: 14px/20px, font-weight: 500

#### Spacing and Layout
- **Container Padding**: 16px (mobile), 32px (desktop)
- **Card Padding**: 24px (mobile), 32px (desktop)
- **Option Grid Gap**: 16px
- **Element Spacing**: 8px, 16px, 24px, 32px system

### Responsive Behavior

#### Mobile (320px - 767px)
- Single column option layout
- Full-width cards with 16px margins
- Touch-optimized 44px minimum touch targets
- Simplified animations for performance

#### Tablet (768px - 1023px)
- Two-column option layout
- Increased padding and spacing
- Enhanced hover effects
- Optimized for both touch and mouse

#### Desktop (1024px+)
- Two-column option layout with max-width container
- Full hover and animation effects
- Keyboard navigation support
- Enhanced visual hierarchy

### Animation Specifications

#### Page Load Animation
```typescript
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
```

#### Option Card Animations
```typescript
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: index * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};
```

#### Selection Feedback Animation
```typescript
const selectionVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "backOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};
```

## Data Storage Requirements

### Local Storage Schema
```json
{
  "motivationAssessment": {
    "sessionId": "uuid-v4",
    "timestamp": "2024-01-15T10:30:00Z",
    "entryContext": {
      "source": "unified",
      "domain": null,
      "referrerUrl": "https://example.com/services",
      "campaignId": null,
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-01-15T10:29:45Z"
    },
    "questionPresentation": {
      "presentedOptions": ["special-event", "regular-maintenance", "appearance-enhancement", "skin-concerns"],
      "presentationTimestamp": "2024-01-15T10:30:00Z",
      "adaptationApplied": "unified-flow"
    },
    "userInteraction": {
      "selectedOptionId": "special-event",
      "selectionTimestamp": "2024-01-15T10:30:15Z",
      "responseTime": 15000,
      "confidence": 0.85,
      "interactionEvents": [
        {
          "type": "option_hovered",
          "optionId": "regular-maintenance",
          "timestamp": "2024-01-15T10:30:08Z"
        },
        {
          "type": "option_selected",
          "optionId": "special-event",
          "timestamp": "2024-01-15T10:30:15Z"
        }
      ]
    }
  }
}
```

### Analytics Events Schema
```typescript
interface AnalyticsEvent {
  type: 'motivation_question_presented' | 'motivation_option_selected' | 'option_hovered' | 'question_abandoned';
  sessionId: string;
  timestamp: string;
  context: EntryContext;
  optionId?: string;
  responseTime?: number;
  confidence?: number;
  additionalData?: Record<string, any>;
}
```

## Validation Rules

### Input Validation
- **Required Selection**: User must select one motivation option
- **Single Selection**: Only one option can be selected at a time
- **Timeout Handling**: Session timeout after 10 minutes of inactivity
- **Error Recovery**: Clear error states and retry mechanisms

### Business Logic Validation
- **Domain Compatibility**: Validate selected motivation against available domains
- **Flow Routing**: Ensure selected motivation routes to appropriate next step
- **Context Preservation**: Maintain entry context through selection process

### Performance Validation
- **Load Time**: Question presentation must load within 1.5 seconds
- **Interaction Response**: Selection feedback within 100ms
- **Animation Performance**: Maintain 60fps for all animations
- **Memory Usage**: Component memory footprint <10MB

## Error Handling

### Error Scenarios
1. **Network Connectivity Issues**
   - Display offline indicator
   - Cache selection for retry when online
   - Provide manual retry option

2. **Component Loading Failures**
   - Show loading skeleton during delays
   - Fallback to simplified interface
   - Error boundary with recovery options

3. **Selection Processing Errors**
   - Clear error messaging
   - Option to retry selection
   - Fallback to manual form input

4. **Analytics Tracking Failures**
   - Silent failure for analytics
   - Queue events for retry
   - Don't block user progress

### Error Recovery
```typescript
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRetry = () => {
    setHasError(false);
    setError(null);
    // Trigger component re-render
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We're having trouble loading your consultation. Please try again.
          </p>
          <Button onClick={handleRetry} className="w-full">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
```

## Testing Requirements

### Unit Tests
- Component rendering with different props
- Option selection handling
- Animation trigger verification
- Error boundary functionality
- Analytics event firing

### Integration Tests
- Entry context adaptation
- Data storage and retrieval
- Navigation to next step
- Error handling flows

### User Experience Tests
- Mobile touch interaction testing
- Keyboard navigation testing
- Screen reader compatibility
- Performance on various devices

### Accessibility Tests
- WCAG 2.1 AA compliance
- Color contrast validation
- Focus management testing
- Screen reader announcement testing

## Performance Requirements

### Load Performance
- **Initial Render**: <1.5 seconds on 3G connection
- **Interactive**: <2 seconds for full interactivity
- **Animation Performance**: 60fps for all animations
- **Memory Usage**: <10MB component footprint

### Runtime Performance
- **Selection Response**: <100ms feedback
- **Option Hover**: <50ms visual feedback
- **Data Storage**: <10ms for local storage operations
- **Analytics**: <5ms for event tracking (non-blocking)

### Optimization Strategies
- Lazy load non-critical animations
- Optimize image assets for different screen densities
- Use React.memo for option cards
- Implement virtual scrolling for large option lists
- Preload next step components

This comprehensive Task specification provides all the technical details, user interface requirements, and implementation guidance needed to build the motivation question presentation component that serves as the foundation for the entire beauty consultation experience.

