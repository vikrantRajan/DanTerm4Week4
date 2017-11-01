function appendFruit(fruitName, colour) {
  $('#fruits')
    .append(`<li style="background-color: ${colour}">${fruitName}</li>`);
}

function parseResponse(response) {
  Object.keys(response).forEach((fruitName) => {
    appendFruit(fruitName, response[fruitName]);
  });
}

function hideSpinner() {
  $('#fruits').empty(); // delete the HTML <li>Todo</li>
}

function fruitSpinner() {
  $.ajax({
    url: '/api/slow-fruit',
    success: (response) => {
      hideSpinner();
      parseResponse(response);
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitSpinner
  };
}
