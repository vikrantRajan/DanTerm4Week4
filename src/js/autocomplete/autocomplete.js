function displayCountries(output) {
  $('#country_suggestions').html(output).addClass('expanded');
}

function formatCountries(countries) {
  const html = [];
  $.each(countries, (index, country) => {
    html.push(`<li>${country}</li>`);
  });

  // ES6 advanced code
  // const html = countries.map(country => `<li>${country}</li>`);

  displayCountries(html.join(''));
}

function queryService(keyword) {
  $.ajax({
    url: '/api/autocomplete',
    data: { keyword },
    success: (response) => {
      formatCountries(response.items);
    }
  });
}

function listenToInput() {
  $('#country_keywords').keyup((element) => {
    const keyword = $(element.target).val();
    queryService(keyword);
  });
}

function autocomplete() {
  listenToInput();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete
  };
}
