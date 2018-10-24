/* global salesTaxData */
const pizzaSales = () => {
  $.each(salesTaxData.provinces, (provinceAbbr, provinceObj) => {
    $('body').append(`Province name is ${provinceObj.name}<br>`);
  });

  const provinceNames = Object.values(salesTaxData.provinces).map(prov => prov.name);
  provinceNames.forEach((provinceName) => {
    console.log(`Province name is ${provinceName}<br>`);
  });

  Object.keys(salesTaxData.provinces).forEach((key) => {
    console.log(`Province name is ${salesTaxData.provinces[key].name}<br>`);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
