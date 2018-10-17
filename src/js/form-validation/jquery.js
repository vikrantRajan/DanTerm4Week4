const jqueryFormValidation = () => {
  const onSubmit = (event) => {
    // the hide class will be added to the instruction when form field is valid
    const isFormValid = $('.hide').length === 3;

    if (!isFormValid) {
      event.preventDefault();
    }
  };

  $('#contact-form').submit(onSubmit); // pass function by reference
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    jqueryFormValidation,
  };
}
