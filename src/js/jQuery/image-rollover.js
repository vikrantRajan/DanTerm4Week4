const applyImageRollover = () => {
  console.log('Hello from image rollover!');
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    applyImageRollover,
  };
}
