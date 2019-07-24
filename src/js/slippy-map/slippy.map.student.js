/* global mapboxgl */
mapboxgl.accessToken = 'pk.eyJ1IjoidmlrMTk5MyIsImEiOiJjank3aXVxd3QwMWYwM21wcWZxMndmbGQyIn0.nDPn-h-nBbVOqnhE2Ck2Dg';
const vanarts = {
  latitude: 49.282704,
  longitude: -123.115379,
};

const createMap = () => new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [vanarts.longitude, vanarts.latitude],
  zoom: 18,
});

const loadHelloMap = () => {
  const map = createMap();

  const popup = new mapboxgl.Popup().setHTML('<h4>The Vancouver Institute of Media Arts</h4>  <img width="100%" src="http://www.canadiananimationresources.ca/wp-content/uploads/2010/02/99425_300.jpg" alt="VanArts">');
  new mapboxgl.Marker().setLngLat([vanarts.longitude, vanarts.latitude]).setPopup(popup).addTo(map);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    loadHelloMap,
  };
}
