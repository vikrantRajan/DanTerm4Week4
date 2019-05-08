/* global salesTaxData */

const calculateTotalTax = (provinceAbbr, data) => {
  let totalTax = data.provinces[provinceAbbr].taxes[0].tax;

  if (data.provinces[provinceAbbr].taxes[1]) {
    totalTax += data.provinces[provinceAbbr].taxes[1].tax;
  }

  return totalTax.toFixed(2);
};

const formatCurrency = price => `$${price.toFixed(2)}`;

// const formatCurrencyConcat = price => '$' + price.toFixed(2);

// const formatCurrencyLong = (price) => {
//   return `$${price.toFixed(2)}`;
// };

const displayCost = () => {
  const pizzaPriceValue = $('#price').val();
  const pizzaPrice = (pizzaPriceValue === '') ? 0 : Number(pizzaPriceValue);
  const salesTax = Number($('#provinces').val());

  const totalPrice = (pizzaPrice * salesTax) + pizzaPrice;

  $('#pizzaCost').html(formatCurrency(totalPrice));
};

const populateProvincesDropdown = (data) => {
  $.each(data.provinces, (abbr, province) => {
    const totalTax = calculateTotalTax(abbr, data);
    $('#provinces').append(`<option value="${totalTax}">${province.name}</option>`);
  });
};

const pizzaSales = (isAjax) => {
  if (isAjax) {
    $.ajax({
      url: 'http://localhost:8080/jquery/tax/rates.json',
      success: response => populateProvincesDropdown(response),
    });
  } else {
    populateProvincesDropdown(salesTaxData);
  }

  $('#provinces,#price').change(displayCost);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
