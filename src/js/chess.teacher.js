/* global document */

const movePiece = (event) => {
  const arrow = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  };
  const $chessPiece = $('.highlight');

  if (event.which === arrow.left) {
    $chessPiece.css('left', '-=100px');
  } else if (event.which === arrow.up) {
    $chessPiece.css('top', '-=100px');
  } else if (event.which === arrow.right) {
    $chessPiece.css('left', '+=100px');
  } else if (event.which === arrow.down) {
    $chessPiece.css('top', '+=100px');
  }
};

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
    // $(document).keyup(movePiece);

    document.addEventListener('keyup', movePiece);
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
