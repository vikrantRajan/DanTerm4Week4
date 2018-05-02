function appendFruit(fruitName, colour) {
  $('#fruits')
    .append(`<li style="background-color: ${colour}">${fruitName}</li>`);
}

function parseFruitResponse(response) {
  Object.keys(response).forEach((fruitName) => {
    appendFruit(fruitName, response[fruitName]);
  });
}

function getFruitData() {
  $.ajax({
    url: '/api/slow-fruit',
    // success: (response) => {
    //   parseFruitResponse(response);
    // },
    success: parseFruitResponse,
  });
}

function fruitWithSpinner() {
  getFruitData();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitWithSpinner,
  };
}
