function buildMecard() {
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
    buildMecard,
  };
}
