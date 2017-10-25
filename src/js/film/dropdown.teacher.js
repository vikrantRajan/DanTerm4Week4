/* global utils */

function getFilmData() {
  $.ajax({
    url: 'cowboy.json',
    success: (response) => {
      utils.print(response);
    }
  });
}

function cowboysDropdown() {
  getFilmData();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboysDropdown
  };
}
