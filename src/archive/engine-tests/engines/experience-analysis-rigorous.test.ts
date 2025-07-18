/**
 * ExperienceAnalysisEngine - Rigorous Testing
 * 
 * GOAL: Understand HOW the engine works, not just that it produces output
 * - What patterns does it actually recognize?
 * - How does the scoring system work?
 * - Can it differentiate between experience levels?
 * - What are the edge cases and failure modes?
 */

import { describe, it, expect } from 'vitest'
import { ExperienceAnalysisEngine } from '../../engine/ExperienceAnalysisEngine'

describe('ExperienceAnalysisEngine - Rigorous Analysis', () => {
  
  describe('Pattern Recognition Deep Dive', () => {
    it('should explain what vocabulary patterns it recognizes', () => {
      const engine = new ExperienceAnalysisEngine()
      
      // Test specific technical terms
      const technicalInput = {
        responses: [
          { text: 'I want balayage with toner to complement my undertones' },
          { text: 'My hair has high porosity so I need specific developer volume' }
        ]
      }
      
      const result = engine.analyzeExperience(technicalInput)
      
      console.log('\n=== TECHNICAL VOCABULARY TEST ===')
      console.log('Input:', technicalInput.responses.map(r => r.text))
      console.log('Matched patterns:', result.vocabulary.matchedPatterns)
      console.log('Evidence:', result.vocabulary.evidence)
      console.log('Technical term count:', result.vocabulary.technicalTermCount)
      console.log('Industry jargon usage:', result.vocabulary.industryJargonUsage)
      console.log('Vocabulary score:', result.vocabulary.score)
      
      // Verify it actually found the technical terms
      expect(result.vocabulary.matchedPatterns).toContain('balayage')
      expect(result.vocabulary.matchedPatterns).toContain('toner')
      expect(result.vocabulary.matchedPatterns).toContain('undertones')
      expect(result.vocabulary.matchedPatterns).toContain('porosity')
      
      // Should have high technical term count
      expect(result.vocabulary.technicalTermCount).toBeGreaterThan(3)
    })

    it('should recognize uncertainty patterns vs confidence patterns', () => {
      const engine = new ExperienceAnalysisEngine()
      
      // Uncertain language
      const uncertainInput = {
        responses: [
          { text: 'I dont know what I want, maybe something nice?' },
          { text: 'I guess highlights would be good, not sure though' }
        ]
      }
      
      // Confident language  
      const confidentInput = {
        responses: [
          { text: 'I specifically want dimensional color with face-framing highlights' },
          { text: 'I always get my roots touched up every 6 weeks with gloss' }
        ]
      }
      
      const uncertainResult = engine.analyzeExperience(uncertainInput)
      const confidentResult = engine.analyzeExperience(confidentInput)
      
      console.log('\n=== CONFIDENCE PATTERN TEST ===')
      console.log('Uncertain patterns:', uncertainResult.vocabulary.matchedPatterns)
      console.log('Uncertain evidence:', uncertainResult.vocabulary.evidence)
      console.log('Confident patterns:', confidentResult.vocabulary.matchedPatterns)
      console.log('Confident evidence:', confidentResult.vocabulary.evidence)
      
      // Uncertain should have lower confidence scores
      expect(uncertainResult.decisionConfidence.score).toBeLessThanOrEqual(confidentResult.decisionConfidence.score)
    })

    it('should differentiate between experience levels based on language complexity', () => {
      const engine = new ExperienceAnalysisEngine()
      
      // Complete beginner
      const beginnerInput = {
        responses: [
          { text: 'I want my hair done' },
          { text: 'Something pretty' }
        ]
      }
      
      // Some experience
      const intermediateInput = {
        responses: [
          { text: 'I usually get highlights but want to try something different' },
          { text: 'Maybe lowlights or balayage? I get my hair done every few months' }
        ]
      }
      
      // Expert level
      const expertInput = {
        responses: [
          { text: 'I need a color correction with tonal adjustment using ash-based formulas' },
          { text: 'My previous colorist used 20vol developer but my porosity requires 10vol for even saturation' }
        ]
      }
      
      const beginnerResult = engine.analyzeExperience(beginnerInput)
      const intermediateResult = engine.analyzeExperience(intermediateInput)
      const expertResult = engine.analyzeExperience(expertInput)
      
      console.log('\n=== EXPERIENCE LEVEL DIFFERENTIATION ===')
      console.log('Beginner score:', beginnerResult.overallScore, 'Level:', beginnerResult.experienceLevel)
      console.log('Intermediate score:', intermediateResult.overallScore, 'Level:', intermediateResult.experienceLevel)
      console.log('Expert score:', expertResult.overallScore, 'Level:', expertResult.experienceLevel)
      
      // Scores should increase with experience
      expect(intermediateResult.overallScore).toBeGreaterThan(beginnerResult.overallScore)
      expect(expertResult.overallScore).toBeGreaterThan(intermediateResult.overallScore)
      
      // Classifications should be different
      expect(beginnerResult.experienceLevel).toBe('beginner')
      // Note: We'll see if the thresholds actually work for intermediate/expert
    })
  })

  describe('Scoring System Analysis', () => {
    it('should explain how the overall score is calculated', () => {
      const engine = new ExperienceAnalysisEngine()
      
      const testInput = {
        responses: [
          { text: 'I want balayage with toner and maybe some lowlights' },
          { text: 'I usually get my hair done every 3 months at a salon' }
        ]
      }
      
      const result = engine.analyzeExperience(testInput)
      
      console.log('\n=== SCORING BREAKDOWN ===')
      console.log('Vocabulary score:', result.vocabulary.score, '(weight: 0.25)')
      console.log('Technical score:', result.technicalKnowledge.score, '(weight: 0.35)')
      console.log('Confidence score:', result.decisionConfidence.score, '(weight: 0.25)')
      console.log('Familiarity score:', result.serviceFamiliarity.score, '(weight: 0.15)')
      
      // Manual calculation to verify
      const expectedScore = (
        result.vocabulary.score * 0.25 +
        result.technicalKnowledge.score * 0.35 +
        result.decisionConfidence.score * 0.25 +
        result.serviceFamiliarity.score * 0.15
      )
      
      console.log('Expected overall score:', expectedScore)
      console.log('Actual overall score:', result.overallScore)
      
      expect(result.overallScore).toBeCloseTo(expectedScore, 10)
    })

    it('should test threshold boundaries for experience classification', () => {
      const engine = new ExperienceAnalysisEngine()
      
      // We need to understand what the actual thresholds are
      // From the code: beginner: 0.0-0.3, intermediate: 0.3-0.6, advanced: 0.6-0.8, expert: 0.8-1.0
      
      console.log('\n=== THRESHOLD TESTING ===')
      
      // Test various inputs to see what scores we actually get
      const testCases = [
        {
          name: 'Minimal input',
          responses: [{ text: 'hair' }, { text: 'cut' }]
        },
        {
          name: 'Basic request',
          responses: [{ text: 'I want a haircut' }, { text: 'Something simple' }]
        },
        {
          name: 'Some technical terms',
          responses: [{ text: 'I want highlights and toner' }, { text: 'Maybe balayage style' }]
        },
        {
          name: 'Very technical',
          responses: [
            { text: 'I need color correction with ash toner to neutralize brassiness' },
            { text: 'My hair porosity requires 20vol developer for proper lift and saturation' }
          ]
        }
      ]
      
      testCases.forEach(testCase => {
        const result = engine.analyzeExperience({ responses: testCase.responses })
        console.log(`${testCase.name}: Score ${result.overallScore.toFixed(4)} → ${result.experienceLevel}`)
      })
    })
  })

  describe('Edge Cases and Failure Modes', () => {
    it('should handle empty or nonsensical input gracefully', () => {
      const engine = new ExperienceAnalysisEngine()
      
      const nonsenseInput = {
        responses: [
          { text: 'asdfghjkl qwertyuiop' },
          { text: 'zxcvbnm lkjhgfdsa' }
        ]
      }
      
      const result = engine.analyzeExperience(nonsenseInput)
      
      console.log('\n=== NONSENSE INPUT TEST ===')
      console.log('Nonsense result:', {
        score: result.overallScore,
        level: result.experienceLevel,
        confidence: result.confidence,
        matchedPatterns: result.vocabulary.matchedPatterns
      })
      
      // Should handle gracefully
      expect(result.overallScore).not.toBeNaN()
      expect(result.experienceLevel).toBeDefined()
      expect(result.vocabulary.matchedPatterns).toEqual([])
    })

    it('should test consistency - same input should give same output', () => {
      const engine = new ExperienceAnalysisEngine()
      
      const testInput = {
        responses: [
          { text: 'I want balayage with toner' },
          { text: 'I get my hair done regularly' }
        ]
      }
      
      const result1 = engine.analyzeExperience(testInput)
      const result2 = engine.analyzeExperience(testInput)
      
      console.log('\n=== CONSISTENCY TEST ===')
      console.log('First run score:', result1.overallScore)
      console.log('Second run score:', result2.overallScore)
      
      expect(result1.overallScore).toBe(result2.overallScore)
      expect(result1.experienceLevel).toBe(result2.experienceLevel)
    })

    it('should test what happens with very long input', () => {
      const engine = new ExperienceAnalysisEngine()
      
      const longText = 'I want balayage with toner and highlights and lowlights and color correction and gloss and treatment and cut and style and blowout and curls and waves and straightening and keratin and protein and moisture and shine and volume and texture and layers and bangs and fringe and face framing and dimensional color and root touch up and all over color and fashion color and fantasy color and ombre and sombre and babylights and foils and cap highlights and balayage and hand painting and color melting and color blocking and rainbow hair and unicorn hair and mermaid hair and galaxy hair and oil slick hair and rose gold and platinum blonde and ash blonde and honey blonde and caramel and chocolate brown and espresso and black and red and copper and auburn and burgundy and purple and blue and green and pink and silver and gray and white'
      
      const longInput = {
        responses: [
          { text: longText },
          { text: 'I know a lot about hair' }
        ]
      }
      
      const result = engine.analyzeExperience(longInput)
      
      console.log('\n=== LONG INPUT TEST ===')
      console.log('Long input score:', result.overallScore)
      console.log('Long input level:', result.experienceLevel)
      console.log('Matched patterns count:', result.vocabulary.matchedPatterns.length)
      console.log('Technical term count:', result.vocabulary.technicalTermCount)
      
      // Should handle long input without crashing
      expect(result.overallScore).not.toBeNaN()
      expect(result.vocabulary.technicalTermCount).toBeGreaterThan(10)
    })
  })

  describe('Business Logic Validation', () => {
    it('should provide actionable recommendations based on experience level', () => {
      const engine = new ExperienceAnalysisEngine()
      
      const beginnerInput = {
        responses: [
          { text: 'I dont know what I want' },
          { text: 'Just something nice' }
        ]
      }
      
      const result = engine.analyzeExperience(beginnerInput)
      
      console.log('\n=== RECOMMENDATION VALIDATION ===')
      console.log('Experience level:', result.experienceLevel)
      console.log('Suggested complexity:', result.recommendations.suggestedServiceComplexity)
      console.log('Guidance level:', result.recommendations.recommendedGuidanceLevel)
      console.log('Appropriate services:', result.recommendations.appropriateServiceTypes)
      console.log('Caution areas:', result.recommendations.cautionAreas)
      
      // Beginner should get simple services and comprehensive guidance
      expect(result.recommendations.suggestedServiceComplexity).toBe('simple')
      expect(result.recommendations.recommendedGuidanceLevel).toBe('comprehensive')
      expect(result.recommendations.appropriateServiceTypes).toContain('basic-cuts')
      expect(result.recommendations.cautionAreas.length).toBeGreaterThan(0)
    })
  })
})
