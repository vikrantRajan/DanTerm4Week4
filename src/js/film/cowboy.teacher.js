/* global utils */

const cowboysDropdown = () => {
  $.ajax({
    url: 'cowboy.json',
    success: (response) => {
      $.each(response.movies, (indexMovie, movie) => {
        $.each(movie.abridged_cast, (indexActor, actor) => {
          $('#actors').append(`<option>${actor.name}</option>`);
        });
      });
    },
  });
};

const cowboyHomework = () => {
  $.ajax({
    url: '../film/cowboy.json',
    success: (response) => {
      $.each(response.movies, (indexMovie, movie) => {
        $.each(movie.abridged_cast, (indexActor, actor) => {
          $.each(actor.characters, (indexCharacter, character) => {
            $('#characters').append(`<option value="${actor.name}">${character}</option>`);
          });
        });
      });
    },
    error: (x, xx, errorMessage) => {
      utils.print('AJAX error', errorMessage);
    },
  });

  $('#characters').change(() => {
    const actorName = $('#characters').val();
    $('#actor').text(actorName);
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboysDropdown,
    cowboyHomework,
  };
}
