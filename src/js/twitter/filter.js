// Imperative programming paradigm
const twitterTweets = (response) => { // response is the user timeline
  const tweets = [];

  response.forEach((tweet) => {
    tweets.push({
      date: tweet.created_at,
      text: tweet.text,
    });
  });

  return tweets;
};

// Declarative programming paradigm
// tweet = { created_at, comments, text, users }
// returning { text }
// const twitterTweets = response => response.map(tweet => ({
//   date: tweet.created_at,
//   text: tweet.text,
// }));

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    twitterTweets,
  };
}
