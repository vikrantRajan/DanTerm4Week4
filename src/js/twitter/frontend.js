const getTwitterTweetsWithDate = () => {
  $.ajax({
    url: '/api/twitter',
    success: (response) => {
      const html = response
        .map(tweet => `<li><b>${tweet.date}</b> ${tweet.text}</li>`)
        .join('');

      $('#tweets').html(html);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getTwitterTweetsWithDate,
  };
}
