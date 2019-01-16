const https = require('https');
const http = require('http');
const { IncomingWebhook } = require('@slack/client');
const Twit = require('twit');
const wreck = require('wreck');

const { print } = require('./js/utils');
const credentials = require('../credentials.json');

// normal simple function
// const sum = (a, b) => { a + b };

// keyword is a new variable, when undefined set to blank.
// keyword is in an object with a parent property query
const autocompleteHandler = ({ query: { keyword = '' } }) => {
  // keyword is either blank or a string value
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

// Node.js rule, exports must in the root. Not inside a function or closure
exports.autocompleteHandler = autocompleteHandler;

exports.plugin = {
  name: 'api',
  version: '1.3.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/api/twitter',
      handler: async () => {
        const formatTwitterDate = tweets => tweets.map(tweet => (
          {
            date: tweet.created_at,
            tweet: tweet.text,
          }
        ));

        const twit = new Twit({
          consumer_key: credentials.twitter.consumer_key,
          consumer_secret: credentials.twitter.consumer_secret,
          access_token: credentials.twitter.access_token,
          access_token_secret: credentials.twitter.access_token_secret,
        });

        try {
          const paramsToTwitter = { screen_name: 'vanarts', count: 100 };
          const response = await twit.get('statuses/user_timeline', paramsToTwitter);

          return formatTwitterDate(response.data);
        } catch (error) {
          return { error };
        }
      },
    });

    server.route({
      method: 'GET',
      path: '/api/flickr',
      handler: async () => {
        const outputFlickrPhotos = (payload) => {
          const photos = payload.photos.photo; // 250 photo items

          const out = photos.map(photo => `<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">`);

          return out;
        };

        try {
          const querystrings = `api_key=${credentials.flickr.api_key}&method=flickr.photos.search&lat=49.2826982&lon=-123.1175464&radius=1&format=json&nojsoncallback=1`;
          const options = { json: true };
          const { payload } = await wreck.get(`https://api.flickr.com/services/rest/?${querystrings}`, options);

          return outputFlickrPhotos(payload);
        } catch (error) {
          return { error: error.message };
        }
      },
    });

    server.route({
      method: 'GET',
      path: '/api/autocomplete',
      handler: autocompleteHandler,
    });

    server.route({
      method: 'GET',
      path: '/api/slow-fruit',
      handler: () => {
        const DELAY = 2 * 1000; // 2 sec
        const OUT = {
          apple: 'green',
          banana: 'gold',
          cherry: 'red',
          durian: 'blue',
          eggplant: 'purple',
          'fuji-apple': 'lightgreen',
          grape: 'magenta',
        };

        return new Promise(resolve => setTimeout(resolve, DELAY, OUT));
      },
    });

    server.route({
      method: 'GET',
      path: '/api/fruit',
      handler: (request, reply) => {
        // Browser web address http://localhost:3000/api/fruit?format=json
        // output blank, xml, json
        console.log(request.query.format); // eslint-disable-line no-console
        // PHP is echo($_GET['format']) // outputs blank, xml, json

        if (request.query.format === 'xml') {
          return reply
            .response('<fruits><fruit name="apple">green</fruit><fruit name="banana">yellow</fruit><fruit name="cherry">red</fruit></fruits>')
            .type('application/xml');
        }

        return {
          apple: 'green',
          banana: 'yellow',
          cherry: 'red',
        };
      },
    });

    server.route({
      method: 'GET',
      path: '/api/rss',
      handler: (request, reply) => new Promise((resolve) => {
        const url = request.query.url || 'https://www.cbc.ca/cmlink/rss-canada';
        const isSSL = (url.substring(0, 5) === 'https');
        const httpRequest = (isSSL) ? https : http;

        print(`Getting ${url} via ${isSSL ? 'https' : 'http'}`);

        httpRequest.get(url, (response) => {
          let body = '';

          if (response.statusCode === 200) {
            // Continuously update stream with data
            response.on('data', (data) => {
              body += data;
            });
            response.on('end', () => {
              resolve(reply.response(body).type('application/xml'));
            });
          } else {
            resolve(reply.response(`Service call failed with HTTP status code: ${response.statusCode}`));
          }
        }).on('error', (e) => {
          resolve(reply.response(`Service call failed due to error: ${e.message}`));
        });
      }),
    });

    server.route({
      method: 'GET',
      path: '/api/teacheraid/play',
      handler: async () => {
        const webhookUrl = credentials.slack.webhook;
        const webhook = new IncomingWebhook(webhookUrl);

        const message = 'Hello there from route as promise!';

        // Send simple text to the webhook channel
        const { error } = await webhook.send(message);

        if (error) {
          return { error };
        }

        return { message };
      },
    });
  },
};
