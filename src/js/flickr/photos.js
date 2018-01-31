/* global document, fetch */
function getFlickrGeoPublicPhotos() {
  const toImg = path => `<li><img src="${path}" alt="Photo"></li>`;
  const url = '/api/flickr';

  const success = (response) => {
    const html = response.paths.map(toImg);
    document.querySelector('#photos').innerHTML = html;
  };

  fetch(url)
    .then(rawResponse => rawResponse.json())
    .then(success)
    .catch(error => {
      // console.log('Dan Error:', error);
      document.querySelector('#photos').innerHTML = '<li>Unable to load gallery</li>';
    });
}

// function getFlickrGeoPublicPhotos() {
//   const toImg = path => `<li><img src="${path}" alt="Photo"></li>`;
//   const url = '/api/flickr';

//   const success = (response) => {
//     const html = response.paths.map(toImg);
//     $('#photos').html(html);
//   };

//   const options = {
//     url,
//     success
//   };

//   $.ajax(options);
// }

function getFlickrPublicPhotos() {
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=seabus&format=json',
    jsonpCallback: 'jsonFlickrFeed',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    success: (response) => {
      const html = [];
      response.items.forEach((item) => {
        html.push(`<img src="${item.media.m}">`);
      });
      $('body').append(html.join(''));
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPublicPhotos,
    getFlickrGeoPublicPhotos
  };
}
