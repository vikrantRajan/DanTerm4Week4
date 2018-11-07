const fruitWithSpinner = () => {
  $.ajax({
    url: '/api/slow-fruit',
    success: (response) => {
      $('#fruits').empty(); // $('#fruits').html(''); $('#fruits').text('');

      $.each(response, (fruitName, fruitColour) => {
        $('#fruits').append(`<li style="background-color: ${fruitColour}">${fruitName}</li>`);
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
