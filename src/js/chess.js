const playChess = () => {
  const highlightPiece = function highlightPiece() {
    $(this).addClass('highlight');
  };

  const bindDom = () => {
    $('.piece').click(highlightPiece);
  };

  bindDom();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess,
  };
}
