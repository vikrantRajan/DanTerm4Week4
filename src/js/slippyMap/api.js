/* global document, google */

function initMap() {
  const varArtsGeo = { lat: 49.282873, lng: -123.115368 };
  const options = {
    center: varArtsGeo,
    zoom: 20
  };

  const map = new google.maps.Map(document.getElementById('map'), options);

  new google.maps.Marker({ // eslint-disable-line no-new
    position: varArtsGeo,
    map,
    title: 'VanArts'
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap
  };
}
