function facebookPage() {
  $.ajax({
    url: '/api/facebook',
    success: (response) => {
      $('body').append(`<img src="${response.cover.source}">`);
    }
  });
}

function facebookProfile() {
  $.ajax({
    url: '/api/facebook?object=567323233?fields=picture',
    success: (response) => {
      $('body').append(`<img src="${response.picture.data.url}">`);
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    facebookPage,
    facebookProfile
  };
}
