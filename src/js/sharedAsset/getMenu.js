function shareAsset() {
  function getHtml(callback) {
    $.ajax({ url: 'menu.html', success: callback });
  }

  function getCss(callback) {
    $.ajax({ url: 'menu.css', success: callback });
  }

  function getJson(callback) {
    $.ajax({ url: 'weather.json', success: callback });
  }

  // ideal for unit testing
  function transformToCssClassName(raw) {
    // Mostly Cloudy --> mostly_cloudy
    return raw.toLowerCase().split(' ').join('_');
  }

  getHtml((htmlResponse) => {
    getCss((cssResponse) => {
      $('head').append(`<style>${cssResponse}</style>`);
    });

    $('#menu').append(htmlResponse);
    $('#menuCities').parent().click(() => {
      getJson((jsonResponse) => {
        const html = [];
        $.each(jsonResponse.result.cities, (index, cityName) => {
          const condition = jsonResponse.result[cityName].condition;
          html.push('<li class="', transformToCssClassName(condition), '">', cityName, '</li>');
        });
        $('#menuCities').html(html.join(''));
      });
    });
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    shareAsset,
  };
}
