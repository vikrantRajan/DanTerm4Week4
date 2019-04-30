/* global salesTaxData */

// $.each(salesTaxData, (index, value) =>
// {
//   $('body').append(`Province ${index}: ${value}. <br>`)
// })
const pizzaSales = () => {

  // console.log(salesTaxData.provinces.AB);
  $.each(salesTaxData.provinces, (key, value) => {
    $('#provinces').append(`<option>${value.name}</option>`);
    // console.log(`Abbreviated name is ${key} and Full Name is ${value.name}.`);
    $('section').append(`<br>Abbreviated Name is ${key} and Full Name is ${value.name}.<br>`);
  });
};
 $('#provinces').blur(() => {
    console.log('Hello world!');
  });
// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
