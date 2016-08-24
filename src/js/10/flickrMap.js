/* global mxn */
const getFlickrData = (callback) => {
  $.ajax({
    url: '/flickr-map',
    data: {
      keyword: 'vancouver seabus',
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
      pin.setInfoBubble(`<img src="${photo.path}" width="100" height="70">`);
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
