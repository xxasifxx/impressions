# AI Agent Prompt: Consultation Flow Question Design & Aesthetic Evolution Justification

## Context

You are tasked with designing the specific questions and options for our image-based consultation flow while ensuring they align with our aesthetic evolution system. The consultation flow has two distinct paths:

1. A specific service path that allows users to pinpoint their desired service in 3 decisions maximum
2. An exploration path for users who need guidance in discovering services

Your task is to analyze our comprehensive metatag system and service catalog to design effective questions and options that will guide users to appropriate service recommendations while supporting our aesthetic evolution approach.

## Available Resources

You have access to the following resources:

1. **Complete Metadata Tag System** (COMPLETE_METADATA_TAG_SYSTEM.md)
2. **Emotional Context Tags Service Mapping** (EmotionalContext_Tags_Service_Mapping.md)
3. **Consultation Flow Specification** (consultation-flow-specification.md)
4. **Aesthetic Evolution System Specification** (aesthetic-evolution-system-specification.md)
5. **Service catalog data** (available in various files)

## Primary Tasks

### 1. Analyze Metadata Tag System

- Review our complete metadata tag system to understand the attributes, categories, and relationships between services
- Identify the most meaningful tag groupings that could form the basis of consultation questions
- Determine which tags are most effective for disambiguating between service categories
- Map tags to visual concepts that could be represented in the consultation flow

### 2. Design Specific Service Path Questions

For the specific service path (3 decisions maximum):

- Design the exact wording for each of the three questions
- Create 4-8 options for each question with clear, concise labels
- Ensure options are visually distinguishable and can be represented with imagery
- Map each option to specific service categories, types, or individual services
- Justify how each question efficiently narrows down the service selection

### 3. Design Exploration Path Questions

For the exploration path:

- Design 3-5 primary questions focused on goals, preferences, and constraints
- Create adaptive follow-up questions based on previous selections
- Ensure questions effectively capture user intent without being overwhelming
- Design questions that collect sufficient information to generate meaningful recommendations
- Justify how these questions map to our service attributes and tags

### 4. Map Questions to Aesthetic Evolution

- Explain how the consultation flow questions support the aesthetic evolution system
- Identify specific moments in the flow where aesthetic evolution should occur
- Describe how user selections should influence the visual presentation
- Justify the connection between user preferences and aesthetic adaptations
- Ensure the consultation maintains coherence with the overall aesthetic evolution approach

### 5. Define Data Mapping Logic

- Create specific mapping rules between question responses and service attributes
- Define weighting systems for how different responses influence recommendations
- Establish clear logic for generating primary, secondary, and tertiary recommendations
- Design package recommendation rules based on consultation responses
- Ensure the mapping logic is implementable within our technical framework

## Output Requirements

Provide your analysis and recommendations in the following format:

### 1. Metadata Tag Analysis
- Summary of key tag categories and their relevance to the consultation flow
- Identification of tags that best support decision-making
- Visual concept mapping for key tags

### 2. Specific Service Path Design
- Complete question and option text for all three decision points
- Mapping of options to service categories
- Decision tree visualization
- Justification for the chosen approach

### 3. Exploration Path Design
- Primary question designs with options
- Adaptive follow-up question logic
- User profile generation approach
- Justification for question selection and sequencing

### 4. Aesthetic Evolution Integration
- Key aesthetic evolution triggers within the consultation flow
- Mapping of user selections to aesthetic adaptations
- Visual progression examples
- Coherence justification with overall system

### 5. Implementation Recommendations
- Data structure recommendations
- Mapping rule specifications
- Recommendation generation algorithm
- Technical considerations for implementation

## Constraints & Guidelines

- Questions must be answerable by average users without specialized knowledge
- Options should be visually distinct and representable with imagery
- The specific service path must reach a specific service recommendation in exactly 3 decisions
- The exploration path should adapt based on user responses
- All questions and options must map to our existing metadata tag system
- The aesthetic evolution must feel natural and enhance the user experience
- Recommendations must be justifiable based on user selections
- The system must support cross-domain discovery (finding services across traditional boundaries)

## Evaluation Criteria

Your recommendations will be evaluated based on:

1. Alignment with our metadata tag system and service catalog
2. Efficiency of the specific service path (3 decisions maximum)
3. Effectiveness of the exploration path in capturing user intent
4. Integration with the aesthetic evolution system
5. Technical feasibility of implementation
6. User-friendliness and clarity of questions and options
7. Potential for driving business results (conversions, AOV, service discovery)

## Additional Context

Our service catalog spans multiple domains (hair, makeup, spa, brows, nails, waxing) with varying levels of technical complexity. Users range from those with very specific service needs to those who are unsure what services might best address their concerns or goals. The consultation flow must accommodate both types of users while maintaining an engaging, visually-driven experience that evolves aesthetically based on user selections.

The consultation is mandatory for all users but should respect their time and intent, with the specific service path providing a fast-track option for those who know what they want, while the exploration path offers more guidance for those who need it.

## Deliverable Format

Provide your complete analysis and recommendations in a structured markdown document that can be directly implemented by our development team. Include specific question text, option labels, mapping rules, and technical specifications.

