/* global salesTaxData */
const pizzaSales = () => {
  $.each(salesTaxData.provinces, (provinceAbbr, provinceObj) => {
    $('#provinces').append(`<option>${provinceObj.name}</option>`);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
