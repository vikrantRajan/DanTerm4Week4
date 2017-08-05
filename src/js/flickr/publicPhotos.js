function getFlickrPublicPhotos() {
  console.log('Hello browser');
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPublicPhotos
  };
}
