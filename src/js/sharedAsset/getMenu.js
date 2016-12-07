function shareAsset() {
  $.ajax({
    url: 'menu.html',
    success: (response) => {
      $('#menu').append(response);
    },
  });
  $.ajax({
    url: 'menu.css',
    success: (response) => {
      $('head').append(`<style>${response}</style>`);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    shareAsset,
  };
}
