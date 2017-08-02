function buildMecard() {
  /*
   Bind submit (event) to form (element)
   cancel form action event.preventDefault() or return false;
   then update textarea with "hello"
   change the textarea to display first name value
   change the textarea to display all field's value
   change the textarea to display all field's value in MeCard format
   */

  $('form').on('submit', (event) => {
    const fname = $('#fname').val();
    const lname = $('#lname').val();
    const title = $('#title').val();
    const url = $('#url').val();
    const mecard = ['MECARD:'];

    mecard.push('N:', lname, ',', fname, ';');
    mecard.push('NOTE:', title, ';');
    mecard.push('URL:', url, ';');
    mecard.push(';'); // close MeCard

    $('#mecard').val(mecard.join(''));

    event.preventDefault(); // cancel form action
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    buildMecard
  };
}
