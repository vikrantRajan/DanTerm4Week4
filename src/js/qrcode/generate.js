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

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    createQrBlob,
  };
}
