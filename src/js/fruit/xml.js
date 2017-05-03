function displayFruits(response) {
  const $fruits = $('#fruits');

  $(response).find('fruit').each((index, element) => {
    const colour = $(element).text();
    const fruitName = $(element).attr('name');

    $fruits.append(`<li style="background-color: ${colour}">${fruitName}</li>`);
  });
}

function fruitXml() {
  // When? Immediately or based on user interaction?
  const options = {
    url: '/api/fruit?format=xml',
    success: displayFruits
  };
  $.ajax(options);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitXml
  };
}
