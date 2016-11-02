function getRemoteRss() {
  $.ajax({
    url: '/api/rss',
    success: (response) => {
      const $news = $('#news');

      $(response).find('item').each((index, item) => {
        const title = $(item).children('title').text();
        const link = $(item).children('link').text();
        const description = $(item).children('description').text();

        $news.append(`<li><a href="${link}">${title}</a><p>${description}</p></li>`);
      });
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getRemoteRss,
  };
}
