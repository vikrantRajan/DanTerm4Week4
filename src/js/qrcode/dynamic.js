/* global document */
const createQrBlob = () => {
  const createImage = (label) => {
    const qrContainer = document.getElementById('qr_code');
    const serviceAddress = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${label}`;

    qrContainer.innerHTML = `<img src="${serviceAddress}" alt="QR Code">`;
  };

  const updateQrCode = function keypressTrigger() {
    createImage(this.value);
  };

  const bindDom = () => {
    document.getElementById('qr_source').addEventListener('keyup', updateQrCode);
  };

  bindDom();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    createQrBlob,
  };
}
