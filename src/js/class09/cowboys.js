function cowboys() {
  /*
      Get film JSON
          AJAX
      HTML
          Native (check)
          JS
          change event
  */
  $.ajax({
    url: '../class07/film.json',
    success: (response) => {
      const $characters = $('#characters');
      // Build HTML dropdown
      $.each(response.movies, (x, movie) => {
        $.each(movie.abridged_cast, (y, cast) => {
          const actor = cast.name;
          $.each(cast.characters, (z, character) => {
            $characters.append(`<option value="${actor}">${character}</option>`);
          });
        });
      });
      // Bind change event
      $characters.change(function change() { // using *function* for the *this* reference
        $('#actor').text(this.value);
      });
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboys,
  };
}
