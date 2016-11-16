function chess() {
  $('.piece').click((element) => {
    $('.highlight').removeClass('highlight');
    $(element.target).addClass('highlight');
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    chess,
  };
}
