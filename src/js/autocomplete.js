const autocomplete = () => {
    // What's the container? body
    // When do I display the input? ASAP

    $('body').append('<input type="text" id="keyword">');
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        autocomplete,
    };
}
