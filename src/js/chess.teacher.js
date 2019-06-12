/* global document */

const highlightPiece = function highlightPiece() {
  // $(this).addClass('highlight');

  this.classList.add('highlight');
};

const playChess = () => {
  const bindDom = () => {
    // $('.piece').click(highlightPiece);

    document.querySelectorAll('.piece').forEach((piece) => {
      piece.addEventListener('click', highlightPiece);
    });
  };

  bindDom();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess,
  };
}
