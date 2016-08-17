/* global mxn */
const basicMap = () => {
  const vanarts = {
    latitude: 49.282703,
    longitude: -123.115371,
    pin: null,
  };
  const map = new mxn.Mapstraction('map', 'googlev3');
  const latlon = new mxn.LatLonPoint(vanarts.latitude, vanarts.longitude);

  vanarts.pin = new mxn.Marker(latlon);
  vanarts.pin.setInfoBubble('My School');

  // zoom level large is street level/closer 21
  // zoom level small is outer space/father 0
  map.setCenterAndZoom(latlon, 18);
  map.addLargeControls();
  map.addMarker(vanarts.pin);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    basicMap,
  };
}
