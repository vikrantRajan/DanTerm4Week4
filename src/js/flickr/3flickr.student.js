/* global mapboxgl */
// MAP BOX KEY ACCESS
mapboxgl.accessToken = 'pk.eyJ1IjoidmlrMTk5MyIsImEiOiJjank3aXVxd3QwMWYwM21wcWZxMndmbGQyIn0.nDPn-h-nBbVOqnhE2Ck2Dg';

// Adding custom icons, coordinates & messages to the maps
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        message: 'Life is a beach',
        iconSize: [60, 60],
      },
      geometry: {
        type: 'Point',
        coordinates: [
          -123.154587,
          49.274479,
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Life is a big beach',
        iconSize: [50, 50],
      },
      geometry: {
        type: 'Point',
        coordinates: [
          -123.138905,
          49.280480,
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Life is a small beach',
        iconSize: [40, 40],
      },
      geometry: {
        type: 'Point',
        coordinates: [
          -123.143534,
          49.286780,
        ],
      },
    },
  ],
};
// Getting images from Flickr, Text from JSON
const getFlickrMapPix = () => {
  $.ajax({
    method: 'GET',
    url: '/api/flickr/map',
    success: (response) => {
      const beach1 = `<img src=${response[5].path}></img><h1>${geojson.features[0].properties.message}</h1>`;
      const beach2 = `<img src=${response[8].path}></img><h1>${geojson.features[1].properties.message}</h1>`;
      const beach3 = `<img src=${response[10].path}></img><h1>${geojson.features[2].properties.message}</h1>`;
      // Creating a new instance of a map
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-123.143534, 49.286780],
        zoom: 13,
      });
      // adding 3 new pop ups, adding a dynamic image to each one
      const popup1 = new mapboxgl.Popup().setHTML(beach1);
      const popup2 = new mapboxgl.Popup().setHTML(beach2);
      const popup3 = new mapboxgl.Popup().setHTML(beach3);
      // adding markers, setting latitute & longitude & setting a pop up to each on the map
      new mapboxgl.Marker()
        .setLngLat(geojson.features[0].geometry.coordinates).setPopup(popup1)
        .addTo(map);
      new mapboxgl.Marker()
        .setLngLat(geojson.features[1].geometry.coordinates).setPopup(popup2)
        .addTo(map);
      new mapboxgl.Marker()
        .setLngLat(geojson.features[2].geometry.coordinates).setPopup(popup3)
        .addTo(map);
    },
  });
};

const loadFlickrMap = () => {
  getFlickrMapPix();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    loadFlickrMap,
  };
}
