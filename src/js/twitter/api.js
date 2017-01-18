function twitter() {
  $.ajax({
    url: '/api/twitter',
    success: (response) => {
      console.log(response);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    twitter,
  };
}
