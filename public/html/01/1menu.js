$.ajax({
  url: 'menu.html',
  success: (response) => {
    $('#menu').html(response);
  },
});
