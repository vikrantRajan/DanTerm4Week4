/* global mxn */
const getFlickrData = (callback) => {
  $.ajax({
    url: '/flickr-map',
    data: {
      keyword: 'seabus',
    },
    success: (response) => {
      callback(response);
    },
  });
};
const flickrMap = () => {
  const map = new mxn.Mapstraction('map', 'googlev3');

  getFlickrData((response) => {
    console.log(response);
  });
  const vanarts = {
    latitude: 49.282703,
    longitude: -123.115371,
    pin: null,
  };

  const latlon = new mxn.LatLonPoint(vanarts.latitude, vanarts.longitude);

  vanarts.pin = new mxn.Marker(latlon);
  vanarts.pin.setInfoBubble('My School');
  map.addMarker(vanarts.pin);


  map.setCenterAndZoom(latlon, 18);
  map.addLargeControls();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    flickrMap,
  };
}
