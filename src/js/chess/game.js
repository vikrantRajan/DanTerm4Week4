/* global document */

function listenForArrows() {
  const keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };
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

function playChess() {
  listenForArrows();
  $('.piece').click((element) => {
    // find any/all "highlight" CSS classes then remove .highlight
    $('.highlight').removeClass('highlight');

    // find the clicked element then add .highlight
    $(element.target).addClass('highlight');
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess
  };
}
