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

  const marker = createMarker(varArts);

  const infobubble = new google.maps.InfoWindow({
    content: '<img src="https://pbs.twimg.com/profile_images/816732848384188416/_ODt1Jo2_400x400.jpg">'
  });

  marker.addListener('click', () => infobubble.open(map, marker));
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initMap
  };
}
