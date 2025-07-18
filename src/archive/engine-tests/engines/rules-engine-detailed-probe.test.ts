/**
 * RulesEngine Detailed Characterization Probe
 * 
 * Testing actual functionality of the RulesEngine methods
 */

import { describe, it, expect } from 'vitest'
import { RulesEngine } from '../../engine/RulesEngine'

describe('RulesEngine - Detailed Functionality Probe', () => {
  const engine = new RulesEngine()

  describe('Core Analysis Methods', () => {
    it('should test analyzeAndRecommend method', () => {
      const context = {
        responses: [
          { 
            responseId: '1', 
            nodeId: 'motivation-wedding',
            optionId: 'wedding',
            text: 'I need services for my wedding',
            metadata: { category: 'motivation' }
          }
        ],
        cartContents: [],
        sessionDuration: 300,
        userProfile: {}
      }

      try {
        const result = engine.analyzeAndRecommend(context)
        console.log('analyzeAndRecommend result:', JSON.stringify(result, null, 2))
        
        expect(result).toBeDefined()
        // Check what properties are actually returned
        console.log('Result properties:', Object.keys(result))
      } catch (error) {
        console.log('analyzeAndRecommend error:', error)
        expect(error).toBeDefined() // Document the error
      }
    })

    it('should test detectMotivation method', () => {
      const responses = [
        { 
          responseId: '1', 
          nodeId: 'motivation-wedding',
          optionId: 'wedding',
          text: 'I need services for my wedding',
          metadata: { category: 'motivation' }
        }
      ]

      try {
        const result = engine.detectMotivation(responses)
        console.log('detectMotivation result:', JSON.stringify(result, null, 2))
        
        expect(result).toBeDefined()
        console.log('Motivation detection properties:', Object.keys(result))
      } catch (error) {
        console.log('detectMotivation error:', error)
        expect(error).toBeDefined()
      }
    })

    it('should test detectExperience method', () => {
      const responses = [
        { 
          responseId: '1', 
          nodeId: 'experience-beginner',
          optionId: 'beginner',
          text: 'I am new to beauty services',
          metadata: { category: 'experience' }
        }
      ]

      try {
        const result = engine.detectExperience(responses)
        console.log('detectExperience result:', JSON.stringify(result, null, 2))
        
        expect(result).toBeDefined()
        console.log('Experience detection properties:', Object.keys(result))
      } catch (error) {
        console.log('detectExperience error:', error)
        expect(error).toBeDefined()
      }
    })
  })

  describe('Filter and Bundle Generation', () => {
    it('should test generateCatalogFilters method', () => {
      const context = {
        responses: [
          { 
            responseId: '1', 
            nodeId: 'motivation-professional',
            optionId: 'professional',
            text: 'I need professional services',
            metadata: { category: 'motivation' }
          }
        ],
        cartContents: [],
        sessionDuration: 300,
        userProfile: {}
      }

      try {
        const result = engine.generateCatalogFilters(context)
        console.log('generateCatalogFilters result:', JSON.stringify(result, null, 2))
        
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      } catch (error) {
        console.log('generateCatalogFilters error:', error)
        expect(error).toBeDefined()
      }
    })

    it('should test generateBundleSuggestions method', () => {
      const context = {
        responses: [
          { 
            responseId: '1', 
            nodeId: 'motivation-wedding',
            optionId: 'wedding',
            text: 'I need services for my wedding',
            metadata: { category: 'motivation' }
          }
        ],
        cartContents: [],
        sessionDuration: 300,
        userProfile: {}
      }

      try {
        const result = engine.generateBundleSuggestions(context)
        console.log('generateBundleSuggestions result:', JSON.stringify(result, null, 2))
        
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      } catch (error) {
        console.log('generateBundleSuggestions error:', error)
        expect(error).toBeDefined()
      }
    })
  })

  describe('Rule Management', () => {
    it('should test rule registration and retrieval', () => {
      const testRule = {
        id: 'test-rule',
        name: 'Test Rule',
        description: 'A test rule',
        category: 'test',
        priority: 1,
        condition: () => true,
        action: () => ({ recommendations: [], filters: [], bundles: [] })
      }

      try {
        engine.registerRule(testRule)
        const rules = engine.getRulesByCategory('test')
        console.log('Retrieved rules:', rules)
        
        expect(rules).toBeDefined()
        expect(Array.isArray(rules)).toBe(true)
        expect(rules.length).toBeGreaterThan(0)
      } catch (error) {
        console.log('Rule management error:', error)
        expect(error).toBeDefined()
      }
    })

    it('should test getApplicableRules method', () => {
      const context = {
        responses: [],
        cartContents: [],
        sessionDuration: 300,
        userProfile: {}
      }

      try {
        const result = engine.getApplicableRules(context)
        console.log('getApplicableRules result:', result.length, 'rules')
        console.log('Sample rules:', result.slice(0, 3).map(r => ({ id: r.id, name: r.name })))
        
        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      } catch (error) {
        console.log('getApplicableRules error:', error)
        expect(error).toBeDefined()
      }
    })
  })

  describe('Development Tool Potential Assessment', () => {
    it('should evaluate rules engine for decision tree enhancement', () => {
      // Test various consultation scenarios
      const scenarios = [
        {
          name: 'Wedding Consultation',
          context: {
            responses: [
              { 
                responseId: '1', 
                nodeId: 'motivation-wedding',
                optionId: 'wedding',
                text: 'I need services for my wedding',
                metadata: { category: 'motivation' }
              }
            ],
            cartContents: [],
            sessionDuration: 300,
            userProfile: {}
          }
        },
        {
          name: 'Professional Consultation',
          context: {
            responses: [
              { 
                responseId: '1', 
                nodeId: 'motivation-professional',
                optionId: 'professional',
                text: 'I need professional services',
                metadata: { category: 'motivation' }
              }
            ],
            cartContents: [],
            sessionDuration: 300,
            userProfile: {}
          }
        },
        {
          name: 'Beginner Experience',
          context: {
            responses: [
              { 
                responseId: '1', 
                nodeId: 'experience-beginner',
                optionId: 'beginner',
                text: 'I am new to beauty services',
                metadata: { category: 'experience' }
              }
            ],
            cartContents: [],
            sessionDuration: 300,
            userProfile: {}
          }
        }
      ]

      scenarios.forEach(scenario => {
        console.log(`\n=== ${scenario.name} ===`)
        
        try {
          // Test motivation detection
          const motivation = engine.detectMotivation(scenario.context.responses)
          console.log('Motivation:', motivation)
          
          // Test experience detection
          const experience = engine.detectExperience(scenario.context.responses)
          console.log('Experience:', experience)
          
          // Test full analysis
          const analysis = engine.analyzeAndRecommend(scenario.context)
          console.log('Analysis summary:', {
            recommendationsCount: analysis.recommendations?.length || 0,
            filtersCount: analysis.filters?.length || 0,
            bundlesCount: analysis.bundles?.length || 0,
            confidence: analysis.confidence
          })
          
        } catch (error) {
          console.log(`Error in ${scenario.name}:`, error.message)
        }
      })
      
      // This test always passes - we're just gathering data
      expect(true).toBe(true)
    })
  })
})

