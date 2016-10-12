/* global salesTaxData */
function salesTax() {
  function provinceDropdown() {
    const provincesInitials = Object.keys(salesTaxData.provinces);

    provincesInitials.forEach((initial) => {
      const provinceName = salesTaxData.provinces[initial].name;
      // output province name to DOM with select and option HTML elements
    });
  }

  provinceDropdown();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    salesTax,
  };
}
