const buildFlickrImgSrc = (photo) => {
  // https://www.flickr.com/services/api/misc.urls.html
  return 'http://flickr.ca...jpg';
};

const getFlickrGeoPublicPhotos = () => {
  $.ajax({
    url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=fd827f1740b5ebd99218383bd0436e4d&tags=vancouver&format=json',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    jsonpCallback: 'jsonFlickrApi',
    success: (response) => {
      const html = response.photos.photo.map(item => `<img alt="${item.title}" src="${buildFlickrImgSrc(item)}">`);
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
