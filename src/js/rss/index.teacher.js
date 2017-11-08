function getLocalRss() {
  console.log('sd2');
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss
  };
}
