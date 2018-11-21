const newsHeadlines = () => {
    // todo inclass
    // gain access to XML via AJAX
    $.ajax({
        url: '',
        success: () => {
            // loop through items
            // display title with link as hyperlink
        },
        error: () => {},
    });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        newsHeadlines,
    };
  }