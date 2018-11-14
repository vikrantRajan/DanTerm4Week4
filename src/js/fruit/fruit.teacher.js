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

const fruitXml = () => {
  const options = {
    url: '/api/fruit?format=xml',
    success: (response) => {
      const $fruits = $(response).find('fruit'); // array

      // loop through fruit elements
      $fruits.each((index, fruitElement) => {
        // inside loop console log the fruit name and colour
        const colour = $(fruitElement).text();
        const name = $(fruitElement).attr('name');
        console.log('colour', colour, 'name', name);
      });
    },
    error: (a, b, errorMessage) => console.error('AJAX error', errorMessage),
  };

  $.ajax(options);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitWithSpinner,
    fruitXml,
  };
}
