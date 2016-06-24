/* global multiply, sum */
function calcSum() {
  $('#sum').val(sum($('#summandA').val(), $('#summandB').val()));
}
function calcProduct() {
  $('#product').val(multiply($('#factorA').val(), $('#factorB').val()));
}
function initCalculator() {
  $('#summandA, #summandB').keyup(calcSum);
  $('#factorA, #factorB').keyup(calcProduct);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initCalculator,
  };
}
