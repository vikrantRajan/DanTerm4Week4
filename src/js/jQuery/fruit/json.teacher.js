/* global utils */

const hideSpinner = () => {
  // $(selector).method();
  // display none

  $('#fruits > li').css('display', 'none');
};

const populateFruitList = (fruits) => {
  let html = '';

  $.each(fruits, (fruit, colour) => {
    html += `<li style="background: ${colour};">${fruit}</li>`;
  });

  $('#fruits').append(html);
};

const getFruitItems = () => {
  // get JSON from fruit route

  $.ajax({
    url: '/api/slow-fruit',
    success: (response) => {
      hideSpinner();
      populateFruitList(response);
    },
    error: (x, xx, errorMessage) => {
      hideSpinner();
      utils.print('AJAX error', errorMessage);
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
