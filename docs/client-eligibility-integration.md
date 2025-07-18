# Client Eligibility Integration Guide

## Overview
This guide explains how to integrate the ClientEligibility_Tags mapping system into your booking and recommendation features.

## Files Created
- `src/data/mappings/client-eligibility-mapping.json` - Complete service-to-eligibility mapping data
- `src/types/client-eligibility.ts` - TypeScript types and utility functions
- `docs/client-eligibility-integration.md` - This integration guide

## Integration Options

### 1. Direct JSON Import (JavaScript/TypeScript)
```javascript
import eligibilityMapping from '../data/mappings/client-eligibility-mapping.json';

// Get all universal services
const universalServices = eligibilityMapping.services_by_eligibility['universal-suitable'];

// Get services requiring consultation
const consultationServices = eligibilityMapping.services_by_eligibility['consultation-required'];

// Get category statistics
const hairStats = eligibilityMapping.services_by_category.hair;
console.log(`Hair services: ${hairStats.total} total, ${hairStats['universal-suitable']} universal`);
```

### 2. Using TypeScript Utilities
```typescript
import { ClientEligibilityUtils, ClientEligibilityTag } from '../types/client-eligibility';

// Load the mapping data
const mapping = await ClientEligibilityUtils.loadMapping();

// Get services by eligibility
const universalServices = await ClientEligibilityUtils.getServicesByEligibility('universal-suitable');

// Check if a service requires consultation
const needsConsultation = await ClientEligibilityUtils.requiresConsultation('hair_019_color_correction.md');

// Filter services for a specific client
const availableServices = await ClientEligibilityUtils.filterServicesForClient(
  true,  // client can book consultation services
  false  // client has no health restrictions
);
```

### 3. React Component Example
```tsx
import React, { useState, useEffect } from 'react';
import { ClientEligibilityUtils, ServiceEligibility } from '../types/client-eligibility';

const ServiceFilter: React.FC = () => {
  const [services, setServices] = useState<ServiceEligibility[]>([]);
  const [clientCanBookDirectly, setClientCanBookDirectly] = useState(true);
  const [clientHasHealthRestrictions, setClientHasHealthRestrictions] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      const filteredServices = await ClientEligibilityUtils.filterServicesForClient(
        clientCanBookDirectly,
        clientHasHealthRestrictions
      );
      setServices(filteredServices);
    };
    loadServices();
  }, [clientCanBookDirectly, clientHasHealthRestrictions]);

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={clientCanBookDirectly}
            onChange={(e) => setClientCanBookDirectly(e.target.checked)}
          />
          Client can book consultation services directly
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={clientHasHealthRestrictions}
            onChange={(e) => setClientHasHealthRestrictions(e.target.checked)}
          />
          Client has health restrictions
        </label>
      </div>
      
      <h3>Available Services ({services.length})</h3>
      <ul>
        {services.map((service) => (
          <li key={service.file}>
            <strong>{service.name}</strong> ({service.category})
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### 4. Backend API Integration (Node.js/Express)
```javascript
const fs = require('fs');
const path = require('path');

// Load the mapping data
const eligibilityMapping = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/mappings/client-eligibility-mapping.json'), 'utf8')
);

// API endpoint to get filtered services
app.get('/api/services/filtered', (req, res) => {
  const { canBookDirectly = true, hasHealthRestrictions = false } = req.query;
  
  let availableServices = [
    ...eligibilityMapping.services_by_eligibility['universal-suitable']
  ];
  
  if (canBookDirectly === 'true') {
    availableServices.push(...eligibilityMapping.services_by_eligibility['consultation-required']);
  }
  
  if (hasHealthRestrictions !== 'true') {
    availableServices.push(...eligibilityMapping.services_by_eligibility['health-restrictions']);
  }
  
  res.json({
    services: availableServices,
    total: availableServices.length,
    filters_applied: {
      canBookDirectly: canBookDirectly === 'true',
      hasHealthRestrictions: hasHealthRestrictions === 'true'
    }
  });
});

// API endpoint to check service eligibility
app.get('/api/services/:serviceFile/eligibility', (req, res) => {
  const { serviceFile } = req.params;
  
  const tags = [];
  if (eligibilityMapping.services_by_eligibility['universal-suitable'].some(s => s.file === serviceFile)) {
    tags.push('universal-suitable');
  }
  if (eligibilityMapping.services_by_eligibility['consultation-required'].some(s => s.file === serviceFile)) {
    tags.push('consultation-required');
  }
  if (eligibilityMapping.services_by_eligibility['health-restrictions'].some(s => s.file === serviceFile)) {
    tags.push('health-restrictions');
  }
  
  if (tags.length === 0) {
    return res.status(404).json({ error: 'Service not found' });
  }
  
  res.json({
    service: serviceFile,
    eligibility_tags: tags,
    requires_consultation: tags.includes('consultation-required') || tags.includes('health-restrictions'),
    has_health_restrictions: tags.includes('health-restrictions')
  });
});
```

## Use Cases

### 1. Service Recommendation Engine
Filter services based on client profile and eligibility requirements.

### 2. Booking Flow Validation
Check if a service requires consultation before allowing direct booking.

### 3. Safety Compliance
Ensure clients with health restrictions are properly screened before booking certain services.

### 4. Staff Dashboard
Show staff which services require consultation or have special requirements.

### 5. Analytics & Reporting
Track booking patterns by eligibility type and identify consultation bottlenecks.

## Data Structure

### Service Object
```typescript
{
  file: string;           // e.g., "hair_019_color_correction.md"
  name: string;           // e.g., "Color Correction"
  category: string;       // e.g., "hair"
  additional_tags?: string[]; // For services with multiple tags
}
```

### Eligibility Tags
- `universal-suitable`: Safe for all clients (45 services)
- `consultation-required`: Needs professional assessment (39 services)
- `health-restrictions`: Has health/condition limitations (1 service)

### Categories
- `hair` (28 services)
- `facial` (16 services)
- `makeup` (12 services)
- `wax` (10 services)
- `brow` (6 services)
- `lash` (6 services)
- `thread` (6 services)
- `combo` (1 service)

## Next Steps

1. **Import the JSON data** into your application
2. **Implement filtering logic** based on client eligibility
3. **Add consultation booking flow** for services requiring assessment
4. **Create safety warnings** for health-restricted services
5. **Test the integration** with different client scenarios
6. **Monitor and optimize** based on booking patterns

The mapping data is now ready for integration into your booking system, recommendation engine, and safety compliance features! 🚀

