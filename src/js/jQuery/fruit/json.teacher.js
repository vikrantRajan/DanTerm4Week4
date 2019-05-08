const getFruitItems = () => {
  // get JSON from fruit route

  $.ajax({
    url: '/api/fruit',
    success: (response) => {
      console.log('JSON received', response);
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
