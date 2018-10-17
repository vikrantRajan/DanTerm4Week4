const jqueryFormValidation = () => {
  const submitHandler = (event) => {
    // the hide class will be added to the instruction when form field is valid
    const isFormValid = $('.hide').length === 3;

    if (!isFormValid) {
      event.preventDefault();
    }
  };

  const keyupHandler = () => {
    // TODO hide and show the instruction italic element based on if the form field is blank or not
  };

  $('#contact-form').submit(submitHandler); // pass function by reference

  // add keyboard event listener to the form fields with the goal to hide the instruction message
  $('input[type=text]').keyup(keyupHandler);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    jqueryFormValidation,
  };
}
