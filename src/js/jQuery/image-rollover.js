const applyImageRollover = () => {
  const handleIn = function handleIn() {
    const sourcePath = $(this).attr('src');
    const secondaryPath = $(this).attr('data-secondary');

    $(this)
      .attr('data-primary', sourcePath)
      .attr('src', secondaryPath);
  };

  const handleOut = function handleOut() {
    const primaryPath = $(this).attr('data-primary');
    $(this).attr('src', primaryPath);
  };

  $('.js-rollover').hover(handleIn, handleOut);

  // const handleInClassic = function handleInClassic() {
  //   const sourcePath = this.src;
  //   const secondaryPath = this.getAttribute('data-secondary');

  //   this.setAttribute('data-primary', sourcePath);
  //   this.src = secondaryPath;
  // };

  // const handleOutClassic = function handleOutClassic() {
  //   const primaryPath = this.getAttribute('data-primary');
  //   this.setAttribute('src', primaryPath);
  // };

  // Array.from(document.querySelectorAll('.js-rollover')).forEach((img) => {
  //   img.addEventListener('mouseover', handleInClassic);
  //   img.addEventListener('mouseout', handleOutClassic);
  // });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    applyImageRollover,
  };
}
