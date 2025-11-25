// CONSULTATION BRIEF GENERATION ENGINE
// Core engine for generating consultation briefs with template processing and multi-format output

import { 
  ConsultationBriefData, 
  FormattedBrief, 
  BriefSection,
  BriefGenerationError,
  ExportFormat,
  ExportOptions,
  BriefExportResult,
  BriefAnalytics
} from '@/types/BriefTypes';
import { getBestTemplate, templateContentMap } from '@/data/briefTemplates';
import { UnifiedConsultationResult } from '@/data/unifiedConsultationFlow';

export class BriefGenerator {
  private static instance: BriefGenerator;
  private analytics: BriefAnalytics[] = [];

  private constructor() {}

  public static getInstance(): BriefGenerator {
    if (!BriefGenerator.instance) {
      BriefGenerator.instance = new BriefGenerator();
    }
    return BriefGenerator.instance;
  }

  /**
   * Generate a consultation brief from consultation data
   */
  public generateBrief(
    consultationResult: UnifiedConsultationResult,
    responses: Record<string, { optionId: string; weight: number; domains?: string[] }>,
    sessionId?: string
  ): FormattedBrief {
    try {
      // Transform consultation data into brief data format
      const briefData = this.transformConsultationData(consultationResult, responses, sessionId);
      
      // Get the best template for this consultation
      const template = getBestTemplate(briefData.customerMotivation, briefData.engagementLevel);
      
      // Generate sections from template
      const sections = this.generateSections(template, briefData);
      
      // Create formatted brief
      const formattedBrief: FormattedBrief = {
        title: this.generateTitle(briefData),
        subtitle: this.generateSubtitle(briefData),
        sections: sections,
        summary: this.generateSummary(briefData),
        recommendations: this.formatRecommendations(briefData),
        metadata: {
          generatedAt: new Date(),
          consultationId: sessionId,
          totalQuestions: Object.keys(responses).length,
          engagementScore: this.calculateEngagementScore(briefData)
        }
      };

      // Track analytics
      this.trackBriefGeneration(briefData);

      return formattedBrief;
    } catch (error) {
      throw this.createError('BRIEF_GENERATION_FAILED', 'Failed to generate consultation brief', error);
    }
  }

  /**
   * Export brief in specified format
   */
  public async exportBrief(
    brief: FormattedBrief, 
    options: ExportOptions
  ): Promise<BriefExportResult> {
    try {
      switch (options.format) {
        case 'whatsapp':
          return this.exportToWhatsApp(brief, options);
        case 'copy':
          return this.exportToCopy(brief, options);
        case 'download':
          return this.exportToDownload(brief, options);
        case 'email':
          return this.exportToEmail(brief, options);
        default:
          throw this.createError('INVALID_EXPORT_FORMAT', `Unsupported export format: ${options.format}`);
      }
    } catch (error) {
      return {
        success: false,
        format: options.format,
        error: error instanceof Error ? error.message : 'Export failed',
        metadata: {
          exportedAt: new Date()
        }
      };
    }
  }

  /**
   * Transform consultation result into brief data format
   */
  private transformConsultationData(
    result: UnifiedConsultationResult,
    responses: Record<string, { optionId: string; weight: number; domains?: string[] }>,
    sessionId?: string
  ): ConsultationBriefData {
    const preferences = this.extractPreferences(responses);
    const engagementLevel = this.determineEngagementLevel(result.totalWeight, Object.keys(responses).length);
    const primaryDomain = this.determinePrimaryDomain(result.recommendedServices);

    return {
      customerMotivation: result.customerMotivation,
      responses: responses,
      recommendedServices: result.recommendedServices,
      crossDomainPackages: result.crossDomainPackages,
      totalWeight: result.totalWeight,
      completedAt: new Date(),
      sessionId: sessionId,
      primaryDomain: primaryDomain,
      engagementLevel: engagementLevel,
      consultationPath: Object.keys(responses),
      preferences: preferences
    };
  }

  /**
   * Extract user preferences from responses
   */
  private extractPreferences(responses: Record<string, { optionId: string; weight: number; domains?: string[] }>) {
    const preferences: any = {};
    
    Object.entries(responses).forEach(([nodeId, response]) => {
      switch (nodeId) {
        case 'beauty-style':
          preferences.style = response.optionId;
          break;
        case 'color-preference':
          preferences.colorPreference = response.optionId;
          break;
        case 'event-type':
          preferences.occasion = response.optionId;
          break;
        case 'event-timeline':
          preferences.timeline = response.optionId;
          break;
        case 'service-preferences':
          preferences.serviceScope = response.optionId;
          break;
      }
    });

    return preferences;
  }

  /**
   * Determine engagement level based on weight and responses
   */
  private determineEngagementLevel(totalWeight: number, responseCount: number): 'low' | 'medium' | 'high' {
    const avgWeight = totalWeight / responseCount;
    
    if (avgWeight >= 8 && responseCount >= 4) return 'high';
    if (avgWeight >= 6 && responseCount >= 3) return 'medium';
    return 'low';
  }

  /**
   * Determine primary domain from recommendations
   */
  private determinePrimaryDomain(recommendedServices: Record<string, string[]>): string {
    let maxServices = 0;
    let primaryDomain = 'hair-salon';

    Object.entries(recommendedServices).forEach(([domain, services]) => {
      if (services.length > maxServices) {
        maxServices = services.length;
        primaryDomain = domain;
      }
    });

    return primaryDomain;
  }

  /**
   * Generate sections from template
   */
  private generateSections(template: any, briefData: ConsultationBriefData): BriefSection[] {
    const sections: BriefSection[] = [];

    template.sections.forEach((templateSection: any) => {
      // Check if section should be included
      if (templateSection.condition && !templateSection.condition(briefData)) {
        return;
      }

      // Process template content
      const content = this.processTemplate(templateSection.contentTemplate, briefData);

      sections.push({
        id: templateSection.id,
        title: templateSection.title,
        icon: templateSection.icon,
        content: content,
        priority: templateSection.priority
      });
    });

    // Sort by priority
    sections.sort((a, b) => a.priority - b.priority);

    return sections;
  }

  /**
   * Process template string with variable substitution
   */
  private processTemplate(template: string, briefData: ConsultationBriefData): string {
    let processed = template;

    // Replace motivation variables
    processed = processed.replace(/\{\{motivation\}\}/g, 
      templateContentMap.motivations[briefData.customerMotivation] || briefData.customerMotivation
    );

    processed = processed.replace(/\{\{motivationDescription\}\}/g,
      templateContentMap.motivationDescriptions[briefData.customerMotivation] || ''
    );

    // Replace preference variables
    if (briefData.preferences.occasion) {
      processed = processed.replace(/\{\{occasion\}\}/g, briefData.preferences.occasion);
    }

    if (briefData.preferences.timeline) {
      processed = processed.replace(/\{\{timeline\}\}/g, briefData.preferences.timeline);
      processed = processed.replace(/\{\{timelineAdvice\}\}/g,
        templateContentMap.timelineAdvice[briefData.preferences.timeline] || ''
      );
    }

    if (briefData.preferences.style) {
      processed = processed.replace(/\{\{style\}\}/g, briefData.preferences.style);
      processed = processed.replace(/\{\{styleDescription\}\}/g,
        templateContentMap.styleDescriptions[briefData.preferences.style] || ''
      );
    }

    if (briefData.preferences.colorPreference) {
      processed = processed.replace(/\{\{colorPreference\}\}/g, briefData.preferences.colorPreference);
      processed = processed.replace(/\{\{colorAdvice\}\}/g,
        templateContentMap.colorAdvice[briefData.preferences.colorPreference] || ''
      );
    }

    // Replace recommendation variables
    const primaryRecommendations = this.formatPrimaryRecommendations(briefData);
    processed = processed.replace(/\{\{primaryRecommendations\}\}/g, primaryRecommendations);

    const packageRecommendations = briefData.crossDomainPackages.join(', ');
    processed = processed.replace(/\{\{packageRecommendations\}\}/g, packageRecommendations);

    // Replace next steps advice
    if (briefData.preferences.timeline) {
      processed = processed.replace(/\{\{nextStepsAdvice\}\}/g,
        templateContentMap.nextStepsAdvice[briefData.preferences.timeline] || 'Let\'s get started!'
      );
    }

    return processed;
  }

  /**
   * Format primary recommendations for display
   */
  private formatPrimaryRecommendations(briefData: ConsultationBriefData): string {
    const allServices: string[] = [];
    
    Object.entries(briefData.recommendedServices).forEach(([domain, services]) => {
      if (services.length > 0) {
        allServices.push(...services.slice(0, 3)); // Take top 3 from each domain
      }
    });

    return allServices.slice(0, 5).join(', '); // Limit to 5 total recommendations
  }

  /**
   * Generate brief title
   */
  private generateTitle(briefData: ConsultationBriefData): string {
    const motivationTitles: Record<string, string> = {
      'wedding': 'Your Bridal Beauty Plan',
      'professional': 'Professional Enhancement Plan',
      'regular-maintenance': 'Beauty Maintenance Schedule',
      'skin-concerns': 'Skin Care Treatment Plan',
      'appearance-enhancement': 'Beauty Transformation Plan',
      'special-event': 'Special Event Beauty Plan',
      'date-night': 'Date Night Beauty Plan',
      'party-celebration': 'Celebration Beauty Plan'
    };

    return motivationTitles[briefData.customerMotivation] || 'Your Personalized Beauty Plan';
  }

  /**
   * Generate brief subtitle
   */
  private generateSubtitle(briefData: ConsultationBriefData): string {
    return `Curated specifically for you • ${briefData.engagementLevel.charAt(0).toUpperCase() + briefData.engagementLevel.slice(1)} engagement consultation`;
  }

  /**
   * Generate brief summary
   */
  private generateSummary(briefData: ConsultationBriefData): string {
    const totalServices = Object.values(briefData.recommendedServices).flat().length;
    const domains = Object.entries(briefData.recommendedServices)
      .filter(([_, services]) => services.length > 0)
      .map(([domain, _]) => domain.replace('-', ' '))
      .join(', ');

    return `Based on your consultation, we've recommended ${totalServices} services across ${domains}. ${briefData.crossDomainPackages.length > 0 ? `We've also identified ${briefData.crossDomainPackages.length} special packages that would be perfect for you.` : ''}`;
  }

  /**
   * Format recommendations for display
   */
  private formatRecommendations(briefData: ConsultationBriefData) {
    const allServices = Object.values(briefData.recommendedServices).flat();
    
    return {
      primary: allServices.slice(0, 3),
      secondary: allServices.slice(3, 6),
      packages: briefData.crossDomainPackages
    };
  }

  /**
   * Calculate engagement score
   */
  private calculateEngagementScore(briefData: ConsultationBriefData): number {
    const baseScore = briefData.totalWeight / briefData.consultationPath.length;
    const completionBonus = briefData.consultationPath.length >= 4 ? 1 : 0;
    const packageBonus = briefData.crossDomainPackages.length > 0 ? 0.5 : 0;
    
    return Math.min(10, baseScore + completionBonus + packageBonus);
  }

  /**
   * Export to WhatsApp
   */
  private exportToWhatsApp(brief: FormattedBrief, options: ExportOptions): BriefExportResult {
    const phoneNumber = options.recipientInfo?.phone || '+1234567890'; // Default or configured number
    
    let message = `✨ ${brief.title}\n\n`;
    
    // Add key sections
    brief.sections.slice(0, 3).forEach(section => {
      message += `${section.icon} ${section.title}\n${section.content}\n\n`;
    });
    
    // Add recommendations
    message += `💎 Recommendations:\n${brief.recommendations.primary.join(', ')}\n\n`;
    
    if (options.customMessage) {
      message += `${options.customMessage}\n\n`;
    }
    
    message += 'Ready to book your appointment? Let\'s chat!';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp (in real implementation, this would be handled by the UI)
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
    
    return {
      success: true,
      format: 'whatsapp',
      content: message,
      metadata: {
        characterCount: message.length,
        exportedAt: new Date()
      }
    };
  }

  /**
   * Export to copy (clipboard)
   */
  private exportToCopy(brief: FormattedBrief, options: ExportOptions): BriefExportResult {
    let content = `${brief.title}\n${brief.subtitle}\n\n`;
    
    brief.sections.forEach(section => {
      content += `${section.icon} ${section.title}\n${section.content}\n\n`;
    });
    
    content += `Summary: ${brief.summary}\n\n`;
    content += `Generated on ${brief.metadata.generatedAt.toLocaleDateString()}`;
    
    return {
      success: true,
      format: 'copy',
      content: content,
      metadata: {
        characterCount: content.length,
        exportedAt: new Date()
      }
    };
  }

  /**
   * Export to download
   */
  private exportToDownload(brief: FormattedBrief, options: ExportOptions): BriefExportResult {
    const content = this.exportToCopy(brief, options).content || '';
    
    // In a real implementation, this would generate a proper file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    return {
      success: true,
      format: 'download',
      content: content,
      downloadUrl: url,
      metadata: {
        fileSize: blob.size,
        exportedAt: new Date()
      }
    };
  }

  /**
   * Export to email
   */
  private exportToEmail(brief: FormattedBrief, options: ExportOptions): BriefExportResult {
    const content = this.exportToCopy(brief, options).content || '';
    const subject = encodeURIComponent(brief.title);
    const body = encodeURIComponent(content);
    
    const mailtoUrl = `mailto:${options.recipientInfo?.email || ''}?subject=${subject}&body=${body}`;
    
    if (typeof window !== 'undefined') {
      window.open(mailtoUrl);
    }
    
    return {
      success: true,
      format: 'email',
      content: content,
      metadata: {
        characterCount: content.length,
        exportedAt: new Date()
      }
    };
  }

  /**
   * Track brief generation analytics
   */
  private trackBriefGeneration(briefData: ConsultationBriefData): void {
    const analytics: BriefAnalytics = {
      consultationId: briefData.sessionId || 'unknown',
      generatedAt: new Date(),
      engagementMetrics: {
        questionsAnswered: briefData.consultationPath.length,
        totalWeight: briefData.totalWeight,
      },
      recommendationMetrics: {
        servicesRecommended: Object.values(briefData.recommendedServices).flat().length,
        packagesRecommended: briefData.crossDomainPackages.length,
        primaryDomain: briefData.primaryDomain || 'unknown'
      }
    };

    this.analytics.push(analytics);
  }

  /**
   * Create standardized error
   */
  private createError(code: string, message: string, details?: any): BriefGenerationError {
    return {
      code,
      message,
      details,
      recoverable: code !== 'BRIEF_GENERATION_FAILED',
      timestamp: new Date()
    };
  }

  /**
   * Health check for the brief generator
   */
  public runHealthCheck(): { status: 'healthy' | 'unhealthy'; details: any } {
    try {
      // Test template loading
      const testTemplate = getBestTemplate('special-event', 'medium');
      if (!testTemplate) {
        return { status: 'unhealthy', details: 'Template system not working' };
      }

      // Test content mapping
      const testContent = templateContentMap.motivations['special-event'];
      if (!testContent) {
        return { status: 'unhealthy', details: 'Content mapping not working' };
      }

      return { 
        status: 'healthy', 
        details: { 
          templatesLoaded: true,
          contentMappingWorking: true,
          analyticsCount: this.analytics.length
        } 
      };
    } catch (error) {
      return { 
        status: 'unhealthy', 
        details: { error: error instanceof Error ? error.message : 'Unknown error' } 
      };
    }
  }

  /**
   * Get diagnostic information
   */
  public getDiagnosticInfo(): any {
    return {
      analyticsCount: this.analytics.length,
      recentGenerations: this.analytics.slice(-5),
      healthCheck: this.runHealthCheck()
    };
  }
}

// Export the class
export { BriefGenerator };
