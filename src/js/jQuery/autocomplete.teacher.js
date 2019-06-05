function displayCountries(output) {
  $('#country_suggestions').html(output).addClass('expanded');
}

function formatCountries(countries) {
  // const html = [];
  // $.each(countries, (index, country) => {
  //   html.push(`<li>${country}</li>`);
  // });

  // ES6 advanced code
  const html = countries.map(country => `<li>${country}</li>`);

  // const html = [<li>afg</li>, <li>can</li>]
  displayCountries(html.join('')); // <li>afg</li><li>can</li>
}

function queryService(keyword) {
  $.ajax({
    url: '/api/autocomplete',
    data: { keyword }, // /api/autocomplete?keyword=a
    success: (response) => {
      formatCountries(response.items);
    },
  });
}

function bindDomAutocomplete() {
  $('#country_keywords').keyup((event) => {
    const keyword = $(event.target).val();
    queryService(keyword);
  });
}

function autocomplete() {
  bindDomAutocomplete();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete,
  };
}
