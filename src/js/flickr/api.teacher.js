const getFlickrGeoPublicPhotos = () => {
  $.ajax({
    url: '/api/flickr',
    success: (response) => {
      const html = response.photos.map(photo => `<img src="${photo.path}" alt="${photo.caption}">`);
      $('body').append(html);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrGeoPublicPhotos,
  };
}
