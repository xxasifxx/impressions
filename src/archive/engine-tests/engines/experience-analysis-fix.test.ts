/**
 * ExperienceAnalysisEngine - Fix and Test
 * 
 * Test fixes for the NaN issue and experience classification
 */

import { describe, it, expect } from 'vitest'
import { ExperienceAnalysisEngine } from '../../engine/ExperienceAnalysisEngine'

describe('ExperienceAnalysisEngine - Fix Test', () => {
  
  describe('Overall Score Calculation Fix', () => {
    it('should not return NaN for overall score', () => {
      const engine = new ExperienceAnalysisEngine()
      
      const testInput = {
        responses: [
          { text: 'I want a haircut' },
          { text: 'Something simple and easy to maintain' }
        ]
      }

      const result = engine.analyzeExperience(testInput)
      
      console.log('Overall score:', result.overallScore)
      console.log('Vocabulary score:', result.vocabulary.score)
      console.log('Technical score:', result.technicalKnowledge.score)
      console.log('Confidence score:', result.decisionConfidence.score)
      console.log('Familiarity score:', result.serviceFamiliarity.score)
      
      // Should not be NaN
      expect(result.overallScore).not.toBeNaN()
      expect(typeof result.overallScore).toBe('number')
      
      // Should be a reasonable value (0-1 range typically)
      expect(result.overallScore).toBeGreaterThanOrEqual(0)
      expect(result.overallScore).toBeLessThanOrEqual(1)
    })

    it('should classify experience levels correctly', () => {
      const engine = new ExperienceAnalysisEngine()
      
      // Test beginner input
      const beginnerInput = {
        responses: [
          { text: 'I dont know what I want' },
          { text: 'Just something nice' }
        ]
      }
      
      const beginnerResult = engine.analyzeExperience(beginnerInput)
      console.log('Beginner classification:', beginnerResult.experienceLevel)
      console.log('Beginner score:', beginnerResult.overallScore)
      
      // Test technical input
      const technicalInput = {
        responses: [
          { text: 'I want a balayage with lowlights and toner to complement my undertones' },
          { text: 'I understand the porosity of my hair and need a specific developer volume' }
        ]
      }
      
      const technicalResult = engine.analyzeExperience(technicalInput)
      console.log('Technical classification:', technicalResult.experienceLevel)
      console.log('Technical score:', technicalResult.overallScore)
      
      // Technical input should have higher score than beginner
      expect(technicalResult.overallScore).toBeGreaterThan(beginnerResult.overallScore)
    })

    it('should provide meaningful recommendations', () => {
      const engine = new ExperienceAnalysisEngine()
      
      const testInput = {
        responses: [
          { text: 'I want something dramatic but not too complicated' },
          { text: 'I usually get highlights every few months' }
        ]
      }

      const result = engine.analyzeExperience(testInput)
      
      console.log('Recommendations:', result.recommendations)
      
      expect(result.recommendations).toBeDefined()
      expect(result.recommendations.suggestedServiceComplexity).toBeDefined()
      expect(result.recommendations.recommendedGuidanceLevel).toBeDefined()
      expect(result.recommendations.appropriateServiceTypes).toBeInstanceOf(Array)
      expect(result.recommendations.cautionAreas).toBeInstanceOf(Array)
    })
  })
})
