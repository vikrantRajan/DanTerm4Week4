/* global document */

const playChess = () => {
  const handleArrow = (event) => {
    const arrow = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    };

    // event.which normalized digit representation of a keyboard key (work in IE too)
    if (event.which === arrow.left
      || event.which === arrow.up
      || event.which === arrow.right
      || event.which === arrow.down) {
      console.log(event.which);
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
