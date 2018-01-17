function getTwitterTweets() {
  console.log('Hello Twitter');
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getTwitterTweets
  };
}

