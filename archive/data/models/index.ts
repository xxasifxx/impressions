// Core data models for the Impressions Beauty Web consultation system
// Created by Agent A: Foundation Architect

// Product models
export type {
  UnifiedProduct,
  ProductVariant,
  InventoryStatus,
  MakeupCategory,
  PerfumeCategory,
  VitaminCategory
} from './UnifiedProduct';

// Consultation models
export type {
  ConsultationNode,
  ConsultationOption,
  ConsultationResponse,
  ConsultationSessionState,
  UserProfile,
  UserPreferences,
  RecommendedItem,
  ArtEvolutionState,
  ArtEvolutionTrigger,
  ConsultationSessionContext,
  ModalNavigationStack,
  NavigationDirection,
  ModalLifecycleState
} from './ConsultationTypes';

// Cart models
export type {
  UnifiedCartItem,
  CartBundle,
  BundleCondition,
  PriceBreakdown,
  BundleDiscount,
  CartActionHandlers,
  AddToCartOptions,
  UnifiedCartContextType,
  BundleCompatibility,
  BundleContext
} from './CartTypes';

// Re-export existing service types for consistency
export type { UnifiedService } from '@/data/unifiedServicesData';

