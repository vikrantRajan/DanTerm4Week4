function currencyFormat(number) {
  return `$${number}`;
}

function calculateTax(incomeInput) { // number input
  // Step 3
  let income = incomeInput;
  const taxRanges = [
    { from: 0, percent: 0.15 },
    { from: 43953, percent: 0.22 },
    { from: 87907, percent: 0.26 },
    { from: 136270, percent: 0.29 },
  ];
  let tax = 0;

  let i = taxRanges.length - 1;
  for (i; i >= 0; i -= 1) {
    const taxRange = taxRanges[i];
    if (income > taxRange.from) {
      tax += (income - taxRange.from) * taxRange.percent;
      income = taxRange.from; // chop off amount calculated in this tax bracket
    }
  }
  return Math.round(tax * 100) / 100;
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    calculateTax,
    currencyFormat,
  };
}
