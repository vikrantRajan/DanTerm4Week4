function fruitXml() {
  // When? Immediately or based on user interaction?
  const options = {
    url: '/api/fruit?format=xml',
    success: (response) => {
      console.log(response);
    }
  };
  $.ajax(options);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitXml
  };
}
