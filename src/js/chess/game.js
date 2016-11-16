/* global document */

function chess() {
  function listenForArrows() {
    const arrow = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    };
    const corner = { // valid coordinates; next more is invalid
      topLeft: 50,
      bottomRight: 750,
    };
    $(document).keydown((event) => {
      let isArrow = false;
      const $chessPiece = $('.highlight');
      const currentPosition = $chessPiece.position();

      if (event.which === arrow.left && currentPosition.left > corner.topLeft) {
        $chessPiece.css('left', '-=100');
        isArrow = true;
      } else if (event.which === arrow.up && currentPosition.top > corner.topLeft) {
        $chessPiece.css('top', '-=100');
        isArrow = true;
      } else if (event.which === arrow.right && currentPosition.left < corner.bottomRight) {
        $chessPiece.css('left', '+=100');
        isArrow = true;
      } else if (event.which === arrow.down && currentPosition.top < corner.bottomRight) {
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
