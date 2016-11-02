function getLocalRss() {
  $.ajax({
    url: '/jquery/rss/cbc-technology.xml',
    success: (response) => {
      const $news = $('#news');
      $(response).find('item').each((index, item) => {
        const title = $(item).children('title').text();
        $news.append(`<li>${title}</li>`);
      });
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss,
  };
}
