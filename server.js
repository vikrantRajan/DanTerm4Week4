const inert = require('inert');
const dust = require('hapi-dust');
const Hapi = require('hapi');
const Twit = require('twit');
const vision = require('vision');
const wreck = require('wreck');

const credentials = require('./credentials.json');
const utils = require('./src/js/utils');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.register([vision, inert], () => {
  server.views({
    engines: { dust },
    relativeTo: __dirname,
    path: 'src/views',
    partialsPath: 'src/views',
    layoutPath: 'src/views',
  });
});

// Register route for static assets
server.route({
  method: 'GET',
  path: '/{path*}',
  config: {
    description: 'Serve static content',
    tags: ['starter'],
  },
  handler: {
    directory: {
      path: 'public',
      listing: true,
      index: false,
    },
  },
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => reply.view('home'),
  config: { tags: ['starter'] },
});

/*
*      #####
*     #     # #      # #####  ######  ####
*     #       #      # #    # #      #
*      #####  #      # #    # #####   ####
*           # #      # #    # #           #
*     #     # #      # #    # #      #    #
*      #####  ###### # #####  ######  ####
*
*/

server.route({
  method: 'GET',
  path: '/slides',
  handler: (request, reply) => reply.view('slides'),
  config: { tags: ['starter'] },
});

server.route({
  method: 'GET',
  path: '/slides/client-side',
  handler: (request, reply) => reply.view('slide-client-side'),
  config: { tags: ['starter'] },
});

server.route({
  method: 'GET',
  path: '/slides/js-var-types',
  handler: (request, reply) => reply.view('slide-js-var-types'),
  config: { tags: ['starter'] },
});

/*
 *        #    ######  ###
 *       # #   #     #  #
 *      #   #  #     #  #
 *     #     # ######   #
 *     ####### #        #
 *     #     # #        #
 *     #     # #       ###
 *
 */
server.route({
  method: 'GET',
  path: '/api/fruit',
  handler: (request, reply) => {
    // Browser web address http://localhost:3000/api/fruit?format=json
    utils.print('Query string format value is ', request.query.format); // outputs blank, xml, json
    // PHP is echo($_GET['format']) // outputs blank, xml, json
    if (request.query.format === 'xml') {
      const response = reply('<fruits><fruit name="apple">green</fruit><fruit name="banana">yellow</fruit><fruit name="cherry">red</fruit></fruits>');
      response.type('application/xml');
    } else { // default of JSON
      reply({
        apple: 'green',
        banana: 'yellow',
        cherry: 'red',
      });
    }
  },
});

server.route({
  method: 'GET',
  path: '/api/slow-fruit',
  handler: (request, reply) => {
    function output() {
      // Browser web address http://localhost:3000/api/fruit?format=json
      utils.print('Query string format value is ', request.query.format); // outputs blank, xml, json
      // PHP is echo($_GET['format']) // outputs blank, xml, json
      if (request.query.format === 'xml') {
        const response = reply('<fruits><fruit name="apple">green</fruit><fruit name="banana">yellow</fruit><fruit name="cherry">red</fruit></fruits>');
        response.type('application/xml');
      } else { // default of JSON
        reply({
          apple: 'green',
          banana: 'yellow',
          cherry: 'red',
          durian: 'khaki',
        });
      }
    }
    setTimeout(output, 1000);
  },
});

server.route({
  method: 'GET',
  path: '/api/rss',
  handler: (request, reply) => {
    const url = request.query.url || 'http://www.cbc.ca/cmlink/rss-canada';

    wreck.get(url, (error, response, payload) => {
      if (response.statusCode === 200) {
        reply(payload).type('application/xml');
      } else {
        throw new URIError(`Service call failed with HTTP status code: ${response.statusCode}`);
      }
    }).on('error', (e) => {
      throw new URIError(`Service call failed due to error: ${e.message}`);
    });
  },
});

server.route({
  method: 'GET',
  path: '/api/autocomplete',
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
  },
});

function flickrPaths(payload) {
  const output = { items: [] };

  payload.photos.photo.forEach((photo) => {
    output.items.push({ media: { m: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg` } });
  });

  return output;
}

server.route({
  method: 'GET',
  path: '/api/flickr',
  handler: (request, reply) => {
    const apiKey = credentials.flickr.api_key;
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=yvr&format=json&nojsoncallback=1`;

    wreck.get(url, { json: true }, (error, response, payload) => {
      if (error) {
        reply(error);
        return;
      }

      const output = flickrPaths(payload);
      const contentType = response.headers['content-type'];
      reply(output).type(contentType);
    });
  },
});

function twitterFormat(rawData) {
  return rawData.map(tweet => ({
    created_at: tweet.created_at,
    text: tweet.text,
  }));
}

server.route({
  method: 'GET',
  path: '/api/twitter',
  handler: (request, reply) => {
    const T = new Twit({
      consumer_key: credentials.twitter.consumer_key,
      consumer_secret: credentials.twitter.consumer_secret,
      access_token: credentials.twitter.access_token,
      access_token_secret: credentials.twitter.access_token_secret,
      timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    });

    T.get('statuses/user_timeline', { screen_name: 'vanarts' }, (error, rawData) => {
      if (error) {
        reply(error.message);
        return;
      }

      reply(twitterFormat(rawData));
    });
  },
});

server.start(() => {
  utils.print('Server running at:', server.info.uri);
});
