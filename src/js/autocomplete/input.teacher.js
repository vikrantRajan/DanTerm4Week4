function displayCountries(output) {
  $('#country_suggestions').html(output);
}

function formatCountries(countries) {
  // Imperative programming
  // The term is often used in contrast to declarative programming
  // which focuses on what the program should accomplish without
  // specifying how the program should achieve the result.

  // const html = [];
  // $.each(countries, (index, country) => {
  //   html.push(`<li>${country}</li>`);
  // });

  // ES6 map single line
  // declarative paradigm - specically functional programming is ideal
  const html = countries.map(country => `<li>${country}</li>`);

  // ES6 map multiline
  // const html = countries.map((country) => {
  //   return `<li>${country}</li>`;
  // });

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
  $('#country_keywords').keyup((event) => {
    const keyword = $(event.target).val();
    queryService(keyword);
  });
}

function autocomplete() { // HTML initates
  listenToInput();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete
  };
}
