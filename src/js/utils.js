const utils = {
  print: (message) => {
    console.log(message); // eslint-disable-line no-console
  },
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    utils,
  };
}
