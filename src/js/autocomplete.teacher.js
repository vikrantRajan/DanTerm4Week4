/* global utils */

const autocomplete = () => {
  // $('body').append('<input type="text" id="keyword">');

  // $('#keyword').keyup(() => {
  //     console.log($('#keyword').val());
  // });

  // $('#keyword').keyup(function keywordKey() {
  //     console.log($(this).val());
  // });

  // normal jQuery pattern is $(selector).method()
  // rare jQuery pattern is $(newHtml).method().appendTo()
  $('<input type="text">')
    .keyup(function keywordKey() {
      utils.print($(this).val());
    })
    .appendTo('body'); // taking a virtual element appending to DOM
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete,
  };
}
