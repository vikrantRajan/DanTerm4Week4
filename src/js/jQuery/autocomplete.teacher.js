/* global document */

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
  document.querySelector('#spinner').setAttribute('class', ''); // show spinner

  $.ajax({
    url: '/api/autocomplete',
    data: { keyword }, // /api/autocomplete?keyword=a
    success: (response) => {
      formatCountries(response.items);

      // jQuery $('#spinner').attr('class','hide');
      document.querySelector('#spinner').setAttribute('class', 'hide'); // hide spinner
    },
  });
}

const arrows = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

function bindDomAutocomplete() {
  $('#country_keywords').keyup((event) => {
    const isIgnoredKey = (
      event.which === arrows.up
      || event.which === arrows.down
      || event.which === arrows.left
      || event.which === arrows.right
    );

    if (isIgnoredKey) {
      let direction = 0;
      if (event.which === arrows.up) {
        direction = -1;
      }

      if (event.which === arrows.down) {
        direction = 1;
      }

      highlightCountry(direction); // -1 up +1 down
      return; // abort AJAX
    }

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
