/* global fetch, utils */

const getTwitterTweetsWithDateFetch = async () => {
  // fetch('/api/twitter')
  //   .then(response => response.json())
  //   .then(json => console.log(json));

  // this approach is preferred over promises with then as there are no silent failures
  // variable scope is easier to access
  // try / catch is also easier to read as the code avoids nesting
  try {
    const response = await fetch('/api/twitter');
    const json = await response.json();

    utils.print(json);
  } catch (error) {
    utils.print(error);
  }
};

const getTwitterTweetsWithDate = () => {
  $.ajax({
    url: '/api/twitter',
    success: (response) => {
      const html = response
        .map(tweet => `<li><b>${tweet.date}</b> ${tweet.text}</li>`)
        .join('');

      $('#tweets').html(html);
    },
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getTwitterTweetsWithDate,
    getTwitterTweetsWithDateFetch,
  };
}
