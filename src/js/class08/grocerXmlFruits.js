function grocerXmlFruits() {
  $.ajax({
    url: '/api/fruit?format=xml',
    success: (response) => {
      const $fruits = $('#fruits');
      $(response).find('fruit').each((index, element) => {
        const colour = $(element).text();
        const fruitName = $(element).attr('name');
        $fruits.append(`<li style="background-color: ${colour}">${fruitName}</li>`);
      });
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    grocerXmlFruits
  };
}
