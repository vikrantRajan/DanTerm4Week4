function cms() {
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=yvr&format=json',
    jsonpCallback: 'jsonFlickrFeed',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    success: (response) => {
      console.log(response);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cms,
  };
}
