/* global salesTaxData */

const calculateTotalTax = (provinceAbbr) => {
  let totalTax = salesTaxData.provinces[provinceAbbr].taxes[0].tax;

  if (salesTaxData.provinces[provinceAbbr].taxes[1]) {
    totalTax += salesTaxData.provinces[provinceAbbr].taxes[1].tax;
  }

  return totalTax.toFixed(2);
};

const displayCost = () => {
  const pizzaPriceValue = $('#price').val();
  const pizzaPrice = (pizzaPriceValue === '') ? 0 : Number(pizzaPriceValue);
  const salesTax = Number($('#provinces').val());

  const totalPrice = (pizzaPrice * salesTax) + pizzaPrice;

  $('#pizzaCost').html(totalPrice);
};

const pizzaSales = () => {
  $.each(salesTaxData.provinces, (abbr, province) => {
    const totalTax = calculateTotalTax(abbr);
    $('#provinces').append(`<option value="${totalTax}">${province.name}</option>`);
  });

  $('#provinces,#price').change(displayCost);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
