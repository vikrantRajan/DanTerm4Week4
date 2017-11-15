function queryService(keyword) {
  $.ajax({
    url: '/api/autocomplete',
    data: { keyword },
    success: (response) => {
      // todo format in own function
      $('#country_suggestions').html(`<li>${response.items}</li>`);
    }
  });
}

function listenToInput() {
  $('#country_keywords').keyup((event) => {
    const keyword = $(event.target).val();
    queryService(keyword);
  });
}

function autocomplete() { // HTML initates
  listenToInput();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete
  };
}
