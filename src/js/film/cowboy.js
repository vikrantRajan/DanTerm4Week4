const cowboysDropdown = () => {
  $.ajax({
    url: 'cowboy.json',
    success: (response) => {
      $('#actors').append(`<option>${response.movies[0].abridged_cast[4].name}</option>`);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboysDropdown,
  };
}
