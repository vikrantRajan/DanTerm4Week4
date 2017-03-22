exports.register = (server, pluginOptions, next) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.view('slides'),
    config: { tags: ['starter'] }
  });

  const slides = ['client-side', 'js-var-types', 'cdn', 'js-events'];

  slides.forEach((slideName) => {
    server.route({
      method: 'GET',
      path: `/${slideName}`,
      handler: (request, reply) => reply.view(`slide-${slideName}`),
      config: { tags: ['starter'] }
    });
  });

  next();
};

exports.register.attributes = {
  name: 'slides',
  version: '1.0.0'
};
