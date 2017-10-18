/* global salesTaxData */

function calculateTax(data) {
  let taxTotal = data.taxes[0].tax;
  if (data.taxes.length === 2) {
    taxTotal += data.taxes[1].tax;
  }

  return taxTotal.toFixed(2); // fix decical to cents
}

function displayProvinces() {
  // jQuery each loop
  const $provinces = $('#provinces');

  $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => {
    const tax = calculateTax(provinceData); // todo dev step #3
    $provinces.append(`<option value="${tax}">${provinceData.name}</option>`);
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
