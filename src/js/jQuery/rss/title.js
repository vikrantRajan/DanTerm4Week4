const getLocalRss = () => {
  $.ajax({
    url: 'cbc.xml',
    success: (response) => {
      const title = $(response).find('title:first').text();
      $('body').append(title);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss,
  };
}
