const instagram = require('instagram-node');
const Twit = require('twit');
const wreck = require('wreck');

const ig = instagram.instagram();

const credentials = require('../credentials.json');
const { formatTwitterDate } = require('./js/twitter/date');

const autocompleteHandler = ({ query: { keyword = '' } }) => {
  const DELAY = 1500; // 1.5 sec
  const places = [];

  places.push('Afghanistan');
  places.push('Albania');
  places.push('Algeria');
  places.push('American Samoa');
  places.push('Antarctica');
  places.push('Argentina');
  places.push('Armenia');
  places.push('Aruba');
  places.push('Australia');
  places.push('Austria');
  places.push('Bahamas');
  places.push('Bangladesh');
  places.push('Barbados');
  places.push('Belarus');
  places.push('Belgium');
  places.push('Belize');
  places.push('Bermuda');
  places.push('Bolivia');
  places.push('Brazil');
  places.push('Bulgaria');
  places.push('Cambodia');
  places.push('Cameroon');
  places.push('Canada');
  places.push('Cayman Islands');
  places.push('Chad');
  places.push('Chile');
  places.push('China');
  places.push('Colombia');
  places.push('Congo');
  places.push('Cook Islands');
  places.push('Costa Rica');
  places.push('Côte d\'Ivoire');
  places.push('Croatia');
  places.push('Cuba');
  places.push('Cyprus');
  places.push('Czech Republic');

  const items = places.filter(place => place.toLowerCase().includes(keyword.toLowerCase()));

  if (items.length === 0) {
    items.push('No matches found');
  }

  // I promise to return the value when setTimeout resolves with the answer
  return new Promise(resolve => setTimeout(resolve, DELAY, { items }));
};

const flickrJpgPath = (flickrResponse) => {
  const paths = flickrResponse.photos.photo.map((photo) => {
    const {
      farm,
      id,
      secret,
      server
    } = photo;

    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  });

  return paths;
};

// Imperative programming paradigm
// const twitterTweets = (timeline) => {
//   const tweets = [];

//   timeline.forEach((tweet) => {
//     tweets.push({
//       text: tweet.text
//     });
//   });

//   return tweets;
// };

// Declarative programming paradigm
// tweet = { created_at, comments, text, users }
// returning { text }
const twitterTweets = timeline => timeline.map(tweet => ({
  date: formatTwitterDate(tweet.created_at),
  text: tweet.text
}));

exports.plugin = {
  name: 'api',
  version: '1.2.1',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/api/facebook',
      handler: (request, h) => new Promise((resolve, reject) => {
        const accessParam = `access_token=${credentials.facebook.app_id}|${credentials.facebook.app_secret}`;
        const object = 'vancouver.institute.of.media.arts?fields=cover';
        const address = `https://graph.facebook.com/v2.12/${object}&${accessParam}`;

        wreck.get(address)
          .then(({ payload }) => {
            resolve(h.response(payload).type('application/json'));
          })
          .catch(error => reject(error));
          // .catch(reject);
      })
    });

    server.route({
      method: 'GET',
      path: '/api/instagram-login',
      handler: (request, h) => new Promise((resolve) => {
        const redirectLandingAddress = 'http://localhost:8080/api/instagram-login';

        if (request.query.code) {
          ig.authorize_user(request.query.code, redirectLandingAddress, (authError, result) => {
            if (authError) {
              resolve(h.response(JSON.stringify(authError)));
              return;
            }

            credentials.instagram.access_token = result.access_token;

            ig.use({
              access_token: credentials.instagram.access_token,
              client_secret: credentials.instagram.client_secret
            });

            // error, medias, pagination, remaining, limit
            ig.tag_media_recent('vancouver', { count: 10 }, (mediaError, media) => {
              if (mediaError) {
                resolve(h.response(JSON.stringify(mediaError)));
                return;
              }

              resolve(media);
            });
          });
        } else {
          ig.use({
            client_id: credentials.instagram.client_id,
            client_secret: credentials.instagram.client_secret
          });

          resolve(h.redirect(ig.get_authorization_url(redirectLandingAddress, { scope: ['public_content'] })));
        }
      })
    });

    server.route({
      method: 'GET',
      path: '/api/instagram',
      handler: () => new Promise((resolve, reject) => {
        ig.use({
          access_token: credentials.instagram.access_token,
          client_secret: credentials.instagram.client_secret
        });

        // error, medias, pagination, remaining, limit
        ig.tag_media_recent('vancouver', { count: 10 }, (mediaError, media) => {
          if (mediaError) {
            reject(mediaError);
            return;
          }

          resolve(media);
        });
      })
    });

    server.route({
      method: 'GET',
      path: '/api/twitter',
      handler: () => new Promise((resolve, reject) => {
        const T = new Twit({
          consumer_key: credentials.twitter.consumer_key,
          consumer_secret: credentials.twitter.consumer_secret,
          access_token: credentials.twitter.access_token,
          access_token_secret: credentials.twitter.access_token_secret,
          timeout_ms: 3 * 1000
        });

        T.get('statuses/user_timeline', { screen_name: 'danactive', count: 5 }, (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve({ tweets: twitterTweets(data) });
        });
      })
    });

    server.route({
      method: 'GET',
      path: '/api/flickr',
      handler: (request, h) => new Promise((resolve, reject) => {
        const apiKey = credentials.flickr.api_key;
        const address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&lat=49.282712&lon=-123.115337&radius=0.5&format=json&nojsoncallback=1`;

        const getData = async function getData() {
          const { payload } = await wreck.get(address);
          const paths = flickrJpgPath(JSON.parse(payload));

          const output = h
            .response({ paths })
            .type('application/json');

          resolve(output);
        };

        try {
          getData();
        } catch (error) {
          reject(error);
        }
      })
    });

    server.route({
      method: 'GET',
      path: '/api/slow-fruit',
      handler: () => {
        const DELAY = 2 * 1000; // 2 sec
        const OUT = {
          apple: 'green',
          banana: 'yellow',
          cherry: 'red',
          durian: 'blue'
        };

        return new Promise(resolve => setTimeout(resolve, DELAY, OUT));
      }
    });

    server.route({
      method: 'GET',
      path: '/api/fruit',
      handler: (request, h) => {
        // Browser web address http://localhost:3000/api/fruit?format=json
        // output blank, xml, json
        console.log(request.query.format); // eslint-disable-line no-console
        // PHP is echo($_GET['format']) // outputs blank, xml, json
        if (request.query.format === 'xml') {
          return h
            .response('<fruits><fruit name="apple">green</fruit><fruit name="banana">yellow</fruit><fruit name="cherry">red</fruit></fruits>')
            .type('application/xml');
        }

        return {
          apple: 'green',
          banana: 'yellow',
          cherry: 'red'
        };
      }
    });

    server.route({
      method: 'GET',
      path: '/api/rss',
      handler: (request, h) => new Promise((resolve, reject) => {
        const url = request.query.url || 'http://www.cbc.ca/cmlink/rss-canada';
        const isSSL = (url.substring(0, 5) === 'https');
        const httpRequest = (isSSL) ? require('https') : require('http'); // eslint-disable-line global-require

        httpRequest.get(url, (response) => {
          let body = '';

          if (response.statusCode === 200) {
            // Continuously update stream with data
            response.on('data', (data) => {
              body += data;
            });
            response.on('end', () => {
              resolve(h.response(body).type('application/xml'));
            });
          } else {
            reject(new URIError(`Service call failed with HTTP status code: ${response.statusCode}`));
          }
        }).on('error', (e) => {
          reject(new URIError(`Service call failed due to error: ${e.message}`));
        });
      })
    });

    server.route({
      method: 'GET',
      path: '/api/autocomplete',
      handler: autocompleteHandler
    });
  }
};

exports.autocompleteHandler = autocompleteHandler;
