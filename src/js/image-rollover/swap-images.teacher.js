const applyImageRollover = () => {
  const hoverOn = () => {
    console.log('Hover on');
  };
  const hoverOff = () => {
    console.log('Hover off');
  };

  $('.js-rollover').hover(hoverOn, hoverOff);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    applyImageRollover,
  };
}
