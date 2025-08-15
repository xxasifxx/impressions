import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, ShoppingCart, Sparkles } from 'lucide-react';
import { 
  unifiedDecisionTree, 
  UnifiedDecisionNode, 
  UnifiedDecisionOption,
  getUnifiedServiceRecommendations 
} from '@/data/unifiedConsultationFlow';
import { useAestheticContext } from '@/components/ConsultationModal/AestheticProvider';

const UnifiedConsultationFlow: React.FC = () => {
  const navigate = useNavigate();
  const aesthetic = useAestheticContext();
  
  const [currentNodeId, setCurrentNodeId] = useState('root');
  const [responses, setResponses] = useState<Record<string, { optionId: string; weight: number; domains?: string[] }>>({});
  const [conversationHistory, setConversationHistory] = useState<Array<{ question: string; answer: string }>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const currentNode = unifiedDecisionTree[currentNodeId];

  // Calculate progress
  const totalNodes = Object.keys(unifiedDecisionTree).length;
  const completedNodes = Object.keys(responses).length;
  const progressPercentage = Math.min((completedNodes / Math.max(totalNodes - 2, 1)) * 100, 100);

  // Set initial aesthetic state
  useEffect(() => {
    aesthetic.evolveToState('uncertain', 'Starting consultation');
  }, []);

  // Update aesthetic state based on progress
  useEffect(() => {
    const progress = completedNodes / Math.max(totalNodes - 2, 1);
    
    if (progress < 0.25) {
      aesthetic.evolveToState('uncertain', 'Starting consultation');
    } else if (progress < 0.5) {
      aesthetic.evolveToState('exploring', 'Exploring options');
    } else if (progress < 0.75) {
      aesthetic.evolveToState('engaged', 'Actively participating');
    } else if (progress < 1) {
      aesthetic.evolveToState('confident', 'Nearing completion');
    }
  }, [completedNodes, aesthetic]);

  const handleOptionSelect = (option: UnifiedDecisionOption) => {
    // Record response with domain information
    const newResponses = {
      ...responses,
      [currentNodeId]: { 
        optionId: option.id, 
        weight: option.weight,
        domains: option.domains 
      }
    };
    setResponses(newResponses);

    // Add to conversation history
    setConversationHistory(prev => [...prev, {
      question: currentNode.question,
      answer: option.label
    }]);

    // Update aesthetic based on the selected option's path
    if (option.aestheticState) {
      aesthetic.evolveToState(option.aestheticState, `Selected ${option.label}`);
    }
    
    // If option has a specific service category, apply it
    if (option.serviceCategory) {
      aesthetic.applyToElement(
        document.documentElement,
        option.serviceCategory
      );
    }
    
    // If option has a specific mood, apply it
    if (option.mood) {
      aesthetic.applyToElement(
        document.documentElement,
        undefined,
        option.mood
      );
    }

    // Navigate to next node or complete
    if (option.isLeaf || !option.nextNodeId) {
      // Consultation complete
      const result = getUnifiedServiceRecommendations(newResponses);
      
      // Trigger celebratory state before navigation
      aesthetic.triggerCelebratoryState('Completed consultation');
      
      // Navigate to results page
      navigate('/consultation/results', { state: { results: result } });
    } else {
      setCurrentNodeId(option.nextNodeId);
    }
  };

  const handleGoBack = () => {
    if (conversationHistory.length === 0) return;

    // Remove last response and conversation entry
    const newHistory = conversationHistory.slice(0, -1);
    setConversationHistory(newHistory);

    const newResponses = { ...responses };
    delete newResponses[currentNodeId];
    setResponses(newResponses);

    // Navigate back (simplified - would need proper navigation stack)
    if (newHistory.length === 0) {
      setCurrentNodeId('root');
      aesthetic.evolveToState('uncertain', 'Starting over');
    } else {
      // Find the previous node ID
      const prevNodeId = Object.keys(newResponses).pop() || 'root';
      setCurrentNodeId(prevNodeId);
      
      // Update aesthetic state based on the previous node
      const prevOption = Object.values(unifiedDecisionTree)
        .flatMap(node => node.options)
        .find(option => option.nextNodeId === prevNodeId);
        
      if (prevOption?.aestheticState) {
        aesthetic.evolveToState(prevOption.aestheticState, 'Going back');
      }
    }
  };

  if (!currentNode && !isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-stone-50 to-red-50/30 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load the consultation.</p>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-stone-50 to-red-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-red-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Personal Beauty Consultation
                </h1>
                <p className="text-sm text-gray-600">
                  Let's find the perfect services for your needs
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {isComplete ? 'Complete!' : `Step ${completedNodes + 1}`}
              </div>
              <div className="w-32">
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Conversation History */}
          {conversationHistory.length > 0 && (
            <div className="mb-8 space-y-4">
              {conversationHistory.map((entry, index) => (
                <div key={index} className="bg-white/50 rounded-lg p-4 border border-red-100">
                  <div className="text-sm text-gray-600 mb-1">{entry.question}</div>
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {entry.answer}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current Question */}
          <Card className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-light mb-4 text-gray-900">
                {currentNode.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentNode.options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  variant="outline"
                  className="w-full p-4 h-auto text-left justify-start hover:border-red-300 hover:bg-red-50"
                >
                  <div className="flex items-center gap-3 w-full">
                    {option.emoji && (
                      <span className="text-xl">{option.emoji}</span>
                    )}
                    <div className="flex-1">
                      <span className="font-medium">{option.label}</span>
                      {option.domains && option.domains.length > 1 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Cross-domain services available
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Back Button */}
            {conversationHistory.length > 0 && (
              <div className="flex justify-start">
                <Button
                  onClick={handleGoBack}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UnifiedConsultationFlow;

