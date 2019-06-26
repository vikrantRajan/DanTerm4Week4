const buildFlickrImgSrc = photo => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

const getFlickrGeoPublicPhotos = () => {
  $.ajax({
    url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=fd827f1740b5ebd99218383bd0436e4d&tags=vancouver&format=json',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    jsonpCallback: 'jsonFlickrApi',
    success: (response) => {
      const html = response.photos.photo.map(item => `<img src="${buildFlickrImgSrc(item)}" alt="${item.title}">`);
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
