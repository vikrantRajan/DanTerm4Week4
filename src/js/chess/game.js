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
      if (event.which === arrow.left) {
        console.log('left');
      } else if (event.which === arrow.up) {
        console.log('up');
      } else if (event.which === arrow.right) {
        console.log('right');
      } else if (event.which === arrow.down) {
        console.log('down');
      }

      event.preventDefault(); // prevent the default action (scroll / move caret)
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
