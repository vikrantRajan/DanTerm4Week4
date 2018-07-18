exports.plugin = {
  name: 'api-student',
  version: '1.4.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/api/student',
      handler: () => ({ hello: 'student' }),
    });
  },
};
