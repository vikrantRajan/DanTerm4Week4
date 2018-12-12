/* global document, difference, multiply, sum, utils */
function bindCalc() {
  const numA = document.getElementById('numA');
  const numB = document.getElementById('numB');
  const operator = document.getElementById('operator');

  const calc = () => {
    let math = sum;

    if (operator.value === 'Subtract') math = difference;
    if (operator.value === 'Multiply') math = multiply;

    utils.print(math(numA.value, numB.value));
  };


  const alterDom = () => {
    numA.addEventListener('change', calc);
    numB.addEventListener('change', calc);
    operator.addEventListener('change', calc);

    // add <option value="Multiply">*</option>
    const newOption = document.createElement('option');
    newOption.innerHTML = '*';
    newOption.value = 'Multiply';
    operator.appendChild(newOption);
  };

  alterDom();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    bindCalc,
  };
}
