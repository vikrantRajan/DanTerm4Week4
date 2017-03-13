/* global describe, it */
const expect = require('expect.js');
const source = require('../../js/qrCode/mecard.js');

describe('QR Code generator', () => {
  describe('in MeCard format', () => {
    const contact = {
      fname: 'Forest',
      lname: 'Gump',
      title: 'Film character',
      url: 'http://www.bubbagump.com/'
    };
    const fullMecard = 'MECARD:N:Gump,Forest;NOTE:Film character;URL:http://www.bubbagump.com/;;';
    it('has openening format', () => {
      expect(source.mecardFormat(contact).includes('MECARD:')).to.be(true);
    });
    it('has given and family name', () => {
      expect(source.mecardFormat(contact).includes('N:Gump,Forest;')).to.be(true);
    });
    it('has title', () => {
      expect(source.mecardFormat(contact).includes('NOTE:Film character;')).to.be(true);
    });
    it('has URL', () => {
      expect(source.mecardFormat(contact).includes('URL:http://www.bubbagump.com/;')).to.be(true);
    });
    it('has full expected content', () => {
      expect(source.mecardFormat(contact)).to.be(fullMecard);
    });
  });
});
