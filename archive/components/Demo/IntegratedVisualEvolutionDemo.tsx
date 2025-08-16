/**
 * Integrated Visual Evolution Demo
 * 
 * Demonstrates how all sophisticated visual evolution systems work together:
 * 1. Cognitive Load Assessment
 * 2. Professional Context Detection  
 * 3. Progressive Disclosure
 * 4. Typography Evolution
 * 5. Contextual Visual Languages
 */

import React, { useState, useEffect } from 'react';
import { AestheticEvolutionEngine } from '../../engine/AestheticEvolutionEngine';
import { ContextualLayoutProvider, useContextualLayout } from '../ContextualLayout';
import { ProgressiveDisclosureProvider, DisclosureLayer, InformationLayer } from '../ProgressiveDisclosure';
import { ProfessionalContext } from '../../types/VisualEvolutionTypes';

interface DemoScenario {
  id: string;
  name: string;
  userInput: string;
  expectedContext: ProfessionalContext;
  expectedComplexity: 'minimal' | 'simple' | 'balanced' | 'rich' | 'sophisticated';
  description: string;
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'overwhelmed-bride',
    name: 'Overwhelmed Bride',
    userInput: 'I\'m getting married next month and need hair, makeup, and skincare but I\'m completely overwhelmed and don\'t know where to start',
    expectedContext: 'luxury',
    expectedComplexity: 'minimal',
    description: 'High cognitive load (overwhelmed) + luxury context (wedding) = minimal visual complexity with premium context'
  },
  {
    id: 'simple-trim',
    name: 'Simple Trim',
    userInput: 'Book my usual trim appointment',
    expectedContext: 'sophisticated',
    expectedComplexity: 'sophisticated',
    description: 'Low cognitive load (familiar action) + hair service = sophisticated visual complexity'
  },
  {
    id: 'skincare-analysis',
    name: 'Skincare Analysis',
    userInput: 'I need a professional skin analysis to understand my skin type and create a treatment plan',
    expectedContext: 'clinical',
    expectedComplexity: 'balanced',
    description: 'Moderate cognitive load (analysis needed) + clinical context = balanced complexity with scientific credibility'
  },
  {
    id: 'artistic-makeup',
    name: 'Creative Makeup',
    userInput: 'I want bold, artistic makeup for a photoshoot - something really creative and dramatic',
    expectedContext: 'artistic',
    expectedComplexity: 'rich',
    description: 'Low-moderate cognitive load (clear vision) + artistic context = rich visual complexity'
  },
  {
    id: 'natural-everyday',
    name: 'Natural Look',
    userInput: 'Just want a natural, everyday look that enhances my features subtly',
    expectedContext: 'natural',
    expectedComplexity: 'balanced',
    description: 'Low cognitive load (simple request) + natural context = balanced complexity with organic feel'
  }
];

export const IntegratedVisualEvolutionDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario>(DEMO_SCENARIOS[0]);
  const [engine] = useState(() => new AestheticEvolutionEngine({ debugMode: true }));
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  return (
    <ContextualLayoutProvider initialContext={selectedScenario.expectedContext}>
      <ProgressiveDisclosureProvider>
        <DemoContent 
          scenario={selectedScenario}
          onScenarioChange={setSelectedScenario}
          engine={engine}
          analysisResult={analysisResult}
          onAnalysisChange={setAnalysisResult}
        />
      </ProgressiveDisclosureProvider>
    </ContextualLayoutProvider>
  );
};

interface DemoContentProps {
  scenario: DemoScenario;
  onScenarioChange: (scenario: DemoScenario) => void;
  engine: AestheticEvolutionEngine;
  analysisResult: any;
  onAnalysisChange: (result: any) => void;
}

const DemoContent: React.FC<DemoContentProps> = ({
  scenario,
  onScenarioChange,
  engine,
  analysisResult,
  onAnalysisChange
}) => {
  const { state: contextualState, setContext, setVisualComplexity } = useContextualLayout();

  // Run analysis when scenario changes
  useEffect(() => {
    // Detect professional context
    const detectedContext = engine.detectProfessionalContext(
      scenario.userInput.includes('wedding') ? 'luxury' :
      scenario.userInput.includes('skin') ? 'skincare' :
      scenario.userInput.includes('hair') || scenario.userInput.includes('trim') ? 'hair' :
      scenario.userInput.includes('makeup') ? 'makeup' :
      scenario.userInput.includes('natural') ? 'natural' : 'sophisticated'
    );

    // Assess cognitive load
    const userContext = {
      experienceLevel: 'intermediate' as const,
      currentEmotionalState: scenario.userInput.includes('overwhelmed') ? 'uncertain' as const : 
                           scenario.userInput.includes('usual') ? 'confident' as const : 'exploring' as const,
      sessionProgress: 0.3,
      previousDecisions: scenario.userInput.includes('overwhelmed') ? 5 : 1,
      engagementDepth: 0.5
    };

    const contentType = scenario.userInput.includes('Book') ? 'confirmation' as const :
                       scenario.userInput.includes('analysis') ? 'decision' as const : 'selection' as const;

    const result = engine.assessCognitiveLoadAndAdapt(
      scenario.userInput,
      userContext,
      contentType
    );

    // Update contexts
    setContext(detectedContext);
    setVisualComplexity(result.visualComplexity);
    onAnalysisChange(result);

    console.log('🎯 Demo Analysis:', {
      scenario: scenario.name,
      detectedContext,
      cognitiveLoad: result.cognitiveLoad,
      visualComplexity: result.visualComplexity,
      userInput: scenario.userInput
    });
  }, [scenario, engine, setContext, setVisualComplexity, onAnalysisChange]);

  // Create information layers for progressive disclosure
  const informationLayers: InformationLayer[] = [
    {
      level: 'essential',
      content: (
        <div className="contextual-typography">
          <h3>Your Request</h3>
          <p>"{scenario.userInput}"</p>
        </div>
      ),
      triggerConditions: {},
      functionalPurpose: 'Show user their input for confirmation and context'
    },
    {
      level: 'helpful',
      content: (
        <div className="contextual-typography">
          <h4>Analysis Results</h4>
          <ul>
            <li><strong>Professional Context:</strong> {contextualState.currentContext}</li>
            <li><strong>Visual Complexity:</strong> {contextualState.visualComplexity}</li>
            <li><strong>Cognitive Load:</strong> {analysisResult?.cognitiveLoad?.level || 'Analyzing...'}</li>
          </ul>
        </div>
      ),
      triggerConditions: {
        timeSpent: 5,
        interactionDepth: 1
      },
      functionalPurpose: 'Provide transparency about system analysis for user understanding'
    },
    {
      level: 'detailed',
      content: (
        <div className="contextual-typography">
          <h4>Visual Adaptations Applied</h4>
          <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
            <p><strong>Typography:</strong> {getFontForContext(contextualState.currentContext)}</p>
            <p><strong>Spacing:</strong> {getSpacingForComplexity(contextualState.visualComplexity)}</p>
            <p><strong>Visual Language:</strong> {getVisualLanguageDescription(contextualState.currentContext)}</p>
            <p><strong>Disclosure Strategy:</strong> {getDisclosureStrategy(analysisResult?.cognitiveLoad?.level)}</p>
          </div>
        </div>
      ),
      triggerConditions: {
        engagementThreshold: 0.4,
        timeSpent: 15,
        interactionDepth: 3
      },
      functionalPurpose: 'Educate engaged users about sophisticated visual evolution principles'
    },
    {
      level: 'expert',
      content: (
        <div className="contextual-typography">
          <h4>Technical Implementation</h4>
          <details style={{ fontSize: '0.85em', opacity: 0.7 }}>
            <summary>System Integration Details</summary>
            <pre style={{ fontSize: '0.8em', background: '#f8f9fa', padding: '8px', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify({
                cognitiveLoadAnalysis: analysisResult?.analysis,
                professionalContext: contextualState.currentContext,
                visualComplexity: contextualState.visualComplexity,
                adaptedVocabulary: contextualState.adaptedVocabulary
              }, null, 2)}
            </pre>
          </details>
        </div>
      ),
      triggerConditions: {
        engagementThreshold: 0.7,
        timeSpent: 30,
        interactionDepth: 5
      },
      functionalPurpose: 'Provide technical details for developers and advanced users'
    }
  ];

  return (
    <div className={`demo-container contextual-${contextualState.currentContext} ${contextualState.visualComplexity}-complexity`}>
      <div className="contextual-spacing">
        <header className="demo-header">
          <h1 className="contextual-typography">Sophisticated Visual Evolution Demo</h1>
          <p className="contextual-typography">
            See how cognitive load assessment, professional contexts, and progressive disclosure work together.
          </p>
        </header>

        <section className="scenario-selector contextual-spacing">
          <h2 className="contextual-typography">Select a Scenario</h2>
          <div className="scenario-grid">
            {DEMO_SCENARIOS.map(demoScenario => (
              <button
                key={demoScenario.id}
                className={`scenario-card contextual-interactive ${scenario.id === demoScenario.id ? 'active' : ''}`}
                onClick={() => onScenarioChange(demoScenario)}
              >
                <h3 className="contextual-typography">{demoScenario.name}</h3>
                <p className="contextual-typography" style={{ fontSize: '0.9em', opacity: 0.8 }}>
                  {demoScenario.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="analysis-display contextual-spacing">
          <DisclosureLayer 
            layers={informationLayers}
            className="demo-disclosure"
          />
        </section>

        <section className="visual-examples contextual-spacing">
          <h2 className="contextual-typography">Visual Evolution in Action</h2>
          
          <div className="example-grid">
            <div className="example-card contextual-interactive">
              <h3 className="contextual-typography">Typography Evolution</h3>
              <div className="font-demo contextual-typography" style={{ fontSize: '1.2em' }}>
                This text adapts its font based on professional context
              </div>
            </div>

            <div className="example-card contextual-interactive">
              <h3 className="contextual-typography">Spacing Adaptation</h3>
              <div className="spacing-demo">
                <div className="contextual-spacing">
                  Spacing adjusts based on cognitive load
                </div>
              </div>
            </div>

            <div className="example-card contextual-interactive">
              <h3 className="contextual-typography">Visual Complexity</h3>
              <div className="complexity-demo">
                <div className={`complexity-indicator ${contextualState.visualComplexity}`}>
                  {contextualState.visualComplexity} complexity
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper functions for demo
function getFontForContext(context: ProfessionalContext): string {
  const fonts = {
    clinical: 'Inter (clean, scientific)',
    artistic: 'Dancing Script (creative, flowing)',
    sophisticated: 'Playfair Display (elegant, refined)',
    luxury: 'Imperial Script (premium, exclusive)',
    wellness: 'Fleur De Leah (natural, organic)',
    precision: 'Inter (technical, precise)',
    dramatic: 'Inter Bold (bold, impactful)',
    natural: 'Inter (comfortable, natural)'
  };
  return fonts[context] || 'Inter';
}

function getSpacingForComplexity(complexity: string): string {
  const spacing = {
    minimal: 'Generous (24px+)',
    simple: 'Comfortable (20px)',
    balanced: 'Standard (16px)',
    rich: 'Efficient (14px)',
    sophisticated: 'Compact (12px)'
  };
  return spacing[complexity as keyof typeof spacing] || 'Standard';
}

function getVisualLanguageDescription(context: ProfessionalContext): string {
  const descriptions = {
    clinical: 'Geometric shapes, matte surfaces, exact alignment',
    artistic: 'Flowing shapes, textured surfaces, organic alignment',
    sophisticated: 'Structured shapes, smooth surfaces, refined alignment',
    luxury: 'Precise shapes, glossy surfaces, systematic alignment',
    wellness: 'Organic shapes, natural surfaces, organic alignment',
    precision: 'Geometric shapes, flat surfaces, exact alignment',
    dramatic: 'Angular shapes, dimensional surfaces, systematic alignment',
    natural: 'Soft shapes, matte surfaces, natural alignment'
  };
  return descriptions[context] || 'Standard visual language';
}

function getDisclosureStrategy(cognitiveLoad?: string): string {
  const strategies = {
    minimal: 'Progressive revelation',
    low: 'Contextual disclosure',
    moderate: 'Balanced approach',
    high: 'Essential only',
    complex: 'Minimal disclosure'
  };
  return strategies[cognitiveLoad as keyof typeof strategies] || 'Adaptive strategy';
}

