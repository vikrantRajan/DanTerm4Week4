/* global document */

const highlightPiece = function highlightPiece() {
  // $('.highlight').removeClass('highlight');
  // $(this).addClass('highlight');

  const previousHighlight = document.querySelector('.highlight');
  if (previousHighlight) previousHighlight.classList.remove('highlight');
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
