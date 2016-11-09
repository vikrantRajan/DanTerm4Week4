function displayCountries(output) {
  $('#country_suggestions')
    .html(output)
    .addClass('expanded');
}
function formatCountries(countries) {
  const html = [];
  $.each(countries, (index, country) => {
    html.push(`<li>${country}</li>`);
  });

  displayCountries(html.join(''));
}
function callService(keyword) {
  $.ajax({
    url: '/api/autocomplete',
    data: {
      keyword,
    },
    success: (response) => {
      formatCountries(response.items);
    },
  });
}

function autocomplete() {
  $('#country_keywords').keyup((event) => {
    callService($(event.target).val());
  });
}


// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete,
  };
}
