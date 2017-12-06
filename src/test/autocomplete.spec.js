/* global describe, it */
const expect = require('expect.js');
const routes = require('../api-teacher.js');

describe('Autocomplete route', () => {
  it('should return no matches', async () => {
    const args = { query: {} };

    const actual = (await routes.autocompleteHandler(args)).items[0];
    const expected = 'No matches found';

    expect(expected).to.be(actual);
  });

  it('should return all countries', () => {
    // expect(math.sum(10, 2)).to.be(12);
  });

  it('should return some countries', () => {
    // expect(math.sum(10, 2)).to.be(12);
  });
});
