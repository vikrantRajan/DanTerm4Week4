const applyImageRollover = () => {
  const handleIn = () => {
    const secondaryPath = $('.js-rollover').attr('data-secondary');
    $('.js-rollover').attr('src', secondaryPath);
  };
  const handleOut = () => {
    const primaryPath = $('.js-rollover').attr('data-primary');
    $('.js-rollover').attr('src', primaryPath);
  };

  $('.js-rollover').hover(handleIn, handleOut);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    applyImageRollover,
  };
}
