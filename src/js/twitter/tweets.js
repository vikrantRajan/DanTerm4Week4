function getTwitterTweets() {
  console.log('Hello Twitter');

  $.ajax({
    url: '/api/twitter',
    success: (response) => {
      const html = response.tweets.map(item => `<li>${item.text}</li>`);

      $('body').append(`<ul>${html.join('')}</ul>`);
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getTwitterTweets
  };
}

