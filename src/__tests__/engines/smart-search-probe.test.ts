/**
 * SmartSearchEngine Characterization Probe
 * 
 * Testing actual functionality vs. interface expectations
 */

import { describe, it, expect } from 'vitest'
import { SmartSearchEngine } from '../../engine/SmartSearchEngine'

describe('SmartSearchEngine - Reality Check Probe', () => {
  const engine = new SmartSearchEngine({ debugMode: true })

  describe('Basic Functionality Probe', () => {
    it('should instantiate without errors', () => {
      expect(engine).toBeDefined()
      expect(typeof engine.parseUserInput).toBe('function')
    })

    it('should handle basic text input', () => {
      const result = engine.parseUserInput('I need a haircut')
      
      console.log('Basic haircut input result:', JSON.stringify(result, null, 2))
      
      expect(result).toBeDefined()
      expect(result.originalText).toBe('I need a haircut')
      expect(result.detectedServices).toBeDefined()
      expect(result.urgencyLevel).toBeDefined()
      expect(result.suggestedRoute).toBeDefined()
      expect(result.confidence).toBeDefined()
    })

    it('should handle empty input gracefully', () => {
      const result = engine.parseUserInput('')
      
      console.log('Empty input result:', JSON.stringify(result, null, 2))
      
      expect(result).toBeDefined()
      // Should handle gracefully, not crash
    })
  })

  describe('Service Detection Probe', () => {
    it('should detect hair services', () => {
      const result = engine.parseUserInput('I want balayage highlights and a trim')
      
      console.log('Hair services detection:', JSON.stringify(result, null, 2))
      
      expect(result.detectedServices).toBeDefined()
      expect(Array.isArray(result.detectedServices)).toBe(true)
    })

    it('should detect makeup services', () => {
      const result = engine.parseUserInput('I need makeup for my wedding')
      
      console.log('Makeup services detection:', JSON.stringify(result, null, 2))
      
      expect(result.detectedServices).toBeDefined()
    })

    it('should detect skincare services', () => {
      const result = engine.parseUserInput('I need a facial for my acne')
      
      console.log('Skincare services detection:', JSON.stringify(result, null, 2))
      
      expect(result.detectedServices).toBeDefined()
    })
  })

  describe('Urgency Analysis Probe', () => {
    it('should detect high urgency', () => {
      const result = engine.parseUserInput('I need my hair done tomorrow for my wedding')
      
      console.log('High urgency detection:', JSON.stringify(result, null, 2))
      
      expect(result.urgencyLevel).toBeDefined()
      expect(['low', 'medium', 'high']).toContain(result.urgencyLevel)
    })

    it('should detect low urgency', () => {
      const result = engine.parseUserInput('I might want to change my hair color sometime')
      
      console.log('Low urgency detection:', JSON.stringify(result, null, 2))
      
      expect(result.urgencyLevel).toBeDefined()
    })
  })

  describe('Routing Decision Probe', () => {
    it('should provide routing suggestions', () => {
      const result = engine.parseUserInput('I want something simple and easy')
      
      console.log('Routing decision:', JSON.stringify(result, null, 2))
      
      expect(result.suggestedRoute).toBeDefined()
      expect(['quick_service', 'guided_consultation', 'specific_services']).toContain(result.suggestedRoute)
      expect(result.routingNodeId).toBeDefined()
    })

    it('should provide confidence scores', () => {
      const result = engine.parseUserInput('I need balayage with toner')
      
      console.log('Confidence scoring:', JSON.stringify(result, null, 2))
      
      expect(result.confidence).toBeDefined()
      expect(typeof result.confidence).toBe('number')
      expect(result.confidence).toBeGreaterThanOrEqual(0)
      expect(result.confidence).toBeLessThanOrEqual(1)
    })
  })

  describe('Complex Input Probe', () => {
    it('should handle multi-service requests', () => {
      const result = engine.parseUserInput('I need hair color, makeup, and a facial for my wedding next week')
      
      console.log('Multi-service request:', JSON.stringify(result, null, 2))
      
      expect(result.detectedServices.length).toBeGreaterThan(1)
      expect(result.urgencyLevel).toBe('high') // Wedding next week should be high urgency
    })

    it('should handle technical language', () => {
      const result = engine.parseUserInput('I need a balayage with level 7 base, ash toner, and keratin treatment')
      
      console.log('Technical language:', JSON.stringify(result, null, 2))
      
      expect(result).toBeDefined()
      // Should handle technical terms appropriately
    })

    it('should handle emotional context', () => {
      const result = engine.parseUserInput('I feel terrible about my hair and need a complete transformation')
      
      console.log('Emotional context:', JSON.stringify(result, null, 2))
      
      expect(result.emotionalContext).toBeDefined()
      expect(Array.isArray(result.emotionalContext)).toBe(true)
    })
  })

  describe('Development Tool Potential Probe', () => {
    it('should provide actionable routing insights', () => {
      const testCases = [
        {
          name: 'Specific Technical Request',
          input: 'I need balayage with ash toner',
          expectedRoute: 'specific_services'
        },
        {
          name: 'Vague Request',
          input: 'I want something different',
          expectedRoute: 'guided_consultation'
        },
        {
          name: 'Simple Request',
          input: 'Just a trim please',
          expectedRoute: 'quick_service'
        }
      ]

      testCases.forEach(testCase => {
        const result = engine.parseUserInput(testCase.input)
        console.log(`\n${testCase.name}:`)
        console.log(`- Input: "${testCase.input}"`)
        console.log(`- Detected Services: ${result.detectedServices.map(s => s.name).join(', ')}`)
        console.log(`- Suggested Route: ${result.suggestedRoute}`)
        console.log(`- Confidence: ${result.confidence}`)
        console.log(`- Routing Node: ${result.routingNodeId}`)
        
        expect(result.suggestedRoute).toBeDefined()
        expect(result.confidence).toBeGreaterThan(0)
      })
    })
  })

  describe('Error Handling Probe', () => {
    it('should handle null input', () => {
      expect(() => {
        engine.parseUserInput(null as any)
      }).not.toThrow()
    })

    it('should handle undefined input', () => {
      expect(() => {
        engine.parseUserInput(undefined as any)
      }).not.toThrow()
    })

    it('should handle very long input', () => {
      const longInput = 'I need hair color '.repeat(100)
      const result = engine.parseUserInput(longInput)
      
      expect(result).toBeDefined()
      // Should handle without crashing
    })
  })
})

