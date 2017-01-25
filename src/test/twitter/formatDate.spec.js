/* global describe, it */
const expect = require('expect.js');
const source = require('../../js/twitter/formatDate.js');

describe('Twitter utilites', () => {
  describe('formatTwitterDate', () => {
    const feb1 = new Date('2017-02-01 10:00:00');
    const timeZoneOffset = feb1.toString().match(/([-+][0-9]+)\s/)[1];

    it('passes', () => {
      expect(source.formatTwitterDate(`Web Feb 01 10:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('just now');
      expect(source.formatTwitterDate(`Web Feb 01 9:59:00 ${timeZoneOffset} 2017`, feb1)).to.be('1 minute ago');
      expect(source.formatTwitterDate(`Web Feb 01 9:50:00 ${timeZoneOffset} 2017`, feb1)).to.be('10 minutes ago');
      expect(source.formatTwitterDate(`Web Feb 01 9:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('1 hour ago');
      expect(source.formatTwitterDate(`Web Feb 01 0:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('10 hours ago');
      expect(source.formatTwitterDate(`Tue Jan 31 10:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('Yesterday');
      expect(source.formatTwitterDate(`Mon Jan 30 10:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('2 days ago');
      expect(source.formatTwitterDate(`Wed Jan 25 10:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('1 weeks ago');
      expect(source.formatTwitterDate(`Wed Jan 18 10:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('2 weeks ago');
      expect(source.formatTwitterDate(`Wed Jan 04 10:00:00 ${timeZoneOffset} 2017`, feb1)).to.be('4 weeks ago');
      expect(source.formatTwitterDate(`Wed Dec 07 10:00:00 ${timeZoneOffset} 2016`, feb1)).to.be('2 months ago');
      expect(source.formatTwitterDate(`Wed Oct 05 10:00:00 ${timeZoneOffset} 2016`, feb1)).to.be('4 months ago');
      expect(source.formatTwitterDate(`Wed Apr 06 10:00:00 ${timeZoneOffset} 2016`, feb1)).to.be('10 months ago');
    });
  });
});
