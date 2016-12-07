function shareAsset() {
  function getHtml(callback) {
    $.ajax({ url: 'menu.html', success: callback });
  }

  function getCss(callback) {
    $.ajax({ url: 'menu.css', success: callback });
  }

  getHtml((htmlResponse) => {
    getCss((cssResponse) => {
      $('head').append(`<style>${cssResponse}</style>`);
    });

    $('#menu').append(htmlResponse);
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    shareAsset,
  };
}
