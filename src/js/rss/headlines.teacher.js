const newsHeadlines = () => {
    // todo inclass
    // gain access to XML via AJAX
    $.ajax({
        url: '/api/rss', // HTML page 1 --> Node backend /api/rss --> CBC RSS provider cbc.ca
        success: (response) => {
            const items = $(response).find('item');
            // loop through items
            items.each((index, item) => {
                console.log($(item).text());
                // display title with link as hyperlink
            });
        },
        error: (a, b, errorMessage) => console.error(errorMessage),
    });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        newsHeadlines,
    };
  }