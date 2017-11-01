function fruitSpinner() {
  console.log('fruitSpinner');
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitSpinner
  };
}
