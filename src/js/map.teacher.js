/* global mapboxgl */
if (mapboxgl) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYWN0aXZlLXRlYWNoIiwiYSI6ImNqcmppNDlveDBjdHk0M284MnNya2Ztb2wifQ.lUbes1e5nrEYV9nwRh49sQ';
}

const vanarts = {
  latitude: 49.282733,
  longitude: -123.115433,
};

const loadHelloMap = () => {
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [vanarts.longitude, vanarts.latitude], // starting position [lng, lat]
    zoom: 18, // starting zoom
  });

  new mapboxgl.Marker()
    .setLngLat([vanarts.longitude, vanarts.latitude])
    .addTo(map);

  map.on('click', () => {
    new mapboxgl.Popup()
      .setLngLat([vanarts.longitude, vanarts.latitude])
      .setHTML('<img src="https://pbs.twimg.com/profile_images/987068971168837632/r1a2mDq0_400x400.jpg" alt="VanArts">')
      .addTo(map);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    loadHelloMap,
  };
}
