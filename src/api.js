exports.register = (server, pluginOptions, next) => {
  server.route({
    method: 'GET',
    path: '/fruit',
    handler: (request, reply) => {
      // Browser web address http://localhost:3000/api/fruit?format=json
      console.log(request.query.format); // output blank, xml, json
      // PHP is echo($_GET['format']) // outputs blank, xml, json
      if (request.query.format === 'xml') {
        const response = reply('<fruits><fruit name="apple">green</fruit><fruit name="banana">yellow</fruit><fruit name="cherry">red</fruit></fruits>');
        response.type('application/xml');
      } else { // default of JSON
        reply({
          apple: 'green',
          banana: 'yellow',
          cherry: 'red'
        });
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'api',
  version: '1.0.0'
};
