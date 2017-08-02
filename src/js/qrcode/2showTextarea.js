function generateQrCode(val) {
  const src = ['https://chart.googleapis.com/chart?cht=qr', 'chs=300x300', `chl=${val}`].join('&');
  // const src = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${val}`;
  $('#qr_code').attr('src', src);
}

function showTextarea() {
  generateQrCode('');

  $('#qr_source').keyup(() => {
    generateQrCode(this.value);
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    showTextarea
  };
}
