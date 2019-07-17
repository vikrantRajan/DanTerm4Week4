/* global describe, it */
const expect = require('expect.js');

const response = require('./fixtures/flickr-photos_search.json'); // Flickr service cached response
const { flickrJpgPaths, flickrPhotoToJpgPath } = require('../api-teacher');

describe('Flickr', () => {
  if (!flickrJpgPaths) return;

  it('should return a valid JPG path', () => {
    const mockPhoto = {
      farm: 5,
      server: 4493,
      id: 37665981392,
      secret: '2e105fd543',
    };
    const actual = flickrPhotoToJpgPath(mockPhoto).path;
    const expected = 'https://farm5.staticflickr.com/4493/37665981392_2e105fd543.jpg';
    expect(actual).to.be(expected);
  });

  describe('Cached service response', () => {
    it('should be full length', () => {
      const actual = response.photos.photo.length;
      const expected = 250;
      expect(actual).to.be(expected);
    });

    it('should have the first photo path', () => {
      const actual = flickrJpgPaths(response)[0].path;
      const expected = 'https://farm2.staticflickr.com/1781/29620705348_e3a1168604.jpg';
      expect(actual).to.be(expected);
    });
  });
});
