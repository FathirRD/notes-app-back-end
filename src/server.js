const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : 'https://notes-app-back-end.herokuapp.com/',
    routes: {
      cors: {
        origin: ['http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
