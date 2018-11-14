const getLocalRss = () => {
  const options = {
    url: 'cbc.xml',
    success: (response) => {
      const title = $(response).find('title').first().text();

      $('body').append(title);
    },
    error: (a, b, errorMessage) => console.error(errorMessage),
  };

  $.ajax(options);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss,
  };
}
