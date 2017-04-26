/* global film */

function cowboys() {
  // display where? DOM -> selector body
  // display what? Harrison Ford > film.movies[0].abridged_cast[2]
  // *What* may need a loop??

  // jQuery pattern is selector -> method (what)
  $('body').append(film.movies[0].abridged_cast[2].name);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboys
  };
}
