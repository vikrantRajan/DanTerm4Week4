function highlightPiece() {
  $('.highlight').removeClass('highlight');
  $(this).addClass('highlight');
}

function bindDom() {
  $('.piece').click(highlightPiece);
}

function playChess() {
  bindDom();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess
  };
}
