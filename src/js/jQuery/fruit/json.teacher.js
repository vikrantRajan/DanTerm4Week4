const populateFruitList = (fruits) => {
  let html = '';

  $.each(fruits, (fruit, colour) => {
    html += `<li>${fruit} + ${colour}</li>`;
  });

  $('#fruits').append(html);
};

const getFruitItems = () => {
  // get JSON from fruit route

  $.ajax({
    url: '/api/fruit',
    success: (response) => {
      populateFruitList(response);
    },
    error: (x, xx, errorMessage) => {
      console.log('AJAX error', errorMessage);
    },
  });
};

const fruitWithSpinner = () => {
  getFruitItems();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitWithSpinner,
  };
}
