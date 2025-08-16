# Styles

The Impressions Beauty Web project implements a sophisticated styling system that adapts to user preferences, service domains, and journey stages. The styling is organized into several categories to maintain separation of concerns and enable dynamic visual evolution.

## Tokens

Design tokens serve as the foundation of the styling system, providing consistent values for colors, typography, spacing, and other visual elements.

### aesthetic-tokens.css

CSS variables that define the base aesthetic properties of the application.

**Key Token Categories:**
- **Colors**: Primary, secondary, accent, neutral, and semantic colors
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Margin and padding values
- **Borders**: Border widths, radii, and styles
- **Shadows**: Box shadow values for different elevation levels
- **Animations**: Timing functions, durations, and delays
- **Breakpoints**: Viewport size breakpoints for responsive design

### contextual-visual-tokens.css

CSS variables that adapt based on the current context, such as service domain or user preferences.

**Key Token Categories:**
- **Domain Colors**: Color schemes specific to each service domain
- **Emotional States**: Color and style variations for different emotional states
- **User Journey Stages**: Visual adaptations based on the user's position in the journey
- **Interaction States**: Visual feedback for different interaction states
- **Content Types**: Visual treatments for different types of content

## Themes

Themes define cohesive sets of visual properties that can be applied throughout the application.

### ContextualVisualLanguage.ts

Defines how visual elements adapt based on context.

**Key Features:**
- **Domain Adaptation**: Visual adjustments based on service domain
- **Journey Stage Adaptation**: Visual evolution throughout the user journey
- **Preference Adaptation**: Adjustments based on user preferences
- **Content Adaptation**: Visual treatments based on content type
- **Emotional Resonance**: Visual elements that align with emotional states

### EmotionalStates.ts

Defines visual representations of different emotional states.

**Key Features:**
- **Emotion Mapping**: Maps emotions to visual properties
- **Intensity Levels**: Variations based on emotional intensity
- **Transition Mapping**: Defines transitions between emotional states
- **Combination Handling**: Manages visual representation of mixed emotions
- **Default Fallbacks**: Provides default styling when emotional state is unknown

## Evolution

The style evolution system manages the progressive enhancement of visual elements throughout the user journey.

### ArtStyleEvolution.ts

Defines how the visual style evolves based on user preferences and journey stage.

**Key Features:**
- **Evolution Stages**: Defines progressive stages of visual enhancement
- **Transition Logic**: Determines when and how to transition between stages
- **Preference Influence**: How user preferences affect the evolution path
- **Milestone Triggers**: Special visual enhancements at key journey milestones
- **Persistence**: Maintains evolution state across sessions

### ArtStyleTransitions.ts

Manages smooth transitions between different visual states.

**Key Features:**
- **Transition Types**: Different transition effects for various scenarios
- **Timing Functions**: Easing functions for natural-feeling transitions
- **Sequential Transitions**: Coordinated transitions across multiple elements
- **Interruption Handling**: Gracefully handles interrupted transitions
- **Performance Optimization**: Techniques to ensure smooth transitions

