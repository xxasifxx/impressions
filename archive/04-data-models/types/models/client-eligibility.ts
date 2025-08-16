/**
 * Client Eligibility Types for Service Filtering System
 * Generated from service data extraction on 2025-07-18
 */

export type ClientEligibilityTag = 
  | 'universal-suitable'
  | 'consultation-required' 
  | 'health-restrictions';

export type ServiceCategory = 
  | 'brow'
  | 'combo'
  | 'facial'
  | 'hair'
  | 'lash'
  | 'makeup'
  | 'thread'
  | 'wax';

export interface ServiceEligibility {
  file: string;
  name: string;
  category: ServiceCategory;
  additional_tags?: ClientEligibilityTag[];
}

export interface CategoryStats {
  total: number;
  'universal-suitable': number;
  'consultation-required': number;
  'health-restrictions': number;
}

export interface ClientEligibilityMapping {
  metadata: {
    generated_date: string;
    total_services: number;
    description: string;
    tags: Record<ClientEligibilityTag, string>;
  };
  statistics: {
    'universal-suitable': number;
    'consultation-required': number;
    'health-restrictions': number;
    services_with_multiple_tags: number;
  };
  services_by_eligibility: {
    'universal-suitable': ServiceEligibility[];
    'consultation-required': ServiceEligibility[];
    'health-restrictions': ServiceEligibility[];
  };
  services_by_category: Record<ServiceCategory, CategoryStats>;
}

/**
 * Utility functions for working with client eligibility data
 */
export class ClientEligibilityUtils {
  private static mapping: ClientEligibilityMapping;

  static async loadMapping(): Promise<ClientEligibilityMapping> {
    if (!this.mapping) {
      // In a real app, you'd import or fetch the JSON file
      const response = await fetch('/src/data/mappings/client-eligibility-mapping.json');
      this.mapping = await response.json();
    }
    return this.mapping;
  }

  /**
   * Get all services that match specific eligibility criteria
   */
  static async getServicesByEligibility(tag: ClientEligibilityTag): Promise<ServiceEligibility[]> {
    const mapping = await this.loadMapping();
    return mapping.services_by_eligibility[tag];
  }

  /**
   * Get all services in a specific category
   */
  static async getServicesByCategory(category: ServiceCategory): Promise<ServiceEligibility[]> {
    const mapping = await this.loadMapping();
    const allServices = [
      ...mapping.services_by_eligibility['universal-suitable'],
      ...mapping.services_by_eligibility['consultation-required'],
      ...mapping.services_by_eligibility['health-restrictions']
    ];
    return allServices.filter(service => service.category === category);
  }

  /**
   * Check if a service requires consultation
   */
  static async requiresConsultation(serviceFile: string): Promise<boolean> {
    const mapping = await this.loadMapping();
    const consultationServices = mapping.services_by_eligibility['consultation-required'];
    const healthRestrictedServices = mapping.services_by_eligibility['health-restrictions'];
    
    return consultationServices.some(s => s.file === serviceFile) ||
           healthRestrictedServices.some(s => s.file === serviceFile);
  }

  /**
   * Check if a service has health restrictions
   */
  static async hasHealthRestrictions(serviceFile: string): Promise<boolean> {
    const mapping = await this.loadMapping();
    const healthRestrictedServices = mapping.services_by_eligibility['health-restrictions'];
    return healthRestrictedServices.some(s => s.file === serviceFile);
  }

  /**
   * Get eligibility tags for a specific service
   */
  static async getServiceEligibilityTags(serviceFile: string): Promise<ClientEligibilityTag[]> {
    const mapping = await this.loadMapping();
    const tags: ClientEligibilityTag[] = [];

    if (mapping.services_by_eligibility['universal-suitable'].some(s => s.file === serviceFile)) {
      tags.push('universal-suitable');
    }
    if (mapping.services_by_eligibility['consultation-required'].some(s => s.file === serviceFile)) {
      tags.push('consultation-required');
    }
    if (mapping.services_by_eligibility['health-restrictions'].some(s => s.file === serviceFile)) {
      tags.push('health-restrictions');
    }

    return tags;
  }

  /**
   * Filter services based on client eligibility requirements
   */
  static async filterServicesForClient(
    clientCanBookDirectly: boolean = true,
    clientHasHealthRestrictions: boolean = false
  ): Promise<ServiceEligibility[]> {
    const mapping = await this.loadMapping();
    let availableServices: ServiceEligibility[] = [];

    // Always include universal services
    availableServices.push(...mapping.services_by_eligibility['universal-suitable']);

    // Include consultation-required services if client can book directly
    if (clientCanBookDirectly) {
      availableServices.push(...mapping.services_by_eligibility['consultation-required']);
    }

    // Exclude health-restricted services if client has health restrictions
    if (!clientHasHealthRestrictions) {
      availableServices.push(...mapping.services_by_eligibility['health-restrictions']);
    }

    return availableServices;
  }
}

