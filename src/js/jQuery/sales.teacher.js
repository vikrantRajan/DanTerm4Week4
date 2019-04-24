/* global salesTaxData */

const pizzaSales = () => {
  console.log(salesTaxData.provinces.BC.name);

  $.each(salesTaxData.provinces, (key, value) => {
    console.log(`Key is ${key} and value is ${value}.`);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
