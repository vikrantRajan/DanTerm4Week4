const fruitWithSpinner = () => {
  $.ajax({
    url: '/api/slow-fruit',
    success: (response) => {
      $.each(response, (fruitName, fruitColour) => {
        // todo apply the fruit's colour to the <li>
        $('#fruits').append(`<li style="background-color: ${fruitColour}">${fruitName}</li>`);
        // $('#fruits').append(`<li class="fruit-${fruitName}">${fruitName}</li>`);
      });
    },
    error: (a, b, errorMessage) => console.error('AJAX error', errorMessage),
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitWithSpinner,
  };
}
