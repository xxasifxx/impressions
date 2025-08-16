import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { useConsultation } from '@/hooks/useConsultation';
import { ArrowLeft, ArrowRight, CheckCircle, Circle } from 'lucide-react';

const ConsultationFlow = () => {
  const { currentTheme } = useDomainTheme();
  const {
    consultationState,
    currentQuestion,
    progressPercentage,
    isCurrentQuestionAnswered,
    canProceed,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getResponse
  } = useConsultation();

  if (!consultationState.flow || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-stone-50 to-red-50/30 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Consultation Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the consultation you're looking for.
          </p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const currentResponse = getResponse(currentQuestion.id);
  const isLastQuestion = consultationState.currentQuestionIndex >= (consultationState.flow.questions.length - 1);

  const handleOptionSelect = (optionId: string, weight: number) => {
    answerQuestion(currentQuestion.id, optionId, weight);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Navigate to results
      nextQuestion();
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-stone-50 to-red-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-red-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/${consultationState.domain}`}>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {consultationState.flow.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {consultationState.flow.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Step {consultationState.currentQuestionIndex + 1} of {consultationState.flow.questions.length}
              </div>
              <div className="w-32">
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            {/* Question */}
            <div className="mb-8">
              <h2 
                className="text-3xl font-light mb-4 text-gray-900"
                style={{ fontFamily: currentTheme.fonts.heading }}
              >
                {currentQuestion.question}
              </h2>
              {currentQuestion.description && (
                <p className="text-lg text-gray-600">
                  {currentQuestion.description}
                </p>
              )}
              {currentQuestion.required && (
                <p className="text-sm text-red-600 mt-2">
                  * This question is required
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = currentResponse?.optionId === option.id;
                
                return (
                  <Button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id, option.weight || 5)}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full p-6 h-auto text-left justify-start ${
                      isSelected 
                        ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' 
                        : 'hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div className="mt-1">
                        {isSelected ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-lg mb-1">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className={`text-sm ${
                            isSelected ? 'text-white/90' : 'text-gray-600'
                          }`}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="ghost"
                onClick={previousQuestion}
                disabled={consultationState.currentQuestionIndex === 0}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {consultationState.flow.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= consultationState.currentQuestionIndex
                        ? 'bg-red-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isLastQuestion ? 'Get Recommendations' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ConsultationFlow;

