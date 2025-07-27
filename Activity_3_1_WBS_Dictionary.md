# Activity 3.1: Service Catalog Data Management & Metadata Architecture

## Activity Overview

**Activity ID**: 3.1  
**Activity Name**: Service Catalog Data Management & Metadata Architecture  
**Parent Epic**: IMP-DA-001 Beauty Consultation Data Architecture  
**Activity Type**: Data Architecture Implementation  
**Priority**: Critical  
**Estimated Effort**: 40 hours  
**Dependencies**: None (Foundation Activity)  

## Activity Description

This activity focuses on implementing the comprehensive service catalog data architecture that supports 85+ beauty services across three domains (hair salon, makeup studio, med spa) with sophisticated metadata tagging and relationship management. The system must enable complex tag intersection queries for intelligent service recommendations while maintaining high performance and data integrity.

## Business Context

### Objective
Create a robust, scalable service catalog system that serves as the foundation for intelligent beauty consultation recommendations through advanced metadata classification and relationship mapping.

### Success Criteria
- **Data Completeness**: 100% of services properly categorized with metadata tags
- **Query Performance**: Sub-100ms response times for service catalog queries
- **Relationship Accuracy**: 95% accuracy in service compatibility mappings
- **Metadata Consistency**: Zero data integrity violations in production

### Business Value
- **Recommendation Quality**: Enable precise service matching through comprehensive metadata
- **Operational Efficiency**: Reduce manual service management overhead by 70%
- **Scalability**: Support addition of 200+ new services without architecture changes
- **Integration Readiness**: Provide clean APIs for external system integration

## Technical Scope

### Core Components

#### 1. Service Entity Management
- **Service Definition Schema**: Complete service data structure with all attributes
- **Domain Classification**: Hair salon, makeup studio, med spa categorization
- **Service Lifecycle**: Creation, modification, archival, and deletion workflows
- **Version Control**: Service definition versioning and change tracking

#### 2. Metadata Tag Architecture
- **Tag Taxonomy**: 12+ tag categories with hierarchical relationships
- **Tag Assignment**: Service-to-tag mapping with confidence scoring
- **Tag Validation**: Consistency checks and business rule enforcement
- **Tag Evolution**: Dynamic tag addition and relationship updates

#### 3. Service Relationship Management
- **Compatibility Matrix**: Service-to-service compatibility scoring
- **Bundle Relationships**: Services that work well together
- **Conflict Detection**: Services that cannot be combined
- **Sequence Dependencies**: Services that must be performed in order

#### 4. Performance Optimization
- **Indexing Strategy**: Optimized indexes for tag intersection queries
- **Caching Layer**: Multi-tier caching for frequently accessed data
- **Query Optimization**: Efficient query patterns for complex searches
- **Data Partitioning**: Logical data separation for improved performance

## Data Architecture Specifications

### Database Schema Design

#### Services Table
```sql
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_code VARCHAR(20) UNIQUE NOT NULL, -- e.g., 'hair_001'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- 'hair', 'makeup', 'med_spa'
    domain VARCHAR(50) NOT NULL, -- 'hair-salon', 'makeup-studio', 'med-spa'
    base_price DECIMAL(10,2),
    estimated_duration_minutes INTEGER,
    complexity_level INTEGER CHECK (complexity_level BETWEEN 1 AND 5),
    experience_required VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
    is_active BOOLEAN DEFAULT true,
    requires_consultation BOOLEAN DEFAULT false,
    age_restrictions JSONB, -- {"min_age": 16, "max_age": null}
    contraindications TEXT[],
    preparation_instructions TEXT[],
    aftercare_instructions TEXT[],
    specialist_required VARCHAR(100),
    equipment_required TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    version INTEGER DEFAULT 1
);

-- Indexes for performance
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_domain ON services(domain);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_complexity ON services(complexity_level);
CREATE INDEX idx_services_price_range ON services(base_price);
CREATE INDEX idx_services_duration ON services(estimated_duration_minutes);
CREATE INDEX idx_services_text_search ON services USING gin(to_tsvector('english', name || ' ' || description));
```

#### Service Tags Table
```sql
CREATE TABLE service_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tag_code VARCHAR(50) UNIQUE NOT NULL,
    tag_name VARCHAR(100) NOT NULL,
    tag_category VARCHAR(50) NOT NULL,
    tag_description TEXT,
    parent_tag_id UUID REFERENCES service_tags(id),
    tag_level INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    business_weight DECIMAL(3,2) DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tag categories: UrgencyLevel, ServiceCompatibility, TimeInvestment, 
-- ServiceComplexity, RiskLevel, ResultPermanence, PricePoint, 
-- OccasionSuitability, MaintenanceCommitment, EmotionalContext, 
-- ExperienceLevel, EnhancementFocus

CREATE INDEX idx_service_tags_category ON service_tags(tag_category);
CREATE INDEX idx_service_tags_active ON service_tags(is_active);
CREATE INDEX idx_service_tags_parent ON service_tags(parent_tag_id);
```

#### Service Tag Assignments Table
```sql
CREATE TABLE service_tag_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES service_tags(id) ON DELETE CASCADE,
    confidence_score DECIMAL(3,2) DEFAULT 1.0 CHECK (confidence_score BETWEEN 0 AND 1),
    assigned_by VARCHAR(50) DEFAULT 'system', -- 'system', 'manual', 'ml_model'
    assignment_reason TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    UNIQUE(service_id, tag_id)
);

-- Critical indexes for tag intersection queries
CREATE INDEX idx_service_tag_assignments_service ON service_tag_assignments(service_id);
CREATE INDEX idx_service_tag_assignments_tag ON service_tag_assignments(tag_id);
CREATE INDEX idx_service_tag_assignments_confidence ON service_tag_assignments(confidence_score);
CREATE INDEX idx_service_tag_assignments_primary ON service_tag_assignments(is_primary);

-- Composite index for complex queries
CREATE INDEX idx_service_tag_assignments_composite ON service_tag_assignments(service_id, tag_id, confidence_score);
```

#### Service Compatibility Matrix Table
```sql
CREATE TABLE service_compatibility (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_a_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    service_b_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    compatibility_type VARCHAR(20) NOT NULL, -- 'synergy', 'neutral', 'conflict', 'sequence'
    compatibility_score DECIMAL(3,2) CHECK (compatibility_score BETWEEN -1 AND 1),
    sequence_order INTEGER, -- For services that must be done in order
    time_gap_minutes INTEGER, -- Required time between services
    business_reason TEXT,
    contraindication_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(service_a_id, service_b_id),
    CHECK (service_a_id != service_b_id)
);

CREATE INDEX idx_service_compatibility_a ON service_compatibility(service_a_id);
CREATE INDEX idx_service_compatibility_b ON service_compatibility(service_b_id);
CREATE INDEX idx_service_compatibility_type ON service_compatibility(compatibility_type);
CREATE INDEX idx_service_compatibility_score ON service_compatibility(compatibility_score);
```

### API Specifications

#### Service Catalog API Endpoints

##### GET /api/v1/services
```typescript
interface ServiceCatalogRequest {
  filters?: {
    category?: string[];
    domain?: string[];
    priceRange?: { min: number; max: number };
    durationRange?: { min: number; max: number };
    complexityLevel?: number[];
    tags?: string[];
    experienceLevel?: string;
  };
  search?: {
    query?: string;
    fields?: string[]; // ['name', 'description', 'tags']
  };
  pagination?: {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
  include?: string[]; // ['tags', 'compatibility', 'pricing']
}

interface ServiceCatalogResponse {
  services: ServiceWithMetadata[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: AppliedFilter[];
  metadata: {
    queryTime: number;
    cacheHit: boolean;
    resultCount: number;
  };
}

interface ServiceWithMetadata {
  id: string;
  serviceCode: string;
  name: string;
  description: string;
  category: string;
  domain: string;
  pricing: {
    basePrice: number;
    priceRange: { min: number; max: number };
    currency: string;
  };
  duration: {
    estimated: number;
    range: { min: number; max: number };
    unit: 'minutes';
  };
  complexity: {
    level: number;
    description: string;
    experienceRequired: string;
  };
  tags: ServiceTag[];
  compatibility?: CompatibilityInfo[];
  requirements?: {
    ageRestrictions?: { min?: number; max?: number };
    contraindications?: string[];
    preparation?: string[];
    aftercare?: string[];
    specialist?: string;
    equipment?: string[];
  };
  metadata: {
    isActive: boolean;
    requiresConsultation: boolean;
    version: number;
    lastUpdated: string;
  };
}
```

##### POST /api/v1/services/search/tags
```typescript
interface TagIntersectionRequest {
  requiredTags: string[]; // Tags that must be present
  optionalTags?: string[]; // Tags that boost relevance
  excludedTags?: string[]; // Tags that disqualify services
  tagWeights?: Record<string, number>; // Custom tag importance weights
  filters?: ServiceFilters;
  options?: {
    minConfidenceScore?: number;
    maxResults?: number;
    includeReasoningPath?: boolean;
  };
}

interface TagIntersectionResponse {
  services: ServiceMatch[];
  tagAnalysis: {
    matchedTags: TagMatch[];
    missingTags: string[];
    conflictingTags: string[];
  };
  performance: {
    queryTime: number;
    servicesEvaluated: number;
    cacheUtilization: number;
  };
  reasoningPath?: ReasoningStep[];
}

interface ServiceMatch {
  service: ServiceWithMetadata;
  matchScore: number;
  tagMatches: {
    required: TagMatch[];
    optional: TagMatch[];
    bonus: TagMatch[];
  };
  confidenceScore: number;
  reasoning: string[];
}
```

##### GET /api/v1/services/{serviceId}/compatibility
```typescript
interface CompatibilityRequest {
  targetServices?: string[]; // Specific services to check compatibility with
  includeRecommendations?: boolean;
  contextFilters?: {
    userExperience?: string;
    timeConstraints?: number;
    budgetRange?: { min: number; max: number };
  };
}

interface CompatibilityResponse {
  serviceId: string;
  compatibility: {
    synergies: CompatibilityMatch[];
    conflicts: CompatibilityMatch[];
    neutral: CompatibilityMatch[];
    sequences: SequenceRecommendation[];
  };
  recommendations: {
    bestCombinations: ServiceCombination[];
    avoidCombinations: ServiceCombination[];
  };
  metadata: {
    totalServicesEvaluated: number;
    compatibilityVersion: string;
    lastUpdated: string;
  };
}

interface CompatibilityMatch {
  targetService: ServiceWithMetadata;
  compatibilityType: 'synergy' | 'neutral' | 'conflict' | 'sequence';
  score: number; // -1 to 1
  reasoning: string;
  businessImpact?: {
    revenueBoost?: number;
    timeEfficiency?: number;
    customerSatisfaction?: number;
  };
  constraints?: {
    timeGap?: number;
    sequenceOrder?: number;
    contraindications?: string[];
  };
}
```

### Performance Optimization Strategies

#### Caching Architecture
```typescript
interface CacheStrategy {
  layers: {
    l1: {
      type: 'application';
      technology: 'Node.js Memory';
      ttl: 300; // 5 minutes
      maxSize: '100MB';
      evictionPolicy: 'LRU';
    };
    l2: {
      type: 'distributed';
      technology: 'Redis';
      ttl: 3600; // 1 hour
      maxSize: '1GB';
      clustering: true;
    };
    l3: {
      type: 'database';
      technology: 'PostgreSQL Query Cache';
      ttl: 7200; // 2 hours
      maxSize: '2GB';
    };
  };
  invalidation: {
    strategy: 'tag-based';
    triggers: ['service_update', 'tag_assignment', 'compatibility_change'];
    propagation: 'immediate';
  };
}

// Cache key patterns
const CACHE_KEYS = {
  SERVICE_BY_ID: 'service:id:{serviceId}',
  SERVICES_BY_CATEGORY: 'services:category:{category}:page:{page}',
  TAG_INTERSECTION: 'tags:intersection:{tagHash}',
  COMPATIBILITY_MATRIX: 'compatibility:service:{serviceId}',
  SERVICE_SEARCH: 'search:services:{queryHash}'
};
```

#### Query Optimization Patterns
```sql
-- Optimized tag intersection query
WITH tag_matches AS (
  SELECT 
    s.id,
    s.name,
    s.category,
    s.base_price,
    COUNT(CASE WHEN st.tag_code = ANY($1::text[]) THEN 1 END) as required_matches,
    COUNT(CASE WHEN st.tag_code = ANY($2::text[]) THEN 1 END) as optional_matches,
    AVG(sta.confidence_score) as avg_confidence
  FROM services s
  JOIN service_tag_assignments sta ON s.id = sta.service_id
  JOIN service_tags st ON sta.tag_id = st.id
  WHERE s.is_active = true
    AND st.is_active = true
    AND sta.confidence_score >= $3
  GROUP BY s.id, s.name, s.category, s.base_price
  HAVING COUNT(CASE WHEN st.tag_code = ANY($1::text[]) THEN 1 END) = array_length($1::text[], 1)
)
SELECT 
  tm.*,
  (tm.required_matches * 2.0 + tm.optional_matches * 1.0) * tm.avg_confidence as match_score
FROM tag_matches tm
ORDER BY match_score DESC
LIMIT $4;
```

## Task Breakdown

### Task 3.1.1: Database Schema Implementation
**Effort**: 12 hours  
**Description**: Implement complete database schema with all tables, indexes, and constraints

**Deliverables**:
- Database migration scripts
- Schema documentation with ERDs
- Index performance analysis
- Data validation rules

**Acceptance Criteria**:
- All tables created with proper relationships
- Indexes provide sub-100ms query performance
- Foreign key constraints maintain data integrity
- Schema supports 100,000+ services without degradation

### Task 3.1.2: Service Management API Development
**Effort**: 16 hours  
**Description**: Develop comprehensive APIs for service catalog management

**Deliverables**:
- RESTful API endpoints with OpenAPI specification
- Input validation and error handling
- Authentication and authorization integration
- API documentation and examples

**Acceptance Criteria**:
- All CRUD operations for services implemented
- API responses under 200ms for 95th percentile
- Comprehensive error handling with meaningful messages
- 100% API test coverage

### Task 3.1.3: Tag Management System
**Effort**: 8 hours  
**Description**: Implement tag taxonomy and assignment system

**Deliverables**:
- Tag hierarchy management
- Bulk tag assignment utilities
- Tag validation and consistency checks
- Tag analytics and reporting

**Acceptance Criteria**:
- Support for 12+ tag categories
- Hierarchical tag relationships
- Automated tag consistency validation
- Tag assignment confidence scoring

### Task 3.1.4: Performance Optimization Implementation
**Effort**: 4 hours  
**Description**: Implement caching and query optimization

**Deliverables**:
- Multi-tier caching implementation
- Query optimization for tag intersections
- Performance monitoring and alerting
- Load testing results

**Acceptance Criteria**:
- 90%+ cache hit rate for frequent queries
- Sub-100ms response times for catalog queries
- Horizontal scaling support for 10x load
- Automated performance regression detection

## Quality Assurance

### Testing Strategy
- **Unit Tests**: 95% code coverage for all service management functions
- **Integration Tests**: End-to-end API testing with realistic data sets
- **Performance Tests**: Load testing with 10,000+ concurrent requests
- **Data Quality Tests**: Validation of tag assignments and relationships

### Monitoring & Alerting
- **Query Performance**: Alert if 95th percentile exceeds 200ms
- **Cache Hit Rate**: Alert if hit rate drops below 85%
- **Data Integrity**: Alert on foreign key violations or orphaned records
- **API Availability**: Alert on 99.9% availability threshold breach

### Security Considerations
- **Input Validation**: Comprehensive sanitization of all user inputs
- **SQL Injection Prevention**: Parameterized queries and ORM usage
- **Access Control**: Role-based permissions for service management
- **Audit Logging**: Complete audit trail for all data modifications

## Risk Management

### Technical Risks
- **Query Performance**: Complex tag intersection queries may degrade under load
- **Data Consistency**: Concurrent updates may cause tag assignment conflicts
- **Cache Invalidation**: Stale cache data may serve incorrect recommendations

### Mitigation Strategies
- **Performance**: Implement query result caching and database read replicas
- **Consistency**: Use database transactions and optimistic locking
- **Cache Management**: Implement tag-based cache invalidation with immediate propagation

## Success Metrics

### Performance Metrics
- **Query Response Time**: 95th percentile under 100ms
- **Cache Hit Rate**: 90%+ for frequently accessed data
- **Database Connection Pool**: 95%+ utilization efficiency
- **API Throughput**: 1000+ requests per minute per instance

### Business Metrics
- **Service Catalog Completeness**: 100% services with complete metadata
- **Tag Assignment Accuracy**: 95%+ confidence scores
- **Compatibility Matrix Coverage**: 90%+ service pairs evaluated
- **API Adoption**: 80%+ of service queries use optimized endpoints

---

**Activity Version**: 1.0  
**Last Updated**: 2025-01-27  
**Next Review**: 2025-02-10  
**Owner**: Data Architecture Team  
**Dependencies**: None

