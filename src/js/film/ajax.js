function createDropdown(film) {
  $.each(film.movies[0].abridged_cast, (x, actor) => {
    $('#actors').append(`<option>${actor.name}</option>`);
  });
}

function ajaxCowboysDropdown() {
  $.ajax({
    url: 'film.json',
    success: (response) => {
      createDropdown(response);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      console.log(errorThrown);
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    ajaxCowboysDropdown
  };
}
