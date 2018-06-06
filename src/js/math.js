/* global module */

function sum(a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
}

function difference(a, b) {
  return a - b;
}

function multiply(a = 0, b = 0) {
  return a * b;
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    sum,
    difference,
    multiply,
  };
}
