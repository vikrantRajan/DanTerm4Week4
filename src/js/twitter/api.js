function twitter() {
  $.ajax({
    url: '/api/twitter',
    success: (response) => {
      const lines = [];
      response.forEach((tweet) => {
        lines.push(`${tweet.text} - ${tweet.created_at}`);
      });
      // text line 1, text line 2
      // apply HTML elements as a list delimiter
      // text line 1</li><li>text line 2
      // bookend HTML elements
      // <li>text line 1</li><li>text line 2</li>
      $('#news').append(`<li>${lines.join('</li><li>')}</li>`);
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    twitter
  };
}
