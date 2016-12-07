function shareAsset() {
  function getCss(callback) {
    $.ajax({ url: 'menu.css', success: callback });
  }
  $.ajax({
    url: 'menu.html',
    success: (response) => {
      getCss((cssResponse) => {
        $('head').append(`<style>${cssResponse}</style>`);
      });

      $('#menu').append(response);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    shareAsset,
  };
}
