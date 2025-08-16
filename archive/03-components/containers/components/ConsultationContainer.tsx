import React, { useCallback, useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContainerStyling } from '@/hooks/useDynamicStyling';
import { useModalState } from '@/hooks/useModalState';
import {
  ConsultationNode,
  ConsultationOption,
  ConsultationResponse,
  ArtEvolutionState,
  ConsultationSessionContext
} from '@/data/models';

export interface ConsultationContainerProps {
  node: ConsultationNode;
  nodeType: 'entry' | 'bundling' | 'refinement' | 'exit';
  artEvolution: ArtEvolutionState;
  onNodeComplete: (response: ConsultationResponse) => void;
  sessionContext: ConsultationSessionContext;
  className?: string;
  showProgress?: boolean;
  allowMultiSelect?: boolean;
}

export const ConsultationContainer: React.FC<ConsultationContainerProps> = ({
  node,
  nodeType,
  artEvolution,
  onNodeComplete,
  sessionContext,
  className = '',
  showProgress = true,
  allowMultiSelect = false
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { navigationStack } = useModalState();
  const { className: dynamicClassName, inlineStyles, cssVariables } = useContainerStyling(
    artEvolution,
    'consultation'
  );

  // Handle option selection
  const handleOptionSelect = useCallback((optionId: string) => {
    if (allowMultiSelect) {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  }, [allowMultiSelect]);

  // Handle consultation completion
  const handleComplete = useCallback(async () => {
    if (selectedOptions.length === 0) return;

    setIsProcessing(true);

    try {
      // Create response(s) for selected options
      const responses = selectedOptions.map(optionId => {
        const option = node.options.find(opt => opt.id === optionId);
        if (!option) throw new Error(`Option ${optionId} not found`);

        return {
          nodeId: node.id,
          optionId,
          value: option.value,
          timestamp: Date.now(),
          metadata: {
            nodeType,
            optionText: option.text,
            multiSelect: allowMultiSelect
          }
        } as ConsultationResponse;
      });

      // Process each response
      for (const response of responses) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for UX
        onNodeComplete(response);
      }

    } catch (error) {
      console.error('Error completing consultation node:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedOptions, node, nodeType, allowMultiSelect, onNodeComplete]);

  // Get node type styling
  const getNodeTypeStyles = useCallback(() => {
    switch (nodeType) {
      case 'entry':
        return 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50';
      case 'bundling':
        return 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50';
      case 'refinement':
        return 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50';
      case 'exit':
        return 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50';
      default:
        return 'border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50';
    }
  }, [nodeType]);

  // Get node type icon and label
  const getNodeTypeInfo = useCallback(() => {
    switch (nodeType) {
      case 'entry':
        return { label: 'Getting Started', icon: '🎯', color: 'text-blue-600' };
      case 'bundling':
        return { label: 'Recommendations', icon: '💎', color: 'text-purple-600' };
      case 'refinement':
        return { label: 'Personalization', icon: '✨', color: 'text-green-600' };
      case 'exit':
        return { label: 'Final Selection', icon: '🎉', color: 'text-yellow-600' };
      default:
        return { label: 'Consultation', icon: '💬', color: 'text-gray-600' };
    }
  }, [nodeType]);

  const nodeInfo = getNodeTypeInfo();
  const canProceed = selectedOptions.length > 0;
  const progressPercentage = Math.min((navigationStack.history.length / 10) * 100, 100);

  return (
    <div
      className={`${dynamicClassName} ${getNodeTypeStyles()} ${className} p-6 rounded-2xl`}
      style={{ ...inlineStyles, ...cssVariables }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{nodeInfo.icon}</span>
          <div>
            <Badge variant="outline" className={nodeInfo.color}>
              {nodeInfo.label}
            </Badge>
            <h2 className="text-xl font-bold text-gray-900 mt-1">{node.title}</h2>
          </div>
        </div>
        
        {showProgress && (
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Progress</div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {node.description && (
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          {node.description}
        </p>
      )}

      {/* Question */}
      {node.question && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {node.question}
          </h3>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3 mb-8">
        {node.options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          
          return (
            <div
              key={option.id}
              className={`
                p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }
              `}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {allowMultiSelect ? (
                    isSelected ? (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )
                  ) : (
                    <div className={`
                      w-4 h-4 rounded-full border-2 transition-colors
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                      }
                    `}>
                      {isSelected && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                  )}
                  
                  <span className={`
                    font-medium transition-colors
                    ${isSelected ? 'text-blue-900' : 'text-gray-900'}
                  `}>
                    {option.text}
                  </span>
                </div>
                
                {!allowMultiSelect && (
                  <ChevronRight className={`
                    w-5 h-5 transition-colors
                    ${isSelected ? 'text-blue-500' : 'text-gray-400'}
                  `} />
                )}
              </div>
              
              {/* Option metadata */}
              {option.metadata?.category && (
                <div className="mt-2 ml-8">
                  <Badge variant="secondary" className="text-xs">
                    {option.metadata.category}
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {allowMultiSelect && selectedOptions.length > 0 && (
            <span>{selectedOptions.length} selected</span>
          )}
        </div>
        
        <div className="flex space-x-3">
          {navigationStack.canGoBack && (
            <Button 
              variant="outline" 
              onClick={() => sessionContext.navigateToNode(navigationStack.history[navigationStack.history.length - 2])}
              disabled={isProcessing}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          <Button 
            onClick={handleComplete}
            disabled={!canProceed || isProcessing}
            className="min-w-[120px]"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{nodeType === 'exit' ? 'Complete' : 'Continue'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Node metadata display (for debugging/development) */}
      {process.env.NODE_ENV === 'development' && node.metadata && (
        <div className="mt-6 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
          <strong>Debug Info:</strong> {JSON.stringify(node.metadata, null, 2)}
        </div>
      )}
    </div>
  );
};

export default ConsultationContainer;

