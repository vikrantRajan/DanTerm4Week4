/* global describe, it */
const expect = require('expect.js');

const response = require('./fixtures/user_timeline.json'); // Twitter service cached response
const { twitterTweets } = require('../js/twitter/filter');

describe('Twitter', () => {
  it('should be full length', () => {
    expect(response.length).to.be(20);
  });

  describe('filter', () => {
    it('should return "date" property', () => {
      expect(twitterTweets(response)[0].date).to.be('Wed Jul 04 14:43:00 +0000 2018');
      expect(twitterTweets(response)[1].date).to.be('Wed Jul 04 01:24:04 +0000 2018');
    });

    it('should return "text" property', () => {
      expect(twitterTweets(response)[0].text).to.contain('Remember that Acting');
      expect(twitterTweets(response)[1].text).to.contain('GEEK ALERT');
    });
  });
});
