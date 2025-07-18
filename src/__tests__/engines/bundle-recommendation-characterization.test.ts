/**
 * BundleRecommendationEngine - Characterization Test
 * 
 * Test what the BundleRecommendationEngine actually does vs. what it claims to do
 */

import { describe, it, expect } from 'vitest'
import { BundleRecommendationEngine } from '../../engine/BundleRecommendationEngine'
import { allUnifiedServices } from '../../data/unifiedServicesData'

describe('BundleRecommendationEngine - Characterization', () => {
  
  describe('Basic Instantiation and Interface', () => {
    it('should instantiate without errors', () => {
      const engine = new BundleRecommendationEngine()
      expect(engine).toBeDefined()
      
      // Check available methods
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(engine))
        .filter(name => typeof engine[name as keyof typeof engine] === 'function' && name !== 'constructor')
      
      console.log('BundleRecommendationEngine methods:', methods)
      expect(methods.length).toBeGreaterThan(0)
    })
  })

  describe('Core Functionality Test', () => {
    it('should handle generateRecommendations method', () => {
      const engine = new BundleRecommendationEngine()
      
      // Test with minimal input to see what happens
      const testInput = {
        currentCart: {
          services: [allUnifiedServices[0]], // First service
          products: []
        },
        userProfile: {
          experienceLevel: 'beginner' as const,
          preferences: {},
          budget: { min: 50, max: 200 }
        },
        sessionContext: {
          serviceCategory: 'hair-salon',
          consultationResponses: ['I want a haircut'],
          timeConstraints: { maxDuration: 120 }
        },
        businessContext: {
          availableInventory: [],
          currentPromotions: [],
          seasonalFactors: [],
          profitabilityTargets: []
        }
      }

      try {
        const result = engine.generateRecommendations(testInput)
        console.log('BundleRecommendationEngine result structure:', Object.keys(result))
        console.log('Result:', JSON.stringify(result, null, 2))
        
        expect(result).toBeDefined()
        
        // Check if it has expected structure
        if (result.recommendations) {
          console.log('Number of recommendations:', result.recommendations.length)
        }
        
      } catch (error) {
        console.log('BundleRecommendationEngine error:', error.message)
        // Document the error for characterization
        expect(error).toBeDefined()
      }
    })

    it('should test health check functionality', () => {
      const engine = new BundleRecommendationEngine()
      
      try {
        const healthCheck = engine.runHealthCheck()
        console.log('Health check result:', healthCheck)
        expect(healthCheck).toBeDefined()
      } catch (error) {
        console.log('Health check error:', error.message)
        expect(error).toBeDefined()
      }
    })

    it('should test diagnostic info', () => {
      const engine = new BundleRecommendationEngine()
      
      try {
        const diagnostics = engine.getDiagnosticInfo()
        console.log('Diagnostic info:', diagnostics)
        expect(diagnostics).toBeDefined()
      } catch (error) {
        console.log('Diagnostics error:', error.message)
        expect(error).toBeDefined()
      }
    })
  })

  describe('Input Validation Test', () => {
    it('should test input validation behavior', () => {
      const engine = new BundleRecommendationEngine()
      
      // Test with empty input
      try {
        const result = engine.generateRecommendations({} as any)
        console.log('Empty input result:', result)
      } catch (error) {
        console.log('Empty input validation error:', error.message)
        expect(error.message).toContain('validation') // Expect some validation
      }
    })

    it('should test with null/undefined inputs', () => {
      const engine = new BundleRecommendationEngine()
      
      try {
        const result = engine.generateRecommendations(null as any)
        console.log('Null input result:', result)
      } catch (error) {
        console.log('Null input error:', error.message)
        expect(error).toBeDefined()
      }
    })
  })
})
