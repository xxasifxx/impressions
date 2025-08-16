/**
 * Experience Detection Patterns - Production Data
 * 
 * SCOPE: Hardcoded intelligence patterns for classifying user experience levels
 * in beauty consultations. Contains vocabulary, technical, confidence, and familiarity patterns.
 * 
 * SUCCESS CRITERIA:
 * - Pattern coverage: Each experience level has 3+ distinct pattern types
 * - Pattern accuracy: 85%+ correct classification when patterns match
 * - Pattern completeness: Common beauty terminology covered across all categories
 * - Pattern weights: Properly balanced to avoid over/under-classification
 * 
 * CONSTRAINTS:
 * - English language patterns only (basic support for other languages)
 * - Beauty industry focused (hair, makeup, skincare, wellness)
 * - Static patterns (no dynamic learning or updates)
 * - Case-insensitive matching (patterns stored in lowercase)
 * 
 * PATTERN STRUCTURE:
 * - id: Unique identifier for debugging and maintenance
 * - name: Human-readable description of pattern purpose
 * - category: 'vocabulary' | 'technical' | 'confidence' | 'familiarity'
 * - experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
 * - patterns: Array of text patterns to match
 * - weight: Importance factor (0-1, higher = more important)
 * - context: Optional service contexts where pattern applies
 * - negativePatterns: Patterns that contradict this experience level
 * 
 * KNOWN ISSUES:
 * 1. Pattern overlap: Some patterns may match multiple experience levels
 * 2. Context sensitivity: Generic patterns may not work well in all service contexts
 * 3. Language evolution: Beauty terminology changes over time
 * 4. Cultural differences: Patterns may not work for all cultural contexts
 * 
 * MAINTENANCE PROCEDURES:
 * 1. Monthly review: Check pattern effectiveness with real consultation data
 * 2. Pattern updates: Add new terminology as beauty industry evolves
 * 3. Weight adjustment: Modify pattern weights based on classification accuracy
 * 4. Context expansion: Add new service contexts as business grows
 * 
 * DIAGNOSTIC METHODS:
 * - Check pattern match counts in analysis results
 * - Review evidence arrays for pattern matching details
 * - Monitor classification accuracy by experience level
 * - Test new patterns with known good/bad examples
 * 
 * EMERGENCY PROCEDURES:
 * - If patterns cause misclassification: Temporarily disable problematic patterns
 * - If new terminology appears: Add emergency patterns with low weights
 * - If performance degrades: Reduce pattern count or optimize matching logic
 */

import { ExperiencePattern } from '../types/ExperienceTypes';

/**
 * Vocabulary Complexity Patterns
 * Analyze sophistication of language usage
 */
export const VOCABULARY_PATTERNS: ExperiencePattern[] = [
  // Beginner Vocabulary
  {
    id: 'vocab-beginner-uncertainty',
    name: 'Uncertainty Language',
    category: 'vocabulary',
    experienceLevel: 'beginner',
    patterns: [
      'not sure', 'maybe', 'i think', 'probably', 'i guess',
      'help me', 'what do you think', 'is that good', 'should i',
      'i dont know', 'confused', 'overwhelmed', 'first time'
    ],
    weight: 0.8,
    negativePatterns: ['definitely', 'exactly', 'specifically', 'precisely']
  },
  
  {
    id: 'vocab-beginner-basic',
    name: 'Basic Beauty Terms',
    category: 'vocabulary',
    experienceLevel: 'beginner',
    patterns: [
      'haircut', 'makeup', 'facial', 'manicure', 'pedicure',
      'eyebrows', 'hair color', 'highlights', 'trim',
      'look good', 'pretty', 'nice', 'normal', 'regular'
    ],
    weight: 0.6
  },

  // Intermediate Vocabulary
  {
    id: 'vocab-intermediate-specific',
    name: 'Specific Service Terms',
    category: 'vocabulary',
    experienceLevel: 'intermediate',
    patterns: [
      'balayage', 'ombre', 'contouring', 'highlighting', 'bronzing',
      'microblading', 'lash extensions', 'gel manicure', 'shellac',
      'deep conditioning', 'root touch up', 'color correction'
    ],
    weight: 0.7
  },

  {
    id: 'vocab-intermediate-preferences',
    name: 'Preference Expression',
    category: 'vocabulary',
    experienceLevel: 'intermediate',
    patterns: [
      'i prefer', 'i usually get', 'i like', 'works well for me',
      'my hair type', 'my skin tone', 'complements my', 'suits me',
      'last time i', 'previously had', 'similar to'
    ],
    weight: 0.6
  },

  // Advanced Vocabulary
  {
    id: 'vocab-advanced-technical',
    name: 'Technical Beauty Terms',
    category: 'vocabulary',
    experienceLevel: 'advanced',
    patterns: [
      'color theory', 'undertones', 'face shape', 'bone structure',
      'hair texture', 'porosity', 'elasticity', 'cuticle',
      'ph balance', 'oxidation', 'developer', 'toner'
    ],
    weight: 0.8
  },

  // Expert Vocabulary
  {
    id: 'vocab-expert-professional',
    name: 'Professional Terminology',
    category: 'vocabulary',
    experienceLevel: 'expert',
    patterns: [
      'formulation', 'application technique', 'processing time',
      'color wheel', 'complementary colors', 'warm vs cool tones',
      'hair density', 'growth patterns', 'facial proportions',
      'product chemistry', 'ingredient interactions'
    ],
    weight: 0.9
  }
];

/**
 * Technical Knowledge Patterns
 * Assess understanding of beauty processes and techniques
 */
export const TECHNICAL_KNOWLEDGE_PATTERNS: ExperiencePattern[] = [
  // Beginner Technical Knowledge
  {
    id: 'tech-beginner-basic',
    name: 'Basic Process Questions',
    category: 'technical',
    experienceLevel: 'beginner',
    patterns: [
      'how long does it take', 'what happens during', 'is it painful',
      'how much does it cost', 'do i need appointment',
      'what should i bring', 'how do i prepare', 'will it damage'
    ],
    weight: 0.7
  },

  // Intermediate Technical Knowledge
  {
    id: 'tech-intermediate-process',
    name: 'Process Understanding',
    category: 'technical',
    experienceLevel: 'intermediate',
    patterns: [
      'bleaching process', 'color lifting', 'processing time',
      'heat styling', 'chemical treatment', 'maintenance routine',
      'touch up schedule', 'aftercare instructions', 'product recommendations'
    ],
    weight: 0.8
  },

  // Advanced Technical Knowledge
  {
    id: 'tech-advanced-specific',
    name: 'Specific Technique Knowledge',
    category: 'technical',
    experienceLevel: 'advanced',
    patterns: [
      'foil technique', 'sectioning method', 'application pattern',
      'color placement', 'blending technique', 'layering method',
      'contouring strategy', 'highlighting placement', 'shadow work'
    ],
    weight: 0.9
  },

  // Expert Technical Knowledge
  {
    id: 'tech-expert-advanced',
    name: 'Advanced Technical Concepts',
    category: 'technical',
    experienceLevel: 'expert',
    patterns: [
      'color correction strategy', 'damage assessment', 'hair analysis',
      'skin undertone analysis', 'facial structure mapping',
      'product compatibility', 'chemical interactions', 'professional techniques'
    ],
    weight: 1.0
  }
];

/**
 * Decision Confidence Patterns
 * Evaluate certainty and decision-making confidence
 */
export const DECISION_CONFIDENCE_PATTERNS: ExperiencePattern[] = [
  // Low Confidence
  {
    id: 'confidence-low-uncertainty',
    name: 'High Uncertainty',
    category: 'confidence',
    experienceLevel: 'beginner',
    patterns: [
      'what do you recommend', 'you decide', 'whatever you think',
      'i trust your judgment', 'you know best', 'help me choose',
      'not sure what i want', 'open to suggestions', 'need guidance'
    ],
    weight: 0.8
  },

  // Medium Confidence
  {
    id: 'confidence-medium-guided',
    name: 'Guided Decision Making',
    category: 'confidence',
    experienceLevel: 'intermediate',
    patterns: [
      'what would work best', 'considering options', 'thinking about',
      'leaning towards', 'interested in', 'would like to try',
      'heard good things about', 'seen results', 'researched'
    ],
    weight: 0.7
  },

  // High Confidence
  {
    id: 'confidence-high-specific',
    name: 'Specific Requests',
    category: 'confidence',
    experienceLevel: 'advanced',
    patterns: [
      'i want exactly', 'specifically looking for', 'need to achieve',
      'must have', 'require', 'insist on', 'only interested in',
      'previous experience with', 'know what works', 'definite preference'
    ],
    weight: 0.9
  },

  // Very High Confidence
  {
    id: 'confidence-expert-directive',
    name: 'Expert Direction',
    category: 'confidence',
    experienceLevel: 'expert',
    patterns: [
      'use this technique', 'apply this method', 'specific product',
      'exact shade', 'precise timing', 'particular approach',
      'professional recommendation', 'industry standard', 'best practice'
    ],
    weight: 1.0
  }
];

/**
 * Service Familiarity Patterns
 * Assess previous experience with beauty services
 */
export const SERVICE_FAMILIARITY_PATTERNS: ExperiencePattern[] = [
  // First Time Experience
  {
    id: 'familiarity-first-time',
    name: 'First Time Indicators',
    category: 'familiarity',
    experienceLevel: 'beginner',
    patterns: [
      'first time', 'never had', 'never done', 'new to this',
      'always wanted to try', 'finally decided', 'heard about',
      'friend recommended', 'saw online', 'curious about'
    ],
    weight: 0.9
  },

  // Occasional Experience
  {
    id: 'familiarity-occasional',
    name: 'Occasional Service User',
    category: 'familiarity',
    experienceLevel: 'intermediate',
    patterns: [
      'had before', 'done this previously', 'last time was',
      'usually go to', 'sometimes get', 'occasionally have',
      'every few months', 'special occasions', 'when needed'
    ],
    weight: 0.7
  },

  // Regular Experience
  {
    id: 'familiarity-regular',
    name: 'Regular Service User',
    category: 'familiarity',
    experienceLevel: 'advanced',
    patterns: [
      'regular client', 'monthly appointment', 'routine maintenance',
      'standing appointment', 'usual service', 'regular schedule',
      'maintenance routine', 'consistent schedule', 'ongoing care'
    ],
    weight: 0.8
  },

  // Professional Experience
  {
    id: 'familiarity-professional',
    name: 'Professional Background',
    category: 'familiarity',
    experienceLevel: 'expert',
    patterns: [
      'work in beauty', 'professional background', 'industry experience',
      'trained in', 'certified', 'licensed', 'work as stylist',
      'beauty professional', 'colleague', 'industry knowledge'
    ],
    weight: 1.0
  }
];

/**
 * Context-Specific Patterns
 * Patterns that apply to specific service categories
 */
export const CONTEXT_SPECIFIC_PATTERNS: Record<string, ExperiencePattern[]> = {
  hair: [
    {
      id: 'hair-beginner-basic',
      name: 'Basic Hair Requests',
      category: 'familiarity',
      experienceLevel: 'beginner',
      patterns: ['just a trim', 'little off the ends', 'tidy up', 'clean up'],
      weight: 0.6,
      context: ['hair']
    },
    {
      id: 'hair-advanced-specific',
      name: 'Advanced Hair Techniques',
      category: 'technical',
      experienceLevel: 'advanced',
      patterns: ['color correction', 'bleach and tone', 'dimensional color', 'lived-in color'],
      weight: 0.9,
      context: ['hair']
    }
  ],
  
  makeup: [
    {
      id: 'makeup-beginner-basic',
      name: 'Basic Makeup Requests',
      category: 'familiarity',
      experienceLevel: 'beginner',
      patterns: ['natural look', 'everyday makeup', 'not too much', 'subtle'],
      weight: 0.6,
      context: ['makeup']
    },
    {
      id: 'makeup-expert-advanced',
      name: 'Advanced Makeup Techniques',
      category: 'technical',
      experienceLevel: 'expert',
      patterns: ['editorial look', 'avant garde', 'special effects', 'airbrush technique'],
      weight: 1.0,
      context: ['makeup']
    }
  ],
  
  skincare: [
    {
      id: 'skincare-intermediate-concerns',
      name: 'Specific Skin Concerns',
      category: 'technical',
      experienceLevel: 'intermediate',
      patterns: ['acne treatment', 'anti-aging', 'hyperpigmentation', 'sensitive skin'],
      weight: 0.7,
      context: ['skincare']
    }
  ]
};

/**
 * Pattern Weights Configuration
 * Defines how much each pattern category contributes to overall experience assessment
 */
export const PATTERN_WEIGHTS = {
  vocabulary: 0.25,
  technical: 0.35,
  confidence: 0.25,
  familiarity: 0.15
};

/**
 * Experience Level Thresholds
 * Score ranges for classifying experience levels
 */
export const EXPERIENCE_THRESHOLDS = {
  beginner: { min: 0.0, max: 0.3 },
  intermediate: { min: 0.3, max: 0.6 },
  advanced: { min: 0.6, max: 0.8 },
  expert: { min: 0.8, max: 1.0 }
};
