function facebookPage() {
  $.ajax({
    url: '/api/facebook',
    success: (response) => {
      $('body').append(`<img src="${response.cover.source}">`);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    facebookPage,
  };
}
