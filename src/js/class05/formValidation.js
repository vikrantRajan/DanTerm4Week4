/* global document */
function formValidation() {
  function hideInstruction() {
    const $field = $(this);
    $field.next().addClass('hide');
  }
  function showInstruction() {
    const $field = $(this);
    $field.next().removeClass('hide');
  }
  function attachFormEvents($form) {
    $form.find('input[type=text]').blur(hideInstruction).focus(showInstruction);
  }
  function isBlank(fieldId) {
    return (document.getElementById(fieldId).value.trim() === '');
  }
  function isValidEmail(fieldId) {
    return (document.getElementById(fieldId).value.trim().indexOf('@') > 0);
  }
  function processForm(event) {
    const validationRules = {
      email: {
        rules: ['blank', 'email']
      },
      phone: {
        rules: ['blank']
      }
    };

    const fieldIds = Object.keys(validationRules);
    fieldIds.forEach((fieldId) => {
      const rules = validationRules[fieldId].rules;

      rules.forEach((rule) => {
        const invalidBlank = (rule === 'blank' && isBlank(fieldId));
        const invalidEmail = (rule === 'email' && !isValidEmail(fieldId));

        if (invalidBlank || invalidEmail) {
          event.preventDefault();
        }
      });
    });
  }
  $('#contact-form').submit(processForm);
  attachFormEvents($('#contact-form'));
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    formValidation
  };
}
