function appendActor(actor) {
  $('#actors').append(`<option>${actor.name}</option>`);
}

function populateActors(response) {
  // response.movies[0].abridged_cast.forEach(actor => appendActor(actor));

  response.movies.forEach((movie) => {
    movie.abridged_cast.forEach(actor => appendActor(actor));
  });
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
