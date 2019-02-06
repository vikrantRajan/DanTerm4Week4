/* global fetch, mapboxgl */
if (mapboxgl) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYWN0aXZlLXRlYWNoIiwiYSI6ImNqcmppNDlveDBjdHk0M284MnNya2Ztb2wifQ.lUbes1e5nrEYV9nwRh49sQ';
}

const vanarts = {
  latitude: 49.282733,
  longitude: -123.115433,
};

const createMap = () => new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
  center: [vanarts.longitude, vanarts.latitude], // starting position [lng, lat]
  zoom: 18, // starting zoom
});

const createPin = ({ bubble = null, coordinates, map }) => {
  new mapboxgl.Marker()
    .setLngLat(coordinates)
    .setPopup(bubble)
    .addTo(map);
};

const loadFlickrMap = async () => {
  const requestFlickr = async () => {
    const response = await fetch('/api/flickr/map');
    const json = await response.json();
    return json;
  };
  // HTTP Request to get JPG paths, geo coordinates
  const flickrJson = await requestFlickr();
  // Create an interactive slippy map
  const map = createMap();

  // Plot pins representing photos
  flickrJson.photos.forEach((photo) => {
    // Add Pin interaction to show JPG image
    const bubble = new mapboxgl.Popup()
      .setHTML(`<img src="${photo.src}" alt="${photo.title || 'Image of location'}">`);

    createPin({ bubble, coordinates: photo.coordinates, map });
  });
};

const loadHelloMap = () => {
  const map = createMap();

  const bubble = new mapboxgl.Popup()
    .setHTML('<img src="https://pbs.twimg.com/profile_images/987068971168837632/r1a2mDq0_400x400.jpg" alt="VanArts">');

  createPin({
    bubble,
    coordinates: [vanarts.longitude, vanarts.latitude],
    map,
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    loadHelloMap,
    loadFlickrMap,
  };
}
