/* global document, keys */

function listenForChessArrows() {
  $(document).keydown((event) => {
    let isArrow = false;
    const $chessPiece = $('.highlight');

    if (event.which === keys.left) {
      $chessPiece.css('left', '-=100px');
      isArrow = true;
    } else if (event.which === keys.up) {
      $chessPiece.css('top', '-=100px');
      isArrow = true;
    } else if (event.which === keys.right) {
      $chessPiece.css('left', '+=100px');
      isArrow = true;
    } else if (event.which === keys.down) {
      $chessPiece.css('top', '+=100px');
      isArrow = true;
    }

    if (isArrow) {
      event.preventDefault(); // prevent the default action (scroll / move caret)
    }
  });
}

function highlightPiece() {
  $('.highlight').removeClass('highlight');
  $(this).addClass('highlight');
}

function bindDom() {
  $('.piece').click(highlightPiece);
}

function playChess() {
  bindDom();
  listenForChessArrows();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess
  };
}
