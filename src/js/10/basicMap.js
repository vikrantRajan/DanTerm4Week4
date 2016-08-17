/* global mxn */
const basicMap = () => {
  const vanarts = {
    latitude: 49.282703,
    longitude: -123.115371,
  };
  const map = new mxn.Mapstraction('map', 'googlev3');
  const latlon = new mxn.LatLonPoint(vanarts.latitude, vanarts.longitude);

  // zoom level large is street level/closer 21
  // zoom level small is outer space/father 0
  map.setCenterAndZoom(latlon, 18);

};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    basicMap,
  };
}
