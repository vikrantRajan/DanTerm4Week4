function playChess() {
  $('.piece').click((element) => {
    // find any/all "highlight" CSS classes then remove .highlight
    $('.highlight').removeClass('highlight');

    // find the clicked element then add .highlight
    $(element.target).addClass('highlight');
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess
  };
}
