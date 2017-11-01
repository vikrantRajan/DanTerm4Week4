function displayFruit(response) {
  console.log(response);
}

function fruitSpinner() {
  $.ajax({
    url: '/api/slow-fruit',
    success: displayFruit
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitSpinner
  };
}
