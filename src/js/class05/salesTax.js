/* global salesTaxData */
function salesTax() {
  function provinceDropdown() {
    const provincesInitials = Object.keys(salesTaxData.provinces);
    const $province = $('#provinces');

    provincesInitials.forEach((initial) => {
      const provinceName = salesTaxData.provinces[initial].name;
      // $province.append('<option value="' + initial + '">' + provinceName + '</option>'); // ES5
      $province.append(`<option value="${initial}">${provinceName}</option>`); // ES6
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
