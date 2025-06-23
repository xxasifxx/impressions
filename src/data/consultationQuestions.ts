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
      description: 'Tell me about this special day you\'re preparing for - I want to make sure we create the perfect look for your moment',
      questions: [
        {
          id: 'occasion-type',
          question: "Tell me about this special day you're preparing for...",
          description: "Whether it's your wedding day, a milestone celebration, or that important event you've been looking forward to - let's make sure your hair is absolutely perfect.",
          options: [
            { id: 'wedding', label: 'It\'s my wedding day! 💍', description: 'The most important day deserves the most beautiful you', weight: 10 },
            { id: 'date-night', label: 'A romantic date night 💕', description: 'Looking elegant and feeling confident for love', weight: 7 },
            { id: 'job-interview', label: 'An important job interview 💼', description: 'Professional confidence that makes the right impression', weight: 8 },
            { id: 'party-event', label: 'A celebration or party 🎉', description: 'Fun, glamorous, and ready to shine', weight: 6 },
            { id: 'graduation', label: 'My graduation ceremony 🎓', description: 'Sophisticated and memorable for this achievement', weight: 8 },
            { id: 'other', label: 'Another special moment ✨', description: 'Every occasion deserves to feel special', weight: 5 }
          ],
          required: true
        },
        {
          id: 'timeline',
          question: "How much time do we have to create your perfect look?",
          description: "Whether we're working with a tight timeline or have time to plan something really special, I want to make sure we get everything just right.",
          options: [
            { id: 'this-week', label: 'This week (let\'s make it happen!) ⚡', description: 'Quick turnaround - we\'ve got this covered!', weight: 8 },
            { id: 'next-month', label: 'Next month (perfect planning time) 📅', description: 'Ideal timeline for trying new looks and perfecting details', weight: 10 },
            { id: 'few-months', label: '2-3 months away (exciting!) 🌟', description: 'Wonderful! Time for a complete transformation if you want', weight: 9 },
            { id: 'planning-ahead', label: '3+ months away (love a planner!) 📋', description: 'Perfect for exploring all possibilities and creating something amazing', weight: 7 }
          ],
          required: true
        },
        {
          id: 'current-routine',
          question: "Walk me through your typical morning - what does your hair routine look like?",
          description: "Understanding how you like to spend your mornings helps me recommend styles that fit beautifully into your life.",
          options: [
            { id: 'high-maintenance', label: 'I love spending time on my hair ✨', description: 'Daily styling is part of my self-care routine', weight: 9 },
            { id: 'medium-maintenance', label: 'I style it for special occasions 💄', description: 'I enjoy getting ready when it matters most', weight: 7 },
            { id: 'low-maintenance', label: 'Quick and gorgeous is my style 🌸', description: 'I prefer wash-and-go simplicity', weight: 5 },
            { id: 'professional-monthly', label: 'I visit the salon regularly 💅', description: 'I love professional maintenance and pampering', weight: 8 }
          ],
          required: false
        }
      ]
    },
    'transformation': {
      id: 'hair-salon-transformation',
      title: 'Hair Transformation Consultation',
      description: 'How bold are you feeling? Let\'s explore the exciting possibilities for your hair transformation journey',
      questions: [
        {
          id: 'change-level',
          question: "How bold are you feeling? Are we talking subtle refresh or complete reinvention?",
          description: "I love helping clients discover their perfect level of transformation - from gentle updates to dramatic new chapters.",
          options: [
            { id: 'subtle-refresh', label: 'Subtle refresh - enhance what I love 🌸', description: 'Small changes that make you feel like the best version of yourself', weight: 6 },
            { id: 'noticeable-change', label: 'Noticeable change - ready for something new! ✨', description: 'Clear difference that still feels authentically you', weight: 8 },
            { id: 'dramatic-transformation', label: 'Dramatic transformation - let\'s do this! 🔥', description: 'Complete new look that turns heads and boosts confidence', weight: 10 },
            { id: 'complete-makeover', label: 'Total reinvention - new me! 🦋', description: 'Complete transformation for a whole new chapter', weight: 10 }
          ],
          required: true
        },
        {
          id: 'maintenance-preference',
          question: "What does your ideal morning routine look like? Love spending time on your hair or prefer quick and gorgeous?",
          description: "I want to create a look that fits beautifully into your lifestyle - whether you love the ritual of styling or prefer effortless beauty.",
          options: [
            { id: 'high-maintenance', label: 'I love the styling ritual ✨', description: 'Daily styling and frequent touch-ups are part of my self-care', weight: 9 },
            { id: 'medium-maintenance', label: 'Balanced approach works for me 💫', description: 'Weekly styling sessions and monthly salon visits', weight: 7 },
            { id: 'low-maintenance', label: 'Quick and gorgeous is my style 🌿', description: 'Minimal daily effort, maximum impact', weight: 5 },
            { id: 'seasonal-updates', label: 'I love changing with the seasons 🍂', description: 'Fresh looks that evolve throughout the year', weight: 6 }
          ],
          required: true
        },
        {
          id: 'inspiration',
          question: "What's inspiring this transformation? Tell me about your story...",
          description: "Every transformation has a beautiful story behind it - I'd love to hear what's motivating this exciting change for you.",
          options: [
            { id: 'new-life-chapter', label: 'Starting a new chapter in life 📖', description: 'New job, relationship, or exciting life phase', weight: 8 },
            { id: 'confidence-boost', label: 'Ready to feel absolutely amazing 💪', description: 'Want to look in the mirror and love what I see', weight: 7 },
            { id: 'bored-current-look', label: 'Craving something completely different 🌈', description: 'Ready to break out of my hair routine', weight: 6 },
            { id: 'special-milestone', label: 'Celebrating a special milestone 🎉', description: 'Birthday, anniversary, achievement, or personal victory', weight: 8 },
            { id: 'trend-inspiration', label: 'Fell in love with a look I saw 😍', description: 'Saw something gorgeous and knew I had to try it', weight: 5 }
          ],
          required: false
        }
      ]
    },
    'maintenance': {
      id: 'hair-salon-maintenance',
      title: 'Hair Maintenance Consultation',
      description: 'Let\'s create the perfect maintenance routine to keep you looking and feeling amazing',
      questions: [
        {
          id: 'current-services',
          question: "Tell me about your current hair care routine - what services do you love getting?",
          description: "Understanding what you already enjoy helps me suggest the perfect additions and improvements to keep you looking fabulous.",
          options: [
            { id: 'cut-only', label: 'I\'m all about the perfect cut ✂️', description: 'Regular trims and shaping to keep my style fresh', weight: 6 },
            { id: 'cut-color', label: 'Cut and color - the full experience 💇‍♀️', description: 'Complete hair transformation and maintenance', weight: 9 },
            { id: 'color-only', label: 'Color is my passion 🎨', description: 'Root touch-ups, highlights, and color magic', weight: 7 },
            { id: 'styling-only', label: 'I love professional styling 💫', description: 'Blowouts and special occasion styling', weight: 5 },
            { id: 'full-service', label: 'Give me everything! 👑', description: 'Cut, color, styling, treatments - the complete pampering experience', weight: 10 }
          ],
          required: true
        },
        {
          id: 'frequency',
          question: "How do you like to take care of yourself? Regular pampering or special occasions?",
          description: "Everyone has their own rhythm for self-care - let me help you find the perfect schedule that keeps you feeling your best.",
          options: [
            { id: 'monthly', label: 'Monthly self-care ritual 🌙', description: 'Regular maintenance keeps me feeling confident', weight: 9 },
            { id: 'every-6-weeks', label: 'Every 6 weeks works perfectly 📅', description: 'The sweet spot for maintaining my look', weight: 8 },
            { id: 'quarterly', label: 'Seasonal refresh approach 🍃', description: 'I love changing my look with the seasons', weight: 6 },
            { id: 'as-needed', label: 'When the mood strikes me ✨', description: 'Spontaneous salon visits when I need a boost', weight: 4 },
            { id: 'first-time', label: 'New to regular salon visits 🌸', description: 'Ready to start a beautiful self-care routine', weight: 7 }
          ],
          required: true
        },
        {
          id: 'concerns',
          question: "What's been on your mind about your hair lately? Any challenges I can help with?",
          description: "I love solving hair puzzles and helping clients overcome any concerns - no challenge is too big or small!",
          options: [
            { id: 'damage-repair', label: 'My hair needs some TLC 💚', description: 'Dealing with dryness, brittleness, or damage', weight: 8 },
            { id: 'color-fading', label: 'My color fades too quickly 🌈', description: 'Want my beautiful color to last longer', weight: 7 },
            { id: 'growth-goals', label: 'Growing out my hair healthily 🌱', description: 'Want longer, stronger, healthier hair', weight: 6 },
            { id: 'styling-challenges', label: 'Styling at home is tricky 🤔', description: 'Need tips and techniques for gorgeous daily styling', weight: 7 },
            { id: 'scalp-issues', label: 'Scalp health concerns 🌿', description: 'Dealing with dryness, oiliness, or sensitivity', weight: 8 },
            { id: 'no-concerns', label: 'Just keeping my look fresh! ✨', description: 'Happy with my hair, just maintaining the gorgeousness', weight: 5 }
          ],
          required: false
        }
      ]
    },
    'fresh-start': {
      id: 'hair-salon-fresh-start',
      title: 'Fresh Start Consultation',
      description: 'Ready for a fresh beginning? Let\'s create something beautiful that represents this new chapter in your life',
      questions: [
        {
          id: 'starting-point',
          question: "Tell me about where you're starting from - what's your hair story right now?",
          description: "Every fresh start has a beginning - understanding your current situation helps me create the perfect plan for your transformation.",
          options: [
            { id: 'grown-out-style', label: 'My style has grown out completely 🌱', description: 'Haven\'t had a cut in a while and ready for change', weight: 7 },
            { id: 'bad-previous-cut', label: 'Fixing a previous cut that didn\'t work 😔', description: 'Need to correct a bad experience and restore confidence', weight: 9 },
            { id: 'natural-hair', label: 'Embracing my natural beauty 🌿', description: 'Going natural with texture, color, or both', weight: 8 },
            { id: 'post-event', label: 'Post-event reset time 🔄', description: 'After a wedding, job change, or major life event', weight: 6 },
            { id: 'seasonal-change', label: 'New season, new me! 🍂', description: 'Fresh look to match the changing seasons', weight: 5 }
          ],
          required: true
        },
        {
          id: 'style-preference',
          question: "What style direction speaks to your soul? What makes you feel most like yourself?",
          description: "I want to create something that feels authentically you - whether that's timeless elegance or bold creativity, let's find your perfect style.",
          options: [
            { id: 'classic-timeless', label: 'Classic elegance never goes out of style 👑', description: 'Sophisticated, refined, always appropriate', weight: 7 },
            { id: 'modern-trendy', label: 'Current and on-trend excites me ✨', description: 'Love staying current with the latest styles', weight: 8 },
            { id: 'edgy-unique', label: 'Bold and unique is my vibe 🔥', description: 'Statement-making looks that show my personality', weight: 6 },
            { id: 'natural-effortless', label: 'Effortless beauty is my goal 🌸', description: 'Easy, lived-in styles that look naturally gorgeous', weight: 7 },
            { id: 'not-sure', label: 'I trust your professional expertise 🤝', description: 'Open to guidance and excited to discover my perfect look', weight: 9 }
          ],
          required: true
        }
      ]
    },
    'confidence-boost': {
      id: 'hair-salon-confidence-boost',
      title: 'Confidence Boost Consultation',
      description: 'You deserve to feel absolutely amazing - let\'s create a look that makes you shine from the inside out',
      questions: [
        {
          id: 'confidence-goal',
          question: "When you look in the mirror, what would make you feel absolutely unstoppable?",
          description: "Your confidence is my mission - tell me what would make you feel like you can conquer the world, and let's make it happen.",
          options: [
            { id: 'polished-professional', label: 'Polished and commanding respect 💼', description: 'Professional confidence that opens doors', weight: 8 },
            { id: 'glamorous-stunning', label: 'Glamorous and head-turning 💫', description: 'Stunning beauty that makes you feel like a star', weight: 9 },
            { id: 'natural-authentic', label: 'Naturally radiant and authentic ✨', description: 'The most beautiful version of yourself', weight: 7 },
            { id: 'youthful-fresh', label: 'Youthful and vibrant 🌸', description: 'Fresh, energetic, and full of life', weight: 8 },
            { id: 'unique-expressive', label: 'Uniquely and boldly me 🎨', description: 'Expressing your personality with confidence', weight: 6 }
          ],
          required: true
        },
        {
          id: 'lifestyle-fit',
          question: "Tell me about your life - what does your typical day look like?",
          description: "True confidence comes from a look that works seamlessly with your lifestyle - let me create something that enhances your daily routine.",
          options: [
            { id: 'busy-professional', label: 'Busy professional life 🏃‍♀️', description: 'Quick morning routine that still looks polished', weight: 8 },
            { id: 'active-lifestyle', label: 'Active and on-the-go 🏃‍♀️', description: 'Gym, sports, outdoor adventures - need versatile style', weight: 7 },
            { id: 'social-lifestyle', label: 'Social butterfly life 🦋', description: 'Frequent events, gatherings, and photo opportunities', weight: 9 },
            { id: 'creative-flexible', label: 'Creative and flexible schedule 🎭', description: 'Can adapt my style as needed for different situations', weight: 6 },
            { id: 'home-focused', label: 'Home and family focused 🏠', description: 'Comfort and ease are my priorities', weight: 5 }
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
      description: 'Let\'s create a stunning look that makes you feel absolutely radiant for your special moment',
      questions: [
        {
          id: 'event-type',
          question: "Tell me about this special moment you're preparing for...",
          description: "Every face tells a story, and I want to enhance yours beautifully for this important day. What's the occasion that's bringing you to me?",
          options: [
            { id: 'wedding-bride', label: 'It\'s my wedding day! 👰', description: 'The most important day deserves breathtaking beauty', weight: 10 },
            { id: 'wedding-party', label: 'I\'m in a wedding party 💐', description: 'Looking gorgeous while celebrating love', weight: 9 },
            { id: 'prom-formal', label: 'Prom or formal dance 💃', description: 'Glamorous, photo-ready, and unforgettable', weight: 8 },
            { id: 'photoshoot', label: 'A photoshoot or session 📸', description: 'Camera-ready perfection that captures your beauty', weight: 9 },
            { id: 'anniversary', label: 'Anniversary or romantic date 💕', description: 'Romantic elegance for a special someone', weight: 7 },
            { id: 'other-celebration', label: 'Another celebration ✨', description: 'Every special moment deserves beautiful makeup', weight: 6 }
          ],
          required: true
        },
        {
          id: 'makeup-experience',
          question: "What's your relationship with makeup like? Are you a daily wearer or special occasion only?",
          description: "Understanding your comfort level helps me create a look that feels authentically you - whether you're a makeup minimalist or a beauty enthusiast.",
          options: [
            { id: 'makeup-novice', label: 'Makeup minimalist - keep it simple 🌸', description: 'I rarely wear makeup but want to look stunning', weight: 8 },
            { id: 'basic-user', label: 'Basic everyday makeup user 💄', description: 'I know the basics but want professional glamour', weight: 7 },
            { id: 'intermediate', label: 'Pretty comfortable with makeup 💫', description: 'I enjoy makeup and know most techniques', weight: 6 },
            { id: 'advanced', label: 'Makeup enthusiast - love experimenting! 🎨', description: 'I love trying new looks and techniques', weight: 5 }
          ],
          required: true
        }
      ]
    },
    'learning': {
      id: 'makeup-studio-learning',
      title: 'Makeup Learning Consultation',
      description: 'Let\'s unlock your makeup potential together - I love teaching and watching confidence bloom!',
      questions: [
        {
          id: 'skill-level',
          question: "Where are you on your makeup journey right now?",
          description: "Everyone starts somewhere, and I'm here to meet you exactly where you are - whether you're just beginning or ready to master advanced techniques.",
          options: [
            { id: 'complete-beginner', label: 'Just starting my makeup adventure! 🌱', description: 'Excited to learn the basics and build confidence', weight: 10 },
            { id: 'some-basics', label: 'I know some basics 💄', description: 'Can do simple everyday looks but want to expand', weight: 8 },
            { id: 'intermediate-skills', label: 'Pretty comfortable with makeup 💫', description: 'Know most techniques but want to refine my skills', weight: 6 },
            { id: 'advanced-learner', label: 'Ready to master advanced techniques! 🎨', description: 'Want to perfect specific skills and learn pro secrets', weight: 4 }
          ],
          required: true
        },
        {
          id: 'learning-goals',
          question: "What's exciting you most about learning makeup? What would make you feel most confident?",
          description: "I want to focus our time on what will make the biggest impact for you - whether that's mastering your daily routine or creating show-stopping looks.",
          options: [
            { id: 'everyday-routine', label: 'Perfect everyday routine ☀️', description: 'Quick, polished daily look that makes me feel put-together', weight: 9 },
            { id: 'special-occasion', label: 'Glamorous special occasion looks ✨', description: 'Evening makeup that makes me feel like a star', weight: 8 },
            { id: 'specific-techniques', label: 'Master specific techniques 🎯', description: 'Contouring, eyeshadow blending, winged liner - the skills I\'ve always wanted', weight: 7 },
            { id: 'product-knowledge', label: 'Product wisdom and shopping confidence 🛍️', description: 'What to buy, how to use it, and building my perfect kit', weight: 8 }
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
      description: 'You deserve this time for yourself - let\'s create the perfect wellness experience that nurtures your mind, body, and spirit',
      questions: [
        {
          id: 'relaxation-goal',
          question: "What does self-care look like for you right now? What would make you feel most renewed?",
          description: "Taking care of yourself isn't selfish - it's essential. Tell me what your soul is craving, and let's create the perfect treatment plan.",
          options: [
            { id: 'stress-relief', label: 'I need to release stress and tension 🧘‍♀️', description: 'Unwind, decompress, and let go of life\'s pressures', weight: 9 },
            { id: 'me-time', label: 'Quality time just for me 💆‍♀️', description: 'Peaceful moments to focus entirely on myself', weight: 8 },
            { id: 'skin-pampering', label: 'Luxurious skin pampering 🌟', description: 'Indulgent treatments that make my skin glow', weight: 8 },
            { id: 'full-relaxation', label: 'Complete mind-body reset 🌿', description: 'Total relaxation that restores my energy and peace', weight: 10 }
          ],
          required: true
        },
        {
          id: 'time-available',
          question: "How much time can you gift yourself today? Let's make every moment count.",
          description: "Whether you have a quick window or a whole day to dedicate to yourself, I'll create the perfect experience that fits your schedule and maximizes your relaxation.",
          options: [
            { id: 'quick-refresh', label: 'A refreshing 1-2 hours ⚡', description: 'Quick but deeply effective treatments that rejuvenate', weight: 6 },
            { id: 'half-day', label: 'A blissful half day (3-4 hours) 🌸', description: 'Comprehensive relaxation and renewal experience', weight: 9 },
            { id: 'full-day', label: 'The ultimate full day retreat (5+ hours) 👑', description: 'Complete spa journey for total transformation', weight: 10 },
            { id: 'flexible', label: 'I\'m open to your recommendations ✨', description: 'Trust your expertise to create the perfect experience', weight: 7 }
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
