function getTwitterTweets() {
  $.ajax({
    url: '/api/twitter',
    success: (response) => {
      $.each(response.tweets, (index, tweet) => {
        $('#tweets').append(`<li>${tweet.text} <b>${tweet.date}</b></li>`);
      });
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getTwitterTweets
  };
}
