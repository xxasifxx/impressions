import React, { useState } from 'react';
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

const UnifiedConsultationFlow: React.FC = () => {
  const navigate = useNavigate();
  
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

    // Navigate to next node or complete
    if (option.isLeaf || !option.nextNodeId) {
      // Consultation complete
      const result = getUnifiedServiceRecommendations(newResponses);
      setRecommendations(result);
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

    // Navigate back (simplified - would need proper navigation stack)
    if (newHistory.length === 0) {
      setCurrentNodeId('root');
    } else {
      setCurrentNodeId('root'); // Simplified back navigation
    }
  };

  const handleViewServices = () => {
    // Navigate to unified services page with cross-domain recommendations
    const allServices = [
      ...recommendations.recommendedServices['hair-salon'],
      ...recommendations.recommendedServices['makeup-studio'],
      ...recommendations.recommendedServices['med-spa']
    ];
    const serviceParams = allServices.join(',');
    navigate(`/services?recommended=${serviceParams}&motivation=${recommendations.customerMotivation}`);
  };

  const handleStartOver = () => {
    setCurrentNodeId('root');
    setResponses({});
    setConversationHistory([]);
    setIsComplete(false);
    setRecommendations(null);
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-rose-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Personal Beauty Consultation
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  ✨ Let our expert system find the perfect services for your unique needs
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700 mb-2">
                {isComplete ? '🎉 Complete!' : `Step ${completedNodes + 1} of ${Math.max(totalNodes - 2, 1)}`}
              </div>
              <div className="w-40">
                <Progress value={progressPercentage} className="h-3 bg-rose-100" />
                <div className="text-xs text-gray-500 mt-1">{Math.round(progressPercentage)}% complete</div>
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
            <div className="mb-8 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-rose-500">📋</span>
                Your Consultation Summary
              </h3>
              {conversationHistory.map((entry, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-rose-100 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="text-sm font-medium text-gray-700 mb-2">{entry.question}</div>
                  <div className="font-semibold text-gray-900 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-rose-700">{entry.answer}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current Question or Results */}
          {!isComplete ? (
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-rose-200 shadow-lg">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-rose-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 leading-tight">
                  {currentNode.question}
                </h2>
                <p className="text-gray-600 text-lg">
                  Choose the option that best describes your needs
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {currentNode.options.map((option, index) => (
                  <Button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    variant="outline"
                    className="w-full p-6 h-auto text-left justify-start hover:border-rose-300 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-[1.02] border-2 group"
                  >
                    <div className="flex items-center gap-4 w-full">
                      {option.emoji && (
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <span className="text-2xl">{option.emoji}</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <span className="font-semibold text-lg text-gray-900 group-hover:text-rose-700 transition-colors">
                          {option.label}
                        </span>
                        {option.domains && option.domains.length > 1 && (
                          <div className="text-sm text-rose-600 mt-2 font-medium">
                            ✨ Cross-domain services available • Premium bundling options
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          Tap to continue your personalized consultation
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-rose-500 transition-colors" />
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
            <div className="space-y-6">
              {/* Success Header */}
              <Card className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-6">
                    <Sparkles className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4 text-gray-900">
                    🎉 Perfect Match Found!
                  </h2>
                  <p className="text-xl text-gray-700 mb-4">
                    Our expert consultation system has curated personalized recommendations just for you
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-6 py-3 text-sm font-semibold text-emerald-700">
                    <CheckCircle className="w-5 h-5" />
                    Consultation Complete • {conversationHistory.length} questions analyzed
                  </div>
                </div>
              </Card>

              {/* Business Value Highlight */}
              <Card className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    💎 Intelligent Cross-Domain Bundling
                  </h3>
                  <p className="text-gray-700">
                    Save up to 25% with our expertly curated service packages across Hair • Makeup • Med Spa
                  </p>
                </div>
              </Card>

              {/* Cross-Domain Recommendations */}
              <div className="space-y-6 mb-8">
                
                {/* Hair Salon Services */}
                {recommendations.recommendedServices['hair-salon'].length > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">💇‍♀️</span>
                        </div>
                        Hair Salon Services
                      </h3>
                      <div className="text-sm font-semibold text-rose-600 bg-white/80 rounded-full px-3 py-1">
                        {recommendations.recommendedServices['hair-salon'].length} services
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {recommendations.recommendedServices['hair-salon'].map((serviceId: string, index: number) => (
                        <div key={serviceId} className="flex items-center justify-between bg-white/60 rounded-lg p-3 border border-rose-100">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="font-medium text-gray-900">
                              {serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Recommended for you
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-rose-100/50 rounded-lg">
                      <p className="text-sm text-rose-700 font-medium">
                        💡 Bundle these services for maximum value and convenience
                      </p>
                    </div>
                  </Card>
                )}

                {/* Makeup Studio Services */}
                {recommendations.recommendedServices['makeup-studio'].length > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">💄</span>
                        </div>
                        Makeup Studio Services
                      </h3>
                      <div className="text-sm font-semibold text-purple-600 bg-white/80 rounded-full px-3 py-1">
                        {recommendations.recommendedServices['makeup-studio'].length} services
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {recommendations.recommendedServices['makeup-studio'].map((serviceId: string, index: number) => (
                        <div key={serviceId} className="flex items-center justify-between bg-white/60 rounded-lg p-3 border border-purple-100">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="font-medium text-gray-900">
                              {serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Perfect match
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-purple-100/50 rounded-lg">
                      <p className="text-sm text-purple-700 font-medium">
                        ✨ Professional makeup artistry tailored to your style
                      </p>
                    </div>
                  </Card>
                )}

                {/* Med Spa Services */}
                {recommendations.recommendedServices['med-spa'].length > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">🧖‍♀️</span>
                        </div>
                        Med Spa Services
                      </h3>
                      <div className="text-sm font-semibold text-emerald-600 bg-white/80 rounded-full px-3 py-1">
                        {recommendations.recommendedServices['med-spa'].length} services
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {recommendations.recommendedServices['med-spa'].map((serviceId: string, index: number) => (
                        <div key={serviceId} className="flex items-center justify-between bg-white/60 rounded-lg p-3 border border-emerald-100">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="font-medium text-gray-900">
                              {serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Therapeutic choice
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-emerald-100/50 rounded-lg">
                      <p className="text-sm text-emerald-700 font-medium">
                        🌿 Advanced treatments for your wellness and beauty goals
                      </p>
                    </div>
                  </Card>
                )}

                {/* Cross-Domain Packages */}
                {recommendations.crossDomainPackages.length > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-2 border-yellow-200">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                      <span className="text-xl">🎁</span>
                      Special Package Deals
                    </h3>
                    <div className="space-y-2">
                      {recommendations.crossDomainPackages.map((packageId: string, index: number) => (
                        <div key={packageId} className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-600" />
                          <span className="text-gray-700 font-medium">
                            {packageId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Package
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <Card className="p-6 bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Ready to Book Your Perfect Experience?</h3>
                  <p className="text-rose-100">
                    Your personalized consultation is complete. Let's make it happen!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleViewServices}
                    className="flex-1 bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    Book My Services Now
                  </Button>
                  <Button
                    onClick={handleStartOver}
                    variant="outline"
                    className="flex-1 border-white text-white hover:bg-white/10 font-medium"
                    size="lg"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Start New Consultation
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-rose-100">
                    💎 Questions? Call us at (555) 123-4567 or visit our studio
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UnifiedConsultationFlow;
