/* global document, google */

let map;

function createMap(option) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 19, // 1 is earth view from space, 20 is sidewalk zoom
    center: option.center,
  });
}

function createPin(options) {
  const marker = new google.maps.Marker({
    position: options.geocode,
    map,
  });

  const infowindow = new google.maps.InfoWindow({
    content: options.html,
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
}

function initMap() {
  const vanarts = { lat: 49.28270005993911, lng: -123.11536252498627 };

  createMap({ center: vanarts });
  createPin({ geocode: vanarts, html: '<b>Hello</b> World' });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap,
  };
}
