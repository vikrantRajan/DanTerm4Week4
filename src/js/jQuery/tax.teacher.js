/* global salesTaxData */

const pizzaSales = () => {
  $.each(salesTaxData.provinces, (abbr, province) => {
    $('#provinces').append(`<option>${province.name}</option>`);
  });

  $('#provinces').click(function provinceClick() {
    // #4 in progress. Improve the event and add values for the province <options>
    console.log('Province selected', this);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
