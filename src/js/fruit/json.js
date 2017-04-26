function fruitJson() {
  $.ajax({
    url: '/api/fruit',
    success: (response) => {
      const $fruits = $('#fruits');
      $.each(response, (fruitName) => {
        $fruits.append(`<li>${fruitName}</li>`);
      });
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    fruitJson
  };
}
