/* global document */

function listenForArrows() {
  const keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  $(document).keydown((event) => {
    switch (event.which) {
      case keys.left:
        console.log('left');
        break;

      case keys.up:
        console.log('up');
        break;

      case keys.right:
        console.log('right');
        break;

      case keys.down:
        console.log('down');
        break;

      default: return; // exit this handler for other keys
    }

    event.preventDefault(); // prevent the default action (scroll / move caret)
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
