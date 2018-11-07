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
      console.log(response);
      console.log($(response).find('fruit').length);

      const appleFruit = $(response).find('fruit')[0];
      const $appleFruit = $(response).find('fruit').eq(0);
      console.log(appleFruit);
      console.log(appleFruit.textContent);
      console.log(appleFruit.innerHTML);
      console.log($appleFruit.text());
      console.log($appleFruit.attr('name'));
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
