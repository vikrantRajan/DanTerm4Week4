/* global document, FormData, getQrImageHtml */

const getFormAsVcard = () => {
  const fields = new FormData(document.querySelector('form'));

  return `BEGIN:VCARD
VERSION:3.0
N:${fields.get('lname')};${fields.get('fname')}
FN:${fields.get('fname')} ${fields.get('lname')}
TITLE:${fields.get('title')}
URL:${fields.get('url')}
END:VCARD`;
};

const formSubmitted = (event) => {
  document.getElementById('vcard').value = getFormAsVcard();
  event.preventDefault();
};

const buildVcard = () => {
  document.querySelector('form').addEventListener('submit', formSubmitted);
};

const buildVcardQr = () => {
  document.querySelector('form').addEventListener('submit', (event) => {
    $('#qr_code').parent().html(getQrImageHtml(getFormAsVcard()));
    event.preventDefault();
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    buildVcard,
    buildVcardQr,
  };
}
