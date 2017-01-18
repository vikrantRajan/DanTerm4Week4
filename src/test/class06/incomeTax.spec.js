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
    it('zero number is money', () => {
      expect(tax.currencyFormat(0)).to.be('$0.00');
      expect(tax.currencyFormat(0.0)).to.be('$0.00');
      expect(tax.currencyFormat(0.00)).to.be('$0.00');
    });
    it('negative single number is money', () => {
      expect(tax.currencyFormat(-1)).to.be('-$1.00');
      expect(tax.currencyFormat(-20)).to.be('-$20.00');
      expect(tax.currencyFormat(-300)).to.be('-$300.00');
    });
    it('negative number with rounding is money', () => {
      expect(tax.currencyFormat(-1000)).to.be('-$1,000.00');
      expect(tax.currencyFormat(-20000)).to.be('-$20,000.00');
      expect(tax.currencyFormat(-300000)).to.be('-$300,000.00');
      expect(tax.currencyFormat(-4000000)).to.be('-$4,000,000.00');
    });
    it('negative number with rounding and cents is money', () => {
      expect(tax.currencyFormat(-1000.01)).to.be('-$1,000.01');
      expect(tax.currencyFormat(-20000.02)).to.be('-$20,000.02');
      expect(tax.currencyFormat(-300000.03)).to.be('-$300,000.03');
      expect(tax.currencyFormat(-4000000.04)).to.be('-$4,000,000.04');
    });
    it('positive single number is money', () => {
      expect(tax.currencyFormat(1)).to.be('$1.00');
      expect(tax.currencyFormat(20)).to.be('$20.00');
      expect(tax.currencyFormat(300)).to.be('$300.00');
    });
    it('positive number with rounding is money', () => {
      expect(tax.currencyFormat(1000)).to.be('$1,000.00');
      expect(tax.currencyFormat(20000)).to.be('$20,000.00');
      expect(tax.currencyFormat(300000)).to.be('$300,000.00');
      expect(tax.currencyFormat(4000000)).to.be('$4,000,000.00');
    });
    it('positive number with rounding and cents is money', () => {
      expect(tax.currencyFormat(1000.01)).to.be('$1,000.01');
      expect(tax.currencyFormat(20000.02)).to.be('$20,000.02');
      expect(tax.currencyFormat(300000.03)).to.be('$300,000.03');
      expect(tax.currencyFormat(4000000.04)).to.be('$4,000,000.04');
    });
    // todo inclass: write more unit test to verify future scenarios
  });
});
