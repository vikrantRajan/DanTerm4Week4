/* global utils */

const fruitWithSpinner = () => {
  $.ajax({
    url: '/api/slow-fruit',
    success: (response) => {
      $('#fruits').empty(); // $('#fruits').html(''); $('#fruits').text('');

      $.each(response, (fruitName, fruitColour) => {
        $('#fruits').append(`<li style="background-color: ${fruitColour}">${fruitName}</li>`);
      });
    },
    error: (a, b, errorMessage) => utils.print('AJAX error', errorMessage),
  });
};

const fruitXml = () => {
  const options = {
    url: '/api/fruit?format=xml',
    success: (response) => {
      const $fruits = $(response).find('fruit'); // array

      $fruits.each((index, fruitElement) => {
        const colour = $(fruitElement).text();
        const name = $(fruitElement).attr('name');

        // todo inclass output colour and name as HTML bullets
        // $(selector).method()
        // $('#fruits').append(`<li style="background-color: ${colour};">${name}</li>`);
        $('#fruits').append(`<li class="bullet-${colour}">${name}</li>`);
      });
    },
    error: (a, b, errorMessage) => utils.print('AJAX error', errorMessage),
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
