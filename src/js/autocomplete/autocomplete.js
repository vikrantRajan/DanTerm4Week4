function displayCountries(output) {
  $('#country_suggestions').text(output);
}
function callService(keyword) {
  $.ajax({
    url: '/api/autocomplete',
    data: {
      keyword,
    },
    success: (response) => {
      displayCountries(response.items);
    },
  });
}

function autocomplete() {
  $('#country_keywords').keyup((event) => {
    callService($(event.target).val());
  });
}


// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete,
  };
}
