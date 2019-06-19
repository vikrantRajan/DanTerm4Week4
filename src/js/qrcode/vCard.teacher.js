/* global document */

const formSubmitted = (event) => {
  console.log('form submitted');
  event.preventDefault();
};

const buildVcard = () => {
  document.querySelector('form').addEventListener('submit', formSubmitted);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    buildVcard,
  };
}
