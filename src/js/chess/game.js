/* global document */

function listenForArrows() {
  const keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  $(document).keydown((event) => {
    let isArrow = false;
    const $chessPiece = $('.highlight');

    if (event.which === keys.left) {
      $chessPiece.css('left', '-=100');
      isArrow = true;
    } else if (event.which === keys.up) {
      $chessPiece.css('top', '-=100');
      isArrow = true;
    } else if (event.which === keys.right) {
      $chessPiece.css('left', '+=100');
      isArrow = true;
    } else if (event.which === keys.down) {
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
