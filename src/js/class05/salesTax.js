/* global salesTaxData */
function salesTax() {
  console.log(salesTaxData);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    salesTax,
  };
}
