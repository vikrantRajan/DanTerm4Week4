function ajaxCowboysDropdown() {
  $.ajax({
    url: 'film.json',
    success: (response) => {
      debugger;
      // display all the cast members as a dropdown menu
    },
    error: (jqXHR, textStatus, errorThrown) => {
      debugger;
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    ajaxCowboysDropdown
  };
}
