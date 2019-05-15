const traverseDom = () => {
  const $here = $('#here');
  // $here.parent().parent().attr('class', 'rule1');
  $here.parents('li:first').addClass('rule1'); // preferred

  $here.parents('li:first').parents('li:first').addClass('rule2');

  // $here.find('li').first().addClass('rule3');
  $here.find('li:first').addClass('rule3'); // preferred

  $here.next().addClass('rule4');

  // Chaining is more complex, harder to debug, but better performance
  // $('#here')
  //   .parent()
  //   .parent()
  //   .attr('class', 'rule1')
  //   .parents('li:first')
  //   .addClass('rule2') // shorthand for .attr('class', 'rule2')
  //   .end() // doc http://api.jquery.com/end/
  //   .end() // up to 2nd parent call
  //   .end() // up to #here
  //   .find('li:first')
  //   .addClass('rule3')
  //   .end() // down to #here
  //   .next()
  //   .addClass('rule4');
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    traverseDom,
  };
}
