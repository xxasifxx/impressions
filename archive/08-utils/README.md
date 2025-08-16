# Utils

The Impressions Beauty Web project includes various utility functions organized by domain to provide reusable functionality throughout the application.

## Bundling Utils

These utilities handle service bundling logic and calculations.

### bundleMatching.ts

Functions for matching and creating service bundles.

**Key Functions:**
- `findCompatibleServices`: Identifies services that work well together
- `calculateBundleDiscount`: Determines the discount for a bundle
- `createBundle`: Creates a bundle from selected services
- `rankBundles`: Sorts bundles by relevance to user preferences
- `getBundleSavings`: Calculates the savings amount for a bundle
- `validateBundle`: Checks if a bundle is valid (e.g., no conflicts)
- `getBundleMetadata`: Extracts metadata for a bundle based on its services

## Filtering Utils

These utilities handle filtering and sorting of services and other data.

### filterMatching.ts

Functions for filtering and matching services based on criteria.

**Key Functions:**
- `filterByTags`: Filters services by metadata tags
- `filterByPrice`: Filters services by price range
- `filterByDuration`: Filters services by duration range
- `sortByRelevance`: Sorts services by relevance to user preferences
- `sortByPrice`: Sorts services by price (ascending or descending)
- `sortByPopularity`: Sorts services by popularity
- `matchUserPreferences`: Matches services to user preferences
- `calculateRelevanceScore`: Calculates how relevant a service is to preferences

## Styling Utils

These utilities handle dynamic styling and visual appearance.

### artEvolution.ts

Functions for managing the evolution of visual styling.

**Key Functions:**
- `getEvolutionStage`: Determines the current evolution stage
- `calculateStyleTransition`: Calculates transition parameters between styles
- `blendStyles`: Blends two styles based on a transition factor
- `getStageProperties`: Gets style properties for a specific evolution stage
- `mapPreferencesToStyle`: Maps user preferences to style attributes

### colorBlending.ts

Functions for color manipulation and blending.

**Key Functions:**
- `blendColors`: Blends two colors with a specified ratio
- `darken`: Darkens a color by a specified amount
- `lighten`: Lightens a color by a specified amount
- `getContrastColor`: Gets a contrasting color (black or white) for a given color
- `createGradient`: Creates a gradient between two colors
- `createPalette`: Creates a color palette from a base color

### domainThemes.ts

Functions for managing domain-specific theming.

**Key Functions:**
- `getDomainColors`: Gets the color scheme for a specific domain
- `getDomainTypography`: Gets typography settings for a specific domain
- `applyDomainTheme`: Applies domain-specific styling to an element
- `createDomainVariables`: Creates CSS variables for a domain theme
- `getDomainAccentColor`: Gets the accent color for a specific domain

### themeConfig.ts

Functions for managing theme configuration.

**Key Functions:**
- `createTheme`: Creates a theme configuration
- `extendTheme`: Extends a theme with additional properties
- `getThemeVariable`: Gets a variable from the current theme
- `applyTheme`: Applies a theme to the application
- `getResponsiveValue`: Gets a responsive value based on viewport size

## Session Utils

These utilities handle session management and persistence.

### sessionManager.ts

Functions for managing user sessions and data persistence.

**Key Functions:**
- `saveToSession`: Saves data to the session
- `getFromSession`: Retrieves data from the session
- `clearSession`: Clears session data
- `persistUserPreferences`: Saves user preferences to persistent storage
- `loadUserPreferences`: Loads user preferences from persistent storage
- `trackSessionDuration`: Tracks how long a session has been active
- `isSessionExpired`: Checks if the current session has expired

