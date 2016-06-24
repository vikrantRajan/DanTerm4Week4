$.ajax({
  url: '/twitter',
  data: {},
  success: (response) => {
    $.each(response.tweets, (index, tweet) => {
      $('body').append(tweet.text);
    });
  },
});
