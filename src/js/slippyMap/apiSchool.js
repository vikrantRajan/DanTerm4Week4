/* global document, google */

function initMap() {
  const vanarts = { lat: 49.28270005993911, lng: -123.11536252498627 };

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 19, // 1 is earth view from space, 20 is sidewalk zoom
    center: vanarts,
  });

  const marker = new google.maps.Marker({
    position: vanarts,
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
