const bindDomAutocomplete = () => {
  $('#country').keyup(function countryKey() {
    console.log($(this).val());
  });
};

const autocomplete = () => {
  bindDomAutocomplete();
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    autocomplete,
  };
}
