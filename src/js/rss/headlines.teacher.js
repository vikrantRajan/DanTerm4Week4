function appendRssNews({ $container, description, link, title }) {
  $container.append(`<li><a href="${link}">${title}</a><p>${description}</p></li>`);
}

function parseRssNews(response) {
  const $news = $('#news');
  $(response).find('item').each((index, item) => {
    const description = $(item).children('description').text();
    const link = $(item).children('link').text();
    const title = $(item).children('title').text();
    appendRssNews({ $container: $news, description, link, title });
  });
}

function newsHeadlines() {
  $.ajax({
    url: '/api/rss',
    success: parseRssNews
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    newsHeadlines
  };
}
