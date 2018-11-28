/* global document, salesTaxData, utils */

const calculateTax = (data) => {
  let taxTotal = data.taxes[0].tax;
  if (data.taxes.length === 2) {
    taxTotal += data.taxes[1].tax;
  }

  return taxTotal.toFixed(2); // fix decical to cents
};

// const displayProvinces = (salesTaxData) => {
//   const provincesDropdown = $('#provinces');

//   $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => {
//     const tax = calculateTax(provinceData);
//     provincesDropdown.append(`<option value="${tax}">${provinceData.name}</option>`);
//   });
// }

const displayProvinces = (salesTaxData) => {
  const provincesDropdown = document.querySelector('#provinces');

  const html = Object.values(salesTaxData.provinces)
    .map((province) => {
      const tax = calculateTax(province);
      return `<option value="${tax}">${province.name}</option>`;
    });

  $(provincesDropdown).append(html);
};

const outputTotalPrice = (price) => {
  const currency = price.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  });

  $('#pizzaCost').text(currency);
};

const calculateTotalPrice = (salesValue, pizzaValue) => {
  const salesTax = 1 + Number(salesValue); // parseInt 10
  const pizzaPrice = Number(pizzaValue);
  outputTotalPrice(salesTax * pizzaPrice);
};

const updatePrice = () => {
  calculateTotalPrice($('#provinces').val(), $('#price').val());
};

const getSalesTaxData = () => {
  $.ajax({
    url: 'rates.json',
    success: (response) => {
      displayProvinces(response);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      utils.print(errorThrown);
    },
  });
};

const pizzaSales = (isAjax) => {
  if (isAjax === true) {
    getSalesTaxData();
  } else {
    displayProvinces(salesTaxData);
  }

  $('#price,#provinces').change(updatePrice);
  $('#price').keyup(updatePrice);
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    pizzaSales,
  };
}
