const traverseDom = () => {
  $('#here').parent().parent().addClass('rule1');
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    traverseDom,
  };
}
