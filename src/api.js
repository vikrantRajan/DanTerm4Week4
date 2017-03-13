exports.register = (server, pluginOptions, next) => {
  next();
};

exports.register.attributes = {
  name: 'api',
  version: '1.0.0'
};
