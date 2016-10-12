/* global salesTaxData */
function salesTax() {
  function provinceDropdown($container) {
    const provincesInitials = Object.keys(salesTaxData.provinces);

    provincesInitials.forEach((initial) => {
      const provinceName = salesTaxData.provinces[initial].name;
      // $container.append('<option value="' + initial + '">' + provinceName + '</option>'); // ES5
      $container.append(`<option value="${initial}">${provinceName}</option>`); // ES6
    });
  }

  function calculatePrice() {
    debugger;
  }

  const $province = $('#provinces').on('change', calculatePrice);
  provinceDropdown($province);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    salesTax,
  };
}
