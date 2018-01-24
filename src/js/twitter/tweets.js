function queryTwitter(success) {
  $.ajax({
    url: '/api/twitter',
    success
  });
}

function getTwitterTweets() {
  const success = (response) => {
    const html = response.tweets.map(item => `<li>${item.text}</li>`);

    $('body').append(`<ul>${html.join('')}</ul>`);
  };

  queryTwitter(success);
}

function getTwitterTweetsWithDate() {
  const success = (response) => {
    const html = response.tweets.map(({ date, text }) => `<li>(${date}) ${text}</li>`);
    // const html = response.tweets.map(item => `<li>(${item.date}) ${item.text}</li>`);

    $('body').append(`<ul>${html.join('')}</ul>`);
  };

  queryTwitter(success);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getTwitterTweets,
    getTwitterTweetsWithDate
  };
}

