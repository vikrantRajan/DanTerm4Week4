function autocomplete() {
  $('#country_keywords').keyup((event) => {
    $('#country_suggestions').text($(event.target).val());
  });
}


// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete,
  };
}
