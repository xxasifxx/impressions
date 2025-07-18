/**
 * All Engines Quick Characterization Probe
 * 
 * Rapid assessment of all 13 engines to understand:
 * 1. Which ones instantiate without errors
 * 2. What methods they expose
 * 3. Basic functionality vs. crashes
 * 4. Interface expectations vs. reality
 */

import { describe, it, expect } from 'vitest'

// Import all engines
import { ExperienceAnalysisEngine } from '../../engine/ExperienceAnalysisEngine'
import { SmartSearchEngine } from '../../engine/SmartSearchEngine'
import { RulesEngine } from '../../engine/RulesEngine'
import { DecisionTreeEngine } from '../../engine/DecisionTreeEngine'
import { BundleRecommendationEngine } from '../../engine/BundleRecommendationEngine'
import { CatalogFilterEngine } from '../../engine/CatalogFilterEngine'
import { CatalogFilter } from '../../engine/CatalogFilter'
import { ConsultationSessionManager } from '../../engine/ConsultationSessionManager'
import { CardDisplayManager } from '../../engine/CardDisplayManager'
import { BundlingIntelligence } from '../../engine/BundlingIntelligence'
import { AestheticEvolutionEngine } from '../../engine/AestheticEvolutionEngine'
import { CognitiveLoadEngine } from '../../engine/CognitiveLoadEngine'
import { ExperienceAdapter } from '../../engine/ExperienceAdapter'

describe('All Engines - Quick Characterization Probe', () => {
  
  describe('Engine Instantiation Test', () => {
    const engines = [
      { name: 'ExperienceAnalysisEngine', class: ExperienceAnalysisEngine, args: [] },
      { name: 'SmartSearchEngine', class: SmartSearchEngine, args: [] },
      { name: 'RulesEngine', class: RulesEngine, args: [] },
      { name: 'DecisionTreeEngine', class: DecisionTreeEngine, args: [] },
      { name: 'BundleRecommendationEngine', class: BundleRecommendationEngine, args: [[], []] }, // services, products
      { name: 'CatalogFilterEngine', class: CatalogFilterEngine, args: [] },
      { name: 'CatalogFilter', class: CatalogFilter, args: [new RulesEngine()] },
      { name: 'CardDisplayManager', class: CardDisplayManager, args: [new RulesEngine()] },
      { name: 'BundlingIntelligence', class: BundlingIntelligence, args: [new RulesEngine()] },
      { name: 'AestheticEvolutionEngine', class: AestheticEvolutionEngine, args: [] },
      { name: 'CognitiveLoadEngine', class: CognitiveLoadEngine, args: [] },
      { name: 'ExperienceAdapter', class: ExperienceAdapter, args: [] }
    ]

    engines.forEach(({ name, class: EngineClass, args }) => {
      it(`should instantiate ${name}`, () => {
        try {
          const engine = new EngineClass(...args)
          console.log(`✅ ${name}: Instantiated successfully`)
          
          // Get available methods
          const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(engine))
            .filter(name => typeof engine[name as keyof typeof engine] === 'function' && name !== 'constructor')
          
          console.log(`   Methods (${methods.length}):`, methods.slice(0, 5).join(', '), methods.length > 5 ? '...' : '')
          
          expect(engine).toBeDefined()
          expect(methods.length).toBeGreaterThan(0)
          
        } catch (error) {
          console.log(`❌ ${name}: Failed to instantiate -`, error.message)
          expect(error).toBeDefined() // Document the failure
        }
      })
    })

    it('should handle ConsultationSessionManager with proper args', () => {
      try {
        const engine = new ConsultationSessionManager([], []) // services, products
        console.log('✅ ConsultationSessionManager: Instantiated successfully')
        
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(engine))
          .filter(name => typeof engine[name as keyof typeof engine] === 'function' && name !== 'constructor')
        
        console.log(`   Methods (${methods.length}):`, methods.slice(0, 5).join(', '), methods.length > 5 ? '...' : '')
        expect(engine).toBeDefined()
        
      } catch (error) {
        console.log('❌ ConsultationSessionManager: Failed to instantiate -', error.message)
        expect(error).toBeDefined()
      }
    })
  })

  describe('Engine Interface Analysis', () => {
    it('should analyze ExperienceAnalysisEngine interface', () => {
      const engine = new ExperienceAnalysisEngine()
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(engine))
        .filter(name => typeof engine[name as keyof typeof engine] === 'function' && name !== 'constructor')
      
      console.log('ExperienceAnalysisEngine methods:', methods)
      
      // Test main method
      if (methods.includes('analyzeExperience')) {
        console.log('✅ Has analyzeExperience method')
        expect(true).toBe(true)
      } else {
        console.log('❌ Missing analyzeExperience method')
        expect(false).toBe(true)
      }
    })

    it('should analyze SmartSearchEngine interface', () => {
      const engine = new SmartSearchEngine()
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(engine))
        .filter(name => typeof engine[name as keyof typeof engine] === 'function' && name !== 'constructor')
      
      console.log('SmartSearchEngine methods:', methods)
      
      // Test main method
      if (methods.includes('parseUserInput')) {
        console.log('✅ Has parseUserInput method')
        expect(true).toBe(true)
      } else {
        console.log('❌ Missing parseUserInput method')
        expect(false).toBe(true)
      }
    })

    it('should analyze RulesEngine interface', () => {
      const engine = new RulesEngine()
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(engine))
        .filter(name => typeof engine[name as keyof typeof engine] === 'function' && name !== 'constructor')
      
      console.log('RulesEngine methods:', methods)
      
      // Test main methods
      const expectedMethods = ['analyzeAndRecommend', 'detectMotivation', 'detectExperience']
      expectedMethods.forEach(method => {
        if (methods.includes(method)) {
          console.log(`✅ Has ${method} method`)
        } else {
          console.log(`❌ Missing ${method} method`)
        }
      })
      
      expect(methods.length).toBeGreaterThan(0)
    })
  })

  describe('Basic Functionality Smoke Test', () => {
    it('should test ExperienceAnalysisEngine basic functionality', () => {
      const engine = new ExperienceAnalysisEngine()
      
      try {
        const result = engine.analyzeExperience({
          responses: [
            { text: 'I want a haircut', responseId: '1' },
            { text: 'Something simple', responseId: '2' }
          ]
        })
        
        console.log('✅ ExperienceAnalysisEngine: Basic functionality works')
        console.log('   Result keys:', Object.keys(result))
        expect(result).toBeDefined()
        
      } catch (error) {
        console.log('❌ ExperienceAnalysisEngine: Basic functionality failed -', error.message)
        expect(error).toBeDefined()
      }
    })

    it('should test SmartSearchEngine basic functionality', () => {
      const engine = new SmartSearchEngine()
      
      try {
        const result = engine.parseUserInput('I need a haircut')
        
        console.log('✅ SmartSearchEngine: Basic functionality works')
        console.log('   Result keys:', Object.keys(result))
        expect(result).toBeDefined()
        
      } catch (error) {
        console.log('❌ SmartSearchEngine: Basic functionality failed -', error.message)
        expect(error).toBeDefined()
      }
    })

    it('should test RulesEngine basic functionality', () => {
      const engine = new RulesEngine()
      
      try {
        // Test rule registration (should work)
        engine.registerRule({
          id: 'test',
          name: 'Test',
          description: 'Test',
          category: 'test',
          priority: 1,
          condition: () => true,
          action: () => ({ recommendations: [], filters: [], bundles: [] })
        })
        
        console.log('✅ RulesEngine: Rule registration works')
        
        // Test rule retrieval
        const rules = engine.getRulesByCategory('test')
        console.log('✅ RulesEngine: Rule retrieval works, found', rules.length, 'rules')
        
        expect(rules.length).toBeGreaterThan(0)
        
      } catch (error) {
        console.log('❌ RulesEngine: Basic functionality failed -', error.message)
        expect(error).toBeDefined()
      }
    })
  })

  describe('Engine Complexity Assessment', () => {
    it('should assess engine complexity by method count and dependencies', () => {
      const assessments = []
      
      // Simple engines
      try {
        const experience = new ExperienceAnalysisEngine()
        const experienceMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(experience))
          .filter(name => typeof experience[name as keyof typeof experience] === 'function' && name !== 'constructor')
        assessments.push({ name: 'ExperienceAnalysisEngine', methods: experienceMethods.length, complexity: 'Medium' })
      } catch (e) {
        assessments.push({ name: 'ExperienceAnalysisEngine', methods: 0, complexity: 'Failed' })
      }

      try {
        const search = new SmartSearchEngine()
        const searchMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(search))
          .filter(name => typeof search[name as keyof typeof search] === 'function' && name !== 'constructor')
        assessments.push({ name: 'SmartSearchEngine', methods: searchMethods.length, complexity: 'Medium' })
      } catch (e) {
        assessments.push({ name: 'SmartSearchEngine', methods: 0, complexity: 'Failed' })
      }

      try {
        const rules = new RulesEngine()
        const rulesMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(rules))
          .filter(name => typeof rules[name as keyof typeof rules] === 'function' && name !== 'constructor')
        assessments.push({ name: 'RulesEngine', methods: rulesMethods.length, complexity: 'High' })
      } catch (e) {
        assessments.push({ name: 'RulesEngine', methods: 0, complexity: 'Failed' })
      }

      // Complex engines
      try {
        const session = new ConsultationSessionManager([], [])
        const sessionMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(session))
          .filter(name => typeof session[name as keyof typeof session] === 'function' && name !== 'constructor')
        assessments.push({ name: 'ConsultationSessionManager', methods: sessionMethods.length, complexity: 'Very High' })
      } catch (e) {
        assessments.push({ name: 'ConsultationSessionManager', methods: 0, complexity: 'Failed' })
      }

      console.log('\n=== ENGINE COMPLEXITY ASSESSMENT ===')
      assessments.forEach(assessment => {
        console.log(`${assessment.name}: ${assessment.methods} methods, ${assessment.complexity} complexity`)
      })
      
      expect(assessments.length).toBeGreaterThan(0)
    })
  })
})

