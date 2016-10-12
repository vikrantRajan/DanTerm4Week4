/* global salesTaxData, utils */
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
    const provinceInitial = $(this).val();
    if (provinceInitial === '') {
      $('#pizzaCost').text('');
      return;
    }
    const province = salesTaxData.provinces[provinceInitial];

    let taxRate = province.taxes[0].tax;
    if (province.taxes[1]) {
      taxRate += province.taxes[1].tax;
    }

    const pizzaPrice = parseFloat($('#price').val()); // get the pizza price
    const cost = (taxRate * pizzaPrice) + pizzaPrice; // multiple sales tax rate to retail price
    const currency = `$${Math.round(cost * 100) / 100}`; // apply currency format (weak)
    $('#pizzaCost').text(currency); // update DOM
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
