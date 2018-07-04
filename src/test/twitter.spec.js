/* global describe, it */
const expect = require('expect.js');

const data = require('./fixtures/user_timeline.json');
const { twitterTweets } = require('../js/twitter/filter');

describe('Twitter', () => {
  describe('filter', () => {
    it('should return "date" property', () => {
      expect(twitterTweets(data)[0].date).to.be('Wed Jul 04 14:43:00 +0000 2018');
      expect(twitterTweets(data)[1].date).to.be('Wed Jul 04 01:24:04 +0000 2018');
    });

    it('should return "text" property', () => {
      expect(twitterTweets(data)[0].text).to.contain('Remember that Acting');
      expect(twitterTweets(data)[1].text).to.contain('GEEK ALERT');
    });
  });
});
