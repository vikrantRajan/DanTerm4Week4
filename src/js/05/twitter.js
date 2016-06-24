$.ajax({
  url: '/twitter',
  data: {},
  success: (response) => {
    $.each(response.tweets, (index, tweet) => {
      $('#news').append(`<li>${tweet.text}</li>`);
    });
  },
});
