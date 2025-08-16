/**
 * Contextual Visual Language System
 * 
 * Professional visual vocabularies that match beauty service contexts.
 * Each context has its own visual language that reinforces semantic meaning
 * and professional standards without being superficial decoration.
 */

import { ProfessionalContext } from '../types/VisualEvolutionTypes';

export interface VisualVocabulary {
  // Shape language
  shapes: {
    primary: 'geometric' | 'organic' | 'flowing' | 'structured' | 'minimal';
    secondary: 'angular' | 'curved' | 'mixed' | 'soft' | 'precise';
    borderRadius: {
      small: number;
      medium: number;
      large: number;
    };
  };
  
  // Visual textures and surfaces
  textures: {
    surface: 'smooth' | 'textured' | 'matte' | 'glossy' | 'natural';
    depth: 'flat' | 'subtle' | 'layered' | 'dimensional' | 'rich';
    finish: 'clean' | 'refined' | 'organic' | 'polished' | 'premium';
  };
  
  // Visual rhythm and pacing
  rhythm: {
    pacing: 'steady' | 'flowing' | 'dynamic' | 'calm' | 'energetic';
    spacing: 'generous' | 'comfortable' | 'efficient' | 'tight' | 'minimal';
    grouping: 'loose' | 'related' | 'structured' | 'unified' | 'complex';
  };
  
  // Precision and attention to detail
  precision: {
    alignment: 'exact' | 'refined' | 'organic' | 'loose' | 'structured';
    consistency: 'strict' | 'professional' | 'natural' | 'flexible' | 'systematic';
    detailing: 'minimal' | 'subtle' | 'appropriate' | 'rich' | 'intricate';
  };
  
  // Color approach (semantic, not decorative)
  colorApproach: {
    palette: 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'neutral';
    saturation: 'muted' | 'balanced' | 'rich' | 'vibrant' | 'subdued';
    contrast: 'subtle' | 'moderate' | 'strong' | 'dramatic' | 'minimal';
    temperature: 'cool' | 'warm' | 'neutral' | 'mixed' | 'balanced';
  };
}

export interface SemanticReinforcement {
  // Trust indicators (functional, not decorative)
  trustIndicators: string[];
  
  // Expertise markers (professional credibility)
  expertiseMarkers: string[];
  
  // Quality signals (premium without being flashy)
  qualitySignals: string[];
  
  // Contextual cues (industry-appropriate)
  contextualCues: string[];
}

export interface ContextualVisualLanguage {
  context: ProfessionalContext;
  vocabulary: VisualVocabulary;
  semanticReinforcement: SemanticReinforcement;
  
  // Functional purpose (required by charter)
  functionalPurpose: string;
  
  // Integration with cognitive load
  cognitiveLoadAdaptation: {
    minimal: Partial<VisualVocabulary>;
    simple: Partial<VisualVocabulary>;
    balanced: Partial<VisualVocabulary>;
    rich: Partial<VisualVocabulary>;
    sophisticated: Partial<VisualVocabulary>;
  };
}

/**
 * Professional Visual Languages for Beauty Services
 */
export const CONTEXTUAL_VISUAL_LANGUAGES: Record<ProfessionalContext, ContextualVisualLanguage> = {
  clinical: {
    context: 'clinical',
    functionalPurpose: 'Reinforce scientific credibility and precision for skincare analysis and technical consultations',
    vocabulary: {
      shapes: {
        primary: 'geometric',
        secondary: 'angular',
        borderRadius: { small: 4, medium: 8, large: 12 }
      },
      textures: {
        surface: 'matte',
        depth: 'flat',
        finish: 'clean'
      },
      rhythm: {
        pacing: 'steady',
        spacing: 'generous',
        grouping: 'structured'
      },
      precision: {
        alignment: 'exact',
        consistency: 'strict',
        detailing: 'minimal'
      },
      colorApproach: {
        palette: 'monochromatic',
        saturation: 'muted',
        contrast: 'moderate',
        temperature: 'cool'
      }
    },
    semanticReinforcement: {
      trustIndicators: ['precise measurements', 'scientific terminology', 'clean data presentation'],
      expertiseMarkers: ['technical accuracy', 'professional protocols', 'evidence-based recommendations'],
      qualitySignals: ['attention to detail', 'systematic approach', 'clinical standards'],
      contextualCues: ['medical-grade precision', 'analytical framework', 'objective assessment']
    },
    cognitiveLoadAdaptation: {
      minimal: {
        shapes: { borderRadius: { small: 2, medium: 4, large: 6 } },
        rhythm: { spacing: 'generous', grouping: 'loose' }
      },
      simple: {
        shapes: { borderRadius: { small: 3, medium: 6, large: 9 } },
        rhythm: { spacing: 'comfortable', grouping: 'related' }
      },
      balanced: {}, // Use base vocabulary
      rich: {
        precision: { detailing: 'subtle' },
        textures: { depth: 'subtle' }
      },
      sophisticated: {
        precision: { detailing: 'appropriate' },
        textures: { depth: 'layered' }
      }
    }
  },

  artistic: {
    context: 'artistic',
    functionalPurpose: 'Express creativity and artistic vision for makeup artistry and creative beauty services',
    vocabulary: {
      shapes: {
        primary: 'flowing',
        secondary: 'curved',
        borderRadius: { small: 8, medium: 16, large: 24 }
      },
      textures: {
        surface: 'textured',
        depth: 'layered',
        finish: 'refined'
      },
      rhythm: {
        pacing: 'flowing',
        spacing: 'comfortable',
        grouping: 'related'
      },
      precision: {
        alignment: 'organic',
        consistency: 'natural',
        detailing: 'appropriate'
      },
      colorApproach: {
        palette: 'analogous',
        saturation: 'balanced',
        contrast: 'moderate',
        temperature: 'warm'
      }
    },
    semanticReinforcement: {
      trustIndicators: ['artistic portfolio', 'creative expertise', 'aesthetic sensibility'],
      expertiseMarkers: ['color theory knowledge', 'technique mastery', 'artistic vision'],
      qualitySignals: ['attention to beauty', 'creative refinement', 'artistic standards'],
      contextualCues: ['creative expression', 'artistic flow', 'beauty enhancement']
    },
    cognitiveLoadAdaptation: {
      minimal: {
        shapes: { primary: 'minimal', borderRadius: { small: 4, medium: 8, large: 12 } },
        rhythm: { pacing: 'calm', spacing: 'generous' }
      },
      simple: {
        shapes: { borderRadius: { small: 6, medium: 12, large: 18 } },
        rhythm: { spacing: 'comfortable' }
      },
      balanced: {}, // Use base vocabulary
      rich: {
        textures: { depth: 'dimensional' },
        precision: { detailing: 'rich' }
      },
      sophisticated: {
        textures: { depth: 'rich' },
        precision: { detailing: 'intricate' }
      }
    }
  },

  sophisticated: {
    context: 'sophisticated',
    functionalPurpose: 'Convey elegance and refinement for hair styling and sophisticated beauty transformations',
    vocabulary: {
      shapes: {
        primary: 'structured',
        secondary: 'precise',
        borderRadius: { small: 6, medium: 12, large: 18 }
      },
      textures: {
        surface: 'smooth',
        depth: 'subtle',
        finish: 'polished'
      },
      rhythm: {
        pacing: 'steady',
        spacing: 'efficient',
        grouping: 'structured'
      },
      precision: {
        alignment: 'refined',
        consistency: 'professional',
        detailing: 'subtle'
      },
      colorApproach: {
        palette: 'monochromatic',
        saturation: 'subdued',
        contrast: 'subtle',
        temperature: 'neutral'
      }
    },
    semanticReinforcement: {
      trustIndicators: ['professional excellence', 'refined technique', 'sophisticated results'],
      expertiseMarkers: ['advanced training', 'precision skills', 'aesthetic refinement'],
      qualitySignals: ['attention to elegance', 'professional polish', 'sophisticated standards'],
      contextualCues: ['refined beauty', 'elegant transformation', 'professional sophistication']
    },
    cognitiveLoadAdaptation: {
      minimal: {
        shapes: { primary: 'minimal', borderRadius: { small: 3, medium: 6, large: 9 } },
        rhythm: { spacing: 'generous', grouping: 'loose' }
      },
      simple: {
        shapes: { borderRadius: { small: 4, medium: 8, large: 12 } },
        rhythm: { spacing: 'comfortable' }
      },
      balanced: {}, // Use base vocabulary
      rich: {
        textures: { depth: 'layered', finish: 'premium' },
        precision: { detailing: 'appropriate' }
      },
      sophisticated: {
        textures: { depth: 'dimensional', finish: 'premium' },
        precision: { detailing: 'rich' }
      }
    }
  },

  luxury: {
    context: 'luxury',
    functionalPurpose: 'Communicate premium quality and exclusivity for high-end beauty experiences',
    vocabulary: {
      shapes: {
        primary: 'structured',
        secondary: 'precise',
        borderRadius: { small: 8, medium: 16, large: 24 }
      },
      textures: {
        surface: 'glossy',
        depth: 'dimensional',
        finish: 'premium'
      },
      rhythm: {
        pacing: 'calm',
        spacing: 'minimal',
        grouping: 'unified'
      },
      precision: {
        alignment: 'exact',
        consistency: 'systematic',
        detailing: 'rich'
      },
      colorApproach: {
        palette: 'complementary',
        saturation: 'rich',
        contrast: 'dramatic',
        temperature: 'mixed'
      }
    },
    semanticReinforcement: {
      trustIndicators: ['premium quality', 'exclusive access', 'luxury standards'],
      expertiseMarkers: ['master-level skills', 'premium techniques', 'luxury expertise'],
      qualitySignals: ['exceptional attention to detail', 'premium materials', 'luxury experience'],
      contextualCues: ['exclusive beauty', 'luxury transformation', 'premium service']
    },
    cognitiveLoadAdaptation: {
      minimal: {
        shapes: { primary: 'minimal', borderRadius: { small: 4, medium: 8, large: 12 } },
        rhythm: { spacing: 'generous', grouping: 'loose' },
        textures: { surface: 'matte', depth: 'flat' }
      },
      simple: {
        shapes: { borderRadius: { small: 6, medium: 12, large: 18 } },
        rhythm: { spacing: 'comfortable' },
        textures: { depth: 'subtle' }
      },
      balanced: {}, // Use base vocabulary
      rich: {
        textures: { depth: 'rich' },
        precision: { detailing: 'intricate' }
      },
      sophisticated: {
        textures: { depth: 'rich', finish: 'premium' },
        precision: { detailing: 'intricate' },
        colorApproach: { contrast: 'dramatic' }
      }
    }
  },

  wellness: {
    context: 'wellness',
    functionalPurpose: 'Promote natural beauty and holistic well-being for organic and wellness-focused services',
    vocabulary: {
      shapes: {
        primary: 'organic',
        secondary: 'soft',
        borderRadius: { small: 12, medium: 20, large: 32 }
      },
      textures: {
        surface: 'natural',
        depth: 'subtle',
        finish: 'organic'
      },
      rhythm: {
        pacing: 'flowing',
        spacing: 'comfortable',
        grouping: 'related'
      },
      precision: {
        alignment: 'organic',
        consistency: 'natural',
        detailing: 'subtle'
      },
      colorApproach: {
        palette: 'analogous',
        saturation: 'muted',
        contrast: 'subtle',
        temperature: 'warm'
      }
    },
    semanticReinforcement: {
      trustIndicators: ['natural ingredients', 'holistic approach', 'wellness focus'],
      expertiseMarkers: ['natural beauty knowledge', 'wellness expertise', 'organic techniques'],
      qualitySignals: ['natural quality', 'holistic care', 'wellness standards'],
      contextualCues: ['natural beauty', 'holistic wellness', 'organic enhancement']
    },
    cognitiveLoadAdaptation: {
      minimal: {
        shapes: { borderRadius: { small: 8, medium: 12, large: 16 } },
        rhythm: { spacing: 'generous', grouping: 'loose' }
      },
      simple: {
        shapes: { borderRadius: { small: 10, medium: 16, large: 24 } },
        rhythm: { spacing: 'comfortable' }
      },
      balanced: {}, // Use base vocabulary
      rich: {
        textures: { depth: 'layered' },
        precision: { detailing: 'appropriate' }
      },
      sophisticated: {
        textures: { depth: 'dimensional' },
        precision: { detailing: 'rich' }
      }
    }
  },

  precision: {
    context: 'precision',
    functionalPurpose: 'Emphasize accuracy and technical skill for brow shaping and precision beauty procedures',
    vocabulary: {
      shapes: {
        primary: 'geometric',
        secondary: 'angular',
        borderRadius: { small: 2, medium: 4, large: 8 }
      },
      textures: {
        surface: 'matte',
        depth: 'flat',
        finish: 'clean'
      },
      rhythm: {
        pacing: 'steady',
        spacing: 'efficient',
        grouping: 'structured'
      },
      precision: {
        alignment: 'exact',
        consistency: 'strict',
        detailing: 'minimal'
      },
      colorApproach: {
        palette: 'monochromatic',
        saturation: 'muted',
        contrast: 'strong',
        temperature: 'neutral'
      }
    },
    semanticReinforcement: {
      trustIndicators: ['technical precision', 'accurate results', 'detailed work'],
      expertiseMarkers: ['precision skills', 'technical mastery', 'detailed expertise'],
      qualitySignals: ['attention to precision', 'technical excellence', 'accurate standards'],
      contextualCues: ['precise beauty', 'technical accuracy', 'detailed enhancement']
    },
    cognitiveLoadAdaptation: {
      minimal: {
        shapes: { borderRadius: { small: 1, medium: 2, large: 4 } },
        rhythm: { spacing: 'generous', grouping: 'loose' }
      },
      simple: {
        shapes: { borderRadius: { small: 2, medium: 3, large: 6 } },
        rhythm: { spacing: 'comfortable' }
      },
      balanced: {}, // Use base vocabulary
      rich: {
        precision: { detailing: 'subtle' },
        textures: { depth: 'subtle' }
      },
      sophisticated: {
        precision: { detailing: 'appropriate' },
        textures: { depth: 'layered' }
      }
    }
  },

  dramatic: {
    context: 'dramatic',
    functionalPurpose: 'Express bold transformation and statement-making beauty for dramatic looks and bold changes',
    vocabulary: {
      shapes: {
        primary: 'geometric',
        secondary: 'angular',
        borderRadius: { small: 4, medium: 8, large: 16 }
      },
      textures: {
        surface: 'glossy',
        depth: 'dimensional',
        finish: 'polished'
      },
      rhythm: {
        pacing: 'dynamic',
        spacing: 'tight',
        grouping: 'unified'
      },
      precision: {
        alignment: 'exact',
        consistency: 'systematic',
        detailing: 'rich'
      },
      colorApproach: {
        palette: 'complementary',
        saturation: 'vibrant',
        contrast: 'dramatic',
        temperature: 'mixed'
      }
    },
    semanticReinforcement: {
      trustIndicators: ['bold expertise', 'transformation skills', 'dramatic results'],
      expertiseMarkers: ['advanced techniques', 'bold vision', 'transformation mastery'],
      qualitySignals: ['attention to impact', 'bold excellence', 'dramatic standards'],
      contextualCues: ['bold beauty', 'dramatic transformation', 'statement enhancement']
    },
    cognitiveLoadAdaptation: {
      minimal: {
        shapes: { primary: 'minimal', borderRadius: { small: 2, medium: 4, large: 8 } },
        rhythm: { spacing: 'generous', grouping: 'loose' },
        colorApproach: { saturation: 'muted', contrast: 'moderate' }
      },
      simple: {
        shapes: { borderRadius: { small: 3, medium: 6, large: 12 } },
        rhythm: { spacing: 'comfortable' },
        colorApproach: { saturation: 'balanced' }
      },
      balanced: {}, // Use base vocabulary
      rich: {
        textures: { depth: 'rich' },
        precision: { detailing: 'intricate' }
      },
      sophisticated: {
        textures: { depth: 'rich' },
        precision: { detailing: 'intricate' },
        colorApproach: { contrast: 'dramatic' }
      }
    }
  },

  natural: {
    context: 'natural',
    functionalPurpose: 'Enhance natural beauty and promote subtle, everyday enhancement for natural looks',
    vocabulary: {
      shapes: {
        primary: 'organic',
        secondary: 'soft',
        borderRadius: { small: 8, medium: 16, large: 24 }
      },
      textures: {
        surface: 'matte',
        depth: 'subtle',
        finish: 'natural'
      },
      rhythm: {
        pacing: 'calm',
        spacing: 'comfortable',
        grouping: 'related'
      },
      precision: {
        alignment: 'organic',
        consistency: 'natural',
        detailing: 'subtle'
      },
      colorApproach: {
        palette: 'analogous',
        saturation: 'muted',
        contrast: 'subtle',
        temperature: 'warm'
      }
    },
    semanticReinforcement: {
      trustIndicators: ['natural enhancement', 'subtle expertise', 'everyday beauty'],
      expertiseMarkers: ['natural techniques', 'subtle mastery', 'enhancement skills'],
      qualitySignals: ['attention to naturalness', 'subtle excellence', 'natural standards'],
      contextualCues: ['natural beauty', 'subtle enhancement', 'everyday elegance']
    },
    cognitiveLoadAdaptation: {
      minimal: {
        shapes: { borderRadius: { small: 6, medium: 12, large: 18 } },
        rhythm: { spacing: 'generous', grouping: 'loose' }
      },
      simple: {
        shapes: { borderRadius: { small: 7, medium: 14, large: 21 } },
        rhythm: { spacing: 'comfortable' }
      },
      balanced: {}, // Use base vocabulary
      rich: {
        textures: { depth: 'layered' },
        precision: { detailing: 'appropriate' }
      },
      sophisticated: {
        textures: { depth: 'dimensional' },
        precision: { detailing: 'rich' }
      }
    }
  }
};

