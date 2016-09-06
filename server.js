const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const dust = require('hapi-dust');

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
  handler: (request, reply) => {
    reply.view('home');
  },
  config: {
    tags: ['starter'],
  },
});

server.start(() => {
  console.log('Server running at:', server.info.uri); // eslint-disable-line no-console
});
