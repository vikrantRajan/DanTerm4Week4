/* global document, keys */

function listenForChessArrows() {
  const boardCorners = {
    leftTop: 50,
    rightBottom: 750
  };

  $(document).keydown((event) => {
    let isArrow = false;
    const $chessPiece = $('.highlight');
    const currentPosition = $chessPiece.position();

    if (event.which === keys.left && currentPosition.left > boardCorners.leftTop) {
      $chessPiece.css('left', '-=100');
      isArrow = true;
    } else if (event.which === keys.up && currentPosition.top > boardCorners.leftTop) {
      $chessPiece.css('top', '-=100');
      isArrow = true;
    } else if (event.which === keys.right && currentPosition.left < boardCorners.rightBottom) {
      $chessPiece.css('left', '+=100');
      isArrow = true;
    } else if (event.which === keys.down && currentPosition.top < boardCorners.rightBottom) {
      $chessPiece.css('top', '+=100');
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
