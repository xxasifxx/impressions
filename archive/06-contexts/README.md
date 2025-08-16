# Contexts

The Impressions Beauty Web project uses React Context API for state management, providing a way to share state across components without prop drilling. The contexts are organized by domain to maintain separation of concerns.

## Cart Contexts

The cart contexts manage the shopping cart state and operations throughout the application.

### CartContext

The primary cart context for managing service selections.

**State:**
- `cartItems`: Array of items in the cart
- `totalPrice`: Total price of all items
- `totalDuration`: Total duration of all services

**Actions:**
- `addToCart`: Adds a service to the cart
- `removeFromCart`: Removes a service from the cart
- `updateQuantity`: Updates the quantity of a cart item
- `clearCart`: Removes all items from the cart
- `applyDiscount`: Applies a discount to the cart

### ServiceCartContext

A specialized context for managing service-specific cart operations.

**State:**
- `selectedServices`: Array of selected services
- `serviceAddons`: Map of service add-ons
- `serviceDurations`: Map of service durations

**Actions:**
- `selectService`: Adds a service to the selection
- `deselectService`: Removes a service from the selection
- `addAddon`: Adds an add-on to a service
- `removeAddon`: Removes an add-on from a service
- `transferToCart`: Moves selected services to the main cart

### UnifiedCartContext

A higher-level context that integrates multiple cart contexts for a unified experience.

**State:**
- `allItems`: Combined items from all carts
- `domainTotals`: Price totals by service domain
- `grandTotal`: Total price across all domains
- `savings`: Total savings from discounts and bundles

**Actions:**
- `addItem`: Adds an item to the appropriate cart
- `removeItem`: Removes an item from its cart
- `applyBundle`: Applies a bundle to the cart
- `checkout`: Initiates the checkout process

## Modal Contexts

The modal contexts manage the state and behavior of modal dialogs throughout the application.

### ModalStateContext

The primary context for managing modal state.

**State:**
- `isOpen`: Whether the modal is currently open
- `view`: The current view/content of the modal
- `data`: Data associated with the current modal view
- `history`: Stack of previous modal views for navigation

**Actions:**
- `openModal`: Opens the modal with specified view and data
- `closeModal`: Closes the modal
- `setView`: Changes the current modal view
- `goBack`: Returns to the previous modal view
- `resetModal`: Resets the modal to its initial state

## Theme Contexts

The theme contexts manage the visual styling and theming throughout the application.

### DomainThemeContext

Manages domain-specific theming based on the current service domain.

**State:**
- `currentDomain`: The active service domain (hair, makeup, med spa)
- `domainColors`: Color schemes for each domain
- `domainTypography`: Typography settings for each domain
- `domainSpacing`: Spacing values for each domain

**Actions:**
- `setDomain`: Changes the active domain
- `getDomainStyle`: Retrieves styling for the current domain
- `applyDomainTheme`: Applies domain-specific styling to an element

### AestheticContext

Manages the aesthetic evolution of the UI based on user preferences and journey stage.

**State:**
- `currentStyle`: The active aesthetic style
- `styleHistory`: History of previously applied styles
- `transitionState`: Current transition between styles
- `userPreferences`: User style preferences

**Actions:**
- `evolveStyle`: Progresses the aesthetic style based on user journey
- `setStylePreference`: Updates user style preferences
- `applyTransition`: Applies a transition between styles
- `resetStyle`: Resets to the default style

