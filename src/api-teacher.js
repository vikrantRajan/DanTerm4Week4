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
  // setTimeout(() => reply({ items }), 1500); // 1.5 sec
};

exports.plugin = {
  name: 'api',
  version: '1.2.0',
  register: (server) => {
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
