# Aesthetic Evolution System: Product Specification

## 1. Overview

The Aesthetic Evolution System provides subtle visual feedback during the consultation process by evolving colors and typography based on user choices. This creates a personalized visual experience that continues through the user journey, providing hints that user decisions are influencing their personalized landing page.

## 2. User Profiles

The system is designed to accommodate these primary user profiles:

### 2.1 Service-Focused Profiles

**Natural Minimalist**
- Prefers subtle, natural-looking results
- Values simplicity and low maintenance
- Typically seeks services that enhance natural features
- Responds to: Organic colors, clean typography, minimal visual complexity

**Dramatic Transformer**
- Seeks noticeable, impactful changes
- Willing to invest time in maintenance
- Typically seeks bold, transformative services
- Responds to: Vibrant colors, expressive typography, higher visual contrast

**Precision Specialist**
- Seeks technical expertise for specific concerns
- Detail-oriented and research-focused
- Typically seeks specialized treatments
- Responds to: Cool colors, structured typography, information-rich layouts

**Luxury Indulger**
- Values premium experience and results
- Willing to invest in high-end services
- Typically seeks comprehensive packages
- Responds to: Rich colors, elegant typography, sophisticated visual language

**Quick Refresher**
- Time-conscious, seeking efficient services
- Practical and results-oriented
- Typically seeks express services
- Responds to: Clear colors, efficient typography, straightforward layouts

### 2.2 Demographic-Influenced Profiles

**Young Trendsetter**
- Age 18-30, trend-conscious
- Experimental and social media aware
- Typically seeks current trends and styles
- Responds to: Bold colors, contemporary typography, dynamic layouts

**Established Professional**
- Age 30-50, image-conscious
- Balances trends with professional appearance
- Typically seeks polished, appropriate styles
- Responds to: Refined colors, balanced typography, elegant layouts

**Mature Sophisticate**
- Age 50+, quality-focused
- Values timeless style and comfort
- Typically seeks classic services with modern touches
- Responds to: Subtle colors, readable typography, spacious layouts

### 2.3 Concern-Based Profiles

**Problem Solver**
- Addressing specific issues or concerns
- Results-focused and practical
- Typically seeks corrective services
- Responds to: Trustworthy colors, clear typography, informative layouts

**Wellness Seeker**
- Holistic approach to beauty and self-care
- Values natural ingredients and processes
- Typically seeks services with health benefits
- Responds to: Calming colors, organic typography, harmonious layouts

**Special Occasion Preparer**
- Preparing for a specific event
- Timeline-driven with clear goals
- Typically seeks packages or combined services
- Responds to: Celebratory colors, special typography, focused layouts

## 3. Consultation Flow and Aesthetic Evolution

### 3.1 Consultation Structure

The consultation follows a decision tree structure with these key sections:

1. **Service Category Selection** (Primary domain selection)
2. **Style Preference Questions** (Aesthetic direction)
3. **Specific Concerns/Goals** (Problem-solving focus)
4. **Experience/Confidence Level** (Complexity adaptation)
5. **Practical Constraints** (Time, budget, maintenance)

### 3.2 Evolution Timing

The aesthetic evolution occurs at these specific points:

1. **Initial State**: Neutral, balanced aesthetic that appeals broadly
2. **Major Shift**: After service category selection (primary domain established)
3. **Refinement Points**: After key preference questions (style, concerns, experience)
4. **Subtle Adjustments**: Throughout remaining questions
5. **Final State**: Fully realized personalized aesthetic on the resultant landing page

### 3.3 Visual Feedback Principles

- Changes are noticeable but not distracting
- Each significant choice creates a meaningful visual shift
- Changes accumulate to create a cohesive final aesthetic
- The evolution previews the personalized landing page experience

## 4. Color Evolution System

### 4.1 Color Palette Structure

Each color palette consists of:

- **Primary Color**: Main brand/interface color
- **Secondary Color**: Supporting color for variety and hierarchy
- **Accent Color**: Highlight color for important elements
- **Background Color**: Page background
- **Surface Colors**: Card/container backgrounds
- **Text Colors**: Primary and secondary text

### 4.2 Base Domain Palettes

**Hair Services Base**
```css
:root {
  --color-primary: hsl(0, 70%, 50%);        /* Red */
  --color-secondary: hsl(30, 60%, 60%);     /* Warm orange */
  --color-accent: hsl(25, 80%, 40%);        /* Bronze */
  --color-background: hsl(30, 30%, 98%);    /* Warm white */
  --color-surface: hsl(30, 20%, 97%);       /* Warm off-white */
  --color-text: hsl(0, 0%, 15%);            /* Near black */
  --color-text-secondary: hsl(0, 0%, 40%);  /* Dark gray */
}
```

**Skincare Services Base**
```css
:root {
  --color-primary: hsl(150, 40%, 50%);      /* Mint green */
  --color-secondary: hsl(180, 40%, 70%);    /* Soft teal */
  --color-accent: hsl(160, 50%, 40%);       /* Emerald */
  --color-background: hsl(170, 30%, 98%);   /* Cool white */
  --color-surface: hsl(170, 20%, 97%);      /* Cool off-white */
  --color-text: hsl(170, 10%, 15%);         /* Cool near black */
  --color-text-secondary: hsl(170, 5%, 40%); /* Cool dark gray */
}
```

**Makeup Services Base**
```css
:root {
  --color-primary: hsl(320, 50%, 50%);      /* Pink */
  --color-secondary: hsl(350, 60%, 65%);    /* Coral */
  --color-accent: hsl(330, 60%, 45%);       /* Magenta */
  --color-background: hsl(330, 30%, 98%);   /* Soft pink white */
  --color-surface: hsl(330, 20%, 97%);      /* Soft pink off-white */
  --color-text: hsl(330, 5%, 15%);          /* Warm near black */
  --color-text-secondary: hsl(330, 5%, 40%); /* Warm dark gray */
}
```

**Specialized Services Base**
```css
:root {
  --color-primary: hsl(210, 50%, 50%);      /* Blue */
  --color-secondary: hsl(200, 40%, 65%);    /* Light blue */
  --color-accent: hsl(220, 70%, 45%);       /* Royal blue */
  --color-background: hsl(210, 30%, 98%);   /* Cool blue white */
  --color-surface: hsl(210, 20%, 97%);      /* Cool blue off-white */
  --color-text: hsl(210, 10%, 15%);         /* Cool near black */
  --color-text-secondary: hsl(210, 5%, 40%); /* Cool dark gray */
}
```

### 4.3 Color Evolution Mechanisms

**HSL Modification System**
```javascript
// Example of HSL modification function
function modifyHSL(baseColor, modifications) {
  const hsl = parseHSL(baseColor);
  
  // Apply modifications
  if (modifications.hue) hsl.h = (hsl.h + modifications.hue + 360) % 360;
  if (modifications.saturation) hsl.s = Math.max(0, Math.min(100, hsl.s + modifications.saturation));
  if (modifications.lightness) hsl.l = Math.max(0, Math.min(100, hsl.l + modifications.lightness));
  
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}
```

**Key Color Adjustments**
```javascript
// Example color adjustments for style preferences
const colorAdjustments = {
  'natural-preference': {
    primary: { saturation: -15, lightness: +5 },    // More muted, slightly lighter
    accent: { saturation: -20, lightness: +5 },     // More muted accent
    background: { saturation: -5, lightness: +2 }   // Slightly more neutral background
  },
  'dramatic-preference': {
    primary: { saturation: +15, lightness: -5 },    // More vibrant, slightly darker
    accent: { saturation: +20, lightness: 0 },      // More vibrant accent
    background: { saturation: +5, lightness: 0 }    // Slightly more colorful background
  },
  'elegant-preference': {
    primary: { hue: +10, saturation: -10, lightness: -5 },  // Warmer, more muted, slightly darker
    accent: { saturation: -5, lightness: -10 },             // More subdued accent
    background: { saturation: -5, lightness: +2 }           // Slightly more neutral background
  }
};
```

**Color Relationship Management**
```javascript
// Ensure color relationships remain harmonious
function updateRelatedColors(colorVar, modifications) {
  // Update the primary color
  const newPrimary = modifyHSL(getCSSVar(colorVar), modifications);
  setCSSVar(colorVar, newPrimary);
  
  // Update related colors to maintain harmony
  if (colorVar === '--color-primary') {
    // Derive secondary color (30° hue shift, 10% more saturation, 15% lighter)
    const primaryHSL = parseHSL(newPrimary);
    const secondaryHSL = {
      h: (primaryHSL.h + 30) % 360,
      s: Math.min(100, primaryHSL.s + 10),
      l: Math.min(90, primaryHSL.l + 15)
    };
    setCSSVar('--color-secondary', `hsl(${secondaryHSL.h}, ${secondaryHSL.s}%, ${secondaryHSL.l}%)`);
    
    // Update text colors for contrast if needed
    updateTextColorsForContrast();
  }
}
```

### 4.4 Specific Color Evolution Examples

**Example: Natural to Dramatic Evolution**
```
Starting (Hair Services Base):
--color-primary: hsl(0, 70%, 50%)     /* Vibrant red */

After "Natural Look" selection:
--color-primary: hsl(0, 55%, 55%)     /* Softer, lighter red */

After "Long-lasting" selection:
--color-primary: hsl(0, 60%, 52%)     /* Slightly more saturated */

After "Special occasion" selection:
--color-primary: hsl(0, 65%, 48%)     /* More saturated, slightly darker */

Final state:
--color-primary: hsl(0, 65%, 48%)     /* Rich, slightly muted red */
--color-secondary: hsl(30, 50%, 65%)  /* Soft warm orange */
--color-accent: hsl(25, 60%, 45%)     /* Warm bronze accent */
```

**Example: Clinical to Wellness Evolution**
```
Starting (Specialized Services Base):
--color-primary: hsl(210, 50%, 50%)   /* Blue */

After "Sensitive skin" selection:
--color-primary: hsl(200, 40%, 55%)   /* Softer, lighter blue */

After "Natural ingredients" selection:
--color-primary: hsl(175, 40%, 55%)   /* Shift toward teal */

After "Relaxation" selection:
--color-primary: hsl(160, 45%, 50%)   /* Shift toward green */

Final state:
--color-primary: hsl(160, 45%, 50%)   /* Soft teal-green */
--color-secondary: hsl(180, 35%, 70%) /* Light aqua */
--color-accent: hsl(140, 50%, 40%)    /* Emerald green accent */
```

## 5. Typography Evolution System

### 5.1 Typography Structure

Each typography system consists of:

- **Heading Font Family**: For titles and headings
- **Body Font Family**: For body text and UI elements
- **Font Weights**: For hierarchy and emphasis
- **Font Sizes**: For hierarchy and readability
- **Letter Spacing**: For style and readability
- **Line Heights**: For readability and visual rhythm

### 5.2 Metatag-Based Font Selection

The system selects font families based on the primary metatag that emerges from the consultation:

```javascript
const metatagFontMapping = {
  // Transformation-focused metatags
  'dramatic-transformation': {
    headingFont: 'Abril Fatface, serif',       // Bold, dramatic, attention-grabbing
    bodyFont: 'Montserrat, sans-serif'         // Clean, modern complement
  },
  'subtle-enhancement': {
    headingFont: 'Cormorant Garamond, serif',  // Refined, elegant, understated
    bodyFont: 'Lato, sans-serif'               // Clean, unobtrusive
  },
  
  // Experience-focused metatags
  'luxury-experience': {
    headingFont: 'Playfair Display, serif',    // Upscale, sophisticated
    bodyFont: 'Libre Franklin, sans-serif'     // Elegant, refined
  },
  'express-service': {
    headingFont: 'Nunito Sans, sans-serif',    // Efficient, friendly
    bodyFont: 'Open Sans, sans-serif'          // Highly readable, practical
  },
  
  // Style-focused metatags
  'artistic-creative': {
    headingFont: 'Dancing Script, cursive',    // Expressive, artistic
    bodyFont: 'Poppins, sans-serif'            // Modern, clean
  },
  'classic-timeless': {
    headingFont: 'Baskerville, serif',         // Traditional, timeless
    bodyFont: 'Libre Baskerville, serif'       // Classic, readable
  },
  
  // Technique-focused metatags
  'precision-technical': {
    headingFont: 'Inter, sans-serif',          // Technical, precise
    bodyFont: 'IBM Plex Sans, sans-serif'      // Clear, structured
  },
  'organic-natural': {
    headingFont: 'Quicksand, sans-serif',      // Soft, organic
    bodyFont: 'Source Sans Pro, sans-serif'    // Natural, approachable
  }
};
```

### 5.3 Subtle Typography Adjustments

After the main font family selection, these specific properties are adjusted:

**Font Weight Adjustments**
```javascript
// Specific font weight adjustments
const weightAdjustments = {
  // Confidence-related answers
  'answer-very-confident': {
    '--font-weight-heading': 700,  // Bold heading for confident users
    '--font-weight-body': 400      // Normal body text
  },
  'answer-somewhat-confident': {
    '--font-weight-heading': 600,  // Semi-bold heading
    '--font-weight-body': 400      // Normal body text
  },
  'answer-not-confident': {
    '--font-weight-heading': 400,  // Regular heading for less confident users
    '--font-weight-body': 300      // Lighter body text
  }
};
```

**Font Size Adjustments**
```javascript
// Specific font size adjustments
const sizeAdjustments = {
  // Information density preferences
  'answer-less-information': {
    '--font-size-heading': '2rem',      // Standard heading size
    '--font-size-body': '0.95rem'       // Slightly smaller body text
  },
  'answer-more-information': {
    '--font-size-heading': '1.75rem',   // Smaller heading to make room
    '--font-size-body': '1rem'          // Standard body text size
  }
};
```

**Letter Spacing Adjustments**
```javascript
// Specific letter spacing adjustments
const spacingAdjustments = {
  // Style preferences
  'answer-elegant-style': {
    '--letter-spacing-heading': '0.025em',  // Slightly more spaced for elegance
    '--letter-spacing-body': '0.01em'       // Subtle spacing in body text
  },
  'answer-modern-style': {
    '--letter-spacing-heading': '-0.01em',  // Tighter heading for modern look
    '--letter-spacing-body': '0em'          // Normal spacing for body
  }
};
```

**Line Height Adjustments**
```javascript
// Specific line height adjustments
const lineHeightAdjustments = {
  // Content density preferences
  'answer-airy-layout': {
    '--line-height-heading': '1.4',  // More spacious heading lines
    '--line-height-body': '1.7'      // Airy body text
  },
  'answer-compact-layout': {
    '--line-height-heading': '1.2',  // Tighter heading lines
    '--line-height-body': '1.5'      // Standard body text spacing
  }
};
```

### 5.4 Typography Evolution Examples

**Example: Precision to Artistic Evolution**
```
Starting (Default):
Font Family: System sans-serif
Font Weight: 400 (regular)
Letter Spacing: 0em (normal)

After Service Category (Makeup Services):
Font Family: Dancing Script (headings), Poppins (body)
Font Weight: 400 (regular)
Letter Spacing: 0em (normal)

After Style Preference (Creative):
Font Family: Dancing Script (headings), Poppins (body)
Font Weight: 500 (medium)
Letter Spacing: -0.01em (slightly tighter)

After Information Preference (Detailed):
Font Family: Dancing Script (headings), Poppins (body)
Font Weight: 500 (medium)
Letter Spacing: -0.01em (slightly tighter)
Font Size: 1.75rem (headings), 1rem (body)
Line Height: 1.3 (headings), 1.7 (body)
```

**Example: Express to Luxury Evolution**
```
Starting (Default):
Font Family: System sans-serif
Font Weight: 400 (regular)
Letter Spacing: 0em (normal)

After Service Category (Hair Services):
Font Family: Playfair Display (headings), Libre Franklin (body)
Font Weight: 400 (regular)
Letter Spacing: 0em (normal)

After Style Preference (Elegant):
Font Family: Playfair Display (headings), Libre Franklin (body)
Font Weight: 400 (regular)
Letter Spacing: 0.025em (slightly spaced)

After Experience Level (Expert):
Font Family: Playfair Display (headings), Libre Franklin (body)
Font Weight: 600 (semi-bold)
Letter Spacing: 0.025em (slightly spaced)
```

## 6. Technical Implementation

### 6.1 CSS Variable System

```css
:root {
  /* Color Variables */
  --color-primary: hsl(210, 50%, 50%);
  --color-secondary: hsl(200, 40%, 65%);
  --color-accent: hsl(220, 70%, 45%);
  --color-background: hsl(210, 30%, 98%);
  --color-surface: hsl(210, 20%, 97%);
  --color-text: hsl(210, 10%, 15%);
  --color-text-secondary: hsl(210, 5%, 40%);
  
  /* Typography Variables */
  --font-family-heading: system-ui, sans-serif;
  --font-family-body: system-ui, sans-serif;
  --font-weight-heading: 400;
  --font-weight-body: 400;
  --font-size-heading: 2rem;
  --font-size-body: 1rem;
  --letter-spacing-heading: 0em;
  --letter-spacing-body: 0em;
  --line-height-heading: 1.3;
  --line-height-body: 1.5;
  
  /* Transition Variables */
  --transition-duration: 0.3s;
  --transition-timing: ease-out;
}

/* Apply variables to elements */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-heading);
  line-height: var(--line-height-heading);
  color: var(--color-text);
  transition: all var(--transition-duration) var(--transition-timing);
}

body, p, li, input, button {
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-body);
  font-size: var(--font-size-body);
  letter-spacing: var(--letter-spacing-body);
  line-height: var(--line-height-body);
  color: var(--color-text);
  transition: all var(--transition-duration) var(--transition-timing);
}
```

### 6.2 Metatag Tracking System

```javascript
// Track accumulated metatag scores
const userProfile = {
  metatags: {},
  primaryMetatag: null,
  secondaryMetatag: null,
  
  // Update metatag scores
  updateMetatags(answerId) {
    const metatags = answerMetatags[answerId];
    if (!metatags) return;
    
    // Update scores
    Object.entries(metatags).forEach(([metatag, score]) => {
      this.metatags[metatag] = (this.metatags[metatag] || 0) + score;
    });
    
    // Recalculate primary and secondary metatags
    this.recalculateMetatags();
  },
  
  // Recalculate primary and secondary metatags
  recalculateMetatags() {
    const sortedMetatags = Object.entries(this.metatags)
      .sort((a, b) => b[1] - a[1]);
    
    this.primaryMetatag = sortedMetatags[0]?.[0] || null;
    this.secondaryMetatag = sortedMetatags[1]?.[0] || null;
  }
};
```

### 6.3 Answer Processing System

```javascript
// Process user answers
function processAnswer(questionId, answerId) {
  // Update metatags
  userProfile.updateMetatags(answerId);
  
  // Check if this is a typography decision point
  if (isTypographyDecisionPoint(questionId)) {
    applyTypographyChange();
  }
  
  // Apply color changes if this question impacts colors
  if (shouldTriggerColorChange(questionId)) {
    applyColorChange(answerId);
  }
  
  // Apply subtle typography adjustments
  applySubtleTypographyAdjustments(answerId);
}
```

### 6.4 Component Selection System

```javascript
// Component selection based on user profile
function selectComponents(userProfile) {
  const components = [];
  
  // Primary components based on main interest
  const primaryComponents = getComponentsByTag(userProfile.primaryInterest);
  components.push(...primaryComponents.map(c => ({...c, priority: 'high'})));
  
  // Secondary components based on secondary interests
  const secondaryComponents = getComponentsByTag(userProfile.secondaryInterests);
  components.push(...secondaryComponents.map(c => ({...c, priority: 'medium'})));
  
  // Discovery components based on related interests
  const discoveryComponents = getRelatedComponents(userProfile);
  components.push(...discoveryComponents.map(c => ({...c, priority: 'low'})));
  
  // Sort by priority and relevance
  return components.sort((a, b) => {
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.relevance - a.relevance;
  });
}
```

## 7. User Experience Flow

### 7.1 Home Page

- Neutral, inviting aesthetic that appeals to all users
- System font, balanced colors
- Clear entry point to consultation

### 7.2 Consultation Start

- Initial neutral aesthetic
- Introduction of base domain aesthetic after service category selection
- First major visual shift occurs here

### 7.3 During Consultation

- Progressive evolution of colors based on key preference questions
- One major typography change based on emerging primary metatag
- Subtle adjustments to typography weight, size, and spacing
- Each significant choice creates a noticeable but non-disruptive change

### 7.4 Consultation Completion

- Transition to fully realized personalized aesthetic
- Clear indication that personalization is complete
- Preview of the personalized landing page experience

### 7.5 Resultant Landing Page

- Complete personalized experience with:
  - Fully realized color palette
  - Personalized typography
  - Components selected and arranged based on user profile
  - Primary focus on immediate interests
  - Secondary focus on related interests

### 7.6 Checkout & Booking

- Maintained personalized aesthetic
- Functional clarity for transaction process
- Consistent visual identity throughout

