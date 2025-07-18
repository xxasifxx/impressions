/**
 * Aesthetic Orchestration Test
 * 
 * Demonstrates how the Visual Evolution Orchestrator resolves conflicts
 * between emotional states, professional contexts, and service overrides.
 */

import { AestheticEvolutionEngine } from '../AestheticEvolutionEngine';

/**
 * Test the orchestration system with realistic beauty consultation scenarios
 */
export function testAestheticOrchestration() {
  console.log('🧪 Testing Aesthetic Orchestration System\n');

  const engine = new AestheticEvolutionEngine({ debugMode: true });

  // Test Scenario 1: Overwhelmed Bride
  console.log('📋 Scenario 1: "I need clinical skincare analysis for my wedding next month"');
  console.log('Expected: Wedding service override → luxury fonts, clinical context → clean layout\n');

  // Simulate Agent B detecting services and keywords
  engine.updateServiceContext(
    ['skincare', 'facial'], 
    ['wedding', 'clinical', 'analysis'], 
    'medium'
  );

  // Simulate emotional state progression
  let evolution = engine.evolveToState('uncertain', 'Initial consultation entry');
  console.log('Step 1 - Uncertain state with wedding + clinical context:');
  console.log('Typography:', evolution.currentState.typography);
  console.log('Spacing:', evolution.currentState.spacing);
  console.log('Colors:', evolution.currentState.colors);
  console.log('');

  // Test Scenario 2: Quick Touch-up
  console.log('📋 Scenario 2: "I need a quick trim today"');
  console.log('Expected: Urgent service override → clean fonts, sophisticated context → elegant layout\n');

  engine.updateServiceContext(
    ['hair', 'trim'], 
    ['quick', 'today', 'trim'], 
    'urgent'
  );

  evolution = engine.evolveToState('confident', 'Quick service confidence');
  console.log('Step 2 - Confident state with urgent + hair context:');
  console.log('Typography:', evolution.currentState.typography);
  console.log('Spacing:', evolution.currentState.spacing);
  console.log('');

  // Test Scenario 3: Creative Makeup
  console.log('📋 Scenario 3: "I want bold, artistic makeup for a photoshoot"');
  console.log('Expected: No service override → artistic context fonts, engaged state → creative styling\n');

  engine.updateServiceContext(
    ['makeup', 'application'], 
    ['bold', 'artistic', 'photoshoot'], 
    'low'
  );

  evolution = engine.evolveToState('engaged', 'Creative engagement');
  console.log('Step 3 - Engaged state with artistic context:');
  console.log('Typography:', evolution.currentState.typography);
  console.log('Spacing:', evolution.currentState.spacing);
  console.log('');

  // Test Scenario 4: Cognitive Load Adaptation
  console.log('📋 Scenario 4: Testing cognitive load adaptation');
  console.log('Expected: High cognitive load → minimal visual complexity, generous spacing\n');

  const cognitiveResult = engine.assessCognitiveLoadAndAdapt(
    'I need a comprehensive skin analysis with detailed treatment recommendations including product suggestions, timeline planning, and follow-up scheduling for my sensitive acne-prone skin that reacts to most products',
    {
      experienceLevel: 'beginner',
      currentEmotionalState: 'uncertain',
      sessionProgress: 0.1,
      previousDecisions: 0,
      engagementDepth: 0.2
    },
    'decision'
  );

  console.log('Cognitive Load Analysis:');
  console.log('- Content Complexity:', cognitiveResult.cognitiveLoad.level);
  console.log('- Visual Complexity:', cognitiveResult.visualComplexity);
  console.log('- Recommendations:', cognitiveResult.recommendations);
  console.log('');

  // Test comprehensive state
  const comprehensiveState = engine.getComprehensiveState();
  console.log('📊 Final Comprehensive State:');
  console.log('- Emotional State:', comprehensiveState.aestheticEvolution.currentState.emotionalState);
  console.log('- Professional Context:', comprehensiveState.professionalContext);
  console.log('- Visual Complexity:', comprehensiveState.visualComplexity);
  console.log('- Contextual Language Purpose:', comprehensiveState.contextualLanguage.functionalPurpose);
  console.log('');

  console.log('✅ Orchestration test complete! All systems working together.');
}

// Export for use in demo or development
export { testAestheticOrchestration as runOrchestrationTest };

