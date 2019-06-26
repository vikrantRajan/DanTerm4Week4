// const getFlickrPublicPhotos = () => {
//   $.ajax({
//     url: 'https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=vancouver',
//     dataType: 'jsonp',
//     jsonpCallback: 'jsonFlickrFeed',
//     success: (response) => {
//       const html = response.items.map(item => `<img src="${item.media.m}">`);
//       $('body').append(html);
//       // response.items.forEach(item => console.log(item.media.m));
//       // console.log(response.items[0].media.m);
//     },
//   });
// };

// If Node.js then export as public
// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//   module.exports = {
//     getFlickrPublicPhotos,
//   };
// }
