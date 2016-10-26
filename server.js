const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const dust = require('hapi-dust');

const utils = require('./src/js/utils');

const server = new hapi.Server();
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

server.start(() => {
  utils.print('Server running at:', server.info.uri);
});
