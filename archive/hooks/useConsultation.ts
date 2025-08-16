import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConsultationFlow, ConsultationQuestion, getConsultationFlow } from '@/data/consultationQuestions';
import { generateRecommendations, RecommendationResult } from '@/utils/recommendationEngine';

export interface ConsultationResponse {
  questionId: string;
  optionId: string;
  weight: number;
}

export interface ConsultationState {
  domain: string;
  journey: string;
  currentQuestionIndex: number;
  responses: ConsultationResponse[];
  isComplete: boolean;
  flow: ConsultationFlow | null;
  recommendations: RecommendationResult | null;
}

export const useConsultation = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL parameters or defaults
  const initializeState = useCallback((): ConsultationState => {
    const domain = searchParams.get('domain') || 'hair-salon';
    const journey = searchParams.get('journey') || '';
    const currentQuestionIndex = parseInt(searchParams.get('step') || '0');
    const flow = getConsultationFlow(domain, journey);
    
    // Parse responses from URL if available
    const responsesParam = searchParams.get('responses');
    let responses: ConsultationResponse[] = [];
    
    if (responsesParam) {
      try {
        responses = JSON.parse(decodeURIComponent(responsesParam));
      } catch (error) {
        console.warn('Failed to parse consultation responses from URL:', error);
        responses = [];
      }
    }
    
    return {
      domain,
      journey,
      currentQuestionIndex,
      responses,
      isComplete: false,
      flow,
      recommendations: null
    };
  }, [searchParams]);

  const [consultationState, setConsultationState] = useState<ConsultationState>(initializeState);

  // Update URL when state changes
  const updateURL = useCallback((state: ConsultationState) => {
    const params = new URLSearchParams();
    params.set('domain', state.domain);
    params.set('journey', state.journey);
    params.set('step', state.currentQuestionIndex.toString());
    
    if (state.responses.length > 0) {
      params.set('responses', encodeURIComponent(JSON.stringify(state.responses)));
    }
    
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  // Start a new consultation
  const startConsultation = useCallback((domain: string, journey: string) => {
    const flow = getConsultationFlow(domain, journey);
    if (!flow) {
      console.error(`No consultation flow found for ${domain}/${journey}`);
      return;
    }

    const newState: ConsultationState = {
      domain,
      journey,
      currentQuestionIndex: 0,
      responses: [],
      isComplete: false,
      flow,
      recommendations: null
    };

    setConsultationState(newState);
    updateURL(newState);
    navigate(`/consultation/${domain}/${journey}`);
  }, [navigate, updateURL]);

  // Answer a question
  const answerQuestion = useCallback((questionId: string, optionId: string, weight: number) => {
    setConsultationState(prevState => {
      // Remove any existing response for this question
      const filteredResponses = prevState.responses.filter(r => r.questionId !== questionId);
      
      // Add the new response
      const newResponse: ConsultationResponse = { questionId, optionId, weight };
      const newResponses = [...filteredResponses, newResponse];
      
      const newState = {
        ...prevState,
        responses: newResponses
      };
      
      updateURL(newState);
      return newState;
    });
  }, [updateURL]);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    setConsultationState(prevState => {
      if (!prevState.flow || prevState.currentQuestionIndex >= prevState.flow.questions.length - 1) {
        // Consultation is complete - generate recommendations
        const recommendations = generateRecommendations(
          prevState.domain,
          prevState.journey,
          prevState.responses
        );
        
        const newState = { 
          ...prevState, 
          isComplete: true,
          recommendations
        };
        
        navigate(`/consultation/${prevState.domain}/${prevState.journey}/results`);
        return newState;
      }

      const newState = {
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      };
      
      updateURL(newState);
      return newState;
    });
  }, [navigate, updateURL]);

  // Navigate to previous question
  const previousQuestion = useCallback(() => {
    setConsultationState(prevState => {
      if (prevState.currentQuestionIndex <= 0) return prevState;

      const newState = {
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex - 1
      };
      
      updateURL(newState);
      return newState;
    });
  }, [updateURL]);

  // Get current question
  const currentQuestion = useMemo((): ConsultationQuestion | null => {
    if (!consultationState.flow || consultationState.currentQuestionIndex >= consultationState.flow.questions.length) {
      return null;
    }
    return consultationState.flow.questions[consultationState.currentQuestionIndex];
  }, [consultationState.flow, consultationState.currentQuestionIndex]);

  // Get response for a specific question
  const getResponse = useCallback((questionId: string): ConsultationResponse | null => {
    return consultationState.responses.find(r => r.questionId === questionId) || null;
  }, [consultationState.responses]);

  // Check if current question is answered
  const isCurrentQuestionAnswered = useMemo((): boolean => {
    if (!currentQuestion) return false;
    return consultationState.responses.some(r => r.questionId === currentQuestion.id);
  }, [currentQuestion, consultationState.responses]);

  // Calculate progress percentage
  const progressPercentage = useMemo((): number => {
    if (!consultationState.flow) return 0;
    return Math.round((consultationState.currentQuestionIndex / consultationState.flow.questions.length) * 100);
  }, [consultationState.flow, consultationState.currentQuestionIndex]);

  // Check if we can proceed to next question
  const canProceed = useMemo((): boolean => {
    if (!currentQuestion) return false;
    if (currentQuestion.required && !isCurrentQuestionAnswered) return false;
    return true;
  }, [currentQuestion, isCurrentQuestionAnswered]);

  // Reset consultation
  const resetConsultation = useCallback(() => {
    const newState: ConsultationState = {
      domain: 'hair-salon',
      journey: '',
      currentQuestionIndex: 0,
      responses: [],
      isComplete: false,
      flow: null,
      recommendations: null
    };
    
    setConsultationState(newState);
    setSearchParams({});
  }, [setSearchParams]);

  return {
    // State
    consultationState,
    currentQuestion,
    progressPercentage,
    isCurrentQuestionAnswered,
    canProceed,
    
    // Actions
    startConsultation,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getResponse,
    resetConsultation
  };
};
