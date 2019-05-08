const fruitXml = () => {
  const options = {
    url: '/api/fruit?format=xml',
    success: (response) => {
      console.log('XML', response);
    },
  };

  $.ajax(options);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitXml,
  };
}
