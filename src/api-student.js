const Twit = require('twit');
const credentials = require('../credentials.json');

exports.plugin = {
  name: 'api-student',
  version: '1.4.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/api/student',
      handler: () => ({ hello: 'student' }),
    });
    server.route({
      method: 'GET',
      path: '/api/twitter',
      handler: () => new Promise((resolve) => {
        const twitter = new Twit({
          consumer_key: credentials.twitter.consumer_key,
          consumer_secret: credentials.twitter.consumer_secret,
          access_token: credentials.twitter.access_token,
          access_token_secret: credentials.twitter.access_token_secret,
          timeout_ms: 60 * 1000,
          strictSSL: true,
        });

        twitter.get('statuses/user_timeline', { screen_name: 'vanarts', count: 5 })
          .catch(err => console.log('caught error', err.stack))
          .then(result => resolve(result.data));


        // .then(result => resolve(`${result.data[0].created_at} <br> ${result.data[0].text}`));

        // .then(result => resolve(`${result.data[0].created_at} <br> ${result.data[0].text}`));
      }),
    });
  },
};
