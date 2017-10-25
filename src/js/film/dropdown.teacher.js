/* global utils */

function populateActors(response) {
  const harrison = response.movies[0].abridged_cast[2].name;
  $('#actors').append(`<option>${harrison}</option>`);
}

function getFilmData() {
  $.ajax({
    url: 'cowboy.json',
    success: (response) => {
      populateActors(response);
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
