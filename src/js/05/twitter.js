/* global formatTwitterDate */
$.ajax({
  url: '/twitter',
  data: {},
  success: (response) => {
    $.each(response.tweets, (index, tweet) => {
      $('#news').append(`<li>${formatTwitterDate(tweet.date)}<br>${tweet.status}</li>`);
    });
  },
});
