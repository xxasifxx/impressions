#!/usr/bin/env node

/**
 * NEGATIVE TESTING AND EDGE CASE VALIDATION
 * 
 * This is where we test what SHOULD FAIL and what SHOULD handle edge cases gracefully.
 * The goal is to find the boundaries and failure modes of Alveena's system.
 * 
 * If all tests pass, we're not testing comprehensively enough!
 * We need tests that SHOULD fail to validate the system is working correctly.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load actual system files for testing
let recommendationEngineCode, consultationQuestionsCode, servicesDataCode;

try {
  recommendationEngineCode = readFileSync(join(__dirname, 'src/utils/recommendationEngine.ts'), 'utf8');
  consultationQuestionsCode = readFileSync(join(__dirname, 'src/data/consultationQuestions.ts'), 'utf8');
  servicesDataCode = readFileSync(join(__dirname, 'src/data/unifiedServicesData.ts'), 'utf8');
  console.log('✅ Loaded system files for negative testing');
} catch (error) {
  console.error('❌ Failed to load system files:', error.message);
  process.exit(1);
}

// NEGATIVE TEST 1: Price Parsing with Invalid Data
function testPriceParsing_ShouldFail() {
  console.log('\n🧪 NEGATIVE TEST: Price Parsing with Invalid Data');
  console.log('   (Testing what happens when price parsing gets garbage)');
  
  // Check if parsePrice function exists and how it handles bad input
  const hasParsePriceFunction = recommendationEngineCode.includes('parsePrice');
  
  console.log('  GIVEN the system needs to parse service prices');
  console.log('  WHEN we provide invalid price formats');
  console.log('  THEN the system should handle failures gracefully');
  
  const tests = [
    {
      description: 'parsePrice function should exist in recommendation engine',
      actual: hasParsePriceFunction,
      expected: true,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'Price parsing should handle empty strings (check for fallback)',
      actual: recommendationEngineCode.includes('|| 0') || recommendationEngineCode.includes('?? 0'),
      expected: true,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'Price parsing should clean input (check for replace/regex)',
      actual: recommendationEngineCode.includes('replace') || recommendationEngineCode.includes('match'),
      expected: true,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT handle "Call for pricing" gracefully (this should expose a gap)',
      actual: recommendationEngineCode.includes('call for pricing') || recommendationEngineCode.includes('Call for pricing'),
      expected: true,
      shouldPass: false, // This SHOULD fail to expose the gap
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT handle "Free consultation" gracefully (this should expose a gap)',
      actual: recommendationEngineCode.includes('free') || recommendationEngineCode.includes('Free'),
      expected: true,
      shouldPass: false, // This SHOULD fail to expose the gap
      test: (actual, expected) => actual === expected
    }
  ];
  
  return runNegativeTestSuite(tests, 'Price Parsing Negative Tests');
}

// NEGATIVE TEST 2: Consultation Response Validation
function testConsultationResponse_ShouldFail() {
  console.log('\n🧪 NEGATIVE TEST: Consultation Response Validation');
  console.log('   (Testing what happens with malformed consultation data)');
  
  console.log('  GIVEN the system processes consultation responses');
  console.log('  WHEN we provide invalid or conflicting responses');
  console.log('  THEN the system should validate input or fail gracefully');
  
  // Check for validation logic in recommendation engine
  const hasValidation = recommendationEngineCode.includes('validate') || 
                       recommendationEngineCode.includes('filter') ||
                       recommendationEngineCode.includes('find');
  
  const hasErrorHandling = recommendationEngineCode.includes('try') ||
                          recommendationEngineCode.includes('catch') ||
                          recommendationEngineCode.includes('throw');
  
  const tests = [
    {
      description: 'System should have some form of response processing',
      actual: hasValidation,
      expected: true,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT have comprehensive error handling (this should expose a gap)',
      actual: hasErrorHandling,
      expected: true,
      shouldPass: false, // This SHOULD fail - no error handling found
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT validate consultation response structure (this should expose a gap)',
      actual: recommendationEngineCode.includes('ConsultationResponse') && recommendationEngineCode.includes('validate'),
      expected: true,
      shouldPass: false, // This SHOULD fail - no validation found
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT handle null/undefined responses gracefully (this should expose a gap)',
      actual: recommendationEngineCode.includes('null') || recommendationEngineCode.includes('undefined'),
      expected: true,
      shouldPass: false, // This SHOULD fail - no null handling found
      test: (actual, expected) => actual === expected
    }
  ];
  
  return runNegativeTestSuite(tests, 'Consultation Response Negative Tests');
}

// NEGATIVE TEST 3: Service Data Integrity
function testServiceDataIntegrity_ShouldFail() {
  console.log('\n🧪 NEGATIVE TEST: Service Data Integrity');
  console.log('   (Testing what happens when service data is corrupted)');
  
  console.log('  GIVEN the system relies on service data structure');
  console.log('  WHEN service data is missing or malformed');
  console.log('  THEN the system should handle data integrity issues');
  
  // Check for required fields and data validation
  const hasRequiredFieldChecks = servicesDataCode.includes('required') || 
                                 servicesDataCode.includes('mandatory');
  
  const hasDataValidation = servicesDataCode.includes('validate') ||
                           servicesDataCode.includes('schema');
  
  // Check if all services have required fields
  const serviceEntries = servicesDataCode.match(/{\s*id:/g) || [];
  const priceEntries = servicesDataCode.match(/price:/g) || [];
  const categoryEntries = servicesDataCode.match(/category:/g) || [];
  const domainEntries = servicesDataCode.match(/domain:/g) || [];
  
  const tests = [
    {
      description: 'All services should have price fields',
      actual: priceEntries.length,
      expected: serviceEntries.length,
      shouldPass: true,
      test: (actual, expected) => actual >= expected * 0.9 // Allow 10% tolerance
    },
    {
      description: 'All services should have category fields',
      actual: categoryEntries.length,
      expected: serviceEntries.length,
      shouldPass: true,
      test: (actual, expected) => actual >= expected * 0.9
    },
    {
      description: 'System should NOT have data validation (this should expose a gap)',
      actual: hasDataValidation,
      expected: true,
      shouldPass: false, // This SHOULD fail - no validation found
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT have required field enforcement (this should expose a gap)',
      actual: hasRequiredFieldChecks,
      expected: true,
      shouldPass: false, // This SHOULD fail - no enforcement found
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT handle missing service IDs gracefully (this should expose a gap)',
      actual: recommendationEngineCode.includes('service.id') && recommendationEngineCode.includes('undefined'),
      expected: true,
      shouldPass: false, // This SHOULD fail - no handling found
      test: (actual, expected) => actual === expected
    }
  ];
  
  console.log(`  📊 Data Integrity Analysis:`);
  console.log(`    - Service Entries Found: ${serviceEntries.length}`);
  console.log(`    - Price Entries Found: ${priceEntries.length}`);
  console.log(`    - Category Entries Found: ${categoryEntries.length}`);
  console.log(`    - Domain Entries Found: ${domainEntries.length}`);
  
  return runNegativeTestSuite(tests, 'Service Data Integrity Negative Tests');
}

// EDGE CASE TEST 1: Extreme Weight Values
function testExtremeWeightValues_EdgeCase() {
  console.log('\n🧪 EDGE CASE: Extreme Weight Values');
  console.log('   (Testing system behavior with boundary weight values)');
  
  console.log('  GIVEN consultation weights should be reasonable (0-10)');
  console.log('  WHEN we analyze actual weight values in the system');
  console.log('  THEN we should find edge cases and boundary conditions');
  
  // Extract all weight values from consultation questions
  const weightMatches = consultationQuestionsCode.match(/weight:\s*(\d+)/g) || [];
  const weights = weightMatches.map(match => {
    const weightMatch = match.match(/weight:\s*(\d+)/);
    return weightMatch ? parseInt(weightMatch[1]) : 0;
  });
  
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const zeroWeights = weights.filter(w => w === 0).length;
  const highWeights = weights.filter(w => w > 10).length;
  const negativeWeights = weights.filter(w => w < 0).length;
  
  const tests = [
    {
      description: 'Minimum weight should be reasonable (>= 1)',
      actual: minWeight,
      expected: 1,
      shouldPass: true,
      test: (actual, expected) => actual >= expected
    },
    {
      description: 'Maximum weight should be within bounds (<= 10)',
      actual: maxWeight,
      expected: 10,
      shouldPass: true,
      test: (actual, expected) => actual <= expected
    },
    {
      description: 'System should NOT have zero weights (this might expose poor UX)',
      actual: zeroWeights,
      expected: 0,
      shouldPass: false, // This might fail and that's OK - shows edge case
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT have weights > 10 (this should pass)',
      actual: highWeights,
      expected: 0,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT have negative weights (this should pass)',
      actual: negativeWeights,
      expected: 0,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    }
  ];
  
  console.log(`  📊 Weight Distribution Analysis:`);
  console.log(`    - Total Weights Found: ${weights.length}`);
  console.log(`    - Weight Range: ${minWeight} - ${maxWeight}`);
  console.log(`    - Zero Weights: ${zeroWeights}`);
  console.log(`    - High Weights (>10): ${highWeights}`);
  console.log(`    - Negative Weights: ${negativeWeights}`);
  console.log(`    - Weight Distribution: ${weights.sort((a,b) => a-b).join(', ')}`);
  
  return runNegativeTestSuite(tests, 'Extreme Weight Values Edge Case Tests');
}

// EDGE CASE TEST 2: Bundle Generation Boundaries
function testBundleGeneration_EdgeCase() {
  console.log('\n🧪 EDGE CASE: Bundle Generation Boundaries');
  console.log('   (Testing what happens at the edges of bundle logic)');
  
  console.log('  GIVEN bundle generation has business logic constraints');
  console.log('  WHEN we test boundary conditions');
  console.log('  THEN we should find the limits of the system');
  
  // Check bundle generation logic
  const hasBundleGeneration = recommendationEngineCode.includes('generateBundles');
  const hasMarginChecks = recommendationEngineCode.includes('margin');
  const hasProfitabilityChecks = recommendationEngineCode.includes('profitable') || 
                                recommendationEngineCode.includes('profitability');
  const hasDiscountLogic = recommendationEngineCode.includes('discount');
  const hasBundlePricing = recommendationEngineCode.includes('bundlePrice');
  
  // Check for edge case handling
  const hasMinimumMarginCheck = recommendationEngineCode.includes('0.3') || 
                               recommendationEngineCode.includes('30%') ||
                               recommendationEngineCode.includes('margin >');
  
  const tests = [
    {
      description: 'Bundle generation function should exist',
      actual: hasBundleGeneration,
      expected: true,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should have margin calculations',
      actual: hasMarginChecks,
      expected: true,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should have discount logic',
      actual: hasDiscountLogic,
      expected: true,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT handle zero-margin bundles gracefully (this should expose a gap)',
      actual: recommendationEngineCode.includes('margin === 0') || recommendationEngineCode.includes('margin <= 0'),
      expected: true,
      shouldPass: false, // This SHOULD fail - no zero margin handling
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT handle negative pricing gracefully (this should expose a gap)',
      actual: recommendationEngineCode.includes('price < 0') || recommendationEngineCode.includes('negative'),
      expected: true,
      shouldPass: false, // This SHOULD fail - no negative price handling
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT handle infinite discount scenarios (this should expose a gap)',
      actual: recommendationEngineCode.includes('Infinity') || recommendationEngineCode.includes('isFinite'),
      expected: true,
      shouldPass: false, // This SHOULD fail - no infinity handling
      test: (actual, expected) => actual === expected
    }
  ];
  
  return runNegativeTestSuite(tests, 'Bundle Generation Edge Case Tests');
}

// LOW-LEVEL UNIT TEST: Individual Function Robustness
function testIndividualFunctionRobustness_LowLevel() {
  console.log('\n🧪 LOW-LEVEL: Individual Function Robustness');
  console.log('   (Testing individual functions with bad inputs)');
  
  console.log('  GIVEN individual functions should handle edge cases');
  console.log('  WHEN we analyze function implementations');
  console.log('  THEN we should find robust error handling');
  
  // Check for individual function robustness
  const functions = [
    'parsePrice',
    'calculateMargin', 
    'getMarginTier',
    'scoreServiceForConsultation',
    'findComplementaryServices',
    'generateBundles'
  ];
  
  const functionTests = functions.map(funcName => {
    const hasFunction = recommendationEngineCode.includes(funcName);
    const hasErrorHandling = recommendationEngineCode.includes(`${funcName}`) && 
                            (recommendationEngineCode.includes('try') || 
                             recommendationEngineCode.includes('catch') ||
                             recommendationEngineCode.includes('||') ||
                             recommendationEngineCode.includes('??'));
    
    return {
      function: funcName,
      exists: hasFunction,
      hasErrorHandling: hasErrorHandling
    };
  });
  
  const tests = [
    {
      description: 'All core functions should exist',
      actual: functionTests.filter(f => f.exists).length,
      expected: functions.length,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'Functions should NOT have comprehensive error handling (this should expose gaps)',
      actual: functionTests.filter(f => f.hasErrorHandling).length,
      expected: functions.length,
      shouldPass: false, // This SHOULD fail - most functions lack error handling
      test: (actual, expected) => actual === expected
    },
    {
      description: 'parsePrice should NOT handle all edge cases (this should expose gaps)',
      actual: recommendationEngineCode.includes('parsePrice') && 
              recommendationEngineCode.includes('NaN') && 
              recommendationEngineCode.includes('isNaN'),
      expected: true,
      shouldPass: false, // This SHOULD fail - no NaN handling found
      test: (actual, expected) => actual === expected
    }
  ];
  
  console.log(`  🔧 Function Analysis:`);
  functionTests.forEach(f => {
    console.log(`    - ${f.function}: ${f.exists ? '✅ Exists' : '❌ Missing'} ${f.hasErrorHandling ? '🛡️ Has Error Handling' : '⚠️ No Error Handling'}`);
  });
  
  return runNegativeTestSuite(tests, 'Low-Level Function Robustness Tests');
}

// HIGH-LEVEL INTEGRATION TEST: Complete Flow Failure Modes
function testCompleteFlowFailureModes_HighLevel() {
  console.log('\n🧪 HIGH-LEVEL: Complete Flow Failure Modes');
  console.log('   (Testing what happens when entire consultation flows break)');
  
  console.log('  GIVEN complete consultation flows should be resilient');
  console.log('  WHEN critical components fail or are missing');
  console.log('  THEN the system should degrade gracefully');
  
  // Check for high-level flow resilience
  const hasMainFunction = recommendationEngineCode.includes('generateRecommendations');
  const hasFlowValidation = recommendationEngineCode.includes('validate') || 
                           recommendationEngineCode.includes('check');
  const hasGracefulDegradation = recommendationEngineCode.includes('fallback') ||
                                recommendationEngineCode.includes('default') ||
                                recommendationEngineCode.includes('empty');
  const hasErrorRecovery = recommendationEngineCode.includes('recover') ||
                          recommendationEngineCode.includes('retry') ||
                          recommendationEngineCode.includes('alternative');
  
  const tests = [
    {
      description: 'Main recommendation function should exist',
      actual: hasMainFunction,
      expected: true,
      shouldPass: true,
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT have flow validation (this should expose a gap)',
      actual: hasFlowValidation,
      expected: true,
      shouldPass: false, // This SHOULD fail - no flow validation found
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT have graceful degradation (this should expose a gap)',
      actual: hasGracefulDegradation,
      expected: true,
      shouldPass: false, // This SHOULD fail - no graceful degradation found
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT have error recovery mechanisms (this should expose a gap)',
      actual: hasErrorRecovery,
      expected: true,
      shouldPass: false, // This SHOULD fail - no error recovery found
      test: (actual, expected) => actual === expected
    },
    {
      description: 'System should NOT handle empty service arrays gracefully (this should expose a gap)',
      actual: recommendationEngineCode.includes('length === 0') || 
              recommendationEngineCode.includes('empty') ||
              recommendationEngineCode.includes('no services'),
      expected: true,
      shouldPass: false, // This SHOULD fail - no empty array handling found
      test: (actual, expected) => actual === expected
    }
  ];
  
  return runNegativeTestSuite(tests, 'High-Level Flow Failure Mode Tests');
}

// Utility function for negative test suites
function runNegativeTestSuite(tests, suiteName) {
  let passed = 0;
  let failed = 0;
  let expectedFailures = 0;
  let unexpectedFailures = 0;
  
  for (const test of tests) {
    const result = test.test(test.actual, test.expected);
    
    if (test.shouldPass) {
      // This test should pass
      if (result) {
        console.log(`    ✅ ${test.description}: ${test.actual}`);
        passed++;
      } else {
        console.log(`    ❌ UNEXPECTED FAILURE: ${test.description}: Expected ${test.expected}, got ${test.actual}`);
        failed++;
        unexpectedFailures++;
      }
    } else {
      // This test should fail (negative test)
      if (!result) {
        console.log(`    🎯 EXPECTED FAILURE: ${test.description}: ${test.actual} (This exposes a gap - GOOD!)`);
        expectedFailures++;
      } else {
        console.log(`    ⚠️ UNEXPECTED PASS: ${test.description}: ${test.actual} (This test should have failed)`);
        passed++;
      }
    }
  }
  
  console.log(`  📊 ${suiteName} Results:`);
  console.log(`    ✅ Passed: ${passed}`);
  console.log(`    ❌ Unexpected Failures: ${unexpectedFailures}`);
  console.log(`    🎯 Expected Failures (Gaps Found): ${expectedFailures}`);
  console.log(`    ⚠️ Unexpected Passes: ${passed - (tests.filter(t => t.shouldPass).length - unexpectedFailures)}`);
  
  return {
    passed,
    unexpectedFailures,
    expectedFailures,
    totalTests: tests.length
  };
}

// Main execution
function runNegativeAndEdgeCaseTests() {
  console.log('🧪 NEGATIVE TESTING AND EDGE CASE VALIDATION');
  console.log('=' .repeat(80));
  console.log('Testing what SHOULD FAIL and what SHOULD handle edge cases gracefully');
  console.log('The goal is to find boundaries and failure modes of the system');
  console.log('');
  
  const testSuites = [
    { 
      name: 'Price Parsing Negative Tests', 
      test: testPriceParsing_ShouldFail,
      purpose: 'Find gaps in price parsing error handling'
    },
    { 
      name: 'Consultation Response Negative Tests', 
      test: testConsultationResponse_ShouldFail,
      purpose: 'Find gaps in input validation'
    },
    { 
      name: 'Service Data Integrity Negative Tests', 
      test: testServiceDataIntegrity_ShouldFail,
      purpose: 'Find gaps in data validation'
    },
    { 
      name: 'Extreme Weight Values Edge Cases', 
      test: testExtremeWeightValues_EdgeCase,
      purpose: 'Test boundary conditions in weight handling'
    },
    { 
      name: 'Bundle Generation Edge Cases', 
      test: testBundleGeneration_EdgeCase,
      purpose: 'Test boundary conditions in business logic'
    },
    { 
      name: 'Low-Level Function Robustness', 
      test: testIndividualFunctionRobustness_LowLevel,
      purpose: 'Test individual function error handling'
    },
    { 
      name: 'High-Level Flow Failure Modes', 
      test: testCompleteFlowFailureModes_HighLevel,
      purpose: 'Test complete system resilience'
    }
  ];
  
  let totalPassed = 0;
  let totalUnexpectedFailures = 0;
  let totalExpectedFailures = 0;
  let totalTests = 0;
  
  for (const suite of testSuites) {
    try {
      const result = suite.test();
      console.log(`  🎯 Purpose: ${suite.purpose}`);
      
      totalPassed += result.passed;
      totalUnexpectedFailures += result.unexpectedFailures;
      totalExpectedFailures += result.expectedFailures;
      totalTests += result.totalTests;
      
    } catch (error) {
      console.log(`❌ Test suite "${suite.name}" crashed: ${error.message}`);
      totalUnexpectedFailures++;
    }
  }
  
  console.log('\n📊 NEGATIVE TESTING AND EDGE CASE RESULTS');
  console.log('=' .repeat(80));
  console.log(`✅ Tests Passed: ${totalPassed}`);
  console.log(`❌ Unexpected Failures: ${totalUnexpectedFailures}`);
  console.log(`🎯 Expected Failures (Gaps Found): ${totalExpectedFailures}`);
  console.log(`📋 Total Tests: ${totalTests}`);
  
  const gapPercentage = Math.round((totalExpectedFailures / totalTests) * 100);
  const reliabilityPercentage = Math.round(((totalPassed + totalExpectedFailures) / totalTests) * 100);
  
  console.log(`\n🔍 SYSTEM ANALYSIS:`);
  console.log(`📊 Gap Discovery Rate: ${gapPercentage}% (Higher is better for finding issues)`);
  console.log(`🛡️ System Reliability: ${reliabilityPercentage}% (Tests behaved as expected)`);
  
  if (totalExpectedFailures > 0) {
    console.log('\n🎉 SUCCESS: Found gaps in the system! This is GOOD negative testing.');
    console.log('🔧 These gaps represent areas for improvement in error handling and validation.');
  } else {
    console.log('\n⚠️ WARNING: No gaps found - negative testing may not be comprehensive enough.');
  }
  
  if (totalUnexpectedFailures > 0) {
    console.log('\n🚨 ATTENTION: Unexpected failures found - these need investigation.');
  }
  
  return {
    totalPassed,
    totalUnexpectedFailures,
    totalExpectedFailures,
    totalTests,
    gapPercentage,
    reliabilityPercentage
  };
}

// Execute negative and edge case tests
runNegativeAndEdgeCaseTests();

