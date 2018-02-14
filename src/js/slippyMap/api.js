/* global document, google */

function initMap() {
  const options = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  };

  new google.maps.Map(document.getElementById('map'), options);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap
  };
}
