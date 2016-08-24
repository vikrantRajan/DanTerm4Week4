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
    $.each(response.photos, (index, photo) => {
      const latlon = new mxn.LatLonPoint(photo.latitude, photo.longitude);

      const pin = new mxn.Marker(latlon);
      pin.setInfoBubble(photo.path);
      map.addMarker(pin);
    });
  });

  const vanarts = {
    latitude: 49.282703,
    longitude: -123.115371,
    pin: null,
  };
  const latlon = new mxn.LatLonPoint(vanarts.latitude, vanarts.longitude);

  map.setCenterAndZoom(latlon, 18);
  map.addLargeControls();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    flickrMap,
  };
}
