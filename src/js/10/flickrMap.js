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
      pin.setInfoBubble(photo.path); // todo display an image not the path
      map.addMarker(pin);
    });

    map.autoCenterAndZoom();
  });

  map.enableScrollWheelZoom();
  map.addLargeControls();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    flickrMap,
  };
}
