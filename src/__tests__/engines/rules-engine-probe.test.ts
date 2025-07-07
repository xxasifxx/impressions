/**
 * RulesEngine Characterization Probe
 * 
 * Testing actual functionality vs. interface expectations
 */

import { describe, it, expect } from 'vitest'
import { RulesEngine } from '../../engine/RulesEngine'

describe('RulesEngine - Reality Check Probe', () => {
  const engine = new RulesEngine()

  describe('Basic Functionality Probe', () => {
    it('should instantiate without errors', () => {
      expect(engine).toBeDefined()
      // Check what methods are actually available
      console.log('RulesEngine methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(engine)))
    })

    it('should have expected interface methods', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(engine))
      console.log('Available methods:', methods)
      
      // Let's see what's actually available instead of assuming
      expect(methods.length).toBeGreaterThan(0)
    })
  })

  describe('Method Exploration Probe', () => {
    it('should explore available functionality', () => {
      const engine = new RulesEngine()
      const proto = Object.getPrototypeOf(engine)
      const methods = Object.getOwnPropertyNames(proto).filter(name => 
        typeof engine[name as keyof typeof engine] === 'function' && name !== 'constructor'
      )
      
      console.log('Callable methods:', methods)
      
      methods.forEach(method => {
        console.log(`Method: ${method}`)
        try {
          const func = engine[method as keyof typeof engine] as Function
          console.log(`  - Parameters: ${func.length}`)
          console.log(`  - String: ${func.toString().substring(0, 200)}...`)
        } catch (e) {
          console.log(`  - Error accessing: ${e}`)
        }
      })
      
      expect(methods.length).toBeGreaterThan(0)
    })
  })
})

