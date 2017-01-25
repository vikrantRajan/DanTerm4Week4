/* global describe, it */
const expect = require('expect.js');
const source = require('../../js/twitter/formatDate.js');

describe('Twitter utilites', () => {
  describe('formatTwitterDate', () => {
    const feb1 = new Date('2017-02-01 10:00:00');
    const timeZoneOffset = new Date().toString().match(/([-+][0-9]+)\s/)[1];

    it('passes', () => {
      expect(source.formatTwitterDate(`Web Feb 01 10:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('just now');
      expect(source.formatTwitterDate('Tue Apr 07 22:52:51 +0000 2009')).to.be(false);
    });
  });
});
