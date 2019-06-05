const displayCountries = (response) => {
  $.each(response.items, (x, country) => {
    $('#country_suggestions').append(`<li>${country}</li>`);
  });
  $('#country_suggestions').addClass('expanded');
};

const bindDomAutocomplete = () => {
  $('#country_keywords').keyup(function countryKey() {
    const keyword = $(this).val();

    $('#country_suggestions').empty();

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
