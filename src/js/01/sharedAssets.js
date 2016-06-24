function insertMenuV1() {
  function buildCityMenu() {
    $.ajax({
      url: 'city.json',
      success: (response) => {
        console.log(Object.keys(response.response));
      },
    });
  }


  $('head')
    .append('<link href="menu.css" rel="stylesheet">');

  $.ajax({
    url: 'menu.html',
    success: (response) => {
      $('#menu').html(response);

      $('#menuCities').parent().click(() => {
        buildCityMenu();
      });
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    insertMenuV1,
  };
}
