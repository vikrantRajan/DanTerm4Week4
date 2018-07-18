/* global describe, it */
const expect = require('expect.js');

const { flickrJpgPath } = require('../api-teacher');

describe('Flickr', () => {
  it('should return a valid JPG path', () => {
    const mockPhoto = {
      farm: 5,
      server: 4493,
      id: 37665981392,
      secret: '2e105fd543',
    };
    const mock = { photos: { photo: [mockPhoto] } };
    const actual = flickrJpgPath(mock)[0];
    const expected = 'https://farm5.staticflickr.com/4493/37665981392_2e105fd543.jpg';
    expect(actual).to.be(expected);
  });
});
