/* global document */

const formSubmitted = (event) => {
  document.getElementById('vcard').value = document.getElementById('fname').value;
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
