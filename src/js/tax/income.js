/* global salesTaxData */

function income() {
  // Object
  $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => { // propertyName, valueOfProperty
    $('#provinces').append(`<option>${provinceData.name}</option>`);
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    income
  };
}
