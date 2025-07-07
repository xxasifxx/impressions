/**
 * ExperienceAnalysisEngine Characterization Probe
 * 
 * This test file probes the actual functionality of the ExperienceAnalysisEngine
 * to understand what it can actually do vs. what the aspirational tests expect.
 * 
 * OBJECTIVE: Understand real capabilities for development tool use
 */

import { describe, it, expect } from 'vitest'
import { ExperienceAnalysisEngine } from '../../engine/ExperienceAnalysisEngine'
import type { ExperienceAnalysisInput } from '../../types/ExperienceTypes'

describe('ExperienceAnalysisEngine - Reality Check Probe', () => {
  const engine = new ExperienceAnalysisEngine({ debugMode: true })

  describe('Basic Functionality Probe', () => {
    it('should instantiate without errors', () => {
      expect(engine).toBeDefined()
      expect(typeof engine.analyzeExperience).toBe('function')
    })

    it('should handle minimal valid input', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          { text: 'I want a haircut', responseId: '1' },
          { text: 'Something simple and easy', responseId: '2' }
        ]
      }

      const result = engine.analyzeExperience(input)
      
      expect(result).toBeDefined()
      expect(result.experienceLevel).toBeDefined()
      expect(result.confidence).toBeDefined()
      expect(['beginner', 'intermediate', 'advanced', 'expert']).toContain(result.experienceLevel)
      expect(['low', 'medium', 'high']).toContain(result.confidence)
    })

    it('should handle insufficient input gracefully', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          { text: 'Hi', responseId: '1' }
        ]
      }

      const result = engine.analyzeExperience(input)
      
      // Should return low confidence result, not crash
      expect(result).toBeDefined()
      expect(result.experienceLevel).toBe('beginner')
      expect(result.confidence).toBe('low')
    })
  })

  describe('Pattern Recognition Probe', () => {
    it('should recognize basic beginner language', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          { text: 'I want something simple and easy to maintain', responseId: '1' },
          { text: 'I dont know much about hair styling', responseId: '2' }
        ]
      }

      const result = engine.analyzeExperience(input)
      
      console.log('Beginner test result:', JSON.stringify(result, null, 2))
      
      expect(result.experienceLevel).toBe('beginner')
    })

    it('should recognize technical vocabulary', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          { text: 'I need balayage with toner to correct my undertones', responseId: '1' },
          { text: 'My hair has high porosity so I need protein treatments', responseId: '2' }
        ]
      }

      const result = engine.analyzeExperience(input)
      
      console.log('Technical vocabulary test result:', JSON.stringify(result, null, 2))
      
      // Let's see what it actually returns instead of assuming
      expect(result).toBeDefined()
      expect(result.vocabulary).toBeDefined()
      
      // Log the actual vocabulary analysis
      if (result.vocabulary) {
        console.log('Vocabulary analysis:', result.vocabulary)
      }
    })

    it('should provide vocabulary analysis details', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          { text: 'I want highlights with foils and need a good toner', responseId: '1' },
          { text: 'My colorist usually uses 20 volume developer', responseId: '2' }
        ]
      }

      const result = engine.analyzeExperience(input)
      
      console.log('Vocabulary details test:', JSON.stringify(result, null, 2))
      
      expect(result.vocabulary).toBeDefined()
      if (result.vocabulary) {
        expect(result.vocabulary.score).toBeDefined()
        expect(typeof result.vocabulary.score).toBe('number')
      }
    })
  })

  describe('Output Structure Probe', () => {
    it('should return complete result structure', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          { text: 'I need a professional look for work meetings', responseId: '1' },
          { text: 'Something that looks polished but not too dramatic', responseId: '2' }
        ]
      }

      const result = engine.analyzeExperience(input)
      
      console.log('Complete structure test:', JSON.stringify(result, null, 2))
      
      // Check what properties actually exist
      expect(result).toBeDefined()
      expect(result.experienceLevel).toBeDefined()
      expect(result.confidence).toBeDefined()
      
      // Log all available properties
      console.log('Available result properties:', Object.keys(result))
    })
  })

  describe('Development Tool Potential Probe', () => {
    it('should provide actionable insights for decision tree optimization', () => {
      const scenarios = [
        {
          name: 'Complete Beginner',
          input: {
            responses: [
              { text: 'I never do anything with my hair', responseId: '1' },
              { text: 'I just want something easy and simple', responseId: '2' }
            ]
          }
        },
        {
          name: 'Some Experience',
          input: {
            responses: [
              { text: 'I usually get highlights every few months', responseId: '1' },
              { text: 'I know I need toner but not sure which one', responseId: '2' }
            ]
          }
        },
        {
          name: 'Technical User',
          input: {
            responses: [
              { text: 'I need balayage with a level 7 base and ash toner', responseId: '1' },
              { text: 'My hair porosity is medium so I use protein treatments', responseId: '2' }
            ]
          }
        }
      ]

      scenarios.forEach(scenario => {
        const result = engine.analyzeExperience(scenario.input)
        console.log(`\n${scenario.name} Analysis:`)
        console.log(`- Experience Level: ${result.experienceLevel}`)
        console.log(`- Confidence: ${result.confidence}`)
        
        if (result.vocabulary) {
          console.log(`- Vocabulary Score: ${result.vocabulary.score}`)
        }
        
        // Check if we can extract useful patterns for tree optimization
        expect(result.experienceLevel).toBeDefined()
        expect(result.confidence).toBeDefined()
      })
    })
  })

  describe('Error Handling Probe', () => {
    it('should handle empty responses', () => {
      const input: ExperienceAnalysisInput = {
        responses: []
      }

      const result = engine.analyzeExperience(input)
      
      expect(result).toBeDefined()
      expect(result.experienceLevel).toBe('beginner')
      expect(result.confidence).toBe('low')
    })

    it('should handle malformed input', () => {
      const input: ExperienceAnalysisInput = {
        responses: [
          { text: '', responseId: '1' },
          { text: '   ', responseId: '2' }
        ]
      }

      const result = engine.analyzeExperience(input)
      
      expect(result).toBeDefined()
      // Should handle gracefully, not crash
    })
  })
})

