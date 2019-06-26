const getFlickrGeoPublicPhotos = () => {
  console.log('Hello Flickr API');
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrGeoPublicPhotos,
  };
}
