// todo inclass display all province name in console

function income() {
  const produce = {
    Apple: 'fruit',
    Beet: 'vegatable',
    Celery: 'vegetable',
    Daikon: 'vegetable'
  };

  // Object
  $.each(produce, (key, value) => { // propertyName, valueOfProperty
    $('body').append(`Produce ${key} is a ${value}.<br>`);
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    income
  };
}
