function formatTwitterDate(stamp, compareDate = new Date()) {
  const date = new Date(stamp);
  const secDiff = ((compareDate.getTime() - date.getTime()) / 1000); // convert to second
  const dayDiff = Math.floor(secDiff / 86400);

  if (Number.isNaN(dayDiff) || dayDiff < 0) {
    return undefined;
  }

  const lessThanDay = (
    (secDiff < 60 && 'just now')
    || (secDiff < 120 && '1 minute ago')
    || (secDiff < 3600 && `${Math.floor(secDiff / 60).toString()} minutes ago`)
    || (secDiff < 7200 && '1 hour ago')
    || (secDiff < 86400 && `${Math.floor(secDiff / 3600).toString()} hours ago`)
  );

  return (dayDiff === 0 && lessThanDay)
    || (dayDiff === 1 && 'Yesterday')
    || (dayDiff < 7 && `${dayDiff.toString()} days ago`)
    || (dayDiff === 7 && '1 week ago')
    || (dayDiff < 30 && `${Math.ceil(dayDiff / 7).toString()} weeks ago`);
}

const getTwitterTweets = () => {
  $.ajax({
    // url: '/api/flickr',
    method: 'GET',
    url: '/api/twitter',
    success: (response) => {
            const html = response.map(result => `<strong>${formatTwitterDate(result.created_at)}</strong> <br> ${result.text} <br> <br>`);

      // console.log(html);
      $('body').append(html);
    },
  });
};
// formatTwitterDate();
// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getTwitterTweets, formatTwitterDate,
  };
}
