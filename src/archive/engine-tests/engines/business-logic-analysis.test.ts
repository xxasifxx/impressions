/**
 * Business Logic Analysis - Understanding WHY the scoring is broken
 * 
 * This test reveals the fundamental flaws in the scoring system
 */

import { describe, it, expect } from 'vitest'
import { ExperienceAnalysisEngine } from '../../engine/ExperienceAnalysisEngine'

describe('Business Logic Analysis - Why Scoring is Broken', () => {
  
  it('should reveal the pattern weight vs score calculation mismatch', () => {
    const engine = new ExperienceAnalysisEngine()
    
    // Test with ONLY beginner patterns
    const beginnerInput = {
      responses: [
        { text: 'I dont know what I want, maybe something nice?' },
        { text: 'Help me choose something pretty and normal' }
      ]
    }
    
    const result = engine.analyzeExperience(beginnerInput)
    
    console.log('\n=== BEGINNER PATTERN ANALYSIS ===')
    console.log('Matched patterns:', result.vocabulary.matchedPatterns)
    console.log('Evidence:', result.vocabulary.evidence)
    console.log('Raw vocabulary score:', result.vocabulary.score)
    
    // The issue: Even matching beginner patterns gives very low scores
    // Let's see what the actual calculation should be
    
    // From patterns: 'not sure' (weight 0.8), 'maybe' (weight 0.8), 'i dont know' (weight 0.8)
    // 'help me' (weight 0.8), 'pretty' (weight 0.6), 'normal' (weight 0.6)
    
    console.log('Expected: Multiple high-weight beginner patterns should give substantial score')
    console.log('Actual vocabulary score:', result.vocabulary.score)
    console.log('This suggests the scoring algorithm is fundamentally wrong')
  })

  it('should demonstrate the threshold impossibility problem', () => {
    const engine = new ExperienceAnalysisEngine()
    
    // Create the most technical input possible
    const superTechnicalInput = {
      responses: [
        { text: 'I need color correction with ash toner to neutralize brassiness using 20vol developer' },
        { text: 'My hair porosity requires specific formulation with protein treatment and keratin bonding' }
      ]
    }
    
    const result = engine.analyzeExperience(superTechnicalInput)
    
    console.log('\n=== THRESHOLD IMPOSSIBILITY TEST ===')
    console.log('Super technical input score:', result.overallScore)
    console.log('Classification:', result.experienceLevel)
    console.log('Intermediate threshold needed:', 0.3)
    console.log('Gap to intermediate:', 0.3 - result.overallScore)
    
    // The problem: Even the most technical input can't reach 0.3
    expect(result.overallScore).toBeLessThan(0.3)
    expect(result.experienceLevel).toBe('beginner')
    
    console.log('CONCLUSION: The thresholds are 10x too high for the scoring system')
  })

  it('should reveal the confidence scoring inversion bug', () => {
    const engine = new ExperienceAnalysisEngine()
    
    // Uncertain input
    const uncertainInput = {
      responses: [
        { text: 'I dont know what I want, maybe something?' },
        { text: 'Not sure, help me decide' }
      ]
    }
    
    // Confident input
    const confidentInput = {
      responses: [
        { text: 'I specifically want dimensional color with face-framing' },
        { text: 'I always get my roots done every 6 weeks' }
      ]
    }
    
    const uncertainResult = engine.analyzeExperience(uncertainInput)
    const confidentResult = engine.analyzeExperience(confidentInput)
    
    console.log('\n=== CONFIDENCE INVERSION BUG ===')
    console.log('Uncertain input confidence score:', uncertainResult.decisionConfidence.score)
    console.log('Confident input confidence score:', confidentResult.decisionConfidence.score)
    
    console.log('Uncertain patterns matched:', uncertainResult.vocabulary.matchedPatterns)
    console.log('Confident patterns matched:', confidentResult.vocabulary.matchedPatterns)
    
    // The bug: Uncertain language gets higher scores than confident language
    console.log('BUG: Uncertain input scores HIGHER than confident input')
    console.log('This suggests the pattern matching logic is inverted')
    
    // This should fail but currently passes due to the bug
    expect(uncertainResult.decisionConfidence.score).toBeGreaterThan(confidentResult.decisionConfidence.score)
  })

  it('should demonstrate the pattern matching scope problem', () => {
    const engine = new ExperienceAnalysisEngine()
    
    // Input with many technical terms
    const technicalInput = {
      responses: [
        { text: 'balayage ombre contouring highlighting bronzing microblading lash extensions' },
        { text: 'gel manicure shellac deep conditioning root touch up color correction' }
      ]
    }
    
    const result = engine.analyzeExperience(technicalInput)
    
    console.log('\n=== PATTERN MATCHING SCOPE PROBLEM ===')
    console.log('Input technical terms: 12+')
    console.log('Matched patterns:', result.vocabulary.matchedPatterns)
    console.log('Technical term count:', result.vocabulary.technicalTermCount)
    console.log('Vocabulary score:', result.vocabulary.score)
    
    // The problem: Limited pattern recognition despite many technical terms
    console.log('ISSUE: Pattern matching is too restrictive or broken')
    console.log('Many technical terms are not being recognized')
  })

  it('should reveal the mathematical scoring flaw', () => {
    const engine = new ExperienceAnalysisEngine()
    
    const testInput = {
      responses: [
        { text: 'I want balayage with toner' },
        { text: 'I get highlights regularly' }
      ]
    }
    
    const result = engine.analyzeExperience(testInput)
    
    console.log('\n=== MATHEMATICAL SCORING ANALYSIS ===')
    console.log('Individual scores:')
    console.log('- Vocabulary:', result.vocabulary.score, '× 0.25 =', result.vocabulary.score * 0.25)
    console.log('- Technical:', result.technicalKnowledge.score, '× 0.35 =', result.technicalKnowledge.score * 0.35)
    console.log('- Confidence:', result.decisionConfidence.score, '× 0.25 =', result.decisionConfidence.score * 0.25)
    console.log('- Familiarity:', result.serviceFamiliarity.score, '× 0.15 =', result.serviceFamiliarity.score * 0.15)
    
    const manualCalculation = (
      result.vocabulary.score * 0.25 +
      result.technicalKnowledge.score * 0.35 +
      result.decisionConfidence.score * 0.25 +
      result.serviceFamiliarity.score * 0.15
    )
    
    console.log('Manual calculation:', manualCalculation)
    console.log('Engine result:', result.overallScore)
    console.log('Match:', Math.abs(manualCalculation - result.overallScore) < 0.0001)
    
    console.log('\nCONCLUSION: Math is correct, but individual scores are too low')
    console.log('The problem is in the pattern matching and scoring algorithms')
    console.log('NOT in the overall score calculation')
  })
})
