/* global salesTaxData */

function displayProvinces() {
  // jQuery each loop
  const $provinces = $('#provinces');

  $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => {
    $provinces.append(`<option>${provinceData.name}</option>`);
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
