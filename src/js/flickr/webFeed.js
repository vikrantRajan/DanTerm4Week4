/* global renderRssHTML */

const getFlickrPublicPhotos = () => {
  $.ajax({
    url: '/api/rss',
    data: {
      url: 'https://www.flickr.com/services/feeds/photos_public.gne?format=rss2&tags=vancouver',
    },
    success: (response) => {
      renderRssHTML(response, 'body');
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPublicPhotos,
  };
}
