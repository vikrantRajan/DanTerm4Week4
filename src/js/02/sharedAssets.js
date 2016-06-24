function insertMenu() {
  function buildCityMenu() {
    $.ajax({
      url: 'city.json',
      success: (response) => {
        let submenu = '';
        $.each(response.result, (key, obj) => {
          if (key === 'cities') {
            return true; // do nothing when cities
          }
          const condition = obj.condition.replace(' ', '_').toLowerCase();
          submenu += `<li class='${condition}'><a href="#">${key}</a></li>`;
          return submenu;
        });
        $('#menuCities').html(submenu);
      },
    });
  }


  $('head')
    .append('<link href="menu3.css" rel="stylesheet">');

  $.ajax({
    url: 'menu2.html',
    success: (response) => {
      $('#menu').html(response);

      $('#menuCities').parent().hover(() => {
        buildCityMenu();
      });
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    insertMenu,
  };
}
