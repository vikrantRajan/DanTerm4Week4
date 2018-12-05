/* global document */

const playChess = () => {
  const handleArrow = (event) => {
    const arrow = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    };

    const boardCorners = { // 50, 750 plus decimal
      leftTop: 51,
      rightBottom: 749,
    };

    const $chessPiece = $('.highlight');
    const currentPosition = $chessPiece.position();
    let isArrow = false;

    // event.which normalized digit representation of a keyboard key (work in IE too)
    if (event.which === arrow.left && currentPosition.left > boardCorners.leftTop) {
      $chessPiece.css('left', '-=100px');
      isArrow = true;
    } else if (event.which === arrow.up && currentPosition.top > boardCorners.leftTop) {
      $chessPiece.css('top', '-=100px');
      isArrow = true;
    } else if (event.which === arrow.right && currentPosition.left < boardCorners.rightBottom) {
      $chessPiece.css('left', '+=100px');
      isArrow = true;
    } else if (event.which === arrow.down && currentPosition.top < boardCorners.rightBottom) {
      $chessPiece.css('top', '+=100px');
      isArrow = true;
    }

    if (isArrow) {
      event.preventDefault();
    }
  };

  const highlightPiece = function highlightPiece() {
    $('.highlight').removeClass('highlight');
    $(this).addClass('highlight');
  };

  const bindDom = () => {
    $('.piece').click(highlightPiece);
    $(document).keydown(handleArrow);
  };

  bindDom();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess,
  };
}
