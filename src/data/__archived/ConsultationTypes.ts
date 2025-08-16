/**
 * Types for the consultation system
 */

// Consultation response from user
export interface ConsultationResponse {
  questionId: string;
  responseId: string;
  responseText: string;
  domain?: string;
  domains?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
}

// Consultation question
export interface ConsultationQuestion {
  id: string;
  text: string;
  description?: string;
  responseType: 'single' | 'multiple' | 'text' | 'rating';
  options?: ConsultationOption[];
  domain?: string;
  domains?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
}

// Option for a consultation question
export interface ConsultationOption {
  id: string;
  text: string;
  description?: string;
  imageUrl?: string;
  domain?: string;
  domains?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  nextQuestionId?: string;
}

// Node in the consultation decision tree
export interface ConsultationNode {
  id: string;
  type: 'question' | 'result';
  question?: ConsultationQuestion;
  result?: ConsultationResult;
  children?: Record<string, ConsultationNode>;
  nextNodeId?: string;
}

// Result of a consultation
export interface ConsultationResult {
  id: string;
  title: string;
  description: string;
  primaryDomain?: string;
  domains?: string[];
  recommendedServices?: Record<string, string[]>;
  crossDomainPackages?: string[];
  metadata?: Record<string, any>;
}

// Consultation state
export interface ConsultationState {
  currentNodeId: string;
  responses: Record<string, ConsultationResponse>;
  completedNodes: string[];
  path: string[];
  result?: ConsultationResult;
}

