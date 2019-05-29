const bindDomAutocomplete = () => {
  $('#country').keyup(function countryKey() {
    const keyword = $(this).val();

    // todo inclass #2 make an AJAX call to autocomplete backend service
    // and display the results in the DOM
    $('#suggestion').html(`<li>${keyword}</li>`);
  });
};

const autocomplete = () => {
  bindDomAutocomplete();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete,
  };
}
