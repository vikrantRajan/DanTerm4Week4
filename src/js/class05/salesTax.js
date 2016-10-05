/* global salesTaxData */
function salesTax() {
  const provincesInitials = Object.keys(salesTaxData.provinces);

  provincesInitials.forEach((initial) => {
    console.log(salesTaxData.provinces[initial].name);
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    salesTax,
  };
}
