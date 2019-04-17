const applyImageRollover = () => {
  const handleIn = () => {
    const sourcePath = $('.js-rollover').attr('src');
    const secondaryPath = $('.js-rollover').attr('data-secondary');

    // TODO inclass
    // backup 2004 JPG path as HTML attribute "data-primary"
    $('.js-rollover')
      .attr('data-primary', sourcePath)
      .attr('src', secondaryPath);
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
