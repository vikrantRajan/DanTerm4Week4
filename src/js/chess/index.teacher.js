/* global document, keys */

function highlightPiece() {
  // highlight count 0 or 1
  $('.highlight').removeClass('highlight');
  // highlight count 0
  $(this).addClass('highlight');
  // highlight count 1
}

function listenForChessArrows() {
  $(document).keydown((event) => {
    event.preventDefault(); // prevent the default action (scroll / move caret)

    switch (event.which) {
      case keys.up:
        console.log('up');
        break;

      case keys.right:
        console.log('right');
        break;

      case keys.down:
        console.log('down');
        break;

      case keys.left:
        console.log('left');
        break;

      default: break; // exit this handler for other keys
    }
  });
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
