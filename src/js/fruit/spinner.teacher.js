function appendFruit(fruitName, colour) {
  $('#fruits')
    .append(`<li style="background-color: ${colour}">${fruitName}</li>`);
}

function parseResponse(response) {
  Object.keys(response).forEach((fruitName) => {
    appendFruit(fruitName, response[fruitName]);
  });
}

function fruitSpinner() {
  $('#fruits').empty(); // delete the HTML <li>Todo</li>
  $.ajax({
    url: '/api/slow-fruit',
    success: parseResponse
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitSpinner
  };
}
