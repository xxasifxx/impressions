# Container Architecture - Agent A Foundation

This directory contains the systematic container components that form the foundation of the Impressions Beauty Web consultation system.

## 🏗️ Architecture Overview

The container system provides a unified, reusable foundation for displaying content across the beauty consultation platform. Each container handles specific content types while maintaining consistent interaction patterns and dynamic styling.

## 📦 Container Types

### Core Containers

#### `ModalContainer`
**Purpose**: The heavy-lifting session manager for the consultation experience
- Manages complex session state without routes
- Handles navigation stack within modal
- Coordinates art style evolution
- Manages modal lifecycle and persistence

```tsx
<ModalContainer
  isOpen={isOpen}
  onClose={handleClose}
  persistenceStrategy="localStorage"
  showNavigation={true}
>
  {/* Consultation content */}
</ModalContainer>
```

#### `ServiceContainer`
**Purpose**: Displays beauty services with dynamic styling
- Multiple display modes: card, list, detailed, consultation
- Integrates with unified cart system
- Adapts styling based on consultation context
- Domain-specific theming

```tsx
<ServiceContainer
  service={service}
  displayMode="card"
  artEvolution={artEvolution}
  onInteraction={handleInteraction}
  showAddToCart={true}
/>
```

#### `ProductContainer`
**Purpose**: Displays beauty products with inventory management
- Handles product variants and inventory status
- Supports makeup, perfume, and vitamin products
- Dynamic pricing and stock management
- Bundle compatibility integration

```tsx
<ProductContainer
  product={product}
  displayMode="card"
  artEvolution={artEvolution}
  inventoryStatus={inventoryStatus}
  onInteraction={handleInteraction}
/>
```

#### `ConsultationContainer`
**Purpose**: Handles decision tree nodes with evolving aesthetics
- Supports different node types: entry, bundling, refinement, exit
- Dynamic art style evolution based on responses
- Progress tracking and navigation
- Multi-select and single-select options

```tsx
<ConsultationContainer
  node={consultationNode}
  nodeType="entry"
  artEvolution={artEvolution}
  onNodeComplete={handleNodeComplete}
  sessionContext={sessionContext}
/>
```

#### `DomainMarketingContainer`
**Purpose**: Marketing pages for each beauty domain
- Separate from consultation flow
- Domain-specific theming and content
- Hero sections, features, testimonials
- Triggers consultation modal

```tsx
<DomainMarketingContainer
  domain="hair-salon"
  marketingContent={hairSalonContent}
  onConsultationStart={startConsultation}
  onServiceExplore={exploreService}
/>
```

## 🎨 Dynamic Styling System

### Art Evolution
Containers adapt their styling based on consultation progress:
- **Theme Evolution**: Neutral → Elegant → Vibrant → Sophisticated
- **Intensity Scaling**: Visual prominence increases with user engagement
- **Color Palette Transitions**: Smooth color transitions based on responses

### Style Context
Each container receives dynamic styling through:
```tsx
const { className, inlineStyles, cssVariables } = useContainerStyling(
  artEvolution,
  'service', // container type
  'card'     // display mode
);
```

## 🔄 Interaction Patterns

### Unified Event System
All containers use consistent interaction patterns:
```tsx
onInteraction(action: string, payload: any) => void
```

Common actions:
- `ADD_TO_CART` - Add item to unified cart
- `VIEW_DETAILS` - View detailed information
- `CONSULTATION_SELECT` - Select item in consultation
- `START_CONSULTATION` - Begin consultation flow

### State Integration
Containers integrate with multiple context systems:
- `UnifiedCartContext` - Cart management
- `ModalStateContext` - Session and navigation
- `DomainThemeContext` - Domain-specific theming

## 🛠️ Usage Guidelines

### Display Modes
Each container supports multiple display modes:
- **card**: Full card layout with image and details
- **list**: Compact horizontal layout
- **detailed**: Expanded view with full information
- **consultation**: Streamlined selection interface

### Container Selection
Choose containers based on content type:
- Services (haircuts, makeup, facials) → `ServiceContainer`
- Products (makeup, perfume, vitamins) → `ProductContainer`
- Consultation questions → `ConsultationContainer`
- Marketing pages → `DomainMarketingContainer`
- Modal wrapper → `ModalContainer`

### Styling Customization
Containers support customization through:
- `className` prop for additional CSS classes
- Dynamic styling through art evolution
- Domain-specific theming
- Custom CSS variables

## 🔗 Integration with Other Agents

### Agent B (Decision Tree Engine)
- Uses `ConsultationContainer` for decision tree nodes
- Integrates with session state management
- Leverages art evolution for dynamic UX

### Agent C (Modal Experience Designer)
- Builds upon `ModalContainer` foundation
- Extends art evolution system
- Enhances modal state management

### Agent D (Bundling Intelligence)
- Utilizes bundle context in all containers
- Extends cart integration
- Adds intelligent recommendation logic

### Agent E (Integration Orchestrator)
- Tests complete container integration
- Validates cross-container communication
- Ensures performance optimization

## 📋 Development Notes

### Adding New Containers
1. Create container component in this directory
2. Implement consistent props interface
3. Add to `index.ts` exports
4. Update this README
5. Add integration tests

### Container Props Pattern
All containers should follow this pattern:
```tsx
interface ContainerProps {
  // Core data
  data: DataType;
  
  // Display configuration
  displayMode: DisplayMode;
  
  // Dynamic styling
  artEvolution: ArtEvolutionState;
  
  // Interaction handling
  onInteraction: (action: string, payload: any) => void;
  
  // Optional integrations
  cartActions?: CartActionHandlers;
  bundleContext?: BundleContext;
  
  // Customization
  className?: string;
}
```

### Performance Considerations
- Containers use React.memo for optimization
- Dynamic styling is memoized
- Event handlers are useCallback wrapped
- Large lists use virtualization when needed

## 🚀 Future Enhancements

### Planned Features
- Container composition patterns
- Advanced animation systems
- A/B testing integration
- Analytics event tracking
- Accessibility improvements

### Extension Points
- Custom container types
- Plugin-based functionality
- Theme system extensions
- Advanced state management

This container architecture provides the systematic foundation for the entire consultation system while maintaining flexibility for future enhancements and agent specializations.

