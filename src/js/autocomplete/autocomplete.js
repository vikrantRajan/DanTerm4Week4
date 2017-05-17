function autocomplete() {
  $('#country_keywords').keyup((element) => {
    const keyword = $(element.target).val();
    $('#country_suggestions').html(`<li>${keyword}</li>`);
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete
  };
}
