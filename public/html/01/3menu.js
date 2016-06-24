function displayCityMenu() {
  $.ajax({
    url: 'city.json',
    success: (response) => {
      $("#menuCities").html("<li>" + response.result.cities.join("</li><li>") + "</li>");
    },
  });
}

$('head').append('<link href="menu.css" rel="stylesheet">');

$.ajax({
  url: 'menu.html',
  success: (response) => {
    $('#menu').html(response);

    displayCityMenu();
  },
});
