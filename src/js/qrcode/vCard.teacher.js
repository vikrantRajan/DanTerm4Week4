/* global document */

const getFormAsVcard = () => {
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const title = document.getElementById('title').value;
  const url = document.getElementById('url').value;
  return `${fname}\n${lname}\n${title}\n${url}`;
};

const formSubmitted = (event) => {
  document.getElementById('vcard').value = getFormAsVcard();
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
