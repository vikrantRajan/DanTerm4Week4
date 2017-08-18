function yahooCallback(response) {
  const weatherItem = response.query.results.channel.item;
  const condition = weatherItem.condition.text;
  const conditionCss = condition.replace(/\s/g, ''); // Mostly Cloudy -> MostlyCloudy
  const temperature = weatherItem.condition.temp;

  $('#weather').html(`<div>${temperature}C</div><div class="${conditionCss}" title="${condition}">&nbsp;</div>`);
}

function yahooRoute() {
  $.ajax({
    url: '/api/yahoo',
    success: (response) => {
      const weather = response.weather;
      $('#weather').html(`<div>${weather.temperature}C</div><div class="${weather.conditionCss}" title="${weather.condition}">&nbsp;</div>`);
    }
  });
}

function yahooAjax() {
  $.ajax({
    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid%20=%209807%20and%20u=%27c%27&format=json',
    success: (response) => {
      const weatherItem = response.query.results.channel.item;
      const condition = weatherItem.condition.text;
      const conditionCss = condition.replace(/\s/g, '');
      const temperature = weatherItem.condition.temp;

      $('#weather').html(`<div>${temperature}C</div><div class="${conditionCss}" title="${condition}">&nbsp;</div>`);
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    yahooAjax,
    yahooCallback,
    yahooRoute
  };
}
