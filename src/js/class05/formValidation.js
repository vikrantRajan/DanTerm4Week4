function formValidation() {
  function hideInstruction() {
    var $field = $(this);
    $field.next().addClass('hide');
  }
  function showInstruction() {
    var $field = $(this);
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
    var validationRules = {
      email: {
        rules: ['blank', 'email'],
      },
      phone: {
        rules: ['blank'],
      },
    };

    var fieldIds = Object.keys(validationRules);
    fieldIds.forEach(function (fieldId) {
      var rules = validationRules[fieldId].rules;

      rules.forEach(function (rule) {
        var invalidBlank = (rule === 'blank' && isBlank(fieldId));
        var invalidEmail = (rule === 'email' && !isValidEmail(fieldId));

        if (invalidBlank || invalidEmail) {
          event.preventDefault();
        }
      });
    });
  }
  $('#contact-form').submit(processForm);
  attachFormEvents($('#contact-form'));
}
