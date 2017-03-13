/* global module */

function sum(a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    sum
  };
}
