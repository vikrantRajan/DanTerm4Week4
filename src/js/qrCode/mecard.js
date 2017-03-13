function mecardFormat(data) {
  const mecard = ['MECARD:'];
  mecard.push('N:', data.lname, ',', data.fname, ';');
  mecard.push('NOTE:', data.title, ';');
  mecard.push('URL:', data.url, ';');
  mecard.push(';'); // close MeCard

  return mecard.join('');
}

function textareaToQr() {
  const apiEndpoint = 'https://chart.googleapis.com/chart';
  const apiArgs = '?cht=qr&chs=300x300&chl=';
  const mecard = $('#mecard').val();

  $('#qr_code').attr('src', apiEndpoint + apiArgs + mecard);
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
      url
    });

    $('#mecard').val(mecard);

    event.preventDefault(); // cancel form action
  });

  $('#showQr').click(textareaToQr);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    buildMecard,
    mecardFormat
  };
}
