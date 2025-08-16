import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { 
  enhancedDecisionTree, 
  EnhancedDecisionOption,
  getUnifiedServiceRecommendations 
} from '@/data/enhancedConsultationFlow';
import ConsultationQuestion from './ConsultationQuestion';
import ConsultationResults from './ConsultationResults';

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
  const [isComplete, setIsComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(window.innerWidth / window.innerHeight);

  // Track screen aspect ratio for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  }, [progressPercentage, onProgressChange]);

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

    // Use setTimeout to create a smooth transition effect
    setTimeout(() => {
      setResponses(newResponses);
      
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
    if (completedNodes === 0) return;
    
    setIsTransitioning(true);

    // Use setTimeout to create a smooth transition effect
    setTimeout(() => {
      // Remove last response
      const newResponses = { ...responses };
      delete newResponses[currentNodeId];
      setResponses(newResponses);

      // Navigate back to previous node
      // In a real implementation, we would track the node history
      // For now, we'll just go back to root as a simplification
      setCurrentNodeId('root');
      
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
      setIsComplete(false);
      setRecommendations(null);
      setIsTransitioning(false);
    }, 400);
  };

  if (!currentNode && !isComplete) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-red-50 via-stone-50 to-red-50/30">
        <Card className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
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

  // Calculate relative container size based on aspect ratio
  const getContainerStyle = () => {
    // For wide screens (landscape with ratio > 1.8), limit width proportionally
    if (aspectRatio > 1.8) {
      // For ultrawide screens, use a percentage of viewport height for width
      // This ensures the modal doesn't get too wide on ultrawide screens
      return {
        maxWidth: `${Math.min(75, 60 * aspectRatio)}vh`,
        width: 'auto'
      };
    } else if (aspectRatio > 1.5) {
      // For regular wide screens
      return {
        maxWidth: `${Math.min(80, 65 * aspectRatio)}vh`,
        width: 'auto'
      };
    }
    
    // For more square or portrait screens, use a percentage of viewport width
    return {
      maxWidth: '85vw',
      width: 'auto'
    };
  };

  return (
    <div 
      className="h-full flex flex-col transition-all duration-1000 ease-in-out"
      style={isComplete ? {} : backgroundStyle}
    >
      {/* Header - Fixed height */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-red-100 sticky top-0 z-10 flex-shrink-0">
        <div className="px-3 py-2 sm:px-4 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 px-2 h-8">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-base font-semibold text-gray-900">
                  Beauty Consultation
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  Find your perfect services
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-600">
                {isComplete ? 'Complete!' : `Step ${completedNodes + 1}`}
              </div>
              <div className="w-20">
                <Progress value={progressPercentage} className="h-1.5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable with flex-grow */}
      <main className="flex-grow flex items-center justify-center overflow-auto">
        {/* Content container with relative sizing based on aspect ratio */}
        <div 
          className="h-full flex flex-col py-3 px-3 sm:py-4 sm:px-4"
          style={getContainerStyle()}
        >
          {/* Current Question or Results - Flex-grow to fill available space */}
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <ConsultationQuestion 
                node={currentNode}
                aspectRatio={aspectRatio}
                isTransitioning={isTransitioning}
                onSelect={handleOptionSelect}
                onGoBack={handleGoBack}
                showBackButton={completedNodes > 0}
              />
            ) : (
              <ConsultationResults 
                recommendations={recommendations}
                onViewServices={handleViewServices}
                onStartOver={handleStartOver}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default EnhancedConsultationFlow;

