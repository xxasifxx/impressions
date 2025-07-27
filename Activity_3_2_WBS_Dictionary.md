# Activity 3.2: Consultation Session Data Storage & State Management

## Activity Overview

**Activity ID**: 3.2  
**Activity Name**: Consultation Session Data Storage & State Management  
**Parent Epic**: IMP-DA-001 Beauty Consultation Data Architecture  
**Activity Type**: Data Architecture Implementation  
**Priority**: Critical  
**Estimated Effort**: 35 hours  
**Dependencies**: Activity 3.1 (Service Catalog Data Management)  

## Activity Description

This activity focuses on implementing a sophisticated consultation session management system that handles progressive revelation of user preferences, maintains session state across multiple consultation flows, and provides real-time session persistence with optimal performance. The system must support complex user journeys while maintaining data consistency and enabling seamless session recovery.

## Business Context

### Objective
Create a robust session management architecture that enables sophisticated beauty consultations through progressive user profiling, intelligent state management, and seamless multi-flow navigation while maintaining high performance and data integrity.

### Success Criteria
- **Session Persistence**: 99.9% session data integrity across all consultation flows
- **State Recovery**: Sub-500ms session restoration from any interruption point
- **Concurrent Sessions**: Support 1000+ simultaneous consultation sessions
- **Data Consistency**: Zero data loss during session state transitions

### Business Value
- **User Experience**: Enable seamless consultation experiences with instant session recovery
- **Conversion Optimization**: Reduce consultation abandonment by 40% through reliable state management
- **Personalization**: Enable sophisticated user profiling for improved recommendations
- **Analytics Foundation**: Provide comprehensive consultation flow analytics data

## Technical Scope

### Core Components

#### 1. Session State Management
- **Session Lifecycle**: Creation, progression, persistence, and termination workflows
- **State Transitions**: Managed transitions between consultation nodes and flows
- **Progressive Profiling**: Incremental user profile building through consultation responses
- **Session Recovery**: Automatic recovery from interruptions or system failures

#### 2. User Profile Evolution
- **Dynamic Profiling**: Real-time user preference learning from consultation responses
- **Preference Inference**: Intelligent inference of unstated preferences from behavior patterns
- **Profile Versioning**: Historical tracking of user preference evolution
- **Cross-Session Learning**: Profile enhancement across multiple consultation sessions

#### 3. Consultation Flow Navigation
- **Multi-Flow Support**: Seamless navigation between different consultation approaches
- **Navigation Stack**: Breadcrumb tracking and back/forward navigation support
- **Flow Switching**: Dynamic switching between consultation flows based on user responses
- **Modal Management**: State management for modal-based consultation interfaces

#### 4. Real-Time Synchronization
- **Live Updates**: Real-time session state synchronization across multiple devices
- **Conflict Resolution**: Handling concurrent session modifications
- **Event Streaming**: Real-time consultation progress events for analytics
- **Offline Support**: Session state caching for offline consultation continuation

## Data Architecture Specifications

### Database Schema Design

#### Consultation Sessions Table
```sql
CREATE TABLE consultation_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token VARCHAR(128) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    session_type VARCHAR(50) NOT NULL, -- 'unified', 'realistic', 'conversational'
    current_flow VARCHAR(50) NOT NULL,
    current_node_id VARCHAR(100) NOT NULL,
    session_status VARCHAR(20) DEFAULT 'active', -- 'active', 'paused', 'completed', 'abandoned'
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    total_duration_seconds INTEGER DEFAULT 0,
    progress_percentage DECIMAL(5,2) DEFAULT 0.0,
    consultation_context JSONB DEFAULT '{}', -- Dynamic consultation context
    user_agent TEXT,
    ip_address INET,
    referrer_url TEXT,
    utm_parameters JSONB,
    device_fingerprint VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version INTEGER DEFAULT 1
);

-- Indexes for performance
CREATE INDEX idx_consultation_sessions_token ON consultation_sessions(session_token);
CREATE INDEX idx_consultation_sessions_user ON consultation_sessions(user_id);
CREATE INDEX idx_consultation_sessions_status ON consultation_sessions(session_status);
CREATE INDEX idx_consultation_sessions_activity ON consultation_sessions(last_activity_at);
CREATE INDEX idx_consultation_sessions_flow ON consultation_sessions(current_flow, current_node_id);
CREATE INDEX idx_consultation_sessions_context ON consultation_sessions USING gin(consultation_context);
```

#### Session Responses Table
```sql
CREATE TABLE session_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES consultation_sessions(id) ON DELETE CASCADE,
    node_id VARCHAR(100) NOT NULL,
    option_id VARCHAR(100),
    response_value JSONB NOT NULL,
    text_input TEXT,
    response_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    response_duration_ms INTEGER, -- Time spent on this question
    confidence_score DECIMAL(3,2), -- User confidence in their response
    revision_count INTEGER DEFAULT 0, -- How many times user changed answer
    metadata JSONB DEFAULT '{}', -- Additional response metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sequence_order INTEGER NOT NULL -- Order within session
);

-- Indexes for efficient querying
CREATE INDEX idx_session_responses_session ON session_responses(session_id);
CREATE INDEX idx_session_responses_node ON session_responses(node_id);
CREATE INDEX idx_session_responses_timestamp ON session_responses(response_timestamp);
CREATE INDEX idx_session_responses_sequence ON session_responses(session_id, sequence_order);
CREATE INDEX idx_session_responses_value ON session_responses USING gin(response_value);
```

#### User Profiles Table
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    profile_version INTEGER DEFAULT 1,
    demographics JSONB DEFAULT '{}',
    preferences JSONB DEFAULT '{}',
    consultation_history JSONB DEFAULT '{}',
    behavioral_patterns JSONB DEFAULT '{}',
    inferred_attributes JSONB DEFAULT '{}',
    confidence_scores JSONB DEFAULT '{}', -- Confidence in each attribute
    last_consultation_id UUID REFERENCES consultation_sessions(id),
    profile_completeness DECIMAL(5,2) DEFAULT 0.0,
    learning_velocity DECIMAL(5,2) DEFAULT 1.0, -- How quickly profile evolves
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for profile queries
CREATE INDEX idx_user_profiles_user ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_completeness ON user_profiles(profile_completeness);
CREATE INDEX idx_user_profiles_demographics ON user_profiles USING gin(demographics);
CREATE INDEX idx_user_profiles_preferences ON user_profiles USING gin(preferences);
```

#### Session Navigation Stack Table
```sql
CREATE TABLE session_navigation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES consultation_sessions(id) ON DELETE CASCADE,
    navigation_step INTEGER NOT NULL,
    node_id VARCHAR(100) NOT NULL,
    flow_type VARCHAR(50) NOT NULL,
    entry_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    exit_timestamp TIMESTAMP WITH TIME ZONE,
    time_spent_seconds INTEGER,
    navigation_method VARCHAR(20), -- 'forward', 'back', 'jump', 'flow_switch'
    previous_node_id VARCHAR(100),
    metadata JSONB DEFAULT '{}',
    UNIQUE(session_id, navigation_step)
);

CREATE INDEX idx_session_navigation_session ON session_navigation(session_id);
CREATE INDEX idx_session_navigation_step ON session_navigation(session_id, navigation_step);
CREATE INDEX idx_session_navigation_node ON session_navigation(node_id);
```

#### Session Recommendations Table
```sql
CREATE TABLE session_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES consultation_sessions(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(50) NOT NULL, -- 'service', 'bundle', 'product'
    item_id VARCHAR(100) NOT NULL,
    item_type VARCHAR(20) NOT NULL, -- 'service', 'product'
    confidence_score DECIMAL(3,2) NOT NULL,
    reasoning_path JSONB NOT NULL, -- How recommendation was derived
    recommendation_context JSONB DEFAULT '{}',
    user_interaction VARCHAR(20), -- 'viewed', 'liked', 'disliked', 'selected', 'ignored'
    interaction_timestamp TIMESTAMP WITH TIME ZONE,
    bundle_context JSONB, -- If part of a bundle recommendation
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_session_recommendations_session ON session_recommendations(session_id);
CREATE INDEX idx_session_recommendations_type ON session_recommendations(recommendation_type);
CREATE INDEX idx_session_recommendations_confidence ON session_recommendations(confidence_score);
CREATE INDEX idx_session_recommendations_interaction ON session_recommendations(user_interaction);
```

### API Specifications

#### Session Management API Endpoints

##### POST /api/v1/consultations/sessions
```typescript
interface CreateSessionRequest {
  sessionType: 'unified' | 'realistic' | 'conversational';
  initialFlow?: string;
  userContext?: {
    userId?: string;
    deviceInfo?: DeviceInfo;
    referrerInfo?: ReferrerInfo;
    utmParameters?: Record<string, string>;
  };
  consultationContext?: {
    entryPoint?: string;
    initialIntent?: string;
    timeConstraints?: number;
    budgetHints?: { min?: number; max?: number };
  };
}

interface CreateSessionResponse {
  sessionId: string;
  sessionToken: string;
  initialNode: ConsultationNode;
  sessionContext: SessionContext;
  expiresAt: string;
  metadata: {
    sessionType: string;
    currentFlow: string;
    estimatedDuration: number;
    supportedFeatures: string[];
  };
}

interface SessionContext {
  sessionId: string;
  currentNodeId: string;
  currentFlow: string;
  progressPercentage: number;
  navigationStack: NavigationStackItem[];
  userProfile: UserProfileSnapshot;
  recommendations: RecommendationSummary[];
  canGoBack: boolean;
  canGoForward: boolean;
  availableFlows: string[];
}
```

##### PUT /api/v1/consultations/sessions/{sessionId}/responses
```typescript
interface SubmitResponseRequest {
  nodeId: string;
  optionId?: string;
  responseValue: any;
  textInput?: string;
  metadata?: {
    responseTime?: number;
    confidenceLevel?: number;
    revisionCount?: number;
    interactionEvents?: InteractionEvent[];
  };
  navigationIntent?: {
    nextAction: 'continue' | 'back' | 'jump' | 'switch_flow';
    targetNodeId?: string;
    targetFlow?: string;
  };
}

interface SubmitResponseResponse {
  success: boolean;
  nextNode?: ConsultationNode;
  updatedContext: SessionContext;
  recommendations?: RecommendationUpdate[];
  profileUpdates?: ProfileUpdateSummary;
  validationErrors?: ValidationError[];
  metadata: {
    processingTime: number;
    recommendationCount: number;
    profileConfidenceChange: number;
  };
}

interface RecommendationUpdate {
  type: 'added' | 'updated' | 'removed';
  recommendation: SessionRecommendation;
  reason: string;
  confidenceChange?: number;
}
```

##### GET /api/v1/consultations/sessions/{sessionId}
```typescript
interface GetSessionRequest {
  include?: string[]; // ['responses', 'recommendations', 'navigation', 'profile']
  responseLimit?: number;
  recommendationLimit?: number;
}

interface GetSessionResponse {
  session: ConsultationSessionDetail;
  currentNode: ConsultationNode;
  context: SessionContext;
  responses?: SessionResponse[];
  recommendations?: SessionRecommendation[];
  navigationHistory?: NavigationStackItem[];
  userProfile?: UserProfileSnapshot;
  analytics?: SessionAnalytics;
}

interface ConsultationSessionDetail {
  id: string;
  sessionToken: string;
  sessionType: string;
  currentFlow: string;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  startedAt: string;
  lastActivityAt: string;
  completedAt?: string;
  totalDuration: number;
  progressPercentage: number;
  version: number;
}
```

##### POST /api/v1/consultations/sessions/{sessionId}/navigate
```typescript
interface NavigateSessionRequest {
  action: 'back' | 'forward' | 'jump' | 'switch_flow' | 'restart';
  targetNodeId?: string;
  targetFlow?: string;
  preserveResponses?: boolean;
  navigationContext?: {
    reason?: string;
    userInitiated?: boolean;
    automaticTrigger?: string;
  };
}

interface NavigateSessionResponse {
  success: boolean;
  targetNode: ConsultationNode;
  updatedContext: SessionContext;
  navigationResult: {
    previousNodeId: string;
    currentNodeId: string;
    navigationMethod: string;
    responsesPreserved: boolean;
    flowChanged: boolean;
  };
  affectedRecommendations?: RecommendationUpdate[];
  profileImpact?: ProfileUpdateSummary;
}
```

### Real-Time Synchronization Architecture

#### WebSocket Event Specifications
```typescript
interface SessionEventMessage {
  type: 'session_update' | 'recommendation_update' | 'profile_update' | 'navigation_update';
  sessionId: string;
  timestamp: string;
  payload: SessionEventPayload;
  metadata: {
    source: 'user_action' | 'system_inference' | 'external_trigger';
    version: number;
    sequenceNumber: number;
  };
}

interface SessionEventPayload {
  sessionUpdate?: {
    currentNodeId?: string;
    progressPercentage?: number;
    status?: string;
    contextChanges?: Record<string, any>;
  };
  recommendationUpdate?: {
    added?: SessionRecommendation[];
    updated?: SessionRecommendation[];
    removed?: string[];
    reasoningUpdates?: Record<string, string>;
  };
  profileUpdate?: {
    attributeChanges?: Record<string, any>;
    confidenceChanges?: Record<string, number>;
    completenessChange?: number;
    inferenceUpdates?: Record<string, any>;
  };
  navigationUpdate?: {
    currentNode?: string;
    availableActions?: string[];
    stackDepth?: number;
    canGoBack?: boolean;
    canGoForward?: boolean;
  };
}
```

#### Session State Caching Strategy
```typescript
interface SessionCacheStrategy {
  layers: {
    l1_memory: {
      technology: 'Node.js Map';
      ttl: 300; // 5 minutes
      maxSessions: 1000;
      evictionPolicy: 'LRU';
      syncStrategy: 'write-through';
    };
    l2_redis: {
      technology: 'Redis Cluster';
      ttl: 3600; // 1 hour
      maxMemory: '2GB';
      evictionPolicy: 'allkeys-lru';
      syncStrategy: 'write-behind';
      batchSize: 100;
    };
    l3_database: {
      technology: 'PostgreSQL';
      persistenceStrategy: 'immediate';
      transactionIsolation: 'read_committed';
      connectionPooling: true;
    };
  };
  invalidation: {
    triggers: ['session_complete', 'session_abandon', 'profile_major_change'];
    propagation: 'immediate';
    conflictResolution: 'last_write_wins';
  };
}

// Cache key patterns
const SESSION_CACHE_KEYS = {
  SESSION_STATE: 'session:state:{sessionId}',
  SESSION_RESPONSES: 'session:responses:{sessionId}',
  SESSION_RECOMMENDATIONS: 'session:recommendations:{sessionId}',
  SESSION_NAVIGATION: 'session:navigation:{sessionId}',
  USER_PROFILE: 'profile:user:{userId}',
  SESSION_ANALYTICS: 'analytics:session:{sessionId}'
};
```

## Task Breakdown

### Task 3.2.1: Session State Database Implementation
**Effort**: 10 hours  
**Description**: Implement comprehensive session state database schema and management

**Deliverables**:
- Database migration scripts for all session tables
- Session state management stored procedures
- Data integrity constraints and triggers
- Performance optimization indexes

**Acceptance Criteria**:
- All session tables created with proper relationships
- Sub-500ms session state retrieval performance
- ACID compliance for all session operations
- Support for 10,000+ concurrent sessions

### Task 3.2.2: Session Management API Development
**Effort**: 15 hours  
**Description**: Develop comprehensive session management APIs with real-time capabilities

**Deliverables**:
- RESTful session management endpoints
- WebSocket integration for real-time updates
- Session authentication and security
- Comprehensive API documentation

**Acceptance Criteria**:
- All session CRUD operations implemented
- Real-time session synchronization working
- Session security and token management
- 99.9% API availability under load

### Task 3.2.3: User Profile Evolution System
**Effort**: 8 hours  
**Description**: Implement dynamic user profiling and preference learning

**Deliverables**:
- Profile evolution algorithms
- Preference inference engine
- Profile versioning and history
- Confidence scoring system

**Acceptance Criteria**:
- Real-time profile updates from consultation responses
- Intelligent preference inference with 80%+ accuracy
- Profile versioning with rollback capability
- Confidence scoring for all profile attributes

### Task 3.2.4: Session Recovery and Persistence
**Effort**: 2 hours  
**Description**: Implement robust session recovery and state persistence

**Deliverables**:
- Session recovery mechanisms
- State persistence optimization
- Offline session support
- Session cleanup procedures

**Acceptance Criteria**:
- 99.9% session recovery success rate
- Sub-100ms session state persistence
- Graceful handling of connection interruptions
- Automated cleanup of abandoned sessions

## Quality Assurance

### Testing Strategy
- **Unit Tests**: 95% code coverage for session management functions
- **Integration Tests**: End-to-end session flow testing
- **Performance Tests**: Load testing with 1000+ concurrent sessions
- **Recovery Tests**: Session interruption and recovery scenarios

### Monitoring & Alerting
- **Session Performance**: Alert if session operations exceed 500ms
- **Session Abandonment**: Alert if abandonment rate exceeds 30%
- **Data Consistency**: Alert on session state corruption
- **Memory Usage**: Alert on cache memory utilization above 80%

### Security Considerations
- **Session Token Security**: Cryptographically secure session tokens
- **Data Encryption**: Encrypt sensitive session data at rest
- **Access Control**: Session-based authorization for all operations
- **Audit Logging**: Complete audit trail for all session activities

## Risk Management

### Technical Risks
- **Session State Corruption**: Concurrent updates may corrupt session state
- **Memory Leaks**: Long-running sessions may cause memory issues
- **Cache Invalidation**: Stale cache data may serve incorrect session state

### Mitigation Strategies
- **State Management**: Use optimistic locking and transaction isolation
- **Memory Management**: Implement session cleanup and memory monitoring
- **Cache Strategy**: Use versioned cache keys with immediate invalidation

## Success Metrics

### Performance Metrics
- **Session Creation Time**: Sub-100ms session initialization
- **State Persistence Time**: Sub-50ms for session state updates
- **Recovery Time**: Sub-500ms for session recovery from interruption
- **Concurrent Session Capacity**: 1000+ simultaneous sessions

### Business Metrics
- **Session Completion Rate**: 70%+ sessions reach completion
- **Session Recovery Rate**: 95%+ successful recoveries from interruptions
- **Profile Accuracy**: 85%+ user satisfaction with inferred preferences
- **Real-Time Sync Success**: 99.9% successful real-time updates

---

**Activity Version**: 1.0  
**Last Updated**: 2025-01-27  
**Next Review**: 2025-02-10  
**Owner**: Data Architecture Team  
**Dependencies**: Activity 3.1 (Service Catalog Data Management)

