/* global document, google */
function initMap() {
  const createMap = (options) => {
    return new google.maps.Map(document.getElementById('map'), options);
  };

  const createMarker = (location) => {
    return new google.maps.Marker({ // eslint-disable-line no-new
      position: location,
      map,
      title: location.title
    });
  }

  const varArts = { lat: 49.282873, lng: -123.115368, title: 'VanArts' };

  const map = createMap({ center: varArts, zoom: 20 });

  createMarker(varArts);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap
  };
}
