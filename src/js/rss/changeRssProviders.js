function changeRssProvider() {
  $('#providers').change(() => {
    const address = $('#providers').val();
    const $news = $('#news').text('');
    if (address === '') {
      return;
    }

    $.ajax({
      url: '/api/rss',
      data: {
        url: address,
      },
      success: (response) => {
        $(response).find('item').each((index, item) => {
          const title = $(item).children('title').text();
          const link = $(item).children('link').text();
          const description = $(item).children('description').text();

          $news.append(`<li><a href="${link}">${title}</a><p>${description}</p></li>`);
        });
      },
    });
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    changeRssProvider,
  };
}
