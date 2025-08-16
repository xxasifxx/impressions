/**
 * Progressive Disclosure Components
 * 
 * Export all progressive disclosure functionality for easy importing
 */

export { 
  ProgressiveDisclosureProvider, 
  useProgressiveDisclosure 
} from './ProgressiveDisclosureEngine';

export { DisclosureLayer } from './DisclosureLayer';

export type { 
  DisclosureLevel, 
  RevealStrategy, 
  RevealTrigger, 
  InformationLayer, 
  DisclosureContext 
} from './ProgressiveDisclosureEngine';

