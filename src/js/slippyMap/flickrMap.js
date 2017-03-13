/* global document, google */

function createMap(options) {
  let center;
  if (options && options.center) {
    center = { lat: options.center.latitude, lng: options.center.longitude };
  } else {
    center = null;
  }

  return new google.maps.Map(document.getElementById('map'), {
    zoom: 19, // 1 is earth view from space, 20 is sidewalk zoom
    center
  });
}

function createPin(options) {
  const map = options.map;

  if (options.pinBounds) {
    const point = new google.maps.LatLng(options.geocode.latitude, options.geocode.longitude);
    options.pinBounds.extend(point);
  }

  const marker = new google.maps.Marker({
    position: {
      lat: options.geocode.latitude,
      lng: options.geocode.longitude
    },
    map
  });

  const infowindow = new google.maps.InfoWindow({
    content: options.htmlBubble
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
}

function initFlickrMap() {
  $.ajax({
    url: '/api/flickr/geo',
    success: (response) => {
      const pinBounds = new google.maps.LatLngBounds();
      const map = createMap();

      response.items.forEach((item) => {
        const htmlBubble = `<img src="${item.media.m}">`;
        createPin({ geocode: item, htmlBubble, map, pinBounds });
      });

      map.fitBounds(pinBounds);
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initFlickrMap
  };
}
