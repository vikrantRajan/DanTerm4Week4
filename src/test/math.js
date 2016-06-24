/* global describe, it */
const expect = require('expect.js');
const math = require('../js/math.js');

describe('Math.js', () => {
  describe('sum', () => {
    it('passes with positive values', () => {
      expect(math.sum(1, 2)).to.be(3);
      expect(math.sum(10, 2)).to.be(12);
    });
    it('passes with negative values', () => {
      expect(math.sum(-1, 2)).to.be(1);
      expect(math.sum(1, -2)).to.be(-1);
    });
    it('strings passes with positive values', () => {
      expect(math.sum('1', '2')).to.be(3);
      expect(math.sum('10', '2')).to.be(12);
    });
    it('strings passes with negative values', () => {
      expect(math.sum('-1', '2')).to.be(1);
      expect(math.sum('1', '-2')).to.be(-1);
    });
  });
  describe('multiply', () => {
    it('passes with positive values', () => {
      expect(math.multiply(1, 2)).to.be(2);
      expect(math.multiply(10, 2)).to.be(20);
    });
    it('passes with negative values', () => {
      expect(math.multiply(-1, 2)).to.be(-2);
      expect(math.multiply(1, -2)).to.be(-2);
    });
    it('strings passes with positive values', () => {
      expect(math.multiply('1', '2')).to.be(2);
      expect(math.multiply('10', '2')).to.be(20);
    });
    it('strings passes with negative values', () => {
      expect(math.multiply('-1', '2')).to.be(-2);
      expect(math.multiply('1', '-2')).to.be(-2);
    });
  });
});
