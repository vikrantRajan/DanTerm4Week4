/* global mapboxgl */
if (mapboxgl) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYWN0aXZlLXRlYWNoIiwiYSI6ImNqcmppNDlveDBjdHk0M284MnNya2Ztb2wifQ.lUbes1e5nrEYV9nwRh49sQ';
}

const vanarts = {
  latitude: 49.282733,
  longitude: -123.115433,
};

const createMap = () => new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/dark-v10', // dark theme
  center: [vanarts.longitude, vanarts.latitude], // starting position
  zoom: 18, // starting zoom; 0 is space - 20 is sidewalk
});

const loadHelloMap = () => {
  const map = createMap();

  const bubble = new mapboxgl.Popup()
    .setHTML('<img src="https://pbs.twimg.com/profile_images/987068971168837632/r1a2mDq0_400x400.jpg" alt="VanArts">');

  new mapboxgl.Marker()
    .setLngLat([vanarts.longitude, vanarts.latitude])
    .setPopup(bubble)
    .addTo(map);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    loadHelloMap,
  };
}
