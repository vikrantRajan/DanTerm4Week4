/* global displayRssConent */

const getFlickrPublicPhotos = () => {
  $.ajax({
    url: '/api/rss',
    data: {
      url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=gastown&format=rss2',
    },
    success: (response) => {
      $('<ul id="news"/>').appendTo('body');
      displayRssConent(response);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPublicPhotos,
  };
}
