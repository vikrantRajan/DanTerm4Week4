const displayCountries = (response) => {
  $.each(response.items, (x, country) => {
    $('#suggestion').append(`<li>${country}</li>`);
  });
};

const bindDomAutocomplete = () => {
  $('#country').keyup(function countryKey() {
    const keyword = $(this).val();

    $('#suggestion').empty();

    $.ajax({
      // url: `/api/autocomplete?keyword=${keyword}`,
      url: '/api/autocomplete',
      data: {
        keyword,
      },
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
