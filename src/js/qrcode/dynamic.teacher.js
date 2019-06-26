/* global document */

const getQrImageHtml = (rawLabel) => {
  const encodedLabel = encodeURIComponent(rawLabel);
  const serviceAddress = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodedLabel}`;

  // Weakness poor performance as the image is destroyed and re-created every key tap
  // Improvement would be to wait for the keyword to be completed and then request image
  // For example lodash/debounce
  return `<img src="${serviceAddress}" alt="QR Code">`;
};

const createQrBlob = () => {
  const qrInput = document.getElementById('qr_source');
  const qrOutput = document.getElementById('qr_code');

  const updateQrCode = () => {
    qrOutput.innerHTML = getQrImageHtml(qrInput.value);
  };

  const bindDom = () => {
    qrInput.addEventListener('keyup', updateQrCode);
  };

  bindDom();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    createQrBlob,
  };
}
