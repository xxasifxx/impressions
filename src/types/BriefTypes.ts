// CONSULTATION BRIEF GENERATION TYPES
// Comprehensive interfaces for consultation brief generation system

export interface ConsultationResponse {
  optionId: string;
  weight: number;
  domains?: string[];
  label?: string;
  emoji?: string;
  description?: string;
}

export interface ConsultationBriefData {
  // Core consultation information
  customerMotivation: string;
  responses: Record<string, ConsultationResponse>;
  
  // Service recommendations
  recommendedServices: {
    'hair-salon': string[];
    'makeup-studio': string[];
    'med-spa': string[];
  };
  crossDomainPackages: string[];
  
  // Consultation metadata
  totalWeight: number;
  completedAt: Date;
  sessionId?: string;
  
  // Derived insights
  primaryDomain?: string;
  engagementLevel: 'low' | 'medium' | 'high';
  consultationPath: string[];
  
  // User preferences extracted from responses
  preferences: {
    style?: string;
    timeline?: string;
    occasion?: string;
    colorPreference?: string;
    serviceScope?: string;
  };
}

export interface BriefSection {
  id: string;
  title: string;
  icon: string;
  content: string;
  priority: number;
}

export interface FormattedBrief {
  title: string;
  subtitle: string;
  sections: BriefSection[];
  summary: string;
  recommendations: {
    primary: string[];
    secondary: string[];
    packages: string[];
  };
  metadata: {
    generatedAt: Date;
    consultationId?: string;
    totalQuestions: number;
    engagementScore: number;
  };
}

export type ExportFormat = 'whatsapp' | 'copy' | 'download' | 'email';

export interface ExportOptions {
  format: ExportFormat;
  includeMetadata?: boolean;
  includeRecommendations?: boolean;
  customMessage?: string;
  recipientInfo?: {
    phone?: string;
    email?: string;
    name?: string;
  };
}

export interface BriefExportResult {
  success: boolean;
  format: ExportFormat;
  content?: string;
  downloadUrl?: string;
  error?: string;
  metadata?: {
    characterCount?: number;
    fileSize?: number;
    exportedAt: Date;
  };
}

// Template system interfaces
export interface BriefTemplate {
  id: string;
  name: string;
  description: string;
  sections: BriefTemplateSection[];
  applicableMotivations: string[];
  priority: number;
}

export interface BriefTemplateSection {
  id: string;
  title: string;
  icon: string;
  contentTemplate: string; // Template string with placeholders
  condition?: (data: ConsultationBriefData) => boolean;
  priority: number;
}

// Configuration and settings
export interface BriefGeneratorConfig {
  templates: BriefTemplate[];
  exportSettings: {
    whatsapp: {
      phoneNumber: string;
      messagePrefix: string;
    };
    download: {
      format: 'pdf' | 'txt' | 'json';
      filename: string;
    };
  };
  validation: {
    minResponses: number;
    requiredFields: string[];
  };
}

// Error handling
export interface BriefGenerationError {
  code: string;
  message: string;
  details?: any;
  recoverable: boolean;
  timestamp: Date;
}

// Analytics and tracking
export interface BriefAnalytics {
  consultationId: string;
  generatedAt: Date;
  exportFormat?: ExportFormat;
  engagementMetrics: {
    questionsAnswered: number;
    totalWeight: number;
    completionTime?: number;
  };
  recommendationMetrics: {
    servicesRecommended: number;
    packagesRecommended: number;
    primaryDomain: string;
  };
}
