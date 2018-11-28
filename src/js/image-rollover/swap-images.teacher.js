/* global utils */

const applyImageRollover = () => {
  const hoverOn = function hoverOn() {
    // todo inclass: Read from the data-secondary attribute, not static image path
    const secondaryPath = $(this).attr('data-secondary');
    $(this).attr('src', secondaryPath);
  };
  const hoverOff = function hoverOff() {
    // this.src = 'images/stanley-park-2004.jpg';
    $(this).attr('src', 'images/stanley-park-2004.jpg');
    utils.print('Hover off');
  };

  $('.js-rollover').hover(hoverOn, hoverOff);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    applyImageRollover,
  };
}
