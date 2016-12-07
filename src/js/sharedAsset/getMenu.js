function shareAsset() {
  $.ajax({
    url: 'menu.html',
    success: (response) => {
      console.log(response);
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    shareAsset,
  };
}
