function playChess() {
  $('.piece').click((element) => {
    $(element.target).addClass('highlight');
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess
  };
}
