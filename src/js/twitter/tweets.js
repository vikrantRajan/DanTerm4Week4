function getTwitterTweets() {
  $.ajax({
    url: '/api/twitter',
    success: (response) => {
      $.each(response.tweets, (index, text) => {
        $('#tweets').append(`<li>${text}</li>`);
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
