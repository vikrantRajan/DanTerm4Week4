/* global utils */
/* steps
    1) gather input
        input field with design and UI
        submit button/ field event(change) to trigger our code
        validate, ensure number
    2) allow input refinement and output result
    3) determine tax range
        range constant? Yes, not flexible
        multiply percentages
        store for output (tax owed)
    4) Apply currency formatting (with Canadian dollar sign and comma seperator)
        output message to DOM container a HTML element body
        fancy output including amount taxed per range
    5) Prove your solution in at least two browsers
        Test income for each range
*/

function displayError(message) {
  utils.print(message);
}

function clearError() {}

function displayTaxAmount(message) {
  utils.print(message); // eslint-disable-line no-console
}

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

// Step 1 & 2
$('#income').change(() => {
  const amount = null;
  if (isNaN(amount)) { // letter is found (not digit)
    displayError('Not a number');
    return; // break out when invalid
  }
  clearError();

  // Step 4
  let taxAmount = calculateTax(amount);
  taxAmount = currencyFormat(taxAmount);
  displayTaxAmount(taxAmount);
});
