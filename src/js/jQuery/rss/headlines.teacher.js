/* global utils */
const renderRssHTML = (rssDoc, domSelector) => {
  const items = $(rssDoc).find('item');
  // loop through items
  items.each((index, item) => {
    // <item>
    //   <title attr="">...</title>
    //   <link>...</link>
    //   <description>...</description>
    // </item>
    const description = $(item).find('description').text();
    const link = $(item).find('link').text();
    const title = $(item).find('title').text();

    // display title with link as hyperlink use HTML
    const html = `<li><a href="${link}">${title}</a><br>${description}</li>`;
    $(domSelector).append(html);
  });
};

const newsHeadlines = () => {
  // todo inclass
  // gain access to XML via AJAX
  $.ajax({
    url: '/api/rss', // HTML page 1 --> Node backend /api/rss --> CBC RSS provider cbc.ca
    success: (response) => {
      renderRssHTML(response, '#news');
    },
    error: (a, b, errorMessage) => utils.print(errorMessage),
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    newsHeadlines,
  };
}
