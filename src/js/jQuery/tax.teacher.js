/* global salesTaxData */

const calculateTotalTax = (provinceAbbr) => {
  let totalTax = salesTaxData.provinces[provinceAbbr].taxes[0].tax;

  if (salesTaxData.provinces[provinceAbbr].taxes[1]) {
    totalTax += salesTaxData.provinces[provinceAbbr].taxes[1].tax;
  }

  return totalTax.toFixed(2);
};

const pizzaSales = () => {
  $.each(salesTaxData.provinces, (abbr, province) => {
    const totalTax = calculateTotalTax(abbr);
    $('#provinces').append(`<option value="${totalTax}">${province.name}</option>`);
  });

  $('#provinces,#price').change(() => {
    const pizzaPriceValue = $('#price').val();
    const pizzaPrice = (pizzaPriceValue === '') ? 0 : Number(pizzaPriceValue);
    const salesTax = Number($('#provinces').val());

    const totalPrice = (pizzaPrice * salesTax) + pizzaPrice;

    $('#pizzaCost').html(totalPrice);
  });
  // todo inclass both province dropdown and price text fields should update the cost
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
