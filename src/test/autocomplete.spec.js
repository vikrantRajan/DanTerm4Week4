/* global describe, it */
const expect = require('expect.js');
const route = require('../api-teacher.js');

describe('Autocomplete route', () => {
  it('should return no matches', () => {
    expect(route.autocompleteHandler).to.be();
  });

  it('should return all countries', () => {
    // expect(math.sum(10, 2)).to.be(12);
  });

  it('should return some countries', () => {
    // expect(math.sum(10, 2)).to.be(12);
  });
});
