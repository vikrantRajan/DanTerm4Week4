/* global describe, it */
const expect = require('expect.js');
const tax = require('../../js/class06/incomeTax.js');

describe('incomeTax.js', () => {
  describe('calculateTax', () => {
    it('negative income has zero income tax', () => {
      expect(tax.calculateTax(-1)).to.be(0);
      expect(tax.calculateTax(-10000)).to.be(0);
    });
    it('Tier 1 income tax', () => {
      expect(tax.calculateTax(1)).to.be(0.15);
      expect(tax.calculateTax(10)).to.be(1.5);
      expect(tax.calculateTax(100)).to.be(15);
      expect(tax.calculateTax(1000)).to.be(150);
      expect(tax.calculateTax(10000)).to.be(1500);
      expect(tax.calculateTax(43953)).to.be(43953 * 0.15);
    });
    it('Tier 2 income tax', () => {
      expect(tax.calculateTax(45000)).to.be(6823.29);
      expect(tax.calculateTax(50000)).to.be(7923.29);
    });
    it('Tier 3 income tax', () => {
      expect(tax.calculateTax(87907)).to.be(16262.83);
    });
  });
  describe('currencyFormat', () => {
    it('negative single number is money', () => {
      expect(tax.currencyFormat(-1)).to.be('-$1.00');
    });
    // todo inclass: write more unit test to verify future scenarios
  });
});
