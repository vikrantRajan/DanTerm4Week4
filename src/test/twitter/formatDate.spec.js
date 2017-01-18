/* global describe, it */
const expect = require('expect.js');
const source = require('../../js/twitter/formatDate.js');

describe('Twitter utilites', () => {
  describe('formatTwitterDate', () => {
    it('passes', () => {
      expect(source.formatTwitterDate('Tue Apr 07 22:52:51 +0000 2009')).to.be(false);
    });
  });
});
