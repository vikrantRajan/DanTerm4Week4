/* global salesTaxData */
const pizzaSales = () => {
  const provinceDropdown = $('#provinces');
  $.each(salesTaxData.provinces, (provinceAbbr, provinceObj) => {
    // todo step 3.1 Add federal sales tax to the option element
    // todo step 3.2 Update to include both federal and provincial sales taxes
    provinceDropdown.append(`<option>${provinceObj.name}</option>`);
  });

  provinceDropdown.change(() => {
    console.log('province changed', provinceDropdown.val());
  });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
