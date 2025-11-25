# Integration Specifications - WhatsApp & External Dependencies

**Created**: 2025-11-25  
**Status**: APPROVED - Ready for Implementation  
**Purpose**: Complete specifications for WhatsApp integration and external system dependencies

## Executive Summary

### Integration Strategy
The MVP uses a **minimal integration approach** to avoid backend complexity while maximizing business value. Primary integration is WhatsApp redirect using wa.me URLs, with configuration management for business settings.

### Key Integrations
1. **WhatsApp Business** - Customer communication channel
2. **Environment Configuration** - Business settings management
3. **Static Hosting** - Lovable platform deployment
4. **Future Integrations** - CRM, booking systems, analytics

## WhatsApp Integration Specification

### 1. Integration Method: wa.me Redirect

#### Technical Approach
```typescript
// WhatsApp URL structure
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

// Implementation
export const sendToWhatsApp = (
  message: string,
  phoneNumber: string,
  options: WhatsAppOptions = {}
): WhatsAppResult => {
  try {
    // Validate phone number format
    const validatedNumber = validatePhoneNumber(phoneNumber);
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Generate WhatsApp URL
    const url = `https://wa.me/${validatedNumber}?text=${encodedMessage}`;
    
    // Handle platform-specific opening
    if (isMobileDevice()) {
      window.location.href = url;
    } else {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        throw new Error('Popup blocked');
      }
    }
    
    return { success: true, url };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

#### Phone Number Format Requirements
```typescript
interface PhoneNumberValidation {
  // International format without + symbol
  format: string; // "1234567890" (US) or "441234567890" (UK)
  validation: RegExp; // /^\d{10,15}$/
  examples: {
    us: "1234567890";
    uk: "441234567890";
    international: "1234567890";
  };
}

const validatePhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Validate length (10-15 digits for international numbers)
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number length');
  }
  
  return cleaned;
};
```

### 2. Message Encoding Specification

#### URL Encoding Requirements
```typescript
const encodeWhatsAppMessage = (message: string): string => {
  // Handle special characters that break WhatsApp URLs
  const specialCharacters = {
    '\n': '%0A',    // Line breaks
    '&': '%26',     // Ampersand
    '#': '%23',     // Hash
    '+': '%2B',     // Plus sign
    '=': '%3D',     // Equals sign
    '?': '%3F',     // Question mark
    ' ': '%20'      // Spaces (though + also works)
  };
  
  // Use encodeURIComponent but handle WhatsApp-specific cases
  let encoded = encodeURIComponent(message);
  
  // Additional WhatsApp-specific encoding
  encoded = encoded.replace(/\*/g, '%2A'); // Asterisk for bold formatting
  encoded = encoded.replace(/_/g, '%5F');  // Underscore for italic formatting
  
  return encoded;
};
```

#### Message Length Limits
```typescript
interface WhatsAppLimits {
  maxMessageLength: 4096;     // WhatsApp message character limit
  recommendedLength: 500;     // Optimal for readability
  warningThreshold: 400;      // Show warning to user
  
  // URL length limits (varies by browser)
  maxUrlLength: 2048;         // Conservative limit for all browsers
  safeurlLength: 1500;        // Safe limit with encoding overhead
}

const validateMessageLength = (message: string): ValidationResult => {
  const encoded = encodeWhatsAppMessage(message);
  const urlLength = `https://wa.me/1234567890?text=${encoded}`.length;
  
  return {
    isValid: message.length <= WhatsAppLimits.maxMessageLength,
    isOptimal: message.length <= WhatsAppLimits.recommendedLength,
    urlFitsInBrowser: urlLength <= WhatsAppLimits.safeurlLength,
    warnings: generateLengthWarnings(message, encoded, urlLength)
  };
};
```

### 3. Platform-Specific Handling

#### Mobile vs Desktop Detection
```typescript
const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    'android', 'iphone', 'ipad', 'ipod', 'blackberry', 
    'windows phone', 'mobile', 'tablet'
  ];
  
  return mobileKeywords.some(keyword => userAgent.includes(keyword));
};

const getWhatsAppOpenStrategy = (): 'redirect' | 'popup' | 'app' => {
  if (isMobileDevice()) {
    // Mobile: Direct redirect to open WhatsApp app
    return 'redirect';
  } else {
    // Desktop: Open in new tab/window
    return 'popup';
  }
};
```

#### Error Handling for Different Scenarios
```typescript
interface WhatsAppError {
  type: 'popup_blocked' | 'whatsapp_not_installed' | 'invalid_number' | 'message_too_long';
  message: string;
  fallbackAction?: () => void;
}

const handleWhatsAppError = (error: WhatsAppError): void => {
  const errorHandlers = {
    popup_blocked: () => {
      // Show instructions to allow popups
      showPopupBlockedInstructions();
    },
    
    whatsapp_not_installed: () => {
      // Redirect to WhatsApp download or web version
      window.open('https://web.whatsapp.com/', '_blank');
    },
    
    invalid_number: () => {
      // Show error message and contact form fallback
      showContactFormFallback();
    },
    
    message_too_long: () => {
      // Offer to shorten message or use email fallback
      showMessageTooLongOptions();
    }
  };
  
  errorHandlers[error.type]();
};
```

## Configuration Management Integration

### 1. Environment Variable Specification

#### Required Environment Variables
```typescript
interface EnvironmentConfig {
  // WhatsApp Integration
  VITE_WHATSAPP_NUMBER: string;           // Business WhatsApp number
  VITE_WHATSAPP_FALLBACK_NUMBER?: string; // Backup number if primary fails
  
  // Business Information
  VITE_BUSINESS_NAME: string;             // "Impressions Beauty Services"
  VITE_BUSINESS_EMAIL?: string;           // Fallback contact method
  VITE_BUSINESS_ADDRESS?: string;         // For message context
  
  // Environment Settings
  VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
  VITE_DEBUG_MODE?: 'true' | 'false';     // Enable debug logging
  
  // Feature Flags
  VITE_ENABLE_ANALYTICS?: 'true' | 'false';
  VITE_ENABLE_FALLBACK_CONTACT?: 'true' | 'false';
}
```

#### Configuration Loading Logic
```typescript
// src/config/environmentConfig.ts
export const loadEnvironmentConfig = (): EnvironmentConfig => {
  const config = {
    VITE_WHATSAPP_NUMBER: process.env.VITE_WHATSAPP_NUMBER || '',
    VITE_BUSINESS_NAME: process.env.VITE_BUSINESS_NAME || 'Impressions Beauty Services',
    VITE_ENVIRONMENT: (process.env.VITE_ENVIRONMENT as any) || 'development',
    VITE_DEBUG_MODE: process.env.VITE_DEBUG_MODE === 'true',
    VITE_ENABLE_ANALYTICS: process.env.VITE_ENABLE_ANALYTICS === 'true',
    VITE_ENABLE_FALLBACK_CONTACT: process.env.VITE_ENABLE_FALLBACK_CONTACT === 'true'
  };
  
  // Validate required fields
  validateEnvironmentConfig(config);
  
  return config;
};

const validateEnvironmentConfig = (config: EnvironmentConfig): void => {
  const requiredFields = ['VITE_WHATSAPP_NUMBER', 'VITE_BUSINESS_NAME'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required environment variables: ${missingFields.join(', ')}`);
  }
  
  // Validate phone number format
  if (!validatePhoneNumber(config.VITE_WHATSAPP_NUMBER)) {
    throw new Error('Invalid WhatsApp number format');
  }
};
```

### 2. Development vs Production Configuration

#### Development Configuration
```typescript
// Development defaults for testing
export const developmentConfig: Partial<EnvironmentConfig> = {
  VITE_WHATSAPP_NUMBER: '1234567890',     // Test number
  VITE_BUSINESS_NAME: 'Impressions Beauty (Dev)',
  VITE_ENVIRONMENT: 'development',
  VITE_DEBUG_MODE: true,
  VITE_ENABLE_ANALYTICS: false,
  VITE_ENABLE_FALLBACK_CONTACT: true
};
```

#### Production Configuration
```typescript
// Production configuration validation
export const validateProductionConfig = (config: EnvironmentConfig): void => {
  const productionRequirements = {
    VITE_WHATSAPP_NUMBER: /^\d{10,15}$/,    // Valid phone number
    VITE_BUSINESS_NAME: /.+/,               // Non-empty business name
    VITE_ENVIRONMENT: /^production$/,       // Must be 'production'
    VITE_DEBUG_MODE: false                  // Debug disabled in production
  };
  
  Object.entries(productionRequirements).forEach(([key, requirement]) => {
    const value = config[key];
    if (typeof requirement === 'object' && !requirement.test(value)) {
      throw new Error(`Invalid production config for ${key}: ${value}`);
    }
    if (typeof requirement === 'boolean' && value !== requirement) {
      throw new Error(`Production config ${key} must be ${requirement}`);
    }
  });
};
```

## Static Hosting Integration (Lovable Platform)

### 1. Deployment Configuration

#### Build Configuration
```json
// package.json build scripts
{
  "scripts": {
    "build": "vite build",
    "build:staging": "VITE_ENVIRONMENT=staging vite build",
    "build:production": "VITE_ENVIRONMENT=production vite build",
    "preview": "vite preview"
  }
}
```

#### Vite Configuration for Static Hosting
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.VITE_ENVIRONMENT !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          consultation: ['./src/components/consultation/ConsultationFlow']
        }
      }
    }
  },
  base: './', // For static hosting compatibility
  define: {
    'process.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString())
  }
});
```

### 2. Asset Management

#### Image Optimization
```typescript
// src/utils/assetOptimization.ts
export const getOptimizedImageUrl = (
  baseUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  const { width = 800, height = 600, quality = 80, format = 'webp' } = options;
  
  // For Unsplash images (used in current implementation)
  if (baseUrl.includes('unsplash.com')) {
    return `${baseUrl}?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
  }
  
  // For other image sources, return original
  return baseUrl;
};
```

#### Static Asset Caching
```typescript
// Service worker for asset caching (future enhancement)
const CACHE_NAME = 'impressions-beauty-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/main.js'
];

// Cache static assets for offline functionality
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});
```

## Future Integration Specifications

### 1. CRM Integration (Future Phase)

#### CRM Data Structure
```typescript
interface CRMIntegration {
  // Customer data from consultation
  leadData: {
    source: 'website_consultation';
    domain: string;
    outcome: CustomerOutcome;
    budget: BudgetRange;
    timeline: Timeline;
    preferences: string;
    contactMethod: 'whatsapp';
    phoneNumber?: string; // If captured
    timestamp: Date;
  };
  
  // Integration endpoints
  endpoints: {
    createLead: '/api/crm/leads';
    updateLead: '/api/crm/leads/:id';
    getLeadStatus: '/api/crm/leads/:id/status';
  };
}
```

### 2. Booking System Integration (Future Phase)

#### Booking API Specification
```typescript
interface BookingIntegration {
  // Service availability
  checkAvailability: (
    serviceIds: string[],
    preferredDate: Date,
    duration: number
  ) => Promise<AvailabilitySlot[]>;
  
  // Booking creation
  createBooking: (
    consultationData: ConsultationData,
    selectedServices: string[],
    appointmentTime: Date
  ) => Promise<BookingConfirmation>;
  
  // Booking management
  updateBooking: (bookingId: string, changes: Partial<Booking>) => Promise<Booking>;
  cancelBooking: (bookingId: string, reason: string) => Promise<void>;
}
```

### 3. Analytics Integration (Future Phase)

#### Analytics Event Specification
```typescript
interface AnalyticsIntegration {
  // Consultation events
  trackConsultationStart: (domain: string) => void;
  trackConsultationStep: (step: number, outcome?: string) => void;
  trackConsultationComplete: (data: ConsultationData) => void;
  trackWhatsAppSent: (data: ConsultationData) => void;
  
  // Business events
  trackServiceInquiry: (services: string[], value: number) => void;
  trackBookingConversion: (consultationId: string, bookingValue: number) => void;
  
  // User experience events
  trackPageLoad: (page: string, loadTime: number) => void;
  trackUserInteraction: (element: string, action: string) => void;
}
```

## Integration Testing Specifications

### 1. WhatsApp Integration Tests

#### Unit Tests
```typescript
// src/utils/__tests__/whatsappIntegration.test.ts
describe('WhatsApp Integration', () => {
  test('generates correct WhatsApp URL', () => {
    const message = 'Test message with special chars: & # +';
    const phoneNumber = '1234567890';
    const result = generateWhatsAppUrl(message, phoneNumber);
    
    expect(result).toBe('https://wa.me/1234567890?text=Test%20message%20with%20special%20chars%3A%20%26%20%23%20%2B');
  });
  
  test('validates phone number format', () => {
    expect(validatePhoneNumber('123-456-7890')).toBe('1234567890');
    expect(validatePhoneNumber('+1 (234) 567-8900')).toBe('12345678900');
    expect(() => validatePhoneNumber('invalid')).toThrow('Invalid phone number');
  });
  
  test('handles message encoding correctly', () => {
    const message = 'Line 1\nLine 2\n*Bold* _Italic_';
    const encoded = encodeWhatsAppMessage(message);
    
    expect(encoded).toContain('%0A'); // Line breaks
    expect(encoded).toContain('%2A'); // Asterisk
    expect(encoded).toContain('%5F'); // Underscore
  });
});
```

#### Integration Tests
```typescript
// src/integration/__tests__/whatsappFlow.test.ts
describe('WhatsApp Flow Integration', () => {
  test('complete consultation to WhatsApp flow', async () => {
    const consultationData = {
      domain: 'hair-salon',
      outcome: 'special-event',
      budget: '$250-500',
      timeline: 'Next week',
      preferences: 'Elegant and sophisticated'
    };
    
    const message = generateWhatsAppMessage(consultationData);
    expect(message).toContain('Special event styling');
    expect(message).toContain('$250-500');
    
    const whatsappUrl = generateWhatsAppUrl(message, '1234567890');
    expect(whatsappUrl).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+/);
  });
});
```

### 2. Configuration Tests

#### Environment Configuration Tests
```typescript
// src/config/__tests__/environmentConfig.test.ts
describe('Environment Configuration', () => {
  test('loads development config with defaults', () => {
    process.env.VITE_ENVIRONMENT = 'development';
    const config = loadEnvironmentConfig();
    
    expect(config.VITE_WHATSAPP_NUMBER).toBeDefined();
    expect(config.VITE_DEBUG_MODE).toBe(true);
  });
  
  test('validates production config requirements', () => {
    const invalidConfig = {
      VITE_WHATSAPP_NUMBER: 'invalid',
      VITE_ENVIRONMENT: 'production'
    };
    
    expect(() => validateProductionConfig(invalidConfig)).toThrow();
  });
});
```

### 3. Cross-Platform Tests

#### Mobile/Desktop Compatibility
```typescript
// src/utils/__tests__/platformDetection.test.ts
describe('Platform Detection', () => {
  test('detects mobile devices correctly', () => {
    // Mock mobile user agent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      configurable: true
    });
    
    expect(isMobileDevice()).toBe(true);
    expect(getWhatsAppOpenStrategy()).toBe('redirect');
  });
  
  test('detects desktop correctly', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      configurable: true
    });
    
    expect(isMobileDevice()).toBe(false);
    expect(getWhatsAppOpenStrategy()).toBe('popup');
  });
});
```

## Security & Privacy Specifications

### 1. Data Privacy

#### Data Handling Policy
```typescript
interface PrivacyPolicy {
  dataCollection: {
    consultationData: 'temporary_only';    // Not stored permanently
    phoneNumbers: 'not_collected';         // WhatsApp handles this
    personalInfo: 'minimal_required';      // Only what's needed for consultation
  };
  
  dataRetention: {
    consultationSession: '24_hours';       // Clear after session
    analyticsData: 'aggregated_only';      // No personal identifiers
    errorLogs: '7_days';                   // For debugging only
  };
  
  dataSharing: {
    whatsapp: 'user_initiated_only';       // Only when user clicks send
    analytics: 'anonymous_only';           // No personal data
    thirdParty: 'none';                    // No third-party sharing
  };
}
```

#### Privacy Implementation
```typescript
// src/utils/privacyCompliance.ts
export const clearConsultationData = (): void => {
  // Clear all consultation data from memory and storage
  sessionStorage.removeItem('consultation_data');
  localStorage.removeItem('consultation_session');
  
  // Clear any cached form data
  document.querySelectorAll('input, select, textarea').forEach(element => {
    (element as HTMLInputElement).value = '';
  });
};

export const anonymizeAnalyticsData = (data: any): any => {
  // Remove any potentially identifying information
  const { phoneNumber, personalInfo, ...anonymized } = data;
  return {
    ...anonymized,
    sessionId: generateAnonymousId(),
    timestamp: Math.floor(Date.now() / 1000) // Unix timestamp only
  };
};
```

### 2. Security Measures

#### Input Validation
```typescript
// src/utils/inputValidation.ts
export const sanitizeUserInput = (input: string): string => {
  // Remove potentially dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/[<>]/g, '') // Remove HTML brackets
    .trim()
    .substring(0, 500); // Limit length
};

export const validateConsultationInput = (data: ConsultationData): ValidationResult => {
  const errors: string[] = [];
  
  // Validate each field
  if (!data.outcome || !isValidOutcome(data.outcome)) {
    errors.push('Invalid outcome selection');
  }
  
  if (!data.budget || !isValidBudget(data.budget)) {
    errors.push('Invalid budget selection');
  }
  
  // Sanitize text inputs
  data.preferences = sanitizeUserInput(data.preferences);
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: data
  };
};
```

This integration specification provides complete technical details for implementing all external integrations while maintaining security, privacy, and performance standards.

