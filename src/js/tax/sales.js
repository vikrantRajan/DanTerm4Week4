/* global salesTaxData */
function provincesChanged() {
  const $dropdown = $(this);
  console.log($dropdown.val());
}

function sales() {
  const $provinces = $('#provinces');
  // Object
  $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => { // propertyName, valueOfProperty
    $provinces.append(`<option value="${provinceData.taxes[0].tax}">${provinceData.name}</option>`);
  });

  $provinces.change(provincesChanged);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    sales
  };
}
