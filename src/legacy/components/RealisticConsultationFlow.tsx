import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { ArrowLeft, ArrowRight, CheckCircle, ShoppingCart } from 'lucide-react';
import { 
  decisionTrees, 
  DecisionNode, 
  DecisionOption,
  getServiceRecommendations 
} from '@/data/realisticConsultationFlow';

interface RealisticConsultationFlowProps {
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
}

const RealisticConsultationFlow: React.FC<RealisticConsultationFlowProps> = ({ domain }) => {
  const { currentTheme } = useDomainTheme();
  const navigate = useNavigate();
  
  const [currentNodeId, setCurrentNodeId] = useState('root');
  const [responses, setResponses] = useState<Record<string, { optionId: string; weight: number }>>({});
  const [conversationHistory, setConversationHistory] = useState<Array<{ question: string; answer: string }>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendedServices, setRecommendedServices] = useState<string[]>([]);

  const decisionTree = decisionTrees[domain];
  const currentNode = decisionTree[currentNodeId];

  // Calculate progress
  const totalNodes = Object.keys(decisionTree).length;
  const completedNodes = Object.keys(responses).length;
  const progressPercentage = Math.min((completedNodes / Math.max(totalNodes - 2, 1)) * 100, 100);

  const handleOptionSelect = (option: DecisionOption) => {
    // Record response
    const newResponses = {
      ...responses,
      [currentNodeId]: { optionId: option.id, weight: option.weight }
    };
    setResponses(newResponses);

    // Add to conversation history
    setConversationHistory(prev => [...prev, {
      question: currentNode.question,
      answer: option.label
    }]);

    // Navigate to next node or complete
    if (option.isLeaf || !option.nextNodeId) {
      // Consultation complete
      const recommendations = getServiceRecommendations(domain, newResponses);
      setRecommendedServices(recommendations);
      setIsComplete(true);
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

    // Find previous node (simplified - in real implementation would need proper navigation stack)
    if (newHistory.length === 0) {
      setCurrentNodeId('root');
    } else {
      // This is simplified - would need proper back navigation logic
      setCurrentNodeId('root');
    }
  };

  const handleViewServices = () => {
    // Navigate to services page with recommendations
    const serviceParams = recommendedServices.join(',');
    navigate(`/services?domain=${domain}&recommended=${serviceParams}`);
  };

  const handleStartOver = () => {
    setCurrentNodeId('root');
    setResponses({});
    setConversationHistory([]);
    setIsComplete(false);
    setRecommendedServices([]);
  };

  if (!currentNode && !isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-stone-50 to-red-50/30 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load the consultation.</p>
          <Link to={`/${domain}`}>
            <Button>Go Back</Button>
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
              <Link to={`/${domain}`}>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Personal Consultation
                </h1>
                <p className="text-sm text-gray-600">
                  Let's find the perfect services for you
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

          {/* Current Question or Results */}
          {!isComplete ? (
            <Card className="p-8">
              <div className="mb-8">
                <h2 
                  className="text-2xl font-light mb-4 text-gray-900"
                  style={{ fontFamily: currentTheme.fonts.heading }}
                >
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
                      <span className="font-medium">{option.label}</span>
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
          ) : (
            /* Results */
            <Card className="p-8">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 
                  className="text-3xl font-light mb-4 text-gray-900"
                  style={{ fontFamily: currentTheme.fonts.heading }}
                >
                  Perfect! We have some great recommendations for you.
                </h2>
                <p className="text-lg text-gray-600">
                  Based on your responses, here are the services that would be perfect for your needs.
                </p>
              </div>

              {/* Recommended Services Preview */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Recommended for You:
                </h3>
                <div className="space-y-2">
                  {recommendedServices.map((serviceId, index) => (
                    <div key={serviceId} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">
                        {/* This would map to actual service names */}
                        Service {index + 1} (ID: {serviceId})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleViewServices}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Services & Book
                </Button>
                <Button
                  onClick={handleStartOver}
                  variant="outline"
                  className="flex-1"
                >
                  Start Over
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default RealisticConsultationFlow;

