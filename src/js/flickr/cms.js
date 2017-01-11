function cms() {
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=yvr&format=json',
    jsonpCallback: 'jsonFlickrFeed',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    success: (response) => {
      $('body').append('<img src="https://farm1.staticflickr.com/342/32242106415_ec5aa538c6_m.jpg">');
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cms,
  };
}
