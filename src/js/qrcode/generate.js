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

function toJSON( form ) {
  var obj = {};
  var elements = form.querySelectorAll( "input, select, textarea" );
  for( var i = 0; i < elements.length; ++i ) {
    var element = elements[i];
    var name = element.name;
    var value = element.value;

    if( name ) {
      obj[ name ] = value;
    }
  }

  return obj;
}

function formatVcard(fields) {
  const vcard = ['BEGIN:VCARD\nVERSION:3.0'];

  vcard.push('N:', lname.value, ';', fname.value, '\n');
  vcard.push('FN:', fname.value, ' ', lname.value, '\n');
  vcard.push('TITLE:', title.value, '\n');
  vcard.push('URL:', url.value, '\n');
  vcard.push('END:VCARD'); // close vcard

  return vcard.join('');
}

function buildVcard() {
  $('form').on('submit', (event) => {
    const fields = toJSON(document.getElementsByTagName('form')[0]);
    document.querySelector('#vcard').value = formatVcard(fields);

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

function buildVcardQr() {
  $('form').on('submit', (event) => {
    const fields = toJSON(document.getElementsByTagName('form')[0]);
    const vcard = encodeURIComponent(formatVcard(fields));
    const apiEndpoint = 'https://chart.googleapis.com/chart';
    const apiArgs = '?cht=qr&chs=300x300&chl=';

    $('#qr_code').attr('src', apiEndpoint + apiArgs + vcard);

    event.preventDefault();
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    createQrBlob,
    buildVcard,
    buildVcardQr
  };
}
