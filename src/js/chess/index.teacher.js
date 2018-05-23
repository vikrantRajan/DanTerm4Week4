/* global document, keys */

function highlightPiece() {
  // highlight count 0 or 1
  $('.highlight').removeClass('highlight');
  // highlight count 0
  $(this).addClass('highlight');
  // highlight count 1
}

function handleArrow(event) {
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
}

function listenForChessArrows() {
  $(document).keydown(handleArrow);
}

function bindChessDom() {
  $('.piece').click(highlightPiece);
}

function playChess() {
  bindChessDom();
  listenForChessArrows();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess,
  };
}
