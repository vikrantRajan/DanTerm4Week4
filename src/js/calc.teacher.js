/* global document, difference, divide, multiply, sum */
const calc = () => {
  const numA = document.querySelector('#numA').value;
  const numB = document.querySelector('#numB').value;
  const operator = document.querySelector('#operator').value;
  const answer = document.querySelector('#answer');

  switch (operator) {
    case 'Add': {
      answer.innerHTML = sum(numA, numB);
      break;
    }

    case 'Subtract': {
      answer.innerHTML = difference(numA, numB);
      break;
    }

    case 'Multiply': {
      answer.innerHTML = multiply(numA, numB);
      break;
    }

    case 'Divide': {
      answer.innerHTML = divide(numA, numB);
      break;
    }

    default: {
      answer.innerHTML = 'Bad';
    }
  }
};

const bindCalc = () => {
  document.querySelectorAll('#numA, #numB, #operator')
    .forEach(dom => dom.addEventListener('change', calc));

  // jQuery
  // $('#numA, #numB, #operator').change(calc);

  // JavaScript
  // document.querySelector('#numA').addEventListener('change', calc);
  // document.querySelector('#numB').addEventListener('change', calc);
  // document.querySelector('#operator').addEventListener('change', calc);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    bindCalc,
  };
}
