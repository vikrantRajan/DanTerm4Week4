/* global document, google */

function createMap(options) {
  return new google.maps.Map(document.getElementById('map'), {
    zoom: 19, // 1 is earth view from space, 20 is sidewalk zoom
    center: {
      lat: options.center.latitude,
      lng: options.center.longitude,
    },
  });
}

function createPin(options) {
  const map = options.map;

  const marker = new google.maps.Marker({
    position: {
      lat: options.geocode.latitude,
      lng: options.geocode.longitude,
    },
    map,
  });

  const infowindow = new google.maps.InfoWindow({
    content: options.htmlBubble,
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
}

function initFlickrMap() {
  $.ajax({
    url: '/api/flickr/geo',
    success: (response) => {
      const firstPhoto = response.items[0];
      const map = createMap({ center: firstPhoto });
      createPin({ geocode: firstPhoto, htmlBubble: '<b>Hello</b> World', map });
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initFlickrMap,
  };
}
