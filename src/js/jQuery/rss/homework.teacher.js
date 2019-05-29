/* global renderRssHTML */

const getManyRss = function getManyRss() {
  const rssUrl = $(this).val();

  $.ajax({
    url: `/api/rss?url=${rssUrl}`,
    success: (response) => {
      $('#news').empty(); // .html(''); erase previous RSS HTML
      renderRssHTML(response, '#news');
    },
  });
};

const bindDomManyProviders = () => {
  $('#providers').change(getManyRss);
};

const manyProviders = () => {
  bindDomManyProviders();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    manyProviders,
  };
}
