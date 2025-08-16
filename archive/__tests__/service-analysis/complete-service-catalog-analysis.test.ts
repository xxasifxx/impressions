/**
 * Complete Service Catalog Analysis
 * 
 * GOAL: Analyze every service that can be added to cart and determine:
 * 1. Maintenance commitment (what needs to be done to sustain results)
 * 2. Risk (consequences of failure to meet maintenance commitment)
 * 3. Service frequency (how often needed to maintain the look)
 * 4. Different criteria for event-based vs regular services
 * 
 * This analysis will justify every numerical decision in the confidence scoring system
 */

import { describe, it } from 'vitest'
import { allUnifiedServices, UnifiedService } from '../../data/unifiedServicesData'

describe('Complete Service Catalog Analysis', () => {
  
  describe('Service Inventory - All Cart-Addable Services', () => {
    it('should log every service available for cart addition', () => {
      console.log('\n=== COMPLETE SERVICE INVENTORY ===')
      console.log(`Total services available: ${allUnifiedServices.length}`)
      
      const servicesByDomain = {
        'hair-salon': allUnifiedServices.filter(s => s.domain === 'hair-salon'),
        'makeup-studio': allUnifiedServices.filter(s => s.domain === 'makeup-studio'),
        'med-spa': allUnifiedServices.filter(s => s.domain === 'med-spa')
      }
      
      Object.entries(servicesByDomain).forEach(([domain, services]) => {
        console.log(`\n${domain.toUpperCase()} (${services.length} services):`)
        services.forEach(service => {
          console.log(`- ${service.name} (${service.id}) - ${service.price} - ${service.difficulty}`)
        })
      })
      
      // Categorize by service type
      const eventBasedServices = allUnifiedServices.filter(service => 
        service.userJourneys?.includes('special-occasion') || 
        service.name.toLowerCase().includes('bridal') ||
        service.name.toLowerCase().includes('event')
      )
      
      const regularServices = allUnifiedServices.filter(service => 
        !eventBasedServices.includes(service)
      )
      
      console.log(`\nEVENT-BASED SERVICES (${eventBasedServices.length}):`)
      eventBasedServices.forEach(service => {
        console.log(`- ${service.name}: ${service.userJourneys?.join(', ')}`)
      })
      
      console.log(`\nREGULAR SERVICES (${regularServices.length}):`)
      regularServices.forEach(service => {
        console.log(`- ${service.name}: ${service.userJourneys?.join(', ')}`)
      })
    })
  })

  describe('Regular Services Analysis - Maintenance/Risk/Frequency', () => {
    it('should analyze maintenance commitment for each regular service', () => {
      console.log('\n=== MAINTENANCE COMMITMENT ANALYSIS ===')
      
      const regularServices = allUnifiedServices.filter(service => 
        !service.userJourneys?.includes('special-occasion') || 
        service.userJourneys?.includes('maintenance')
      )
      
      const maintenanceAnalysis = regularServices.map(service => {
        // Analyze what maintenance is required based on service details
        let maintenanceLevel: 'low' | 'moderate' | 'high' | 'professional' = 'moderate'
        let maintenanceActions: string[] = []
        let justification = ''
        
        // Hair services maintenance analysis
        if (service.domain === 'hair-salon') {
          if (service.category === 'Cuts & Styling') {
            if (service.name.includes('Precision Cut')) {
              maintenanceLevel = 'low'
              maintenanceActions = ['Regular trims every 6-8 weeks', 'Basic styling at home']
              justification = 'Cuts grow out naturally, minimal daily maintenance required'
            } else if (service.name.includes('Blowout')) {
              maintenanceLevel = 'low'
              maintenanceActions = ['Gentle brushing', 'Avoid humidity']
              justification = 'Temporary styling, lasts 2-3 days with minimal care'
            }
          } else if (service.category === 'Color Services') {
            if (service.name.includes('Root Touch-Up')) {
              maintenanceLevel = 'moderate'
              maintenanceActions = ['Color-safe shampoo', 'Regular touch-ups every 4-6 weeks']
              justification = 'Requires consistent upkeep to maintain color match'
            } else if (service.name.includes('Balayage')) {
              maintenanceLevel = 'low'
              maintenanceActions = ['Color-safe products', 'UV protection', 'Touch-ups every 3-4 months']
              justification = 'Designed to grow out naturally, low maintenance by design'
            } else if (service.name.includes('Full Color')) {
              maintenanceLevel = 'high'
              maintenanceActions = ['Sulfate-free shampoo', 'Deep conditioning', 'Root touch-ups every 4-6 weeks', 'Color protection']
              justification = 'Requires consistent product use and regular appointments'
            }
          } else if (service.category === 'Extensions') {
            maintenanceLevel = 'professional'
            maintenanceActions = ['Specialized brushing', 'Professional products', 'Regular maintenance appointments', 'Careful sleeping/styling']
            justification = 'Requires significant daily care and professional maintenance'
          }
        }
        
        // Makeup services maintenance analysis
        if (service.domain === 'makeup-studio') {
          if (service.name.includes('Lesson') || service.name.includes('Consultation')) {
            maintenanceLevel = 'moderate'
            maintenanceActions = ['Practice techniques learned', 'Invest in recommended products']
            justification = 'Knowledge-based service requiring practice to maintain skills'
          } else if (service.name.includes('Lash Extensions')) {
            maintenanceLevel = 'high'
            maintenanceActions = ['Gentle cleansing', 'Avoid oil-based products', 'Regular fills every 2-3 weeks', 'Careful sleeping']
            justification = 'Requires careful daily care and frequent professional maintenance'
          } else if (service.name.includes('Eyebrow Threading')) {
            maintenanceLevel = 'low'
            maintenanceActions = ['Regular appointments every 3-4 weeks']
            justification = 'Natural regrowth, minimal daily maintenance'
          }
        }
        
        // Med-spa services maintenance analysis
        if (service.domain === 'med-spa') {
          if (service.category === 'Facial Treatments') {
            maintenanceLevel = 'moderate'
            maintenanceActions = ['Daily skincare routine', 'SPF protection', 'Regular treatments monthly']
            justification = 'Requires consistent skincare routine to maintain results'
          } else if (service.category === 'Hair Removal') {
            maintenanceLevel = 'low'
            maintenanceActions = ['Exfoliation', 'Moisturizing', 'Regular appointments every 4-6 weeks']
            justification = 'Natural regrowth cycle, minimal daily maintenance'
          } else if (service.category === 'Advanced Treatments') {
            maintenanceLevel = 'moderate'
            maintenanceActions = ['Specialized aftercare', 'Sun protection', 'Follow-up treatments']
            justification = 'Requires specific aftercare and potential series of treatments'
          }
        }
        
        return {
          service: service.name,
          id: service.id,
          domain: service.domain,
          category: service.category,
          maintenanceLevel,
          maintenanceActions,
          justification
        }
      })
      
      console.log('MAINTENANCE COMMITMENT BY LEVEL:')
      
      const byLevel = {
        low: maintenanceAnalysis.filter(s => s.maintenanceLevel === 'low'),
        moderate: maintenanceAnalysis.filter(s => s.maintenanceLevel === 'moderate'),
        high: maintenanceAnalysis.filter(s => s.maintenanceLevel === 'high'),
        professional: maintenanceAnalysis.filter(s => s.maintenanceLevel === 'professional')
      }
      
      Object.entries(byLevel).forEach(([level, services]) => {
        console.log(`\n${level.toUpperCase()} MAINTENANCE (${services.length} services):`)
        services.forEach(analysis => {
          console.log(`- ${analysis.service}:`)
          console.log(`  Actions: ${analysis.maintenanceActions.join(', ')}`)
          console.log(`  Justification: ${analysis.justification}`)
        })
      })
    })

    it('should analyze risk levels for each regular service', () => {
      console.log('\n=== RISK ANALYSIS ===')
      
      const riskAnalysis = allUnifiedServices.map(service => {
        let riskLevel: 'low' | 'moderate' | 'high' | 'extreme' = 'moderate'
        let riskFactors: string[] = []
        let consequences: string[] = []
        let justification = ''
        
        // Analyze risk based on service characteristics
        if (service.difficulty === 'Easy') {
          riskLevel = 'low'
        } else if (service.difficulty === 'Moderate') {
          riskLevel = 'moderate'
        } else if (service.difficulty === 'Advanced') {
          riskLevel = 'high'
        }
        
        // Domain-specific risk analysis
        if (service.domain === 'hair-salon') {
          if (service.category === 'Color Services') {
            if (service.name.includes('Full Color') || service.name.includes('Balayage')) {
              riskLevel = 'high'
              riskFactors = ['Chemical processing', 'Color matching', 'Hair damage potential']
              consequences = ['Uneven color', 'Hair breakage', 'Expensive correction needed']
              justification = 'Chemical processes can cause permanent damage if maintenance fails'
            } else if (service.name.includes('Root Touch-Up')) {
              riskLevel = 'moderate'
              riskFactors = ['Color matching', 'Regrowth visibility']
              consequences = ['Visible roots', 'Color mismatch', 'Professional correction needed']
              justification = 'Visible results when maintenance lapses, but reversible'
            }
          } else if (service.category === 'Extensions') {
            riskLevel = 'extreme'
            riskFactors = ['Hair damage', 'Tangling', 'Infection risk', 'Expensive maintenance']
            consequences = ['Severe hair breakage', 'Scalp damage', 'Complete removal needed', 'Natural hair loss']
            justification = 'Can cause permanent damage to natural hair if maintenance fails'
          } else if (service.category === 'Cuts & Styling') {
            riskLevel = 'low'
            riskFactors = ['Grows out naturally']
            consequences = ['Slightly less polished look']
            justification = 'Hair grows naturally, minimal consequences of maintenance lapse'
          }
        }
        
        if (service.domain === 'makeup-studio') {
          if (service.name.includes('Lash Extensions')) {
            riskLevel = 'high'
            riskFactors = ['Eye infection risk', 'Natural lash damage', 'Allergic reactions']
            consequences = ['Eye irritation', 'Natural lash loss', 'Professional removal needed']
            justification = 'Near eye area with potential for permanent lash damage'
          } else if (service.name.includes('Microblading') || service.name.includes('Permanent')) {
            riskLevel = 'extreme'
            riskFactors = ['Permanent results', 'Infection risk', 'Color changes over time']
            consequences = ['Permanent unwanted results', 'Expensive removal', 'Scarring']
            justification = 'Permanent modifications with long-term consequences'
          } else {
            riskLevel = 'low'
            riskFactors = ['Temporary results']
            consequences = ['Makeup wears off naturally']
            justification = 'Temporary services with no permanent consequences'
          }
        }
        
        if (service.domain === 'med-spa') {
          if (service.category === 'Advanced Treatments') {
            riskLevel = 'moderate'
            riskFactors = ['Skin sensitivity', 'Professional equipment']
            consequences = ['Skin irritation', 'Temporary redness', 'Results may vary']
            justification = 'Professional treatments with potential for skin reactions'
          } else if (service.category === 'Hair Removal') {
            riskLevel = 'moderate'
            riskFactors = ['Skin sensitivity', 'Ingrown hairs', 'Pain tolerance']
            consequences = ['Skin irritation', 'Ingrown hairs', 'Temporary discomfort']
            justification = 'Physical hair removal with potential for skin reactions'
          } else {
            riskLevel = 'low'
            riskFactors = ['Gentle treatments']
            consequences = ['Minimal side effects']
            justification = 'Non-invasive treatments with minimal risk'
          }
        }
        
        return {
          service: service.name,
          id: service.id,
          riskLevel,
          riskFactors,
          consequences,
          justification
        }
      })
      
      console.log('RISK LEVELS BY CATEGORY:')
      
      const byRisk = {
        low: riskAnalysis.filter(s => s.riskLevel === 'low'),
        moderate: riskAnalysis.filter(s => s.riskLevel === 'moderate'),
        high: riskAnalysis.filter(s => s.riskLevel === 'high'),
        extreme: riskAnalysis.filter(s => s.riskLevel === 'extreme')
      }
      
      Object.entries(byRisk).forEach(([level, services]) => {
        console.log(`\n${level.toUpperCase()} RISK (${services.length} services):`)
        services.forEach(analysis => {
          console.log(`- ${analysis.service}:`)
          console.log(`  Risk Factors: ${analysis.riskFactors.join(', ')}`)
          console.log(`  Consequences: ${analysis.consequences.join(', ')}`)
          console.log(`  Justification: ${analysis.justification}`)
        })
      })
    })

    it('should analyze service frequency requirements', () => {
      console.log('\n=== SERVICE FREQUENCY ANALYSIS ===')
      
      const frequencyAnalysis = allUnifiedServices.map(service => {
        let frequency: 'one-time' | 'monthly' | 'bi-monthly' | 'quarterly' | 'bi-annual' = 'quarterly'
        let frequencyJustification = ''
        let optimalSchedule = ''
        
        // Analyze frequency based on service type and maintenance needs
        if (service.domain === 'hair-salon') {
          if (service.category === 'Cuts & Styling') {
            if (service.name.includes('Precision Cut')) {
              frequency = 'bi-monthly'
              optimalSchedule = 'Every 6-8 weeks'
              frequencyJustification = 'Hair grows approximately 0.5 inches per month, cut shape maintained for 6-8 weeks'
            } else if (service.name.includes('Blowout')) {
              frequency = 'one-time'
              optimalSchedule = 'As needed for events'
              frequencyJustification = 'Temporary styling lasting 2-3 days, event-based service'
            }
          } else if (service.category === 'Color Services') {
            if (service.name.includes('Root Touch-Up')) {
              frequency = 'monthly'
              optimalSchedule = 'Every 4-6 weeks'
              frequencyJustification = 'Hair grows 0.5 inches monthly, roots become visible after 4-6 weeks'
            } else if (service.name.includes('Balayage')) {
              frequency = 'quarterly'
              optimalSchedule = 'Every 3-4 months'
              frequencyJustification = 'Designed to grow out naturally, maintenance needed quarterly'
            } else if (service.name.includes('Full Color')) {
              frequency = 'bi-monthly'
              optimalSchedule = 'Every 6-8 weeks'
              frequencyJustification = 'All-over color shows regrowth faster than highlights'
            }
          } else if (service.category === 'Extensions') {
            frequency = 'monthly'
            optimalSchedule = 'Every 4-6 weeks'
            frequencyJustification = 'Extensions need repositioning as natural hair grows'
          }
        }
        
        if (service.domain === 'makeup-studio') {
          if (service.name.includes('Lash Extensions')) {
            frequency = 'bi-monthly'
            optimalSchedule = 'Fills every 2-3 weeks'
            frequencyJustification = 'Natural lash cycle requires regular fills to maintain fullness'
          } else if (service.name.includes('Eyebrow Threading')) {
            frequency = 'monthly'
            optimalSchedule = 'Every 3-4 weeks'
            frequencyJustification = 'Eyebrow hair regrowth cycle averages 3-4 weeks'
          } else if (service.name.includes('Lesson') || service.name.includes('Consultation')) {
            frequency = 'one-time'
            optimalSchedule = 'As needed for skill updates'
            frequencyJustification = 'Knowledge-based service, occasional refreshers beneficial'
          }
        }
        
        if (service.domain === 'med-spa') {
          if (service.category === 'Facial Treatments') {
            frequency = 'monthly'
            optimalSchedule = 'Every 4-6 weeks'
            frequencyJustification = 'Skin cell turnover cycle is 28 days, monthly treatments optimal'
          } else if (service.category === 'Hair Removal') {
            frequency = 'bi-monthly'
            optimalSchedule = 'Every 4-6 weeks'
            frequencyJustification = 'Hair growth cycle requires 4-6 weeks for optimal removal'
          } else if (service.category === 'Advanced Treatments') {
            frequency = 'quarterly'
            optimalSchedule = 'Every 3-4 months'
            frequencyJustification = 'Advanced treatments have longer-lasting effects'
          }
        }
        
        return {
          service: service.name,
          id: service.id,
          frequency,
          optimalSchedule,
          frequencyJustification
        }
      })
      
      console.log('SERVICE FREQUENCY REQUIREMENTS:')
      
      const byFrequency = {
        'one-time': frequencyAnalysis.filter(s => s.frequency === 'one-time'),
        'monthly': frequencyAnalysis.filter(s => s.frequency === 'monthly'),
        'bi-monthly': frequencyAnalysis.filter(s => s.frequency === 'bi-monthly'),
        'quarterly': frequencyAnalysis.filter(s => s.frequency === 'quarterly'),
        'bi-annual': frequencyAnalysis.filter(s => s.frequency === 'bi-annual')
      }
      
      Object.entries(byFrequency).forEach(([freq, services]) => {
        console.log(`\n${freq.toUpperCase()} FREQUENCY (${services.length} services):`)
        services.forEach(analysis => {
          console.log(`- ${analysis.service}:`)
          console.log(`  Schedule: ${analysis.optimalSchedule}`)
          console.log(`  Justification: ${analysis.frequencyJustification}`)
        })
      })
    })
  })

  describe('Event-Based Services Analysis', () => {
    it('should analyze event-based services with different criteria', () => {
      console.log('\n=== EVENT-BASED SERVICES ANALYSIS ===')
      
      const eventServices = allUnifiedServices.filter(service => 
        service.userJourneys?.includes('special-occasion') ||
        service.name.toLowerCase().includes('bridal') ||
        service.name.toLowerCase().includes('event')
      )
      
      console.log(`Found ${eventServices.length} event-based services:`)
      
      const eventAnalysis = eventServices.map(service => {
        let eventCriteria = {
          timingSensitivity: 'high' as 'low' | 'moderate' | 'high' | 'critical',
          durabilityNeeds: 'long' as 'short' | 'medium' | 'long' | 'all-day',
          stressResistance: 'high' as 'low' | 'moderate' | 'high' | 'extreme',
          photographability: 'critical' as 'low' | 'moderate' | 'high' | 'critical',
          justification: ''
        }
        
        // Analyze event-specific requirements
        if (service.name.includes('Bridal') || service.name.includes('Wedding')) {
          eventCriteria = {
            timingSensitivity: 'critical',
            durabilityNeeds: 'all-day',
            stressResistance: 'extreme',
            photographability: 'critical',
            justification: 'Wedding day requires perfection lasting 12+ hours under high stress and photography'
          }
        } else if (service.userJourneys?.includes('special-occasion')) {
          if (service.domain === 'makeup-studio') {
            eventCriteria = {
              timingSensitivity: 'high',
              durabilityNeeds: 'long',
              stressResistance: 'high',
              photographability: 'critical',
              justification: 'Special events require long-lasting makeup that photographs well'
            }
          } else if (service.domain === 'hair-salon') {
            eventCriteria = {
              timingSensitivity: 'high',
              durabilityNeeds: 'long',
              stressResistance: 'moderate',
              photographability: 'high',
              justification: 'Event hairstyles must hold throughout celebration and look good in photos'
            }
          }
        }
        
        return {
          service: service.name,
          id: service.id,
          domain: service.domain,
          ...eventCriteria
        }
      })
      
      console.log('\nEVENT SERVICE REQUIREMENTS:')
      eventAnalysis.forEach(analysis => {
        console.log(`\n- ${analysis.service} (${analysis.domain}):`)
        console.log(`  Timing Sensitivity: ${analysis.timingSensitivity}`)
        console.log(`  Durability Needs: ${analysis.durabilityNeeds}`)
        console.log(`  Stress Resistance: ${analysis.stressResistance}`)
        console.log(`  Photographability: ${analysis.photographability}`)
        console.log(`  Justification: ${analysis.justification}`)
      })
    })
  })

  describe('Universal vs Selective Experience Vectors', () => {
    it('should identify which experience vectors apply universally vs selectively', () => {
      console.log('\n=== EXPERIENCE VECTORS ANALYSIS ===')
      
      console.log('UNIVERSAL VECTORS (apply to all services):')
      console.log('1. MAINTENANCE COMMITMENT')
      console.log('   - Justification: Every service requires some level of upkeep')
      console.log('   - Application: All services have maintenance requirements from low to professional')
      console.log('   - Impact: Affects service confidence based on user willingness to maintain')
      
      console.log('\n2. RISK TOLERANCE')
      console.log('   - Justification: Every service has potential consequences if things go wrong')
      console.log('   - Application: Risk levels from low (cuts) to extreme (permanent procedures)')
      console.log('   - Impact: Conservative users avoid high-risk services')
      
      console.log('\nSELECTIVE VECTORS (apply to specific service types):')
      
      console.log('\n3. SERVICE FREQUENCY (Regular services only)')
      console.log('   - Justification: Only applies to services requiring regular maintenance')
      console.log('   - Application: Monthly, bi-monthly, quarterly schedules')
      console.log('   - Impact: Affects confidence for users with different scheduling preferences')
      console.log('   - Excludes: One-time services, event-based services')
      
      console.log('\n4. EVENT TIMING SENSITIVITY (Event services only)')
      console.log('   - Justification: Only applies to special occasion services')
      console.log('   - Application: Critical timing for weddings, moderate for parties')
      console.log('   - Impact: Affects confidence based on event importance and timing')
      console.log('   - Excludes: Regular maintenance services')
      
      console.log('\n5. DURABILITY REQUIREMENTS (Event services only)')
      console.log('   - Justification: Event services need to last specific durations')
      console.log('   - Application: All-day for weddings, long for parties, medium for photos')
      console.log('   - Impact: Affects service selection based on event duration')
      console.log('   - Excludes: Regular services with flexible timing')
      
      console.log('\n6. STRESS RESISTANCE (Event services only)')
      console.log('   - Justification: Event services face emotional and physical stress')
      console.log('   - Application: Extreme for weddings, high for important events')
      console.log('   - Impact: Services must withstand crying, dancing, weather')
      console.log('   - Excludes: Regular services in controlled environments')
      
      console.log('\nCONFIDENCE SCORING IMPLICATIONS:')
      console.log('- Regular services: Maintenance + Risk + Frequency vectors')
      console.log('- Event services: Maintenance + Risk + Timing + Durability + Stress vectors')
      console.log('- Universal vectors always apply, selective vectors only for relevant services')
      console.log('- Each vector contributes to overall service confidence score')
    })
  })

  describe('Numerical Justification Framework', () => {
    it('should establish the framework for justifying all numerical decisions', () => {
      console.log('\n=== NUMERICAL JUSTIFICATION FRAMEWORK ===')
      
      console.log('EVERY NUMERICAL DECISION MUST BE JUSTIFIED WITH:')
      
      console.log('\n1. SERVICE ANALYSIS DATA:')
      console.log('   - Maintenance requirements (documented above)')
      console.log('   - Risk factors and consequences (documented above)')
      console.log('   - Frequency requirements (documented above)')
      console.log('   - Event-specific criteria (documented above)')
      
      console.log('\n2. BUSINESS LOGIC:')
      console.log('   - High maintenance services get negative modifiers for low-commitment users')
      console.log('   - High risk services get negative modifiers for conservative users')
      console.log('   - High frequency services get negative modifiers for occasional users')
      console.log('   - Event services get positive modifiers for event-planning users')
      
      console.log('\n3. MATHEMATICAL RELATIONSHIPS:')
      console.log('   - Base confidence = service inherent appropriateness (0.1-0.9)')
      console.log('   - Modifiers = impact of user profile on service suitability (-0.5 to +0.5)')
      console.log('   - Final score = base + sum of modifiers, clamped to [0,1]')
      
      console.log('\n4. VALIDATION REQUIREMENTS:')
      console.log('   - Each modifier value must reference specific service characteristics')
      console.log('   - Each base confidence must reference service complexity and risk')
      console.log('   - Each threshold must reference business outcomes and user satisfaction')
      
      console.log('\nEXAMPLE JUSTIFIED DECISION:')
      console.log('Hair Extensions base confidence = 0.2')
      console.log('Justification: High maintenance (professional level), high risk (hair damage),')
      console.log('expensive maintenance (monthly appointments), only suitable for committed users')
      console.log('Supporting data: Requires daily specialized care, 4-6 week maintenance cycle,')
      console.log('potential for permanent hair damage if maintenance fails')
      
      console.log('\nPrecision Cut base confidence = 0.8')
      console.log('Justification: Low maintenance (6-8 week trims), low risk (grows out naturally),')
      console.log('suitable for most users regardless of commitment level')
      console.log('Supporting data: Natural hair growth, minimal daily care, reversible results')
    })
  })
})
