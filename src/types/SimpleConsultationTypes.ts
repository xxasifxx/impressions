// Simple consultation types following dignitas pattern
export interface ConsultationBriefData {
  purpose?: string;
  budget?: string;
  timeline?: string;
  preferences?: string;
  requirements?: string[];
  contact?: string;
}

export interface ConsultationStep {
  id: number;
  title: string;
  question: string;
  type: 'select' | 'text' | 'multiselect';
  options?: string[];
  key: keyof ConsultationBriefData;
  required?: boolean;
}

