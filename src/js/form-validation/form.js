/* global document */

const validateForm = () => {
  // User Experience (UX) rule: Display the field's instruction when field is valid
  // find all hide CSS classes, if any hide classes are found then the form is invalid,
  // no hide classes is valid

  $('input[type="submit"]').click((event) => {
    const isValid = document.querySelector('#contact-form').checkValidity();

    if (!isValid) {
      event.preventDefault(); // cancel form action

      $('input:invalid')
        .effect('shake', { distance: 5, times: 2 })
        .first()
        .focus();
    }
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    validateForm
  };
}
