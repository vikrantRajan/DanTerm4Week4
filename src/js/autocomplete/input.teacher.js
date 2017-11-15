function listenToInput() {
  $('#country_keywords').keyup((event) => {
    const keyword = $(event.target).val(); // $(this).val()

    $('#country_suggestions').html(`<li>${keyword}</li>`);
  });
}

function autocomplete() {
  listenToInput();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete
  };
}
