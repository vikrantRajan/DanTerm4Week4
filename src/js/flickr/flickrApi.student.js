const buildFlickrSrc = item => `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;


const getFlickrGeoPublicPhotos = () => {
  $.ajax({
    // url: '/api/flickr',
    url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=63f5beaad350ed0fb18d62b967315187&tags=vancouver&format=json',
    dataType: 'jsonp',
    jsonpCallback: 'jsonFlickrApi',
    success: (response) => {
      console.log(response.photos.photo);
      const html = response.photos.photo.map(item => `<img alt="${item.title}" src="${buildFlickrSrc(item)}">`);
      $('body').append(html);
      // response.items.forEach(item => console.log(item.media.m));
      // console.log(response.items[0].media.m);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrGeoPublicPhotos,
  };
}
