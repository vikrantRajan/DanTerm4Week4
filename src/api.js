const credentials = require('../credentials.json');
const wreck = require('wreck');

exports.register = (server, pluginOptions, next) => {
  server.route({
    method: 'GET',
    path: '/flickr',
    handler: (request, reply) => {
      // todo request Flickr API content
      const apiKey = credentials.flickr.api_key;
      const address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=vancouver&format=json&nojsoncallback=1`;
      wreck.get(address, { json: true }, (error, response, payload) => {
         // todo reply Flickr API response
        console.log(payload);
        reply(payload);
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
          durrian: 'blue'
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
