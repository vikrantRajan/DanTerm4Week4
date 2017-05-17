function displayList(raw) {
  $('#country_suggestions').html(`<li>${raw}</li>`);
}

function queryService(keyword) {
  $.ajax({
    url: '/api/autocomplete',
    data: { keyword },
    success: (response) => {
      displayList(response.items);
    }
  });
}

function listenToInput() {
  $('#country_keywords').keyup((element) => {
    const keyword = $(element.target).val();
    queryService(keyword);
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
