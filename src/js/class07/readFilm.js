/* global film */
function readFilm() {
  // display where? DOM -> selector body
  // display what? Harrison Ford > film.movies[0].abridged_cast[2]
  // *What* may need a loop??

  // jQuery pattern is selector -> method (what)
  $.each(film.movies[0].abridged_cast, (x, actor) => {
    // ES5 '<option>' + actor.name + '</option>''
    $('#actors').append(`<option>${actor.name}</option>`);
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    readFilm
  };
}
