exports.register = (server, pluginOptions, next) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.view('slides'),
    config: { tags: ['starter'] }
  });

  server.route({
    method: 'GET',
    path: '/client-side',
    handler: (request, reply) => reply.view('slide-client-side'),
    config: { tags: ['starter'] }
  });

  server.route({
    method: 'GET',
    path: '/js-var-types',
    handler: (request, reply) => reply.view('slide-js-var-types'),
    config: { tags: ['starter'] }
  });

  next();
};

exports.register.attributes = {
  name: 'slides',
  version: '1.0.0'
};
