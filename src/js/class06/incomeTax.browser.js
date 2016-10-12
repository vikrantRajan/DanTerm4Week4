/* global calculateTax, currencyFormat, utils */
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
  utils.print(message); // todo
}

function clearError() {} // todo

function displayTaxAmount(message) {
  // todo
  utils.print(message); // eslint-disable-line no-console
}

// Step 1 & 2
$('#income').change(() => {
  const amount = null; // todo
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
