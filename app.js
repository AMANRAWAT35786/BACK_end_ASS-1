// ============================================================
//  app.js — Module Reusability Demo
//  Demonstrates importing and using custom modules:
//    - modules/isEven.js
//    - modules/logger.js
// ============================================================

const { isEven, isOdd, getEvenNumbers, getOddNumbers } = require('./modules/isEven');
const logger = require('./modules/logger');

// ── Banner ────────────────────────────────────────────────────
console.log('\x1b[1m\x1b[36m');
console.log('=========================================');
console.log('  Smart Utility Toolkit — Module Demo    ');
console.log('=========================================');
console.log('\x1b[0m');

// ── Logger Module Demo ────────────────────────────────────────
logger.info('Application started — testing custom modules.');
logger.debug('Loading isEven and logger modules via require()');

// ── isEven Module Demo ────────────────────────────────────────
logger.info('--- isEven Module Demo ---');

const testNumbers = [1, 2, 3, 4, 7, 10, 13, 22, 99, 100];

testNumbers.forEach((num) => {
  if (isEven(num)) {
    logger.success(`${num} is EVEN`);
  } else {
    logger.warn(`${num} is ODD`);
  }
});

// ── getEvenNumbers & getOddNumbers Demo ───────────────────────
logger.info('--- Filtering Arrays ---');

const evens = getEvenNumbers(testNumbers);
const odds  = getOddNumbers(testNumbers);

logger.success(`Even numbers from array: [${evens.join(', ')}]`);
logger.warn(`Odd  numbers from array: [${odds.join(', ')}]`);

// ── Error Handling Demo ───────────────────────────────────────
logger.info('--- Error Handling Demo ---');

try {
  isEven('hello'); // should throw
} catch (err) {
  logger.error(`Caught expected error: ${err.message}`);
}

// ── Done ──────────────────────────────────────────────────────
logger.info('Module demo complete. Exiting.');
