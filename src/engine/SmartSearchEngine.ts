/**
 * SmartSearchEngine - Handles parsing and analyzing user input
 * 
 * Provides emotional context detection and domain focus identification.
 */

export interface ParsedUserInput {
  originalText: string;
  normalizedText: string;
  keywords: string[];
  domainFocus?: string;
  mood?: string;
  emotionalContext?: {
    confidence: number;
    complexity: number;
    sentiment: number;
  };
}

export class SmartSearchEngine {
  /**
   * Parse user input to extract emotional context and domain focus
   */
  public static parseUserInput(input: string): ParsedUserInput {
    const normalizedText = input.toLowerCase().trim();
    const keywords = this.extractKeywords(normalizedText);
    
    return {
      originalText: input,
      normalizedText,
      keywords,
      domainFocus: this.detectDomainFocus(normalizedText, keywords),
      mood: this.detectMood(normalizedText, keywords),
      emotionalContext: this.analyzeEmotionalContext(normalizedText, keywords)
    };
  }
  
  /**
   * Extract keywords from normalized text
   */
  private static extractKeywords(text: string): string[] {
    // Simple keyword extraction - split by spaces and filter out common words
    const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'like'];
    return text
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word))
      .map(word => word.replace(/[^\w]/g, ''));
  }
  
  /**
   * Detect domain focus from text and keywords
   */
  private static detectDomainFocus(text: string, keywords: string[]): string | undefined {
    // Hair salon related terms
    const hairSalonTerms = ['hair', 'cut', 'style', 'color', 'dye', 'salon', 'haircut', 'hairstyle', 'haircolor'];
    
    // Makeup studio related terms
    const makeupStudioTerms = ['makeup', 'cosmetic', 'beauty', 'face', 'eyeshadow', 'lipstick', 'foundation', 'contour'];
    
    // Med spa related terms
    const medSpaTerms = ['spa', 'facial', 'treatment', 'skin', 'massage', 'therapy', 'rejuvenation', 'botox', 'filler'];
    
    // Count matches for each domain
    const hairSalonMatches = keywords.filter(keyword => hairSalonTerms.includes(keyword)).length;
    const makeupStudioMatches = keywords.filter(keyword => makeupStudioTerms.includes(keyword)).length;
    const medSpaMatches = keywords.filter(keyword => medSpaTerms.includes(keyword)).length;
    
    // Determine domain focus based on highest match count
    if (hairSalonMatches > makeupStudioMatches && hairSalonMatches > medSpaMatches) {
      return 'hair-salon';
    } else if (makeupStudioMatches > hairSalonMatches && makeupStudioMatches > medSpaMatches) {
      return 'makeup-studio';
    } else if (medSpaMatches > hairSalonMatches && medSpaMatches > makeupStudioMatches) {
      return 'med-spa';
    }
    
    // Check for explicit mentions
    if (text.includes('hair salon') || text.includes('haircut') || text.includes('hairstyle')) {
      return 'hair-salon';
    } else if (text.includes('makeup') || text.includes('cosmetic') || text.includes('beauty studio')) {
      return 'makeup-studio';
    } else if (text.includes('med spa') || text.includes('spa') || text.includes('facial')) {
      return 'med-spa';
    }
    
    // No clear domain focus detected
    return undefined;
  }
  
  /**
   * Detect mood from text and keywords
   */
  private static detectMood(text: string, keywords: string[]): string | undefined {
    // Mood categories
    const moodCategories: Record<string, string[]> = {
      'elegant': ['elegant', 'sophisticated', 'classy', 'refined', 'luxurious', 'upscale'],
      'natural': ['natural', 'organic', 'simple', 'minimal', 'clean', 'fresh'],
      'bold': ['bold', 'dramatic', 'striking', 'vibrant', 'intense', 'strong'],
      'relaxed': ['relaxed', 'casual', 'comfortable', 'laid-back', 'easy', 'chill'],
      'trendy': ['trendy', 'modern', 'contemporary', 'fashionable', 'stylish', 'chic']
    };
    
    // Count matches for each mood
    const moodMatches: Record<string, number> = {};
    
    Object.entries(moodCategories).forEach(([mood, terms]) => {
      moodMatches[mood] = keywords.filter(keyword => terms.includes(keyword)).length;
      
      // Check for explicit mentions
      terms.forEach(term => {
        if (text.includes(term)) {
          moodMatches[mood] += 1;
        }
      });
    });
    
    // Find mood with highest match count
    let highestCount = 0;
    let detectedMood: string | undefined = undefined;
    
    Object.entries(moodMatches).forEach(([mood, count]) => {
      if (count > highestCount) {
        highestCount = count;
        detectedMood = mood;
      }
    });
    
    // Only return mood if there's a clear signal
    return highestCount > 0 ? detectedMood : undefined;
  }
  
  /**
   * Analyze emotional context from text and keywords
   */
  private static analyzeEmotionalContext(text: string, keywords: string[]): {
    confidence: number;
    complexity: number;
    sentiment: number;
  } {
    // Confidence signals
    const lowConfidenceTerms = ['maybe', 'perhaps', 'not sure', 'uncertain', 'confused', 'help', 'advice', 'suggestion'];
    const highConfidenceTerms = ['definitely', 'exactly', 'precisely', 'certainly', 'absolutely', 'specific', 'know'];
    
    // Complexity signals
    const simpleTerms = ['simple', 'basic', 'easy', 'straightforward', 'quick'];
    const complexTerms = ['detailed', 'complex', 'comprehensive', 'thorough', 'elaborate', 'advanced'];
    
    // Sentiment signals
    const negativeTerms = ['bad', 'worst', 'hate', 'dislike', 'awful', 'terrible', 'poor', 'disappointed'];
    const positiveTerms = ['good', 'best', 'great', 'excellent', 'amazing', 'love', 'like', 'wonderful', 'fantastic'];
    
    // Calculate confidence score (0-1)
    const lowConfidenceCount = keywords.filter(keyword => lowConfidenceTerms.includes(keyword)).length;
    const highConfidenceCount = keywords.filter(keyword => highConfidenceTerms.includes(keyword)).length;
    
    // Check for question marks (indicates uncertainty)
    const questionMarkCount = (text.match(/\?/g) || []).length;
    
    const confidenceScore = Math.min(
      1,
      Math.max(
        0,
        0.5 + (highConfidenceCount * 0.1) - (lowConfidenceCount * 0.1) - (questionMarkCount * 0.1)
      )
    );
    
    // Calculate complexity score (0-1)
    const simpleCount = keywords.filter(keyword => simpleTerms.includes(keyword)).length;
    const complexCount = keywords.filter(keyword => complexTerms.includes(keyword)).length;
    
    // Text length also factors into complexity
    const textLengthFactor = Math.min(1, text.length / 100);
    
    const complexityScore = Math.min(
      1,
      Math.max(
        0,
        0.5 + (complexCount * 0.1) - (simpleCount * 0.1) + (textLengthFactor * 0.2)
      )
    );
    
    // Calculate sentiment score (-1 to 1)
    const negativeCount = keywords.filter(keyword => negativeTerms.includes(keyword)).length;
    const positiveCount = keywords.filter(keyword => positiveTerms.includes(keyword)).length;
    
    const sentimentScore = Math.min(
      1,
      Math.max(
        -1,
        (positiveCount * 0.2) - (negativeCount * 0.2)
      )
    );
    
    return {
      confidence: confidenceScore,
      complexity: complexityScore,
      sentiment: sentimentScore
    };
  }
}

