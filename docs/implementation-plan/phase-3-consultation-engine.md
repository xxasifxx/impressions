# Phase 3: Consultation Engine & Image-Based Questions

## Overview

This phase focuses on creating an engaging, image-driven consultation experience that guides users through a series of visual choices to understand their preferences and needs. The consultation flow will adapt to user responses and provide a personalized experience, setting the stage for tailored recommendations.

## Timeline

**Duration:** 3 weeks
**Dependencies:** Phase 1 (Foundation), Phase 2 (Service Data)

## Objectives

1. Create image-based question components for visual choices
2. Enhance the consultation flow to support visual progression
3. Implement progress tracking and navigation
4. Build a responsive consultation modal with proper styling
5. Create a smooth, engaging user experience

## Detailed Tasks

### 1. Image-Based Question Component

- [ ] Create `ImageChoiceQuestion.tsx` component for visual options
- [ ] Implement image grid layout with responsive behavior
- [ ] Add selection states and animations for choices
- [ ] Create hover and focus states for accessibility
- [ ] Add support for single and multiple selection modes
- [ ] Implement image loading optimization and placeholders

### 2. Consultation Question Data

- [ ] Enhance `consultationQuestions.ts` with image URLs for options
- [ ] Create structured question flow with branching logic
- [ ] Define question categories that map to benefits
- [ ] Add metadata for tracking progress and domain focus
- [ ] Create descriptive text for each question and option

### 3. Progress Indicator Component

- [ ] Create `ProgressIndicator.tsx` component
- [ ] Implement visual progress bar or steps indicator
- [ ] Add animations for progress updates
- [ ] Create responsive versions for different screen sizes
- [ ] Add accessibility features (ARIA attributes, keyboard navigation)

### 4. Consultation Flow Enhancement

- [ ] Update `UnifiedConsultationFlow.tsx` to support image-based questions
- [ ] Implement navigation between questions (next, previous)
- [ ] Add branching logic based on user responses
- [ ] Create smooth transitions between questions
- [ ] Implement response tracking and scoring

### 5. Consultation Modal Enhancement

- [ ] Enhance `UnifiedConsultationModal.tsx` with improved styling
- [ ] Implement responsive behavior for different screen sizes
- [ ] Add keyboard navigation and accessibility features
- [ ] Create smooth open/close animations
- [ ] Add close confirmation if consultation is in progress

### 6. Integration with Aesthetic Evolution

- [ ] Connect consultation responses to aesthetic evolution system
- [ ] Implement subtle UI changes based on user preferences
- [ ] Create smooth transitions for aesthetic changes
- [ ] Add domain-specific styling cues based on responses
- [ ] Ensure consistent visual experience throughout flow

## Technical Considerations

### Image-Based Question Component

The `ImageChoiceQuestion` component should be flexible and reusable:

```typescript
interface ImageChoice {
  id: string;
  imageUrl: string;
  label: string;
  description?: string;
  metadata?: {
    domain?: string;
    benefits?: string[];
    tags?: string[];
    weight?: number;
  };
}

interface ImageChoiceQuestionProps {
  question: string;
  description?: string;
  choices: ImageChoice[];
  selectionMode: 'single' | 'multiple';
  selectedIds: string[];
  onSelect: (selectedIds: string[]) => void;
  imageSize?: 'small' | 'medium' | 'large';
  layout?: 'grid' | 'carousel';
}
```

### Consultation Question Structure

The consultation questions should support branching and image choices:

```typescript
interface ConsultationQuestion {
  id: string;
  text: string;
  description?: string;
  imageUrl?: string;
  responseType: 'single' | 'multiple' | 'image-choice';
  options: {
    id: string;
    text: string;
    imageUrl: string;
    nextQuestionId?: string;
    metadata?: {
      domain?: string;
      benefits?: string[];
      tags?: string[];
      weight?: number;
    };
  }[];
  category?: string;
  required?: boolean;
}
```

### Progress Tracking

The progress indicator should support different visualization styles:

```typescript
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number;
  visualStyle?: 'bar' | 'dots' | 'steps';
  showLabels?: boolean;
  showPercentage?: boolean;
  orientation?: 'horizontal' | 'vertical';
}
```

### Image Optimization

For the image-based questions:
- Use responsive images with srcset for different screen sizes
- Implement lazy loading for images not immediately visible
- Use image placeholders during loading
- Optimize images for web (WebP format with fallbacks)
- Consider using a CDN for faster loading

## Deliverables

1. `src/components/ImageChoiceQuestion.tsx` - Component for visual choices
2. `src/components/ProgressIndicator.tsx` - Progress tracking component
3. `src/data/consultationQuestions.ts` - Enhanced question data with images
4. `src/components/UnifiedConsultationFlow.tsx` - Updated consultation flow
5. `src/components/ConsultationModal/UnifiedConsultationModal.tsx` - Enhanced modal
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

After completing this phase, we will move on to Phase 4: State Management & Persistence, which will ensure that consultation data is properly managed and persisted throughout the user journey.

