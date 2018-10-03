const applyImageRollover = () => {
  const hoverOn = function hoverOn() {
    // this.src = 'images/stanley-park-1926.jpg';
    $(this).attr('src', 'images/stanley-park-1926.jpg');
    console.log('Hover on');
  };
  const hoverOff = function hoverOff() {
    // this.src = 'images/stanley-park-2004.jpg';
    $(this).attr('src', 'images/stanley-park-2004.jpg');
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
