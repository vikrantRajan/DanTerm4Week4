function grocerFruits() {
  $.ajax({
    url: '/api/fruit',
    success: (response) => {
      console.log(response);
      $('#fruits').html(`<li>${response.apple}</li>`);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    grocerFruits,
  };
}
