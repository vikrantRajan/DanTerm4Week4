/* global document, salesTaxData */
// function displayProvinces(salesTaxData) {
//   const provincesDropdown = $('#provinces');

//   $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => {
//     provincesDropdown.append(`<option>${provinceData.name}</option>`);
//   });
// }

function displayProvinces(salesTaxData) {
  const provincesDropdown = document.querySelector('#provinces');

  const html = Object.values(salesTaxData.provinces)
    .map(item => `<option>${item.name}</option>`);

  $(provincesDropdown).append(html);
}

function pizzaSales() {
  displayProvinces(salesTaxData);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
