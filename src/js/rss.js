const getLocalRss = () => {
  console.log('hello rss');
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss,
  };
}
