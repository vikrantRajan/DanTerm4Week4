function getFilmData() {
  $.ajax({
    url: 'cowboy.json',
    success: (response) => {
      console.log(response);
    }
  });
}

function cowboysDropdown() {
  getFilmData();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cowboysDropdown
  };
}
