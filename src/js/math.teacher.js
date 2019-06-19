/* global module */

function sum(a = 0, b = 0) {
  return Number(a) + Number(b); // parseInt() will return NaN
}

function difference(a = 0, b = 0) {
  return a - b;
}

function multiply(a = 0, b = 0) {
  return a * b;
}

// SOLUTION
function divide(a = 0, b = 0) {
  if (a === 0 || a === '' || a === undefined || a === null) return 0;
  if (b === 0 || b === '' || b === undefined || b === null) return 0;
  return a / b;
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    sum,
    difference,
    multiply,
    divide,
  };
}
