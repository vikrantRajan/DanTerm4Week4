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

  getHtml((htmlResponse) => {
    getCss((cssResponse) => {
      $('head').append(`<style>${cssResponse}</style>`);
      // not the best approach, I recommend using link element
    });

    $('#menu').html(htmlResponse);

    $('#menuCities').parent().click(() => {
      getJson((jsonResponse) => {
        console.log(jsonResponse);
      });
    });
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    shareAsset
  };
}
