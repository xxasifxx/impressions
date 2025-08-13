import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, ShoppingCart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageChoiceQuestion from './ImageChoiceQuestion';
import { 
  enhancedDecisionTree, 
  EnhancedDecisionNode, 
  EnhancedDecisionOption,
  getUnifiedServiceRecommendations 
} from '@/data/enhancedConsultationFlow';

interface EnhancedConsultationFlowProps {
  onProgressChange?: (progress: number, domain?: string) => void;
  onComplete?: (results: any) => void;
}

const EnhancedConsultationFlow: React.FC<EnhancedConsultationFlowProps> = ({
  onProgressChange,
  onComplete
}) => {
  const navigate = useNavigate();
  
  const [currentNodeId, setCurrentNodeId] = useState('root');
  const [responses, setResponses] = useState<Record<string, { optionId: string; weight: number; domains?: string[] }>>({});
  const [conversationHistory, setConversationHistory] = useState<Array<{ question: string; answer: string }>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentNode = enhancedDecisionTree[currentNodeId];

  // Calculate progress
  const totalNodes = Object.keys(enhancedDecisionTree).length;
  const completedNodes = Object.keys(responses).length;
  const progressPercentage = Math.min((completedNodes / Math.max(totalNodes - 2, 1)) * 100, 100);

  // Update progress when it changes
  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progressPercentage / 100, getDominantDomain());
    }
  }, [progressPercentage]);

  // Get the dominant domain from responses
  const getDominantDomain = (): string | undefined => {
    const domainCounts: Record<string, number> = {};
    
    Object.values(responses).forEach(response => {
      if (response.domains) {
        response.domains.forEach(domain => {
          domainCounts[domain] = (domainCounts[domain] || 0) + 1;
        });
      }
    });
    
    let maxCount = 0;
    let dominantDomain: string | undefined = undefined;
    
    Object.entries(domainCounts).forEach(([domain, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantDomain = domain;
      }
    });
    
    return dominantDomain;
  };

  const handleOptionSelect = (option: EnhancedDecisionOption) => {
    setIsTransitioning(true);
    
    // Record response with domain information
    const newResponses = {
      ...responses,
      [currentNodeId]: { 
        optionId: option.id, 
        weight: option.weight,
        domains: option.domains 
      }
    };
    
    // Add to conversation history
    const newHistory = [...conversationHistory, {
      question: currentNode.question,
      answer: option.label
    }];

    // Use setTimeout to create a smooth transition effect
    setTimeout(() => {
      setResponses(newResponses);
      setConversationHistory(newHistory);
      
      // Navigate to next node or complete
      if (option.isLeaf || !option.nextNodeId) {
        // Consultation complete
        const result = getUnifiedServiceRecommendations(newResponses);
        setRecommendations(result);
        setIsComplete(true);
        
        // Call onComplete callback if provided
        if (onComplete) {
          onComplete(result);
        }
      } else {
        setCurrentNodeId(option.nextNodeId);
      }
      
      setIsTransitioning(false);
    }, 400);
  };

  const handleGoBack = () => {
    if (conversationHistory.length === 0) return;
    
    setIsTransitioning(true);

    // Use setTimeout to create a smooth transition effect
    setTimeout(() => {
      // Remove last response and conversation entry
      const newHistory = conversationHistory.slice(0, -1);
      setConversationHistory(newHistory);

      const newResponses = { ...responses };
      delete newResponses[currentNodeId];
      setResponses(newResponses);

      // Navigate back to previous node
      if (newHistory.length === 0) {
        setCurrentNodeId('root');
      } else {
        // In a real implementation, we would track the node history
        // For now, we'll just go back to root as a simplification
        setCurrentNodeId('root');
      }
      
      setIsTransitioning(false);
    }, 400);
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
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentNodeId('root');
      setResponses({});
      setConversationHistory([]);
      setIsComplete(false);
      setRecommendations(null);
      setIsTransitioning(false);
    }, 400);
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

  // Background style with current node's background image
  const backgroundStyle = currentNode?.backgroundImage ? {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${currentNode.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out"
      style={isComplete ? {} : backgroundStyle}
    >
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
        <div className="max-w-3xl mx-auto">
          
          {/* Conversation History */}
          {conversationHistory.length > 0 && (
            <div className="mb-8 space-y-4">
              {conversationHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-red-100"
                >
                  <div className="text-sm text-gray-600 mb-1">{entry.question}</div>
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {entry.answer}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Current Question or Results */}
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8 bg-white/90 backdrop-blur-sm">
                  <ImageChoiceQuestion
                    question={currentNode.question}
                    options={currentNode.options}
                    onSelect={handleOptionSelect}
                  />
                  
                  {/* Back Button */}
                  {conversationHistory.length > 0 && (
                    <div className="flex justify-start mt-6">
                      <Button
                        onClick={handleGoBack}
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-800"
                        disabled={isTransitioning}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ) : (
              /* Results */
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    >
                      <Sparkles className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-light mb-4 text-gray-900">
                      Perfect! We have personalized recommendations for you.
                    </h2>
                    <p className="text-lg text-gray-600">
                      Based on your needs, here are services across our beauty domains that would be perfect for you.
                    </p>
                  </div>

                  {/* Cross-Domain Recommendations */}
                  <div className="space-y-6 mb-8">
                    
                    {/* Hair Salon Services */}
                    {recommendations.recommendedServices['hair-salon'].length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6"
                      >
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                          <span className="text-xl">💇‍♀️</span>
                          Hair Salon Services
                        </h3>
                        <div className="space-y-2">
                          {recommendations.recommendedServices['hair-salon'].map((serviceId: string, index: number) => (
                            <div key={serviceId} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">
                                {serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Makeup Studio Services */}
                    {recommendations.recommendedServices['makeup-studio'].length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6"
                      >
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                          <span className="text-xl">💄</span>
                          Makeup Studio Services
                        </h3>
                        <div className="space-y-2">
                          {recommendations.recommendedServices['makeup-studio'].map((serviceId: string, index: number) => (
                            <div key={serviceId} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">
                                {serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Med Spa Services */}
                    {recommendations.recommendedServices['med-spa'].length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6"
                      >
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                          <span className="text-xl">✨</span>
                          Med Spa Services
                        </h3>
                        <div className="space-y-2">
                          {recommendations.recommendedServices['med-spa'].map((serviceId: string, index: number) => (
                            <div key={serviceId} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">
                                {serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Cross-Domain Packages */}
                    {recommendations.crossDomainPackages && recommendations.crossDomainPackages.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-2 border-yellow-200"
                      >
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
                      </motion.div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
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
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default EnhancedConsultationFlow;

