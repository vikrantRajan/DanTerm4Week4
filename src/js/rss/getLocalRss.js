function getLocalRss() {
  $.ajax({
    url: '/jquery/rss/cbc-technology.xml',
    success: (response) => {
      const title = $(response).find('channel > title').text();
      $('body').append(title);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss,
  };
}
