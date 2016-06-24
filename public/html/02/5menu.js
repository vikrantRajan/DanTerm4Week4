function insertMenu() {
  function buildCityMenu() {
    $.ajax({
      url: 'city.json',
      success: (response) => {
        const cities = Object.keys(response.result);
        cities.shift(); // drops the string cities
        const citiesHtml = cities.join('</a></li><li><a href="#">');
        const html = `<li><a href="#">${citiesHtml}</a></li>`;
        $('#menuCities').html(html);
      },
    });
  }


  $('head')
    .append('<link href="menu.css" rel="stylesheet">');

  $.ajax({
    url: 'menu2.html',
    success: (response) => {
      $('#menu').html(response);

      $('#menuCities').parent().click(() => {
        buildCityMenu();
      });
    },
  });
}
