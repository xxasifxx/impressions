/**
 * Golden Master Tests for Current Static Recommendation System
 * 
 * These tests capture the current behavior of the static system
 * to serve as regression protection during engine integration.
 * 
 * IMPORTANT: These tests document ACTUAL behavior, not CORRECT behavior.
 * They serve as a baseline to ensure we don't break existing functionality.
 */

import { describe, it, expect } from 'vitest'
import { getUnifiedServiceRecommendations } from '../../data/unifiedConsultationFlow'

describe('Current Static System - Golden Master Tests', () => {
  describe('Basic Functionality', () => {
    it('should handle empty responses with fallback behavior', () => {
      const result = getUnifiedServiceRecommendations({})
      
      expect(result).toEqual({
        customerMotivation: 'special-event',
        recommendedServices: {
          'hair-salon': ['hair-precision-cut', 'hair-balayage', 'blowout-styling'],
          'makeup-studio': ['makeup-bridal', 'makeup-special-event'],
          'med-spa': ['gold-facial', 'dermaplaning']
        },
        crossDomainPackages: [],
        totalWeight: 0
      })
    })

    it('should handle single response correctly', () => {
      const responses = {
        'response1': { optionId: 'wedding', weight: 9, domains: ['hair-salon', 'makeup-studio'] }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.customerMotivation).toBe('wedding')
      expect(result.totalWeight).toBe(9)
      expect(result.crossDomainPackages).toContain('bridal-complete')
    })

    it('should use first response for primary motivation (first response bias)', () => {
      const responses = {
        'response1': { optionId: 'professional', weight: 7 },
        'response2': { optionId: 'wedding', weight: 10 },
        'response3': { optionId: 'skin-concerns', weight: 8 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      // Should use first response, not highest weight
      expect(result.customerMotivation).toBe('professional')
      expect(result.totalWeight).toBe(25) // 7 + 10 + 8
    })
  })

  describe('Weight-Based Premium Service Logic', () => {
    it('should add premium services when avgWeight >= 8', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: 8 },
        'response2': { optionId: 'enhancement', weight: 8 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      const avgWeight = 16 / 2 // = 8
      
      expect(avgWeight).toBeGreaterThanOrEqual(8)
      expect(result.recommendedServices['hair-salon']).toContain('hair-extensions')
      expect(result.recommendedServices['hair-salon']).toContain('keratin-treatment')
      expect(result.recommendedServices['makeup-studio']).toContain('lash-extensions')
      expect(result.recommendedServices['med-spa']).toContain('gold-facial')
    })

    it('should not add premium services when avgWeight < 8', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: 6 },
        'response2': { optionId: 'enhancement', weight: 7 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      const avgWeight = 13 / 2 // = 6.5
      
      expect(avgWeight).toBeLessThan(8)
      // Should have base services but not premium additions
      expect(result.recommendedServices['hair-salon']).toEqual(['hair-precision-cut', 'hair-balayage', 'blowout-styling'])
    })
  })

  describe('Cross-Domain Package Logic', () => {
    it('should create bridal-complete package for wedding motivation', () => {
      const responses = {
        'response1': { optionId: 'wedding', weight: 7 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.crossDomainPackages).toContain('bridal-complete')
    })

    it('should create bridal-complete package for high weight (>=9)', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: 9 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.crossDomainPackages).toContain('bridal-complete')
    })

    it('should create professional-polish package for professional motivation', () => {
      const responses = {
        'response1': { optionId: 'professional', weight: 6 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.crossDomainPackages).toContain('professional-polish')
    })

    it('should create maintenance-package for regular-maintenance with weight >= 7', () => {
      const responses = {
        'response1': { optionId: 'regular-maintenance', weight: 7 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.crossDomainPackages).toContain('maintenance-package')
    })

    it('should not create maintenance-package for regular-maintenance with weight < 7', () => {
      const responses = {
        'response1': { optionId: 'regular-maintenance', weight: 6 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.crossDomainPackages).not.toContain('maintenance-package')
    })
  })

  describe('Domain Filtering Logic', () => {
    it('should include all domains when no domains specified', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: 7 }
        // No domains specified
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.recommendedServices['hair-salon'].length).toBeGreaterThan(0)
      expect(result.recommendedServices['makeup-studio'].length).toBeGreaterThan(0)
      expect(result.recommendedServices['med-spa'].length).toBeGreaterThan(0)
    })

    it('should filter by specified domains', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: 7, domains: ['hair-salon'] }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.recommendedServices['hair-salon'].length).toBeGreaterThan(0)
      expect(result.recommendedServices['makeup-studio']).toEqual([])
      expect(result.recommendedServices['med-spa']).toEqual([])
    })

    it('should aggregate domains from multiple responses', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: 7, domains: ['hair-salon'] },
        'response2': { optionId: 'enhancement', weight: 6, domains: ['med-spa'] }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.recommendedServices['hair-salon'].length).toBeGreaterThan(0)
      expect(result.recommendedServices['makeup-studio']).toEqual([])
      expect(result.recommendedServices['med-spa'].length).toBeGreaterThan(0)
    })
  })

  describe('Static Service Mappings - Documented Behavior', () => {
    it('should return correct services for special-event motivation', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: 6 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.recommendedServices).toEqual({
        'hair-salon': ['hair-precision-cut', 'hair-balayage', 'blowout-styling'],
        'makeup-studio': ['makeup-bridal', 'makeup-special-event'],
        'med-spa': ['gold-facial', 'dermaplaning']
      })
    })

    it('should return correct services for skin-concerns motivation', () => {
      const responses = {
        'response1': { optionId: 'skin-concerns', weight: 6 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.recommendedServices).toEqual({
        'hair-salon': [],
        'makeup-studio': [],
        'med-spa': ['gold-facial', 'hydra-facial', 'led-light-therapy', 'dermaplaning']
      })
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle unknown motivation gracefully', () => {
      const responses = {
        'response1': { optionId: 'unknown-motivation', weight: 7 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      // Should fallback to special-event services
      expect(result.customerMotivation).toBe('unknown-motivation')
      expect(result.recommendedServices).toEqual({
        'hair-salon': ['hair-precision-cut', 'hair-balayage', 'blowout-styling'],
        'makeup-studio': ['makeup-bridal', 'makeup-special-event'],
        'med-spa': ['gold-facial', 'dermaplaning']
      })
    })

    it('should handle responses with zero weight', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: 0 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.totalWeight).toBe(0)
      expect(result.customerMotivation).toBe('special-event')
    })

    it('should handle negative weights', () => {
      const responses = {
        'response1': { optionId: 'special-event', weight: -5 }
      }
      
      const result = getUnifiedServiceRecommendations(responses)
      
      expect(result.totalWeight).toBe(-5)
      // Should still process normally despite negative weight
      expect(result.customerMotivation).toBe('special-event')
    })
  })
})

