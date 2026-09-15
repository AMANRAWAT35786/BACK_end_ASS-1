// ============================================================
//  dice.js — Random Dice Generator using the crypto module
// ============================================================
//  Uses crypto.randomBytes() for cryptographically secure
//  random number generation (not Math.random()).
//
//  Run: node dice.js
//  Bonus: Saves roll history to dice_history.txt
// ============================================================

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const logger = require('./modules/logger');

// ── ANSI Colors ───────────────────────────────────────────────
const C = {
  reset:   '\x1b[0m',
  bright:  '\x1b[1m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  red:     '\x1b[31m',
  cyan:    '\x1b[36m',
  magenta: '\x1b[35m',
  blue:    '\x1b[34m',
};

// ── Dice Face ASCII Art ───────────────────────────────────────
const DICE_FACES = {
  1: ['┌─────────┐', '│         │', '│    ●    │', '│         │', '└─────────┘'],
  2: ['┌─────────┐', '│  ●      │', '│         │', '│      ●  │', '└─────────┘'],
  3: ['┌─────────┐', '│  ●      │', '│    ●    │', '│      ●  │', '└─────────┘'],
  4: ['┌─────────┐', '│  ●   ●  │', '│         │', '│  ●   ●  │', '└─────────┘'],
  5: ['┌─────────┐', '│  ●   ●  │', '│    ●    │', '│  ●   ●  │', '└─────────┘'],
  6: ['┌─────────┐', '│  ●   ●  │', '│  ●   ●  │', '│  ●   ●  │', '└─────────┘'],
};

// ── Core: Secure Dice Roll ────────────────────────────────────
/**
 * Rolls a fair 6-sided dice using crypto.randomBytes().
 * Avoids modulo bias by using rejection sampling.
 * @returns {number} An integer from 1 to 6.
 */
function rollDice() {
  const MAX_VALID = 252; // floor(256 / 6) * 6 = 252  (avoids modulo bias)
  let byte;
  do {
    byte = crypto.randomBytes(1)[0]; // one random byte (0-255)
  } while (byte > MAX_VALID);
  return (byte % 6) + 1;
}

// ── Display Dice Face ─────────────────────────────────────────
function displayFace(value, rollNumber) {
  const face = DICE_FACES[value];
  const color = [C.green, C.yellow, C.cyan, C.magenta, C.blue, C.red][value - 1];
  console.log(`\n${C.bright}${C.cyan}Roll #${rollNumber}:${C.reset}`);
  face.forEach((line) => console.log(`  ${color}${C.bright}${line}${C.reset}`));
  console.log(`  ${C.bright}${color}Dice Rolled: ${value}${C.reset}`);
}

// ── Banner ────────────────────────────────────────────────────
console.log(C.bright + C.cyan);
console.log('=========================================');
console.log('  Smart Utility Toolkit — Dice Roller   ');
console.log('  (Using crypto module for randomness)   ');
console.log('=========================================');
console.log(C.reset);

// ── Configuration ─────────────────────────────────────────────
const TOTAL_ROLLS = 6;
const historyPath = path.join(__dirname, 'dice_history.txt');
const rolls = [];
const tally = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

logger.info(`Rolling dice ${TOTAL_ROLLS} times using crypto.randomBytes()...`);

// ── Roll Dice ─────────────────────────────────────────────────
for (let i = 1; i <= TOTAL_ROLLS; i++) {
  const value = rollDice();
  rolls.push(value);
  tally[value]++;
  displayFace(value, i);
}

// ── Statistics ────────────────────────────────────────────────
console.log('');
logger.info('--- Roll Statistics ---');
console.log(`  ${C.bright}${C.cyan}Results: [${rolls.join(', ')}]${C.reset}`);
console.log(`  ${C.bright}${C.green}Average: ${(rolls.reduce((a, b) => a + b, 0) / rolls.length).toFixed(2)}${C.reset}`);
console.log(`  ${C.bright}${C.yellow}Min: ${Math.min(...rolls)}  Max: ${Math.max(...rolls)}${C.reset}`);

console.log(`\n  ${C.bright}${C.cyan}Tally:${C.reset}`);
for (let face = 1; face <= 6; face++) {
  const bar = '█'.repeat(tally[face]);
  console.log(`  Face ${face}: ${C.green}${bar}${C.reset} (${tally[face]})`);
}

// ── Bonus: Save History to File ───────────────────────────────
const historyEntry =
  `\n[${new Date().toISOString()}] Rolls: [${rolls.join(', ')}] | Avg: ${(rolls.reduce((a, b) => a + b, 0) / rolls.length).toFixed(2)}\n`;

fs.appendFile(historyPath, historyEntry, 'utf8', (err) => {
  if (err) {
    logger.error(`Could not save history: ${err.message}`);
  } else {
    logger.success(`Roll history saved to ${historyPath}`);
  }
});
