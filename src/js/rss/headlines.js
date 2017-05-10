function newsHeadlines() {
  $.ajax({
    url: '/api/rss',
    success: (response) => {
      $(response).find('item').each((index, element) => {
        // todo Display news headline content
        console.log(element);
      });
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    newsHeadlines
  };
}
