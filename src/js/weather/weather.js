function weatherRoute() {
  $.ajax({
    url: '/api/weather',
    success: (response) => {
      const weather = response.weather;
      $('#weather').html(`<div>${weather.temperature}C</div><div class="${weather.conditionCss}" title="${weather.condition}">&nbsp;</div>`);
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    weatherRoute
  };
}
