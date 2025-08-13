# Phase 1: Foundation Setup & Homepage Implementation

## Overview

This phase focuses on establishing the foundation for the entire user journey by implementing the unified homepage and setting up the project structure. The homepage will serve as the primary entry point to the beauty experience, featuring a compelling hero section that subtly incorporates elements from all three domains without forcing explicit choices.

## Timeline

**Duration:** 2 weeks
**Dependencies:** None (initial phase)

## Objectives

1. Create a visually appealing homepage that immediately engages users
2. Implement a clear entry point to the consultation flow
3. Establish the project architecture and styling foundation
4. Set up the basic routing structure for the application

## Detailed Tasks

### 1. Project Structure & Environment Setup

- [ ] Review existing project structure and identify areas for improvement
- [ ] Set up consistent folder organization for components, pages, and utilities
- [ ] Configure ESLint and Prettier for code quality
- [ ] Set up CSS/styling approach (Tailwind, CSS modules, or styled-components)
- [ ] Create basic routing structure with React Router

### 2. Styling Foundation

- [ ] Create `variables.css` with design tokens for colors, typography, spacing
- [ ] Define color palette that can adapt to different domains subtly
- [ ] Establish typography system with appropriate fonts and scales
- [ ] Create basic component styling patterns and utility classes
- [ ] Implement responsive breakpoints for different device sizes

### 3. HeroSection Component

- [ ] Design and implement `HeroSection.tsx` component
- [ ] Source high-quality hero image that subtly incorporates all three domains
- [ ] Create compelling headline and subheading copy
- [ ] Implement subtle animations or transitions for visual interest
- [ ] Ensure responsive behavior for different screen sizes

### 4. ConsultationEntryButton Component

- [ ] Enhance existing `ConsultationEntryButton.tsx` or create if not present
- [ ] Design prominent, attention-grabbing button styling
- [ ] Implement hover and active states with appropriate animations
- [ ] Connect button to consultation modal trigger
- [ ] Add tracking for button interactions (placeholder for future analytics)

### 5. HomePage Implementation

- [ ] Update `Home.tsx` to use the new HeroSection component
- [ ] Remove or minimize domain-specific sections from current homepage
- [ ] Implement minimal navigation that doesn't distract from main CTA
- [ ] Add subtle visual cues from all domains without forcing explicit choice
- [ ] Ensure the page has appropriate meta tags and SEO elements

### 6. Basic Navigation & Layout

- [ ] Create consistent header component with minimal navigation
- [ ] Implement basic footer with essential links
- [ ] Create layout wrapper component for consistent page structure
- [ ] Set up basic transitions between pages

## Technical Considerations

### Component Architecture

The HeroSection should be designed as a reusable component that could potentially be used in other contexts with different content. It should accept props for:

```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaComponent: React.ReactNode;
  backgroundVariant?: 'light' | 'dark' | 'gradient';
}
```

### Styling Approach

Use CSS variables for theming to support the aesthetic evolution system in later phases:

```css
:root {
  /* Base colors */
  --color-primary: #0ea5e9;
  --color-secondary: #38bdf8;
  --color-accent: #0284c7;
  --color-background: #f0f9ff;
  --color-surface: #e0f2fe;
  --color-text: #0c4a6e;
  --color-text-secondary: #0369a1;
  
  /* Typography */
  --font-heading: 'system-ui, sans-serif';
  --font-body: 'system-ui, sans-serif';
  --font-weight-heading: 600;
  --font-size-heading: 1.875rem;
  --font-size-body: 0.925rem;
  --letter-spacing: 0.01em;
  --line-height: 1.65;
  
  /* Spacing */
  --container-padding: 1.5rem;
  --element-gap: 1.25rem;
  --border-radius: 0.625rem;
  
  /* Effects */
  --animation-duration: 0.6s;
  --animation-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --shadow-intensity: medium;
}
```

### Image Assets

For the hero image, we need a high-quality image that subtly incorporates elements from all three domains (hair, makeup, spa) without explicitly categorizing them. Options include:

1. A lifestyle image showing a person with great hair, makeup, and skin
2. A collage-style image with subtle elements from each domain blended together
3. An abstract image with colors and textures that evoke all three domains

## Deliverables

1. `src/components/HeroSection.tsx` - New component for homepage hero
2. `src/components/ConsultationEntryButton.tsx` - Enhanced button component
3. `src/pages/Home.tsx` - Updated homepage with new components
4. `src/styles/variables.css` - CSS variables for theming
5. `src/components/Layout.tsx` - Basic layout wrapper component
6. `public/images/hero/` - Directory with hero images

## Testing Criteria

1. **Visual Testing:**
   - Homepage renders correctly on different screen sizes
   - Hero section is visually appealing and properly aligned
   - CTA button is prominent and visually distinct

2. **Functional Testing:**
   - Clicking the CTA button opens the consultation modal
   - Navigation links work correctly
   - Page transitions are smooth

3. **Performance Testing:**
   - Homepage loads quickly (under 2 seconds)
   - Images are optimized for web
   - No layout shifts during loading

## Next Steps

After completing this phase, we will move on to Phase 2: Service Data Structure & Types, which will provide the data foundation for the consultation and recommendation systems.

