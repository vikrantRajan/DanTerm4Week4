$('head').append('<link href="menu.css" rel="stylesheet">');

$.ajax({
  url: 'menu.html',
  success: (response) => {
    $('#menu').html(response);
  },
});
