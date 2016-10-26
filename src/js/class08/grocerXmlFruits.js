function grocerXmlFruits() {
  $.ajax({
    url: '/api/fruit?format=xml',
    success: (response) => {
      const $fruits = $('#fruits');
      $(response).find('fruit').each((index, element) => {
        $fruits.append(`<li style="background-color: ${$(element).text()}">${$(element).attr('name')}</li>`);
      });
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    grocerXmlFruits,
  };
}
