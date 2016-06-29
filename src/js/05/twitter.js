/* global formatTwitterDate */
const getTwitterFeed = () => {
  $.ajax({
    url: '/twitter',
    data: {},
    success: (response) => {
      $.each(response.tweets, (index, tweet) => {
        $('#news').append(`<li>${formatTwitterDate(tweet.date)}<br>${tweet.status}</li>`);
      });
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getTwitterFeed,
  };
}
