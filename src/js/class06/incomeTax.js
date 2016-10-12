/* global utils */

function currencyFormat(number) {
  utils.print(number); // eslint-disable-line no-console
}

function calculateTax(incomeInput) { // number input
  // Step 3
  let income = incomeInput;
  let i;
  let taxRange;
  const taxRanges = [
    { from: 0, percent: 0.15 },
    { from: 43953, percent: 0.22 },
    { from: 87907, percent: 0.26 },
    { from: 136270, percent: 0.29 },
  ];
  let tax = 0;

  i = taxRanges.length - 1;
  for (i; i >= 0; i -= 1) {
    taxRange = taxRanges[i];
    if (income > taxRange.from) {
      tax += (income - taxRange.from) * taxRange.percent;
      income = taxRange.from; // chop off amount calculated in this tax bracket
    }
  }
  return tax;
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    calculateTax,
    currencyFormat,
  };
}
