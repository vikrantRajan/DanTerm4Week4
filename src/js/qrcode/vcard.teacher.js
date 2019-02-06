/* global document */
function buildVcard() {
  // Serialize HTML Form to JSON
  const toJSON = (form) => {
    const obj = {};
    const elements = form.querySelectorAll('input, select, textarea');
    elements.forEach((element) => {
      const { id, name, value } = element;

      if (name || id) {
        obj[name || id] = value;
      }
    });

    return obj;
  };

  const formatVcard = (fields) => {
    const vcard = ['BEGIN:VCARD\nVERSION:3.0'];
    const {
      fname,
      lname,
      title,
      url,
    } = fields;

    vcard.push('N:', lname, ';', fname, '\n');
    vcard.push('FN:', fname, ' ', lname, '\n');
    vcard.push('TITLE:', title, '\n');
    vcard.push('URL:', url, '\n');
    vcard.push('END:VCARD'); // close vcard

    // const vcardTemplate = `BEGIN:VCARD
    // VERSION:3.0
    // N: ${lname}; ${fname}
    // FN ${fname} ${lname}
    // TITLE: ${title}
    // URL: ${url}
    // END:VCARD`;

    // return vcardTemplate;

    return vcard.join('');
  };

  const submitForm = (event) => {
    const fields = toJSON(document.getElementsByTagName('form')[0]);
    document.querySelector('#vcard').value = formatVcard(fields);

    event.preventDefault(); // cancel form action
  };

  const bindDom = () => {
    document.getElementsByTagName('form')[0].addEventListener('submit', submitForm);
  };

  bindDom();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    buildVcard,
  };
}
