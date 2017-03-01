function facebookPage() {
  $.ajax({
    url: '/api/facebook',
    data: {
      pageCover: true,
    },
    success: (response) => {
      $('body').append(`<img src="${response.cover.source}">`);
    },
  });
}

function facebookProfile() {
  $.ajax({
    url: '/api/facebook',
    data: {
      pageCover: false,
    },
    success: (response) => {
      $('body').append(`<img src="${response.picture.data.url}">`);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    facebookPage,
    facebookProfile,
  };
}
