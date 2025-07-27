# Activity 3.3: Tag Intersection Query Engine & Performance Optimization

## Activity Overview

**Activity ID**: 3.3  
**Activity Name**: Tag Intersection Query Engine & Performance Optimization  
**Parent Epic**: IMP-DA-001 Beauty Consultation Data Architecture  
**Activity Type**: Data Architecture Implementation  
**Priority**: Critical  
**Estimated Effort**: 30 hours  
**Dependencies**: Activity 3.1 (Service Catalog Data Management), Activity 3.2 (Session Management)  

## Activity Description

This activity focuses on implementing a high-performance tag intersection query engine that enables sophisticated service matching through complex metadata tag combinations. The system must handle real-time queries across 12+ tag categories with sub-200ms response times while supporting advanced filtering, weighting, and relevance scoring algorithms.

## Business Context

### Objective
Create an optimized query engine that enables intelligent service discovery through sophisticated tag intersection algorithms, supporting complex consultation logic while maintaining exceptional performance under high concurrent load.

### Success Criteria
- **Query Performance**: Sub-200ms response times for complex tag intersection queries
- **Accuracy**: 95%+ relevance accuracy in service matching results
- **Scalability**: Support 10,000+ concurrent tag queries without degradation
- **Flexibility**: Support dynamic tag weighting and custom scoring algorithms

### Business Value
- **Recommendation Quality**: Enable precise service matching through advanced tag logic
- **User Experience**: Provide instant search results for complex consultation queries
- **Business Intelligence**: Enable sophisticated analytics on service relationships
- **Competitive Advantage**: Deliver superior recommendation accuracy over competitors

## Technical Scope

### Core Components

#### 1. Tag Intersection Engine
- **Multi-Tag Queries**: Complex AND/OR/NOT operations across tag categories
- **Weighted Scoring**: Dynamic tag importance weighting for relevance scoring
- **Fuzzy Matching**: Approximate tag matching for improved recall
- **Hierarchical Tags**: Support for parent-child tag relationships

#### 2. Query Optimization Framework
- **Query Planning**: Intelligent query execution plan optimization
- **Index Utilization**: Optimal use of database indexes for tag queries
- **Result Caching**: Multi-tier caching for frequently accessed tag combinations
- **Batch Processing**: Efficient bulk tag intersection operations

#### 3. Relevance Scoring System
- **Multi-Factor Scoring**: Combine tag matches, confidence scores, and business rules
- **Dynamic Weighting**: Real-time adjustment of scoring factors
- **Personalization**: User-specific relevance adjustments
- **A/B Testing**: Support for scoring algorithm experimentation

#### 4. Performance Monitoring
- **Query Analytics**: Real-time query performance monitoring
- **Bottleneck Detection**: Automatic identification of performance issues
- **Capacity Planning**: Predictive scaling based on query patterns
- **Performance Regression**: Automated detection of performance degradation

## Data Architecture Specifications

### Query Engine Database Schema

#### Tag Intersection Cache Table
```sql
CREATE TABLE tag_intersection_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_hash VARCHAR(64) UNIQUE NOT NULL, -- SHA-256 of normalized query
    required_tags TEXT[] NOT NULL,
    optional_tags TEXT[],
    excluded_tags TEXT[],
    tag_weights JSONB,
    filter_criteria JSONB,
    result_service_ids UUID[] NOT NULL,
    result_scores DECIMAL(5,3)[] NOT NULL,
    result_count INTEGER NOT NULL,
    query_execution_time_ms INTEGER NOT NULL,
    cache_created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cache_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    access_count INTEGER DEFAULT 1,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cache_version INTEGER DEFAULT 1
);

-- Indexes for cache performance
CREATE INDEX idx_tag_intersection_cache_hash ON tag_intersection_cache(query_hash);
CREATE INDEX idx_tag_intersection_cache_expires ON tag_intersection_cache(cache_expires_at);
CREATE INDEX idx_tag_intersection_cache_access ON tag_intersection_cache(last_accessed_at);
CREATE INDEX idx_tag_intersection_cache_tags ON tag_intersection_cache USING gin(required_tags);
```

#### Query Performance Metrics Table
```sql
CREATE TABLE query_performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_type VARCHAR(50) NOT NULL, -- 'tag_intersection', 'service_search', 'compatibility'
    query_hash VARCHAR(64) NOT NULL,
    execution_time_ms INTEGER NOT NULL,
    result_count INTEGER NOT NULL,
    cache_hit BOOLEAN NOT NULL,
    database_time_ms INTEGER,
    cache_time_ms INTEGER,
    index_usage JSONB, -- Which indexes were used
    query_plan JSONB, -- Database query execution plan
    concurrent_queries INTEGER, -- Number of concurrent queries during execution
    memory_usage_mb DECIMAL(8,2),
    cpu_usage_percent DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id UUID REFERENCES consultation_sessions(id)
);

-- Indexes for performance analysis
CREATE INDEX idx_query_performance_type ON query_performance_metrics(query_type);
CREATE INDEX idx_query_performance_time ON query_performance_metrics(execution_time_ms);
CREATE INDEX idx_query_performance_created ON query_performance_metrics(created_at);
CREATE INDEX idx_query_performance_hash ON query_performance_metrics(query_hash);
```

#### Tag Relationship Graph Table
```sql
CREATE TABLE tag_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_tag_id UUID NOT NULL REFERENCES service_tags(id) ON DELETE CASCADE,
    target_tag_id UUID NOT NULL REFERENCES service_tags(id) ON DELETE CASCADE,
    relationship_type VARCHAR(30) NOT NULL, -- 'parent', 'child', 'synonym', 'related', 'conflicts'
    relationship_strength DECIMAL(3,2) DEFAULT 1.0 CHECK (relationship_strength BETWEEN 0 AND 1),
    bidirectional BOOLEAN DEFAULT false,
    business_context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(source_tag_id, target_tag_id, relationship_type),
    CHECK (source_tag_id != target_tag_id)
);

-- Indexes for relationship queries
CREATE INDEX idx_tag_relationships_source ON tag_relationships(source_tag_id);
CREATE INDEX idx_tag_relationships_target ON tag_relationships(target_tag_id);
CREATE INDEX idx_tag_relationships_type ON tag_relationships(relationship_type);
CREATE INDEX idx_tag_relationships_strength ON tag_relationships(relationship_strength);

-- Composite index for bidirectional lookups
CREATE INDEX idx_tag_relationships_bidirectional ON tag_relationships(source_tag_id, target_tag_id) 
WHERE bidirectional = true;
```

### Advanced Query Optimization Views

#### Materialized View for Tag Statistics
```sql
CREATE MATERIALIZED VIEW tag_usage_statistics AS
SELECT 
    st.id as tag_id,
    st.tag_code,
    st.tag_category,
    COUNT(sta.service_id) as service_count,
    AVG(sta.confidence_score) as avg_confidence,
    MIN(sta.confidence_score) as min_confidence,
    MAX(sta.confidence_score) as max_confidence,
    COUNT(DISTINCT s.category) as category_spread,
    COUNT(DISTINCT s.domain) as domain_spread,
    AVG(s.base_price) as avg_service_price,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY s.base_price) as median_service_price
FROM service_tags st
LEFT JOIN service_tag_assignments sta ON st.id = sta.tag_id
LEFT JOIN services s ON sta.service_id = s.id
WHERE st.is_active = true AND (s.is_active = true OR s.is_active IS NULL)
GROUP BY st.id, st.tag_code, st.tag_category;

-- Refresh strategy
CREATE UNIQUE INDEX idx_tag_usage_statistics_tag ON tag_usage_statistics(tag_id);
```

#### Optimized Tag Intersection Function
```sql
CREATE OR REPLACE FUNCTION optimized_tag_intersection(
    p_required_tags TEXT[],
    p_optional_tags TEXT[] DEFAULT '{}',
    p_excluded_tags TEXT[] DEFAULT '{}',
    p_tag_weights JSONB DEFAULT '{}',
    p_min_confidence DECIMAL(3,2) DEFAULT 0.7,
    p_limit INTEGER DEFAULT 50,
    p_offset INTEGER DEFAULT 0
) RETURNS TABLE (
    service_id UUID,
    service_name VARCHAR(255),
    service_category VARCHAR(50),
    match_score DECIMAL(8,4),
    required_matches INTEGER,
    optional_matches INTEGER,
    confidence_score DECIMAL(3,2),
    tag_details JSONB
) AS $$
DECLARE
    query_start_time TIMESTAMP;
    execution_time INTEGER;
    result_count INTEGER;
BEGIN
    query_start_time := clock_timestamp();
    
    RETURN QUERY
    WITH tag_weights AS (
        SELECT 
            tag_code,
            COALESCE((p_tag_weights->tag_code)::DECIMAL(3,2), 1.0) as weight
        FROM service_tags
        WHERE tag_code = ANY(p_required_tags || p_optional_tags)
    ),
    service_tag_matches AS (
        SELECT 
            s.id,
            s.name,
            s.category,
            s.base_price,
            s.estimated_duration_minutes,
            -- Required tag matches
            COUNT(CASE 
                WHEN st.tag_code = ANY(p_required_tags) 
                THEN 1 
            END) as required_matches,
            -- Optional tag matches with weights
            SUM(CASE 
                WHEN st.tag_code = ANY(p_optional_tags) 
                THEN COALESCE(tw.weight, 1.0) * sta.confidence_score
                ELSE 0 
            END) as weighted_optional_matches,
            -- Excluded tag violations
            COUNT(CASE 
                WHEN st.tag_code = ANY(p_excluded_tags) 
                THEN 1 
            END) as excluded_violations,
            -- Average confidence
            AVG(sta.confidence_score) as avg_confidence,
            -- Tag details for debugging
            JSONB_AGG(
                JSONB_BUILD_OBJECT(
                    'tag_code', st.tag_code,
                    'tag_category', st.tag_category,
                    'confidence', sta.confidence_score,
                    'weight', COALESCE(tw.weight, 1.0),
                    'match_type', CASE 
                        WHEN st.tag_code = ANY(p_required_tags) THEN 'required'
                        WHEN st.tag_code = ANY(p_optional_tags) THEN 'optional'
                        WHEN st.tag_code = ANY(p_excluded_tags) THEN 'excluded'
                        ELSE 'other'
                    END
                )
            ) as tag_details
        FROM services s
        JOIN service_tag_assignments sta ON s.id = sta.service_id
        JOIN service_tags st ON sta.tag_id = st.id
        LEFT JOIN tag_weights tw ON st.tag_code = tw.tag_code
        WHERE s.is_active = true 
            AND st.is_active = true
            AND sta.confidence_score >= p_min_confidence
        GROUP BY s.id, s.name, s.category, s.base_price, s.estimated_duration_minutes
        HAVING 
            -- Must match ALL required tags
            COUNT(CASE WHEN st.tag_code = ANY(p_required_tags) THEN 1 END) = COALESCE(array_length(p_required_tags, 1), 0)
            -- Must not match ANY excluded tags
            AND COUNT(CASE WHEN st.tag_code = ANY(p_excluded_tags) THEN 1 END) = 0
    ),
    scored_results AS (
        SELECT 
            stm.*,
            -- Complex scoring algorithm
            (
                -- Base score from required matches (weight: 40%)
                (stm.required_matches::DECIMAL / GREATEST(array_length(p_required_tags, 1), 1)) * 0.4 +
                -- Optional matches contribution (weight: 30%)
                LEAST(stm.weighted_optional_matches / GREATEST(array_length(p_optional_tags, 1), 1), 1.0) * 0.3 +
                -- Confidence score contribution (weight: 20%)
                stm.avg_confidence * 0.2 +
                -- Business value bonus (weight: 10%)
                CASE 
                    WHEN stm.base_price BETWEEN 50 AND 150 THEN 0.1  -- Sweet spot pricing
                    WHEN stm.estimated_duration_minutes BETWEEN 30 AND 90 THEN 0.05  -- Reasonable duration
                    ELSE 0
                END
            ) as match_score
        FROM service_tag_matches stm
    )
    SELECT 
        sr.id,
        sr.name,
        sr.category,
        sr.match_score,
        sr.required_matches,
        sr.weighted_optional_matches::INTEGER,
        sr.avg_confidence,
        sr.tag_details
    FROM scored_results sr
    ORDER BY sr.match_score DESC, sr.avg_confidence DESC, sr.name ASC
    LIMIT p_limit
    OFFSET p_offset;
    
    -- Log performance metrics
    execution_time := EXTRACT(MILLISECONDS FROM clock_timestamp() - query_start_time);
    GET DIAGNOSTICS result_count = ROW_COUNT;
    
    INSERT INTO query_performance_metrics (
        query_type, 
        query_hash, 
        execution_time_ms, 
        result_count, 
        cache_hit
    ) VALUES (
        'tag_intersection',
        encode(sha256((p_required_tags::TEXT || p_optional_tags::TEXT || p_excluded_tags::TEXT)::bytea), 'hex'),
        execution_time,
        result_count,
        false
    );
    
END;
$$ LANGUAGE plpgsql;
```

### API Specifications

#### Tag Intersection Query API

##### POST /api/v1/services/search/tags/intersection
```typescript
interface TagIntersectionRequest {
  query: {
    required: TagQuery[];     // Tags that MUST be present
    optional: TagQuery[];     // Tags that boost relevance
    excluded: TagQuery[];     // Tags that disqualify services
  };
  scoring: {
    tagWeights?: Record<string, number>;  // Custom tag importance weights
    scoringAlgorithm?: 'default' | 'personalized' | 'business_optimized';
    minConfidenceScore?: number;          // Minimum tag assignment confidence
    boostFactors?: BoostFactor[];         // Additional scoring factors
  };
  filters?: {
    categories?: string[];
    domains?: string[];
    priceRange?: { min: number; max: number };
    durationRange?: { min: number; max: number };
    complexityLevels?: number[];
    businessRules?: BusinessRuleFilter[];
  };
  options?: {
    limit?: number;
    offset?: number;
    includeDebugInfo?: boolean;
    cacheStrategy?: 'default' | 'force_refresh' | 'cache_only';
    timeoutMs?: number;
  };
}

interface TagQuery {
  tagCode: string;
  category?: string;
  weight?: number;
  fuzzyMatch?: boolean;
  includeRelated?: boolean;  // Include related/synonym tags
}

interface BoostFactor {
  type: 'price_sweet_spot' | 'duration_preference' | 'popularity' | 'seasonal';
  weight: number;
  parameters?: Record<string, any>;
}

interface TagIntersectionResponse {
  results: ServiceTagMatch[];
  query: {
    processedQuery: ProcessedTagQuery;
    executionPlan: QueryExecutionPlan;
    performance: QueryPerformanceMetrics;
  };
  metadata: {
    totalResults: number;
    queryTime: number;
    cacheHit: boolean;
    scoringAlgorithm: string;
    resultVersion: string;
  };
  debug?: TagIntersectionDebugInfo;
}

interface ServiceTagMatch {
  service: ServiceWithMetadata;
  scoring: {
    totalScore: number;
    scoreBreakdown: ScoreBreakdown;
    matchQuality: 'excellent' | 'good' | 'fair' | 'poor';
    confidenceLevel: number;
  };
  tagMatches: {
    required: TagMatchDetail[];
    optional: TagMatchDetail[];
    related: TagMatchDetail[];
  };
  reasoning: string[];
  businessContext?: {
    profitabilityScore?: number;
    popularityRank?: number;
    seasonalRelevance?: number;
  };
}

interface TagMatchDetail {
  tag: ServiceTag;
  matchType: 'exact' | 'fuzzy' | 'related' | 'inferred';
  confidence: number;
  weight: number;
  contribution: number;  // Contribution to total score
}

interface ScoreBreakdown {
  requiredTagsScore: number;
  optionalTagsScore: number;
  confidenceScore: number;
  businessValueScore: number;
  boostFactorsScore: number;
  penalties: number;
}
```

##### GET /api/v1/services/search/tags/suggestions
```typescript
interface TagSuggestionRequest {
  partialQuery?: string;
  currentTags?: string[];
  category?: string;
  context?: {
    userProfile?: UserProfileSnapshot;
    sessionHistory?: string[];
    consultationContext?: Record<string, any>;
  };
  options?: {
    limit?: number;
    includeRelated?: boolean;
    includePopularity?: boolean;
    excludeConflicting?: boolean;
  };
}

interface TagSuggestionResponse {
  suggestions: TagSuggestion[];
  categories: CategorySuggestion[];
  metadata: {
    suggestionCount: number;
    queryTime: number;
    personalized: boolean;
  };
}

interface TagSuggestion {
  tag: ServiceTag;
  relevanceScore: number;
  suggestionReason: string;
  category: string;
  popularity: number;
  compatibility: {
    withCurrentTags: number;
    conflicts: string[];
    synergies: string[];
  };
  usage: {
    serviceCount: number;
    averagePrice: number;
    averageDuration: number;
  };
}
```

### Performance Optimization Strategies

#### Multi-Tier Caching Architecture
```typescript
interface TagQueryCacheStrategy {
  layers: {
    l1_application: {
      technology: 'Node.js LRU Cache';
      maxSize: '256MB';
      ttl: 300; // 5 minutes
      keyPattern: 'tag_query:{queryHash}';
      evictionPolicy: 'LRU';
    };
    l2_redis: {
      technology: 'Redis Cluster';
      maxMemory: '4GB';
      ttl: 1800; // 30 minutes
      keyPattern: 'tag_intersection:{queryHash}';
      compressionEnabled: true;
      pipelineSize: 100;
    };
    l3_database: {
      technology: 'PostgreSQL Materialized Views';
      refreshStrategy: 'incremental';
      refreshInterval: 3600; // 1 hour
      partitioning: 'by_tag_category';
    };
  };
  invalidation: {
    triggers: [
      'service_tag_assignment_change',
      'service_activation_change',
      'tag_relationship_update',
      'business_rule_modification'
    ];
    strategy: 'selective_invalidation';
    propagationDelay: 'immediate';
  };
  warming: {
    strategy: 'predictive_warming';
    popularQueries: true;
    userPatternBased: true;
    scheduleBasedRefresh: true;
  };
}
```

#### Query Optimization Techniques
```typescript
interface QueryOptimizationConfig {
  indexOptimization: {
    compositeIndexes: [
      'service_tag_assignments(service_id, tag_id, confidence_score)',
      'services(category, domain, is_active, base_price)',
      'service_tags(tag_category, is_active, tag_code)'
    ];
    partialIndexes: [
      'services(id) WHERE is_active = true',
      'service_tag_assignments(service_id, confidence_score) WHERE confidence_score >= 0.7'
    ];
    coveringIndexes: [
      'service_tag_assignments(service_id) INCLUDE (tag_id, confidence_score)'
    ];
  };
  queryRewriting: {
    enableCTEOptimization: true;
    enableJoinElimination: true;
    enablePredicatePushdown: true;
    enableIndexOnlyScans: true;
  };
  parallelization: {
    enableParallelQueries: true;
    maxWorkerProcesses: 8;
    parallelThreshold: 1000; // Minimum rows for parallel execution
  };
  statisticsOptimization: {
    autoAnalyze: true;
    statisticsTarget: 1000;
    customStatistics: [
      'service_tag_assignments.confidence_score',
      'services.base_price',
      'service_tags.tag_category'
    ];
  };
}
```

## Task Breakdown

### Task 3.3.1: Core Query Engine Implementation
**Effort**: 12 hours  
**Description**: Implement the core tag intersection query engine with optimization

**Deliverables**:
- Optimized tag intersection SQL functions
- Query execution plan analyzer
- Performance monitoring integration
- Index optimization recommendations

**Acceptance Criteria**:
- Sub-200ms query response times for complex intersections
- Support for 12+ tag categories simultaneously
- Accurate relevance scoring with 95%+ user satisfaction
- Horizontal scaling support for 10,000+ concurrent queries

### Task 3.3.2: Caching and Performance Layer
**Effort**: 10 hours  
**Description**: Implement multi-tier caching and performance optimization

**Deliverables**:
- Multi-tier cache implementation
- Cache invalidation strategies
- Performance monitoring dashboards
- Automated cache warming procedures

**Acceptance Criteria**:
- 90%+ cache hit rate for frequent queries
- Sub-50ms cache retrieval times
- Intelligent cache invalidation with zero stale data
- Predictive cache warming based on usage patterns

### Task 3.3.3: Advanced Scoring Algorithms
**Effort**: 6 hours  
**Description**: Implement sophisticated relevance scoring and personalization

**Deliverables**:
- Multi-factor scoring algorithms
- Personalization engine integration
- A/B testing framework for scoring
- Business rule integration

**Acceptance Criteria**:
- Configurable scoring weights and algorithms
- Personalized results with 20%+ relevance improvement
- A/B testing capability for scoring optimization
- Business rule compliance in all scoring decisions

### Task 3.3.4: API Development and Integration
**Effort**: 2 hours  
**Description**: Develop comprehensive APIs for tag intersection queries

**Deliverables**:
- RESTful API endpoints with OpenAPI specification
- GraphQL integration for flexible queries
- Real-time query suggestions
- Comprehensive error handling and validation

**Acceptance Criteria**:
- All API endpoints responding within SLA
- GraphQL support for complex nested queries
- Real-time tag suggestions with sub-100ms response
- Comprehensive input validation and error handling

## Quality Assurance

### Testing Strategy
- **Unit Tests**: 95% code coverage for query engine functions
- **Performance Tests**: Load testing with 10,000+ concurrent queries
- **Accuracy Tests**: Relevance scoring validation with expert evaluation
- **Integration Tests**: End-to-end query flow testing

### Monitoring & Alerting
- **Query Performance**: Alert if 95th percentile exceeds 200ms
- **Cache Performance**: Alert if hit rate drops below 85%
- **Accuracy Metrics**: Alert if user satisfaction drops below 90%
- **System Resources**: Alert on CPU/memory utilization above 80%

### Security Considerations
- **Query Injection Prevention**: Parameterized queries and input sanitization
- **Rate Limiting**: Prevent query abuse and DoS attacks
- **Access Control**: Role-based access to query optimization features
- **Audit Logging**: Complete audit trail for all query operations

## Risk Management

### Technical Risks
- **Query Complexity**: Complex tag intersections may cause performance degradation
- **Cache Consistency**: Distributed caching may serve stale results
- **Index Maintenance**: Large tag datasets may slow index updates

### Mitigation Strategies
- **Query Optimization**: Implement query complexity limits and optimization hints
- **Cache Management**: Use versioned cache keys with immediate invalidation
- **Index Strategy**: Use partial indexes and background maintenance procedures

## Success Metrics

### Performance Metrics
- **Query Response Time**: 95th percentile under 200ms
- **Cache Hit Rate**: 90%+ for frequently accessed queries
- **Throughput**: 10,000+ queries per minute per instance
- **Resource Utilization**: CPU usage under 70% during peak load

### Business Metrics
- **Relevance Accuracy**: 95%+ user satisfaction with search results
- **Query Success Rate**: 98%+ queries return relevant results
- **User Engagement**: 40%+ increase in service discovery through search
- **Conversion Rate**: 25%+ improvement in search-to-booking conversion

---

**Activity Version**: 1.0  
**Last Updated**: 2025-01-27  
**Next Review**: 2025-02-10  
**Owner**: Data Architecture Team  
**Dependencies**: Activity 3.1, Activity 3.2

