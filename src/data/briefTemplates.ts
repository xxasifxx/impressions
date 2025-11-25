// CONSULTATION BRIEF TEMPLATES
// Template definitions for different consultation types and motivations

import { BriefTemplate, BriefTemplateSection } from '@/types/BriefTypes';

// Template sections that can be reused across different brief types
const commonSections: Record<string, BriefTemplateSection> = {
  motivation: {
    id: 'motivation',
    title: 'Your Beauty Goals',
    icon: '🎯',
    contentTemplate: 'You came to us looking for {{motivation}}. {{motivationDescription}}',
    priority: 1
  },
  
  occasion: {
    id: 'occasion',
    title: 'The Occasion',
    icon: '✨',
    contentTemplate: 'For your {{occasion}}, we want to ensure you look and feel absolutely stunning.',
    condition: (data) => !!data.preferences.occasion,
    priority: 2
  },
  
  timeline: {
    id: 'timeline',
    title: 'Timeline',
    icon: '📅',
    contentTemplate: 'You mentioned you need this {{timeline}}. {{timelineAdvice}}',
    condition: (data) => !!data.preferences.timeline,
    priority: 3
  },
  
  style: {
    id: 'style',
    title: 'Your Style Preference',
    icon: '💫',
    contentTemplate: 'You prefer a {{style}} look. {{styleDescription}}',
    condition: (data) => !!data.preferences.style,
    priority: 4
  },
  
  colorPreference: {
    id: 'colorPreference',
    title: 'Color Palette',
    icon: '🎨',
    contentTemplate: 'You gravitate towards {{colorPreference}}. {{colorAdvice}}',
    condition: (data) => !!data.preferences.colorPreference,
    priority: 5
  },
  
  recommendations: {
    id: 'recommendations',
    title: 'Our Recommendations',
    icon: '💎',
    contentTemplate: 'Based on your consultation, we recommend: {{primaryRecommendations}}',
    priority: 6
  },
  
  packages: {
    id: 'packages',
    title: 'Suggested Packages',
    icon: '🌟',
    contentTemplate: 'We\'ve curated these special packages for you: {{packageRecommendations}}',
    condition: (data) => data.crossDomainPackages.length > 0,
    priority: 7
  },
  
  nextSteps: {
    id: 'nextSteps',
    title: 'Next Steps',
    icon: '🚀',
    contentTemplate: 'Ready to book? {{nextStepsAdvice}} We can\'t wait to help you achieve your beauty goals!',
    priority: 8
  }
};

// Specific brief templates for different consultation outcomes
export const briefTemplates: BriefTemplate[] = [
  {
    id: 'wedding-complete',
    name: 'Wedding Complete Package',
    description: 'Comprehensive brief for wedding consultations',
    applicableMotivations: ['wedding', 'special-event'],
    priority: 10,
    sections: [
      commonSections.motivation,
      {
        ...commonSections.occasion,
        contentTemplate: 'For your special wedding day, we want to create a look that\'s absolutely perfect and unforgettable.'
      },
      commonSections.timeline,
      commonSections.style,
      {
        id: 'bridal-specific',
        title: 'Bridal Beauty Plan',
        icon: '💍',
        contentTemplate: 'As a bride, you deserve the full royal treatment. We recommend starting with a consultation 2-3 months before your wedding to plan the perfect timeline.',
        priority: 5
      },
      commonSections.recommendations,
      commonSections.packages,
      {
        ...commonSections.nextSteps,
        contentTemplate: 'Let\'s schedule your bridal consultation! We recommend booking a trial run 1-2 weeks before your wedding date.'
      }
    ]
  },
  
  {
    id: 'professional-polish',
    name: 'Professional Enhancement',
    description: 'Brief for professional and career-focused consultations',
    applicableMotivations: ['professional', 'appearance-enhancement'],
    priority: 8,
    sections: [
      commonSections.motivation,
      {
        ...commonSections.occasion,
        contentTemplate: 'For your professional {{occasion}}, we\'ll create a polished, confident look that commands respect.'
      },
      commonSections.timeline,
      {
        id: 'professional-style',
        title: 'Professional Styling',
        icon: '💼',
        contentTemplate: 'Professional excellence requires attention to detail. We\'ll ensure your look is sophisticated and appropriate for your industry.',
        priority: 4
      },
      commonSections.recommendations,
      {
        ...commonSections.nextSteps,
        contentTemplate: 'Ready to elevate your professional image? Let\'s schedule your appointment and discuss a maintenance plan that fits your busy schedule.'
      }
    ]
  },
  
  {
    id: 'maintenance-regular',
    name: 'Regular Maintenance Plan',
    description: 'Brief for ongoing beauty maintenance',
    applicableMotivations: ['regular-maintenance'],
    priority: 7,
    sections: [
      commonSections.motivation,
      {
        id: 'maintenance-plan',
        title: 'Your Maintenance Schedule',
        icon: '📋',
        contentTemplate: 'Consistent beauty maintenance is key to always looking your best. We\'ll create a personalized schedule that fits your lifestyle.',
        priority: 3
      },
      commonSections.recommendations,
      {
        id: 'maintenance-packages',
        title: 'Maintenance Packages',
        icon: '💅',
        contentTemplate: 'Our maintenance packages offer great value and ensure you never miss an appointment: {{packageRecommendations}}',
        condition: (data) => data.crossDomainPackages.length > 0,
        priority: 6
      },
      {
        ...commonSections.nextSteps,
        contentTemplate: 'Let\'s set up your regular maintenance schedule! We can arrange convenient recurring appointments that work with your calendar.'
      }
    ]
  },
  
  {
    id: 'skin-focused',
    name: 'Skin Care Consultation',
    description: 'Brief focused on skin concerns and treatments',
    applicableMotivations: ['skin-concerns'],
    priority: 9,
    sections: [
      commonSections.motivation,
      {
        id: 'skin-analysis',
        title: 'Skin Assessment',
        icon: '🔍',
        contentTemplate: 'Your skin concerns are our priority. We\'ll provide targeted treatments to address your specific needs and help you achieve healthy, glowing skin.',
        priority: 3
      },
      {
        id: 'treatment-plan',
        title: 'Treatment Recommendations',
        icon: '✨',
        contentTemplate: 'Based on your consultation, we recommend these specialized treatments: {{primaryRecommendations}}',
        priority: 5
      },
      {
        id: 'skincare-routine',
        title: 'Home Care Routine',
        icon: '🏠',
        contentTemplate: 'We\'ll also provide guidance on the perfect home skincare routine to maintain and enhance your results between visits.',
        priority: 6
      },
      {
        ...commonSections.nextSteps,
        contentTemplate: 'Ready to start your skin transformation journey? Let\'s schedule your first treatment and create a personalized care plan.'
      }
    ]
  },
  
  {
    id: 'enhancement-transformation',
    name: 'Beauty Transformation',
    description: 'Brief for major appearance enhancements',
    applicableMotivations: ['appearance-enhancement'],
    priority: 8,
    sections: [
      commonSections.motivation,
      {
        id: 'transformation-vision',
        title: 'Your Transformation Vision',
        icon: '🦋',
        contentTemplate: 'We love helping clients transform their look! Your vision for enhancement will guide our recommendations.',
        priority: 3
      },
      commonSections.style,
      commonSections.colorPreference,
      commonSections.recommendations,
      {
        id: 'transformation-timeline',
        title: 'Transformation Timeline',
        icon: '⏰',
        contentTemplate: 'Major transformations work best with a planned approach. We\'ll create a timeline that achieves your goals safely and beautifully.',
        priority: 7
      },
      {
        ...commonSections.nextSteps,
        contentTemplate: 'Excited to start your transformation? Let\'s schedule a detailed consultation to map out your beauty journey!'
      }
    ]
  },
  
  {
    id: 'general-consultation',
    name: 'General Beauty Consultation',
    description: 'Default template for general consultations',
    applicableMotivations: ['special-event', 'date-night', 'party-celebration'],
    priority: 5,
    sections: [
      commonSections.motivation,
      commonSections.occasion,
      commonSections.timeline,
      commonSections.style,
      commonSections.recommendations,
      commonSections.packages,
      commonSections.nextSteps
    ]
  }
];

// Helper function to get the best template for consultation data
export const getBestTemplate = (motivation: string, engagementLevel: string): BriefTemplate => {
  // Find templates that match the motivation
  const matchingTemplates = briefTemplates.filter(template => 
    template.applicableMotivations.includes(motivation)
  );
  
  if (matchingTemplates.length === 0) {
    // Return general template as fallback
    return briefTemplates.find(t => t.id === 'general-consultation') || briefTemplates[0];
  }
  
  // Sort by priority (higher is better) and return the best match
  matchingTemplates.sort((a, b) => b.priority - a.priority);
  return matchingTemplates[0];
};

// Content mapping for template variables
export const templateContentMap: Record<string, Record<string, string>> = {
  motivations: {
    'special-event': 'a special event',
    'wedding': 'your wedding day',
    'professional': 'professional enhancement',
    'regular-maintenance': 'regular beauty maintenance',
    'appearance-enhancement': 'appearance enhancement',
    'skin-concerns': 'skin care solutions',
    'date-night': 'a romantic date night',
    'party-celebration': 'a party or celebration'
  },
  
  motivationDescriptions: {
    'special-event': 'We understand how important it is to look and feel your absolute best for life\'s special moments.',
    'wedding': 'Your wedding day is one of the most important days of your life, and we\'re honored to be part of it.',
    'professional': 'A polished, professional appearance can boost your confidence and career success.',
    'regular-maintenance': 'Consistent care is the secret to always looking effortlessly beautiful.',
    'appearance-enhancement': 'We love helping clients discover new aspects of their beauty and style.',
    'skin-concerns': 'Healthy, glowing skin is the foundation of all beauty, and we\'re here to help you achieve it.',
    'date-night': 'Romance deserves a special look that makes you feel confident and beautiful.',
    'party-celebration': 'Celebrations call for fun, festive looks that help you shine!'
  },
  
  timelineAdvice: {
    'this-week': 'We can accommodate quick turnaround appointments and have express services available.',
    'next-week': 'Perfect timing! This gives us the ideal window to create your perfect look.',
    'this-month': 'Excellent planning! We can schedule multiple sessions if needed for the best results.',
    'planning-ahead': 'We love forward-thinking clients! This gives us time to plan something truly special.'
  },
  
  styleDescriptions: {
    'natural-look': 'Natural beauty enhanced with subtle, sophisticated techniques.',
    'glamorous-look': 'Bold, dramatic styling that makes a stunning statement.',
    'natural, subtle look': 'Effortless beauty that enhances your natural features.',
    'bold, glamorous look': 'Show-stopping glamour that commands attention.'
  },
  
  colorAdvice: {
    'warm-tones': 'Warm colors will enhance your natural glow and create a radiant, inviting look.',
    'cool-tones': 'Cool tones will give you a sophisticated, elegant appearance.',
    'vibrant-colors': 'Bold colors will help you make a confident, memorable statement.'
  },
  
  nextStepsAdvice: {
    'this-week': 'Given your timeline, let\'s get you booked right away!',
    'next-week': 'Let\'s schedule your appointment for the perfect timing.',
    'this-month': 'We have great availability this month.',
    'planning-ahead': 'Let\'s get your consultation scheduled and start planning!'
  }
};
