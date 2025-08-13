import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price as a currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Formats a duration in minutes to a human-readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Truncates a string to a specified length
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) {
    return str;
  }
  
  return str.slice(0, length) + '...';
}

/**
 * Determines domain focus from consultation responses
 */
export function determineDomainFocus(responses: Record<string, any>): string {
  // Count domain occurrences
  const domainCounts: Record<string, number> = {
    'hair-salon': 0,
    'makeup-studio': 0,
    'med-spa': 0
  };
  
  // Count domains in responses
  Object.values(responses).forEach(response => {
    if (response.domains) {
      response.domains.forEach((domain: string) => {
        if (domainCounts[domain] !== undefined) {
          domainCounts[domain]++;
        }
      });
    }
  });
  
  // Find domain with highest count
  let maxCount = 0;
  let primaryDomain = 'hair-salon'; // Default
  
  Object.entries(domainCounts).forEach(([domain, count]) => {
    if (count > maxCount) {
      maxCount = count;
      primaryDomain = domain;
    }
  });
  
  return primaryDomain;
}

