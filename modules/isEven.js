// ============================================================
//  modules/isEven.js — Custom isEven Module
// ============================================================

/**
 * Checks whether a given number is even.
 * @param {number} num - The number to check.
 * @returns {boolean} true if even, false if odd.
 */
function isEven(num) {
  if (typeof num !== 'number' || !Number.isInteger(num)) {
    throw new TypeError(`isEven() expects an integer, but received: ${typeof num}`);
  }
  return num % 2 === 0;
}

/**
 * Checks whether a given number is odd.
 * @param {number} num - The number to check.
 * @returns {boolean} true if odd, false if even.
 */
function isOdd(num) {
  return !isEven(num);
}

/**
 * Filters an array and returns only the even numbers.
 * @param {number[]} arr
 * @returns {number[]}
 */
function getEvenNumbers(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('getEvenNumbers() expects an array.');
  }
  return arr.filter((n) => isEven(n));
}

/**
 * Filters an array and returns only the odd numbers.
 * @param {number[]} arr
 * @returns {number[]}
 */
function getOddNumbers(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('getOddNumbers() expects an array.');
  }
  return arr.filter((n) => isOdd(n));
}

module.exports = { isEven, isOdd, getEvenNumbers, getOddNumbers };
