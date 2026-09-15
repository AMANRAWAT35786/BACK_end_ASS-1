// ============================================================
//  calculator.js — CLI-Based Calculator using process.argv
// ============================================================
//  Usage: node calculator.js <operation> <num1> <num2>
//  Operations: add, subtract, multiply, divide, modulo, power
//
//  Examples:
//    node calculator.js add 10 5       => Result: 15
//    node calculator.js divide 20 4   => Result: 5
// ============================================================

// ── ANSI Color Helpers ────────────────────────────────────────
const C = {
  reset:   '\x1b[0m',
  bright:  '\x1b[1m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  red:     '\x1b[31m',
  cyan:    '\x1b[36m',
  blue:    '\x1b[34m',
};

function colorize(color, text) {
  return `${color}${C.bright}${text}${C.reset}`;
}

// ── Banner ────────────────────────────────────────────────────
console.log(colorize(C.cyan, '========================================='));
console.log(colorize(C.cyan, '     Smart Utility Toolkit — Calculator  '));
console.log(colorize(C.cyan, '========================================='));

// ── Read Arguments ────────────────────────────────────────────
const args = process.argv.slice(2); // remove 'node' and script name

console.log(colorize(C.blue, `\nReceived arguments: [${args.join(', ')}]`));

if (args.length < 3) {
  console.log(colorize(C.red, '\nUsage: node calculator.js <operation> <num1> <num2>'));
  console.log(colorize(C.yellow, 'Available operations: add, subtract, multiply, divide, modulo, power'));
  process.exit(1);
}

const [operation, rawA, rawB] = args;
const numA = parseFloat(rawA);
const numB = parseFloat(rawB);

// ── Validate numbers ──────────────────────────────────────────
if (isNaN(numA) || isNaN(numB)) {
  console.log(colorize(C.red, '\nError: Both arguments must be valid numbers.'));
  console.log(colorize(C.yellow, `  Received: "${rawA}" and "${rawB}"`));
  process.exit(1);
}

// ── Perform Operation ─────────────────────────────────────────
let result;

switch (operation.toLowerCase()) {
  case 'add':
    result = numA + numB;
    console.log(colorize(C.green, `\n  ${numA} + ${numB} = ${result}`));
    break;

  case 'subtract':
    result = numA - numB;
    console.log(colorize(C.green, `\n  ${numA} - ${numB} = ${result}`));
    break;

  case 'multiply':
    result = numA * numB;
    console.log(colorize(C.green, `\n  ${numA} * ${numB} = ${result}`));
    break;

  case 'divide':
    if (numB === 0) {
      console.log(colorize(C.red, '\nError: Division by zero is not allowed.'));
      process.exit(1);
    }
    result = numA / numB;
    console.log(colorize(C.green, `\n  ${numA} / ${numB} = ${result}`));
    break;

  case 'modulo':
    if (numB === 0) {
      console.log(colorize(C.red, '\nError: Modulo by zero is not allowed.'));
      process.exit(1);
    }
    result = numA % numB;
    console.log(colorize(C.green, `\n  ${numA} % ${numB} = ${result}`));
    break;

  case 'power':
    result = Math.pow(numA, numB);
    console.log(colorize(C.green, `\n  ${numA} ^ ${numB} = ${result}`));
    break;

  default:
    console.log(colorize(C.red, `\nError: Unknown operation "${operation}"`));
    console.log(colorize(C.yellow, 'Available operations: add, subtract, multiply, divide, modulo, power'));
    process.exit(1);
}

// ── Final Output ──────────────────────────────────────────────
console.log(colorize(C.cyan, `\nResult: ${result}`));
console.log(colorize(C.cyan, '=========================================\n'));
