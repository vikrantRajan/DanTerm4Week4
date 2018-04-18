/* global document, salesTaxData, utils */

function calculateTax(data) {
  let taxTotal = data.taxes[0].tax;
  if (data.taxes.length === 2) {
    taxTotal += data.taxes[1].tax;
  }

  // return taxTotal;
  return taxTotal.toFixed(2); // fix decical to cents
}

// function displayProvinces(salesTaxData) {
//   const provincesDropdown = $('#provinces');

//   $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => {
//     const tax = calculateTax(provinceData);
//     provincesDropdown.append(`<option value="${tax}">${provinceData.name}</option>`);
//   });
// }

function displayProvinces(salesTaxData) {
  const provincesDropdown = document.querySelector('#provinces');

  const html = Object.values(salesTaxData.provinces)
    .map((item) => {
      const tax = calculateTax(item);
      return `<option value="${tax}">${item.name}</option>`;
    });

  $(provincesDropdown).append(html);
}

function updatePrice() {
  const price = $(this).val();
  utils.print(price);
}

function pizzaSales() {
  displayProvinces(salesTaxData);
  $('#price').change(updatePrice);
  $('#provinces').change(updatePrice);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
