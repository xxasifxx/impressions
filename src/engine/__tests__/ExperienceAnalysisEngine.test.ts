/**
 * Experience Analysis Engine Tests
 * 
 * Comprehensive tests for the production-grade experience analysis system.
 * Tests pattern matching, experience classification, and recommendation generation.
 */

import { ExperienceAnalysisEngine } from '../ExperienceAnalysisEngine';
import { ExperienceAnalysisInput, ExperienceLevel } from '../../types/ExperienceTypes';

describe('ExperienceAnalysisEngine', () => {
  let engine: ExperienceAnalysisEngine;
  
  beforeEach(() => {
    engine = new ExperienceAnalysisEngine();
  });
  
  describe('Basic Experience Classification', () => {
    test('should classify beginner user correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I'm not sure what I want. This is my first time getting highlights. Can you help me choose what would look good?",
            timestamp: new Date()
          },
          {
            text: "I don't know much about hair color. What do you recommend for someone with my skin tone?",
            timestamp: new Date()
          },
          {
            text: "How long does the process take? Will it damage my hair?",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.experienceLevel).toBe('beginner');
      expect(result.confidence).toBeOneOf(['medium', 'high', 'very-high']);
      expect(result.recommendations.suggestedServiceComplexity).toBe('simple');
      expect(result.recommendations.recommendedGuidanceLevel).toBe('comprehensive');
    });
    
    test('should classify intermediate user correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I usually get balayage done every 6 months. I prefer a natural look with subtle highlights.",
            timestamp: new Date()
          },
          {
            text: "Last time I had it done, the stylist used foils but I think I'd like to try the painting technique this time.",
            timestamp: new Date()
          },
          {
            text: "I have fine hair so I'm careful about not over-processing it. What would work best?",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.experienceLevel).toBe('intermediate');
      expect(result.recommendations.suggestedServiceComplexity).toBeOneOf(['moderate', 'complex']);
      expect(result.recommendations.recommendedGuidanceLevel).toBeOneOf(['moderate', 'minimal']);
    });
    
    test('should classify advanced user correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I need a color correction to fix this brassy tone. The previous colorist didn't tone it properly after bleaching.",
            timestamp: new Date()
          },
          {
            text: "I understand the process involves lifting the existing color first, then applying a toner to neutralize the unwanted tones.",
            timestamp: new Date()
          },
          {
            text: "I specifically want an ash blonde result. My hair has high porosity so it grabs color quickly.",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.experienceLevel).toBeOneOf(['advanced', 'expert']);
      expect(result.recommendations.suggestedServiceComplexity).toBeOneOf(['complex', 'advanced']);
      expect(result.vocabulary.technicalTermCount).toBeGreaterThan(0);
    });
    
    test('should classify expert user correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I work as a colorist and need a dimensional color using the balayage technique with strategic placement for face-framing.",
            timestamp: new Date()
          },
          {
            text: "I want to use a 20-volume developer with a specific toner formula to achieve the exact undertone I'm looking for.",
            timestamp: new Date()
          },
          {
            text: "The color theory here is important - I need complementary tones to neutralize the existing base color.",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.experienceLevel).toBe('expert');
      expect(result.recommendations.suggestedServiceComplexity).toBe('advanced');
      expect(result.recommendations.recommendedGuidanceLevel).toBeOneOf(['minimal', 'expert']);
      expect(result.vocabulary.professionalTerminology).toBeGreaterThan(0.5);
    });
  });
  
  describe('Context-Specific Analysis', () => {
    test('should analyze makeup context correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I need contouring and highlighting for my wedding. I want a dramatic look that will photograph well.",
            timestamp: new Date()
          },
          {
            text: "I understand color theory and want warm undertones to complement my skin. I need long-wearing formulas.",
            timestamp: new Date()
          }
        ],
        sessionContext: {
          serviceCategory: 'makeup'
        }
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.experienceLevel).toBeOneOf(['intermediate', 'advanced']);
      expect(result.vocabulary.technicalTermCount).toBeGreaterThan(0);
      expect(result.technicalKnowledge.score).toBeGreaterThan(0.4);
    });
    
    test('should analyze skincare context correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I have combination skin with some hyperpigmentation. I'm looking for a treatment that includes exfoliation.",
            timestamp: new Date()
          },
          {
            text: "I've used glycolic acid before but want to try something stronger. What about salicylic acid treatments?",
            timestamp: new Date()
          }
        ],
        sessionContext: {
          serviceCategory: 'skincare'
        }
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.experienceLevel).toBeOneOf(['intermediate', 'advanced']);
      expect(result.technicalKnowledge.serviceSpecificKnowledge).toBeGreaterThan(0);
    });
  });
  
  describe('Component Analysis', () => {
    test('should analyze vocabulary complexity correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I need a sophisticated color correction using advanced techniques and professional-grade products.",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.vocabulary.score).toBeGreaterThan(0.5);
      expect(result.vocabulary.sophisticatedLanguageUsage).toBeGreaterThan(0);
      expect(result.vocabulary.matchedPatterns.length).toBeGreaterThan(0);
    });
    
    test('should analyze technical knowledge correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "The processing time depends on the developer volume and my hair's porosity level.",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.technicalKnowledge.score).toBeGreaterThan(0.3);
      expect(result.technicalKnowledge.processUnderstanding).toBeGreaterThan(0);
    });
    
    test('should analyze decision confidence correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I definitely want exactly this shade. I'm specifically looking for this particular technique.",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.decisionConfidence.score).toBeGreaterThan(0.5);
      expect(result.decisionConfidence.certaintyLevel).toBeGreaterThan(0.5);
      expect(result.decisionConfidence.specificityOfRequests).toBeGreaterThan(0);
    });
    
    test('should analyze service familiarity correctly', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I've had this done before. I usually get this service every few months as part of my regular routine.",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.serviceFamiliarity.score).toBeGreaterThan(0.3);
      expect(result.serviceFamiliarity.previousServiceExperience).toBeGreaterThan(0);
    });
  });
  
  describe('Recommendation Generation', () => {
    test('should generate appropriate recommendations for beginners', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I'm new to this and need help choosing. What do you recommend?",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.recommendations.suggestedServiceComplexity).toBe('simple');
      expect(result.recommendations.recommendedGuidanceLevel).toBe('comprehensive');
      expect(result.recommendations.cautionAreas.length).toBeGreaterThan(0);
    });
    
    test('should generate appropriate recommendations for experts', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I'm a professional colorist and know exactly what technique and products I want to use.",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.recommendations.suggestedServiceComplexity).toBeOneOf(['complex', 'advanced']);
      expect(result.recommendations.recommendedGuidanceLevel).toBeOneOf(['minimal', 'expert']);
    });
  });
  
  describe('Edge Cases and Error Handling', () => {
    test('should handle insufficient responses gracefully', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "Hi",
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.experienceLevel).toBe('beginner');
      expect(result.confidence).toBe('low');
      expect(result.recommendations.cautionAreas).toContain('Insufficient data for reliable recommendations');
    });
    
    test('should handle empty responses', () => {
      const input: ExperienceAnalysisInput = {
        responses: []
      };
      
      const result = engine.analyzeExperience(input);
      
      expect(result.experienceLevel).toBe('beginner');
      expect(result.confidence).toBe('low');
    });
    
    test('should handle mixed signals in responses', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I'm not sure what I want", // Beginner signal
            timestamp: new Date()
          },
          {
            text: "I need color correction using advanced techniques", // Expert signal
            timestamp: new Date()
          }
        ]
      };
      
      const result = engine.analyzeExperience(input);
      
      // Should handle conflicting signals reasonably
      expect(['beginner', 'intermediate', 'advanced', 'expert']).toContain(result.experienceLevel);
      expect(result.confidence).toBeOneOf(['low', 'medium', 'high', 'very-high']);
    });
  });
  
  describe('Performance and Reliability', () => {
    test('should complete analysis within reasonable time', () => {
      const input: ExperienceAnalysisInput = {
        responses: Array(10).fill(null).map((_, i) => ({
          text: `This is response number ${i} with various beauty terms like balayage, contouring, and color correction.`,
          timestamp: new Date()
        }))
      };
      
      const startTime = Date.now();
      const result = engine.analyzeExperience(input);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
      expect(result).toBeDefined();
      expect(result.experienceLevel).toBeDefined();
    });
    
    test('should produce consistent results for identical input', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          {
            text: "I need balayage highlights with a natural look. I've had this done before.",
            timestamp: new Date()
          }
        ]
      };
      
      const result1 = engine.analyzeExperience(input);
      const result2 = engine.analyzeExperience(input);
      
      expect(result1.experienceLevel).toBe(result2.experienceLevel);
      expect(result1.overallScore).toBe(result2.overallScore);
      expect(result1.recommendations.suggestedServiceComplexity).toBe(result2.recommendations.suggestedServiceComplexity);
    });
  });
});

/**
 * Real-world scenario tests with actual consultation examples
 */
describe('Real-World Consultation Scenarios', () => {
  let engine: ExperienceAnalysisEngine;
  
  beforeEach(() => {
    engine = new ExperienceAnalysisEngine();
  });
  
  test('Wedding makeup consultation - intermediate user', () => {
    const input: ExperienceAnalysisInput = {
      responses: [
        {
          text: "I'm getting married in 3 months and need makeup that will last all day and look good in photos.",
          timestamp: new Date()
        },
        {
          text: "I usually wear makeup but nothing too dramatic. I want something elegant and timeless.",
          timestamp: new Date()
        },
        {
          text: "I've heard about airbrush makeup - would that be better for photography?",
          timestamp: new Date()
        }
      ],
      sessionContext: {
        serviceCategory: 'makeup'
      }
    };
    
    const result = engine.analyzeExperience(input);
    
    expect(result.experienceLevel).toBeOneOf(['intermediate', 'advanced']);
    expect(result.recommendations.appropriateServiceTypes).toContain('event-makeup');
  });
  
  test('Hair color correction consultation - advanced user', () => {
    const input: ExperienceAnalysisInput = {
      responses: [
        {
          text: "My previous colorist left my hair brassy and uneven. I need a color correction to get to a cool blonde.",
          timestamp: new Date()
        },
        {
          text: "I understand this might take multiple sessions and could be damaging, but my hair is in decent condition.",
          timestamp: new Date()
        },
        {
          text: "I'm thinking we'll need to use a toner after lifting to neutralize the orange tones.",
          timestamp: new Date()
        }
      ],
      sessionContext: {
        serviceCategory: 'hair'
      }
    };
    
    const result = engine.analyzeExperience(input);
    
    expect(result.experienceLevel).toBeOneOf(['advanced', 'expert']);
    expect(result.technicalKnowledge.score).toBeGreaterThan(0.6);
    expect(result.recommendations.suggestedServiceComplexity).toBeOneOf(['complex', 'advanced']);
  });
});

