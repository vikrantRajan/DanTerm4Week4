const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const dust = require('hapi-dust');
const https = require('https');
const http = require('http');
const httpRequest = require('request'); // module - AJAX for server
const instagram = require('instagram-node');
const mongodb = require('mongodb');
const Twit = require('twit');
const twitterUtil = require('./src/js/twitter_date');

const credentials = require('./credentials.json');

const server = new hapi.Server();
server.connection({ port: 3000 });

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
  handler: (request, reply) => {
    reply.view('home');
  },
  config: {
    tags: ['starter'],
  },
});

server.route({
  method: 'GET',
  path: '/api/fruit',
  handler: (request, reply) => {
    // Browser web address http://localhost:3000/api/fruit?format=json
    // console.log(request.query.format); // output blank, xml, json
    // PHP is echo($_GET['format']) // outputs blank, xml, json
    if (request.query.format === 'xml') {
      const response = reply(`<fruits><fruit name='apple'>green</fruit>
        <fruit name='banana'>yellow</fruit><fruit name='cherry'>red</fruit></fruits>`);
      response.type('application/xml');
    } else { // default of JSON
      reply({
        apple: 'green',
        banana: 'yellow',
        cherry: 'red',
        durrian: 'blue',
      });
    }
  },
});

server.route({
  method: 'GET',
  path: '/api/slow-fruit',
  handler: (request, reply) => {
    setTimeout(() => {
      reply({
        apple: 'green',
        banana: 'yellow',
        cherry: 'red',
        durrian: 'blue',
      });
    }, 2000);
  },
});

server.route({
  method: 'GET',
  path: '/api/xml',
  handler: (request, reply) => {
    const url = request.query.url || 'http://www.cbc.ca/cmlink/rss-canada';
    const isSSL = (url.substring(0, 5) === 'https');

    const httpRequestBuiltin = (isSSL) ? https : http;
    httpRequestBuiltin.get(url, (res) => {
      let body = '';

      if (res.statusCode === 200) {
        // Continuously update stream with data
        res.on('data', (data) => {
          body += data;
        });
        res.on('end', () => {
          const response = reply(body);
          response.type('application/xml');
        });
      } else {
        throw new URIError(`Service call failed with HTTP status code: ${res.statusCode}`);
      }
    }).on('error', (e) => {
      throw new URIError(`Service call failed due to error:${e.message}`);
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
    for (let i = 0; i < places.length; i++) {
      if (reg.test(places[i].toLowerCase())) {
        sugg.push(places[i]);
      }
    }
    if (sugg.length === 0) {
      sugg.push('No matches found');
    }
    output.items = sugg;

    setTimeout(
      () => {
        reply(output);
      },
      1500 // 1.5 sec
    );
  },
});

server.route({
  method: 'GET',
  path: '/flickr',
  handler: (request, reply) => {
    const createJpgPaths = (json) => {
      // const photos = [];
      // for (let i = 0, len = json.length; i < len; i++) {
      //     const photo = json[i];
      //     photos.push(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
      // }
      const photos = json.map(photo => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
      return { photos };
    };

    httpRequest({
      url: 'https://api.flickr.com/services/rest/',
      qs: {
        format: 'json',
        nojsoncallback: 1,
        api_key: credentials.flickr.api_key,
        method: 'flickr.photos.search',
        tags: request.query.keyword || 'vancouver',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const json = JSON.parse(body); // convert string into JSON
        reply(createJpgPaths(json.photos.photo));
      }
    });
  },
});

server.route({
  method: 'GET',
  path: '/flickr-map',
  handler: (request, reply) => {
    const outputSchema = (json) => {
      const photos = json.map(photo => ({
        path: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        latitude: photo.latitude,
        longitude: photo.longitude,
      }));
      return { photos };
    };

    httpRequest({
      url: 'https://api.flickr.com/services/rest/',
      qs: {
        format: 'json',
        nojsoncallback: 1,
        api_key: credentials.flickr.api_key,
        method: 'flickr.photos.search',
        tags: request.query.keyword || 'vancouver',
        has_geo: 1,
        extras: 'geo',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const json = JSON.parse(body); // convert string into JSON
        reply(outputSchema(json.photos.photo));
      }
    });
  },
});

server.route({
  method: 'GET',
  path: '/twitter',
  handler: (request, reply) => {
    const twit = new Twit({
      consumer_key: credentials.twitter.consumer_key,
      consumer_secret: credentials.twitter.consumer_secret,
      access_token: credentials.twitter.access_token,
      access_token_secret: credentials.twitter.access_token_secret,
      timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    });
    function thinResponse(tweets) {
      return tweets.map((tweet) => ({
        status: tweet.text,
        date: twitterUtil.formatTwitterDate(tweet.created_at),
        // date: tweet.created_at,
      }));
    }

    const sendArgs = { screen_name: 'VanArts' };

    twit.get('statuses/user_timeline', sendArgs, (error, response) => {
      if (error) {
        return reply(error);
      }
      return reply({ tweets: thinResponse(response) });
    });
  },
});

server.route({
  method: 'GET',
  path: '/facebook',
  handler: (request, reply) => {
    httpRequest({
      url: 'https://graph.facebook.com/v2.6/vancouver.institute.of.media.arts',
      qs: {
        access_token: `${credentials.facebook.app_id}|${credentials.facebook.app_secret}`,
        fields: 'cover',
      },
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const json = JSON.parse(body);
        reply({ cover: json.cover.source }); // Browser JSON
      }
    });
  },
});

server.route({
  method: 'GET',
  path: '/add',
  handler: (request, reply) => {
    // http://localhost:3000/add?numberA=1&numberB=2
    const getNumber = name => parseInt(request.query[name], 10);

    reply(`Adding two numbers together ${getNumber('numberA') + getNumber('numberB')}`);
  },
});

server.route({
  method: 'GET',
  path: '/instagram-auth',
  handler: (request, reply) => {
    const ig = instagram.instagram();

    ig.use({ access_token: request.query.code });

    // error, medias, pagination, remaining, limit
    ig.tag_media_recent('vanarts', (error, medias) => {
      if (error) {
        console.log(error); // eslint-disable-line no-console
      }
      reply(medias);
    });
  },
});

server.route({
  method: 'GET',
  path: '/instagram',
  handler: (request, reply) => {
    const ig = instagram.instagram();

    ig.use({ client_id: credentials.instagram.client_id,
      client_secret: credentials.instagram.client_secret });

    const redirectLandingAddress = 'http://localhost:3000/instagram-auth';

    reply('Redirecting to Instagram for authentication')
      .redirect(ig.get_authorization_url(redirectLandingAddress,
        { scope: 'public_content' }
      ));
  },
});

server.route({
  method: 'GET',
  path: '/beer',
  handler: (request, reply) => {
    const MongoClient = mongodb.MongoClient;
    // Connection url
    const url = 'mongodb://localhost:27017/test';
    // Connect using MongoClient
    MongoClient.connect(url, (connectError, db) => {
      const col = db.collection('beer');
      const qsZip = parseInt(request.query.zip, 10);
      const query = (isNaN(qsZip)) ? {} : { 'properties.Zip': qsZip };

      col.find(query).toArray((error, items) => {
        reply({ breweries: items });
        db.close();
      });
    });
  },
});

server.start(() => {
  console.log('Server running at:', server.info.uri); // eslint-disable-line no-console
});
