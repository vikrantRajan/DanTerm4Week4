exports.register = (server, pluginOptions, next) => {
  const slides = ['client-side', 'js-var-types', 'cdn', 'js-events', 'json'];

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.view('slides', { slides }),
    config: { tags: ['starter'] }
  });

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
