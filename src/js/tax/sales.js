/* global salesTaxData */

function displayProvinces() {
  // jQuery each loop
  $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => {
    $('body').append(provinceData.name);
  });

  // vanilla JavaScript
  const listProvinceAbbr = Object.keys(salesTaxData.provinces);

  listProvinceAbbr.forEach((provinceAbbr) => {
    // AB
    // BC
    $('body').append(salesTaxData.provinces[provinceAbbr].name);
  });
}

function sales() {
  displayProvinces();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    sales
  };
}
