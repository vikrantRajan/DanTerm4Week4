const credentials = require('../credentials.json');
const instagram = require('instagram-node');
const Twit = require('twit');
const wreck = require('wreck');
const Yql = require('yql');

const ig = instagram.instagram();

function flickrPhoto(photo) {
  const photoPath = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  return photoPath;
}

function twitterTweets(timeline) {
  const tweets = [];

  timeline.forEach((tweet) => {
    tweets.push({
      date: tweet.created_at,
      text: tweet.text
    });
  });

  return { tweets };
}

exports.register = (server, pluginOptions, next) => {
  server.route({
    method: 'GET',
    path: '/weather',
    handler: (request, reply) => {
      const address = 'https://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where woeid = 9807 and u=\'c\'&format=json';

      wreck.get(address, { json: true }, (error, response, payload) => {
        if (error) {
          reply(error);
          return;
        }

        const weatherItem = payload.query.results.channel.item;
        const condition = weatherItem.condition.text;
        const conditionCss = condition.replace(/\s/g, '');
        const temperature = weatherItem.condition.temp;

        reply({ weather: { condition, conditionCss, temperature } });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/yahoo',
    handler: (request, reply) => {
      const query = new Yql('select item from weather.forecast where woeid = 9807 and u=\'c\'');

      query.exec((error, payload) => {
        const weatherItem = payload.query.results.channel.item;
        const condition = weatherItem.condition.text;
        const conditionCss = condition.replace(/\s/g, '');
        const temperature = weatherItem.condition.temp;

        reply({ weather: { condition, conditionCss, temperature } });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/instagram-login',
    handler: (request, reply) => {
      const redirectLandingAddress = 'http://localhost:8080/api/instagram-login';

      if (request.query.code) {
        ig.authorize_user(request.query.code, redirectLandingAddress, (authError, result) => {
          if (authError) {
            reply(`Error found ${authError.message}`);
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
              reply(`Error found ${mediaError.message}`);
              return;
            }

            reply(media);
          });
        });
      } else {
        ig.use({
          client_id: credentials.instagram.client_id,
          client_secret: credentials.instagram.client_secret
        });

        reply()
          .redirect(ig.get_authorization_url(redirectLandingAddress, { scope: ['public_content'] }));
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/instagram',
    handler: (request, reply) => {
      ig.use({
        access_token: credentials.instagram.access_token,
        client_secret: credentials.instagram.client_secret
      });

      // error, medias, pagination, remaining, limit
      ig.tag_media_recent('vancouver', { count: 10 }, (mediaError, media) => {
        if (mediaError) {
          reply(`Error found ${mediaError.message}`);
          return;
        }

        reply(media);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/twitter',
    handler: (request, reply) => {
      const t = new Twit({
        consumer_key: credentials.twitter.consumer_key,
        consumer_secret: credentials.twitter.consumer_secret,
        access_token: credentials.twitter.access_token,
        access_token_secret: credentials.twitter.access_token_secret,
        timeout_ms: 60 * 1000  // optional HTTP request timeout to apply to all requests.
      });

      t.get('statuses/user_timeline', { screen_name: 'danactive' }, (error, payload) => {
        if (error) {
          reply(error.message);
          return;
        }

        if (request.query.raw && request.query.raw === 'true') {
          reply(payload);
          return;
        }

        reply(twitterTweets(payload));
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/flickr',
    handler: (request, reply) => {
      const apiKey = credentials.flickr.api_key;
      const address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=vancouver&format=json&nojsoncallback=1`;

      wreck.get(address, { json: true }, (error, response, payload) => {
        if (error) {
          reply(error);
          return;
        }

        if (payload.code === 100) {
          reply(payload);
          return;
        }

        const jpgPaths = [];

        payload.photos.photo.forEach((photo) => {
          jpgPaths.push(flickrPhoto(photo));
        });

        reply({ photos: jpgPaths });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/slow-fruit',
    handler: (request, reply) => {
      const SLEEP = 2 * 1000; // 2 sec
      // Node.js setTimeout
      // https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_arg
      setTimeout(() => {
        reply({
          apple: 'green',
          banana: 'yellow',
          cherry: 'red',
          durian: 'blue'
        });
      }, SLEEP);
    }
  });

  server.route({
    method: 'GET',
    path: '/fruit',
    handler: (request, reply) => {
      // Browser web address http://localhost:3000/api/fruit?format=json
      console.log(request.query.format); // output blank, xml, json
      // PHP is echo($_GET['format']) // outputs blank, xml, json
      if (request.query.format === 'xml') {
        const response = reply('<fruits><fruit name="apple">green</fruit><fruit name="banana">yellow</fruit><fruit name="cherry">red</fruit></fruits>');
        response.type('application/xml');
      } else { // default of JSON
        reply({
          apple: 'green',
          banana: 'yellow',
          cherry: 'red'
        });
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/rss',
    handler: (request, reply) => {
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
            reply(body).type('application/xml');
          });
        } else {
          throw new URIError(`Service call failed with HTTP status code: ${response.statusCode}`);
        }
      }).on('error', (e) => {
        throw new URIError(`Service call failed due to error: ${e.message}`);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/autocomplete',
    handler: (request, reply) => {
      const output = {};
      const keyword = request.query.keyword;
      const places = [];
      const reg = new RegExp(keyword);
      const sugg = [];

      if (keyword !== '') {
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
      }

      for (let i = 0; i < places.length; i += 1) {
        if (reg.test(places[i].toLowerCase())) {
          sugg.push(places[i]);
        }
      }

      if (sugg.length === 0) {
        sugg.push('No matches found');
      }

      output.items = sugg;

      setTimeout(() => reply(output), 1500);  // 1.5 sec
    }
  });

  next();
};

exports.register.attributes = {
  name: 'api',
  version: '1.0.0'
};
