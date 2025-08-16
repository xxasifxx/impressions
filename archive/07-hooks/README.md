# Hooks

The Impressions Beauty Web project uses custom React hooks to encapsulate and reuse stateful logic throughout the application. These hooks are organized by domain to maintain separation of concerns.

## Consultation Hooks

These hooks manage the consultation flow and decision tree navigation.

### useConsultation

The primary hook for managing the consultation process.

**State:**
- `currentNode`: The current node in the decision tree
- `responses`: User responses collected so far
- `progress`: Percentage of consultation completed
- `results`: Consultation results (if completed)

**Methods:**
- `startConsultation`: Initializes the consultation process
- `answerQuestion`: Records a user response and advances to the next node
- `goBack`: Returns to the previous question
- `resetConsultation`: Resets the consultation to the beginning
- `getResults`: Calculates and returns consultation results

### useConsultationNode

A specialized hook for working with individual consultation nodes.

**State:**
- `nodeData`: Data for the current node
- `options`: Available options for the current node
- `selectedOption`: Currently selected option (if any)

**Methods:**
- `selectOption`: Sets the selected option
- `getNextNode`: Determines the next node based on the selected option
- `isLeafNode`: Checks if the current node is a leaf node
- `getNodeMetadata`: Retrieves metadata for the current node

### useDecisionTree

A hook for navigating and manipulating the decision tree structure.

**State:**
- `tree`: The complete decision tree structure
- `currentPath`: Path taken through the tree so far
- `availablePaths`: Possible paths from the current position

**Methods:**
- `navigateTo`: Moves to a specific node in the tree
- `getPathToNode`: Finds the path to a specific node
- `findNodesByTag`: Finds nodes with specific metadata tags
- `optimizePath`: Finds the shortest path to a specific outcome

## Styling Hooks

These hooks manage dynamic styling and visual appearance.

### useAestheticEvolution

A hook for managing the evolution of visual styling based on user preferences.

**State:**
- `currentStyle`: The current aesthetic style
- `evolutionStage`: Current stage in the style evolution
- `transitionState`: State of transition between styles

**Methods:**
- `evolveStyle`: Advances to the next evolution stage
- `setStylePreference`: Updates style based on user preference
- `applyTransition`: Applies a transition between styles
- `getStyleProperties`: Gets CSS properties for the current style

### useDynamicStyling

A hook for applying dynamic styling based on context and state.

**State:**
- `themeConfig`: Current theme configuration
- `contextualStyles`: Styles specific to the current context
- `responsiveStyles`: Styles adapted to the current viewport

**Methods:**
- `getStyles`: Gets computed styles for a specific element
- `applyContextualStyle`: Applies context-specific styling
- `updateResponsiveStyles`: Updates styles based on viewport changes
- `getAnimationProps`: Gets animation properties for transitions

### useModalState

A hook for managing modal state and transitions.

**State:**
- `isOpen`: Whether the modal is open
- `view`: Current modal view
- `history`: Stack of previous views
- `transitionState`: Current transition state

**Methods:**
- `openModal`: Opens the modal with a specific view
- `closeModal`: Closes the modal
- `changeView`: Changes to a different modal view
- `goBack`: Returns to the previous view
- `resetModal`: Resets the modal to its initial state

## Cart Hooks

These hooks manage shopping cart functionality.

### useUnifiedCart

A hook for managing the unified shopping cart experience.

**State:**
- `cartItems`: Items in the cart
- `totalPrice`: Total price of all items
- `discounts`: Applied discounts
- `bundles`: Applied service bundles

**Methods:**
- `addToCart`: Adds an item to the cart
- `removeFromCart`: Removes an item from the cart
- `updateQuantity`: Updates the quantity of an item
- `applyBundle`: Applies a service bundle
- `applyDiscount`: Applies a discount
- `calculateTotal`: Recalculates the total price
- `checkout`: Initiates the checkout process

