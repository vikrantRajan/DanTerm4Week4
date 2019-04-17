const applyImageRollover = () => {
  const handleIn = function handleIn() {
    const sourcePath = $(this).attr('src');
    const secondaryPath = $(this).attr('data-secondary');

    // TODO inclass
    // backup 2004 JPG path as HTML attribute "data-primary"
    $(this)
      .attr('data-primary', sourcePath)
      .attr('src', secondaryPath);
  };

  const handleOut = function handleOut() {
    const primaryPath = $(this).attr('data-primary');
    $(this).attr('src', primaryPath);
  };

  $('.js-rollover').hover(handleIn, handleOut);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    applyImageRollover,
  };
}
