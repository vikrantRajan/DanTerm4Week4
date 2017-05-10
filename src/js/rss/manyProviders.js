function getRssNews() {
  // Who is the RSS provider?
  // todo inclass Answer

  $.ajax({
    url: '/api/rss',
    success: (response) => {
      console.log(response);
    }
  });
}

function manyProviders() {
  $('#providers').change(getRssNews);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    manyProviders
  };
}
