exports.register = (server, pluginOptions, next) => {
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

  next();
};

exports.register.attributes = {
  name: 'api',
  version: '1.0.0'
};
