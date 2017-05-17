function autocomplete() {
  $('#country_keywords').keyup((element) => {
    $('#country_suggestions').html(`<li>${$(element.target).val()}</li>`);
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete
  };
}
