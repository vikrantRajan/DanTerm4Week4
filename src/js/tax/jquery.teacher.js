/* global salesTaxData */
const pizzaSales = () => {
  console.log('Hello from Pizza Sales');
  console.log(salesTaxData);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
