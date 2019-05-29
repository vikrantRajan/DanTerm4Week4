const displayCountries = (response) => {
  $.each(response.items, (x, country) => {
    $('#suggestion').append(`<li>${country}</li>`);
  });
};

const bindDomAutocomplete = () => {
  $('#country').keyup(function countryKey() {
    const keyword = $(this).val();

    // todo inclass #2 make an AJAX call to autocomplete backend service
    // and display the results in the DOM


    $.ajax({
      url: '/api/autocomplete',
      success: displayCountries,
    });
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
