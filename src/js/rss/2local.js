function getLocalRss() {
  $.ajax({
    url: '/jquery/rss/cbc.xml',
    success: (response) => {
      // Treat XML elements the same as HTML elements
      // Scan through the XML elements for either the copyright or author's title value
      // Todo output author's name to console
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss
  };
}
