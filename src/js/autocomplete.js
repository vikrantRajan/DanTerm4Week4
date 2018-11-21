const autocomplete = () => {
    // What's the container? #keyword
    // When do I listen for keys? on key press|down|up

    $('body').append('<input type="text" id="keyword">');

    $('#keyword').keypress(() => {
        console.log('hello key press');
    });
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        autocomplete,
    };
}
