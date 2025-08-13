# Phase 2: Service Data Structure & Types

## Overview

This phase focuses on creating the foundational data structures that will power the entire application. By defining comprehensive service data with rich imagery and benefit categorization early, we ensure that subsequent components have the necessary data to work with. This data will drive the consultation engine, recommendation system, and results page.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Phase 1 (for project structure)

## Objectives

1. Define comprehensive service data types and interfaces
2. Create detailed service data for all domains
3. Implement benefit categories and tags for cross-domain recommendations
4. Source high-quality images for all services
5. Establish relationships between services for complementary suggestions

## Detailed Tasks

### 1. Service Type Definitions

- [ ] Create `ServiceTypes.ts` with detailed type definitions
- [ ] Define core Service interface with all necessary properties
- [ ] Create types for service categories, benefits, and tags
- [ ] Define types for service relationships and complementary services
- [ ] Create utility types for filtering and grouping services

### 2. Benefit Categories Definition

- [ ] Create `benefitCategories.ts` with definitions of benefit categories
- [ ] Define cross-domain benefits that span multiple service types
- [ ] Create mapping between benefits and service attributes
- [ ] Define benefit priority and weighting for recommendations
- [ ] Create descriptions for each benefit category for user-facing content

### 3. Service Data Creation

- [ ] Create `servicesData.ts` with comprehensive service information
- [ ] Populate data for hair salon services with detailed attributes
- [ ] Populate data for makeup studio services with detailed attributes
- [ ] Populate data for med spa services with detailed attributes
- [ ] Add cross-domain relationships between services
- [ ] Ensure all services have appropriate benefit tags

### 4. Service Image Assets

- [ ] Create directory structure for service images
- [ ] Source high-quality images for hair salon services
- [ ] Source high-quality images for makeup studio services
- [ ] Source high-quality images for med spa services
- [ ] Optimize images for web performance
- [ ] Create consistent naming convention for image files

### 5. Mock API Implementation

- [ ] Create mock API service for retrieving service data
- [ ] Implement filtering and sorting functions
- [ ] Add simulated loading delays for testing
- [ ] Create utility functions for working with service data
- [ ] Add documentation for future real API integration

## Technical Considerations

### Service Data Structure

The core Service interface should be comprehensive enough to support all features:

```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: number; // in minutes
  imageUrl: string;
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
  benefits: string[]; // IDs of benefits this service provides
  tags: string[]; // Additional tags for filtering
  relatedServices: string[]; // IDs of related services
  complementaryServices: string[]; // IDs of services that pair well
  popularity: number; // 1-10 rating for sorting
  details?: {
    specialist?: string;
    materials?: string[];
    steps?: string[];
    aftercare?: string[];
    beforecare?: string[];
  };
  clientStory?: {
    name: string;
    quote: string;
    rating: number; // 1-5
    imageUrl?: string;
  };
}
```

### Benefit Categories

Benefit categories should span domains and focus on outcomes rather than procedures:

```typescript
interface BenefitCategory {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  domains: ('hair-salon' | 'makeup-studio' | 'med-spa')[];
  tags: string[]; // For matching with consultation responses
  priority: number; // For sorting
}

// Example benefit categories
const benefitCategories: BenefitCategory[] = [
  {
    id: 'signature-look',
    title: 'For Your Signature Look',
    description: 'Core services that define and enhance your personal style',
    domains: ['hair-salon', 'makeup-studio', 'med-spa'],
    tags: ['style', 'appearance', 'confidence'],
    priority: 1
  },
  {
    id: 'relaxation',
    title: 'For Relaxation & Renewal',
    description: 'Services focused on wellbeing and stress relief',
    domains: ['hair-salon', 'med-spa'],
    tags: ['relaxation', 'stress-relief', 'wellness'],
    priority: 2
  },
  // Additional benefit categories...
]
```

### Image Considerations

- All service images should be consistent in style, quality, and aspect ratio
- Recommended dimensions: 800x600px or 4:3 aspect ratio
- Format: WebP with JPEG fallback for older browsers
- File size: Optimized to <100KB per image
- Style: Professional, well-lit images that clearly show the service result

## Deliverables

1. `src/types/ServiceTypes.ts` - Comprehensive type definitions
2. `src/data/benefitCategories.ts` - Benefit category definitions
3. `src/data/servicesData.ts` - Complete service data for all domains
4. `public/images/services/` - Directory with optimized service images
5. `src/services/serviceApi.ts` - Mock API service for data retrieval

## Testing Criteria

1. **Type Checking:**
   - All service data conforms to defined types
   - No TypeScript errors or warnings

2. **Data Completeness:**
   - All services have complete information
   - All required fields are populated
   - Relationships between services are valid

3. **Image Quality:**
   - All images load correctly
   - Images are optimized for web
   - Images are visually consistent

4. **Mock API Functionality:**
   - Service data can be retrieved with filters
   - Related services can be fetched
   - Benefit-based grouping works correctly

## Next Steps

After completing this phase, we will move on to Phase 3: Consultation Engine & Image-Based Questions, which will use this service data to power the consultation experience.

