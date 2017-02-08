function mecardFormat(data) {
  const mecard = ['MECARD:'];
  mecard.push('N:', data.lname, ',', data.fname, ';');
  mecard.push('NOTE:', data.title, ';');
  mecard.push('URL:', data.url, ';');
  mecard.push(';'); // close MeCard

  return mecard.join('');
}

function buildMecard() {
  $('form').on('submit', (event) => {
    const fname = $('#fname').val();
    const lname = $('#lname').val();
    const title = $('#title').val();
    const url = $('#url').val();
    const mecard = mecardFormat({
      fname,
      lname,
      title,
      url,
    });

    $('#mecard').val(mecard);

    event.preventDefault(); // cancel form action
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    buildMecard,
    mecardFormat,
  };
}
