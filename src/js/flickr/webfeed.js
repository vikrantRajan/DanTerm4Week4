/* global document, displayRssConent */

const getFlickrPublicPhotos = () => {
  const createImg = (src) => {
    const img = `<li><img src=${src} alt="Gastown, Vancouver"></li>`;
    document.getElementById('photos').innerHTML += img;
  };

  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=gastown&format=json',
    jsonpCallback: 'jsonFlickrFeed',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    success: (response) => {
      response.items.forEach(item => createImg(item.media.m));
    },
  });
};

// not in use, RSS code example
const displayFlickrRss = () => {
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
    displayFlickrRss,
    getFlickrPublicPhotos,
  };
}
