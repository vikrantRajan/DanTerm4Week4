function listenForChessArrows() {
  $(document).keydown((event) => {
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

      default: return; // exit this handler for other keys
    }

    event.preventDefault(); // prevent the default action (scroll / move caret)
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
