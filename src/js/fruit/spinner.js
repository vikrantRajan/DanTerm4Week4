function fruitSpinner() {
  // When? Immediately or based on user interaction?
  $.ajax({
    url: '/api/slow-fruit',
    success: (response) => {
      const $fruits = $('#fruits');

      $fruits.find('li').remove(); // remove all li elements including spinner

      $.each(response, (fruitName, colour) => {
        $fruits.append(`<li style="background-color: ${colour}">${fruitName}</li>`);
      });
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitSpinner
  };
}
