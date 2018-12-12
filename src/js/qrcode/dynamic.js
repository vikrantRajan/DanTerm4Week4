/* global document */
const createQrBlob = () => {
  const getImageHtml = (rawLabel) => {
    const encodedLabel = encodeURIComponent(rawLabel);
    const serviceAddress = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodedLabel}`;

    // Weakness poor performance as the image is destroyed and re-created every key tap
    return `<img src="${serviceAddress}" alt="QR Code">`;
  };

  const updateQrCode = function keypressTrigger() {
    document.getElementById('qr_code').innerHTML = getImageHtml(this.value);
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
