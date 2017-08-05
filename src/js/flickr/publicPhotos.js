function getFlickrPublicPhotos() {
  $.ajax({
    url: '/api/flickr',
    success: (response) => {
      $.each(response.photos, (index, jpgPath) => {
        $('#photos').append(`<li><img src="${jpgPath}"></li>`);
      });
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPublicPhotos
  };
}
