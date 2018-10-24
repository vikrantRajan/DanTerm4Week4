const jqueryFormValidation = () => {
  const submitHandler = (event) => {
    // the hide class will be added to the instruction when form field is valid
    const isFormValid = $('.hide').length === 3;

    if (!isFormValid) {
      event.preventDefault();
    }
  };

  const keyupHandler = function fieldKey() {
    const $input = $(this);
    const $i = $input.next();
    if ($input.val() === '') {
      $i.removeClass('hide');
    } else {
      $i.addClass('hide');
    }
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
