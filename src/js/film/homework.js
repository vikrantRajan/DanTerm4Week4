function cowboyHomework() {
  $.ajax({
    url: '/jquery/film/film.json',
    success: (response) => {
      const $characters = $('#characters');
      // Build HTML dropdown
      $.each(response.movies, (x, movie) => {
        $.each(movie.abridged_cast, (z, cast) => {
          const actor = cast.name;
          $.each(cast.characters, (y, character) => {
            $characters.append(`<option value="${actor}">${character}</option>`);
          });
        });
      });
      // Bind change event
      $characters.change(() => {
        $('#actor').text(this.value);
      });
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboyHomework
  };
}
