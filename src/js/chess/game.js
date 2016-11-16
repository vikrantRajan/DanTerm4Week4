/* global document */

function chess() {
  function listenForArrows() {
    const arrow = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    };
    $(document).keydown((event) => {
      let isArrow = false;
      const $chessPiece = $('.highlight');
      if (event.which === arrow.left) {
        $chessPiece.css('left', '-=100');
        isArrow = true;
      } else if (event.which === arrow.up) {
        $chessPiece.css('top', '-=100');
        isArrow = true;
      } else if (event.which === arrow.right) {
        $chessPiece.css('left', '+=100');
        isArrow = true;
      } else if (event.which === arrow.down) {
        $chessPiece.css('top', '+=100');
        isArrow = true;
      }

      if (isArrow) {
        event.preventDefault(); // prevent the default action (scroll / move caret)
      }
    });
  }


  $('.piece').click((element) => {
    $('.highlight').removeClass('highlight');
    $(element.target).addClass('highlight');
  });
  listenForArrows();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    chess,
  };
}
