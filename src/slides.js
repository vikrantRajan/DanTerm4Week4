exports.plugin = {
  name: 'slides',
  version: '1.0.1',
  register: (server) => {
    const slides = ['client-side', 'js-var-types', 'cdn', 'js-events', 'json', 'ajax', 'git', 'api', 'qrcode', 'flickr', 'twitter', 'facebook'];

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => h.view('slides', { slides }),
      options: { tags: ['starter', 'slide'] }
    });

    slides.forEach((slideName) => {
      server.route({
        method: 'GET',
        path: `/${slideName}`,
        handler: (request, h) => h.view(`slide-${slideName}`),
        options: { tags: ['starter', 'slide'] }
      });
    });
  }
};
