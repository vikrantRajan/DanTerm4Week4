function displayNewsHeadlines(response) {
  $(response).find('item').each((index, element) => {
    console.log(element);
  });
}

function getRssNews() {
  // Who is the RSS provider?
  const providerUrl = $(this).val();

  $.ajax({
    url: '/api/rss',
    data: {
      url: providerUrl // jQuery will generate query string as ?url=*
    },
    success: displayNewsHeadlines
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
