export interface ConsultationQuestion {
  id: string;
  question: string;
  description?: string;
  options: ConsultationOption[];
  required?: boolean;
}

export interface ConsultationOption {
  id: string;
  label: string;
  description?: string;
  weight?: number; // For recommendation scoring
}

export interface ConsultationFlow {
  id: string;
  title: string;
  description: string;
  questions: ConsultationQuestion[];
}

// Consultation questions organized by domain and journey
export const consultationQuestions: Record<string, Record<string, ConsultationFlow>> = {
  'hair-salon': {
    'special-occasion': {
      id: 'hair-salon-special-occasion',
      title: 'Special Occasion Consultation',
      description: 'Let us help you look perfect for your special event',
      questions: [
        {
          id: 'occasion-type',
          question: "What's the special occasion?",
          description: "This helps us recommend the right level of styling and longevity",
          options: [
            { id: 'wedding', label: 'Wedding (Bride/Bridal Party)', description: 'Long-lasting, photo-ready perfection', weight: 10 },
            { id: 'date-night', label: 'Date Night', description: 'Romantic and elegant', weight: 7 },
            { id: 'job-interview', label: 'Job Interview', description: 'Professional and polished', weight: 8 },
            { id: 'party-event', label: 'Party/Social Event', description: 'Fun and glamorous', weight: 6 },
            { id: 'graduation', label: 'Graduation', description: 'Sophisticated and memorable', weight: 8 },
            { id: 'other', label: 'Other Special Event', description: 'Tell us more during booking', weight: 5 }
          ],
          required: true
        },
        {
          id: 'timeline',
          question: "When is your event?",
          description: "Timeline affects our service recommendations and scheduling",
          options: [
            { id: 'this-week', label: 'This Week', description: 'Quick turnaround options', weight: 8 },
            { id: 'next-month', label: 'Within a Month', description: 'Perfect timing for most services', weight: 10 },
            { id: 'few-months', label: '2-3 Months Away', description: 'Time for transformation services', weight: 9 },
            { id: 'planning-ahead', label: '3+ Months Away', description: 'Full consultation and planning', weight: 7 }
          ],
          required: true
        },
        {
          id: 'current-routine',
          question: "What's your current hair routine?",
          description: "Understanding your maintenance level helps us recommend suitable styles",
          options: [
            { id: 'high-maintenance', label: 'Daily Styling', description: 'I style my hair every day', weight: 9 },
            { id: 'medium-maintenance', label: 'Weekly Styling', description: 'I style for special occasions', weight: 7 },
            { id: 'low-maintenance', label: 'Wash & Go', description: 'I prefer minimal styling', weight: 5 },
            { id: 'professional-monthly', label: 'Monthly Salon Visits', description: 'Regular professional maintenance', weight: 8 }
          ],
          required: false
        }
      ]
    },
    'transformation': {
      id: 'hair-salon-transformation',
      title: 'Hair Transformation Consultation',
      description: 'Ready for a dramatic new look? Let us guide you through the possibilities',
      questions: [
        {
          id: 'change-level',
          question: "What level of change are you looking for?",
          description: "This helps us recommend the right services and set expectations",
          options: [
            { id: 'subtle-refresh', label: 'Subtle Refresh', description: 'Small changes, big impact', weight: 6 },
            { id: 'noticeable-change', label: 'Noticeable Change', description: 'Clear difference, still recognizable', weight: 8 },
            { id: 'dramatic-transformation', label: 'Dramatic Transformation', description: 'Complete new look', weight: 10 },
            { id: 'complete-makeover', label: 'Complete Makeover', description: 'Total reinvention', weight: 10 }
          ],
          required: true
        },
        {
          id: 'maintenance-preference',
          question: "What's your ideal maintenance level?",
          description: "We'll recommend styles that fit your lifestyle",
          options: [
            { id: 'high-maintenance', label: 'High Maintenance', description: 'Daily styling, frequent touch-ups', weight: 9 },
            { id: 'medium-maintenance', label: 'Medium Maintenance', description: 'Weekly styling, monthly touch-ups', weight: 7 },
            { id: 'low-maintenance', label: 'Low Maintenance', description: 'Minimal daily effort', weight: 5 },
            { id: 'seasonal-updates', label: 'Seasonal Updates', description: 'Change with the seasons', weight: 6 }
          ],
          required: true
        },
        {
          id: 'inspiration',
          question: "What's inspiring your transformation?",
          description: "Understanding your motivation helps us create the perfect look",
          options: [
            { id: 'new-life-chapter', label: 'New Life Chapter', description: 'New job, relationship, or phase', weight: 8 },
            { id: 'confidence-boost', label: 'Confidence Boost', description: 'Want to feel amazing', weight: 7 },
            { id: 'bored-current-look', label: 'Bored with Current Look', description: 'Ready for something different', weight: 6 },
            { id: 'special-milestone', label: 'Special Milestone', description: 'Birthday, anniversary, achievement', weight: 8 },
            { id: 'trend-inspiration', label: 'Trend Inspiration', description: 'Saw something I love', weight: 5 }
          ],
          required: false
        }
      ]
    },
    'maintenance': {
      id: 'hair-salon-maintenance',
      title: 'Hair Maintenance Consultation',
      description: 'Keep your look fresh with the right maintenance routine',
      questions: [
        {
          id: 'current-services',
          question: "What services do you currently get?",
          description: "This helps us understand your routine and suggest improvements",
          options: [
            { id: 'cut-only', label: 'Just Cuts', description: 'Regular trims and shaping', weight: 6 },
            { id: 'cut-color', label: 'Cut & Color', description: 'Full service maintenance', weight: 9 },
            { id: 'color-only', label: 'Color Services', description: 'Root touch-ups, highlights', weight: 7 },
            { id: 'styling-only', label: 'Styling Services', description: 'Blowouts and special styling', weight: 5 },
            { id: 'full-service', label: 'Full Service Client', description: 'Cut, color, styling, treatments', weight: 10 }
          ],
          required: true
        },
        {
          id: 'frequency',
          question: "How often do you typically visit?",
          description: "We can optimize your schedule and services",
          options: [
            { id: 'monthly', label: 'Monthly', description: 'Regular maintenance schedule', weight: 9 },
            { id: 'every-6-weeks', label: 'Every 6 Weeks', description: 'Standard maintenance timing', weight: 8 },
            { id: 'quarterly', label: 'Every 3 Months', description: 'Seasonal updates', weight: 6 },
            { id: 'as-needed', label: 'As Needed', description: 'Irregular schedule', weight: 4 },
            { id: 'first-time', label: 'First Time Client', description: 'New to regular maintenance', weight: 7 }
          ],
          required: true
        },
        {
          id: 'concerns',
          question: "Any specific hair concerns?",
          description: "We can address these with targeted treatments",
          options: [
            { id: 'damage-repair', label: 'Damage Repair', description: 'Dry, brittle, or damaged hair', weight: 8 },
            { id: 'color-fading', label: 'Color Fading', description: 'Color doesn\'t last long enough', weight: 7 },
            { id: 'growth-goals', label: 'Growth Goals', description: 'Want to grow hair longer/healthier', weight: 6 },
            { id: 'styling-challenges', label: 'Styling Challenges', description: 'Hard to style at home', weight: 7 },
            { id: 'scalp-issues', label: 'Scalp Health', description: 'Dryness, oiliness, sensitivity', weight: 8 },
            { id: 'no-concerns', label: 'No Specific Concerns', description: 'Just maintaining current look', weight: 5 }
          ],
          required: false
        }
      ]
    },
    'fresh-start': {
      id: 'hair-salon-fresh-start',
      title: 'Fresh Start Consultation',
      description: 'New look, new you - let\'s create something amazing together',
      questions: [
        {
          id: 'starting-point',
          question: "What's your starting point?",
          description: "Understanding where you're coming from helps us plan your journey",
          options: [
            { id: 'grown-out-style', label: 'Grown Out Style', description: 'Haven\'t had a cut in a while', weight: 7 },
            { id: 'bad-previous-cut', label: 'Fixing Previous Cut', description: 'Need to correct a bad experience', weight: 9 },
            { id: 'natural-hair', label: 'Going Natural', description: 'Embracing natural texture/color', weight: 8 },
            { id: 'post-event', label: 'Post-Event Reset', description: 'After wedding, job change, etc.', weight: 6 },
            { id: 'seasonal-change', label: 'Seasonal Change', description: 'New season, new look', weight: 5 }
          ],
          required: true
        },
        {
          id: 'style-preference',
          question: "What style direction interests you?",
          description: "We'll tailor our recommendations to your preferences",
          options: [
            { id: 'classic-timeless', label: 'Classic & Timeless', description: 'Elegant, never goes out of style', weight: 7 },
            { id: 'modern-trendy', label: 'Modern & Trendy', description: 'Current styles and techniques', weight: 8 },
            { id: 'edgy-unique', label: 'Edgy & Unique', description: 'Bold, statement-making looks', weight: 6 },
            { id: 'natural-effortless', label: 'Natural & Effortless', description: 'Easy, lived-in styles', weight: 7 },
            { id: 'not-sure', label: 'Not Sure Yet', description: 'Open to professional guidance', weight: 9 }
          ],
          required: true
        }
      ]
    },
    'confidence-boost': {
      id: 'hair-salon-confidence-boost',
      title: 'Confidence Boost Consultation',
      description: 'Feel your absolute best with a look that makes you shine',
      questions: [
        {
          id: 'confidence-goal',
          question: "What would make you feel most confident?",
          description: "Your confidence is our priority - let's make it happen",
          options: [
            { id: 'polished-professional', label: 'Polished & Professional', description: 'Command respect and authority', weight: 8 },
            { id: 'glamorous-stunning', label: 'Glamorous & Stunning', description: 'Turn heads and feel amazing', weight: 9 },
            { id: 'natural-authentic', label: 'Natural & Authentic', description: 'Feel like the best version of yourself', weight: 7 },
            { id: 'youthful-fresh', label: 'Youthful & Fresh', description: 'Look and feel younger', weight: 8 },
            { id: 'unique-expressive', label: 'Unique & Expressive', description: 'Show your personality', weight: 6 }
          ],
          required: true
        },
        {
          id: 'lifestyle-fit',
          question: "What fits your lifestyle best?",
          description: "Confidence comes from a look that works with your life",
          options: [
            { id: 'busy-professional', label: 'Busy Professional', description: 'Quick morning routine essential', weight: 8 },
            { id: 'active-lifestyle', label: 'Active Lifestyle', description: 'Gym, sports, outdoor activities', weight: 7 },
            { id: 'social-lifestyle', label: 'Social Lifestyle', description: 'Frequent events and gatherings', weight: 9 },
            { id: 'creative-flexible', label: 'Creative & Flexible', description: 'Can adapt style as needed', weight: 6 },
            { id: 'home-focused', label: 'Home-Focused', description: 'Comfort and ease priority', weight: 5 }
          ],
          required: true
        }
      ]
    }
  },
  'makeup-studio': {
    'special-occasion': {
      id: 'makeup-studio-special-occasion',
      title: 'Special Event Makeup Consultation',
      description: 'Perfect makeup for your perfect day',
      questions: [
        {
          id: 'event-type',
          question: "What's your special event?",
          options: [
            { id: 'wedding-bride', label: 'Wedding (Bride)', description: 'Your perfect day deserves perfect makeup', weight: 10 },
            { id: 'wedding-party', label: 'Wedding (Bridal Party)', description: 'Complement the bride beautifully', weight: 9 },
            { id: 'prom-formal', label: 'Prom/Formal Dance', description: 'Glamorous and photo-ready', weight: 8 },
            { id: 'photoshoot', label: 'Photoshoot', description: 'Camera-ready perfection', weight: 9 },
            { id: 'anniversary', label: 'Anniversary/Date Night', description: 'Romantic and elegant', weight: 7 },
            { id: 'other-celebration', label: 'Other Celebration', description: 'Let\'s make it special', weight: 6 }
          ],
          required: true
        },
        {
          id: 'makeup-experience',
          question: "How comfortable are you with makeup?",
          options: [
            { id: 'makeup-novice', label: 'Beginner', description: 'Rarely wear makeup', weight: 8 },
            { id: 'basic-user', label: 'Basic User', description: 'Simple everyday makeup', weight: 7 },
            { id: 'intermediate', label: 'Intermediate', description: 'Comfortable with most techniques', weight: 6 },
            { id: 'advanced', label: 'Advanced', description: 'Love experimenting with makeup', weight: 5 }
          ],
          required: true
        }
      ]
    },
    'learning': {
      id: 'makeup-studio-learning',
      title: 'Makeup Learning Consultation',
      description: 'Master new techniques and build your skills',
      questions: [
        {
          id: 'skill-level',
          question: "What's your current makeup skill level?",
          options: [
            { id: 'complete-beginner', label: 'Complete Beginner', description: 'Just starting my makeup journey', weight: 10 },
            { id: 'some-basics', label: 'Know Some Basics', description: 'Can do simple everyday looks', weight: 8 },
            { id: 'intermediate-skills', label: 'Intermediate', description: 'Comfortable with most techniques', weight: 6 },
            { id: 'advanced-learner', label: 'Advanced Learner', description: 'Want to master specific techniques', weight: 4 }
          ],
          required: true
        },
        {
          id: 'learning-goals',
          question: "What would you like to learn?",
          options: [
            { id: 'everyday-routine', label: 'Everyday Makeup Routine', description: 'Quick, polished daily look', weight: 9 },
            { id: 'special-occasion', label: 'Special Occasion Looks', description: 'Glamorous evening makeup', weight: 8 },
            { id: 'specific-techniques', label: 'Specific Techniques', description: 'Contouring, eyeshadow, etc.', weight: 7 },
            { id: 'product-knowledge', label: 'Product Knowledge', description: 'What to buy and how to use it', weight: 8 }
          ],
          required: true
        }
      ]
    }
  },
  'med-spa': {
    'self-care': {
      id: 'med-spa-self-care',
      title: 'Self-Care Consultation',
      description: 'Pamper yourself with the perfect relaxation experience',
      questions: [
        {
          id: 'relaxation-goal',
          question: "What's your main relaxation goal?",
          options: [
            { id: 'stress-relief', label: 'Stress Relief', description: 'Unwind and decompress', weight: 9 },
            { id: 'me-time', label: 'Quality Me Time', description: 'Focus on yourself', weight: 8 },
            { id: 'skin-pampering', label: 'Skin Pampering', description: 'Luxurious skin treatments', weight: 8 },
            { id: 'full-relaxation', label: 'Complete Relaxation', description: 'Total mind-body reset', weight: 10 }
          ],
          required: true
        },
        {
          id: 'time-available',
          question: "How much time do you have?",
          options: [
            { id: 'quick-refresh', label: '1-2 Hours', description: 'Quick but effective treatments', weight: 6 },
            { id: 'half-day', label: 'Half Day (3-4 Hours)', description: 'Comprehensive relaxation', weight: 9 },
            { id: 'full-day', label: 'Full Day (5+ Hours)', description: 'Ultimate spa experience', weight: 10 },
            { id: 'flexible', label: 'Flexible', description: 'Open to recommendations', weight: 7 }
          ],
          required: true
        }
      ]
    }
  }
};

// Helper function to get consultation flow for a specific domain and journey
export const getConsultationFlow = (domain: string, journey: string): ConsultationFlow | null => {
  return consultationQuestions[domain]?.[journey] || null;
};

// Helper function to get all available consultation flows for a domain
export const getConsultationFlowsForDomain = (domain: string): ConsultationFlow[] => {
  const domainQuestions = consultationQuestions[domain];
  if (!domainQuestions) return [];
  
  return Object.values(domainQuestions);
};

