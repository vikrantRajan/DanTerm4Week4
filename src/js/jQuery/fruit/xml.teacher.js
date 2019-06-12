/* global utils */

const fruitXml = () => {
  const options = {
    url: '/api/fruit?format=xml',
    success: (response) => {
      utils.print('XML', response);
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
