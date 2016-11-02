function grocerJsonFruitsDelay() {
  $.ajax({
    url: '/api/slow-fruit',
    success: (response) => {
      const $fruits = $('#fruits').empty();
      $.each(response, (fruitName, colour) => {
        $fruits.append(`<li style="background-color: ${colour}">${fruitName}</li>`);
      });
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    grocerJsonFruitsDelay,
  };
}
