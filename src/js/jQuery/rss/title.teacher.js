const getRss = (url) => {
  $.ajax({
    url,
    success: (response) => {
      const title = $(response).find('title:first').text();
      $('body').append(title);
    },
  });
};

const getLocalRss = () => {
  getRss('cbc.xml');
  // DRY - Don't Repeat Yourself
};

const getRemoteRss = () => getRss('/api/rss');

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss,
    getRemoteRss,
  };
}
