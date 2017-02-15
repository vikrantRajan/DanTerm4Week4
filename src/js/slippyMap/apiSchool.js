/* global document, google */

function initMap() {
  const myLatLng = { lat: -25.363, lng: 131.044 };

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng,
  });

  const marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: 'Hello VanArts',
  });

  console.log(marker);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap,
  };
}
