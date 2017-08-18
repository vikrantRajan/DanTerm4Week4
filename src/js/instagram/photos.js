function instagram() {
  $.ajax({
    url: '/api/instagram',
    success: (response) => {
      const html = [];
      response.forEach((photo) => {
        html.push(`<img src="${photo.images.thumbnail.url}" width="${photo.images.thumbnail.width}" height="${photo.images.thumbnail.height}">`);
      });
      $('body').append(html.join(''));
    }
  });
}

function instagramMedia() {
  $.ajax({
    url: '/api/instagram-media',
    success: (response) => {
      const html = [];
      response.items.forEach((item) => {
        html.push(`<img src="${item.thumbnail.url}">`);
      });
      $('body').append(html.join(''));
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    instagram,
    instagramMedia
  };
}
