# Phase 1: Image-Based Consultation Enhancement

## Overview

This phase focuses on transforming the existing text-based consultation flow into a visually-driven experience with image-based choices. The goal is to create a more engaging, intuitive consultation that helps users express their preferences through visual selection rather than text options.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Existing UnifiedConsultationFlow component

## Objectives

1. Create an image-based question component for visual choices
2. Enhance the consultation flow to support image-based questions
3. Update the decision tree data structure to include image URLs
4. Implement smooth transitions between questions
5. Add progress tracking with visual indicators

## Current State Analysis

The current consultation flow (`UnifiedConsultationFlow.tsx`) uses a text-based approach with the following structure:
- Decision tree with nodes and options
- Text-based questions and answers
- Domain-aware recommendations
- Basic progress tracking

The consultation data (`unifiedConsultationFlow.ts`) includes:
- Question text
- Option labels
- Domain information
- Navigation logic

## Detailed Tasks

### 1. Image Choice Component

- [ ] Create `ImageChoiceQuestion.tsx` component for visual options
- [ ] Implement grid layout for image choices
- [ ] Add selection states with visual feedback
- [ ] Create hover and focus states for accessibility
- [ ] Implement responsive behavior for different screen sizes
- [ ] Add animation for selection and transition

**Implementation Details:**
```typescript
interface ImageChoiceProps {
  options: Array<{
    id: string;
    imageUrl: string;
    label: string;
    selected: boolean;
    domains?: string[];
  }>;
  onSelect: (optionId: string) => void;
  layout?: 'grid' | 'carousel';
  size?: 'small' | 'medium' | 'large';
}

const ImageChoiceQuestion: React.FC<ImageChoiceProps> = ({
  options,
  onSelect,
  layout = 'grid',
  size = 'medium'
}) => {
  // Component implementation
};
```

### 2. Enhanced Decision Tree Data

- [ ] Update `unifiedConsultationFlow.ts` to include image URLs for options
- [ ] Add image metadata (alt text, focal points)
- [ ] Create image assets for all consultation options
- [ ] Organize images in a consistent directory structure
- [ ] Add fallback text for accessibility

**Data Structure Updates:**
```typescript
// Update UnifiedDecisionOption interface
export interface UnifiedDecisionOption {
  id: string;
  label: string;
  weight: number;
  nextNodeId?: string;
  emoji?: string;
  domains?: string[];
  imageUrl?: string; // New field
  imageAlt?: string; // New field
  imagePosition?: 'center' | 'top' | 'left'; // New field
}
```

### 3. Consultation Flow Enhancement

- [ ] Update `UnifiedConsultationFlow.tsx` to use ImageChoiceQuestion
- [ ] Implement conditional rendering for text vs. image questions
- [ ] Add smooth transitions between questions
- [ ] Enhance progress tracking with visual indicators
- [ ] Improve navigation between questions

**Implementation Focus:**
```typescript
// Inside UnifiedConsultationFlow component
const renderQuestion = (node: UnifiedDecisionNode) => {
  // Check if this is an image-based question
  const hasImages = node.options.some(option => !!option.imageUrl);
  
  if (hasImages) {
    return (
      <ImageChoiceQuestion
        options={node.options.map(option => ({
          id: option.id,
          imageUrl: option.imageUrl || '',
          label: option.label,
          selected: responses[node.id]?.optionId === option.id,
          domains: option.domains
        }))}
        onSelect={(optionId) => handleOptionSelect(
          node.options.find(o => o.id === optionId)!
        )}
        layout={node.layout || 'grid'}
        size={node.size || 'medium'}
      />
    );
  }
  
  // Fallback to text-based question
  return (
    <div className="space-y-3 mb-8">
      {node.options.map((option) => (
        <Button
          key={option.id}
          onClick={() => handleOptionSelect(option)}
          variant="outline"
          className="w-full p-4 h-auto text-left justify-start"
        >
          {/* Existing button content */}
        </Button>
      ))}
    </div>
  );
};
```

### 4. Visual Progress Indicator

- [ ] Create `ConsultationProgress.tsx` component
- [ ] Implement visual progress tracking
- [ ] Add animations for progress updates
- [ ] Create responsive versions for different screen sizes
- [ ] Ensure accessibility with ARIA attributes

**Component Structure:**
```typescript
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

const ConsultationProgress: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  completedSteps,
  orientation = 'horizontal',
  showLabels = true
}) => {
  // Component implementation
};
```

### 5. Consultation Modal Enhancement

- [ ] Update `UnifiedConsultationModal.tsx` to support image-based flow
- [ ] Improve modal sizing and layout for images
- [ ] Add smooth transitions and animations
- [ ] Ensure responsive behavior for different screen sizes
- [ ] Implement keyboard navigation for accessibility

**Modal Enhancements:**
```typescript
// Inside UnifiedConsultationModal
return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="p-0 overflow-hidden max-w-5xl w-full h-[90vh] max-h-[800px]">
      <AestheticProvider 
        consultationProgress={consultationProgress}
        currentServiceCategory={currentDomain}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <ConsultationProgress 
              currentStep={currentStep}
              totalSteps={totalSteps}
              completedSteps={completedSteps}
            />
          </div>
          <div className="flex-1 overflow-auto">
            <UnifiedConsultationFlow 
              onProgressChange={handleProgressChange}
              onComplete={handleComplete}
            />
          </div>
        </div>
      </AestheticProvider>
    </DialogContent>
  </Dialog>
);
```

## Technical Considerations

### Image Optimization

- Use responsive images with srcset for different screen sizes
- Implement lazy loading for images not immediately visible
- Use image placeholders during loading
- Optimize images for web (WebP format with fallbacks)
- Consider using a CDN for faster loading

### Accessibility

- Ensure all images have proper alt text
- Maintain keyboard navigation throughout the flow
- Use ARIA attributes for interactive elements
- Ensure sufficient color contrast for text overlays
- Provide text alternatives for all visual content

### Performance

- Optimize image loading and rendering
- Use code splitting for large components
- Implement virtualization for long lists of options
- Monitor and optimize render performance
- Add loading states for network operations

## Deliverables

1. `src/components/ImageChoiceQuestion.tsx` - New component for visual choices
2. `src/components/ConsultationProgress.tsx` - Enhanced progress indicator
3. Updated `src/data/unifiedConsultationFlow.ts` - With image URLs
4. Updated `src/components/UnifiedConsultationFlow.tsx` - Supporting image choices
5. Updated `src/components/ConsultationModal/UnifiedConsultationModal.tsx` - Enhanced modal
6. `public/images/consultation/` - Directory with question and option images

## Testing Criteria

1. **Functional Testing:**
   - All question types render correctly
   - Selection states work properly
   - Navigation between questions functions correctly
   - Progress tracking accurately reflects position

2. **Visual Testing:**
   - Images load properly and are visually appealing
   - Transitions between questions are smooth
   - UI adapts appropriately based on responses
   - Layout is responsive on different screen sizes

3. **Accessibility Testing:**
   - Keyboard navigation works throughout the flow
   - Screen readers can interpret all content
   - Focus states are clearly visible
   - Color contrast meets WCAG standards

4. **Performance Testing:**
   - Images load quickly and efficiently
   - Transitions are smooth without jank
   - No memory leaks during extended use
   - Works well on lower-end devices

## Next Steps

After completing this phase, we will move on to Phase 2: Benefit-Oriented Results Organization, which will reorganize the recommendation results by benefit rather than domain.

