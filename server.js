const dust = require('hapi-dust');
const Hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');

const libApi = require('./src/api');
const utils = require('./src/js/utils');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.register([
  { register: libApi, routes: { prefix: '/api' } },
  inert,
  vision,
], () => {
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

server.start(() => {
  utils.print('Server running at:', server.info.uri);
});
