/* global salesTaxData */
function changeProvinces() {
  const $dropdown = $(this);
  console.log($dropdown.val());
}

function changePrice() {
  const $input = $(this);
  console.log($input.val());
}

function displayProvinces() {
  const $provinces = $('#provinces');
  // Object
  $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => { // propertyName, valueOfProperty
    let taxTotal = provinceData.taxes[0].tax;
    if (provinceData.taxes.length === 2) {
      taxTotal += provinceData.taxes[1].tax;
    }

    taxTotal = taxTotal.toFixed(2);

    $provinces.append(`<option value="${taxTotal}">${provinceData.name}</option>`);
  });
}

function sales() {
  displayProvinces()
  $('#provinces').change(changeProvinces);
  $('#price').change(changePrice);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    sales
  };
}
