/* global document, google */
function initMap() {
  const createMap = options => new google.maps.Map(document.getElementById('map'), options);

  const varArts = { lat: 49.282873, lng: -123.115368, title: 'VanArts' };

  const map = createMap({ center: varArts, zoom: 20 });

  const createMarker = location => new google.maps.Marker({
    position: location,
    map,
    title: location.title
  });

  createMarker(varArts);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap
  };
}
