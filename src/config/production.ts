// PRODUCTION CONFIGURATION
// Configuration settings for production deployment

export const PRODUCTION_CONFIG = {
  // Brief generation settings
  briefGeneration: {
    enabled: true,
    whatsappNumber: '+1234567890', // Configure with actual business number
    defaultExportFormat: 'whatsapp' as const,
    analytics: {
      enabled: true,
      trackExports: true,
      trackEngagement: true
    }
  },

  // Feature flags for production readiness
  features: {
    // Core consultation features
    enhancedConsultation: true,
    briefGeneration: true,
    
    // Disable non-essential features for production focus
    servicePages: false,
    productCatalog: false,
    blogSection: false,
    testimonials: false,
    aboutPage: false,
    
    // Keep essential navigation
    homeRedirect: true,
    consultationOnly: true
  },

  // UI/UX settings
  ui: {
    showNavigation: false, // Hide main navigation to focus on consultation
    showFooter: false,     // Hide footer for cleaner experience
    showBranding: true,    // Keep branding elements
    focusMode: true        // Enable consultation-focused mode
  },

  // Performance settings
  performance: {
    preloadImages: true,
    optimizeAnimations: true,
    enableCaching: true
  },

  // Error handling
  errorHandling: {
    showDetailedErrors: false, // Hide detailed errors in production
    fallbackToResults: true,   // Fallback to original results if brief fails
    retryAttempts: 2
  },

  // Contact information
  contact: {
    whatsapp: '+1234567890',
    email: 'hello@impressions.com',
    businessName: 'Impressions Beauty Studio'
  }
};

// Environment-specific overrides
export const getProductionConfig = () => {
  const config = { ...PRODUCTION_CONFIG };
  
  // Override with environment variables if available
  if (typeof window !== 'undefined') {
    // Client-side environment variables (if using Vite)
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    if (whatsappNumber) {
      config.briefGeneration.whatsappNumber = whatsappNumber;
      config.contact.whatsapp = whatsappNumber;
    }
  }
  
  return config;
};

// Helper function to check if feature is enabled
export const isFeatureEnabled = (feature: keyof typeof PRODUCTION_CONFIG.features): boolean => {
  return getProductionConfig().features[feature];
};

// Helper function to get contact info
export const getContactInfo = () => {
  return getProductionConfig().contact;
};
