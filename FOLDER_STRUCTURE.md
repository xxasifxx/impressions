# Impressions Beauty Web - Folder Structure

This document outlines the organized folder structure for the Impressions Beauty Web application, designed to follow modern web development best practices.

## Root Directory Structure

```
impressions-beauty-web/
├── public/                     # Static assets served directly
│   ├── assets/                # Organized static assets
│   │   ├── gallery/           # Portfolio & showcase images (22 images)
│   │   ├── services/          # Service-related images
│   │   ├── hero/              # Hero banner images
│   │   ├── testimonials/      # Customer testimonial images
│   │   ├── team/              # Staff and team photos
│   │   ├── before-after/      # Transformation showcase
│   │   ├── icons/             # Icon assets
│   │   ├── logos/             # Brand logos and variations
│   │   ├── backgrounds/       # Background images
│   │   ├── social/            # Social media assets
│   │   └── README.md          # Asset organization guide
│   ├── lovable-uploads/       # Existing optimized images (in use)
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components (shadcn/ui)
│   │   ├── AboutSection.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── PopularProducts.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── WorkingHours.tsx
│   ├── pages/                 # Page components
│   │   ├── CulturalCelebrations.tsx
│   │   └── Transformations.tsx
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries and configurations
│   ├── assets/                # Source assets (imported in components)
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── constants/             # Application constants
│   ├── context/               # React context providers
│   ├── services/              # API services and external integrations
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── package.json
├── package-lock.json
├── bun.lockb
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── postcss.config.js
├── eslint.config.js
├── components.json
├── index.html
├── .gitignore
└── FOLDER_STRUCTURE.md       # This documentation file
```

## Key Organizational Principles

### 1. **Asset Management**
- **Public Assets** (`public/assets/`): Static files served directly by the web server
- **Source Assets** (`src/assets/`): Assets imported and processed by the build system
- **Existing Assets** (`public/lovable-uploads/`): Currently used optimized images

### 2. **Component Organization**
- **Feature Components**: Main application components (Header, Footer, etc.)
- **UI Components**: Reusable UI elements following shadcn/ui patterns
- **Page Components**: Route-specific page components

### 3. **Code Organization**
- **Separation of Concerns**: Clear separation between components, utilities, types, and services
- **Scalability**: Structure supports growth and additional features
- **Maintainability**: Logical grouping makes code easy to find and maintain

## Recent Changes

### Image Organization
- **Moved 22 JPG images** from root directory to `public/assets/gallery/`
- **Renamed images** with consistent naming: `gallery-01.jpg` through `gallery-22.jpg`
- **Created organized folder structure** for different types of assets
- **Preserved existing images** in `public/lovable-uploads/` (currently in use)

### Folder Structure Enhancements
- Added comprehensive asset organization in `public/assets/`
- Created additional source code organization folders in `src/`
- Added documentation for maintainability

## Usage Guidelines

### Adding New Images
1. **Determine Purpose**: Choose appropriate subfolder based on image usage
2. **Naming Convention**: Use descriptive, lowercase names with hyphens
3. **Optimization**: Compress images for web use before adding
4. **Documentation**: Update relevant README files

### Component Development
1. **UI Components**: Add reusable components to `src/components/ui/`
2. **Feature Components**: Add feature-specific components to `src/components/`
3. **Pages**: Add new pages to `src/pages/`
4. **Types**: Define TypeScript types in `src/types/`

### Asset References
```tsx
// Public assets (served directly)
<img src="/assets/gallery/gallery-01.jpg" alt="Beauty work showcase" />

// Source assets (imported and processed)
import heroImage from '@/assets/hero/main-banner.jpg';
```

## Benefits of This Structure

1. **Performance**: Proper asset organization improves loading times
2. **Maintainability**: Clear structure makes code easier to maintain
3. **Scalability**: Structure supports application growth
4. **Developer Experience**: Easy to find and organize files
5. **SEO**: Proper asset organization helps with search engine optimization
6. **Accessibility**: Organized structure supports better alt text and descriptions

## Next Steps

1. **Image Optimization**: Consider optimizing the gallery images for web use
2. **Component Integration**: Create gallery components to use the organized images
3. **Performance Monitoring**: Monitor loading times with the new structure
4. **Content Management**: Consider implementing a system for easy image updates

