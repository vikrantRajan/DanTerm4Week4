/* global film */
function readFilm() {
  $('body').append(film.movies[0].abridged_cast[2].name);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    readFilm,
  };
}
