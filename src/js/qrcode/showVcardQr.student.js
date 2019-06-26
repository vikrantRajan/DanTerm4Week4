/* global document, FormData */

const convertFormToVcard = () => {
  // 1. Grabd the dynamic data from the form on the DOM
  const fields = new FormData(document.querySelector('form'));
  // 2. Arrange the V Card in this format, filled with dynamic data from above
  const Vcard = `BEGIN:VCARD
  VERSION:3.0
  N:${fields.get('lname')};${fields.get('fname')}
  FN:${fields.get('fname')} ${fields.get('lname')}
  TITLE:${fields.get('title')}
  URL:${fields.get('url')}
  END:VCARD`;
  const encodedLabel = encodeURIComponent(Vcard);
  // 3. Grabbing the link that creates the QR code filled with dynamic data
  const serviceAddress = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodedLabel}`;
  // 4. Returning this image with the dynamic form data as a QR code
  return `<img src="${serviceAddress}" alt="QR Code">`;
};

const QrFormSubmitted = (event) => {
  // 5. When the submit event happens, QR code is appended to the body
  $('body').append(convertFormToVcard());
  event.preventDefault();
};

const buildVcardQr = () => {
  // 6. Creating an event listener to submit the QR code
  document.querySelector('form').addEventListener('submit', QrFormSubmitted);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    buildVcardQr,
  };
}
