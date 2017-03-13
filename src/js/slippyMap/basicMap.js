/* global document, google */

function createMap(option) {
  return new google.maps.Map(document.getElementById('map'), {
    zoom: 19, // 1 is earth view from space, 20 is sidewalk zoom
    center: option.center
  });
}

function createPin(options) {
  const map = options.map;

  const marker = new google.maps.Marker({
    position: options.geocode,
    map
  });

  const infowindow = new google.maps.InfoWindow({
    content: options.htmlBubble
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
}

function initMap() {
  const vanarts = { lat: 49.28270005993911, lng: -123.11536252498627 };

  const map = createMap({ center: vanarts });
  createPin({ geocode: vanarts, htmlBubble: '<b>Hello</b> World', map });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap
  };
}
