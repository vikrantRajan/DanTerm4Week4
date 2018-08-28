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
    it('should return 0 with blank values', () => {
      expect(math.sum('', '')).to.be(0);
      expect(math.sum('', 1)).to.be(1);
      expect(math.sum(1, '')).to.be(1);
    });
    it('should return 0 with undefined values', () => {
      expect(math.sum()).to.be(0);
      expect(math.sum(undefined, undefined)).to.be(0);
      expect(math.sum(undefined, 1)).to.be(1);
      expect(math.sum(1, undefined)).to.be(1);
    });
    it('should return 0 with null values', () => {
      expect(math.sum(null, null)).to.be(0);
      expect(math.sum(null, 1)).to.be(1);
      expect(math.sum(1, null)).to.be(1);
    });
  });

  describe('difference', () => {
    it('passes with positive values', () => {
      expect(math.difference(1, 2)).to.be(-1);
      expect(math.difference(10, 2)).to.be(8);
    });
    it('passes with negative values', () => {
      expect(math.difference(-1, 2)).to.be(-3);
      expect(math.difference(1, -2)).to.be(3);
    });
    it('strings passes with positive values', () => {
      expect(math.difference('1', '2')).to.be(-1);
      expect(math.difference('10', '2')).to.be(8);
    });
    it('strings passes with negative values', () => {
      expect(math.difference('-1', '2')).to.be(-3);
      expect(math.difference('1', '-2')).to.be(3);
    });
    it('should return 0 with blank values', () => {
      expect(math.difference('', '')).to.be(0);
      expect(math.difference('', 1)).to.be(-1);
      expect(math.difference(1, '')).to.be(1);
    });
    it('should return 0 with undefined values', () => {
      expect(math.difference()).to.be(0);
      expect(math.difference(undefined, undefined)).to.be(0);
      expect(math.difference(undefined, 1)).to.be(-1);
      expect(math.difference(1, undefined)).to.be(1);
    });
    it('should return 0 with null values', () => {
      expect(math.difference(null, null)).to.be(0);
      expect(math.difference(null, 1)).to.be(-1);
      expect(math.difference(1, null)).to.be(1);
    });
  });
});
