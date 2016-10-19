function readFilmAjax() {
  $.ajax({
    url: 'film.json',
    success: (response) => {
      $.each(response.movies[0].abridged_cast, (x, actor) => {
        // ES5 '<option>' + actor.name + '</option>''
        $('#actors').append(`<option>${actor.name}</option>`);
      });
    },
    error: (jqXHR, textStatus, errorThrown) => {
      debugger;
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    readFilmAjax,
  };
}
