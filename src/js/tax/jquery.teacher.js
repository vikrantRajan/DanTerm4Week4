/* global salesTaxData */
const pizzaSales = () => {
  $.each(salesTaxData.provinces, (provinceAbbr, provinceObj) => {
    $('body').append(`Province name is ${provinceObj.name}<br>`);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
