# Assets Organization

This directory contains all static assets for the Impressions Beauty Web application, organized by purpose and usage.

## Folder Structure

### `/gallery/`
Contains portfolio images showcasing beauty work and transformations. These images are used in:
- Gallery components
- Portfolio displays
- Social media integration
- **Files**: 22 images (gallery-01.jpg through gallery-22.jpg)

### `/videos/`
Contains video content for showcasing beauty work and services:
- Service demonstrations
- Transformation time-lapses
- Social media video content
- **Files**: 2 videos (showcase-video-01.mp4, showcase-video-02.mp4)

### `/services/`
Images related to specific beauty services offered:
- Service category illustrations
- Before/after examples for specific services
- Service process demonstrations

### `/hero/`
Hero banner and main promotional images:
- Homepage hero images
- Landing page banners
- Main promotional content

### `/testimonials/`
Customer testimonial related images:
- Customer photos (with permission)
- Review screenshots
- Testimonial backgrounds

### `/team/`
Staff and team member photos:
- Stylist profiles
- Team photos
- Professional headshots

### `/before-after/`
Transformation showcase images:
- Before and after comparisons
- Progress documentation
- Treatment results

## Usage Guidelines

1. **File Naming**: Use descriptive, lowercase names with hyphens
   - Example: `hair-styling-service.jpg`, `team-member-sarah.jpg`

2. **Image Optimization**: 
   - Compress images for web use
   - Use appropriate formats (JPG for photos, PNG for graphics with transparency)
   - Consider WebP format for better compression

3. **Responsive Images**: 
   - Provide multiple sizes when needed
   - Use descriptive alt text for accessibility

4. **Organization**: 
   - Keep related images together
   - Use consistent naming conventions
   - Document any special usage requirements

## Integration with Components

Images in this directory are referenced in components using public paths:
```tsx
// Example usage
<img src="/assets/gallery/gallery-01.jpg" alt="Beauty transformation" />
```

## Existing Assets

The `/lovable-uploads/` directory contains existing optimized images that are currently in use by the application components. These should not be moved without updating component references.
