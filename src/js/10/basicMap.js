/* global mxn */
const basicMap = () => {
  const map = new mxn.Mapstraction('map', 'openlayers');
  const latlon = new mxn.LatLonPoint(51.50733, -0.12769);

  map.setCenterAndZoom(latlon, 10);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    basicMap,
  };
}
