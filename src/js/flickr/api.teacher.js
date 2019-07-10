/* global document, fetch */

const getFlickrGeoPublicPhotos = () => {
  fetch('/api/flickr')
    .then(response => response.json())
    .then((json) => {
      const html = json.map(photoSrc => `<li><img src="${photoSrc}"></li>`);
      document.querySelector('#photos').innerHTML = html.join('');
    });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrGeoPublicPhotos,
  };
}
