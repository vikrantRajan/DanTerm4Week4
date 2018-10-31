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

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboysDropdown,
  };
}
