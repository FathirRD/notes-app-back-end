const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    port: process.env.NODE_ENV !== 'production' ? 5000 : process.env.PORT || 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : process.env.HOST || '0.0.0.0',
    routes: {
      cors: {
        origin: ['http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
