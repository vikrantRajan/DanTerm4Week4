// const { print: logger } = require('./js/utils');

exports.plugin = {
  name: 'api',
  version: '1.3.0',
  register: (server) => {
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
  },
};
