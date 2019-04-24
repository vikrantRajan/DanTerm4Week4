/* global salesTaxData */

const pizzaSales = () => {
  console.log(salesTaxData.provinces.BC.name);

  $.each(salesTaxData.provinces, (abbr, province) => {
    console.log(`Key is ${abbr} and value is ${province.name}.`); // Solution #2
    $('#provinces').append(`<option>${province.name}</option>`);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
