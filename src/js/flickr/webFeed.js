const getFlickrPublicPhotos = () => {
  $.ajax({
    url: 'https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=vancouver',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    jsonpCallback: 'jsonFlickrFeed',
    success: (response) => {
      const html = response.items.map(item => `<img src="${item.media.m}">`);
      $('body').append(html);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPublicPhotos,
  };
}
