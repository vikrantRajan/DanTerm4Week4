function generateQrCode({ text, $container }) {
  const safeText = encodeURIComponent(text);
  const src = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${safeText}`;
  $container.html(`<img src=${src}>`);
}

function createQrBlob() {
  $('#qr_source').keyup(function bindTextarea() {
    generateQrCode({ text: this.value, $container: $('#qr_code') });
  });
}

function buildVcard() {
  $('form').on('submit', (event) => {
    const fname = $('#fname').val();
    const lname = $('#lname').val();
    const title = $('#title').val();
    const url = $('#url').val();
    const vcard = ['BEGIN:VCARD\nVERSION:3.0'];

    vcard.push('N:', lname, ';', fname, '\n');
    vcard.push('FN:', fname, ' ', lname, '\n');
    vcard.push('TITLE:', title, '\n');
    vcard.push('URL:', url, '\n');
    vcard.push('END:VCARD'); // close vcard

    $('#vcard').val(vcard.join(''));

//     const vcardTemplate = `BEGIN:VCARD
// VERSION:3.0
// N: ${lname}; ${fname}
// FN ${fname} ${lname}
// TITLE: ${title}
// URL: ${url}
// END:VCARD`;

//     $('#vcard').val(vcardTemplate);

    event.preventDefault(); // cancel form action
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    createQrBlob,
    buildVcard
  };
}
