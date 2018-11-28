/* global utils */

const displayRssConent = (response) => {
  const items = $(response).find('item');

  let html = '';
  // loop through items
  items.each((index, item) => {
    // <item>
    //   <title attr="">...</title>
    //   <link>...</link>
    // </item>
    const description = $(item).find('description').text();
    const link = $(item).find('link').text();
    const title = $(item).find('title').text();

    // display title with link as hyperlink use HTML
    html += `<li><a href="${link}">${title}</a><br>${description}</li>`;
  });

  $('#news').html(html);
};

const getRssContent = (url) => {
  $.ajax({
    url: `/api/rss?url=${url}`,
    success: displayRssConent,
    error: (a, b, errorMessage) => utils.print('error', errorMessage),
  });
};

const manyProviders = () => {
  // add event listener to dropdown menu
  // $(selector).method()
  $('#providers').change(() => {
    const rssProviderUrl = $('#providers').val();
    getRssContent(rssProviderUrl);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    manyProviders,
  };
}
