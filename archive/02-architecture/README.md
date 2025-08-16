# Architecture

## System Design

The Impressions Beauty Web application follows a component-based architecture with a clear separation of concerns. The system is designed around several key architectural patterns:

1. **Component-Based Architecture**: The UI is composed of reusable components organized in a hierarchical structure.

2. **Context-Based State Management**: React Context API is used for state management, with separate contexts for different domains (cart, modal, theme).

3. **Custom Hooks for Logic Encapsulation**: Business logic is encapsulated in custom hooks to promote reusability and separation of concerns.

4. **Engine-Based Processing**: Complex business logic is implemented as "engines" that handle specific domains (decision tree, rules, bundle recommendation, etc.).

5. **Data-Driven UI**: UI components are rendered based on structured data models, allowing for dynamic content generation.

## Multi-Agent Framework

The project follows a multi-agent implementation approach with five specialized agents:

1. **Agent A: Foundation Architect**
   - Container Architecture & Data Models
   - Responsible for the overall application structure, component hierarchy, and data models
   - Establishes the foundation for other agents to build upon

2. **Agent B: Decision Tree Engine**
   - Procedural Decision Tree & Rules Engine
   - Implements the consultation flow and decision logic
   - Creates the rules engine for service matching and filtering

3. **Agent C: Modal Experience Designer**
   - Stateful Modal UI & Art Style Evolution
   - Designs the modal-based user interface for the consultation
   - Implements the aesthetic evolution system for adaptive styling

4. **Agent D: Bundling Intelligence**
   - Bundling Logic & Pricing
   - Creates the service bundling algorithms and pricing strategies
   - Implements the cart functionality for managing selected services

5. **Agent E: Integration Orchestrator**
   - System Integration & Testing
   - Ensures proper integration between all components and systems
   - Implements testing strategies and quality assurance

## Container Architecture

The application uses a container-based component architecture with the following principles:

1. **Container Components**: Higher-level components that manage state and business logic
2. **Presentational Components**: UI-focused components that receive props and render accordingly
3. **Composition**: Complex UIs are built by composing smaller, focused components
4. **Prop Drilling Avoidance**: Context API is used to avoid excessive prop drilling

## Decision Tree Architecture

The consultation experience is built around a decision tree architecture:

1. **Node-Based Structure**: The consultation flow is represented as a graph of interconnected nodes
2. **Progressive Disclosure**: Questions and options are revealed progressively based on previous answers
3. **Conditional Branching**: The path through the decision tree adapts based on user responses
4. **Result Mapping**: Leaf nodes in the decision tree map to specific service recommendations

## Modal Experience

The modal experience is designed to provide a focused, step-by-step journey:

1. **Stateful Modal System**: Modals maintain their own state and can transition between different views
2. **Contextual Styling**: Visual appearance adapts based on the current stage and user preferences
3. **Progressive Enhancement**: The UI evolves aesthetically as the user progresses through the consultation
4. **Persistent State**: Modal state is preserved across navigation using context and local storage

## Bundling Intelligence

The service bundling system uses intelligent algorithms to create compelling offers:

1. **Complementary Service Detection**: Identifies services that work well together
2. **Dynamic Pricing**: Calculates bundle discounts based on service combinations
3. **Relevance Scoring**: Ranks bundles based on relevance to user preferences
4. **Cart Integration**: Seamlessly integrates with the cart system for easy selection

## Integration

The system integration approach ensures cohesive functionality across all components:

1. **Context Providers**: Top-level context providers ensure state is available throughout the application
2. **Hook Composition**: Custom hooks compose functionality from multiple sources
3. **Event-Based Communication**: Components communicate through events and context updates
4. **Consistent Data Flow**: Unidirectional data flow is maintained for predictable behavior

