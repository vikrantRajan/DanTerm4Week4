function highlightPiece() {
  // highlight count 0 or 1
  $('.highlight').removeClass('highlight');
  // highlight count 0
  $(this).addClass('highlight');
  // highlight count 1
}


function bindChessDom() {
  $('.piece').click(highlightPiece);
}

function playChess() {
  bindChessDom();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess,
  };
}
